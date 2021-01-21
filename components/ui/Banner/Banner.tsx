import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Banner.module.css'
import cn from 'classnames'
import Link from 'next/link'
interface Props {
  className?: string
}

const Banner: FC<Props> = () => {
  return (
    <section className="section swiper-container swiper-slider swiper-container-horizontal swiper-container-fade">
      <div className={cn(s.slide,'swiper-slide swiper-slide-1 context-dark swiper-slide-duplicate swiper-slide-active')}>
        <div className={cn('swiper-slide-caption section-lg', s.padding)}>
          <div className="container">
            <div className="col-lg-7 col-xl-6 pl-xl-5 pl-xxl-0">
              <h2><span data-caption-animate="fadeGel" data-caption-delay="150" className="fadeGel animated block">fragrant tea </span></h2>
              <h4 data-caption-animate="fadeGel" data-caption-delay="300" className="fadeGel animated">The way it should really be</h4>
              <p className="text-decorate fadeGel animated" data-caption-animate="fadeGel" data-caption-delay="500">Our goal is to fill your cup with joy you can share with guests and friends leaving boring fuss far away.  </p><a className="button button-primary-light fadeInUp animated" href="about-us.html" data-caption-animate="fadeInUp" data-caption-delay="650">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
