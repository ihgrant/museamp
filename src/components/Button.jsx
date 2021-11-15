// @flow
import classNames from 'classnames';
import React from 'react';
import Icon from './Icon';

function Button(props: {
    icon?: string,
    label?: string,
    onClick?: Event => any
}) {
    const classes = classNames({
        btn: true,
        'btn-default': true,
        'btn-text': !props.icon
    });
    return (
        <button className={classes} onClick={props.onClick}>
            {props.icon ? <Icon name={props.icon} /> : null}
            {props.label || null}
        </button>
    );
}

export default Button;
