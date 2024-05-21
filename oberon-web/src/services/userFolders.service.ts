export async function postUserFolder(userId: string, folder: string) {
  const response = await fetch(`/api/users/${userId}/folders`, {
    method: "POST",
    body: JSON.stringify(folder),
  })

  console.log(response)

  const { id: folderId } = await response.json()

  return folderId
}

export async function searchUserFolderByName(userId: string, folderName: string) {
  const response = await fetch(`/api/users/${userId}/folders/search`, {
    method: "POST",
    body: JSON.stringify({
      folder_name: folderName,
    }),
  })

  return await response.json()
}
