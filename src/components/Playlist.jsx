// @flow
import React, { Component, PropTypes } from "react";
import { useDrop } from "react-dnd";
import { Content, Pane, Table } from "react-photonkit";
import { draggableTypes } from "../consts";
import PlaylistItem from "./PlaylistItem";
import PlaylistTabs from "./PlaylistTabs";

export type OwnProps = {||};
export type Props = {|
  addSong: SongId => void,
  chosenSongIndex: number,
  chooseAndPlaySong: (number, string) => void,
  chooseSong: number => void,
  removeSong: SongId => void,
  songs: Song[]
|};

const nondisplayColumns = ["id", "createdAt", "updatedAt", "song_path"];

function Playlist(props: Props) {
  const [collectedProps, drop] = useDrop(() => ({
    accept: [draggableTypes.LIBRARYITEM, draggableTypes.PLAYLISTITEM],
    collect: monitor => ({
      border: monitor.canDrop() ? "1px solid blue" : null
    }),
    drop: (item, monitor) => {
      props.addSong(item.songId);
    }
  }));
  const columns = props.songs.length
    ? Object.keys(props.songs[0]).filter(
        key => !nondisplayColumns.includes(key)
      )
    : [];

  return (
    <Pane>
      <PlaylistTabs />
      <div style={{ height: "100%", border: collectedProps.border }} ref={drop}>
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
              {props.songs.map((el, i) => (
                <PlaylistItem
                  active={i === props.chosenSongIndex}
                  columns={columns}
                  item={el}
                  key={el.id}
                  onClick={() => props.chooseSong(i)}
                  onDoubleClick={() =>
                    props.chooseAndPlaySong(i, el.song_path.path)
                  }
                />
              ))}
            </tbody>
          </Table>
        </Content>
      </div>
    </Pane>
  );
}

Playlist.defaultProps = { songs: [] };

export default Playlist;
