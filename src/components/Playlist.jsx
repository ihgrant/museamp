// @flow
import _ from 'lodash';
import React from 'react';
import { Content, Pane, Table } from 'react-photonkit';
import PlaylistItem from './PlaylistItem';
import PlaylistTabs from './PlaylistTabs';

function Playlist(
    props: {
        chosenSongId: number,
        onChooseSong: number => void,
        songs: Song[]
    } = { songs: [] }
) {
    const columns = props.songs.length
        ? _.keys(props.songs[0]).filter(el => el !== 'song_path')
        : [];

    return (
        <Pane>
            <PlaylistTabs />
            <Content>
                <Table>
                    <thead>
                        <tr>
                            {columns.map(el =>
                                <th key={el}>
                                    {el}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {props.songs.map(el =>
                            <PlaylistItem
                                active={el.id === props.chosenSongId}
                                columns={columns}
                                item={el}
                                key={el.id}
                                onDoubleClick={() => props.onChoose(el.id)}
                                onClick={() => props.chooseSong(el.id)}
                            />
                        )}
                    </tbody>
                </Table>
            </Content>
        </Pane>
    );
}

export default Playlist;
