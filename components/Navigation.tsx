'use client'
import LoginButton from '@/app/(main)/_components/LoginButton'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="bg-background/80 border-border fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={'/'} className="te text-primary text-xl font-bold">
            Sarowar Hossain
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link href={'/#'} className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href={'/about'} className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            {isHome && (
              <>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection('education')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Education
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </>
            )}
            <Link
              href={'/project'}
              className="text-foreground hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <LoginButton />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="bg-background border-border space-y-1 border-t px-2 pt-2 pb-3">
              <Link
                href={'/'}
                className="text-foreground hover:text-primary block w-full px-3 py-2 text-left transition-colors"
              >
                Home
              </Link>
              <Link
                href={'/about'}
                className="text-foreground hover:text-primary block w-full px-3 py-2 text-left transition-colors"
              >
                About
              </Link>
              {isHome && (
                <>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="text-foreground hover:text-primary block w-full px-3 py-2 text-left transition-colors"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection('education')}
                    className="text-foreground hover:text-primary block w-full px-3 py-2 text-left transition-colors"
                  >
                    Education
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="text-foreground hover:text-primary block w-full px-3 py-2 text-left transition-colors"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-foreground hover:text-primary block w-full px-3 py-2 text-left transition-colors"
                  >
                    Contact
                  </button>
                </>
              )}
              <LoginButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
