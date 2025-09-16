
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/utils/data";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const Hero = () => {

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen pt-16 md:pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.08] dark:opacity-[0.12]" aria-hidden />

      {/* Floating glow blobs (softened) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Spotlight mask following cursor */}
      <div
        className="absolute inset-0 spotlight pointer-events-none"
        aria-hidden
      />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto">
            {/* Profile image placeholder */}
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-primary rounded-full shadow-glow animate-glow" />

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient-hero text-muted-foreground ">{personalInfo.name}</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
              Software Developer
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {personalInfo.description}
            </p>

            {/* Social links */}
            <div className="flex justify-center gap-4 mb-8">
              {personalInfo.socialLinks.map((item) => (
                <Link key={item.id} href={item.url}>
                  <Button variant="outline" size="icon" className="rounded-full hover:shadow-glow transition-smooth">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </Button>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href={"#projects"}>
                <Button variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary  transition-smooth">
                  View My Work
                </Button>
              </Link>
              <Link href={"#contact"}>
                <Button variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary  transition-smooth">
                  Contact Me
                </Button>
              </Link>
            </div>

            {/* Scroll indicator */}
            <Link href={"#skills"} className="animate-bounce inline-flex items-center justify-center">
              <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;