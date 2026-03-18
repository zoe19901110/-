import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Network, 
  Building2, 
  Lightbulb, 
  Briefcase,
  FileSearch,
  BrainCircuit,
  ShieldCheck,
  PlayCircle,
  Wallet, 
  Archive, 
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Layers
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: '首页', icon: LayoutDashboard },
    { id: 'business-dashboard', label: '业务仪表盘', icon: BarChart3 },
    { id: 'org', label: '组织架构', icon: Network },
    { id: 'enterprise', label: '企业信息', icon: Building2 },
  ];

  const businessItems = [
    { id: 'leads', label: '商机线索', icon: Lightbulb },
    { id: 'project-registration', label: '投标项目登记', icon: Briefcase },
    { id: 'parsing', label: '招标文件解析', icon: FileSearch },
    { id: 'ai-prep', label: 'AI编标', icon: BrainCircuit },
    { id: 'inspection', label: '标书检查', icon: ShieldCheck },
    { id: 'simulation', label: '模拟开标', icon: PlayCircle },
    { id: 'deposit-management', label: '保证金管理', icon: Wallet },
    { id: 'opening-management', label: '投标/开标情况管理', icon: Archive },
    { id: 'other-materials', label: '项目其他材料', icon: FileText },
  ];

  // Auto-open business menu if a sub-item is active
  useEffect(() => {
    if (businessItems.some(item => item.id === activeTab)) {
      setIsBusinessOpen(true);
    }
  }, [activeTab]);

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
          <Archive size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-none tracking-tight">投标管理系统</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTab === item.id ? 'sidebar-item-active shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon size={18} />
            <span className="text-sm font-bold">{item.label}</span>
          </button>
        ))}

        <div className="pt-2">
          <button
            onClick={() => setIsBusinessOpen(!isBusinessOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
              businessItems.some(item => item.id === activeTab) 
                ? 'text-primary bg-primary/5' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers size={18} />
              <span className="text-sm font-bold">业务管理</span>
            </div>
            {isBusinessOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          <AnimatePresence>
            {isBusinessOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-1 ml-2 pl-3 border-l border-slate-100 space-y-1 py-1">
                  {businessItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all ${
                        activeTab === item.id 
                          ? 'text-primary bg-primary/5 font-bold' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      }`}
                    >
                      <item.icon size={14} className="shrink-0" />
                      <span className="text-[12px] font-medium whitespace-nowrap">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'settings' ? 'sidebar-item-active shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Settings size={18} />
          <span className="text-sm font-bold">系统设置</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
