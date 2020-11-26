import { useRef, useState } from 'react';
import Styles from '../styles/Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        endTime: 0
    });
    const audioRef = useRef(null);
    const handleTimeUpdate = ({ target }) => setSongInfo(prev => ({ ...prev, currentTime: target.currentTime }));
    const handleMetaData = ({ target }) =>
        setSongInfo(prev => ({ ...prev, currentTime: target.currentTime, endTime: target.duration }));
    const handleDrag = ({ target }) => (audioRef.current.currentTime = target.value);
    const getTime = time => {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
    };

    const handlePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
        }

        audioRef.current.play();
        setIsPlaying(true);
        return;
    };

    return (
        <div className={Styles.player}>
            <div className={Styles.timeControl}>
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.endTime} value={songInfo.currentTime} onChange={handleDrag} type="range" />
                <p>{getTime(songInfo.endTime)}</p>
            </div>
            <div className={Styles.playControl}>
                <FontAwesomeIcon className={Styles.skipBack} size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon
                    className={Styles.play}
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                    onClick={handlePlay}
                />
                <FontAwesomeIcon className={Styles.skipForward} size="2x" icon={faAngleRight} />
            </div>
            <audio
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleMetaData}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;
