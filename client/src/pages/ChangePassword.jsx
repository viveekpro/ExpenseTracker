import { useState } from "react";
import { Check, KeyRound } from "lucide-react";
import { changePassword } from "../services/authService";

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault(); setError(""); setShowSuccess(false);
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) return setError("Please complete all fields.");
    if (form.newPassword.length < 6) return setError("New password must be at least 6 characters.");
    if (form.newPassword !== form.confirmPassword) return setError("New passwords do not match.");
    try {
      setLoading(true);
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setShowSuccess(true);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) { setError(err.response?.data?.message || "Unable to change password."); }
    finally { setLoading(false); }
  };

  return (
    <section className="settings-page">
      <div className="container settings-grid">
        <div>
          <span className="eyebrow">Security</span>
          <h1>Change your password.</h1>
          <p>Keep your MoneyMate account protected with a password you don't reuse elsewhere.</p>
          <div className="security-note"><KeyRound size={19} /><div><b>Good password practice</b><span>Use a unique combination of letters, numbers, and symbols.</span></div></div>
        </div>
        <div className="auth-card">
          <div className="auth-header"><span className="auth-icon"><KeyRound size={20} /></span><h2>Update password</h2><p>Enter your current password first.</p></div>
          {error && <div className="form-alert">{error}</div>}
          {showSuccess && <div className="form-success"><Check size={16} /> Password changed successfully.</div>}
          <form onSubmit={submit}>
            <label className="input-label">Current password</label>
            <input className="plain-input" type="password" name="currentPassword" value={form.currentPassword} onChange={update} />
            <label className="input-label">New password</label>
            <input className="plain-input" type="password" name="newPassword" value={form.newPassword} onChange={update} />
            <label className="input-label">Confirm new password</label>
            <input className="plain-input" type="password" name="confirmPassword" value={form.confirmPassword} onChange={update} />
            <button className="btn btn-primary btn-full" disabled={loading}>{loading ? "Updating..." : "Change password"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}