"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Project, Skill } from "@/lib/generated/prisma";
import { Edit, Loader2Icon, Trash2 } from "lucide-react";

import resolvePromise from "@/lib/resolvePromise";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import AddAndEditProject from "../../_components/AddAndEditProject";
import { deleteProjectAction } from "../action";

export default function ProjectComponent({
  projects: data,
  skills,
}: {
  projects: Project[];
  skills: Skill[];
}) {




  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Manage Projects</h2>
        <AddAndEditProject skills={skills} />
      </div>

      <div className="grid gap-4">

        {data.map((project) => (
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

                <DeleteProject id={project.id} title={project.title} />

              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DeleteProject({ id, title }: { id: string, title: string }) {
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setDisabled(true);
    const timer = setTimeout(() => setDisabled(false), 3000);
    return () => clearTimeout(timer);
  }, [open]);


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>

        <Button
          variant="outline"
          size="sm"

        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription >
            Deleting <span className="bg-red-500 text-foreground">${" " + title}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={disabled || isPending}
            onClick={async (e) => {
              e.preventDefault()

              startTransition(async () => {
                await new Promise(res => setTimeout(res, 5000))

                const [data, error] = await resolvePromise(deleteProjectAction(id))
                if (error || !data?.success) {
                  toast.error("Failed to delete project");
                }
                else {
                  toast.success(data?.message || "Project deleted successfully!");
                }
              }
              )
            }}
          >
            {isPending && <>
              <Loader2Icon className="animate-spin" />
              Deleting...
            </>}
            {!isPending && "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}