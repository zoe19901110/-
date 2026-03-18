import React from 'react';
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
  Settings 
} from 'lucide-react';

import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
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

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === item.id ? 'sidebar-item-active' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}

        <div className="pt-6">
          <p className="px-3 text-base font-bold text-slate-900 mb-4">业务管理</p>
          <div className="space-y-1">
            {businessItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id ? 'sidebar-item-active' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            activeTab === 'settings' ? 'sidebar-item-active' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Settings size={20} />
          <span className="text-sm font-medium">系统设置</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
