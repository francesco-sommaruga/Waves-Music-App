import { library, librarySongs, open } from '../styles/Library.module.scss';
import LibrarySong from './LibrarySong';

const Library = ({
    songs,
    setCurrentSong,
    setIsPlaying,
    currentSong,
    isLibraryOpen
}) => {
    return (
        <div className={`${library} ${isLibraryOpen ? open : ''}`}>
            <h2>Library</h2>
            <div className={librarySongs}>
                {songs.map(song => (
                    <LibrarySong
                        song={song}
                        setCurrentSong={setCurrentSong}
                        setIsPlaying={setIsPlaying}
                        currentSong={currentSong}
                        key={song.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
