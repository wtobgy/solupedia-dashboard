import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Video, Zap, Globe } from "lucide-react";

const servicesData = [
  {
    slug: "document-localization",
    title: "Document Localization",
    icon: BookOpen,
    image: "/Solupedia-document-localization.jpg",
    shortDesc: "Professional translation and desktop publishing",
    fullDesc: "Transform your documents for global audiences with our comprehensive document localization services. We handle everything from translation to formatting, ensuring your content maintains its impact across languages and cultures.",
    features: [
      "Professional translation by native speakers",
      "Desktop publishing and formatting",
      "Cultural adaptation and transcreation",
      "Quality assurance and proofreading",
      "Support for 150+ languages",
      "Fast turnaround times"
    ]
  },
  {
    slug: "elearning-localization",
    title: "eLearning Localization",
    icon: Zap,
    image: "/tQhhiaQyUpCd.jpg",
    shortDesc: "Course adaptation for global learners",
    fullDesc: "Create engaging learning experiences for international audiences. Our eLearning localization experts adapt your courses, ensuring cultural relevance and pedagogical effectiveness across different regions.",
    features: [
      "Course content translation and adaptation",
      "Multimedia asset localization",
      "Interactive element adaptation",
      "LMS integration and testing",
      "Voice-over and subtitle services",
      "Instructional design consultation"
    ]
  },
  {
    slug: "audio-video-localization",
    title: "Audio/Video Localization",
    icon: Video,
    image: "/Solupedia-video-editing-localization.jpg",
    shortDesc: "Dubbing, subtitles, and voice-over services",
    fullDesc: "Bring your video content to life in any language. From professional dubbing to accurate subtitles, we provide complete audio and video localization services that maintain the emotional impact of your original content.",
    features: [
      "Professional dubbing and voice-over",
      "Subtitle and caption creation",
      "Audio synchronization",
      "Cultural adaptation of visual elements",
      "Quality assurance and review",
      "Multi-language support"
    ]
  },
  {
    slug: "creation-solutions",
    title: "Creation Solutions",
    icon: Globe,
    image: "/Solupedia-creation-solutions.jpg",
    shortDesc: "Content creation optimized for localization",
    fullDesc: "Start your global journey with content designed for localization from the ground up. Our creation solutions help you develop materials that are inherently easier to translate and adapt.",
    features: [
      "Localization-friendly content creation",
      "Multilingual project planning",
      "Asset management and organization",
      "Terminology database development",
      "Style guide creation",
      "Ongoing localization support"
    ]
  }
];

export default function Services() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100">
            Comprehensive localization solutions tailored to your industry and content type
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {servicesData.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-10 h-10 text-blue-600" />
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-lg text-gray-700 mb-6">{service.fullDesc}</p>
                    <div className="mb-8">
                      <h3 className="font-bold text-lg mb-4">Key Features:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold mt-1">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/services/${service.slug}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Learn More <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </div>
                  <div className="rounded-lg overflow-hidden h-96">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">Specialized expertise across diverse sectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Healthcare & Medical", desc: "Localization for medical devices, pharmaceuticals, and healthcare services" },
              { name: "Legal & Compliance", desc: "Precise localization for legal documents and regulatory content" },
              { name: "Technology", desc: "Software, SaaS, and tech product localization" },
              { name: "Finance & Banking", desc: "Secure localization for financial services and banking" },
              { name: "E-Learning & Education", desc: "Educational content and course localization" },
              { name: "Marketing & Media", desc: "Creative localization for marketing campaigns and media content" },
            ].map((industry, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{industry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{industry.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Localization Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Analysis", desc: "We analyze your content and requirements" },
              { step: "2", title: "Planning", desc: "Develop a customized localization strategy" },
              { step: "3", title: "Execution", desc: "Execute translation and localization" },
              { step: "4", title: "QA & Delivery", desc: "Quality assurance and final delivery" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Localize Your Content?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss which services are right for your project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get a Free Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
