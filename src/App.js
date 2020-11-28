import { useState } from 'react';
import './styles/app.scss';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';
import ChillHop from './util/ChillHop';

const App = () => {
    const [songs, setSongs] = useState(ChillHop());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);

    return (
        <div className={`App ${isLibraryOpen ? 'libraryActive' : ''}`}>
            <Nav
                isLibraryOpen={isLibraryOpen}
                setIsLibraryOpen={setIsLibraryOpen}
            />
            <Song currentSong={currentSong} />
            <Player
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                songs={songs}
            />

            <Library
                isLibraryOpen={isLibraryOpen}
                songs={songs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                setIsPlaying={setIsPlaying}
            />
        </div>
    );
};

export default App;
