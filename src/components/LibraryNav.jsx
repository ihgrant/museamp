// @flow
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Pane } from "react-photonkit";
import Treeview from "react-treeview";
import { groupBy } from "lodash";
import { draggableTypes } from "../consts";

function LibraryNav(props: { library: Song[] }) {
  const groupByOptions = ["artist", "album", "albumArtist"];
  const [groupByState, setGroupBy] = useState(groupByOptions[0]);
  const groups = groupBy(props.library, groupByState);
  const list = Object.keys(groups).map(key => {
    const members = groups[key].map(el => <LibraryNavEntry entry={el} />);
    const label = <span className="node">{key}</span>;
    return (
      <Treeview defaultCollapsed nodeLabel={label} key={key}>
        {members}
      </Treeview>
    );
  });
  const title = <span className="nav-group-title">{groupByState}</span>;

  return (
    <Pane ptSize="sm" sidebar>
      <form style={{ padding: ".5em" }}>
        <input className="form-control" name="filter" placeholder="Filter..." />
        <select
          className="form-control"
          name="groupBy"
          onChange={e => setGroupBy(e.currentTarget.value)}
        >
          {groupByOptions.map(el => (
            <option value={el}>{el}</option>
          ))}
        </select>
      </form>
      {list}
    </Pane>
  );
}

function LibraryNavEntry(props: { entry: Song }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      }),
      item: { songId: props.entry.id },
      type: draggableTypes.LIBRARYITEM
    }),
    []
  );
  return (
    <span
      className="nav-group-item"
      key={props.entry.title}
      ref={dragRef}
      style={{ opacity }}
    >
      {props.entry.title}
    </span>
  );
}

export default LibraryNav;
