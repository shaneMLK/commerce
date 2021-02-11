import React, { FC } from 'react'
import { Grid, Marquee, Hero, Banner, Article } from '@components/ui'
import { SbEditableContent } from "storyblok-react";
import dashify from 'dashify'

interface IComponents {
    [key: string]: React.ElementType,
}

interface Props {
    blok?: SbEditableContent
}

const Components: IComponents = {
    'call_to_action': Banner,
    'feature_list': Hero,
    'articles': Article
}

const DynamicComponent: FC<Props> = ({ blok }) => {
    if (blok) {
        const componentName = dashify(blok.component)
        if (typeof Components[componentName] !== 'undefined') {
            const FoundComponent = Components[componentName]
            return (<FoundComponent blok={blok} />)
        } else {
            return (<div>The component {componentName} has not been created yet.</div>)
        }
    }
    return null
}

export default DynamicComponent