// @flow
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Content, Pane, Table } from 'react-photonkit';
import PlaylistItem from './PlaylistItem';
import PlaylistTabs from './PlaylistTabs';

class Playlist extends Component {
    props: {
        songs: Song[]
    }
    constructor() {
        super();
    }
    closePlaylist() {
        //
    }
    render() {
        const columns = this.props.songs.length
            ? _.keys(this.props.songs[0]).filter(el => el !== 'song_path')
            : [];

        return (
            <Pane>
                <PlaylistTabs />
                <Content>
                    <Table>
                        <thead>
                            <tr>
                                {columns.map(el => <th key={el}>{el}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.songs.map(el => (
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

Playlist.defaultProps = {
    songs: [],
};

export default Playlist;
