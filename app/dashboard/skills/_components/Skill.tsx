"use client";
import DeleteDialog from "@/components/comon/DeleteDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skill } from "@/lib/generated/prisma";
import { Edit } from "lucide-react";
import { useState } from "react";
import AddAndEditSkill from "./AddAndEditSkill";
import { deleteSkillAction } from "./action";

export default function SkillPage({ skills }: { skills: Skill[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editState, setEditState] = useState<null | Skill>(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Skills</h2>
                <AddAndEditSkill

                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    editState={editState}
                    setEditState={setEditState}
                />
            </div>

            <div className="grid gap-4">
                {skills.map((skill) => (
                    <Card key={skill.id} className="p-6 bg-gradient-card border-0">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold">{skill.title}</h3>
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
                                <Button variant="outline" size="sm"
                                    onClick={() => {
                                        setIsOpen(true)
                                        setEditState(skill)
                                    }}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <DeleteDialog id={skill.id} title={skill.title} deleteAction={deleteSkillAction} />

                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
