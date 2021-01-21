import { FC, ReactNode, Component, Fragment } from 'react'
import SbEditable, { SbEditableContent } from 'storyblok-react'

interface Props {
    content?: SbEditableContent
}

const DynamicSbEditable: FC<Props> = ({ content, children }) => {
    if (typeof content !== 'undefined') {
        return <SbEditable content={content} key={content._uid}>{children}</SbEditable>
    }
    return <Fragment>{children}</Fragment>
}

export default DynamicSbEditable