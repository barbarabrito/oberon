/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogClose, DialogContent, DialogOverlay } from "@/src/components/ui/popup"
import { getRssFeed } from "@/src/features/rss-feed/api/get-rss-feed"
import useBoundStore from "@/src/stores/store"
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { FaRss } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { TbTrashX } from "react-icons/tb"

type SelectOptions = "SELECT_FOLDER" | "CREATE_NEW_FOLDER"

const AddFeedPopup = () => {
  const { isAddFeedPopupOpen, setIsAddFeedPopupOpen, folders } = useBoundStore()
  const [feedUrl, setFeedUrl] = useState("")
  const [selectedOption, setSelectedOption] = useState<SelectOptions>("SELECT_FOLDER")
  const [feedPreview, setFeedPreview] = useState({
    name: "",
    image_url: {} as string | null,
  })

  async function addNewFeed(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()

    const xmlFeed = await getRssFeed(feedUrl)

    if (xmlFeed) {
      const feed = {
        name: xmlFeed.rss.channel[0].title[0],
        url: feedUrl,
        image: xmlFeed.rss.channel[0].image ? xmlFeed.rss.channel[0].image[0].url[0] : null,
      }
      setFeedPreview({
        name: feed.name,
        image_url: feed.image,
      })
      console.log(feed)
    }
  }

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value as SelectOptions)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsAddFeedPopupOpen(false)
  }

  function cancel() {
    setFeedPreview({
      name: "",
      image_url: null,
    })
  }

  return (
    <Dialog open={isAddFeedPopupOpen} onOpenChange={setIsAddFeedPopupOpen}>
      <DialogOverlay className="bg-black/90">
        <DialogContent className="bg-transparent w-full h-full max-w-none">
          <DialogClose className="m-4">
            <IoMdClose className="text-4xl" />
          </DialogClose>

          <form onSubmit={handleSubmit} className="w-1/3 m-auto">
            <div className="flex items-center h-12">
              <input
                type="text"
                className="w-full px-2 block outline-none text-base bg-transparent border border-indigo-400 rounded-l-md border-r-none h-full disabled:opacity-20"
                value={"https://techcrunch.com/feed/"}
                onChange={(e) => setFeedUrl(e.target.value)}
                disabled={feedPreview.name ? true : false}
              />
              <button
                onClick={addNewFeed}
                disabled={feedPreview.name ? true : false}
                className="bg-indigo-400 h-full rounded-r-md px-6 text-white disabled:opacity-15"
              >
                Add
              </button>
            </div>
            <div className="p-1"></div>
            {feedPreview.name && (
              <div className="border rounded-md p-4 pb-10 border-indigo-300 border-opacity-15">
                <div className="mt-3 text-gray-300 gap-2 mb-4 flex justify-between">
                  <div className=" flex items-center gap-1.5">
                    {feedPreview.image_url ? (
                      <img src={feedPreview.image_url} alt="Feed icon" width={20} height={20} />
                    ) : (
                      <FaRss className="text-orange-300" />
                    )}{" "}
                    {feedPreview.name}
                  </div>
                  <div className="flex items-center">
                    <button onClick={cancel}>
                      <TbTrashX className="text-red-400 text-xl" />
                    </button>
                    <input
                      className="h-full px-3 py-1.5 text-indigo-400 rounded-md cursor-pointer"
                      type="submit"
                      value="Save"
                    />
                  </div>
                </div>

                <div className="mt-1">
                  <label
                    htmlFor="CREATE_NEW_FOLDER"
                    className={`flex items-center justify-between gap-1 ${selectedOption === "SELECT_FOLDER" ? "text-white" : "text-gray-600"} `}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <input
                        type="radio"
                        id="select_folder"
                        name="select_type"
                        value="SELECT_FOLDER"
                        checked={selectedOption === "SELECT_FOLDER"}
                        onChange={handleOptionChange}
                        className="checked:text-gray-800"
                      />
                      <div className="flex items-center gap-3 mt-1 px-1">
                        Select a folder
                        {selectedOption === "SELECT_FOLDER" && (
                          <select
                            name="folders_selector"
                            id="folders_selector"
                            className="bg-black"
                          >
                            {folders.map((folder) => (
                              <option value={folder.id} key={folder.id}>
                                {folder.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </label>

                  <div className="flex items-center gap-2 mt-2">
                    <label
                      htmlFor="create_new_folder"
                      className={`flex items-center gap-1 ${selectedOption === "CREATE_NEW_FOLDER" ? "text-white" : "text-gray-600"}`}
                    >
                      <input
                        type="radio"
                        id="create_new_folder"
                        name="select_type"
                        value="CREATE_NEW_FOLDER"
                        checked={selectedOption === "CREATE_NEW_FOLDER"}
                        onChange={handleOptionChange}
                      />

                      <div className="flex items-center gap-3 px-1">
                        Create a new folder
                        {selectedOption === "CREATE_NEW_FOLDER" && (
                          <input
                            className={`block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300 w-36 ${selectedOption === "CREATE_NEW_FOLDER" ? "border-white" : "border-gray-700"}`}
                            type="text"
                            name="new_folder"
                            placeholder=""
                            required
                            disabled={selectedOption !== "CREATE_NEW_FOLDER"}
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
export default AddFeedPopup
