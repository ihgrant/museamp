// @flow
import { get } from "lodash";
import React, { Component, PropTypes } from "react";
import { Pane } from "react-photonkit";
import Content from "./components/Content";
import Controls from "./components/Controls";
import LibraryNav from "./LibraryNav";
import Menus from "./containers/MenusContainer";
import Playlist from "./containers/PlaylistContainer";
import Toolbar from "./components/Toolbar";
import Window from "./components/Window";

export type OwnProps = {| onChooseDirectory: string => void |};
export type Props = {|
  ...OwnProps,
  chosenSong: ?Song,
  library: Song[]
|};

function App(props: Props) {
  return (
    <Window>
      <Menus />
      <Toolbar style={{ alignItems: "center", display: "flex" }}>
        <Controls onChooseDirectory={props.onChooseDirectory} />
        <input type="range" style={{ flex: 1, marginRight: "1em" }} />
      </Toolbar>
      <Content>
        <LibraryNav library={props.library} />
        <Playlist />
      </Content>
      <Toolbar ptType="footer">
        <h1 className="title">
          {props.chosenSong
            ? `${props.chosenSong.artist} - ${props.chosenSong.title}`
            : ""}
        </h1>
      </Toolbar>
    </Window>
  );
}

export default App;
