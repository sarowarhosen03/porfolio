'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import resolvePromise from '@/lib/resolvePromise'
import sendEmail from '@/lib/sendEmail'
import { Send } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export default function SendMessageForm() {
    const [contactState, setContactState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, startTransition] = useTransition()
    const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({})

    function validateField(fieldName: keyof typeof contactState, value: string): string | undefined {
        switch (fieldName) {
            case 'name':
                if (!value.trim()) return 'Name is required.'
                if (value.trim().length < 2) return 'Name must be at least 2 characters.'
                return undefined
            case 'email':
                if (!value.trim()) return 'Email is required.'
                // Simple RFC5322-inspired email check

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
                if (!emailRegex.test(value)) return 'Enter a valid email address.'
                return undefined
            case 'subject':
                if (!value.trim()) return 'Subject is required.'
                if (value.trim().length < 3) return 'Subject must be at least 3 characters.'
                return undefined
            case 'message':
                if (!value.trim()) return 'Message is required.'
                if (value.trim().length < 10) return 'Message must be at least 10 characters.'
                return undefined
            default:
                return undefined
        }
    }

    function validateAll(): boolean {
        const newErrors: typeof errors = {
            name: validateField('name', contactState.name),
            email: validateField('email', contactState.email),
            subject: validateField('subject', contactState.subject),
            message: validateField('message', contactState.message),
        }
        setErrors(newErrors)
        return !Object.values(newErrors).some(Boolean)
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setContactState((prev) => ({ ...prev, [name]: value }))
        // live-validate field
        const key = name as keyof typeof contactState
        setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }))
    }

    return (
        <Card className="bg-gradient-card border-0 p-8 shadow-lg">
            <h3 className="mb-6 text-2xl font-semibold">Send a Message</h3>

            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!validateAll()) {
                        toast.error('Please fix the highlighted fields.')
                        return
                    }
                    startTransition(async () => {
                        const [data, error] = await resolvePromise(sendEmail(contactState))
                        if (error) {
                            toast.error('Failed to send message. Please try again later.')
                            return
                        }
                        if (data?.success) {
                            toast.success('Message sent successfully!')
                            setContactState({
                                name: '',
                                email: '',
                                subject: '',
                                message: '',
                            })
                        }
                    })
                }}
            >
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Name</label>
                        <Input
                            value={contactState.name}
                            onChange={handleChange}
                            onBlur={(e) => setErrors((prev) => ({ ...prev, name: validateField('name', e.target.value) }))}
                            name="name"
                            placeholder="Your Name"
                            aria-invalid={!!errors.name}
                            className={`bg-background/50 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <Input
                            value={contactState.email}
                            onChange={handleChange}
                            onBlur={(e) => setErrors((prev) => ({ ...prev, email: validateField('email', e.target.value) }))}
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            aria-invalid={!!errors.email}
                            className={`bg-background/50 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Subject</label>
                    <Input
                        value={contactState.subject}
                        onChange={handleChange}
                        onBlur={(e) => setErrors((prev) => ({ ...prev, subject: validateField('subject', e.target.value) }))}
                        name="subject"
                        placeholder="Project Discussion"
                        aria-invalid={!!errors.subject}
                        className={`bg-background/50 ${errors.subject ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Message</label>
                    <Textarea
                        value={contactState.message}
                        onChange={handleChange}
                        onBlur={(e) => setErrors((prev) => ({ ...prev, message: validateField('message', e.target.value) }))}
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        aria-invalid={!!errors.message}
                        className={`bg-background/50 resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth focus-visible:ring-primary w-full py-3 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60">
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </Card>
    )
}
