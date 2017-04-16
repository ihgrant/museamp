'use strict';
const React = require('react');
import Controls from './Controls';
import LibraryNav from './LibraryNav';
import Playlist from './Playlist';
import { Window, Toolbar, Content, Pane } from 'react-photonkit';
import ReactPlayer from 'react-player';

class App extends React.Component {
    constructor() {
        super();
        this.onChoose = this.onChoose.bind(this);
    }
    onChoose(id) {
        this.props.onChooseSong(id);
    }
    onPlay() {
        this._player.play();
    }
    render() {
        console.log(this.props.library);
        return (
            <Window>
                {this.props.currentPath.length
                    ? <audio
                          ref={c => this._player = c}
                          src={this.props.currentPath}
                      />
                    : null}
                <Toolbar>
                    <Controls
                        onChooseDirectory={this.props.onChooseDirectory}
                        player={this._player}
                    />
                </Toolbar>
                <Content>
                    <LibraryNav library={this.props.library} />
                    <Playlist
                        list={this.props.library}
                        onChoose={this.onChoose}
                    />
                </Content>
                <Toolbar psType="footer" />
            </Window>
        );
    }
}

App.propTypes = {
    library: React.PropTypes.array,
    currentPath: React.PropTypes.string,
    onChooseDirectory: React.PropTypes.func,
    onChooseSong: React.PropTypes.func
};

module.exports = App;
