import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, WalletCards, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate("/");
  };

  const navClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark"><WalletCards size={20} /></span>
          <span>Money<span>Mate</span></span>
        </Link>

        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>

        <div className={`nav-area ${open ? "open" : ""}`}>
          <div className="nav-links">
            <NavLink to="/" className={navClass} onClick={close}>Landing</NavLink>
            <NavLink to="/home" className={navClass} onClick={close}>Home</NavLink>
            <NavLink to="/about" className={navClass} onClick={close}>About</NavLink>
          </div>

          <div className="nav-actions">
            {isAuthenticated ? (
              <>
                <Link to="/change-password" className="user-chip" onClick={close}>
                  <UserRound size={16} />
                  <span>{user?.name || "Account"}</span>
                </Link>
                <button className="btn btn-outline btn-small" onClick={handleLogout}>
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-small" onClick={close}>Login</Link>
                <Link to="/register" className="btn btn-primary btn-small" onClick={close}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}