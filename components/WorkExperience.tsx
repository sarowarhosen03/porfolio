import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

const WorkExperience = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">Work Experience</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border bg-gradient-card border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Support Engineer – Reactive Accelerator Batch 3
                </h3>
                <p className="text-muted-foreground">Learn with Sumit</p>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar size={16} />
                <span>Apr 2024 – Aug 2025</span>
              </div>
            </div>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5">
              <li>Guided learners through Redux, Next.js API routes, and SSR concepts.</li>
              <li>Supported project reviews, troubleshooting, and performance improvements.</li>
            </ul>
          </Card>

          <Card className="border-border bg-gradient-card border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Support Engineer – Reactive Accelerator Batch 2
                </h3>
                <p className="text-muted-foreground">Learn with Sumit</p>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar size={16} />
                <span>Oct 2024 – Feb 2025</span>
              </div>
            </div>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5">
              <li>Provided technical support and mentorship for advanced React/Next.js.</li>
              <li>Assisted with debugging, optimization, and improving project architecture.</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default WorkExperience
