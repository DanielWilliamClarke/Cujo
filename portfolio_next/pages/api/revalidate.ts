import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    // Force POST request
    if (requestMethod !== 'POST') {
        return res.status(401).json({ message: 'Invalid' })
    }

    const body = req.body;
    // Check for secret to confirm this is a valid request
    if (body.secret !== process.env.CUJO_REVALIDATE_SECRET) {
        return res.status(401).json({ message: 'Invalid' })
    }

    try {
        await res.revalidate(body.path)
        return res.json({ revalidated: true })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error revalidating' })
    }
}

export default handler;