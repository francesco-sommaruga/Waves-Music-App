import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import Styles from '../styles/Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
    faVolumeUp,
    faVolumeMute
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

    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [volumeControlsActive, setVolumeControlsActive] = useState(false);
    const handleVolumeChange = ({ target }) => {
        if (target.value <= 0.01) setIsMuted(true);
        if (target.value > 0.01) setIsMuted(false);
        setVolume(target.value);
    };
    const handleVolumeClick = () => {
        setIsMuted(!isMuted);
    };
    useEffect(() => {
        audioRef.current.volume = isMuted ? 0 : volume;
    }, [volume, isMuted]);
    const [width] = useWindowSize();

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
                {width > 768 ? (
                    <div className={Styles.volumeControls}>
                        <FontAwesomeIcon
                            className={Styles.volume}
                            onClick={handleVolumeClick}
                            onMouseEnter={() => setVolumeControlsActive(true)}
                            size="2x"
                            icon={!isMuted ? faVolumeUp : faVolumeMute}
                            style={
                                volumeControlsActive ? { color: '#fff' } : null
                            }
                        />
                        {volumeControlsActive ? (
                            <div
                                className={Styles.volumeSlider}
                                onMouseLeave={() =>
                                    setVolumeControlsActive(false)
                                }
                                style={{ background: currentSong.color[1] }}
                            >
                                <input
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    type="range"
                                />
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
            <div className={Styles.playControl}>
                <FontAwesomeIcon
                    className={Styles.skipBack}
                    size="2x"
                    icon={faAngleLeft}
                    onClick={() => skipSongHandler(-1)}
                />
                <FontAwesomeIcon
                    className={Styles.playPause}
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
