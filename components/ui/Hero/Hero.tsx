import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
import StoryblokService from '@lib/storyblok'
import { SbEditableContent } from 'storyblok-react'
import { DynamicSbEditable } from '@components/common'
interface Props {
  className?: string,
  blok?: SbEditableContent
}

const Hero: FC<Props> = ({ blok }) => {
  return (
    <DynamicSbEditable content={blok}>
      <section className="section section-box-services-full-width context-dark">
        <div className="row no-gutters">
          {blok && blok.body ?
            blok.body.map((feature:any) =>
              <div className="col-sm-6 col-lg-3">
                <div className="box-services-full-width">
                  <div className="box-services-full-width-inner">
                    <div className="box-services-full-width-image">
                      <img alt="" src={feature.icon} />
                    </div>
                    <h4>{feature.headline}</h4>
                    <p>{feature.text}</p>
                  </div>
                  <a className="box-services-full-width-button" href="about-tea.html">Read More</a>
                </div>
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

export default Hero
