"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/lib/generated/prisma";
import resolvePromise from "@/lib/resolvePromise";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { SocialLink, updateProfileAction } from "../action";

export default function Profile({
    info,
}: {
    info: PersonalInfo;
}) {

    const [socialLinks, setSocialLinks] = useState<SocialLink>(info.socialLinks as SocialLink || [
        { id: uuidv4(), name: "", url: "", icon: "", userName: "" }])
    const [isPending, startTransition] = useTransition()
    const handleLinkChange = (index: number, field: string, value: string) => {
        const newLinks = [...socialLinks];
        newLinks[index][field as keyof (typeof newLinks)[0]] = value;
        setSocialLinks(newLinks);
    };
    console.log(info);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        startTransition(async () => {
            const formData = new FormData(event.currentTarget);
            const formEntries = Object.fromEntries(formData);

            const personalInfo = {
                name: formEntries.name ? String(formEntries.name) : "",
                id: info.id,
                description: formEntries.description ? String(formEntries.description) : "",
                email: formEntries.email ? String(formEntries.email) : "",
                phone: formEntries.phone ? String(formEntries.phone) : null,
                location: formEntries.location ? String(formEntries.location) : null,
                imageUrl: info.imageUrl ?? null,
                cvUrl: formEntries.cvUrl ? String(formEntries.cvUrl) : null,
                resumeUrl: formEntries.resumeUrl ? String(formEntries.resumeUrl) : null,
                // status: info.status ?? "",
                // createdAt: info.createdAt,
                // updatedAt: info.updatedAt ?? new Date(),
                socialLinks: socialLinks,
            };


            const [data, error] = await resolvePromise(updateProfileAction(
                personalInfo as PersonalInfo & { socialLinks: SocialLink },
            ));
            if (error || !data?.success) toast.error("soothing went wrong")

            toast.success(data?.message)
        })

    }


    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Profile Settings</h2>

            <Card className="p-6 bg-gradient-card border-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <Input name="name" defaultValue={info.name} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input defaultValue={info.email} name="email" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <Textarea name="description" defaultValue={info.description} rows={4} />
                    </div>


                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Cv</label>
                            <Input defaultValue={info?.cvUrl || ""} name="cvUrl" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Resume</label>
                            <Input defaultValue={info.resumeUrl || ""} name="resumeUrl" />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <Input defaultValue={info?.phone || ""} name="phone" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <Input defaultValue={info.location || ""} name="location" />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Social Links
                        </label>

                        {socialLinks.map((link, index) => (
                            <div key={index} className="grid sm:grid-cols-7  gap-2 mb-3">
                                <Input
                                    className="col-span-2"
                                    placeholder="Media Name (e.g., Twitter)"
                                    value={link.name}
                                    onChange={(e) =>
                                        handleLinkChange(index, "name", e.target.value)
                                    }
                                />
                                <Input
                                    className="col-span-2"
                                    placeholder="URL (e.g., https://twitter.com/yourprofile)"
                                    value={link.url}
                                    onChange={(e) =>
                                        handleLinkChange(index, "url", e.target.value)
                                    }
                                />
                                <Input
                                    className="col-span-2"
                                    placeholder="Icon (e.g., twitter)"
                                    value={link.icon}
                                    onChange={(e) =>
                                        handleLinkChange(index, "icon", e.target.value)
                                    }
                                />

                                <div className="h-full gap-2 justify-around items-center flex">

                                    {

                                        index !== 0 && <ArrowUp onClick={() => {
                                            if (index > 0) {
                                                const newLinks = [...socialLinks];
                                                [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
                                                setSocialLinks(newLinks);
                                            }
                                        }} className="h-4 w-4 hover:text-blue-500 hover:scale-110 cursor-pointer" />

                                    }
                                    {index !== socialLinks.length - 1 && <ArrowDown onClick={() => {
                                        if (index < socialLinks.length - 1) {
                                            const newLinks = [...socialLinks];
                                            [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
                                            setSocialLinks(newLinks);
                                        }
                                    }} className="h-4 w-4 hover:text-blue-500 hover:scale-110 cursor-pointer" />
                                    }
                                    <Trash2 onClick={() => {
                                        setSocialLinks(socialLinks.filter((item, sIndex) => sIndex !== index))
                                    }} className="h-4 w-4  col-span-1 items-center hover:text-red-500   hover:scale-110" />
                                </div>
                            </div>
                        ))}

                        <Button type="button" variant="outline" onClick={() => setSocialLinks([...socialLinks, { id: uuidv4(), name: "", url: "", icon: "", userName: "" },])}>

                            + Add Social Link
                        </Button>
                    </div>

                    <Button disabled={isPending} type="submit" className="bg-gradient-primary cursor-pointer">

                        {isPending ? "please wait" : "Update Profile"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
