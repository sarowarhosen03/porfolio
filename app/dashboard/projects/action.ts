"use server";

import { Project } from "@/lib/generated/prisma";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";
import { revalidatePath } from "next/cache";

export async function addProjectAction(
  payload: Omit<Project, "id" | "createdAt" | "updatedAt">
) {
  const [data, error] = await resolvePromise(
    dbClient.project.create({
      data: payload,
    })
  );
  if (error) return { success: false, error: "Failed to add project." };
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  return { success: true, message: "Project added successfully!", data };
}

export async function deleteProjectAction(id: string) {
  const [data, error] = await resolvePromise(
    dbClient.project.delete({
      where: { id },
    })
  );
  console.log(data, error);

  if (error) return { success: false, error: "Failed to delete project." };
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  return { success: true, message: "Project Deleted successfully!", data };
}
