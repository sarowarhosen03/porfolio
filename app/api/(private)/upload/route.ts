import { deleteFile, uploadFiles } from "@/lib/r2Storage";
import { NextResponse } from "next/server";

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};
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

export async function DELETE(request: Request) {
  const formData = await request.formData();
  const urlsValue = formData.get("urls");
  const urlList = JSON.parse(
    typeof urlsValue === "string" ? urlsValue : "[]"
  ) as string[];
  const res = await deleteFile(urlList);
  return NextResponse.json(res);
}
