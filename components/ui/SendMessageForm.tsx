"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import resolvePromise from "@/lib/resolvePromise";
import sendEmail from "@/lib/sendEmail";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function SendMessageForm() {
    const [contactState, setContactState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, startTransition] = useTransition();
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setContactState((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <Card className="p-8 bg-gradient-card border-0 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    startTransition(async () => {
                        const [data, error] = await resolvePromise(sendEmail(contactState));
                        if (error) {
                            toast.error("Failed to send message. Please try again later.");
                            return;
                        }
                        if (data?.success) {
                            toast.success("Message sent successfully!");
                            setContactState({
                                name: "",
                                email: "",
                                subject: "",
                                message: "",
                            });
                        }
                    });
                }}
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <Input
                            value={contactState.name}
                            onChange={handleChange}
                            name="name"
                            placeholder="Your Name"
                            className="bg-background/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                            value={contactState.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            className="bg-background/50"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                        value={contactState.subject}
                        onChange={handleChange}
                        name="subject"
                        placeholder="Project Discussion"
                        className="bg-background/50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                        value={contactState.message}
                        onChange={handleChange}
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="bg-background/50 resize-none"
                    />
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-smooth py-3">
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}

                </Button>
            </form>
        </Card>
    );
}