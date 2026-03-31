import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, User, LogOut, Building2 } from 'lucide-react';

interface TopBarProps {
  setActiveTab: (tab: string) => void;
  enterprises: { id: string; name: string }[];
  currentEnterprise: { id: string; name: string };
  setCurrentEnterprise: (enterprise: { id: string; name: string }) => void;
  onLogout: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ setActiveTab, enterprises, currentEnterprise, setCurrentEnterprise, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEntSelect, setShowEntSelect] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setShowEntSelect(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-slate-900">
            {currentEnterprise.id === 'personal' ? (
              <User size={16} className="text-primary" />
            ) : (
              <Building2 size={16} className="text-primary" />
            )}
            {currentEnterprise.name}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold">陈经理</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold">超级管理员</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => {
                setShowDropdown(!showDropdown);
                setShowEntSelect(false);
              }}
              className="flex items-center gap-2"
            >
              <img 
                className="size-10 rounded-full object-cover border-2 border-primary/10" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
                alt="User avatar"
              />
              <ChevronDown size={16} className="text-slate-500" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-30">
                <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                  <img 
                    className="size-12 rounded-full object-cover border-2 border-primary/10" 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
                    alt="User avatar"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">陈经理</p>
                    <p className="text-xs text-slate-500">登录账号: 13800138000</p>
                  </div>
                </div>

                <div className="p-2 border-b border-slate-100">
                  <button
                    onClick={() => { setActiveTab('personal-center'); setShowDropdown(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md"
                  >
                    <User size={16} />
                    个人中心
                  </button>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">切换企业</p>
                    <button className="text-xs text-primary hover:underline font-medium">新增企业</button>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 overflow-hidden flex-1">
                        <div className="size-8 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0">
                          {currentEnterprise.id === 'personal' ? <User size={16} className="text-slate-400" /> : <Building2 size={16} className="text-slate-400" />}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 truncate">{currentEnterprise.name}</span>
                      </div>
                      <button 
                        onClick={() => setShowEntSelect(!showEntSelect)}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-primary hover:bg-primary/5 hover:border-primary/20 shadow-sm transition-all shrink-0"
                      >
                        切换
                      </button>
                    </div>

                    {showEntSelect && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-200 space-y-1 max-h-48 overflow-y-auto">
                        {enterprises.map((ent) => (
                          <button
                            key={ent.id}
                            onClick={() => {
                              setCurrentEnterprise(ent);
                              setShowEntSelect(false);
                            }}
                            className={`flex items-center justify-between w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${ent.id === currentEnterprise.id ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 hover:bg-white'}`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {ent.id === 'personal' ? <User size={14} className="opacity-50" /> : <Building2 size={14} className="opacity-50" />}
                              <span className="truncate">{ent.name}</span>
                            </div>
                            {ent.id === currentEnterprise.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-100 p-2">
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut size={16} />
                    退出登录
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
