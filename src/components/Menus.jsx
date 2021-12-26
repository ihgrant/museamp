// @flow
import React, { Component, PropTypes, useEffect } from "react";
const { Menu } = require("electron").remote;

export type OwnProps = {||};
export type Props = {|
  ...OwnProps,
  addPlaylist: string => void,
  chosenSongIndex: number,
  deleteLibrary: () => void,
  shuffle: boolean,
  playlistRemoveSong: number => void,
  toggleShuffle: () => void
|};

function Menus(props: Props) {
  const currentMenu = Menu.getApplicationMenu();
  // set up menu items
  let template = [
    {
      submenu: [{ role: "quit" }]
    },
    {
      label: "Playback",
      submenu: [
        {
          label: "Shuffle",
          click: () => props.toggleShuffle(),
          type: "checkbox",
          value: props.shuffle
        }
      ]
    },
    {
      label: "Playlist",
      submenu: [
        {
          label: "New",
          click: () => {
            const newName = Math.random().toString();
            props.addPlaylist(newName);
          }
        },
        {
          label: "Remove Song",
          click: () => props.playlistRemoveSong(props.chosenSongIndex),
          enabled: props.chosenSongIndex > -1
        }
      ]
    },
    {
      label: "DEV",
      submenu: [{ label: "Delete Library", click: () => props.deleteLibrary() }]
    }
  ];
  console.log(currentMenu.items.length);

  if (currentMenu.items.length !== template.length) {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    currentMenu.items[1].submenu.value = props.shuffle;
  }

  return null;
}

export default Menus;
