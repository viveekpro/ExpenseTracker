import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { login as loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("Please enter your email and password.");
    try {
      setLoading(true);
      const { data } = await loginApi(form);
      login(data);
      navigate(location.state?.from || "/home", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login. Please check your details.");
    } finally { setLoading(false); }
  };

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <div className="auth-intro">
          <span className="eyebrow">Welcome back</span>
          <h1>Your money, right where you left it.</h1>
          <p>Sign in to see your balance, recent transactions, and spending insights.</p>
          <div className="auth-orb"><div><b>₹52,480</b><span>Available balance</span></div></div>
        </div>
        <div className="auth-card">
          <div className="auth-header"><span className="auth-icon"><LockKeyhole size={20} /></span><h2>Sign in</h2><p>Access your MoneyMate account.</p></div>
          {error && <div className="form-alert">{error}</div>}
          <form onSubmit={submit}>
            <label className="input-label">Email</label>
            <div className="input-wrap"><Mail size={18} /><input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <label className="input-label">Password</label>
            <div className="input-wrap"><LockKeyhole size={18} /><input type={show ? "text" : "password"} placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            <div className="form-row-end"><Link to="/forgot-password">Forgot password?</Link></div>
            <button className="btn btn-primary btn-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          </form>
          <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </section>
  );
}