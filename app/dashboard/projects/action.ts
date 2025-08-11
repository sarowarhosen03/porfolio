"use server";

import { Project } from "@/lib/generated/prisma";
import { assetsDelete } from "@/lib/imageUpload";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";
import { revalidatePath } from "next/cache";

export async function addProjectAction(
  payload: Project | Omit<Project, "createdAt" | "updatedAt">
) {
  delete (payload as Partial<Project>).id;
  const [data, error] = await resolvePromise(
    dbClient.project.create({
      data: payload,
    })
  );

  if (error) return { success: false, error: "Failed to add project." };
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  revalidatePath("/");
  revalidatePath("/(main)/project/[projectId]", "page");

  return { success: true, message: "Project added successfully!", data };
}

export async function editProjectAction(
  payload: Project | Omit<Project, "createdAt" | "updatedAt">
) {
  const [data, error] = await resolvePromise(
    dbClient.project.update({
      where: { id: payload.id },
      data: {
        ...payload,
        createdAt: undefined,
        updatedAt: undefined,
      },
    })
  );
  if (error) return { success: false, error: "Failed to update project." };
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  return { success: true, message: "Project updated successfully!", data };
}
export async function deleteProjectAction(id: string, images?: string[]) {
  const [data, error] = await resolvePromise(
    dbClient.project.delete({
      where: { id },
    })
  );
  if (images && images?.length) {
    await assetsDelete(images as string[]);
  }

  if (error) return { success: false, error: "Failed to delete project." };
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  revalidatePath("/");
  revalidatePath("/(main)/project/[projectId]", "page");

  return { success: true, message: "Project Deleted successfully!" };
}
