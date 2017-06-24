import React from 'react'

export default function Window(props: { children: React$Children }) {
    return <div className="window">{props.children}</div>
}
