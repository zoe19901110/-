import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Plus, FileText, Clock, Briefcase, Search, Filter, Download, Wallet, Tag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';

const statsData = [
  { label: '项目数', value: '7', unit: '个' },
  { label: '投标数', value: '14', unit: '个' },
  { label: '投标保证金/元', value: '450,000.00', unit: '元' },
  { label: '待退还投标保证金/元', value: '100,000.00', unit: '元' },
  { label: '已退还投标保证金/元', value: '350,000.00', unit: '元' },
];

const statusDistribution = [
  { name: '未中标', value: 3, percentage: '21%', color: '#3b82f6' },
  { name: '准备中', value: 6, percentage: '43%', color: '#10b981' },
  { name: '投标中', value: 4, percentage: '29%', color: '#f59e0b' },
  { name: '已中标', value: 1, percentage: '7%', color: '#ef4444' },
];

const trendData = [
  { name: '2025-12', count: 10 },
  { name: '2026-01', count: 5 },
  { name: '2026-02', count: 3 },
  { name: '2026-03', count: 2 },
];

interface BusinessDashboardProps {
  currentEnterprise: { id: string; name: string };
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ currentEnterprise }) => {
  const generateStatsData = (enterpriseName: string) => {
    // Generate some deterministic but dynamic-looking data based on the enterprise name length
    const seed = enterpriseName.length;
    return [
      { label: '项目数', value: (seed * 3).toString(), unit: '个' },
      { label: '投标数', value: (seed * 5).toString(), unit: '个' },
      { label: '投标保证金/元', value: (seed * 150000).toFixed(2), unit: '元' },
      { label: '待退还投标保证金/元', value: (seed * 50000).toFixed(2), unit: '元' },
      { label: '已退还投标保证金/元', value: (seed * 100000).toFixed(2), unit: '元' },
    ];
  };

  const generateStatusDistribution = (enterpriseName: string) => {
    const seed = enterpriseName.length;
    return [
      { name: '未中标', value: seed, percentage: '20%', color: '#3b82f6' },
      { name: '准备中', value: seed * 2, percentage: '40%', color: '#10b981' },
      { name: '投标中', value: seed, percentage: '20%', color: '#f59e0b' },
      { name: '已中标', value: seed, percentage: '20%', color: '#ef4444' },
    ];
  };

  const generateBidDetails = (enterpriseName: string) => {
    return [
      {
        status: '投标中',
        projectNo: 'XM-0004',
        projectName: `${enterpriseName}轨道交通信号升级`,
        customerName: '辛辛',
        manager: 'Admin',
        hasFile: true,
        deadline: '2026-03-20',
        type: '公开招标',
        progress: 65
      },
      {
        status: '投标中',
        projectNo: 'XM-0002',
        projectName: `${enterpriseName}城建投资有限公司项目`,
        customerName: '辛辛',
        manager: 'Admin',
        hasFile: true,
        deadline: '2026-03-25',
        type: '公开招标',
        progress: 40
      },
      {
        status: '已中标',
        projectNo: 'XM-0002',
        projectName: `${enterpriseName}城建投资有限公司项目`,
        customerName: '辛辛',
        manager: 'Admin',
        hasFile: true,
        deadline: '2026-01-07',
        type: '公开招标',
        progress: 100
      },
      {
        status: '准备中',
        projectNo: 'XM-0002',
        projectName: `${enterpriseName}城建投资有限公司项目`,
        customerName: '辛辛',
        manager: 'Admin',
        hasFile: true,
        deadline: '2026-04-07',
        type: '公开招标',
        progress: 20
      },
      {
        status: '未中标',
        projectNo: 'XM-0005',
        projectName: `${enterpriseName}滨海新区景观工程`,
        customerName: '辛辛',
        manager: 'Admin',
        hasFile: true,
        deadline: '2025-12-15',
        type: '公开招标',
        progress: 100
      }
    ];
  };

  const statsData = generateStatsData(currentEnterprise.name);
  const statusDistribution = generateStatusDistribution(currentEnterprise.name);
  const bidDetails = generateBidDetails(currentEnterprise.name);
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">业务仪表盘 ({currentEnterprise.name})</h2>
          <p className="text-slate-500 text-sm mt-1">投标业务数据概览与分析</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statsData.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-500 text-xs mb-2">{stat.label}</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              <span className="text-sm font-bold text-slate-900">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Alerts & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Clock size={18} className="text-orange-500" />
              临期风险预警 (7天内)
            </h4>
          </div>
          <div className="space-y-3">
            {[
              { name: '轨道交通信号升级', deadline: '2026-03-20', days: 3, type: '投标报名截止' },
              { name: '城建投资有限公司项目', deadline: '2026-03-22', days: 5, type: '保证金缴纳截止' },
              { name: '滨海新区景观工程', deadline: '2026-03-24', days: 7, type: '招标文件领取截止' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-orange-200 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className={`size-1.5 rounded-full ${alert.days <= 3 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`} />
                    <span className="text-xs font-bold text-slate-700">{alert.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 ml-3.5">{alert.type}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-500">截止: {alert.deadline}</span>
                  <span className={`text-[10px] font-bold ${alert.days <= 3 ? 'text-red-500' : 'text-orange-600'}`}>
                    剩余 {alert.days} 天
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center text-center">
          <p className="text-slate-500 text-xs mb-2">综合投标成功率</p>
          <div className="text-4xl font-black text-emerald-600 mb-1">42.8%</div>
          <div className="flex items-center justify-center gap-1 text-emerald-500 text-[10px] font-bold">
            <TrendingUp size={12} />
            较上月提升 5.2%
          </div>
        </div>
      </div>

      {/* Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-700 mb-6">投标状态分布</h4>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">14</span>
              <span className="text-xs text-slate-400">总数</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px]">
                <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-500">{item.name} {item.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-700 mb-6">投标数趋势</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10}} 
                  domain={[0, 12]}
                  ticks={[0, 3, 6, 9, 12]}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorTrend)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700">投标明细</h4>
          <button className="flex items-center gap-2 text-primary text-sm font-bold hover:opacity-80">
            <Download size={16} />
            导出
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">投标状态</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">项目编号</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">项目名称</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">客户名称</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">投标负责人</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">项目进度</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">招标文件</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">招标形式</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bidDetails.map((bid, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      bid.status === '投标中' ? 'bg-orange-50 text-orange-600' :
                      bid.status === '已中标' ? 'bg-emerald-50 text-emerald-600' :
                      bid.status === '准备中' ? 'bg-blue-50 text-blue-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{bid.projectNo}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-700">{bid.projectName}</td>
                  <td className="px-6 py-4 text-xs text-slate-700">{bid.customerName}</td>
                  <td className="px-6 py-4 text-xs text-primary font-medium">{bid.manager}</td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-400">{bid.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            bid.status === '已中标' ? 'bg-emerald-500' :
                            bid.status === '未中标' ? 'bg-slate-400' :
                            'bg-primary'
                          }`}
                          style={{ width: `${bid.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {bid.hasFile && <FileText size={14} className="text-primary mx-auto cursor-pointer" />}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">
                      {bid.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessDashboard;
