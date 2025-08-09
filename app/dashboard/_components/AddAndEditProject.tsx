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
import { deleteFile } from "@/lib/r2Storage";
import resolvePromise from "@/lib/resolvePromise";
import { } from "@radix-ui/react-alert-dialog";
// Remove this line; do not import File from "buffer"
import { assetsUploads } from "@/lib/imageUpload";
import { DeleteIcon, ImageIcon, Loader2Icon, Plus } from "lucide-react";
import { default as Image } from "next/image";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
    useTransition
} from "react";
import { toast } from "sonner";
import { addProjectAction, editProjectAction } from "../projects/action";
const defaultProejctstate = {
    id: "",
    title: "",
    description: "",
    technologies: [],
    status: $Enums.ProjectStatus.DRAFT,
    featured: false,
    sourceCodeUrl: "",
    liveUrl: "",
    imageUrl: "",
    gallery: [],
    blogContent: "",
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

    const [projectState, setProjectState] =
        useState<Omit<Project, "createdAt" | "updatedAt">>(defaultProejctstate);
    const [imageState, setImageState] = useState<(string | File)[]>(
        projectState.gallery
    );


    useEffect(() => {
        if (editState) {
            setProjectState(editState);
            setImageState(editState.gallery)

        } else {
            setProjectState(defaultProejctstate);
            setImageState([])
        }
    }, [editState]);

    async function handleAddProjects(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startTransition(() => {
            (async () => {

                const fileToUpload = imageState.filter(img => typeof img !== "string")


                const images = await assetsUploads(fileToUpload)


                let imageGlary: string[] = [...projectState.gallery]
                if (editState) {
                    const fileToDelete = projectState.gallery.filter(
                        (img) => !imageState.includes(img)
                    );

                    if (fileToDelete?.length) {
                        await deleteFile(fileToDelete)
                        imageGlary = projectState.gallery.filter((img: string) => !fileToDelete.includes(img))
                    }


                }
                if (images.success && images?.urls) {
                    imageGlary.push(...images?.urls);
                }


                const [data, error] = await resolvePromise(
                    editState
                        ? editProjectAction({
                            ...projectState, id: editState.id,
                            gallery: imageGlary
                        })
                        : addProjectAction({
                            ...projectState,
                            gallery: imageGlary
                        })
                );
                if (error || !data?.success) {
                    toast.error("Soothing Went Wrong");
                } else {
                    setIsOpen(false);
                    setProjectState(defaultProejctstate);
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
                        rows={10}
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

                    <ImageSelector
                        imageState={imageState}
                        setImageState={setImageState}
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
type ImageSelectorProps = {
    imageState: (string | File)[];
    setImageState: Dispatch<SetStateAction<(string | File)[]>>;
};

export function ImageSelector({ imageState, setImageState }: ImageSelectorProps) {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageState((prev) => [
                ...prev,
                ...Array.from(files) as File[]
            ]);
        }
    };

    return (
        <>
            <input
                ref={imageInputRef}
                onChange={handleImageChange}
                name="imageUrl"
                type="file"
                multiple
                accept="image/*"
                hidden
            />
            <div className="flex flex-wrap gap-2 cursor-pointer">
                {imageState.map((src, index) => (
                    <div key={index} className="relative w-[150px] h-[100px]">
                        <Image
                            src={typeof src === "string" ? src : URL.createObjectURL(src)}
                            alt={`Image ${index}`}
                            width={150}
                            height={100}
                            className="rounded shadow object-cover"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setImageState((prev) => prev.filter((_, i) => i !== index));
                            }}
                            className="absolute top-1 right-1 bg-white/70 hover:bg-white text-red-500 p-1 rounded-full"
                        >
                            <DeleteIcon size={16} />
                        </button>
                    </div>
                ))}

                <ImageIcon
                    onClick={(e) => {
                        e.preventDefault();
                        imageInputRef.current?.click();
                    }}
                    size={48}
                />
            </div>
        </>
    );
}
