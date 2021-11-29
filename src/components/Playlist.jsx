// @flow
import React, { Component, PropTypes } from "react";
import { Content, Pane, Table } from "react-photonkit";
import PlaylistItem from "./PlaylistItem";
import PlaylistTabs from "./PlaylistTabs";

export type OwnProps = {||};
export type Props = {|
  chosenSongId?: number,
  chooseAndPlaySong: (number, string) => void,
  chooseSong: number => void,
  songs: Song[]
|};

const nondisplayColumns = ["id", "createdAt", "updatedAt", "song_path"];

function Playlist(props: Props) {
  const columns = props.songs.length
    ? Object.keys(props.songs[0]).filter(
        key => !nondisplayColumns.includes(key)
      )
    : [];

  return (
    <Pane>
      <PlaylistTabs />
      <Content>
        <Table>
          <thead>
            <tr>
              {columns.map(el => (
                <th key={el}>{el}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.songs.map(el => (
              <PlaylistItem
                active={el.id === props.chosenSongId}
                columns={columns}
                item={el}
                key={el.id}
                onClick={() => props.chooseSong(el.id)}
                onDoubleClick={() =>
                  props.chooseAndPlaySong(el.id, el.song_path.path)
                }
              />
            ))}
          </tbody>
        </Table>
      </Content>
    </Pane>
  );
}

Playlist.defaultProps = { songs: [] };

export default Playlist;
