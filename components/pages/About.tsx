import { SocialLink } from "@/app/dashboard/profile/action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfo, Project, Skill } from "@/lib/generated/prisma";
import { Github, Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const About = ({ data }: { data: [PersonalInfo, Skill[], Project[]] }) => {
    const [personalInfo, skills, projects] = data;

    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            {/* Hero Section */}
            <section className="pt-20 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                About Me
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Get to know me better - my journey, passion for technology, and what drives me to create amazing digital experiences.
                            </p>
                        </div>

                        {/* Profile Overview */}
                        <Card className="mb-16 shadow-lg border-0 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="grid md:grid-cols-3 gap-8 items-center">
                                    {/* Profile Image */}
                                    <div className="flex justify-center">
                                        <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full shadow-2xl flex items-center justify-center">
                                            <div className="w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-full shadow-inner"></div>
                                        </div>
                                    </div>

                                    {/* Basic Info */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-2">{personalInfo.name}</h2>
                                            <p className="text-xl text-muted-foreground mb-4">Software Developer</p>
                                            <p className="text-lg leading-relaxed">{personalInfo.description}</p>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {personalInfo.email && (
                                                <div className="flex items-center gap-3">
                                                    <Mail className="h-5 w-5 text-primary" />
                                                    <span className="text-muted-foreground">{personalInfo.email}</span>
                                                </div>
                                            )}
                                            {personalInfo.phone && (
                                                <div className="flex items-center gap-3">
                                                    <Phone className="h-5 w-5 text-primary" />
                                                    <span className="text-muted-foreground">{personalInfo.phone}</span>
                                                </div>
                                            )}
                                            {personalInfo.location && (
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="h-5 w-5 text-primary" />
                                                    <span className="text-muted-foreground">{personalInfo.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex gap-3">
                                            {personalInfo.socialLinks && (personalInfo.socialLinks as SocialLink).map((item, i) => (
                                                <Link key={i} href={item.url}>
                                                    <Button variant="outline" size="icon" className="rounded-full hover:shadow-lg transition-all">
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: item.icon }}
                                                            className="h-5 w-5"
                                                        />
                                                    </Button>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
                            <p className="text-lg text-muted-foreground">
                                Technologies and tools I work with to bring ideas to life
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {["Front End", "backend", "Others Tools"].map((category) => (
                                <Card key={category} className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl">{category}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {skills
                                                .filter((skill) => skill.category === category)
                                                .map((skill) => (
                                                    <Badge key={skill.id} variant="secondary" className="text-sm">
                                                        {skill.title}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Showcase */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                            <p className="text-lg text-muted-foreground">
                                A selection of my recent work and achievements
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.slice(0, 6).map((project) => (
                                <Card key={project.id} className="shadow-lg border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies?.map((tech, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            {project.sourceCodeUrl && (
                                                <Link href={project.sourceCodeUrl}>
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        <Github className="h-4 w-4 mr-2" />
                                                        Code
                                                    </Button>
                                                </Link>
                                            )}
                                            {project.liveUrl && (
                                                <Link href={project.liveUrl}>
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        <Globe className="h-4 w-4 mr-2" />
                                                        Live
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {projects.length > 6 && (
                            <div className="text-center mt-8">
                                <Link href="/#projects">
                                    <Button variant="outline" size="lg">
                                        View All Projects
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Let's Work Together
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            I'm always interested in new opportunities and exciting projects.
                            Let's discuss how we can bring your ideas to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/#contact">
                                <Button size="lg" className="px-8">
                                    Get In Touch
                                </Button>
                            </Link>
                            <Link href="/#projects">
                                <Button variant="outline" size="lg" className="px-8">
                                    View My Work
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
