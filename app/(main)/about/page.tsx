import { personalInfo } from '@/utils/data'

export const metadata = {
  title: `About — ${personalInfo.name}`,
  description: personalInfo.description,
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">About</h1>
        <p className="text-muted-foreground leading-7">
          My programming journey began after my SSC exam in 2021. Guided by curiosity, I stepped
          into coding and never looked back. Between 2021 and 2025 I explored both web and Android
          development — building apps with Android Studio and shipping modern web experiences with
          Node.js and React. Coding isn’t only my profession; it’s also the hobby and craft I enjoy
          refining every day.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-5xl">
        <h2 className="mb-4 text-3xl font-bold">Employment History</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-border bg-gradient-card rounded-lg border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Support Engineer – Reactive Accelerator Batch 3
                </h3>
                <p className="text-muted-foreground">Learn with Sumit</p>
              </div>
              <span className="text-muted-foreground text-sm">Apr 2024 – Aug 2025</span>
            </div>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5">
              <li>Guided learners through Redux, Next.js API routes, and server‑side rendering.</li>
              <li>Helped with project reviews, troubleshooting, and performance improvements.</li>
            </ul>
          </div>
          <div className="border-border bg-gradient-card rounded-lg border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Support Engineer – Reactive Accelerator Batch 2
                </h3>
                <p className="text-muted-foreground">Learn with Sumit</p>
              </div>
              <span className="text-muted-foreground text-sm">Oct 2024 – Feb 2025</span>
            </div>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5">
              <li>Provided technical support and mentorship for advanced React/Next.js.</li>
              <li>Assisted in debugging, optimization, and improving project architecture.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="border-border bg-gradient-card rounded-lg border p-6">
          <h2 className="mb-2 font-semibold">Based in</h2>
          <p className="text-muted-foreground">{personalInfo.location}</p>
        </div>
        <div className="border-border bg-gradient-card rounded-lg border p-6">
          <h2 className="mb-2 font-semibold">Availability</h2>
          <p className="text-muted-foreground">{personalInfo.status}</p>
        </div>
        <div className="border-border bg-gradient-card rounded-lg border p-6">
          <h2 className="mb-2 font-semibold">Contact</h2>
          <p className="text-muted-foreground">{personalInfo.email}</p>
        </div>
      </section>
      <section className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-3xl font-bold">My Journey</h2>
        <div className="text-muted-foreground space-y-4 leading-7">
          <p>
            <span className="text-foreground font-medium">2021</span>: After SSC, my curiosity
            pulled me into programming. I started with the fundamentals and small projects, learning
            how software fits together.
          </p>
          <p>
            <span className="text-foreground font-medium">2022–2024</span>: I expanded into
            full‑stack web development with Node.js and React, and explored Android development with
            Android Studio to publish simple utility apps.
          </p>
          <p>
            <span className="text-foreground font-medium">2025</span>: I focus on clean, accessible
            interfaces and reliable backends — turning ideas into products. Coding remains my daily
            practice: a place to create, learn, and improve.
          </p>
        </div>
      </section>
    </main>
  )
}
