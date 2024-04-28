import { StateCreator } from "zustand"
import { Feed } from "../../types/types"

export interface FeedState {
  feeds: Feed
}

export interface FeedSlice {
  feed: Feed
  setFeed: (feed: Feed) => void
}

export const createFeedSlice: StateCreator<FeedSlice, []> = (set) => {
  return {
    feed: {} as Feed,
    setFeed(feed) {
      set((state) => ({
        ...state,
        feed,
      }))
    },
  }
}
