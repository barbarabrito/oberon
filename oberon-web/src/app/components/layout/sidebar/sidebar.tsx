"use client"
import { getRssFeed } from "@/app/features/rss-feed/api/get-rss-feed"
import useBoundStore from "@/app/stores/store"
import { useEffect, useState } from "react"
import { MdFolderOpen } from "react-icons/md"
import { PiUserCircleFill } from "react-icons/pi"
import * as Collapsible from "@radix-ui/react-collapsible"
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser-client"
import { TbLogout } from "react-icons/tb"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/popup"

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
      {user && (
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
        {user && (
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

const LogoutPopup = ({ open, setOpen }: any) => {
  const supabase = createSupabaseBrowserClient()

  async function logout() {
    await supabase.auth.signOut({ scope: "local" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-main-background border-none ">
        <DialogHeader>
          <DialogTitle className="mb-4 text-gray-300">
            Are you sure you want to log out?
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Click &quot;Cancel&quot; to return or &quot;Logout&quot; to proceed.
            <span className="mt-4 text-right flex items-center gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="text-gray-400">
                Cancel
              </button>
              <button onClick={logout} className="text-red-400">
                Logout
              </button>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Sidebar
