import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, KeyRound, Mail, ShieldQuestion } from "lucide-react";
import { getSecurityQuestion, verifySecurityAnswer, resetPassword } from "../services/authService";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitEmail = async e => {
    e.preventDefault(); setError("");
    if (!email) return setError("Enter your registered email.");
    try { setLoading(true); const { data } = await getSecurityQuestion(email); setQuestion(data.securityQuestion); setStep(2); }
    catch (err) { setError(err.response?.data?.message || "Account not found."); }
    finally { setLoading(false); }
  };

  const submitAnswer = async e => {
    e.preventDefault(); setError("");
    if (!answer.trim()) return setError("Enter your security answer.");
    try { setLoading(true); await verifySecurityAnswer(email, answer); setStep(3); }
    catch (err) { setError(err.response?.data?.message || "Incorrect security answer."); }
    finally { setLoading(false); }
  };

  const submitReset = async e => {
    e.preventDefault(); setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    try { setLoading(true); await resetPassword({ email, securityAnswer: answer, newPassword: password }); setStep(4); }
    catch (err) { setError(err.response?.data?.message || "Could not reset password."); }
    finally { setLoading(false); }
  };

  return (
    <section className="auth-page">
      <div className="auth-layout forgot-layout">
        <div className="auth-intro">
          <span className="eyebrow">Account recovery</span>
          <h1>Getting back into MoneyMate is simple.</h1>
          <p>Use the security question connected to your account to create a new password.</p>
          <div className="recovery-steps">
            {[["01", "Find account"], ["02", "Verify answer"], ["03", "New password"]].map(([n, t], i) => (
              <div className={step > i ? "recovery-step done" : "recovery-step"} key={n}><span>{step > i + 1 ? <Check size={14} /> : n}</span><b>{t}</b></div>
            ))}
          </div>
        </div>

        <div className="auth-card">
          {error && <div className="form-alert">{error}</div>}
          {step === 1 && <form onSubmit={submitEmail}>
            <div className="auth-header"><span className="auth-icon"><Mail size={20} /></span><h2>Find your account</h2><p>Enter the email you used to register.</p></div>
            <label className="input-label">Email address</label>
            <div className="input-wrap"><Mail size={18} /><input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <button className="btn btn-primary btn-full" disabled={loading}>{loading ? "Checking..." : "Continue"}</button>
          </form>}

          {step === 2 && <form onSubmit={submitAnswer}>
            <div className="auth-header"><span className="auth-icon"><ShieldQuestion size={20} /></span><h2>Verify your identity</h2><p>Answer the security question for your account.</p></div>
            <div className="question-panel">{question}</div>
            <label className="input-label">Your answer</label>
            <input className="plain-input" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Enter your answer" />
            <button className="btn btn-primary btn-full" disabled={loading}>{loading ? "Verifying..." : "Verify answer"}</button>
            <button type="button" className="btn btn-ghost btn-full" onClick={() => setStep(1)}>Back</button>
          </form>}

          {step === 3 && <form onSubmit={submitReset}>
            <div className="auth-header"><span className="auth-icon"><KeyRound size={20} /></span><h2>Create new password</h2><p>Choose a strong password for your MoneyMate account.</p></div>
            <label className="input-label">New password</label>
            <input className="plain-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 6 characters" />
            <label className="input-label">Confirm password</label>
            <input className="plain-input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" />
            <button className="btn btn-primary btn-full" disabled={loading}>{loading ? "Resetting..." : "Reset password"}</button>
          </form>}

          {step === 4 && <div className="success-state"><div className="success-icon"><Check size={28} /></div><h2>Password updated</h2><p>Your password has been changed successfully. You can now sign in with your new password.</p><button className="btn btn-primary btn-full" onClick={() => navigate("/login")}>Go to login</button></div>}

          {step < 4 && <p className="auth-switch"><Link to="/login">Back to login</Link></p>}
        </div>
      </div>
    </section>
  );
}