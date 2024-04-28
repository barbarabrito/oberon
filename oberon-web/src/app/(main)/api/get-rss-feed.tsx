"use server"

import { Feed } from "@/app/components/feed/types/types"

const parseString = require("xml2js").parseString

export async function getRssFeed(url: string) {
  try {
    const response = await fetch(url)
    if (!response) return

    const xmlString = await response.text()
    const parsedXML = await parseXMLResponse(xmlString)
    return parsedXML

  } catch (error) {
    console.log(error)
  }
}

function parseXMLResponse(xml: string): any {
  return new Promise((resolve, reject) => {
    parseString(xml, (error: Error, result: Feed) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
