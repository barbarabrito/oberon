import { Dialog, DialogContent, DialogOverlay } from "@/app/components/ui/popup"
import useBoundStore from "@/app/stores/store"
import { FormEvent, MouseEvent, useState } from "react"
import { Folders } from "@/app/features/rss-feed/stores/slices/feed-slice"
import { getRssFeed } from "@/app/features/rss-feed/api/get-rss-feed"

const AddFeedPopup = () => {
  const { isAddFeedPopupOpen, setIsAddFeedPopupOpen, folders } = useBoundStore()
  const [feedUrl, setFeedUrl] = useState("")
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(Boolean)
  // const [newFeedForm, setNewFeedForm] = useState({
  //   folders: {} as Folders,
  // })

  async function addNewFeed(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()

    const xmlFeed = await getRssFeed(feedUrl)

    if (xmlFeed) {
      setIsAddButtonDisabled(true)
    }

    const feed = {
      name: xmlFeed?.rss.channel[0].title[0],
      url: feedUrl,
    }
    console.log(feed)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <Dialog open={isAddFeedPopupOpen} onOpenChange={setIsAddFeedPopupOpen}>
      <DialogOverlay className="bg-black">
        <DialogContent className="bg-transparent max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center h-12">
              <input
                type="text"
                className="w-full px-2 block outline-none text-base bg-transparent border border-indigo-400 rounded-l-md border-r-none h-full disabled:opacity-20"
                onChange={(e) => setFeedUrl(e.target.value)}
                disabled={isAddButtonDisabled}
              />
              <button
                onClick={addNewFeed}
                disabled={isAddButtonDisabled}
                className="bg-indigo-400 h-full rounded-r-md px-6 text-white disabled:opacity-15"
              >
                Add
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4 justify-between">
              <div className="flex items-center gap-3 mt-1 px-1">
                <p> Select a folder: </p>
                <select name="folders-selector" id="folders-selector" className="bg-black">
                  {folders.map((folder) => {
                    return (
                      <option value={folder.id} key={folder.id}>
                        {folder.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <input
                className="h-full px-2 text-indigo-400 rounded-md cursor-pointer"
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
export default AddFeedPopup
