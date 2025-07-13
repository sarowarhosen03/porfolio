import { ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Github from '@/svgs/github';
import Linkedin from '@/svgs/linkdin';
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile image placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-primary rounded-full shadow-glow animate-glow"></div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-hero text-muted-foreground ">Sarowar Hossain</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
            Software Developer
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Passionate full-stack developer with expertise in modern web technologies.
            I create beautiful, functional applications that solve real-world problems.
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" size="icon" className="rounded-full hover:shadow-glow transition-smooth">

              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:shadow-glow transition-smooth">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:shadow-glow transition-smooth">
              <Mail className="h-5 w-5" />
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

            <Link href={"#projects"}>
              <Button variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
                View My Work
              </Button></Link>
            <Link href={"#contact"}>
              <Button variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
                Contact Me
              </Button>
            </Link>

          </div>

          {/* Scroll indicator */}
          <Link href={"#skills"} className="animate-bounce">
            <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;