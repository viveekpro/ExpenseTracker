import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { register as registerApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const questions = [
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What was your childhood nickname?",
  "What is the name of your first pet?",
  "What is your favorite teacher's name?"
];

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", securityQuestion: "", securityAnswer: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError("");
    if (Object.values(form).some(v => !v)) return setError("Please complete all fields.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    try {
      setLoading(true);
      const { data } = await registerApi({
        name: form.name, email: form.email, password: form.password,
        securityQuestion: form.securityQuestion, securityAnswer: form.securityAnswer
      });
      login(data);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <section className="auth-page">
      <div className="auth-layout register-layout">
        <div className="auth-intro">
          <span className="eyebrow">Start fresh</span>
          <h1>Build a clearer relationship with your money.</h1>
          <p>Create your MoneyMate workspace and start turning everyday transactions into useful insight.</p>
          <div className="register-benefits">
            <span>✓ Simple expense tracking</span><span>✓ Visual monthly overview</span><span>✓ Personal account workspace</span>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-header"><span className="auth-icon"><UserRound size={20} /></span><h2>Create account</h2><p>It takes less than a minute to get started.</p></div>
          {error && <div className="form-alert">{error}</div>}
          <form onSubmit={submit} className="two-col-form">
            <div className="form-field full"><label className="input-label">Full name</label><div className="input-wrap"><UserRound size={18} /><input name="name" placeholder="Your name" value={form.name} onChange={update} /></div></div>
            <div className="form-field full"><label className="input-label">Email</label><div className="input-wrap"><Mail size={18} /><input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={update} /></div></div>
            <div className="form-field"><label className="input-label">Password</label><div className="input-wrap"><LockKeyhole size={18} /><input type={show ? "text" : "password"} name="password" placeholder="Min. 6 characters" value={form.password} onChange={update} /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
            <div className="form-field"><label className="input-label">Confirm password</label><div className="input-wrap"><LockKeyhole size={18} /><input type={show ? "text" : "password"} name="confirmPassword" placeholder="Repeat password" value={form.confirmPassword} onChange={update} /></div></div>
            <div className="form-field full"><label className="input-label">Security question</label><select name="securityQuestion" value={form.securityQuestion} onChange={update}><option value="">Choose a question</option>{questions.map(q => <option key={q}>{q}</option>)}</select></div>
            <div className="form-field full"><label className="input-label">Security answer</label><input className="plain-input" name="securityAnswer" placeholder="Your answer" value={form.securityAnswer} onChange={update} /></div>
            <button className="btn btn-primary btn-full full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </section>
  );
}