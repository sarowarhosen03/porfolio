import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Atom,
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
  Wind,
} from "lucide-react";

const STATIC_SKILLS: { category: string; items: { name: string }[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn/ui" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Prisma" },
      { name: "PostgreSQL" },
      { name: "REST / RPC" },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker" },
      { name: "Git & GitHub" },
      { name: "AWS S3" },
      { name: "Vercel" },
    ],
  },
  {
    category: "Testing & Quality",
    items: [
      { name: "Jest" },
      { name: "Playwright" },
    ],
  },
];

const CATEGORY_META: Record<string, { icon: React.ComponentType<{ className?: string }>; accent: string; chip: string }> = {
  Frontend: { icon: Palette, accent: "text-emerald-500", chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  Backend: { icon: Server, accent: "text-sky-500", chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  "DevOps & Tools": { icon: Boxes, accent: "text-amber-500", chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  "Testing & Quality": { icon: FlaskConical, accent: "text-fuchsia-500", chip: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400" },
  "UI/UX": { icon: Sparkles, accent: "text-rose-500", chip: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
};

const SKILL_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  React: Atom,
  "Next.js": Rocket,
  TypeScript: FileType,
  "Tailwind CSS": Wind,
  "Shadcn/ui": Layout,
  "Node.js": Server,
  Prisma: Database,
  PostgreSQL: Database,
  "REST / RPC": Network,
  Docker: Ship,
  "Git & GitHub": GitBranch,
  "AWS S3": Cloud,
  Vercel: Rocket,
  Jest: FlaskConical,
  Playwright: Drama,
  "Responsive Design": Palette,
  Animations: Sparkles,
  Accessibility: Sparkles,
};

const Skills = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-[0.08]" aria-hidden />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Skills & Tooling</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated set of technologies that I use to ship delightful experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {STATIC_SKILLS.map((group) => {
            const meta = CATEGORY_META[group.category] ?? { icon: Sparkles, accent: "text-primary", chip: "bg-primary/10 text-primary" };
            const Icon = meta.icon;
            return (
              <Card key={group.category} className="p-6 border-0 bg-gradient-card hover:shadow-glow transition-smooth">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-sm ${meta.accent}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">{group.category}</h3>
                      <div className="h-1 w-16 rounded-full bg-primary/20 mt-2" />
                    </div>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const ChipIcon = SKILL_ICON[item.name] ?? Sparkles;
                    return (
                      <li key={item.name}>
                        <Badge variant="outline" className={`w-full justify-start gap-2 px-3 py-2 rounded-full ${meta.chip}`}>
                          <ChipIcon className="h-4 w-4" />
                          <span className="font-medium">{item.name}</span>
                        </Badge>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;