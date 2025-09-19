'use client'

import HeroCTAs from '@/components/HeroCTAs'
import InteractiveCube from '@/components/InteractiveCube'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { personalInfo } from '@/utils/data'
import { motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="bg-gradient-hero relative min-h-screen overflow-hidden pt-16 md:pt-20">
      {/* Background grid */}
      <div className="bg-grid absolute inset-0 opacity-[0.08] dark:opacity-[0.12]" aria-hidden />

      {/* Floating glow blobs (softened) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 animate-float absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
        <div
          className="bg-primary/5 animate-float absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="bg-primary/5 animate-float absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Spotlight mask following cursor */}
      <div className="spotlight pointer-events-none absolute inset-0" aria-hidden />

      {/* Subtle noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid min-h-[calc(100vh-5rem)] items-center gap-8 md:grid-cols-2">
          <div className="order-2 mx-auto max-w-2xl text-center md:order-1 md:text-left">
            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mx-auto mb-8"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="ring-primary/40 shadow-glow relative h-40 w-40 overflow-hidden rounded-full ring-4 cursor-pointer hover:ring-primary/60 transition-all duration-300 hover:scale-105 md:h-48 md:w-48 group">
                    {personalInfo.imageUrl && (
                      <Image
                        src={personalInfo.imageUrl}
                        alt={personalInfo.name}
                        fill
                        className="object-cover"
                      />
                    )}
                    {/* Expand icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Expand className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <DialogTitle className="sr-only">Profile Image - {personalInfo.name}</DialogTitle>
                  <div className="relative aspect-square w-full">
                    {personalInfo.imageUrl && (
                      <Image
                        src={personalInfo.imageFull}
                        alt={personalInfo.name}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="mb-6 text-5xl font-bold md:text-7xl"
            >
              <span className="text-foreground">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-foreground mb-6 text-2xl font-semibold md:text-3xl"
            >
              Software Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="text-foreground/90 mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:mx-0 md:text-xl"
            >
              {personalInfo.description}
            </motion.p>

            {/* Social links */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
              }}
              className="mb-8 flex justify-center gap-3 md:justify-start"
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
                      className="ring-primary/30 hover:ring-primary/60 transition-smooth bg-background/60 rounded-full ring-1 backdrop-blur hover:scale-105"
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.icon }} className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
            >
              <HeroCTAs />
            </motion.div>
          </div>

          {/* Right visual column: 3D rotating cube */}
          <div className="order-1 hidden items-center justify-center md:order-2 md:flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="cube-scene relative"
            >
              <InteractiveCube />
              <div className="bg-primary/20 pointer-events-none absolute -inset-8 rounded-[2rem] blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
