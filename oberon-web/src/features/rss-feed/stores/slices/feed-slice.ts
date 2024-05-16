import { StateCreator } from "zustand"
import { RssFeed } from "../../types/types"

export interface FeedState {
  feeds: RssFeed
}

export interface UserFeed {
  id: number
  name: string
  url: string
  image_url?: string
}

export interface Folders {
  id: number
  user_id: string
  name: number
  rss_feeds: UserFeed[]
}

export interface FeedSlice {
  feed: RssFeed
  setFeed: (feed: RssFeed) => void
  isAddFeedPopupOpen: boolean
  setIsAddFeedPopupOpen: (isAddFeedPopupOpen: boolean) => void
  folders: Folders[]
  setFolders: (folders: Folders[]) => void
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
    isAddFeedPopupOpen: false,
    setIsAddFeedPopupOpen(isAddFeedPopupOpen) {
      set((state) => ({
        ...state,
        isAddFeedPopupOpen,
      }))
    },
    folders: [],
    setFolders(folders) {
      set((state) => ({
        ...state,
        folders,
      }))
    },
  }
}
