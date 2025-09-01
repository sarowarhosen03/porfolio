import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Brain,
    Code,
    Database,
    Mic,
    Palette,
    Smartphone,
    Zap
} from "lucide-react";

interface ServiceItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
}

const servicesData: ServiceItem[] = [
    {
        title: "Full Stack Development",
        description: "Building scalable web applications using modern technologies and best practices.",
        icon: <Code className="h-8 w-8" />,
        features: [
            "React & Next.js Applications",
            "Node.js Backend Development",
            "Database Design & Management",
            "API Development & Integration"
        ]
    },
    {
        title: "Frontend Engineering",
        description: "Creating responsive, interactive interfaces with focus on performance and user experience.",
        icon: <Palette className="h-8 w-8" />,
        features: [
            "Responsive Web Design",
            "Interactive UI Components",
            "Performance Optimization",
            "Modern CSS & Animations"
        ]
    },
    {
        title: "Backend Architecture",
        description: "Designing secure and efficient server-side solutions with robust data management.",
        icon: <Database className="h-8 w-8" />,
        features: [
            "RESTful API Development",
            "Database Design & Optimization",
            "Authentication & Authorization",
            "Server Deployment & Maintenance"
        ]
    },
    {
        title: "Problem Solving & DSA",
        description: "Solving complex algorithmic challenges with optimized data structure implementations.",
        icon: <Brain className="h-8 w-8" />,
        features: [
            "Algorithm Optimization",
            "Data Structure Implementation",
            "System Design Solutions",
            "Performance Analysis"
        ]
    },
    {
        title: "Mobile Development",
        description: "Building cross-platform mobile applications with React Native and modern frameworks.",
        icon: <Smartphone className="h-8 w-8" />,
        features: [
            "React Native Development",
            "Cross-platform Solutions",
            "Mobile UI/UX Design",
            "App Store Deployment"
        ]
    },
    {
        title: "Technical Consulting",
        description: "Providing expert guidance on technology choices, architecture, and development strategies.",
        icon: <Mic className="h-8 w-8" />,
        features: [
            "Technology Stack Selection",
            "Architecture Planning",
            "Code Review & Mentoring",
            "Project Strategy"
        ]
    }
];

const Services = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient-primary">What I Do</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        I build efficient and scalable solutions grounded in strong fundamentals.
                        I focus on simplifying complex problems, delivering practical solutions,
                        and communicating ideas clearly to create real impact.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {servicesData.map((service, index) => (
                        <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/50 backdrop-blur-sm">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                                    <div className="text-primary">
                                        {service.icon}
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold text-foreground">
                                    {service.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="text-center">
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
                            <div className="text-sm text-muted-foreground">Projects Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3+</div>
                            <div className="text-sm text-muted-foreground">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
                            <div className="text-sm text-muted-foreground">Technologies</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
                            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;

