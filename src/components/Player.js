import { useRef, useState } from 'react';
import Styles from '../styles/Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    songs
}) => {
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        endTime: 0
    });
    const audioRef = useRef(null);

    const handleTimeUpdate = ({ target }) =>
        setSongInfo(prev => ({ ...prev, currentTime: target.currentTime }));

    const handleMetaData = ({ target }) =>
        setSongInfo(prev => ({
            ...prev,
            currentTime: target.currentTime,
            endTime: target.duration
        }));

    const handleDrag = ({ target }) =>
        (audioRef.current.currentTime = target.value);

    const getTime = time => {
        return (
            Math.floor(time / 60) +
            ':' +
            ('0' + Math.floor(time % 60)).slice(-2)
        );
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

    const trackAnimationStyle = {
        transform: `translateX(${
            (songInfo.currentTime / songInfo.endTime) * 100
        }%)`
    };

    const trackColorStyle = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    };

    const skipSongHandler = async direction => {
        let currentSongIndex = songs.findIndex(
            song => song.id === currentSong.id
        );
        let newIndex = currentSongIndex + direction;
        if (newIndex < 0) newIndex = songs.length - 1;
        if (newIndex > songs.length - 1) newIndex = 0;
        setCurrentSong(songs[newIndex]);
        (await isPlaying) ? audioRef.current.play() : audioRef.current.pause();
    };

    return (
        <div className={Styles.player}>
            <div className={Styles.timeControl}>
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={trackColorStyle} className={Styles.track}>
                    <input
                        min={0}
                        max={songInfo.endTime}
                        value={songInfo.currentTime}
                        onChange={handleDrag}
                        type="range"
                    />
                    <div
                        style={trackAnimationStyle}
                        className={Styles.animateTrack}
                    ></div>
                </div>
                <p>{getTime(songInfo.endTime)}</p>
            </div>
            <div className={Styles.playControl}>
                <FontAwesomeIcon
                    className={Styles.skipBack}
                    size="2x"
                    icon={faAngleLeft}
                    onClick={() => skipSongHandler(-1)}
                />
                <FontAwesomeIcon
                    className={Styles.play}
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                    onClick={handlePlay}
                />
                <FontAwesomeIcon
                    className={Styles.skipForward}
                    size="2x"
                    icon={faAngleRight}
                    onClick={() => skipSongHandler(1)}
                />
            </div>
            <audio
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleMetaData}
                onEnded={() => skipSongHandler(1)}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;
