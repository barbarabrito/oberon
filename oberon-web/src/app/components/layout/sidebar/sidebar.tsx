"use client"

import { getRssFeed } from "@/app/features/rss-feed/api/get-rss-feed"
import useBoundStore from "@/app/stores/store"
import { useEffect, useState } from "react"
import { FaFolder } from "react-icons/fa"
import { PiUserCircleFill } from "react-icons/pi"
import * as Collapsible from '@radix-ui/react-collapsible';

type Folders = {
  id: number;
  name: number;
  user_rss_feeds: UserFeed[]
}[];

type UserFeed = {
  id: number
  name: string
  url: string
};

const Sidebar = () => {
  const [folders, setFolders] = useState<Folders>([])

  const { setFeed } = useBoundStore()

  async function getSite(feedUrl: string) {
    const feed = await getRssFeed(feedUrl)
    setFeed(feed.rss)
  }

  useEffect(() => {
    async function fetchUserFolders() {
      try {
        const response = await fetch('/mocks/folders.json');
        if (!response.ok) throw new Error('Failed to fetch folders');

        const folders = await response.json();
        setFolders(folders);

      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    }
    fetchUserFolders();
  }, [])

  return (
    <div className="flex flex-grow-0 flex-col h-screen min-w-80 p-2 shadow-md bg-zinc-700">
      <span className="text-orange-400 flex items-center gap-1">
        <PiUserCircleFill />
        username
      </span>

      <div className="mt-10">
        <ul>
          {folders.map((folder) => (
            <li key={folder.id} className="flex gap-2 items-center cursor-pointer p-0.5">
              <Collapsible.Root>
                <Collapsible.Trigger>
                  <span className="flex items-center gap-2">
                    <FaFolder /> {folder.name}
                  </span>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <div className="ml-6 text-gray-300">
                    <ul className="text-sm">
                      {folder.user_rss_feeds.map((feed, index) => (
                        <li key={index} className="hover:text-gray-400">
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
      </div>
    </div>
  )
}
export default Sidebar
