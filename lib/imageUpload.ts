export const assetsUploads = async (files: File[]) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file); // Use the same key 'files' for each file
  });

  try {
    // Send the files to the server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result: { success: boolean; urls: string[] } = await response.json();

    if (result.success) {
      return result;
    }
    throw new Error("Failed to upload");
  } catch (error) {
    throw new Error("Failed to upload");
  }
};

export const assetsDelete = async (urls: string[]) => {
  const formData = new FormData();
  formData.append("urls", JSON.stringify(urls));

  try {
    // Send the files to the server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "DELETE",
        body: formData,
      }
    );

    return await response.json();
  } catch (error) {
    throw new Error("Failed to upload");
  }
};
