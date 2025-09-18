'use client'
import { Button } from '@/components/ui/button'
import { Eye, FolderOpen, LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import revalidateAllRoute from './action'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  const sidebarItems = [
    { id: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/dashboard/projects', label: 'Projects', icon: FolderOpen },
    { id: '/dashboard/skills', label: 'Skills', icon: Settings },
    { id: '/dashboard/profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="bg-muted/30 min-h-screen">
      {/* Header */}
      <header className="bg-card border-border border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-sm font-bold">SH</span>
            </div>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href={'/'}>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View Site
              </Button>
            </Link>
            <Button
              onClick={() => {
                signOut({ redirectTo: '/' })
              }}
              variant="outline"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-card border-border min-h-screen w-64 border-r">
          <nav className="space-y-2 p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.id} href={item.id}>
                  <button
                    className={`transition-smooth flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${
                      pathName === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                </Link>
              )
            })}
            <Button
              variant={'outline'}
              onClick={async () => {
                await revalidateAllRoute()
                toast.success('revalidate done')
              }}
              className="transition-smooth flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left"
            >
              Revalidate Path
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
