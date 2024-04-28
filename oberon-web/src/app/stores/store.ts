import { create } from "zustand"
import { FeedSlice, createFeedSlice } from "../components/feed/states/slices/feed-slice"

const useBoundStore = create<FeedSlice>()((...args) => ({
  ...createFeedSlice(...args),
}))

export default useBoundStore
