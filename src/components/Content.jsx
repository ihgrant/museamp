// @flow
import React from 'react'

export default function Content(props: { children: React$Children }) {
    return <div className="window-content">{props.children}</div>
}
