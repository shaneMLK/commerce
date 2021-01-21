import cn from 'classnames'
import { FC, useState, useMemo, useRef, useEffect } from 'react'
import { getRandomPairOfColors } from '@lib/colors'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({}) => {
  const [bg] = useState(useMemo(() => getRandomPairOfColors, []))
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    if (ref && ref.current) {
      //ref.current.style.backgroundImage = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`
    }
  }, [bg])

  return (
    <div
      ref={ref}
      className="inline-block h-8 w-8"
    >
      <img src="/images/user-icon.png" />
    </div>
  )
}

export default Avatar
