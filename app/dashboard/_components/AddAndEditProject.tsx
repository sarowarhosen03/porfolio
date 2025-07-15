import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    SelectValue,
} from "@/components/ui/select";
import TagInput from "@/components/ui/TagInput";
import { Textarea } from "@/components/ui/textarea";
import { $Enums, Project, Skill } from "@/lib/generated/prisma";
import resolvePromise from "@/lib/resolvePromise";
import { Loader2Icon, Plus } from "lucide-react";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useTransition,
} from "react";
import { toast } from "sonner";
import { addProjectAction, editProjectAction } from "../projects/action";

const defaultProjectState = {
    id: "",
    title: "",
    description: "",
    technologies: [],
    status: $Enums.ProjectStatus.DRAFT,
    featured: false,
    sourceCodeUrl: "",
    liveUrl: "",
    imageUrl: "",
};
export default function AddAndEditProject({
    skills,
    isOpen,
    setIsOpen,
    editState,
    setEditState,
}: {
    skills: Skill[];
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setEditState: Dispatch<SetStateAction<Project | null>>;
    editState: null | Project;
}) {
    const [isPending, startTransition] = useTransition();

    const [projectState, setProjectState] = useState<
        Omit<Project, "createdAt" | "updatedAt">
    >(defaultProjectState);

    useEffect(() => {
        if (editState) {
            setProjectState(editState);
        } else {
            setProjectState(defaultProjectState);
        }
    }, [editState]);

    async function handleAddProjects(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startTransition(() => {
            (async () => {
                const [data, error] = await resolvePromise(
                    editState
                        ? editProjectAction({ ...projectState, id: editState.id })
                        : addProjectAction(projectState)
                );
                if (error || !data?.success) {
                    toast.error("Soothing Went Wrong");
                } else {
                    setIsOpen(false);
                    setProjectState(defaultProjectState)
                    toast.success(data?.message || "Project added successfully!");
                }
            })();
        });
    }
    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        setProjectState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(e) => {
                if (!e) {
                    setEditState(null);
                }
                setIsOpen(e);
            }}
        >
            <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{editState ? "Edit" : "Add New"} Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddProjects} className="space-y-4">
                    <Input
                        onChange={handleChange}
                        value={projectState.title}
                        required
                        placeholder="Project Title"
                        name="title"
                    />
                    <Textarea
                        onChange={handleChange}
                        value={projectState.description}
                        required
                        placeholder="Project Description"
                        rows={3}
                        name="description"
                    />

                    <div className="flex flex-row gap-4">
                        <Select
                            required
                            name="status"
                            value={projectState.status}
                            onValueChange={(value: $Enums.ProjectStatus) =>
                                setProjectState((prev) => ({ ...prev, status: value }))
                            }
                        >
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

                        <div className="flex items-center gap-3">
                            <Label htmlFor="featured">Featured</Label>
                            <Checkbox
                                id="featured"
                                name="featured"
                                checked={projectState.featured}
                                onCheckedChange={(e) =>
                                    setProjectState((prev) => ({ ...prev, featured: Boolean(e) }))
                                }
                            />
                        </div>
                    </div>

                    <Input
                        onChange={handleChange}
                        value={projectState.sourceCodeUrl || ""}
                        name="sourceCodeUrl"
                        placeholder="Source Code"
                    />
                    <Input
                        onChange={handleChange}
                        value={projectState.liveUrl || ""}
                        name="liveUrl"
                        placeholder="live url"
                    />
                    <Input
                        onChange={handleChange}
                        value={projectState.imageUrl || ""}
                        name="imageUrl"
                        placeholder="image url"
                    />
                    <TagInput
                        value={projectState.technologies}
                        onChange={(newUpdate) => {
                            setProjectState((prev) => ({ ...prev, technologies: newUpdate }));
                            // console.log(newUpdate);
                        }}
                        placeholder="technologies"
                    />
                    <div className="flex flex-wrap gap-2">
                        {skills
                            .filter(
                                (skill) => !projectState.technologies.includes(skill.title)
                            )
                            .map((skill, index) => (
                                <Badge
                                    key={index}
                                    className="flex items-center gap-1 bg-primary-foreground text-foreground"
                                    onClick={() =>
                                        setProjectState((prev) => ({
                                            ...prev,
                                            technologies: [...prev.technologies, skill.title],
                                        }))
                                    }
                                >
                                    {skill.title}
                                </Badge>
                            ))}
                    </div>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gradient-primary"
                    >
                        {isPending && (
                            <>
                                <Loader2Icon className="animate-spin" />
                                Please wait
                            </>
                        )}
                        {!isPending && `${editState ? "Edit" : "Add"} Project`}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
