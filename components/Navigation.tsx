"use client"
import LoginButton from '@/app/(main)/_components/LoginButton';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={'/'} className="font-bold text-xl te text-primary">
            Sarowar Hossain
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={"/#"}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href={'/about'}
              className="text-foreground hover:text-primary transition-colors"
            >
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
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link
                href={'/'}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Home
              </Link>
              <Link
                href={'/about'}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
              >
                About
              </Link>
              {isHome && (
                <>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection('education')}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
                  >
                    Education
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors w-full text-left"
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
  );
};

export default Navigation;
