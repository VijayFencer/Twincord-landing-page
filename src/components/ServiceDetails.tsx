import { motion } from "framer-motion";
import { Shield, Code, Brain, Cloud, Palette, GraduationCap, ArrowLeft, Check } from "lucide-react";
import { useEffect, useState } from "react";

// Type definitions for better type safety
type ServiceItem = {
  name: string;
  desc: string;
};

type ServiceType = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  services: ServiceItem[];
  keyFeatures: string[];
  stats: Record<string, string>;
};

type ServiceCardProps = {
  service: ServiceType;
  index: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <section id={service.id} className={`py-20 bg-gradient-to-br ${service.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div 
                className="p-4 rounded-2xl"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <service.icon 
                  className="h-12 w-12" 
                  style={{ color: service.color }} 
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#3b3b3b' }}>
                  {service.title}
                </h2>
                <p className="text-xl font-medium mb-4" style={{ color: service.color }}>
                  {service.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gray-50 rounded-xl">
              {Object.entries(service.stats).map(([key, value], idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: service.color }}>
                    {value}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="px-8 md:px-12 pb-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#3b3b3b' }}>
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.services.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-gray-50 rounded-xl border-l-4 hover:shadow-lg transition-all duration-300"
                  style={{ borderColor: service.color }}
                >
                  <h4 className="font-semibold text-lg mb-3" style={{ color: '#3b3b3b' }}>
                    {item.name}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="px-8 md:px-12 pb-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#3b3b3b' }}>
              Key Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.keyFeatures.map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                >
                  <Check className="h-5 w-5" style={{ color: service.color }} />
                  <span className="text-sm font-medium" style={{ color: '#3b3b3b' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesDetailPage = () => {
  const [activeSection, setActiveSection] = useState('cybersecurity');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const services: ServiceType[] = [
    {
      id: "cybersecurity",
      title: "Cybersecurity Services",
      subtitle: "Fortress-Level Protection for Your Digital Assets",
      description: "In today's threat landscape, cybersecurity isn't optional—it's essential. Our comprehensive security solutions provide 360-degree protection against evolving cyber threats. From advanced threat detection to incident response, we ensure your digital infrastructure remains impenetrable while maintaining operational efficiency.",
      icon: Shield,
      color: "#ef4444",
      bgGradient: "from-red-50 to-orange-50",
      services: [
        {
          name: "Penetration Testing & VAPT",
          desc: "Comprehensive vulnerability assessments and ethical hacking to identify security gaps before malicious actors do."
        },
        {
          name: "Cybersecurity Consulting & Audits",
          desc: "Strategic security assessments and compliance audits to align your security posture with industry standards."
        },
        {
          name: "Managed Security Services (MSSP)",
          desc: "24/7 security monitoring, threat detection, and incident response managed by certified security experts."
        },
        {
          name: "Endpoint Security Solutions",
          desc: "Advanced protection for all devices in your network with real-time threat prevention and response."
        },
        {
          name: "Incident Response & Digital Forensics",
          desc: "Rapid response to security incidents with detailed forensic analysis to minimize damage and prevent recurrence."
        }
      ],
      keyFeatures: ["24/7 SOC Monitoring", "Zero-Day Threat Protection", "Compliance Expertise", "Rapid Incident Response"],
      stats: { projects: "500+", clients: "150+", uptime: "99.9%" }
    },
    {
      id: "software-development",
      title: "Software Development Services",
      subtitle: "Crafting Digital Solutions That Drive Success",
      description: "Transform your vision into powerful software solutions. Our expert development team leverages cutting-edge technologies and agile methodologies to build scalable, secure, and user-centric applications that accelerate your business growth and enhance operational efficiency.",
      icon: Code,
      color: "#3b82f6",
      bgGradient: "from-blue-50 to-cyan-50",
      services: [
        {
          name: "Custom Software Development",
          desc: "Tailored software solutions designed specifically for your unique business requirements and workflows."
        },
        {
          name: "Web Development",
          desc: "Modern, responsive web applications using React, Vue, Angular, and other cutting-edge frameworks."
        },
        {
          name: "Mobile App Development",
          desc: "Native and cross-platform mobile applications for iOS and Android with exceptional user experiences."
        },
        {
          name: "SaaS Application Development",
          desc: "Scalable Software-as-a-Service platforms with multi-tenant architecture and subscription management."
        },
        {
          name: "API Development & Integration",
          desc: "Robust APIs and seamless third-party integrations to connect your systems and enhance functionality."
        },
        {
          name: "DevOps & Infrastructure Support",
          desc: "Automated deployment pipelines, cloud infrastructure management, and continuous integration/delivery."
        }
      ],
      keyFeatures: ["Agile Development", "Scalable Architecture", "Modern Tech Stack", "Quality Assurance"],
      stats: { projects: "300+", clients: "120+", satisfaction: "98%" }
    },
    {
      id: "ai-data",
      title: "AI & Data Solutions",
      subtitle: "Unlock Intelligence from Your Data",
      description: "Harness the power of artificial intelligence and data science to gain competitive advantages. Our AI solutions transform raw data into actionable insights, automate complex processes, and enable intelligent decision-making that propels your business forward.",
      icon: Brain,
      color: "#8b5cf6",
      bgGradient: "from-purple-50 to-pink-50",
      services: [
        {
          name: "AI & ML Model Development",
          desc: "Custom machine learning models for predictive analytics, natural language processing, and computer vision."
        },
        {
          name: "Data Analytics & Business Intelligence",
          desc: "Comprehensive data analysis platforms that transform complex datasets into clear, actionable business insights."
        },
        {
          name: "Data Security & Compliance Services",
          desc: "Ensure data privacy and regulatory compliance while maximizing the value of your information assets."
        }
      ],
      keyFeatures: ["Predictive Analytics", "Real-time Processing", "Custom ML Models", "Data Visualization"],
      stats: { models: "50+", accuracy: "95%", insights: "1000+" }
    },
    {
      id: "cloud-infrastructure",
      title: "Cloud & Infrastructure Services",
      subtitle: "Scalable Infrastructure for Modern Businesses",
      description: "Migrate, manage, and optimize your infrastructure with our comprehensive cloud solutions. From strategic cloud consulting to 24/7 infrastructure monitoring, we ensure your systems are always available, secure, and performing at their peak.",
      icon: Cloud,
      color: "#10b981",
      bgGradient: "from-green-50 to-emerald-50",
      services: [
        {
          name: "Cloud Consulting & Deployment",
          desc: "Strategic cloud migration planning and implementation across AWS, Azure, Google Cloud, and hybrid environments."
        },
        {
          name: "Infrastructure Management & Monitoring",
          desc: "Proactive infrastructure monitoring, performance optimization, and automated scaling solutions."
        },
        {
          name: "Firewall & Network Security Services",
          desc: "Advanced network security implementations with next-generation firewalls and intrusion prevention systems."
        }
      ],
      keyFeatures: ["Multi-Cloud Expertise", "Auto-Scaling", "Cost Optimization", "High Availability"],
      stats: { uptime: "99.99%", clients: "80+", savings: "40%" }
    },
    {
      id: "ui-ux-design",
      title: "UI/UX & Creative Design Services",
      subtitle: "Design Experiences That Captivate and Convert",
      description: "Create memorable digital experiences that resonate with your audience. Our design team combines aesthetic excellence with user psychology to craft interfaces that not only look stunning but also drive engagement and conversions.",
      icon: Palette,
      color: "#f59e0b",
      bgGradient: "from-yellow-50 to-amber-50",
      services: [
        {
          name: "UI/UX Design for Web & Mobile",
          desc: "User-centered design processes that create intuitive, accessible, and conversion-focused digital experiences."
        },
        {
          name: "Branding & Graphic Design",
          desc: "Comprehensive brand identity development including logos, style guides, and marketing collateral."
        },
        {
          name: "Corporate Video & Animation",
          desc: "Professional video production and motion graphics that communicate your brand story effectively."
        }
      ],
      keyFeatures: ["User Research", "Prototype Testing", "Brand Strategy", "Motion Graphics"],
      stats: { designs: "200+", conversion: "+35%", satisfaction: "99%" }
    },
    {
      id: "training-certification",
      title: "Training & Certification Programs",
      subtitle: "Empower Your Team with Future-Ready Skills",
      description: "Invest in your team's growth with our comprehensive training programs. From cybersecurity awareness to advanced software development techniques, our expert-led training ensures your workforce stays ahead of industry trends and threats.",
      icon: GraduationCap,
      color: "#6366f1",
      bgGradient: "from-indigo-50 to-blue-50",
      services: [
        {
          name: "Corporate Security Training Programs",
          desc: "Comprehensive cybersecurity awareness training to build a human firewall against cyber threats."
        },
        {
          name: "Software Development Training",
          desc: "Hands-on coding bootcamps and workshops covering modern development frameworks and best practices."
        },
        {
          name: "AI & Data Science Training",
          desc: "Practical machine learning and data science courses designed for business professionals and developers."
        },
        {
          name: "Internship Programs & Career Building",
          desc: "Structured internship programs and career development initiatives to nurture the next generation of tech talent."
        }
      ],
      keyFeatures: ["Expert Instructors", "Hands-on Learning", "Industry Certifications", "Career Support"],
      stats: { trainees: "1500+", completion: "92%", placement: "85%" }
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f8f8' }}>
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderColor: '#00bfff', 
                color: '#00bfff',
                backgroundColor: 'white'
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Services</span>
            </button>

            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#3b3b3b' }}>
              Our <span style={{ color: '#00bfff' }}>Service</span> Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to transform your business 
              with innovation, security, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="sticky top-0 z-50 bg-white shadow-lg mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-1 overflow-x-auto py-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setActiveSection(service.id);
                  document.getElementById(service.id)?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                  activeSection === service.id 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeSection === service.id ? service.color : 'transparent'
                }}
              >
                <service.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{service.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
  };

export default ServicesDetailPage;