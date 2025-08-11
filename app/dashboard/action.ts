"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateAllRoute() {
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  revalidatePath("/");
  revalidatePath("/(main)/project/[projectId]", "page");
  revalidatePath("/(main)/project", "page");
  revalidatePath("/dashboard/skills");
  return { status: "ok" };
}
