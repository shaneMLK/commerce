import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@framework/api/operations/get-all-pages'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const rootClassName = cn(className)

  return (
    <footer className="footer-classic context-dark parallax-container" data-parallax-img="/images/bg-footer-1-1920x725.jpg"><div className="material-parallax parallax"><img src="/images/bg-footer-1-1920x725.jpg" alt="" className="footer-classic-image" /></div>
      <div className="parallax-content dark-layout">
        <div className="section-sm">
          <div className="container">
            <div className="row row-30">
              <div className="col-sm-6 col-lg-3">
                <div className="footer-classic-item">
                  <h4>About us</h4>
                  <p>Our company is the #1 provider of the best organic tea products. We guarantee we have the healthiest tea available! </p>
                  <ul className="list-inline list-inline-xs list-inline-middle">
                    <li><a className="icon-square fa-instagram" href="#"></a></li>
                    <li><a className="icon-square fa-facebook-f" href="#"></a></li>
                    <li><a className="icon-square fa-twitter" href="#"></a></li>
                    <li><a className="icon-square fa-google-plus" href="#"></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="footer-classic-item">
                  <h4>Customer Service hours</h4>
                  <div className="list-terms">
                    <dl>
                      <dt>Monday-Friday:</dt>
                      <dd>9am to 5pm</dd>
                    </dl>
                    <dl>
                      <dt>Saturday:</dt>
                      <dd>10am to 2pm</dd>
                    </dl>
                    <dl>
                      <dt>Sunday:</dt>
                      <dd>10am to 2pm</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="footer-classic-item">
                  <h4>Quick links</h4>
                  <ul className="list-link">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="careers.html">Careers</a></li>
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="contact-us.html">Contact Us</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="media.html">Media</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="footer-classic-item">
                  <h4>Contacts</h4>
                  <ul className="list-contacts">
                    <li className="centered"><span className="icon icon-lg icon-secondary mdi mdi-cellphone-android"></span><a className="link-phone" href="tel:#">+1 (708) 712–5879</a></li>
                    <li className="centered"><span className="icon icon-lg icon-secondary mdi mdi-email-outline"></span><a href="mailto:#">shanemkunz@gmail.com</a></li>
                    <li><span className="icon icon-xl icon-secondary mdi mdi-map-marker"></span><a href="#">Illinois, USA, 150 Forest Ave</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-classic-bottom">
          <div className="container">
            <p className="rights"><span>The Tea Oracle</span> <span>©&nbsp;</span><span className="copyright-year">2021</span><span>.&nbsp;</span><a href="privacy-policy.html">Privacy Policy</a><span>.</span><span> Design&nbsp;by&nbsp;<a href="http://shanekunz.com/">Shane Kunz</a></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
