import { UserFeed } from "../features/rss-feed/stores/slices/feed-slice"

export async function postUserFeed(
  userId: string,
  feed: {
    name: string
    url: string
    image_url: string | null
  },
): Promise<UserFeed | null> {
  const response = await fetch(`/api/users/${userId}/rss_feeds`, {
    method: "POST",
    body: JSON.stringify(feed),
  })

  console.log(response)

  return await response.json()
}

export async function searchUserFeedByUrl(
  userId: string,
  feedUrl: string,
): Promise<UserFeed | null> {
  const response = await fetch(`/api/users/${userId}/rss_feeds/search`, {
    method: "POST",
    body: JSON.stringify({
      feed_url: feedUrl,
    }),
  })
  return await response.json()
}
