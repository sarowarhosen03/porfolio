"use server";

import { PersonalInfo } from "@/lib/generated/prisma";
import resolvePromise from "@/lib/resolvePromise";
import { dbClient } from "@/prismaClient";
import { revalidatePath } from "next/cache";
export type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
  userName: string;
}[];
export async function updateProfileAction(
  payload: PersonalInfo & {
    socialLinks: SocialLink;
  }
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_data, error] = await resolvePromise(
    dbClient.personalInfo.update({
      where: {
        id: payload.id,
      },
      data: {
        cvUrl: payload.cvUrl,
        description: payload.description,
        email: payload.email,
        imageUrl: payload.imageUrl,
        location: payload.location,
        name: payload.name,
        phone: payload.phone,
        resumeUrl: payload.resumeUrl,
        socialLinks: payload.socialLinks,
      },
    })
  );
  if (error) return { success: false, message: "failed to update" };
  revalidatePath("/dashboard/profile");
  return { success: false, message: "Updated Successfully" };
}
