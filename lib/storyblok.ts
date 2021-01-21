import StoryblokClient, { StoryblokComponent, StoryData } from 'storyblok-js-client'
import { ParsedUrlQuery } from 'querystring';
import { merge, debounce } from 'lodash'

interface Editor {
    content: StoryblokComponent<string> & { body: StoryblokComponent<string>[] }
    setContent: (content: any) => Promise<void> | any
}

class StoryblokService {
    devMode: boolean
    client: StoryblokClient
    query: ParsedUrlQuery | undefined
    token: string | undefined
    constructor() {
        this.devMode = false //  True loads draft
        this.token = process.env.STORYBLOK_TOKEN
        this.client = new StoryblokClient({
            accessToken: this.token,
            cache: {
                clear: 'auto',
                type: 'memory'
            }
        })

        this.query = {}
    }

    getCacheVersion() {
        return this.client.cacheVersion
    }

    get(slug: string, params: { version?: any; cv?: any }) {
        params = params || {}

        if (this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.storyblok)) {
            params.version = 'draft'
        }

        if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
            params.cv = window.StoryblokCacheVersion
        }

        return this.client.get(slug, params)
    }

    initEditor({ content, setContent }: Editor) {
        if (window.storyblok) {
            window.storyblok.init()
            window.storyblok.on(['change', 'published'], () => location.reload(true))

            // this will alter the state and replaces the current story with a current raw story object (no resolved relations or links)
            const inputFunction = (event: any) => {
                if (event && event.story.content._uid === content._uid) {
                    const newContent: any = window.storyblok.addComments(event.story.content, event.story.id)

                    if (newContent.body) {
                        // we need to track changes if bloks are rearranged in storyblok
                        const mergedBody: any[] = newContent.body?.map((item: StoryblokComponent<string>) => {
                            // and keep the old fetched data, that is not stored within storyblok
                            let oldItem = content.body.find((itemWithData: StoryblokComponent<string>) => itemWithData._uid === item._uid)
                            // we keep the old data and overwrite it with the new
                            return merge(oldItem, item)
                        }).filter(Boolean)

                        newContent.body = mergedBody
                    }
                    setContent(newContent)
                }
            }

            // we will debounce the funcction since we're doing some data processing inside
            window.storyblok.on('input', debounce(inputFunction, 300))
        }
    }

    setQuery(query: ParsedUrlQuery | undefined) {
        this.query = query
    }

    getQuery(param: string) {
        if (this.query) {
            return this.query[param]
        }
    }
}

const storyblokInstance = new StoryblokService()

export default storyblokInstance