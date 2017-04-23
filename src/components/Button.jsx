// @flow
import classnames from 'classnames';
import React from 'react';
import Icon from './Icon';

function Button(
    props: { icon: ?string, label: ?string, onClick?: Event => any }
) {
    const classes = {
        btn: true,
        'btn-default': true,
        'btn-text': !!props.icon
    };
    return (
        <button className={classes} onClick={props.onClick}>
            {props.icon ? <Icon name={props.icon} /> : null}
            {props.label}
        </button>
    );
}

export default Button;
