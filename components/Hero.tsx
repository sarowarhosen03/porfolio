'use client'

import HeroCTAs from "@/components/HeroCTAs";
import InteractiveCube from "@/components/InteractiveCube";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/utils/data";
import { motion } from "framer-motion";
import Image from "next/image";
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
        <div className="min-h-[calc(100vh-5rem)] grid md:grid-cols-2 items-center gap-8">
          <div className="order-2 md:order-1 text-center md:text-left max-w-2xl mx-auto">
            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto mb-8"
            >
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full ring-4 ring-primary/40 shadow-glow overflow-hidden">
                {personalInfo.imageUrl && (
                  <Image src={personalInfo.imageUrl} alt={personalInfo.name} fill className="object-cover" />
                )}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-foreground">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-foreground mb-6"
            >
              Software Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed"
            >
              {personalInfo.description}
            </motion.p>

            {/* Social links */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}
              className="flex justify-center md:justify-start gap-3 mb-8"
            >
              {personalInfo.socialLinks.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link href={item.url} aria-label={item.name}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full ring-1 ring-primary/30 hover:ring-primary/60 hover:scale-105 transition-smooth bg-background/60 backdrop-blur"
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                        className="h-5 w-5"
                      />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            >
              <HeroCTAs />
            </motion.div>



          </div>

          {/* Right visual column: 3D rotating cube */}
          <div className="order-1 md:order-2 hidden md:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="cube-scene relative"
            >
              <InteractiveCube />
              <div className="pointer-events-none absolute -inset-8 rounded-[2rem] blur-3xl bg-primary/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;