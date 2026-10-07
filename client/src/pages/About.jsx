import { BarChart3, HeartHandshake, Lightbulb, LockKeyhole, Target } from "lucide-react";

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">About MoneyMate</span>
          <h1>Personal finance without the financial noise.</h1>
          <p>MoneyMate is designed around one simple idea: when your money is easy to understand, better decisions become easier too.</p>
        </div>
      </section>

      <section className="section section-white">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">Our approach</span>
            <h2>Built for real everyday spending.</h2>
            <p className="lead">Most people don't need another complicated financial system. They need a clear picture of what comes in, what goes out, and where it goes.</p>
            <p>MoneyMate brings those pieces together in one focused workspace. It is intentionally simple, visual, and responsive so financial tracking can become a habit rather than a chore.</p>
          </div>
          <div className="about-values">
            {[
              [Target, "Clarity", "Present important numbers without unnecessary complexity."],
              [Lightbulb, "Insight", "Turn transaction history into information you can act on."],
              [LockKeyhole, "Privacy", "Treat personal financial data as information that deserves care."],
              [HeartHandshake, "Human", "Keep the experience friendly, practical, and approachable."]
            ].map(([Icon, title, text]) => (
              <div className="value-card" key={title}>
                <div className="feature-icon"><Icon size={20} /></div>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-blue">
        <div className="container about-blue-grid">
          <div>
            <span className="eyebrow light">Why MoneyMate</span>
            <h2>A dashboard you actually want to open.</h2>
          </div>
          <div>
            <p>Track transactions, review categories, and understand your balance through a visual experience built for quick daily use.</p>
            <div className="about-stat-row">
              <div><BarChart3 size={18} /><b>Visual</b><span>Insights</span></div>
              <div><LockKeyhole size={18} /><b>Private</b><span>Workspace</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}