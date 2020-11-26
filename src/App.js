import { useState } from 'react';
import './styles/app.scss';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import ChillHop from './util/ChillHop';

const App = () => {
    const [songs, setSongs] = useState(ChillHop());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <Library songs={songs} setCurrentSong={setCurrentSong} />
        </div>
    );
};

export default App;
