'use strict';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Controls from './Controls';
import LibraryNav from './LibraryNav';
import Playlist from './Playlist';
import { Window, Toolbar, Content, Pane } from 'react-photonkit';

class App extends Component {
    constructor() {
        super();
        this.state = {
            paused: true
        };
        this.onBack = this.onBack.bind(this);
        this.onPlayPause = this.onPlayPause.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onForward = this.onForward.bind(this);
    }
    onBack(e) {
        if (this.props.chosenSongId) {
            // this.player.pause();
            console.log('previous');
        }
    }
    onChoose(id) {
        this.props.onPlay(id);
    }
    onPlayPause() {
        console.log(this.props.song);
        if (this.props.chosenSongId) {
            this.setState(
                (prevState, props) => ({
                    paused: !prevState.paused
                }),
                () => {
                    if (this.state.paused) {
                        this.player.pause();
                    } else {
                        this.player.play();
                    }
                }
            );
        }
    }
    onStop() {
        this.player.pause();
    }
    onForward() {
        console.log('onforward');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.chosenSongId) {
            const chosenSong = _.find(
                this.props.playlist.songs,
                el => el.id === nextProps.chosenSongId
            );
            if (chosenSong) {
                console.log(chosenSong);
                this.player.src = chosenSong.song_path.path;
                this.setState({ paused: false }, () => {
                    this.player.play();
                });
            }
        }
    }
    render() {
        // console.log(this.props);
        return (
            <Window>
                <Toolbar>
                    <Controls
                        onBack={this.onBack}
                        onPlayPause={this.onPlayPause}
                        onStop={this.onStop}
                        onForward={this.onForward}
                        onChooseDirectory={this.props.onChooseDirectory}
                        paused={this.state.paused}
                    />
                </Toolbar>
                <Content>
                    <LibraryNav library={this.props.library} />
                    <Playlist onChoose={this.onChoose.bind(this)} />
                </Content>
                <audio key="audio" ref={el => this.player = el} />
                <Toolbar psType="footer" />
            </Window>
        );
    }
}

App.propTypes = {
    library: PropTypes.array,
    onChooseDirectory: PropTypes.func,
    onPlay: PropTypes.func,
    chosenSongId: PropTypes.number
};

export default App;
