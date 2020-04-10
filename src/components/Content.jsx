// @flow
import * as React from 'react';

export default function Content(props: { children: React.Node }) {
    return <div className="window-content">{props.children}</div>;
}
