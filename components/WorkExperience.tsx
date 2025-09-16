import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const WorkExperience = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Work Experience</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 border border-border bg-gradient-card">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-semibold">Support Engineer – Reactive Accelerator Batch 3</h3>
                                <p className="text-muted-foreground">Learn with Sumit</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={16} />
                                <span>Apr 2024 – Aug 2025</span>
                            </div>
                        </div>
                        <ul className="mt-4 list-disc pl-5 text-muted-foreground space-y-2">
                            <li>Guided learners through Redux, Next.js API routes, and SSR concepts.</li>
                            <li>Supported project reviews, troubleshooting, and performance improvements.</li>
                        </ul>
                    </Card>

                    <Card className="p-6 border border-border bg-gradient-card">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-semibold">Support Engineer – Reactive Accelerator Batch 2</h3>
                                <p className="text-muted-foreground">Learn with Sumit</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={16} />
                                <span>Oct 2024 – Feb 2025</span>
                            </div>
                        </div>
                        <ul className="mt-4 list-disc pl-5 text-muted-foreground space-y-2">
                            <li>Provided technical support and mentorship for advanced React/Next.js.</li>
                            <li>Assisted with debugging, optimization, and improving project architecture.</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;


