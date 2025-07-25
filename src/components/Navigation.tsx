import { useState, useEffect } from "react";
import { Command, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -100; // Adjust for fixed header
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const isHomePage = location.pathname === '/';

  const navItems = isHomePage ? [
    { name: "About", href: "#about", onClick: () => scrollToSection('about') },
    { name: "Products", href: "#products", onClick: () => scrollToSection('products') },
    { name: "Services", href: "#services", onClick: () => scrollToSection('services') },
    { name: "Careers", href: "https://hrm.twincord.in/web/index.php/recruitmentApply/jobs.html", external: true },
  ] : [
    { name: "Home", href: "/" },
    { name: "TwinAV", href: "/twinav" },
    { name: "TwinHRM", href: "/twinhrm" },
    { name: "TwinShield", href: "/twinshield" },
    { name: "Careers", href: "https://hrm.twincord.in/web/index.php/recruitmentApply/jobs.html", external: true },
  ];

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full ${
        isScrolled 
          ? "h-14 glass-nav scale-95 w-[90%] max-w-2xl shadow-2xl" 
          : "h-14 glass-nav w-[95%] max-w-3xl shadow-xl"
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <Command className="w-5 h-5 text-primary" />
            <span className="font-bold text-base text-foreground">TwinCord</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              isHomePage ? (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.onClick) {
                        item.onClick();
                      }
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    {item.name}
                  </a>
                )
              ) : (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                )
              )
            ))}
            {isHomePage ? (
              <Button 
                onClick={() => scrollToSection('cta')}
                size="sm"
                className="button-gradient"
              >
                Get Started
              </Button>
            ) : (
              <Button 
                asChild
                size="sm"
                className="button-gradient"
              >
                <Link to="/careers">Join Us</Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass border-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-nav border-0">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    isHomePage ? (
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            if (item.onClick) {
                              item.onClick();
                            }
                          }}
                        >
                          {item.name}
                        </a>
                      )
                    ) : (
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    )
                  ))}
                  <Button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (isHomePage) {
                        scrollToSection('cta');
                      }
                    }}
                    className="button-gradient mt-4"
                    asChild={!isHomePage}
                  >
                    {isHomePage ? "Get Started" : <Link to="/careers">Join Us</Link>}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;