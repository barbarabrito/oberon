"use client"

import useBoundStore from "@/app/stores/store"

const Dashboard = () => {
  const { feed } = useBoundStore()

  if (!feed.channel?.length) return <></>

  return (
    <main className="py-2 px-4 h-screen overflow-y-auto w-full">
      {feed.channel[0].item?.map((content, index) => {
        return (
          <div key={index} className="mb-4 text-gray-200">
            <div className="mb-2">
              <a href={content.link[0]} target={"_blank"}>
                <h1 className="text-2xl font-news">{content.title}</h1>
              </a>
              <span className="text-xs">{content.pubDate}</span>
            </div>
          </div>
        )
      })}
    </main>
  )
}
export default Dashboard
