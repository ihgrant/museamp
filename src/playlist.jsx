'use strict';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Content, Pane, Table } from 'react-photonkit';
import PlaylistItem from './PlaylistItem';
import PlaylistTabs from './PlaylistTabs';

class Playlist extends Component {
    constructor() {
        super();
    }
    closePlaylist() {
        //
    }
    render() {
        const columns = this.props.list.length
            ? _.keys(this.props.list[0]).filter(el => el !== 'song_path')
            : [];

        return (
            <Pane>
                <PlaylistTabs
                    closePlaylist={this.closePlaylist}
                    playlists={this.props.playlists}
                />
                <Content>
                    <Table>
                        <thead>
                            <tr>
                                {columns.map(el => <th key={el}>{el}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.list.map(el => (
                                <PlaylistItem
                                    columns={columns}
                                    item={el}
                                    key={el.id}
                                    onDoubleClick={() =>
                                        this.props.onChoose(el.id)}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Content>
            </Pane>
        );
    }
}

Playlist.propTypes = {
    playlists: PropTypes.array,
    list: PropTypes.array,
    onChoose: PropTypes.func.isRequired
};

Playlist.defaultProps = {
    list: [],
    playlists: []
};

export default Playlist;
