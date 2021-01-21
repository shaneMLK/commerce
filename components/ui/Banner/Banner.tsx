import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Banner.module.css'
import cn from 'classnames'
import Link from 'next/link'
import StoryblokService from '@lib/storyblok'
import { SbEditableContent } from 'storyblok-react'
import { DynamicSbEditable } from '@components/common'
interface Props {
  className?: string,
  blok?: SbEditableContent
}

const Banner: FC<Props> = ({ blok }) => {
  const renderedText = (blok) ? StoryblokService.client.richTextResolver.render(blok.text) : ''
  return (
    <DynamicSbEditable content={blok}>
      <section className="section swiper-container swiper-slider swiper-container-horizontal swiper-container-fade">
        <div className={cn(s.slide,'swiper-slide swiper-slide-1 context-dark swiper-slide-duplicate swiper-slide-active')}>
          <div className={cn('swiper-slide-caption section-lg', s.padding)}>
            <div className="container">
              <div className="col-lg-7 col-xl-6 pl-xl-5 pl-xxl-0">
                <h2><span className="fadeGel animated block">{blok ? blok.headline : ''}</span></h2>
                <h4 className="fadeGel animated">{blok ? blok.headline_2 : ''}</h4>
                <div className="text-decorate fadeGel animated" dangerouslySetInnerHTML={{ __html: renderedText }}></div>
                <p>
                  {blok && blok.buttons ? blok.buttons.map((b: any) =>
                    <>
                      <Link key={b._uid} href={b.link.url}><a className="button button-primary-light fadeInUp animated">{b.text}</a></Link>
                      <br />
                    </>
                  ) : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DynamicSbEditable>
  )
}

export default Banner
