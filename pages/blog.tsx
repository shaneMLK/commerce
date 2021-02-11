import { useState, useEffect } from 'react'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/api/operations/get-all-pages'
import { Layout, DynamicComponent } from '@components/common'
import { Container } from '@components/ui'
import StoryblokService from '@lib/storyblok'
import { SbEditableContent } from "storyblok-react"

export async function getStaticProps({
  params,
  preview,
  locale,
}: GetStaticPropsContext) {
  if (params) StoryblokService.setQuery(params)
  if (preview) StoryblokService.devMode = true
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })

  const { data: { story } } = await StoryblokService.get('cdn/stories/articles', {})

  return {
    props: { pages, story },
  }
}

export default function Blog({ story }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [storyContent, setStoryContent] = useState(story.content);
  useEffect(
    () => {
      StoryblokService.initEditor({ content: storyContent, setContent: setStoryContent })
    },
  )

  const components = storyContent.body.map((blok: SbEditableContent) => {
    return (<DynamicComponent blok={blok} key={blok._uid} />)
  });

  return (
    <div className="pb-20">
      <div className="text-center pt-40 pb-56 bg-green">
        <Container>
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            Welcome to The Tea Oracle Blog, the simplest way to start learning about tea.
          </h2>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We are here to teach you about tea.
            <br />
            Which ones to drink - how to make it - and when to drink them!
            <br />
            The Tea Oracle started as at BlueBolt Solutions.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="flex">
              <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src="/images/shane.png"
                  alt="Avatar"
                />
              </div>
              <div className="ml-4">
                <div className="leading-6 font-medium text-white">
                  Shane Kunz
                </div>
                <div className="leading-6 font-medium text-gray-200">
                  Solutions Developer
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="-mt-32 flex justify-center">
          <img src="/images/tea-cups.png" alt="Jacket" />
        </div>
        
      </Container>
    </div>
  )
}

Blog.Layout = Layout
