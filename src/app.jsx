'use strict';
import React, { Component, PropTypes } from 'react';
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
        if (this.props.song) {
            // this.player.pause();
            console.log('previous');
        }
    }
    onChoose(id) {
        this.props.onPlay(id);
    }
    onPlayPause() {
        if (this.props.song) {
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
        console.log(nextProps.song);
        if (nextProps.song) {
            this.player.src = nextProps.song.path;
            this.setState({ paused: false }, () => {
                this.player.play();
            });
        }
    }
    render() {
        console.log(this.props.library);
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
                    <Playlist
                        list={this.props.library}
                        onChoose={this.props.onChoose.bind(this)}
                    />
                </Content>
                <audio ref={el => this.player = el} />
                <Toolbar psType="footer" />
            </Window>
        );
    }
}

App.propTypes = {
    library: PropTypes.array,
    onChooseDirectory: PropTypes.func,
    onPlay: PropTypes.func,
    song: PropTypes.any
};

module.exports = App;
