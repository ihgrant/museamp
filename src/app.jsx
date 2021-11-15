// @flow
import { get } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Pane } from 'react-photonkit';
import Content from './components/Content';
import Controls from './components/Controls';
import LibraryNav from './LibraryNav';
import Menus from './containers/MenusContainer';
import Playlist from './containers/PlaylistContainer';
import Toolbar from './components/Toolbar';
import Window from './components/Window';

export type OwnProps = {| onChooseDirectory: (string) => void |};
export type Props = {|
    ...OwnProps,
    chosenSong?: Song,
    library: Song[],
    onPlay: () => void,
|};

class App extends Component<
    Props,
    {
        paused: boolean,
    }
> {
    constructor() {
        super();
        this.state = { paused: true };
    }
    onBack = () => {
        if (this.props.chosenSong) {
            // this.player.pause();
            console.log('previous');
        }
    };
    onChoose = (id: number) => {
        // console.log(id)
        this.props.onPlay(id);
    };
    onPlayPause = () => {
        if (this.props.chosenSong) {
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
    };
    onStop = () => {
        this.player.pause();
    };
    onForward = () => {
        console.log('onforward');
    };
    render() {
        // console.log(this.props);
        const songPath = get(this.props, 'chosenSong.song_path');

        return (
            <Window>
                <Menus />
                <Toolbar style={{ alignItems: 'center', display: 'flex' }}>
                    <Controls
                        onChooseDirectory={this.props.onChooseDirectory}
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
                <audio
                    src={songPath}
                    key="audio"
                    ref={(el) => (this.player = el)}
                />
                <Toolbar ptType="footer">
                    <h1 className="title">
                        {this.props.chosenSong
                            ? `${this.props.chosenSong.artist} - ${this.props.chosenSong.title}`
                            : ''}
                    </h1>
                </Toolbar>
            </Window>
        );
    }
}

export default App;
