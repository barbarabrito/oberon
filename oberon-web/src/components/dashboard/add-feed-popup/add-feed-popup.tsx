/* eslint-disable @next/next/no-img-element */

import { getRssFeed } from "@//features/rss-feed/api/get-rss-feed"
import useBoundStore from "@//stores/store"
import { ChangeEvent, MouseEvent, useState } from "react"
import { FaRss } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { TbTrashX } from "react-icons/tb"
import { Dialog, DialogClose, DialogContent, DialogOverlay } from "../../ui/popup"
import { RiSettingsLine } from "react-icons/ri"
import { IoClose } from "react-icons/io5"
import { normalizeUrl } from "@//utils/url-normalizer"

type SelectOptions = "SELECT_FOLDER" | "CREATE_NEW_FOLDER"

type Feed = {
  name: string
  url: string
  image_url: string | null
}

type Folder = {
  id?: number
  name?: string
  user_id?: string
}

const AddFeedPopup = () => {
  const { isAddFeedPopupOpen, setIsAddFeedPopupOpen, folders, user } = useBoundStore()
  const [selectedOption, setSelectedOption] = useState<SelectOptions>("SELECT_FOLDER")
  const [isFeedAlreadyAdded, setIsFeedAlreadyAdded] = useState(false)
  const [feedPreview, setFeedPreview] = useState({
    name: "",
    image_url: {} as string | null,
  })

  const [feed, setFeed] = useState<Feed>({
    name: "",
    url: "",
    image_url: "",
  })

  const [folder, setFolder] = useState<Folder>({
    id: 0,
    name: "",
    user_id: "",
  })

  async function addNewFeed(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()

    const normalizedUrl = normalizeUrl(feed.url)
    setFeed({ ...feed, url: normalizedUrl })

    const searchResult = await searchUserFeeds()
    if (searchResult) {
      setIsFeedAlreadyAdded(searchResult)
      return
    }

    const xmlFeed = await getRssFeed(feed.url)

    if (xmlFeed) {
      setFeedPreview({
        name: xmlFeed.rss.channel[0].title[0],
        image_url: xmlFeed.rss.channel[0].image ? xmlFeed.rss.channel[0].image[0].url[0] : null,
      })
    }
  }

  async function searchUserFeeds(): Promise<boolean> {
    const response = await fetch(`/api/users/${user.id}/rss_feeds/search`, {
      method: "POST",
      body: JSON.stringify({
        feed_url: feed.url,
      }),
    })

    if (!response.ok) return false

    const userFeed = await response.json()
    console.log(userFeed)
    if (userFeed.hasOwnProperty("id")) {
      setIsFeedAlreadyAdded(true)
      setFeedPreview({
        name: userFeed.name,
        image_url: userFeed.image_url ?? null,
      })

      return true
    }

    return false
  }

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value as SelectOptions)
  }

  async function createFeed(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()
    const folderId = folders[0] && folder.id === 0 ? folders[0].id : folder.id
    const newFeed = {
      name: feedPreview.name,
      image_url: feedPreview.image_url,
      folder_id: folderId,
      url: feed.url,
    }
    postFeed(newFeed)
  }

  function cancel() {
    setFeedPreview({
      name: "",
      image_url: null,
    })
    setFeed({
      name: "",
      url: "",
      image_url: "",
    })
    setFolder({
      id: 0,
      name: "",
      user_id: "",
    })
    setIsFeedAlreadyAdded(false)
  }

  function handleSelectFolder(e: ChangeEvent<HTMLSelectElement>) {
    const folderId = folders[0] && folder.id === 0 ? folders[0].id : folder.id
    setFolder({
      id: folderId,
      name: "",
      user_id: "",
    })
  }

  async function createFolder(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault()
    const response = await fetch(`/api/users/${user.id}/folders`, {
      method: "POST",
      body: JSON.stringify(folder),
    })

    console.log(response)
  }

  async function postFeed(feed: Feed) {
    const response = await fetch(`/api/users/${user.id}/rss_feeds`, {
      method: "POST",
      body: JSON.stringify(feed),
    })

    if (response.ok) clearAll()
  }

  function clearAll() {
    setFeedPreview({
      name: "",
      image_url: null,
    })

    setFeed({
      name: "",
      url: "",
      image_url: "",
    })

    setFolder({
      id: 0,
      name: "",
      user_id: "",
    })
  }

  return (
    <Dialog open={isAddFeedPopupOpen} onOpenChange={setIsAddFeedPopupOpen}>
      <DialogOverlay className="bg-black/90">
        <DialogContent className="bg-transparent w-full h-full max-w-none">
          <DialogClose className="m-4" asChild>
            <button onClick={cancel}>
              <IoMdClose className="text-4xl" />
            </button>
          </DialogClose>

          <form className="w-full md:w-[580px] m-auto">
            <div className="flex items-center h-12">
              <input
                type="text"
                className="w-full px-2 block outline-none text-base bg-transparent border border-indigo-400 rounded-l-md border-r-none h-full disabled:opacity-20"
                value={feed.url}
                onChange={(e) => setFeed({ ...feed, url: e.target.value })}
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
            {isFeedAlreadyAdded && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 p-1">
                  {feedPreview.image_url ? (
                    <img src={feedPreview.image_url} alt="Feed icon" width={20} height={20} />
                  ) : (
                    <FaRss className="text-orange-300" />
                  )}{" "}
                  {feedPreview.name}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={cancel}
                    className="flex items-center gap-0.5 text-red-300 text-xs -mt-1 relative group "
                  >
                    <IoClose className="h-4 w-4" />
                    Cancel
                  </button>

                  <button className="flex items-center gap-0.5 text-orange-300 text-xs relative group mr-0.5 -mt-1">
                    <RiSettingsLine className="h-4 w-4" />
                    Manage feed
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-300 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
              </div>
            )}
            {!isFeedAlreadyAdded && feedPreview.name && (
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
                  {selectedOption === "SELECT_FOLDER" && (
                    <div className="flex items-center">
                      <button onClick={cancel}>
                        <TbTrashX className="text-red-400 text-xl" />
                      </button>
                      <button
                        onClick={createFeed}
                        className="h-full px-3 py-1.5 text-indigo-400 rounded-md cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  )}
                  {selectedOption === "CREATE_NEW_FOLDER" && (
                    <div className="flex items-center">
                      <button onClick={cancel}>
                        <TbTrashX className="text-red-400 text-xl" />
                      </button>
                      <button
                        onClick={createFolder}
                        className="h-full px-3 py-1.5 text-indigo-400 rounded-md cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-1">
                  <label
                    htmlFor="select_folder"
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
                            value={folder.id}
                            onChange={handleSelectFolder}
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
