import { Card } from '@/components/ui/card'
import { personalInfo } from '@/utils/data'
import { Mail, MapPin, Phone } from 'lucide-react'
import SendMessageForm from './ui/SendMessageForm'

const Contact = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-gradient-primary">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Have a project in mind? Let&#39;s work together to bring your ideas to life
          </p>
        </div>
        {/* Contact Form */}
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <SendMessageForm />
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-semibold">Let&#39;s Talk</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I&#39;m always open to discussing new opportunities, interesting projects, or just
                having a chat about technology and development.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card transition-smooth border-0 p-6 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-full">
                    <Mail className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">{personalInfo.email}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card transition-smooth border-0 p-6 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-full">
                    <Phone className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted-foreground">{personalInfo.phone}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card transition-smooth border-0 p-6 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-full">
                    <MapPin className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">{personalInfo.location}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
