"use client"

import { getRssFeed } from "@/app/features/rss-feed/api/get-rss-feed"
import useBoundStore from "@/app/stores/store"
import { FaFolder } from "react-icons/fa"
import { PiUserCircleFill } from "react-icons/pi"

const feeds = [
  {
    id: 1,
    name: "Natoque",
    url: "https://news.ycombinator.com/rss",
  },
  {
    id: 2,
    name: "Ultricies",
    url: "https://news.ycombinator.com/rss",
  },
  {
    id: 3,
    name: "Posuere",
    url: "https://news.ycombinator.com/rss",
  },
  {
    id: 4,
    name: "Ligula",
    url: "https://news.ycombinator.com/rss",
  },
  {
    id: 5,
    name: "Maximus",
    url: "https://news.ycombinator.com/rss",
  },
  {
    id: 6,
    name: "Accumsan",
    url: "https://news.ycombinator.com/rss",
  },
]

const folders = [
  {
    id: 1,
    name: "tech",
  },
  {
    id: 2,
    name: "science",
  },
  {
    id: 3,
    name: "memes",
  },
]

const Sidebar = () => {
  const { setFeed } = useBoundStore()

  async function getSite(feedUrl: string) {
    const feed = await getRssFeed(feedUrl)
    setFeed(feed.rss)
  }

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
              <FaFolder />
              <button>{folder.name}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <ul>
          {feeds.map((feed) => (
            <li key={feed.id}>
              <button onClick={() => getSite(feed.url)}>{feed.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Sidebar
