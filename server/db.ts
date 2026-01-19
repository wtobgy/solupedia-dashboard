import { eq, and, gte, lte, desc } from "drizzle-orm";
import { services, caseStudies, blogPosts, testimonials, leads, industryPages, InsertLead, employees, timeTrackingRecords, monthlyReports, InsertEmployee, InsertTimeTrackingRecord, InsertMonthlyReport, adminCredentials, InsertAdminCredential } from "../drizzle/schema";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Services queries
export async function getServices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).orderBy(services.order);
}

export async function getServiceBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Case Studies queries
export async function getCaseStudies(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  if (limit) {
    return db.select().from(caseStudies).orderBy(caseStudies.order).limit(limit);
  }
  return db.select().from(caseStudies).orderBy(caseStudies.order);
}

export async function getFeaturedCaseStudies(limit = 3) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(caseStudies).where(eq(caseStudies.featured, true)).orderBy(caseStudies.order).limit(limit);
}

export async function getCaseStudyBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Blog Posts queries
export async function getBlogPosts(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  if (limit) {
    return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(blogPosts.publishedAt).limit(limit);
  }
  return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(blogPosts.publishedAt);
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Testimonials queries
export async function getTestimonials(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  if (limit) {
    return db.select().from(testimonials).orderBy(testimonials.order).limit(limit);
  }
  return db.select().from(testimonials).orderBy(testimonials.order);
}

export async function getFeaturedTestimonials(limit = 3) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.featured, true)).orderBy(testimonials.order).limit(limit);
}

// Leads queries
export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(leads).values(lead);
  return result;
}

// Industry Pages queries
export async function getIndustryPages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(industryPages);
}

export async function getIndustryPageBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(industryPages).where(eq(industryPages.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Employee queries
export async function getEmployeeByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(employees).where(eq(employees.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEmployee(employee: InsertEmployee) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(employees).values(employee);
  return result;
}

export async function getAllEmployees() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(employees).where(eq(employees.isActive, true));
}

// Time Tracking queries
export async function createTimeTrackingRecord(record: InsertTimeTrackingRecord) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(timeTrackingRecords).values(record);
  return result;
}

export async function getEmployeeTimeRecords(employeeId: number, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return [];
  
  if (startDate && endDate) {
    return db.select().from(timeTrackingRecords).where(
      and(
        eq(timeTrackingRecords.employeeId, employeeId),
        gte(timeTrackingRecords.workDate, startDate),
        lte(timeTrackingRecords.workDate, endDate)
      )
    ).orderBy(timeTrackingRecords.workDate);
  }
  
  return db.select().from(timeTrackingRecords).where(eq(timeTrackingRecords.employeeId, employeeId)).orderBy(timeTrackingRecords.workDate);
}

export async function updateTimeTrackingRecord(id: number, updates: Partial<InsertTimeTrackingRecord>) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(timeTrackingRecords).set(updates).where(eq(timeTrackingRecords.id, id));
  return result;
}

export async function deleteTimeTrackingRecord(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.delete(timeTrackingRecords).where(eq(timeTrackingRecords.id, id));
  return result;
}

// Monthly Report queries
export async function createMonthlyReport(report: InsertMonthlyReport) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(monthlyReports).values(report);
  return result;
}

export async function getMonthlyReport(employeeId: number, year: number, month: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(monthlyReports).where(
    and(
      eq(monthlyReports.employeeId, employeeId),
      eq(monthlyReports.year, year),
      eq(monthlyReports.month, month)
    )
  ).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getEmployeeMonthlyReports(employeeId: number, year?: number) {
  const db = await getDb();
  if (!db) return [];
  
  if (year) {
    return db.select().from(monthlyReports).where(
      and(
        eq(monthlyReports.employeeId, employeeId),
        eq(monthlyReports.year, year)
      )
    ).orderBy(monthlyReports.month);
  }
  
  return db.select().from(monthlyReports).where(eq(monthlyReports.employeeId, employeeId)).orderBy(monthlyReports.year, monthlyReports.month);
}

// Admin Credentials helpers
export async function createAdminCredential(email: string, passwordHash: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create admin credential: database not available");
    return;
  }

  try {
    await db.insert(adminCredentials).values({
      email,
      passwordHash,
      isActive: true,
    });
  } catch (error) {
    console.error("[Database] Failed to create admin credential:", error);
    throw error;
  }
}

export async function getAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get admin: database not available");
    return undefined;
  }

  const result = await db.select().from(adminCredentials).where(eq(adminCredentials.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateAdminLastLogin(adminId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update admin last login: database not available");
    return;
  }

  try {
    await db.update(adminCredentials).set({
      lastLoginAt: new Date(),
    }).where(eq(adminCredentials.id, adminId));
  } catch (error) {
    console.error("[Database] Failed to update admin last login:", error);
  }
}
