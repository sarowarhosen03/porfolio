import { personalInfo } from "@/utils/data";

export const metadata = {
    title: `About — ${personalInfo.name}`,
    description: personalInfo.description,
};

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-20">
            <section className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About</h1>
                <p className="text-muted-foreground leading-7">
                    My programming journey began after my SSC exam in 2021. Guided by curiosity,
                    I stepped into coding and never looked back. Between 2021 and 2025 I explored
                    both web and Android development — building apps with Android Studio and
                    shipping modern web experiences with Node.js and React. Coding isn’t only my
                    profession; it’s also the hobby and craft I enjoy refining every day.
                </p>
            </section>

            <section className="max-w-5xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg border border-border bg-gradient-card">
                    <h2 className="font-semibold mb-2">Based in</h2>
                    <p className="text-muted-foreground">{personalInfo.location}</p>
                </div>
                <div className="p-6 rounded-lg border border-border bg-gradient-card">
                    <h2 className="font-semibold mb-2">Availability</h2>
                    <p className="text-muted-foreground">{personalInfo.status}</p>
                </div>
                <div className="p-6 rounded-lg border border-border bg-gradient-card">
                    <h2 className="font-semibold mb-2">Contact</h2>
                    <p className="text-muted-foreground">{personalInfo.email}</p>
                </div>
            </section>
            <section className="max-w-5xl mx-auto mt-16">
                <h2 className="text-3xl font-bold mb-4">My Journey</h2>
                <div className="space-y-4 text-muted-foreground leading-7">
                    <p>
                        <span className="font-medium text-foreground">2021</span>: After SSC, my
                        curiosity pulled me into programming. I started with the fundamentals and
                        small projects, learning how software fits together.
                    </p>
                    <p>
                        <span className="font-medium text-foreground">2022–2024</span>: I expanded
                        into full‑stack web development with Node.js and React, and explored Android
                        development with Android Studio to publish simple utility apps.
                    </p>
                    <p>
                        <span className="font-medium text-foreground">2025</span>: I focus on clean,
                        accessible interfaces and reliable backends — turning ideas into products.
                        Coding remains my daily practice: a place to create, learn, and improve.
                    </p>
                </div>
            </section>

        </main>
    );
}
