import React, { useState } from 'react';
import { 
  AlertCircle,
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
  Search,
  Building2,
  ShieldCheck as ShieldIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginProps {
  onLogin: (enterpriseId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'forgot' | 'select-enterprise'>('login');
  const [loginType, setLoginType] = useState<'account' | 'phone'>('account');
  const [selectedEnterprise, setSelectedEnterprise] = useState<string | null>(null);
  const [rememberDefault, setRememberDefault] = useState(false);
  const [showOnlyDefault, setShowOnlyDefault] = useState(false);
  const [selectionTab, setSelectionTab] = useState<'personal' | 'enterprise'>('enterprise');
  const [searchQuery, setSearchQuery] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [simulatedCode, setSimulatedCode] = useState<string | null>(null);

  React.useEffect(() => {
    const savedUsername = localStorage.getItem('saved_username');
    const savedPassword = localStorage.getItem('saved_password');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberPassword(true);
    }
  }, []);

  const enterprises = [
    { id: 'personal', name: '陈经理', status: '13800138000', isPersonal: true },
    { id: '1', name: '中建八局第三建设有限公司', status: '已加入' },
    { id: '2', name: '中铁建工集团有限公司', status: '已加入' },
    { id: '3', name: '中国建筑第一局(集团)有限公司', status: '审核中' },
  ];

  const filteredEnterprises = enterprises.filter(e => 
    !e.isPersonal && e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerError = (msg: string) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleInitialLogin = () => {
    if (loginType === 'account') {
      // Test credentials: 13800138000 / 888888
      if (username === '13800138000' && password === '888888') {
        setError('');
        
        if (rememberPassword) {
          localStorage.setItem('saved_username', username);
          localStorage.setItem('saved_password', password);
        } else {
          localStorage.removeItem('saved_username');
          localStorage.removeItem('saved_password');
        }

        if (selectionTab === 'personal') {
          onLogin('personal');
          return;
        }

        const defaultId = localStorage.getItem('default_login_id');
        if (defaultId) {
          setSelectedEnterprise(defaultId);
          setRememberDefault(true);
          setShowOnlyDefault(true);
        } else {
          setShowOnlyDefault(false);
        }
        setView('select-enterprise');
      } else {
        triggerError('手机号或密码错误');
      }
    } else {
      // Phone login: any 11-digit number + simulated code 123456
      if (phone.length === 11 && code === '123456') {
        setError('');
        if (selectionTab === 'personal') {
          onLogin('personal');
          return;
        }

        const defaultId = localStorage.getItem('default_login_id');
        if (defaultId) {
          setSelectedEnterprise(defaultId);
          setRememberDefault(true);
          setShowOnlyDefault(true);
        } else {
          setShowOnlyDefault(false);
        }
        setView('select-enterprise');
      } else {
        triggerError('请输入正确的手机号和验证码(123456)');
      }
    }
  };

  const handleFinalLogin = () => {
    if (selectedEnterprise) {
      if (rememberDefault) {
        localStorage.setItem('default_login_id', selectedEnterprise);
      } else {
        localStorage.removeItem('default_login_id');
      }
      onLogin(selectedEnterprise);
    }
  };

  const startCountdown = () => {
    setCountdown(60);
    setSimulatedCode('123456');
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
      title: "我的素材",
      desc: "沉淀投标核心素材，实现知识资产复用"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 overflow-auto">
      <div className="bg-white rounded-[40px] shadow-2xl flex overflow-hidden w-[1020px] h-[720px] shrink-0">
        {/* Left Sidebar */}
        <div className="w-[480px] bg-primary p-14 flex flex-col relative overflow-hidden shrink-0 hidden md:flex">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold text-white mb-16 tracking-tight whitespace-nowrap">
              投标协同管理平台
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
                    <h3 className="text-xl font-bold text-white mb-2 whitespace-nowrap">{feature.title}</h3>
                    <p className="text-base text-white/60 leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-[540px] flex flex-col items-center justify-center p-16 bg-white relative shrink-0">
          {/* Floating Error Toast */}
          <AnimatePresence>
            {showError && (
              <motion.div 
                initial={{ opacity: 0, y: -20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -20, x: '-50%' }}
                className="absolute top-10 left-1/2 z-50 w-full max-w-[400px]"
              >
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-500 shadow-xl shadow-red-500/10">
                  <AlertCircle size={24} />
                  <span className="text-base font-bold">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-[440px]"
              >
                <h2 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight text-center whitespace-nowrap">
                  欢迎登录
                </h2>

                <div className="flex justify-center mb-10">
                  <div className="inline-flex p-1.5 bg-slate-100/40 rounded-2xl relative w-full border border-slate-200/30 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                    <motion.div
                      className="absolute inset-y-1.5 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-slate-200/60"
                      initial={false}
                      animate={{
                        left: selectionTab === 'personal' ? '6px' : '50%',
                        right: selectionTab === 'personal' ? '50%' : '6px'
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                    <button 
                      onClick={() => setSelectionTab('personal')}
                      className={`relative z-10 flex-1 py-3.5 text-sm font-bold transition-all duration-500 whitespace-nowrap flex items-center justify-center gap-2.5 ${
                        selectionTab === 'personal' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg transition-colors duration-500 ${selectionTab === 'personal' ? 'bg-primary/10' : 'bg-transparent'}`}>
                        <User size={18} className={selectionTab === 'personal' ? 'text-primary' : 'text-slate-400'} />
                      </div>
                      个人账户登录
                    </button>
                    <button 
                      onClick={() => setSelectionTab('enterprise')}
                      className={`relative z-10 flex-1 py-3.5 text-sm font-bold transition-all duration-500 whitespace-nowrap flex items-center justify-center gap-2.5 ${
                        selectionTab === 'enterprise' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg transition-colors duration-500 ${selectionTab === 'enterprise' ? 'bg-primary/10' : 'bg-transparent'}`}>
                        <Building2 size={18} className={selectionTab === 'enterprise' ? 'text-primary' : 'text-slate-400'} />
                      </div>
                      企业账户登录
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100 mb-10 justify-center gap-8">
                  <button 
                    onClick={() => setLoginType('account')}
                    className={`pb-4 px-2 text-lg font-bold transition-all relative whitespace-nowrap ${
                      loginType === 'account' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    账号登录
                    {loginType === 'account' && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                  <button 
                    onClick={() => setLoginType('phone')}
                    className={`pb-4 px-2 text-lg font-bold transition-all relative whitespace-nowrap ${
                      loginType === 'phone' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    手机号登录
                    {loginType === 'phone' && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                      {loginType === 'account' ? <User size={28} /> : <Smartphone size={28} />}
                    </div>
                    <input 
                      type="text" 
                      value={loginType === 'account' ? username : phone}
                      onChange={(e) => loginType === 'account' ? setUsername(e.target.value) : setPhone(e.target.value)}
                      placeholder="请输入手机号"
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
                      {loginType === 'account' ? <Lock size={28} /> : <ShieldIcon size={28} />}
                    </div>
                    {loginType === 'account' ? (
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="请输入登录密码"
                        className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                      />
                    ) : (
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="请输入验证码"
                            className="flex-1 pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[24px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xl font-medium"
                          />
                          <button 
                            onClick={startCountdown}
                            disabled={countdown > 0}
                            className="px-8 bg-slate-50 border border-slate-200 rounded-[24px] text-lg font-bold text-primary hover:bg-slate-100 disabled:text-slate-400 transition-all min-w-[140px]"
                          >
                            {countdown > 0 ? `${countdown}s` : '获取验证码'}
                          </button>
                        </div>
                        {simulatedCode && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-primary text-sm font-bold px-2"
                          >
                            [模拟短信] 您的验证码是：{simulatedCode}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Error Message removed from here */}

                  <div className="flex flex-col gap-4 px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        {loginType === 'account' && (
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={rememberPassword}
                              onChange={(e) => setRememberPassword(e.target.checked)}
                              className="size-5 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors whitespace-nowrap">
                              记住密码
                            </span>
                          </label>
                        )}
                      </div>
                      <button 
                        onClick={() => setView('forgot')}
                        className="text-sm text-primary font-bold hover:underline whitespace-nowrap"
                      >
                        忘记密码?
                      </button>
                    </div>
                  </div>

                  <div className="px-2 text-xs text-slate-400 whitespace-nowrap">
                    登录视为您已阅读并同意 <span className="text-primary hover:underline cursor-pointer">服务条款</span> 和 <span className="text-primary hover:underline cursor-pointer">隐私政策</span>
                  </div>

                  <button 
                    onClick={handleInitialLogin}
                    className="w-full py-5 bg-primary text-white rounded-[12px] font-bold text-xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:bg-primary/90 active:scale-[0.98] transition-all mt-6"
                  >
                    确认登录
                  </button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-400 font-medium">推荐使用</span>
                    </div>
                  </div>

                  <button 
                    onClick={async () => {
                      try {
                        const { signIn } = await import('../firebase');
                        await signIn();
                        onLogin('personal');
                      } catch (err) {
                        triggerError('Google 登录失败，请检查 Firebase 配置');
                      }
                    }}
                    className="w-full py-5 bg-white border-2 border-primary/20 text-primary rounded-[12px] font-bold text-xl hover:bg-primary/5 hover:border-primary transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/5"
                  >
                    <img src="https://www.google.com/favicon.ico" className="size-6" alt="Google" />
                    使用 Google 账号登录
                  </button>
                </div>
              </motion.div>
            ) : view === 'forgot' ? (
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

                <h2 className="text-5xl font-extrabold text-slate-900 mb-14 tracking-tight whitespace-nowrap">
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
            ) : (
              <motion.div 
                key="select-enterprise"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-[480px]"
              >
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-nowrap">
                    {selectionTab === 'personal' ? '确认登录账号' : '选择进入企业'}
                  </h2>
                  <p className="text-slate-500 text-lg whitespace-nowrap">
                    {selectionTab === 'personal' ? '您正在以个人身份登录' : '请选择您要登录的企业账号'}
                  </p>
                </div>

                {!showOnlyDefault && selectionTab === 'enterprise' && (
                  <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
                      <Search size={20} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="搜索企业名称..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-[16px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg"
                    />
                  </div>
                )}

                <div className="space-y-4 mb-10 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                  {showOnlyDefault ? (
                    // Only show the default enterprise
                    enterprises.filter(e => e.id === selectedEnterprise).map((enterprise) => (
                      <div
                        key={enterprise.id}
                        className="w-full flex items-center gap-4 p-5 rounded-[20px] border-2 border-primary bg-primary/5 shadow-lg shadow-primary/10 text-left"
                      >
                        <div className="p-3 rounded-xl bg-primary text-white">
                          <Building2 size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg whitespace-nowrap">{enterprise.name}</h4>
                          </div>
                          <span className={`text-sm font-medium whitespace-nowrap ${
                            enterprise.status === '已加入' ? 'text-emerald-500' : 'text-orange-500'
                          }`}>
                            {enterprise.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : selectionTab === 'personal' ? (
                    // Show personal account card
                    enterprises.filter(e => e.id === 'personal').map((enterprise) => (
                      <div
                        key={enterprise.id}
                        className="w-full flex items-center gap-4 p-5 rounded-[20px] border-2 border-primary bg-primary/5 shadow-lg shadow-primary/10 text-left"
                      >
                        <div className="p-3 rounded-xl bg-primary text-white">
                          <User size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg whitespace-nowrap">{enterprise.name}</h4>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full whitespace-nowrap">个人账号</span>
                          </div>
                          <span className="text-sm font-medium text-orange-500 whitespace-nowrap">
                            {enterprise.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Show full enterprise list (excluding personal)
                    filteredEnterprises.map((enterprise) => (
                      <button
                        key={enterprise.id}
                        onClick={() => {
                          setSelectedEnterprise(enterprise.id);
                        }}
                        className={`w-full flex items-center gap-4 p-5 rounded-[20px] border-2 transition-all text-left group ${
                          selectedEnterprise === enterprise.id 
                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                            : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-3 rounded-xl transition-colors ${
                          selectedEnterprise === enterprise.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                        }`}>
                          <Building2 size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg whitespace-nowrap">{enterprise.name}</h4>
                          </div>
                          <span className={`text-sm font-medium whitespace-nowrap ${
                            enterprise.status === '已加入' ? 'text-emerald-500' : 'text-orange-500'
                          }`}>
                            {enterprise.status}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2 mb-2">
                    {!showOnlyDefault && selectionTab === 'enterprise' && (
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={rememberDefault}
                          onChange={(e) => setRememberDefault(e.target.checked)}
                          className="size-5 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors whitespace-nowrap">
                          下次默认登录此企业
                        </span>
                      </label>
                    )}

                    {showOnlyDefault && (
                      <button 
                        onClick={() => {
                          setShowOnlyDefault(false);
                          setSelectedEnterprise(null);
                        }}
                        className="text-sm text-primary font-bold hover:underline whitespace-nowrap"
                      >
                        切换企业
                      </button>
                    )}
                  </div>

                  <button 
                    onClick={handleFinalLogin}
                    disabled={!selectedEnterprise}
                    className="w-full py-5 bg-primary text-white rounded-[20px] font-bold text-xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    确认进入
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </button>
                  <button 
                    onClick={() => setView('login')}
                    className="w-full py-5 bg-white border-2 border-slate-100 text-slate-500 rounded-[20px] font-bold text-xl hover:bg-slate-50 hover:border-slate-200 transition-all"
                  >
                    返回登录
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
