import {
    container,
    songDescription,
    selected
} from '../styles/LibrarySong.module.scss';

const LibrarySong = ({ song, currentSong, setCurrentSong, setIsPlaying }) => {
    const handleSelectSong = () => {
        setCurrentSong(song);
        setIsPlaying(false);
    };
    return (
        <div
            className={`${container} ${
                song.id === currentSong.id ? selected : ''
            }`}
            onClick={handleSelectSong}
        >
            <img src={song.cover} alt={song.name} />
            <div className={songDescription}>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
