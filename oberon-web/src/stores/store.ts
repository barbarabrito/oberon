import { create } from "zustand"
import { FeedSlice, createFeedSlice } from "../features/rss-feed/stores/slices/feed-slice"
import { UserSlice, createUserSlice } from "../app/(auth)/auth/stores/slices/user-slice"

const useBoundStore = create<FeedSlice & UserSlice>()((...a) => ({
  ...createFeedSlice(...a),
  ...createUserSlice(...a),
}))

export default useBoundStore
