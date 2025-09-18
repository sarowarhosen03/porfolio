import Navigation from '@/components/Navigation'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navigation />
      {children}

      <footer className="bg-muted/30 py-8 text-center">
        <p className="text-muted-foreground">© 2025 Sarowar Hossain.</p>
      </footer>
    </div>
  )
}
