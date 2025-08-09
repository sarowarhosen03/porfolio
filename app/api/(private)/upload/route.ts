import { uploadFiles } from "@/lib/r2Storage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const formDataEntryValues = Array.from(formData.getAll("files"));

  const files = [];

  for (const formDataEntryValue of formDataEntryValues) {
    if (typeof formDataEntryValue === "object") {
      const file = formDataEntryValue as unknown as File;
      files.push(file);
    }
  }

  const uploadResult = await uploadFiles(files);

  return NextResponse.json(uploadResult, {
    status: uploadResult.status,
  });
}
