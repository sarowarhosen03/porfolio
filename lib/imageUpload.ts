export const assetsUploads = async (
  files: File[]
): Promise<{
  success: boolean
  urls: string[]
}> => {
  try {
    const results = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData()
        formData.append('files', file)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`)
        }

        const result: { success: boolean; urls: string[] } = await response.json()

        if (!result.success) {
          throw new Error('Upload was not successful')
        }

        return result
      })
    )

    // Fix: Return the reduced array and provide proper type annotation
    const allUrls = results.reduce<string[]>((prev, curr) => {
      if (curr.urls && curr.success) {
        return prev.concat(curr.urls)
      }
      return prev // Fix: Return prev when condition is not met
    }, [])

    return { success: true, urls: allUrls }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('Failed to upload files')
  }
}

export const assetsDelete = async (urls: string[]) => {
  const formData = new FormData()
  formData.append('urls', JSON.stringify(urls))

  try {
    // Send the files to the server
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: 'DELETE',
      body: formData,
    })

    return await response.json()
  } catch (error) {
    throw new Error('Failed to upload')
  }
}
