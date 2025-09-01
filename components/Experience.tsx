import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, MapPin, Target, Trophy, Users } from "lucide-react";

interface ExperienceItem {
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string;
    achievements: string[];
    technologies: string[];
    type: 'work' | 'leadership' | 'freelance';
}

const experienceData: ExperienceItem[] = [
    {
        title: "Full Stack Developer",
        company: "Freelance",
        location: "Remote",
        duration: "2023 - Present",
        description: "Building modern web applications and providing technical solutions for clients across various industries.",
        achievements: [
            "Developed 10+ full-stack applications using React, Next.js, and Node.js",
            "Improved application performance by 40% through optimization techniques",
            "Collaborated with 5+ clients to deliver custom solutions"
        ],
        technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
        type: 'freelance'
    },
    {
        title: "Open Source Contributor",
        company: "GitHub Community",
        location: "Remote",
        duration: "2023 - Present",
        description: "Contributing to open source projects and sharing knowledge with the developer community.",
        achievements: [
            "Contributed to 15+ open source projects",
            "Created reusable UI components library",
            "Mentored junior developers through code reviews"
        ],
        technologies: ["React", "TypeScript", "Git", "GitHub"],
        type: 'work'
    },
    {
        title: "Technical Content Creator",
        company: "Personal Brand",
        location: "Online",
        duration: "2023 - Present",
        description: "Creating educational content and tutorials to help others learn web development.",
        achievements: [
            "Published 20+ technical articles and tutorials",
            "Created comprehensive learning resources",
            "Built a community of 500+ developers"
        ],
        technologies: ["Content Creation", "Teaching", "Community Building"],
        type: 'leadership'
    }
];

const Experience = () => {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'leadership':
                return <Users className="h-6 w-6 text-primary" />;
            case 'freelance':
                return <Target className="h-6 w-6 text-primary" />;
            default:
                return <Building2 className="h-6 w-6 text-primary" />;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'leadership':
                return <Badge variant="default" className="bg-blue-500">Leadership</Badge>;
            case 'freelance':
                return <Badge variant="default" className="bg-green-500">Freelance</Badge>;
            default:
                return <Badge variant="secondary">Work</Badge>;
        }
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient-primary">Experience</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        My professional journey and the impact I've created
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-8">
                    {experienceData.map((experience, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-xl">
                                            {getTypeIcon(experience.type)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-foreground">
                                                {experience.title}
                                            </CardTitle>
                                            <p className="text-lg font-semibold text-primary">
                                                {experience.company}
                                            </p>
                                        </div>
                                    </div>
                                    {getTypeBadge(experience.type)}
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{experience.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{experience.duration}</span>
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                                    {experience.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                        <Trophy className="h-4 w-4 text-primary" />
                                        Key Achievements
                                    </h4>
                                    <ul className="space-y-2">
                                        {experience.achievements.map((achievement, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                                <span className="text-primary mt-1 text-lg">•</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-sm">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

