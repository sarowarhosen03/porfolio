'use client'

import { Button } from '@/components/ui/button'

const HeroCTAs = () => {
    const scrollToSection = (sectionId: string) => {
        if (typeof window === 'undefined') return
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mb-12">
            <Button
                onClick={() => scrollToSection('projects')}
                variant="outline"
                className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary  transition-smooth"
            >
                View My Work
            </Button>
            <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary  transition-smooth"
            >
                Contact Me
            </Button>
        </div>
    )
}

export default HeroCTAs


