"use server"

import { RssFeed } from "../types/types"

const parseString = require("xml2js").parseString

type RssFeedResponse = {
  rss: RssFeed
}

export async function getRssFeed(url: string): Promise<RssFeedResponse | null | undefined> {
  try {
    const response = await fetch(url)
    if (!response) return null

    const xmlString = await response.text()
    const parsedXML = await parseXMLResponse(xmlString)

    return parsedXML
  } catch (error) {
    console.log(error)
  }
}

function parseXMLResponse(xml: string): Promise<RssFeedResponse | null> {
  return new Promise((resolve, reject) => {
    parseString(xml, (error: Error, result: RssFeedResponse) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}
