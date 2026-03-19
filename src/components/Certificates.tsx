import React from 'react';
import { Search, Plus, Download, FileText, ShieldCheck, Calendar, Filter, Edit2, Trash2 } from 'lucide-react';

const Certificates: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索证照名称、编号..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all">
            <Plus size={18} /> 新增证照
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} /> 筛选
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">总证照数</p>
          <p className="text-2xl font-bold text-slate-900">42</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">即将到期 (30天内)</p>
          <p className="text-2xl font-bold text-amber-500">3</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">已过期</p>
          <p className="text-2xl font-bold text-rose-500">1</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">待年检</p>
          <p className="text-2xl font-bold text-blue-500">5</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">证照名称</th>
                <th className="px-6 py-4">证照编号</th>
                <th className="px-6 py-4">颁发机构</th>
                <th className="px-6 py-4">有效期至</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: '营业执照', code: '91110000100001234X', org: '北京市市场监督管理局', date: '长期', status: '正常' },
                { name: '建筑业企业资质证书', code: 'D211060800', org: '住房和城乡建设部', date: '2028-05-20', status: '正常' },
                { name: '安全生产许可证', code: '(京)JZ安许证字[2021]000123', org: '北京市住房和城乡建设委员会', date: '2024-04-15', status: 'warning' },
                { name: '质量管理体系认证', code: '00121Q31000123', org: '中国质量认证中心', date: '2024-03-01', status: 'expired' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{item.code}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.org}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.status === '正常' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      item.status === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {item.status === '正常' ? '正常' : item.status === 'warning' ? '即将到期' : '已过期'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-slate-400 hover:text-primary transition-colors" title="下载"><Download size={16} /></button>
                      <button className="text-slate-400 hover:text-primary transition-colors" title="编辑"><Edit2 size={16} /></button>
                      <button className="text-slate-400 hover:text-rose-500 transition-colors" title="删除"><Trash2 size={16} /></button>
                      <button className="text-primary text-xs font-bold hover:underline">查看</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
