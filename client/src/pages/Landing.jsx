import { Link } from "react-router-dom";
import {
  ArrowRight, BarChart3, Check, PieChart, ShieldCheck,
  Smartphone, Sparkles, TrendingDown, TrendingUp, Wallet
} from "lucide-react";
import GlassCard from "../components/GlassCard";

const features = [
  { icon: BarChart3, title: "Clear analytics", text: "See your income, expenses, balance, and spending patterns at a glance." },
  { icon: PieChart, title: "Category insights", text: "Understand exactly which areas consume most of your monthly budget." },
  { icon: ShieldCheck, title: "Private by design", text: "Keep your financial information inside your account and under your control." },
  { icon: Smartphone, title: "Any-screen experience", text: "Use MoneyMate comfortably on desktop, tablet, or mobile." }
];

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="pill"><Sparkles size={14} /> Simple finance, smarter decisions</div>
            <h1>Make every rupee <span>count.</span></h1>
            <p className="hero-text">
              MoneyMate gives you a clean, effortless way to track expenses, understand your habits, and stay in control of your money.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">Start for free <ArrowRight size={18} /></Link>
              <Link to="/about" className="btn btn-soft btn-large">Explore MoneyMate</Link>
            </div>
            <div className="trust-row">
              <span><Check size={15} /> Easy to use</span>
              <span><Check size={15} /> Smart insights</span>
              <span><Check size={15} /> Responsive</span>
            </div>
          </div>

          <div className="hero-visual">
            <GlassCard className="dashboard-preview">
              <div className="preview-top">
                <div>
                  <span className="muted">Total balance</span>
                  <strong>₹ 52,480</strong>
                </div>
                <div className="preview-avatar">MM</div>
              </div>
              <div className="preview-chart">
                <div className="chart-labels"><span>Spending overview</span><span>Last 7 days</span></div>
                <div className="bars">
                  {[42, 62, 48, 76, 56, 88, 67, 96, 72, 82, 58, 91].map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="preview-cards">
                <div><span><TrendingUp size={15} /> Income</span><b>₹ 70,900</b></div>
                <div><span><TrendingDown size={15} /> Expense</span><b>₹ 18,420</b></div>
              </div>
              <div className="transaction-mini">
                <div className="mini-icon"><Wallet size={16} /></div>
                <div><b>Groceries</b><span>Today, 10:32 AM</span></div>
                <strong>− ₹ 1,280</strong>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Everything in one place</span>
            <h2>A calmer way to manage money.</h2>
            <p>No clutter. No complicated spreadsheets. Just the information you need to make better financial decisions.</p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text }) => (
              <GlassCard className="feature-card" key={title}>
                <div className="feature-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section workflow-section">
        <div className="container workflow-grid">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>From spending data to useful insight.</h2>
            <p className="lead">MoneyMate keeps the process simple so you can spend less time managing your finances and more time using them wisely.</p>
          </div>
          <div className="steps">
            {[
              ["01", "Create your account", "Register once and keep your personal finance workspace ready."],
              ["02", "Record transactions", "Add income and expenses as they happen."],
              ["03", "Understand your month", "Use the dashboard and categories to spot patterns."]
            ].map(([num, title, text]) => (
              <div className="step" key={num}>
                <span>{num}</span><div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-box">
          <div>
            <span className="eyebrow">Your money. Your clarity.</span>
            <h2>Ready to make your finances easier?</h2>
            <p>Create your MoneyMate account and start tracking today.</p>
          </div>
          <Link to="/register" className="btn btn-white btn-large">Create account <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}