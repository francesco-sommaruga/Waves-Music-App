import { container, songDescription } from '../styles/LibrarySong.module.scss';

const LibrarySong = ({ song, songs, setCurrentSong }) => {
    const handleSelectSong = () => {
        setCurrentSong(song);
    };
    return (
        <div className={container} onClick={handleSelectSong}>
            <img src={song.cover} alt={song.name} />
            <div className={songDescription}>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
