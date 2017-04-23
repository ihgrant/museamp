// @flow
import React from 'react';

function Icon(props: { name: string }) {
    return <span className={`icon icon-${props.name}"`} />;
}

export default Icon;
