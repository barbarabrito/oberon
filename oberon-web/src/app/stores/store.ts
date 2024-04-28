import { create } from "zustand"
import { FeedSlice, createFeedSlice } from "../features/rss-feed/stores/slices/feed-slice"

const useBoundStore = create<FeedSlice>()((...args) => ({
  ...createFeedSlice(...args),
}))

export default useBoundStore
