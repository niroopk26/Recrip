/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  ChevronDown, 
  CreditCard, 
  LayoutDashboard, 
  MessageSquare, 
  PieChart, 
  RefreshCcw, 
  Users, 
  Zap,
  ArrowRight,
  Play,
  Menu,
  X,
  Plus,
  Minus,
  Globe,
  ShieldCheck,
  TrendingUp,
  Clock,
  Smartphone
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from './lib/utils';

// --- MOCK DATA ---
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const recoveryData = [
  { name: 'Week 1', value: 1200 },
  { name: 'Week 2', value: 1900 },
  { name: 'Week 3', value: 1500 },
  { name: 'Week 4', value: 2400 },
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <RefreshCcw className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">Recrip</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Pricing', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
            Login
          </button>
          <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all">
            Get Started
          </button>
        </div>

        <button 
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col gap-4"
          >
            {['Features', 'How it works', 'Pricing', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-lg font-medium text-slate-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 text-slate-600 font-semibold">Login</button>
              <button className="w-full py-3 bg-primary text-white rounded-xl font-semibold">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DashboardMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full aspect-[4/3] glass-dark rounded-3xl overflow-hidden shadow-2xl group"
    >
      {/* Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-slate-800 flex flex-col items-center py-6 gap-6">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-4 h-4 text-primary" />
        </div>
        <Users className="w-4 h-4 text-slate-500" />
        <Bell className="w-4 h-4 text-slate-500" />
        <PieChart className="w-4 h-4 text-slate-500" />
      </div>

      {/* Main Content */}
      <div className="ml-16 p-6 h-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-white font-semibold text-lg">Revenue Overview</h4>
            <p className="text-slate-400 text-xs">Real-time subscription tracking</p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">
              +24% GROWTH
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#4F46E5' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#4F46E5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Active Subs', value: '1,284', icon: Users, color: 'text-blue-400' },
            { label: 'Recovered', value: '$12.4k', icon: Zap, color: 'text-amber-400' },
            { label: 'Churn Rate', value: '1.2%', icon: TrendingUp, color: 'text-rose-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={cn("w-3 h-3", stat.color)} />
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{stat.label}</span>
              </div>
              <div className="text-white font-bold text-sm">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Alert */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-4 glass p-4 rounded-2xl shadow-2xl border border-white/40 flex items-center gap-3 max-w-[200px]"
      >
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <Bell className="text-amber-600 w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Renewal Alert</div>
          <div className="text-xs font-bold text-slate-800">Gym Member #428</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6 border border-primary/20">
            <Zap className="w-4 h-4" />
            <span>New: AI-Powered Churn Prediction</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Never Lose Revenue from <span className="text-gradient">Expired Subscriptions</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
            Recrip helps businesses automate renewals, track customers, and recover missed payments — all from one powerful dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              Book a Demo
            </button>
          </div>
          
          <p className="text-slate-400 text-sm">
            Already using Recrip? <a href="#" className="text-primary font-semibold hover:underline">Login</a>
          </p>
        </motion.div>

        <div className="relative">
          <DashboardMockup />
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 blur-3xl rounded-full animate-pulse-slow" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-20 border-y border-slate-100 bg-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mb-12">
          Trusted by 500+ growing businesses worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
          {['Stripe', 'Notion', 'Linear', 'Loom', 'Framer', 'Vercel'].map((logo) => (
            <div key={logo} className="flex justify-center">
              <span className="text-2xl font-display font-black text-slate-900">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Smart Renewal Alerts",
      desc: "Automatically remind customers via WhatsApp, SMS, and email before they expire.",
      icon: Bell,
      color: "bg-blue-500"
    },
    {
      title: "Payment Recovery",
      desc: "Recover missed payments and reduce churn effortlessly with automated retries.",
      icon: CreditCard,
      color: "bg-indigo-500"
    },
    {
      title: "Analytics Dashboard",
      desc: "Track revenue, renewals, and customer behavior with deep visual insights.",
      icon: PieChart,
      color: "bg-violet-500"
    },
    {
      title: "Customer Management",
      desc: "All your subscription data in one place. Search, filter, and manage with ease.",
      icon: Users,
      color: "bg-fuchsia-500"
    },
    {
      title: "Auto Renewals",
      desc: "Set it once and let Recrip handle the rest. Seamless recurring billing.",
      icon: RefreshCcw,
      color: "bg-emerald-500"
    },
    {
      title: "Integrations",
      desc: "Works seamlessly with your existing tools like Stripe, Razorpay, and more.",
      icon: Globe,
      color: "bg-amber-500"
    }
  ];

  return (
    <section id="features" className="py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-6">
            Everything you need to <span className="text-gradient">scale faster</span>
          </h2>
          <p className="text-xl text-slate-600">
            Stop manually tracking spreadsheets. Recrip automates the boring stuff so you can focus on growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl group hover:shadow-2xl transition-all duration-300"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform", feature.color)}>
                <feature.icon className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mb-8">
              Built for <span className="text-gradient">Modern Teams</span>
            </h2>
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all text-left group",
                    activeTab === tab.id 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    activeTab === tab.id ? "bg-primary text-white" : "bg-slate-100 group-hover:bg-slate-200"
                  )}>
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-lg">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="glass-dark rounded-[2.5rem] p-4 shadow-3xl relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full" />
              <div className="bg-slate-900 rounded-[2rem] overflow-hidden aspect-video relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 p-8 flex flex-col gap-8"
                  >
                    {activeTab === 'dashboard' && (
                      <div className="h-full flex flex-col gap-6">
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</div>
                            <div className="text-4xl font-display font-bold text-white">$142,850.00</div>
                          </div>
                          <div className="text-emerald-400 font-bold flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            +12.5%
                          </div>
                        </div>
                        <div className="flex-1 min-h-0 bg-slate-800/30 rounded-2xl border border-slate-800 p-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={recoveryData}>
                              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {recoveryData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index === 3 ? '#4F46E5' : '#1e293b'} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                    {activeTab === 'customers' && (
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-white font-bold text-xl">Recent Subscriptions</h3>
                          <button className="text-primary text-sm font-bold">View All</button>
                        </div>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-800">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-slate-700 rounded-full" />
                              <div>
                                <div className="text-white font-bold text-sm">Customer Name #{i}</div>
                                <div className="text-slate-500 text-xs">Premium Plan • Monthly</div>
                              </div>
                            </div>
                            <div className="text-white font-bold">$49.00</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === 'notifications' && (
                      <div className="flex flex-col gap-4 items-center justify-center h-full text-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                          <MessageSquare className="text-primary w-10 h-10" />
                        </div>
                        <h3 className="text-white font-bold text-2xl">Automated Workflows</h3>
                        <p className="text-slate-400 max-w-sm">
                          Set up triggers to automatically notify customers when their subscription is about to expire.
                        </p>
                      </div>
                    )}
                    {activeTab === 'payments' && (
                      <div className="grid grid-cols-2 gap-6 h-full">
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                          <CreditCard className="text-primary w-8 h-8" />
                          <div>
                            <div className="text-slate-500 text-xs font-bold uppercase mb-1">Success Rate</div>
                            <div className="text-3xl font-display font-bold text-white">98.2%</div>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                          <RefreshCcw className="text-emerald-400 w-8 h-8" />
                          <div>
                            <div className="text-slate-500 text-xs font-bold uppercase mb-1">Recovered</div>
                            <div className="text-3xl font-display font-bold text-white">$4,290</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Add your customers",
      desc: "Import your existing customer list or sync with your current CRM in seconds.",
      icon: Plus
    },
    {
      title: "Set renewal schedules",
      desc: "Define when and how you want to notify customers about their upcoming renewals.",
      icon: Clock
    },
    {
      title: "Automate & track revenue",
      desc: "Sit back while Recrip handles the follow-ups and provides real-time growth data.",
      icon: TrendingUp
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-6">
            Get started in <span className="text-gradient">3 simple steps</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-slate-100 group hover:scale-110 transition-transform">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  <step.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed max-w-[280px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section className="py-32 px-6 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-center">
        {[
          { label: "Increase renewal rates", value: "40%" },
          { label: "Save manual hours", value: "20h+" },
          { label: "Revenue recovered", value: "$1M+" }
        ].map((benefit, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="text-7xl md:text-9xl font-display font-black tracking-tighter opacity-20">
              {benefit.value}
            </div>
            <div className="text-2xl font-bold -mt-12 md:-mt-16">{benefit.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <MessageSquare className="w-16 h-16 text-primary/20 mx-auto mb-8" />
          <blockquote className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-12 leading-tight">
            "Recrip helped us reduce missed renewals by <span className="text-primary">60% in just 2 months</span>. It's the best investment we've made for our gym this year."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 bg-slate-200 rounded-full" />
            <div className="text-left">
              <div className="font-bold text-lg text-slate-900">Alex Rivera</div>
              <div className="text-slate-500">Founder, Peak Performance Gym</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadCapture = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 leading-tight">
            Start Automating Your <span className="text-primary">Renewals Today</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Join hundreds of businesses that are recovering lost revenue every single day. No credit card required to start.
          </p>
          
          <div className="space-y-6">
            {[
              "Free 14-day trial",
              "No setup fees",
              "Cancel anytime",
              "24/7 Priority support"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-dark p-8 md:p-12 rounded-[2.5rem] border-slate-800">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Business Name</label>
                <input 
                  type="text" 
                  placeholder="Peak Fitness"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
              Request Setup
            </button>
            <p className="text-center text-slate-500 text-sm">
              Or <a href="#" className="text-white font-bold hover:underline">Book a Free Demo</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Recrip track my renewals?",
      a: "Recrip integrates with your existing payment gateway or CRM to automatically pull subscription data and set up renewal schedules."
    },
    {
      q: "Can I customize the notification messages?",
      a: "Absolutely! You can fully customize the content, timing, and channel (WhatsApp, SMS, Email) for every notification sent."
    },
    {
      q: "Is my customer data secure?",
      a: "Yes, we use bank-grade encryption and are fully GDPR/SOC2 compliant. Your data is isolated and protected at all times."
    },
    {
      q: "What businesses is Recrip best for?",
      a: "Recrip is designed for any business with recurring subscriptions, including gyms, salons, clinics, SaaS, and service providers."
    }
  ];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-display font-extrabold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-lg text-slate-900">{faq.q}</span>
                {openIndex === i ? <Minus className="text-primary" /> : <Plus className="text-slate-400" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <RefreshCcw className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">Recrip</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
              The world's most powerful subscription renewal management platform. Built for businesses that want to scale without losing revenue.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map((s) => (
                <a key={s} href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                  <Globe className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Integrations', 'Pricing', 'Changelog'].map((item) => (
                <li key={item}><a href="#" className="text-slate-500 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}><a href="#" className="text-slate-500 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-200 gap-4">
          <p className="text-slate-400 text-sm">© 2026 Recrip Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-grade security guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <ProductShowcase />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <LeadCapture />
        
        {/* Login Highlight */}
        <section className="py-20 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto glass p-10 rounded-[2.5rem]">
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">Already a customer?</h3>
            <p className="text-slate-600 mb-8">Access your dashboard to manage your renewals and track growth.</p>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all">
              Login to Dashboard
            </button>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
