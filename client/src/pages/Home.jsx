import { ArrowDownRight, ArrowUpRight, CalendarDays, MoreHorizontal, Plus, Receipt, Wallet, Zap } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { useAuth } from "../context/AuthContext";

const transactions = [
  ["Groceries", "Today, 10:32 AM", "− ₹1,280", "expense", "G"],
  ["Salary", "Yesterday, 09:15 AM", "+ ₹48,000", "income", "S"],
  ["Electricity bill", "05 Oct, 07:40 PM", "− ₹2,140", "expense", "E"],
  ["Coffee & snacks", "04 Oct, 04:20 PM", "− ₹360", "expense", "C"],
  ["Freelance project", "03 Oct, 11:05 AM", "+ ₹8,500", "income", "F"]
];

export default function Home() {
  const { user } = useAuth();
  return (
    <section className="dashboard-page">
      <div className="container">
        <div className="dashboard-head">
          <div><span className="eyebrow">Personal dashboard</span><h1>Good to see you, {user?.name?.split(" ")[0] || "there"}.</h1><p>Here's your financial snapshot for October.</p></div>
          <button className="btn btn-primary"><Plus size={18} /> Add transaction</button>
        </div>

        <div className="stat-grid">
          <GlassCard className="stat-card balance"><div className="stat-top"><span>Available balance</span><span className="stat-icon"><Wallet size={18} /></span></div><strong>₹52,480</strong><small><ArrowUpRight size={14} /> 12.8% from last month</small></GlassCard>
          <GlassCard className="stat-card"><div className="stat-top"><span>Total income</span><span className="stat-icon green"><ArrowUpRight size={18} /></span></div><strong>₹70,900</strong><small className="positive">+ ₹6,200 this month</small></GlassCard>
          <GlassCard className="stat-card"><div className="stat-top"><span>Total expenses</span><span className="stat-icon red"><ArrowDownRight size={18} /></span></div><strong>₹18,420</strong><small className="negative">− ₹1,840 this month</small></GlassCard>
          <GlassCard className="stat-card"><div className="stat-top"><span>Savings rate</span><span className="stat-icon"><Zap size={18} /></span></div><strong>73.9%</strong><small className="positive">Healthy savings</small></GlassCard>
        </div>

        <div className="dashboard-grid">
          <GlassCard className="analytics-card">
            <div className="card-head"><div><span className="muted">Overview</span><h2>Spending activity</h2></div><button className="period-btn">October <CalendarDays size={15} /></button></div>
            <div className="large-chart">
              <div className="y-axis"><span>₹8k</span><span>₹6k</span><span>₹4k</span><span>₹2k</span><span>₹0</span></div>
              <div className="chart-main">
                <div className="grid-lines">{[1,2,3,4,5].map(n => <i key={n} />)}</div>
                <div className="bars large">{[36,55,45,72,48,84,62,91,58,76,49,68].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div>
                <div className="x-axis">{["1","4","7","10","13","16","19","22","25","28","30"].map(x=><span key={x}>{x}</span>)}</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="category-card">
            <div className="card-head"><div><span className="muted">Categories</span><h2>Where it goes</h2></div><MoreHorizontal size={20} /></div>
            <div className="donut-wrap"><div className="donut"><div><b>₹18.4k</b><span>Spent</span></div></div></div>
            <div className="category-list">
              {[["Housing","₹6,200","34%"],["Food","₹4,120","22%"],["Transport","₹2,980","16%"],["Shopping","₹2,140","12%"]].map(([n,v,p],i)=><div key={n}><span><i className={`dot dot-${i}`} />{n}</span><b>{v}</b><em>{p}</em></div>)}
            </div>
          </GlassCard>

          <GlassCard className="transactions-card">
            <div className="card-head"><div><span className="muted">Activity</span><h2>Recent transactions</h2></div><button className="text-link">View all</button></div>
            <div className="transaction-list">{transactions.map(([name,date,amount,type,letter])=><div className="transaction-row" key={name}><div className={`transaction-avatar ${type}`}>{letter}</div><div className="transaction-name"><b>{name}</b><span>{date}</span></div><strong className={type}>{amount}</strong></div>)}</div>
          </GlassCard>

          <GlassCard className="quick-card"><div className="quick-icon"><Receipt size={21} /></div><span className="eyebrow">Quick action</span><h2>Record an expense</h2><p>Keep your dashboard accurate by adding your latest transaction.</p><button className="btn btn-primary">Add expense <Plus size={17} /></button></GlassCard>
        </div>
      </div>
    </section>
  );
}