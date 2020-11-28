import { nav } from '../styles/Nav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ isLibraryOpen, setIsLibraryOpen }) => {
    const handleClick = () => {
        setIsLibraryOpen(!isLibraryOpen);
    };
    return (
        <nav className={nav}>
            <h1>Waves</h1>
            <button onClick={handleClick}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
};

export default Nav;
