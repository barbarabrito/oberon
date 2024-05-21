import { IoMdClose } from "react-icons/io"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from "../../ui/popup"
import useBoundStore from "@//stores/store"
import { DialogTitle } from "@radix-ui/react-dialog"
import { FormEvent, useState } from "react"
import { RiErrorWarningLine } from "react-icons/ri"
import { postUserFolder, findUserFolderByName } from "@//services/userFolders.service"

const CreateFolderPopup = () => {
  const { isCreateFolderPopupOpen, setIsCreateFolderPopupOpen } = useBoundStore()
  const [folderName, setFolderName] = useState("")
  const [folderAlreadyExists, setFolderAlreadyExists] = useState(false)
  const { user } = useBoundStore()

  function cancel(e: FormEvent) {
    e.preventDefault()
    setIsCreateFolderPopupOpen(false)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    createFolder()
  }

  async function createFolder() {
    const searchResult = await searchUserFolders()
    if (searchResult) {
      setFolderAlreadyExists(searchResult)
      return
    }

    await postUserFolder(user.id, folderName)

    setFolderName("")
    setIsCreateFolderPopupOpen(false)
  }

  async function searchUserFolders(): Promise<boolean> {
    const response = await findUserFolderByName(user.id, folderName)

    if (response.hasOwnProperty("id")) {
      setFolderAlreadyExists(true)
      return true
    }

    return false
  }

  return (
    <Dialog open={isCreateFolderPopupOpen} onOpenChange={setIsCreateFolderPopupOpen}>
      <DialogContent className="bg-main border-none w-[400px]">
        <DialogClose className="mt-3 mx-2" asChild>
          <button>
            <IoMdClose className="text-lg" />
          </button>
        </DialogClose>
        <DialogTitle className="text-lg">Create a new folder</DialogTitle>
        <DialogHeader>
          <DialogDescription className="text-gray-400 my-2 w-[344px]">
            <form onSubmit={onSubmit} className="mt-1">
              <div className="w-full m-auto gap-2">
                <div className="w-32 mb-3">Folder name:</div>
                <input
                  onClick={() => setFolderAlreadyExists(false)}
                  type="text"
                  className={`w-full block outline-none text-base bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300 ${folderAlreadyExists ? "border-red-400" : ""}`}
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
                {folderAlreadyExists && (
                  <div className="flex items-center gap-1 mt-2 text-red-400">
                    <RiErrorWarningLine /> A folder with this name already exists
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 justify-end mt-6">
                <button onClick={cancel} className="p-1 px-3 border border-gray-500 rounded-md">
                  Cancel
                </button>
                <input
                  className="p-1 px-3 bg-indigo-300 rounded-md w-fit text-main cursor-pointer"
                  type="submit"
                  value="Save"
                />
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default CreateFolderPopup
