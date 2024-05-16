"use client"

import useBoundStore from "@//stores/store"
import { formatDate } from "@//utils/formatters/date-formatter"

const FeedReader = () => {
  const { feed } = useBoundStore()

  if (!feed.channel?.length) return <></>

  return (
    <main className="py-2 px-4 h-screen overflow-y-auto w-full">
      {feed.channel[0].item?.map((content, index) => {
        return (
          <div key={index} className="mb-10 text-gray-200">
            <div className="mb-2">
              <a href={content.link[0]} target={"_blank"}>
                <h1 className="text-2xl font-news">{content.title}</h1>
              </a>
              {content.pubDate && <span className="text-xs">{formatDate(content.pubDate[0])}</span>}
            </div>
          </div>
        )
      })}
    </main>
  )
}
export default FeedReader
