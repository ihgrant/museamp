// @flow
import React, { Component, PropTypes } from "react";
import { Pane } from "react-photonkit";
import Treeview from "react-treeview";
import _ from "lodash";

class LibraryNav extends Component {
    props: {
        library: Song[]
    };
    constructor() {
        super();
        this.state = { groupBy: "artist" };
    }
    render() {
        const groups = _.groupBy(this.props.library, this.state.groupBy);
        const list = _.keys(groups).map(key => {
            const members = groups[key].map(el =>
                <span className="nav-group-item" key={el.title}>
                    {el.title}
                </span>
            );
            const label = (
                <span className="node">
                    {key}
                </span>
            );
            return (
                <Treeview defaultCollapsed nodeLabel={label} key={key}>
                    {members}
                </Treeview>
            );
        });
        const title = (
            <span className="nav-group-title">
                {this.state.groupBy}
            </span>
        );

        return (
            <Pane ptSize="sm" sidebar>
                <form style={{ padding: ".5em" }}>
                    <input
                        className="form-control"
                        name="filter"
                        placeholder="Filter..."
                    />
                    <select
                        className="form-control"
                        name="groupBy"
                        onChange={e =>
                            this.setState({ groupBy: e.currentTarget.value })}
                    >
                        {["artist", "album", "albumArtist"].map(el =>
                            <option key={el} value={el}>
                                {el}
                            </option>
                        )}
                    </select>
                </form>
                {list}
            </Pane>
        );
    }
}

LibraryNav.defaultProps = {
    library: []
};

export default LibraryNav;
