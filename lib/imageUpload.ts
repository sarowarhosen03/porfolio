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
    console.log(error);
    
    throw new Error("Failed to upload");
  }
};
