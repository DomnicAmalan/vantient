import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/app/utils/mongoclient'

export default async(req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req?.method === 'GET') {
      const {limit, page}: any = req?.query
      const client = await clientPromise;
      const db = client.db("vantient");
      const total = await db.collection('websitesdata').count()
      const resp = await db.collection('websitesdata').find({}).skip(Number(limit) * Number(page)).limit(Number(limit)).toArray()
      res.status(200).json({data: resp, total})
    }
  } catch (e) {
    res.status(400).json({ msg: 'Something Went wrong' })
  }
}

