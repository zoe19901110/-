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
  ExternalLink,
  Paperclip,
  File,
  Image as ImageIcon,
  Trash2,
  Upload,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TenderOpeningStatusManagementProps {
  currentEnterprise?: { id: string; name: string };
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image';
  date: string;
}

const TenderOpeningStatusManagement: React.FC<TenderOpeningStatusManagementProps> = ({ currentEnterprise }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Modal State
  const [isEditing, setIsEditing] = useState(true);
  const [openingRecords, setOpeningRecords] = useState([
    { units: '某某建设集团有限公司', price: '¥1,210.5万', rank: '1', isWinner: true, isSelf: false },
    { units: '中建某局有限公司', price: '¥1,250.0万', rank: '2', isWinner: false, isSelf: false },
    { units: '省建工集团', price: '¥1,280.0万', rank: '3', isWinner: false, isSelf: false },
  ]);
  const [winningRecords, setWinningRecords] = useState([
    { unit: '某某建设集团有限公司', amount: '¥1,210.5万', date: '2024-03-25', url: 'http://ggzy.example.com/...' },
  ]);
  const [contractRecords, setContractRecords] = useState([
    { id: 'HT-2024-001', name: '城市基础设施施工合同', date: '2024-04-05', amount: '¥1,180.0万', owner: '陈经理', status: '履行中' },
  ]);
  const [contractAttachments, setContractAttachments] = useState<Attachment[]>([
    { id: '1', name: '中标通知书.pdf', size: '1.2MB', type: 'pdf', date: '2024-03-25' },
    { id: '2', name: '施工合同扫描件.jpg', size: '2.4MB', type: 'image', date: '2024-04-05' },
  ]);

  const updateOpening = (index: number, field: string, value: any) => {
    const newRecords = [...openingRecords];
    (newRecords[index] as any)[field] = value;
    
    // If marking as winner, unmark others (assuming single winner)
    if (field === 'isWinner' && value === true) {
      newRecords.forEach((r, i) => {
        if (i !== index) r.isWinner = false;
      });
      // Sync to winning records
      setWinningRecords([{
        unit: newRecords[index].units,
        amount: newRecords[index].price,
        date: winningRecords[0]?.date || '',
        url: winningRecords[0]?.url || ''
      }]);
    } else if (field === 'isWinner' && value === false) {
      // If unmarking the winner, clear winning records
      setWinningRecords([]);
    } else if (newRecords[index].isWinner && (field === 'units' || field === 'price')) {
      // If updating the name or price of the current winner, sync to winning records
      setWinningRecords([{
        unit: newRecords[index].units,
        amount: newRecords[index].price,
        date: winningRecords[0]?.date || '',
        url: winningRecords[0]?.url || ''
      }]);
    }
    
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

  const handleExport = () => {
    // Mock export functionality
    const data = {
      opening: openingRecords,
      winning: winningRecords,
      contract: contractRecords,
      attachments: contractAttachments
    };
    console.log('Exporting data:', data);
    alert('详情数据已准备好导出（包含附件列表，模拟导出成功）');
  };

  const [records, setRecords] = useState<any[]>([]);

  React.useEffect(() => {
    setRecords([
      {
        id: '1',
        projectName: `2024年智慧交通管理平台建设项目`,
        openingDate: '2024-03-20',
        result: '中标',
        bidPrice: '¥4,450,000.00',
        competitors: 5,
        ranking: 1,
        remarks: '技术分第一，商务分第二'
      },
      {
        id: '2',
        projectName: `政务云扩容采购项目`,
        openingDate: '2024-02-28',
        result: '未中标',
        bidPrice: '¥2,750,000.00',
        competitors: 8,
        ranking: 3,
        remarks: '价格偏高，技术方案获优'
      },
      {
        id: '3',
        projectName: `XX市智慧医疗信息系统`,
        openingDate: '2024-03-15',
        result: '中标',
        bidPrice: '¥8,200,000.00',
        competitors: 4,
        ranking: 1,
        remarks: '方案优势明显，价格适中'
      },
      {
        id: '4',
        projectName: `工业园区污水处理自动化改造`,
        openingDate: '2024-03-05',
        result: '未中标',
        bidPrice: '¥1,500,000.00',
        competitors: 12,
        ranking: 5,
        remarks: '竞争激烈，价格分较低'
      },
      {
        id: '5',
        projectName: `省图书馆数字化二期工程`,
        openingDate: '2024-01-25',
        result: '中标',
        bidPrice: '¥3,100,000.00',
        competitors: 3,
        ranking: 1,
        remarks: '唯一通过技术初审的单位'
      }
    ]);
  }, [currentEnterprise]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
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
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-8">
        <div className="w-56 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="搜索项目名称..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button className="px-8 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 shadow-sm hover:shadow-md transition-all">
            查询
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} /> 重置
          </button>
        </div>
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
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">单位数量</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr 
                key={record.id} 
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 group-hover:text-primary transition-colors text-sm">{record.projectName}</p>
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
                    <p className="text-sm text-slate-600">{record.competitors} 家单位</p>
                    <p className="text-xs text-slate-400">排名: 第 {record.ranking} 名</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => {
                      setIsEditing(true);
                      setShowAddModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/10"
                  >
                    <Edit3 size={14} />
                    登记/详情
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
                    <h3 className="text-xl font-bold text-slate-900">投标/开标情况管理详情</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleExport}
                      className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-all flex items-center gap-2"
                    >
                      <Download size={16} />
                      导出详情
                    </button>
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
                    {/* Project Info Display */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">关联项目</p>
                          <p className="text-sm font-bold text-slate-900">2024年智慧交通管理平台建设项目</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">开标日期</p>
                          <p className="text-sm font-bold text-slate-900">2024-03-20</p>
                        </div>
                      </div>
                    </div>

                    {/* Opening & Winning Records Section */}
                    <section className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                          <Trophy size={20} className="text-primary" />
                          <h4 className="text-lg">开标与中标记录</h4>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <ClipboardList size={16} className="text-slate-400" />
                            开标详情
                          </h5>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                                <th className="px-6 py-4">参标单位</th>
                                <th className="px-6 py-4">投标报价</th>
                                <th className="px-6 py-4">排名</th>
                                <th className="px-6 py-4 text-center">是否中标</th>
                                <th className="px-6 py-4 text-center">是否本单位</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {openingRecords.map((row, i) => (
                                <tr key={i} className={`hover:bg-slate-50/50 transition-colors ${row.isWinner ? 'bg-emerald-50/30' : ''}`}>
                                  <td className="px-6 py-4">
                                    {isEditing ? (
                                      <input 
                                        value={row.units} 
                                        onChange={(e) => updateOpening(i, 'units', e.target.value)}
                                        className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                                        placeholder="请输入参标单位"
                                      />
                                    ) : (
                                      <span className={`text-sm font-bold ${row.isWinner ? 'text-emerald-700' : 'text-slate-600'}`}>
                                        {row.units || '--'}
                                        {row.isSelf && <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px]">本单位</span>}
                                      </span>
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
                                  <td className="px-6 py-4 text-center">
                                    {isEditing ? (
                                      <input 
                                        type="checkbox"
                                        checked={row.isWinner}
                                        onChange={(e) => updateOpening(i, 'isWinner', e.target.checked)}
                                        className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                                      />
                                    ) : (
                                      row.isWinner && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold">中标单位</span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    {isEditing ? (
                                      <input 
                                        type="checkbox"
                                        checked={row.isSelf}
                                        onChange={(e) => updateOpening(i, 'isSelf', e.target.checked)}
                                        className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                      />
                                    ) : (
                                      row.isSelf && <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold">是</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {isEditing && (
                          <div className="flex justify-end">
                            <button 
                              onClick={() => setOpeningRecords([...openingRecords, { units: '', price: '', rank: '', isWinner: false, isSelf: false }])}
                              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                            >
                              <Plus size={14} /> 添加参标单位
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <Trophy size={16} className="text-emerald-500" />
                          中标详情
                        </h5>
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
                        {isEditing && (
                          <div className="flex justify-end">
                            <button 
                              onClick={() => setWinningRecords([...winningRecords, { unit: '', amount: '', date: '', url: '' }])}
                              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                            >
                              <Plus size={14} /> 添加中标单位
                            </button>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Contract Archiving Section */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                          <Receipt size={20} className="text-primary" />
                          <h4 className="text-lg">合同归档</h4>
                        </div>
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
                      {isEditing && (
                        <div className="flex justify-end">
                          <button 
                            onClick={() => setContractRecords([...contractRecords, { id: '', name: '', date: '', amount: '', owner: '', status: '履行中' }])}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <Plus size={14} /> 添加合同
                          </button>
                        </div>
                      )}
                    </section>

                    {/* Contract Attachments Section */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                          <Paperclip size={20} className="text-primary" />
                          <h4 className="text-lg">合同附件</h4>
                        </div>
                        {isEditing && (
                          <div className="relative">
                            <input 
                              type="file" 
                              multiple 
                              accept=".pdf,image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files) {
                                  const newAttachments: Attachment[] = Array.from(files).map((file, idx) => {
                                    const f = file as File;
                                    return {
                                      id: Date.now() + idx + '',
                                      name: f.name,
                                      size: (f.size / 1024 / 1024).toFixed(1) + 'MB',
                                      type: f.type.includes('pdf') ? 'pdf' : 'image',
                                      date: new Date().toISOString().split('T')[0]
                                    };
                                  });
                                  setContractAttachments([...contractAttachments, ...newAttachments]);
                                }
                              }}
                            />
                            <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-2">
                              <Upload size={14} /> 上传附件
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contractAttachments.map((file) => (
                          <div 
                            key={file.id} 
                            className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${
                                file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                              }`}>
                                {file.type === 'pdf' ? <File size={20} /> : <ImageIcon size={20} />}
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 truncate" title={file.name}>{file.name}</p>
                                <p className="text-[10px] text-slate-400 flex items-center gap-2">
                                  <span>{file.size}</span>
                                  <span className="size-1 bg-slate-200 rounded-full" />
                                  <span>{file.date}</span>
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={() => setPreviewImage('https://picsum.photos/seed/contract/800/1200')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all"
                              >
                                <Eye size={14} />
                                查看
                              </button>
                              <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all">
                                <Download size={16} />
                              </button>
                              {isEditing && (
                                <button 
                                  onClick={() => setContractAttachments(contractAttachments.filter(a => a.id !== file.id))}
                                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        {contractAttachments.length === 0 && (
                          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                            <Paperclip size={32} className="text-slate-300 mb-3" />
                            <p className="text-sm text-slate-400">暂无附件</p>
                            {isEditing && <p className="text-[10px] text-slate-400 mt-1">点击右上角按钮上传合同附件</p>}
                          </div>
                        )}
                      </div>
                    </section>
                  </div>

                  <div className="flex gap-4 pt-8 shrink-0 bg-white">
                    <button 
                      onClick={() => setShowAddModal(false)} 
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                    >
                      保存
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

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={previewImage} 
                alt="Attachment Preview" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X size={32} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TenderOpeningStatusManagement;
