import Styles from '../styles/Library.module.scss';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong }) => {
    return (
        <div className={Styles.library}>
            <h2>Library</h2>
            <div className={Styles.librarySongs}>
                {songs.map(song => (
                    <LibrarySong song={song} setCurrentSong={setCurrentSong} songs={songs} key={song.id} />
                ))}
            </div>
        </div>
    );
};

export default Library;
