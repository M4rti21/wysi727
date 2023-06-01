import {Link} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="bg-black border-bottom text-light align-items-center d-flex justify-content-center">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/info">Info</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;