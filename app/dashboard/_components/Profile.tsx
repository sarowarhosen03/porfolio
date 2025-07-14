import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/lib/generated/prisma";

export default function Profile({ profileInfo }: {
    profileInfo: PersonalInfo
}) {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Profile Settings</h2>

            <Card className="p-6 bg-gradient-card border-0 max-w-2xl">
                <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <Input defaultValue="Sarowar Hossain" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input defaultValue="sarowar@example.com" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <Textarea
                            defaultValue="Passionate full-stack developer with expertise in modern web technologies."
                            rows={4}
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <Input defaultValue="+880 123 456 789" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <Input defaultValue="Dhaka, Bangladesh" />
                        </div>
                    </div>

                    <Button className="bg-gradient-primary">
                        Update Profile
                    </Button>
                </form>
            </Card>
        </div>
    );
}