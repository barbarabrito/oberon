import { Dialog, DialogContent, DialogOverlay } from "@/app/components/ui/popup"
import useBoundStore from "@/app/stores/store"
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { getRssFeed } from "@/app/features/rss-feed/api/get-rss-feed"
import Image from "next/image"

const AddFeedPopup = () => {
  const { isAddFeedPopupOpen, setIsAddFeedPopupOpen, folders } = useBoundStore()
  const [feedUrl, setFeedUrl] = useState("")
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(Boolean)
  const [selectedOption, setSelectedOption] = useState("select_folder")
  const [feedPreview, setFeedPreview] = useState({
    name: "",
    image_url: {} as string | null,
  })

  async function addNewFeed(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()

    const xmlFeed = await getRssFeed(feedUrl)

    if (xmlFeed) {
      setIsAddButtonDisabled(true)
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
    setSelectedOption(e.target.value)
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
                value={"https://techcrunch.com/feed/"}
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

            <div className="p-1"></div>

            {feedPreview.name && (
              <div className="border rounded-md p-4 pb-8 border-indigo-300 border-opacity-15">
                <div className="mt-3 text-gray-300 gap-2 mb-4 flex justify-between">
                  <div className=" flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    {feedPreview.image_url && <img src={feedPreview.image_url} alt="Feed icon" width={20} height={20} />}{" "}
                    {feedPreview.name}
                  </div>

                  <input
                    className="h-full px-3 py-1.5 text-indigo-400 rounded-md cursor-pointer "
                    type="submit"
                    value="Save"
                  />
                </div>

                {isAddButtonDisabled && (
                  <div className="mt-1">
                    <label
                      htmlFor="create_new_folder"
                      className={`flex items-center justify-between gap-1 ${selectedOption === "select_folder" ? "text-white" : "text-gray-700"} `}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <input
                          type="radio"
                          id="select_folder"
                          name="select_type"
                          value="select_folder"
                          checked={selectedOption === "select_folder"}
                          onChange={handleOptionChange}
                          className="checked:text-gray-800"
                        />
                        <div className="flex items-center gap-3 mt-1 px-1">
                          Select a folder
                          {selectedOption === "select_folder" && (
                            <select name="folders_selector" id="folders_selector" className="bg-black">
                              {folders.map((folder) => {
                                return (
                                  <option value={folder.id} key={folder.id}>
                                    {folder.name}
                                  </option>
                                )
                              })}
                            </select>
                          )}
                        </div>
                      </div>

                    </label>

                    <div className="flex items-center gap-2 mt-2">
                      <label
                        htmlFor="create_new_folder"
                        className={`flex items-center gap-1 ${selectedOption === "create_new_folder" ? "text-white" : "text-gray-700"}`}
                      >
                        <input
                          type="radio"
                          id="create_new_folder"
                          name="select_type"
                          value="create_new_folder"
                          checked={selectedOption === "create_new_folder"}
                          onChange={handleOptionChange}
                        />

                        <div className="flex items-center gap-3 px-1 checked:text-red-400">
                          Create a new folder
                          {selectedOption === "create_new_folder" && (
                            <input
                              className={`block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300 w-36 ${selectedOption === "create_new_folder" ? "border-white" : "border-gray-700"}`}
                              type="text"
                              name="new_folder"
                              placeholder=""
                              required
                              disabled={selectedOption !== "create_new_folder"}
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
export default AddFeedPopup
