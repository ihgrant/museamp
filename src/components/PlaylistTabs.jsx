// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPlaylist, choosePlaylist, removePlaylist } from '../actions'
import Icon from './Icon'

function mapStateToProps(state: AppState) {
    return {
        chosenPlaylistId: state.chosenPlaylistId,
        playlists: state.playlists
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChoosePlaylist: (id: number) => {
            dispatch(choosePlaylist(id))
        },
        onNewPlaylist: (name: string) => {
            dispatch(addPlaylist(name))
        },
        onRemovePlaylist: (id: number) => {
            dispatch(removePlaylist(id))
        }
    }
}

function PlaylistTabs(props: {
    chosenPlaylistId: number,
    onChoosePlaylist: number => void,
    onRemovePlaylist: string => void,
    onNewPlaylist: string => void,
    playlists: Playlist[]
}) {
    const tabs = props.playlists.map((el, i) => {
        const isChosen = i === props.chosenPlaylistId;

        return (
            <div className={`tab-item ${isChosen ? 'active' : ''}`} key={el.name} onClick={() => props.onChoosePlaylist(i)}>
                <span
                    className="icon icon-cancel icon-close-tab"
                    onClick={() => props.onRemovePlaylist(i)}
                />
                {el.name}
            </div>
        );
    });

    return (
        <div className="tab-group">
            <div className={`tab-item ${props.chosenPlaylistId === -1 ? 'active' : ''}`} onClick={() => props.onChoosePlaylist(-1)}>
                {'Library Selection'}
            </div>
            {tabs}
            <div className="tab-item tab-item-fixed" onClick={() => {
                // const newName = prompt('Name your new playlist:') // this is apparently unsupported so I need my own dialog boxes!
                const newName = Math.random().toString();
                if (newName.length) {
                    props.onNewPlaylist(newName);
                }
            }}>
                <Icon name='plus' />
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTabs);
