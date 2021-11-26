// @flow
import React, { useState } from "react";
import { Pane } from "react-photonkit";
import Treeview from "react-treeview";
import { groupBy } from "lodash";

function LibraryNav(props: { library: Song[] }) {
  const [groupByState, setGroupBy] = useState("artist");
  const groups = groupBy(props.library, groupByState);
  const list = Object.keys(groups).map(key => {
    const members = groups[key].map(el => (
      <span className="nav-group-item" key={el.title}>
        {el.title}
      </span>
    ));
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
          {["artist", "album", "albumArtist"].map(el => (
            <option value={el}>{el}</option>
          ))}
        </select>
      </form>
      {list}
    </Pane>
  );
}

export default LibraryNav;
