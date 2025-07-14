"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TagInput from "@/components/ui/TagInput";
import { Textarea } from "@/components/ui/textarea";
import { $Enums, Project, Skill } from "@/lib/generated/prisma";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";

export default function ProjectComponent({
  projects: data,
  skills,
}: {
  projects: Project[];
  skills: Skill[];
}) {
  const [projects, setProjects] = useState(data);
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast.message("Project deleted", {
      description: "The project has been successfully deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Manage Projects</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <Input placeholder="Project Title" name="title" />
              <Textarea
                placeholder="Project Description"
                rows={3}
                name="description"
              />



              <div className="flex flex-row gap-4">
                <Select name="status">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>


                      {Object.keys($Enums.ProjectStatus).map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>



              </div>

              <div className="flex items-center gap-3">
                <Label htmlFor="terms">Featured</Label>
                <Checkbox id="terms" />
              </div>
              <TagInput name="sourceCodeUrl" placeholder="Source Code" />
              <TagInput name="liveUrl" placeholder="live url" />
              <TagInput name="imageUrl" placeholder="image url" />

              <Button type="submit" className="w-full bg-gradient-primary">
                Add Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 bg-gradient-card border-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.featured && (
                    <Badge className="bg-gradient-primary text-xs">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
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
