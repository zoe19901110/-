import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Trophy, 
  Frown, 
  Calendar, 
  Users, 
  DollarSign,
  CheckCircle2,
  Clock,
  FileText,
  BarChart3,
  X,
  ClipboardList,
  Receipt,
  Download,
  Edit3,
  Check,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TenderOpeningStatusManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal State
  const [isEditing, setIsEditing] = useState(true);
  const [openingRecords, setOpeningRecords] = useState([
    { units: '某某建设集团有限公司', price: '¥1,210.5万', rank: '1' },
    { units: '中建某局有限公司', price: '¥1,250.0万', rank: '2' },
    { units: '省建工集团', price: '¥1,280.0万', rank: '3' },
  ]);
  const [winningRecords, setWinningRecords] = useState([
    { unit: '某某建设集团有限公司', amount: '¥1,210.5万', date: '2024-03-25', url: 'http://ggzy.example.com/...' },
  ]);
  const [contractRecords, setContractRecords] = useState([
    { id: 'HT-2024-001', name: '城市基础设施施工合同', date: '2024-04-05', amount: '¥1,180.0万', owner: '陈经理', status: '履行中' },
  ]);

  const updateOpening = (index: number, field: string, value: string) => {
    const newRecords = [...openingRecords];
    (newRecords[index] as any)[field] = value;
    setOpeningRecords(newRecords);
  };

  const updateWinning = (index: number, field: string, value: string) => {
    const newRecords = [...winningRecords];
    (newRecords[index] as any)[field] = value;
    setWinningRecords(newRecords);
  };

  const updateContract = (index: number, field: string, value: string) => {
    const newRecords = [...contractRecords];
    (newRecords[index] as any)[field] = value;
    setContractRecords(newRecords);
  };

  const records = [
    {
      id: '1',
      projectName: '2024年智慧交通管理平台建设项目',
      openingDate: '2024-03-20',
      result: '中标',
      bidPrice: '¥4,450,000.00',
      competitors: 5,
      ranking: 1,
      remarks: '技术分第一，商务分第二'
    },
    {
      id: '2',
      projectName: '政务云扩容采购项目',
      openingDate: '2024-02-28',
      result: '未中标',
      bidPrice: '¥2,750,000.00',
      competitors: 8,
      ranking: 3,
      remarks: '价格偏高，技术方案获优'
    },
    {
      id: '3',
      projectName: 'XX市智慧医疗信息系统',
      openingDate: '2024-03-15',
      result: '中标',
      bidPrice: '¥8,200,000.00',
      competitors: 4,
      ranking: 1,
      remarks: '方案优势明显，价格适中'
    },
    {
      id: '4',
      projectName: '工业园区污水处理自动化改造',
      openingDate: '2024-03-05',
      result: '未中标',
      bidPrice: '¥1,500,000.00',
      competitors: 12,
      ranking: 5,
      remarks: '竞争激烈，价格分较低'
    },
    {
      id: '5',
      projectName: '省图书馆数字化二期工程',
      openingDate: '2024-01-25',
      result: '中标',
      bidPrice: '¥3,100,000.00',
      competitors: 3,
      ranking: 1,
      remarks: '唯一通过技术初审的单位'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} />
          新增开标记录
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '本月开标数', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '中标项目', value: '6', icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '中标率', value: '50%', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10' },
          { label: '平均竞争对手', value: '6.5', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`size-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-slate-500 text-xs font-medium mb-1">{stat.label}</p>
            <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索项目名称..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Filter size={16} />
          筛选
        </button>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">项目名称</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">开标日期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">结果</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">投标价</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">竞争对手/排名</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 group-hover:text-primary transition-colors max-w-xs truncate">{record.projectName}</p>
                  <p className="text-[10px] text-slate-400 mt-1 italic">{record.remarks}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {record.openingDate}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    record.result === '中标' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {record.result === '中标' ? <Trophy size={12} /> : <Frown size={12} />}
                    {record.result}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700">
                  {record.bidPrice}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-slate-600">{record.competitors} 家公司</p>
                    <p className="text-xs text-slate-400">排名: 第 {record.ranking} 名</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-[1000px] max-h-[90vh] flex flex-col overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                      <ClipboardList size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">新增开标记录</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                        isEditing ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isEditing ? <Check size={16} /> : <Edit3 size={16} />}
                      {isEditing ? '保存修改' : '修改记录'}
                    </button>
                    <button 
                      onClick={() => setShowAddModal(false)}
                      className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col overflow-hidden">
                  <div className="space-y-10 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                    {/* Project Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1 uppercase">关联项目</label>
                      <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm">
                        <option>请选择项目...</option>
                        <option>2024年智慧交通管理平台建设项目</option>
                        <option>政务云扩容采购项目</option>
                      </select>
                    </div>

                    {/* Opening Records Section */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                          <ClipboardList size={20} className="text-primary" />
                          <h4>开标记录</h4>
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => setOpeningRecords([...openingRecords, { units: '', price: '', rank: '' }])}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <Plus size={14} /> 添加行
                          </button>
                        )}
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                              <th className="px-6 py-4">参标单位</th>
                              <th className="px-6 py-4">投标报价</th>
                              <th className="px-6 py-4">排名</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {openingRecords.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.units} 
                                      onChange={(e) => updateOpening(i, 'units', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                                      placeholder="请输入参标单位"
                                    />
                                  ) : (
                                    <span className="text-sm text-slate-600">{row.units || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.price} 
                                      onChange={(e) => updateOpening(i, 'price', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-mono"
                                      placeholder="¥ 0.00"
                                    />
                                  ) : (
                                    <span className="font-mono text-sm text-primary font-bold">{row.price || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.rank} 
                                      onChange={(e) => updateOpening(i, 'rank', e.target.value)}
                                      className="w-16 border border-slate-200 rounded px-2 py-1 text-sm"
                                      placeholder="排名"
                                    />
                                  ) : (
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.rank === '1' ? 'bg-yellow-50 text-yellow-600' : 'bg-slate-100 text-slate-500'}`}>
                                      {row.rank ? `第${row.rank}名` : '--'}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* Winning Records Section */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                          <Trophy size={20} className="text-primary" />
                          <h4>中标记录</h4>
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => setWinningRecords([...winningRecords, { unit: '', amount: '', date: '', url: '' }])}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <Plus size={14} /> 添加行
                          </button>
                        )}
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                              <th className="px-6 py-4">中标单位</th>
                              <th className="px-6 py-4">中标金额</th>
                              <th className="px-6 py-4">通知书日期</th>
                              <th className="px-6 py-4">公示链接</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {winningRecords.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.unit} 
                                      onChange={(e) => updateWinning(i, 'unit', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                                      placeholder="请输入中标单位"
                                    />
                                  ) : (
                                    <span className="font-bold text-slate-900 text-sm">{row.unit || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.amount} 
                                      onChange={(e) => updateWinning(i, 'amount', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-mono"
                                      placeholder="¥ 0.00"
                                    />
                                  ) : (
                                    <span className="font-mono text-sm text-green-600 font-bold">{row.amount || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      type="date"
                                      value={row.date} 
                                      onChange={(e) => updateWinning(i, 'date', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                                    />
                                  ) : (
                                    <span className="text-sm text-slate-600">{row.date || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.url} 
                                      onChange={(e) => updateWinning(i, 'url', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-primary"
                                      placeholder="http://..."
                                    />
                                  ) : (
                                    <a href={row.url} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                                      查看公示 <ArrowRight size={12} />
                                    </a>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* Contract Archiving Section */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                          <Receipt size={20} className="text-primary" />
                          <h4>合同归档</h4>
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => setContractRecords([...contractRecords, { id: '', name: '', date: '', amount: '', owner: '', status: '履行中' }])}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <Plus size={14} /> 添加行
                          </button>
                        )}
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                              <th className="px-6 py-4">合同编号/名称</th>
                              <th className="px-6 py-4">签署日期</th>
                              <th className="px-6 py-4">合同金额</th>
                              <th className="px-6 py-4">负责人</th>
                              <th className="px-6 py-4">履行状态</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {contractRecords.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <div className="space-y-1">
                                      <input 
                                        value={row.name} 
                                        onChange={(e) => updateContract(i, 'name', e.target.value)}
                                        placeholder="合同名称"
                                        className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-bold"
                                      />
                                      <input 
                                        value={row.id} 
                                        onChange={(e) => updateContract(i, 'id', e.target.value)}
                                        placeholder="合同编号"
                                        className="w-full border border-slate-200 rounded px-2 py-1 text-[10px]"
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-sm font-bold text-slate-900">{row.name || '--'}</p>
                                      <p className="text-[10px] text-slate-400">{row.id || '--'}</p>
                                    </>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      type="date"
                                      value={row.date} 
                                      onChange={(e) => updateContract(i, 'date', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                                    />
                                  ) : (
                                    <span className="text-sm text-slate-600">{row.date || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.amount} 
                                      onChange={(e) => updateContract(i, 'amount', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-mono font-bold"
                                      placeholder="¥ 0.00"
                                    />
                                  ) : (
                                    <span className="font-mono text-sm text-slate-900 font-bold">{row.amount || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <input 
                                      value={row.owner} 
                                      onChange={(e) => updateContract(i, 'owner', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                                      placeholder="负责人"
                                    />
                                  ) : (
                                    <span className="text-sm text-slate-600">{row.owner || '--'}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <select 
                                      value={row.status} 
                                      onChange={(e) => updateContract(i, 'status', e.target.value)}
                                      className="w-full border border-slate-200 rounded px-2 py-1 text-xs"
                                    >
                                      <option>履行中</option>
                                      <option>已完成</option>
                                      <option>已终止</option>
                                    </select>
                                  ) : (
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      row.status === '已完成' ? 'bg-green-50 text-green-600' : 
                                      row.status === '已终止' ? 'bg-red-50 text-red-600' : 
                                      'bg-blue-50 text-blue-600'
                                    }`}>
                                      {row.status}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>

                  <div className="flex gap-4 pt-8 shrink-0 bg-white">
                    <button 
                      onClick={() => setShowAddModal(false)} 
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                    >
                      提交归档
                    </button>
                    <button 
                      onClick={() => setShowAddModal(false)} 
                      className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      取消
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TenderOpeningStatusManagement;
