import { Link } from "react-router-dom";
import { ArrowUpRight, WalletCards } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark"><WalletCards size={20} /></span>
            <span>Money<span>Mate</span></span>
          </Link>
          <p>Simple money management for everyday life. Track spending, understand habits, and make better decisions.</p>
        </div>

        <div>
          <h4>Product</h4>
          <Link to="/home">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/register">Get Started</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>

        <div className="footer-cta">
          <span className="eyebrow">Start today</span>
          <h3>Know where your money goes.</h3>
          <Link to="/register" className="text-link">Create your account <ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MoneyMate. All rights reserved.</span>
        <span>Built for smarter personal finance.</span>
      </div>
    </footer>
  );
}