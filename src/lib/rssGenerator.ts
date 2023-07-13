// scripts/rss.ts
import fs from 'fs'
import RSS from 'rss'
import path from 'path'
import { gfmHeadingId } from "marked-gfm-heading-id";
import { marked } from 'marked'
import { mangle } from "marked-mangle";
import { SupportedLanguages, fallbackLng, initI18next, languages, useTranslation } from './i18n'
import { getDirNames,getPostContent } from './fileUtils'
import matter from 'gray-matter'

const renderer = new marked.Renderer()

renderer.link = (href, _, text) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
renderer.image =(href, title , text) =>{
	console.log({href, title , text})
return `<img src="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
}

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer,
})

marked.use(gfmHeadingId({}))
marked.use(mangle());

const renderPost = (md: string) => marked.parse(md)

const GenerateRSS = async (lng:SupportedLanguages) => {
	const {t} = initI18next(lng, 'common')
  const feed = new RSS({
    title: 'Marku Blog',
    site_url: 'https://www.marku.me',
    feed_url: `https://www.marku.me/feed-${lng}.xml`,
    image_url: 'https://www.marku.me/og.png',
    language: lng,
    description: t('description'),

  })
  const dirNames = getDirNames()

  for (const dirname of dirNames) {
		const { fileContents }=getPostContent(dirname, lng, fallbackLng)

		const { data, content } = matter(fileContents)

		if(data.type != 'blog') {
			continue
		}

    const url = `https://www.marku.me/${lng}/posts/${dirname}`

    feed.item({
      title: data.title,
      description: renderPost(content),
      date: new Date(data.date),
      author: 'Ricardo Martin Marcucci',
      url,
      guid: url,
    })
	}

  const rss = feed.xml({ indent: true })
  fs.writeFileSync(path.join(__dirname,`../../out/feed-${lng}.xml`), rss)
}

for (const l of languages) {
	GenerateRSS(l)
}
