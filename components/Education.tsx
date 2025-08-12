import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, GraduationCap, MapPin } from "lucide-react";

interface EducationItem {
    degree: string;
    institution: string;
    location: string;
    duration: string;
    description: string;
    gpa?: string;
    achievements?: string[];
}

const educationData: EducationItem[] = [
    {
        degree: "Higher School Certificate (HSC)",
        institution: "Dinajpur Govt. City College",
        location: "Dinajpur, Bangladesh",
        duration: "2023",
        description: "Completed Higher Secondary Certificate with focus on core academic subjects.",
        achievements: [
            "Science Group",
            "Mathematics, Physics, Chemistry"
        ]
    }
];

const certificationData: EducationItem[] = [
    {
        degree: "Think in a Redux Way",
        institution: "Learn with Sumit",
        location: "Online Course",
        duration: "2024",
        description: "Comprehensive course on Redux state management and best practices for React applications.",
        achievements: [
            "Redux Toolkit",
            "State Management Patterns",
            "React-Redux Integration"
        ]
    },
    {
        degree: "Reactive Accelerator",
        institution: "Learn with Sumit",
        location: "Online Course",
        duration: "2024",
        description: "Advanced course on reactive programming and modern JavaScript development patterns.",
        achievements: [
            "Reactive Programming",
            "Modern JavaScript",
            "Performance Optimization"
        ]
    }
];

const Education = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient-primary">Education & Certifications</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        My academic background and professional development
                    </p>
                </div>

                {/* Education Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h3 className="text-2xl font-semibold mb-8 text-center">Academic Education</h3>
                    <div className="space-y-8">
                        {educationData.map((education, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <GraduationCap className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl font-semibold text-foreground">
                                                    {education.degree}
                                                </CardTitle>
                                                <p className="text-lg font-medium text-primary">
                                                    {education.institution}
                                                </p>
                                            </div>
                                        </div>
                                        {education.gpa && (
                                            <Badge variant="secondary" className="text-sm">
                                                GPA: {education.gpa}
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">
                                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{education.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{education.duration}</span>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {education.description}
                                    </p>

                                    {education.achievements && education.achievements.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-2">Key Achievements:</h4>
                                            <ul className="space-y-1">
                                                {education.achievements.map((achievement, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <span className="text-primary mt-1">•</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-semibold mb-8 text-center">Professional Courses & Certifications</h3>
                    <div className="space-y-8">
                        {certificationData.map((certification, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <GraduationCap className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl font-semibold text-foreground">
                                                    {certification.degree}
                                                </CardTitle>
                                                <p className="text-lg font-medium text-primary">
                                                    {certification.institution}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">
                                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{certification.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{certification.duration}</span>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {certification.description}
                                    </p>

                                    {certification.achievements && certification.achievements.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-2">Key Topics Covered:</h4>
                                            <ul className="space-y-1">
                                                {certification.achievements.map((achievement, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <span className="text-primary mt-1">•</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
