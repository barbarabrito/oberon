"use client"
import { getRssFeed } from "@/app/features/rss-feed/api/get-rss-feed"
import useBoundStore from "@/app/stores/store"
import { useEffect, useState } from "react"
import { MdFolderOpen } from "react-icons/md"
import { PiUserCircleFill } from "react-icons/pi"
import * as Collapsible from "@radix-ui/react-collapsible"
import { TbLogout } from "react-icons/tb"
import { LogoutPopup } from "@/app/components/auth/logout-popup"

type Folders = {
  id: number
  name: number
  user_rss_feeds: UserFeed[]
}[]

type UserFeed = {
  id: number
  name: string
  url: string
}

const Sidebar = () => {
  const { setFeed, user } = useBoundStore()
  const [folders, setFolders] = useState<Folders>([])
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false)

  async function getSite(feedUrl: string) {
    const feed = await getRssFeed(feedUrl)
    if (feed) setFeed(feed.rss)
  }

  useEffect(() => {
    async function fetchUserFolders() {
      try {
        const response = await fetch("/mocks/folders.json")
        if (!response.ok) throw new Error("Failed to fetch folders")

        const folders = await response.json()
        setFolders(folders)
      } catch (error) {
        console.error("Error fetching folders:", error)
      }
    }
    fetchUserFolders()
  }, [])

  return (
    <div className="flex flex-grow-0 flex-col h-screen min-w-80 p-2 shadow-md bg-zinc-800 px-4 relative">
      {Object.keys(user).length > 0 && (
        <span className="text-indigo-300 flex items-center gap-1">
          <PiUserCircleFill /> {user.username}
        </span>
      )}
      <section className="mt-5">
        <ul>
          {folders.map((folder) => (
            <li key={folder.id}>
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="flex items-center gap-1 w-full justify-between py-0.5">
                  <div className="flex items-center gap-1.5">
                    <MdFolderOpen className="text-sm" /> {folder.name}
                  </div>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <div className="ml-5 text-gray-300">
                    <ul className="text-sm">
                      {folder.user_rss_feeds.map((feed, index) => (
                        <li key={index} className="text-gray-400 hover:text-gray-200 py-0.5">
                          <button onClick={() => getSite(feed.url)}>{feed.name}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            </li>
          ))}
        </ul>
      </section>
      <section className="absolute bottom-4 left-2 w-[90%]">
        {Object.keys(user).length > 0 && (
          <>
            <button
              onClick={() => setIsLogoutPopupOpen(true)}
              className="text-red-400 text-sm flex gap-2 items-center w-full justify-between"
            >
              Log out <TbLogout className="text-lg" />
            </button>
          </>
        )}
        <LogoutPopup open={isLogoutPopupOpen} setOpen={setIsLogoutPopupOpen} />
      </section>
    </div>
  )
}

export default Sidebar
