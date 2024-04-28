import { StateCreator } from "zustand"
import { RssFeed } from "../../types/types"

export interface FeedState {
  feeds: RssFeed
}

export interface FeedSlice {
  feed: RssFeed
  setFeed: (feed: RssFeed) => void
}

export const createFeedSlice: StateCreator<FeedSlice, []> = (set) => {
  return {
    feed: {} as RssFeed,
    setFeed(feed) {
      set((state) => ({
        ...state,
        feed,
      }))
    },
  }
}
