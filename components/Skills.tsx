import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Boxes,
  Cloud,
  Database,
  Drama,
  FileType,
  FlaskConical,
  GitBranch,
  Layout,
  Network,
  Palette,
  Rocket,
  Server,
  Ship,
  Sparkles,
  Terminal,
  Wind,
} from 'lucide-react'

const STATIC_SKILLS: { category: string; items: { name: string }[] }[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Redux' },
      { name: 'Tailwind CSS' },
      { name: 'Shadcn/ui' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js' },
      { name: 'Prisma' },
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'REST / RPC' },
    ],
  },
  {
    category: 'DevOps & Tools',
    items: [
      { name: 'Docker' },
      { name: 'Git & GitHub' },
      { name: 'AWS S3' },
      { name: 'Vercel' },
      { name: 'Coolify' },
      { name: 'Linux' },
    ],
  },
  {
    category: 'Testing & Quality',
    items: [{ name: 'Jest' }, { name: 'Playwright' }],
  },
]

const CATEGORY_META: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; accent: string; chip: string }
> = {
  Frontend: {
    icon: Palette,
    accent: 'text-emerald-500',
    chip: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  Backend: {
    icon: Server,
    accent: 'text-sky-500',
    chip: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  },
  'DevOps & Tools': {
    icon: Boxes,
    accent: 'text-amber-500',
    chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  'Testing & Quality': {
    icon: FlaskConical,
    accent: 'text-fuchsia-500',
    chip: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
  },
  'UI/UX': {
    icon: Sparkles,
    accent: 'text-rose-500',
    chip: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  },
}

const SKILL_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  'Next.js': Rocket,
  TypeScript: FileType,
  'Tailwind CSS': Wind,
  Tailwindcss: Wind,
  'Shadcn/ui': Layout,
  Redux: Boxes,
  'Node.js': Server,
  Prisma: Database,
  MongoDB: Database,
  MySQL: Database,
  PostgreSQL: Database,
  'REST / RPC': Network,
  Docker: Ship,
  'Git & GitHub': GitBranch,
  'AWS S3': Cloud,
  Vercel: Rocket,
  Coolify: Cloud,
  Linux: Terminal,
  Jest: FlaskConical,
  Playwright: Drama,
  'Responsive Design': Palette,
  Animations: Sparkles,
  Accessibility: Sparkles,
}

const Skills = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="bg-grid absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" aria-hidden />
      <div className="relative container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-gradient-primary">Skills & Tooling</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A curated set of technologies that I use to ship delightful experiences
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {STATIC_SKILLS.map((group) => {
            const meta = CATEGORY_META[group.category] ?? {
              icon: Sparkles,
              accent: 'text-primary',
              chip: 'bg-primary/10 text-primary',
            }
            const Icon = meta.icon
            return (
              <Card
                key={group.category}
                className="bg-gradient-card hover:shadow-glow transition-smooth border-0 p-6"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3">
                    <span
                      className={`bg-background inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${meta.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-foreground text-2xl font-semibold">{group.category}</h3>
                      <div className="bg-primary/20 mt-2 h-1 w-16 rounded-full" />
                    </div>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const ChipIcon = SKILL_ICON[item.name] ?? Sparkles
                    return (
                      <li key={item.name}>
                        <Badge
                          variant="outline"
                          className={`w-full justify-start gap-2 rounded-full px-3 py-2 ${meta.chip}`}
                        >
                          <ChipIcon className="h-4 w-4" />
                          <span className="font-medium">{item.name}</span>
                        </Badge>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
