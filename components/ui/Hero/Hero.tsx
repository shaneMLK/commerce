import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description }) => {
  return (
    <section className="section section-box-services-full-width context-dark">
      <div className="row no-gutters">
        <div className="col-sm-6 col-lg-3">
          <div className="box-services-full-width">
            <div className="box-services-full-width-inner">
              <div className="box-services-full-width-image"><img src="images/icon-1.png" alt="" />
                      </div>
                <h4>Teaware &amp; Accessories</h4>
                <p>At our shop, you can purchase different kinds of teaware and accessories for your tea drinking pleasure.</p>
              </div><a className="box-services-full-width-button" href="about-tea.html">Read More</a>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="box-services-full-width">
              <div className="box-services-full-width-inner">
                <div className="box-services-full-width-image"><img src="/images/icon-2.png" alt="" />
                      </div>
                  <h4>Tea Collections</h4>
                  <p>We have a regularly updated range of tea collections for true tea lovers. All teas are freshly packed and instantly delivered.</p>
                </div><a className="box-services-full-width-button" href="about-tea.html">Read More</a>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="box-services-full-width">
                <div className="box-services-full-width-inner">
                  <div className="box-services-full-width-image"><img src="images/icon-3.png" alt="" />
                      </div>
                    <h4>Tea Gifts</h4>
                    <p>Looking for a gift that a real fan of tea will appreciate? You can find anything tea-related on our website.</p>
                  </div><a className="box-services-full-width-button" href="about-tea.html">Read More</a>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="box-services-full-width">
                  <div className="box-services-full-width-inner">
                    <div className="box-services-full-width-image"><img src="images/icon-4.png" alt="" />
                      </div>
                      <h4>Tea Infusers</h4>
                      <p>Simplify the process of making perfect tea with one of our tea infusers that are reasonably priced and creative. </p>
                    </div><a className="box-services-full-width-button" href="about-tea.html">Read More</a>
                  </div>
                </div>
              </div>
      </section>
  )
}

export default Hero
