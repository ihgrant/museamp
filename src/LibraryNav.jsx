'use strict';
import React, { Component, PropTypes } from 'react';
import { Pane } from 'react-photonkit';
import Treeview from 'react-treeview';
import _ from 'lodash';

class LibraryNav extends Component {
    constructor() {
        super();
    }
    render() {
        const groups = _.groupBy(this.props.library, this.props.groupBy);
        const list = _.keys(groups).map(key => {
            const members = groups[key].map(el => (
                <span className="info">{el.title}</span>
            ));
            const label = <span className="node">{key}</span>;
            return (
                <Treeview defaultCollapsed={true} nodeLabel={label}>
                    {members}
                </Treeview>
            );
        });

        return (
            <Pane ptSize="sm" sidebar>
                <Treeview nodeLabel={<span>{this.props.groupBy}</span>}>
                    {list}
                </Treeview>
            </Pane>
        );
    }
}

LibraryNav.defaultProps = {
    groupBy: 'artist'
};

LibraryNav.propTypes = {
    library: PropTypes.array,
    groupBy: PropTypes.oneOf(['artist', 'album', 'albumArtist'])
};

export default LibraryNav;
