'use client'

import { Button } from '@/components/ui/button'

const HeroCTAs = () => {
  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
      <Button
        onClick={() => scrollToSection('projects')}
        variant="outline"
        className="border-primary text-primary hover:bg-primary transition-smooth px-8 py-3 text-lg hover:text-white"
      >
        View My Work
      </Button>
      <Button
        onClick={() => scrollToSection('contact')}
        variant="outline"
        className="border-primary text-primary hover:bg-primary transition-smooth px-8 py-3 text-lg hover:text-white"
      >
        Contact Me
      </Button>
    </div>
  )
}

export default HeroCTAs
