import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const {
        user, logout
    } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <nav className='navbar'>
            <Link to='/'>Expense Tracker</Link>
            <div>
                <span>
                    Hi, {user?.name}
                </span>
                <Link to="/profile"> Profile </Link>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar