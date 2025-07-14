import { Card } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skill } from "@/lib/generated/prisma";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Badge, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { toast } from "sonner";

export default function Skill({ skill }: { skill: Skill[] }) {
    const [skills, setSkills] = useState(skill);


    const handleDeleteSkill = (id: number) => {
        setSkills(skills.filter(s => s.id !== id));
        toast.message("Skill deleted", {
            description: "The skill has been successfully deleted."
        })

    };


    return (

        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Skills</h2>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-gradient-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Skill</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        <Input placeholder="Skill Name" />
                        <Input type="number" placeholder="Proficiency Level (0-100)" />
                        <Input placeholder="Category" />
                        <Button type="submit" className="w-full bg-gradient-primary">
                            Add Skill
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="grid gap-4">
                {skills.map((skill) => (
                    <Card key={skill.id} className="p-6 bg-gradient-card border-0">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                                    <Badge variant="outline" className="text-xs">
                                        {skill.category}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        {skill.level}%
                                    </Badge>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-gradient-primary h-2 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteSkill(skill.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>


    );
}