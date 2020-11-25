import Styles from '../styles/Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = () => {
    return (
        <div className={Styles.player}>
            <div className={Styles.timeControl}>
                <p>Start Time</p>
                <input type="range" />
                <p>End Time</p>
            </div>
            <div className={Styles.playControl}>
                <FontAwesomeIcon className={Styles.skipBack} size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon className={Styles.play} size="2x" icon={faPlay} />
                <FontAwesomeIcon className={Styles.skipForward} size="2x" icon={faAngleRight} />
            </div>
        </div>
    );
};

export default Player;
