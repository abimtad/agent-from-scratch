import { z } from 'zod'
import fetch from 'node-fetch'


export const reddit = async () => {
  const { data } = await fetch('https://www.reddit.com/r/aww/.json').then(
    (res) => res.json()
  )

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upVotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
