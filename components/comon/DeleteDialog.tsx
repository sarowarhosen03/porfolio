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
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Loader2Icon, Trash2 } from "lucide-react";

import resolvePromise from "@/lib/resolvePromise";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";


type DeleteDialogProps = {
    id: string;
    title: string;
    deleteAction: (id: string) => Promise<{ success: boolean; error: string; message?: undefined; } | { success: boolean; message: string; error?: undefined; }>;
};

export default function DeleteDialog({ id, title, deleteAction }: DeleteDialogProps) {
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
                <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deleting <span className="bg-red-500 text-foreground">{` ${title}`}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={disabled || isPending}
                        onClick={async (e) => {
                            e.preventDefault();
                            startTransition(async () => {
                                const [data, error] = await resolvePromise(deleteAction(id))

                                if (error || !data?.success) {
                                    toast.error("Failed to delete project");
                                } else {
                                    toast.success(data?.message || "Deleted successfully!");
                                }
                                setOpen(false);
                            });
                        }}
                    >
                        {isPending ? (
                            <>
                                <Loader2Icon className="animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}