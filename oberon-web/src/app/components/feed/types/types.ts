export type Feed = {
  $: Empty
  channel: Channel[]
}

export type Empty = {
  version: string
}

export type Channel = {
  title: string[]
  link: string[]
  description: string[]
  item: Item[]
}

export type Item = {
  title: string[]
  link: string[]
  pubDate: string[]
  comments: string[]
  description: string[]
}
