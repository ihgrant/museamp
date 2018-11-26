// @flow
import React from 'react';
import { Pane } from 'react-photonkit';
import Treeview from 'react-treeview';
import _ from 'lodash';

class LibraryNav extends React.Component<
    { library: Song[] },
    { groupBy: 'artist' | 'album' | 'albumArtist', search: string }
> {
    constructor() {
        super();
        this.state = { groupBy: 'artist', search: '' };
        this.applySearch = this.applySearch.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    applySearch(el: Song) {
        return (
            el[this.state.groupBy].toLowerCase().indexOf(this.state.search) !==
            -1
        );
    }
    onSearch(e) {
        this.setState({
            search: e.currentTarget.value.toLowerCase()
        });
    }
    render() {
        const searchedLibrary = this.props.library.filter(this.applySearch);
        const groups = _.groupBy(searchedLibrary, this.state.groupBy);
        const list = _.keys(groups)
            .sort((a, b) => a.toLowerCase() > b.toLowerCase())
            .map(key => {
                const members = groups[key]
                    .sort((a, b) => a.title > b.title)
                    .map((el, index) =>
                        <span
                            className="nav-group-item"
                            key={el.id}
                            style={{ paddingLeft: 0 }}
                        >
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
                <form style={{ padding: '.5em' }}>
                    <input
                        className="form-control"
                        name="filter"
                        onChange={this.onSearch}
                        placeholder="Filter..."
                    />
                    <select
                        className="form-control"
                        name="groupBy"
                        onChange={e =>
                            this.setState({ groupBy: e.currentTarget.value })}
                    >
                        {['artist', 'album', 'albumArtist'].map(el =>
                            <option key={el} value={el}>
                                {el}
                            </option>
                        )}
                    </select>
                </form>
                <div style={{ paddingLeft: '.5em' }}>
                    {list}
                </div>
            </Pane>
        );
    }
}

LibraryNav.defaultProps = {
    library: []
};

export default LibraryNav;
