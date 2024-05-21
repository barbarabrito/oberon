import { RssFeed } from "@//types/types"
import { StateCreator } from "zustand"

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
  name: string
  rss_feeds: UserFeed[]
}

export interface FeedSlice {
  feed: RssFeed
  setFeed: (feed: RssFeed) => void
  isAddFeedPopupOpen: boolean
  setIsAddFeedPopupOpen: (isAddFeedPopupOpen: boolean) => void
  isCreateFolderPopupOpen: boolean
  setIsCreateFolderPopupOpen: (isCreateFolderPopupOpen: boolean) => void
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
    isCreateFolderPopupOpen: false,
    setIsCreateFolderPopupOpen(isCreateFolderPopupOpen) {
      set((state) => ({
        ...state,
        isCreateFolderPopupOpen,
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
