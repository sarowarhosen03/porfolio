import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface TestimonialItem {
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar?: string;
}

const testimonialsData: TestimonialItem[] = [
    {
        name: "Sarah Johnson",
        role: "Product Manager",
        company: "TechCorp",
        content: "Sarowar delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success. The final product exceeded our expectations.",
        rating: 5,
        avatar: "/avatars/sarah.jpg"
    },
    {
        name: "Mike Chen",
        role: "CTO",
        company: "StartupXYZ",
        content: "Working with Sarowar was a pleasure. He understood our requirements perfectly and delivered a scalable solution that exceeded our expectations. Highly recommended for any development project.",
        rating: 5,
        avatar: "/avatars/mike.jpg"
    },
    {
        name: "Emily Rodriguez",
        role: "Designer",
        company: "Creative Agency",
        content: "Sarowar's ability to translate designs into pixel-perfect, responsive websites is outstanding. His communication skills and technical expertise make him an invaluable team member.",
        rating: 5,
        avatar: "/avatars/emily.jpg"
    },
    {
        name: "David Kim",
        role: "Project Manager",
        company: "Digital Solutions",
        content: "Sarowar consistently delivers high-quality code and maintains excellent communication throughout the project. His problem-solving skills and attention to detail are exceptional.",
        rating: 5,
        avatar: "/avatars/david.jpg"
    },
    {
        name: "Lisa Wang",
        role: "Founder",
        company: "Innovation Labs",
        content: "Sarowar helped us build a complex web application from scratch. His technical knowledge and ability to explain complex concepts made the entire process smooth and successful.",
        rating: 5,
        avatar: "/avatars/lisa.jpg"
    },
    {
        name: "Alex Thompson",
        role: "Senior Developer",
        company: "CodeCraft",
        content: "I've worked with many developers, but Sarowar stands out for his clean code, attention to detail, and willingness to go above and beyond. A true professional in every sense.",
        rating: 5,
        avatar: "/avatars/alex.jpg"
    }
];

const Testimonials = () => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
            />
        ));
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient-primary">Trusted Voices</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Valuable insights and genuine praise from respected professionals and clients who've experienced my dedication and impact.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonialsData.map((testimonial, index) => (
                        <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/50 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            <p className="text-sm text-primary">{testimonial.company}</p>
                                        </div>
                                    </div>
                                    <Quote className="h-6 w-6 text-primary/30 group-hover:text-primary/50 transition-colors" />
                                </div>
                                <div className="flex items-center gap-1">
                                    {renderStars(testimonial.rating)}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <blockquote className="text-muted-foreground leading-relaxed italic">
                                    "{testimonial.content}"
                                </blockquote>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                            Ready to Start Your Project?
                        </h3>
                        <p className="text-muted-foreground mb-8">
                            This isn't just a project to me, it's your dream, and I own it like my own.
                            I won't stop until it's perfect, because your success is my responsibility.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                                Start a Project
                            </button>
                            <button className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold">
                                Download Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

