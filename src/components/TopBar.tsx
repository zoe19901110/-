import React from 'react';
import { Search, Bell } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
          placeholder="搜索项目、文件或成员..." 
          type="text"
        />
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
            <p className="text-[10px] text-slate-500 uppercase font-bold">项目总监</p>
          </div>
          <img 
            className="size-10 rounded-full object-cover border-2 border-primary/10" 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
