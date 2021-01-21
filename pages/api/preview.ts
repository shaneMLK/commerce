import StoryblokClient from '@lib/storyblok'
import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (
        req.query['_storyblok_tk[token]'] !== process.env.STORYBLOK_TOKEN ||
        !req.query['_storyblok']
    ) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    // Fetch the headless CMS to check if the provided `slug` exists
    const { data: { story } } = await StoryblokClient.get(`cdn/stories/${req.query._storyblok}`, {})

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!story) {
        return res.status(401).json({ message: 'Invalid slug' })
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: story.path })
    res.end()
}