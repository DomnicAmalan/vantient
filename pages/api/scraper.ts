import * as cheerio from 'cheerio'
import Axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/app/utils/mongoclient'

export default async(req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req?.method === 'POST' && req?.body?.url) {
      const { data, status } = await Axios.get(req?.body?.url, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
      })
      if (status === 200) {
        const html = cheerio.load(data, {
          xmlMode: false
        });
        const tag: any = {
          url: req?.body?.url
        }
        const formparent = await html('form').last()
        const newsletterparrentclass = formparent?.get(0)?.attribs
        const newsletterinputid = formparent.find('[type="email"]').get(0)?.attribs
        if (newsletterparrentclass || newsletterinputid) {
          tag['formaccess'] = {
            inputid: newsletterinputid?.id,
            inputclass: newsletterinputid?.class,
            inputname: newsletterinputid?.name,
            action: newsletterparrentclass?.action,
            method: newsletterparrentclass?.method,
            formid: newsletterparrentclass?.id,
            class: newsletterparrentclass?.class,
          }
        }
        
        await html("meta").map(function () {
          if ((html(this).get(0)?.attribs?.name
            || html(this).get(0)?.attribs?.itemprop
            || html(this).get(0)?.attribs?.property) && html(this).attr('content')
          ) {
            const findable = html(this).get(0)?.attribs?.name
              || html(this).get(0)?.attribs?.itemprop
              || html(this).get(0)?.attribs?.property
            const tagename: any = findable?.split(':')?.[1] || findable
            if (findable?.split(':').length === 2) {
              tag[tagename] = html(this).attr('content')
            }
            return tag
          } 
        })
        if (!tag.hasOwnProperty('image')) {
          tag['image'] = await html('img').eq(0).attr('src')
        }
        const {data: category} = await Axios.post('https://api.openai.com/v1/completions', {
          prompt: `What is website category of following description show result in single line with separator >? \n ${tag['description']} \t \t `,
          model: "text-davinci-003"
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.GPT3_API_KEY}`
          }
        })
        const parseCatgegories = await parseCategory(category?.choices?.[0]?.text)
        const client = await clientPromise;
        const db = client.db("vantient");
        await db.collection('websitesdata').updateOne(
          {"url": tag['url']},
          {
            $setOnInsert: { category: parseCatgegories }, $set: tag,
          },
          { upsert: true }
       )
      res.status(200).json({...tag, category: parseCatgegories})
      } else {
        res.status(400).json({ msg: 'URL is not valid' })
      }
    } else {
      res.status(400).json({ msg: 'URL is not valid' })
    }
  } catch (e) {
    res.status(400).json({ msg: 'Something Went wrong' })
  }
}

const parseCategory = async(category: string) => {
  try {
    return category.replace(/^\s+|\s+$/g, '').split('>').map(item => item.trim())
  } catch (e) {
    return null
  }
}

