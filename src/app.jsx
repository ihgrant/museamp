// @flow
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Pane } from 'react-photonkit';
import Content from './components/Content';
import Controls from './Controls';
import LibraryNav from './LibraryNav';
import Menus from './containers/MenusContainer';
import Playlist from './containers/PlaylistContainer';
import Toolbar from './components/Toolbar';
import Window from './components/Window';

class App extends Component<
    {
        chosenSongId?: mixed,
        library: Song[],
        onChooseDirectory: string => void,
        playlist: Playlist
    },
    {
        paused: boolean
    }
> {
    constructor() {
        super();
        this.state = { paused: true };
        this.onBack = this.onBack.bind(this);
        this.onPlayPause = this.onPlayPause.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onForward = this.onForward.bind(this);
    }
    onBack() {
        if (this.props.chosenSongId) {
            // this.player.pause();
            console.log('previous');
        }
    }
    onChoose(id: number) {
        // console.log(id)
        this.props.onPlay(id);
    }
    onPlayPause() {
        console.log(this.props.song);
        if (this.props.chosenSongId) {
            this.setState(
                (prevState, props) => ({ paused: !prevState.paused }),
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
        // if (nextProps.chosenSongId) {
        //     const chosenSong = _.find(
        //         this.props.library,
        //         el => el.id === nextProps.chosenSongId
        //     );
        //     if (chosenSong) {
        //         console.log(chosenSong);
        //         this.player.src = chosenSong.song_path.path;
        //         this.setState({ paused: false }, () => {
        //             this.player.play();
        //         });
        //     }
        // }
    }
    render() {
        // console.log(this.props);
        const chosenSong = _.find(
            this.props.library,
            el => el.id === this.props.chosenSongId
        );

        return (
            <Window>
                <Menus />
                <Toolbar style={{ alignItems: 'center', display: 'flex' }}>
                    <Controls
                        onBack={this.onBack}
                        onPlayPause={this.onPlayPause}
                        onStop={this.onStop}
                        onForward={this.onForward}
                        onChooseDirectory={this.props.onChooseDirectory}
                        paused={this.state.paused}
                    />
                    <input
                        type="range"
                        style={{ flex: 1, marginRight: '1em' }}
                    />
                </Toolbar>
                <Content>
                    <LibraryNav library={this.props.library} />
                    <Playlist onChoose={this.onChoose.bind(this)} />
                </Content>
                <audio key="audio" ref={el => (this.player = el)} />
                <Toolbar ptType="footer">
                    <h1 className="title">
                        {chosenSong
                            ? `${chosenSong.artist} - ${chosenSong.title}`
                            : ''}
                    </h1>
                </Toolbar>
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
