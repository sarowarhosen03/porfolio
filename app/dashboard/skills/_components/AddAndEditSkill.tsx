import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryList } from "@/data/staticData";
import { Skill } from "@/lib/generated/prisma";
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
import { addSkillAction, editSkillAction } from "./action";
const defaultSkillState = {
  title: "",
  category: "",
  level: 100,
};
export default function AddAndEditSkill({
  isOpen,
  setIsOpen,
  editState,
  setEditState,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setEditState: Dispatch<SetStateAction<Skill | null>>;
  editState: null | Skill;
}) {
  const [isPending, startTransition] = useTransition();

  const [skillState, setSkillState] =
    useState<Omit<Skill, "id" | "createdAt" | "updatedAt">>(defaultSkillState);

  useEffect(() => {
    if (editState) {
      setSkillState(editState);
    } else {
      setSkillState(defaultSkillState);
    }
  }, [editState]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      (async () => {
        const [data, error] = await resolvePromise(
          editState
            ? editSkillAction({ ...skillState, id: editState.id })
            : addSkillAction({ ...skillState })
        );
        if (error || !data?.success) {
          toast.error("Soothing Went Wrong");
        } else {
          setIsOpen(false);
          setSkillState(defaultSkillState);
          toast.success(data?.message || "Skill added successfully!");
        }
      })();
    });
  }
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setSkillState((prev) => ({
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
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editState ? "Edit" : "Add"} Skill</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name='title'
            placeholder="Skill Name"
            value={skillState.title}
            onChange={handleChange}
          />
          <Input

            onChange={handleChange}
            type="number"
            placeholder="Proficiency Level (0-100)"
            name="level"
            value={skillState.level}
          />

          <Select
            required
            name="category"
            value={skillState.category}
            onValueChange={(value: string) =>
              setSkillState((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categoryList.map((item) => (
                  <SelectItem value={item} key={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full bg-gradient-primary">
            {isPending && (
              <>
                <Loader2Icon className="animate-spin" />
                Please wait
              </>
            )}
            {!isPending && `${editState ? "Edit" : "Add"} Skill`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
