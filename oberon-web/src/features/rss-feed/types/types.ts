export type RssFeed = {
  $: {
    version: string
  }
  channel: Channel[]
}

export type Channel = {
  title: string[]
  link: string[]
  description: string[]
  language?: string[]
  copyright?: string[]
  managingEditor?: string[]
  webMaster?: string[]
  pubDate?: string[]
  lastBuildDate?: string[]
  category?: string[]
  generator?: string[]
  docs?: string[]
  cloud?: string[]
  ttl?: string[]
  image?: Image[]
  textInput?: TextInput[]
  skipHours?: string[]
  skipDays?: string[]
  item: Item[]
}

export type Image = {
  url: string[]
  title: string[]
  link: string[]
  width?: string[]
  height?: string[]
}

export type TextInput = {
  title: string[]
  description: string[]
  name: string[]
  link: string[]
}

export type Item = {
  title: string[]
  link: string[]
  description: string[]
  author?: string[]
  category?: string[]
  comments?: string[]
  enclosure?: Enclosure[]
  guid?: string[]
  pubDate?: string[]
  source?: string[]
}

export type Enclosure = {
  url: string[]
  length?: string[]
  type?: string[]
}
