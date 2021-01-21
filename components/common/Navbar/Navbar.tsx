import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'

const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      setHasScrolled(scrolled)
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="section page-header">
      <div className="rd-navbar-wrap">
        <nav className="rd-navbar rd-navbar-classic rd-navbar-original rd-navbar-static" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-fixed" data-lg-device-layout="rd-navbar-fixed" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
          <div className="rd-navbar-main-outer">
            <div className="rd-navbar-main">
              <div className="rd-navbar-panel">
                <button className="rd-navbar-toggle toggle-original" data-rd-navbar-toggle=".rd-navbar-nav-wrap"><span></span></button>
                <div className="rd-navbar-brand">
                  <a className="brand brand-logo" href="/"><img src="/images/logo-default-166x57.png" alt="" width="166" height="57" /></a><a className="brand brand-logo-stuck" href="index.html"><img src="images/logo-default-166x57.png" alt="" width="166" height="57" /></a>
                    <div className="rd-navbar-brand-triangle"></div>
                </div>
              </div>
              <div className="flex items-center flex-1">
                <Link href="/">
                  <a className={s.logo} aria-label="Logo">
                    <Logo />
                  </a>
                </Link>
                <nav className="hidden ml-6 space-x-4 lg:block">
                  <Link href="/search">
                    <a className={s.link}>All Tea</a>
                  </Link>
                  <Link href="/search?q=clothes">
                    <a className={s.link}>Sleep Teas</a>
                  </Link>
                  <Link href="/search?q=accessories">
                    <a className={s.link}>Energy Teas</a>
                  </Link>
                </nav>
              </div>
              <div className="flex justify-end flex-1 space-x-8">
                <UserNav />
              </div>
            </div>
            <div className="flex pb-4 lg:px-6 lg:hidden">
              <Searchbar id="mobile-search" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
