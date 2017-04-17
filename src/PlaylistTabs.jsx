import React, { PropTypes } from 'react';

function PlaylistTabs(props) {
    const tabs = props.playlists.map(el => {
        <div className="tab-item" key={el.id}>
            <span
                className="icon icon-cancel icon-close-tab"
                onClick={props.closePlaylist.bind(null, el.id)}
            />
            {el.name}
        </div>;
    });

    return (
        <div className="tab-group">
            <div className="tab-item">
                {'Library Selection'}
            </div>
            {tabs}
            <div className="tab-item tab-item-fixed">
                <span className="icon icon-plus" />
            </div>
        </div>
    );
}

PlaylistTabs.propTypes = {
    playlists: PropTypes.array
};

export default PlaylistTabs;
