import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogPostDetail from "./pages/BlogPostDetail";
import Contact from "./pages/Contact";
import IndustryLanding from "./pages/IndustryLanding";
import LeadMagnet from "./pages/LeadMagnet";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminReporting from "./pages/AdminReporting";
import AdminEmployees from "./pages/AdminEmployees";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/services/:slug"} component={ServiceDetail} />
      <Route path={"/case-studies"} component={CaseStudies} />
      <Route path={"/case-studies/:slug"} component={CaseStudyDetail} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPostDetail} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/industries/:industry"} component={IndustryLanding} />
      <Route path={"/lead-magnet"} component={LeadMagnet} />
      <Route path={"/employee/login"} component={EmployeeLogin} />
      <Route path={"/employee/dashboard"} component={EmployeeDashboard} />
      <Route path={"/admin/reporting"} component={AdminReporting} />
      <Route path={"/admin/employees"} component={AdminEmployees} />
      <Route path={"/solupedia-admin"} component={AdminLogin} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Don't show navigation and footer for employee portal and admin pages
  const isPortalPage = typeof window !== 'undefined' && (
    window.location.pathname.startsWith('/employee') ||
    window.location.pathname.startsWith('/admin') ||
    window.location.pathname === '/solupedia-admin'
  );
  
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            {!isPortalPage && <Navigation />}
            <main className="flex-1">
              <Router />
            </main>
            {!isPortalPage && <Footer />}
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
