import React, { useState } from 'react';
import { 
  BrainCircuit, 
  ShieldCheck, 
  LayoutDashboard, 
  Bell, 
  FileCheck, 
  Database,
  Smartphone,
  User,
  Lock,
  ArrowLeft,
  ShieldCheck as ShieldIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [loginType, setLoginType] = useState<'account' | 'phone'>('account');
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const features = [
    {
      icon: <BrainCircuit className="text-white/80" size={24} />,
      title: "AI 编标",
      desc: "智能辅助标书编写，大幅提升编标效率与质量"
    },
    {
      icon: <FileCheck className="text-white/80" size={24} />,
      title: "标书检查",
      desc: "自动化合规性检查，规避投标风险，提高中标率"
    },
    {
      icon: <LayoutDashboard className="text-white/80" size={24} />,
      title: "项目管理",
      desc: "全流程投标项目跟踪，团队协作高效有序"
    },
    {
      icon: <Bell className="text-white/80" size={24} />,
      title: "标讯",
      desc: "实时推送全网招标信息，精准匹配业务机会"
    },
    {
      icon: <ShieldCheck className="text-white/80" size={24} />,
      title: "电子证照库",
      desc: "企业资质证照统一管理，投标引用安全便捷"
    },
    {
      icon: <Database className="text-white/80" size={24} />,
      title: "企业知识库",
      desc: "沉淀投标核心素材，实现知识资产复用"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-[40px] shadow-2xl flex overflow-hidden max-w-[1150px] w-full min-h-[720px]">
        {/* Left Sidebar */}
        <div className="w-[460px] bg-primary p-14 flex flex-col relative overflow-hidden shrink-0 hidden md:flex">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold text-white mb-16 tracking-tight">
              投标协同管理系统
            </h1>

            <div className="space-y-12">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="mt-1 p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                    {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-base text-white/60 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-16 bg-white">
          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-[440px]"
              >
                <h2 className="text-5xl font-extrabold text-slate-900 mb-14 tracking-tight">
                  欢迎登录
                </h2>

                {/* Tabs */}
                <div className="flex border-b border-slate-100 mb-12">
                  <button 
                    onClick={() => setLoginType('account')}
                    className={`pb-5 px-8 text-xl font-bold transition-all relative ${
                      loginType === 'account' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    账号登录
                    {loginType === 'account' && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary rounded-t-full" />
                    )}
                  </button>
                  <button 
                    onClick={() => setLoginType('phone')}
                    className={`pb-5 px-8 text-xl font-bold transition-all relative ${
                      loginType === 'phone' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    手机号登录
                    {loginType === 'phone' && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary rounded-t-full" />
                    )}
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-10">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                      {loginType === 'account' ? <User size={28} /> : <Smartphone size={28} />}
                    </div>
                    <input 
                      type="text" 
                      placeholder={loginType === 'account' ? "请输入手机号码" : "请输入手机号"}
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                      <Lock size={28} />
                    </div>
                    <input 
                      type="password" 
                      placeholder="请输入登录密码"
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                    />
                  </div>

                  <div className="flex items-center justify-between px-2">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="size-6 rounded-md border-slate-300 text-primary focus:ring-primary"
                      />
                      <span className="text-base text-slate-500 group-hover:text-slate-700 transition-colors">
                        登录视为您已阅读并同意 <span className="text-primary hover:underline">服务条款</span> 和 <span className="text-primary hover:underline">隐私政策</span>
                      </span>
                    </label>
                    <button 
                      onClick={() => setView('forgot')}
                      className="text-base text-primary font-bold hover:underline"
                    >
                      忘记密码?
                    </button>
                  </div>

                  <button 
                    onClick={onLogin}
                    className="w-full py-6 bg-primary text-white rounded-[24px] font-bold text-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:bg-primary/90 active:scale-[0.98] transition-all mt-8"
                  >
                    登录
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-[440px]"
              >
                <button 
                  onClick={() => setView('login')}
                  className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 group"
                >
                  <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xl font-bold">返回登录</span>
                </button>

                <h2 className="text-5xl font-extrabold text-slate-900 mb-14 tracking-tight">
                  重置密码
                </h2>

                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                      <Smartphone size={28} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="请输入手机号码"
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                        <ShieldIcon size={28} />
                      </div>
                      <input 
                        type="text" 
                        placeholder="验证码"
                        className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                      />
                    </div>
                    <button 
                      onClick={startCountdown}
                      disabled={countdown > 0}
                      className="px-8 bg-slate-50 border border-slate-200 rounded-[24px] text-lg font-bold text-primary hover:bg-slate-100 disabled:text-slate-400 transition-all min-w-[140px]"
                    >
                      {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                      <Lock size={28} />
                    </div>
                    <input 
                      type="password" 
                      placeholder="设置新密码"
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                      <Lock size={28} />
                    </div>
                    <input 
                      type="password" 
                      placeholder="确认新密码"
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                    />
                  </div>

                  <button 
                    onClick={() => setView('login')}
                    className="w-full py-6 bg-primary text-white rounded-[24px] font-bold text-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:bg-primary/90 active:scale-[0.98] transition-all mt-8"
                  >
                    确认重置
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;
