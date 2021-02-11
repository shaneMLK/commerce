import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Article.module.css'
import Link from 'next/link'
import StoryblokService from '@lib/storyblok'
import { SbEditableContent } from 'storyblok-react'
import { DynamicSbEditable } from '@components/common'
interface Props {
  className?: string,
  blok?: SbEditableContent
}

const Article: FC<Props> = ({ blok }) => {
  return (
    <DynamicSbEditable content={blok}>
      <section className="section section-box-services-full-width context-dark">
        <div className="row no-gutters">
          {blok && blok.body ?
            blok.body.map((article:any) =>
              <div className="col-sm-6 col-lg-3" key={article._uid}>
                <h4>{article.title}</h4>
                <p>{article.intro}</p>
              </div>  
            )
            :
            ''
          }
        </div>
      </section>
    </DynamicSbEditable>
  )
}

export default Article
