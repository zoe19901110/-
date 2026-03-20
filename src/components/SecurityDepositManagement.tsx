import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Wallet, 
  Calendar, 
  Building2, 
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Upload,
  RefreshCcw,
  FileText,
  History,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecurityDepositManagementProps {
  currentEnterprise?: { id: string; name: string };
}

const SecurityDepositManagement: React.FC<SecurityDepositManagementProps> = ({ currentEnterprise }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);

  const [deposits, setDeposits] = useState<any[]>([]);

  React.useEffect(() => {
    const enterprisePrefix = currentEnterprise ? `[${currentEnterprise.name}] ` : '';
    setDeposits([
      {
        id: 'DEP-2024-001',
        projectName: `${enterprisePrefix}2024年智慧交通管理平台建设项目`,
        amount: '¥50,000.00',
        type: '现金转账',
        bank: '中国工商银行',
        status: '已缴纳',
        date: '2024-03-10',
        refundStatus: '待退还',
        voucher: '凭证_001.jpg'
      },
      {
        id: 'DEP-2024-002',
        projectName: `${enterprisePrefix}政务云扩容采购项目`,
        amount: '¥30,000.00',
        type: '银行保函',
        bank: '建设银行',
        status: '已缴纳',
        date: '2024-02-15',
        refundStatus: '已退还',
        voucher: '保函_002.pdf'
      },
      {
        id: 'DEP-2024-003',
        projectName: `${enterprisePrefix}城市绿化带自动灌溉系统`,
        amount: '¥15,000.00',
        type: '现金转账',
        bank: '农业银行',
        status: '已缴纳',
        date: '2024-03-05',
        refundStatus: '待退还',
        voucher: '凭证_003.png'
      },
      {
        id: 'DEP-2024-004',
        projectName: `${enterprisePrefix}XX区智慧教育云平台二期`,
        amount: '¥80,000.00',
        type: '银行保函',
        bank: '招商银行',
        status: '已缴纳',
        date: '2024-03-12',
        refundStatus: '待退还',
        voucher: '保函_004.pdf'
      },
      {
        id: 'DEP-2024-005',
        projectName: `${enterprisePrefix}社区养老服务中心智能化改造`,
        amount: '¥20,000.00',
        type: '现金转账',
        bank: '中国银行',
        status: '已缴纳',
        date: '2024-01-20',
        refundStatus: '已退还',
        voucher: '凭证_005.jpg'
      }
    ]);
  }, [currentEnterprise]);

  const handleOpenRefund = (deposit: any) => {
    setSelectedDeposit(deposit);
    setShowRefundModal(true);
  };

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
          缴纳保证金
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">累计缴纳金额</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">¥1,250,000.00</h3>
          <p className="text-xs text-slate-400 mt-2">较上月 +12.5%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">待退还金额</span>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">¥450,000.00</h3>
          <p className="text-xs text-slate-400 mt-2">涉及 8 个项目</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">已退还金额</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowDownLeft size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">¥800,000.00</h3>
          <p className="text-xs text-slate-400 mt-2">退还率 64%</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-8">
        <div className="w-56 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="搜索项目名称、银行、单号..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all">
            查询
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} /> 重置
          </button>
        </div>
      </div>

      {/* Deposit Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">单号/项目</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">金额/方式</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">缴纳银行/日期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deposits.map((deposit) => (
              <tr key={deposit.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-primary mb-1">{deposit.id}</p>
                  <p className="font-bold text-slate-900 group-hover:text-primary transition-colors max-w-xs truncate">{deposit.projectName}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-700">{deposit.amount}</p>
                    <p className="text-xs text-slate-400">{deposit.type}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building2 size={14} className="text-slate-400" />
                      {deposit.bank}
                    </div>
                    <p className="text-xs text-slate-400">{deposit.date}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 w-fit">
                      <CheckCircle2 size={10} />
                      {deposit.status}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit ${
                      deposit.refundStatus === '已退还' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {deposit.refundStatus === '已退还' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {deposit.refundStatus}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {deposit.refundStatus === '待退还' && (
                      <button 
                        onClick={() => handleOpenRefund(deposit)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors"
                      >
                        <RefreshCcw size={14} />
                        发起退款
                      </button>
                    )}
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
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
                className="bg-white rounded-3xl shadow-2xl w-full max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                      <Wallet size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">缴纳保证金</h3>
                  </div>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="p-10 flex-1 flex flex-col overflow-hidden">
                  <div className="space-y-8 flex-1 overflow-y-auto pr-4 custom-scrollbar flex flex-col">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">关联投标项目 <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm">
                          <option>请选择投标项目...</option>
                          <option>2024年智慧交通管理平台建设项目</option>
                          <option>政务云扩容采购项目</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">保证金金额 <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                          placeholder="¥ 0.00" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">缴纳方式 <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm">
                          <option>现金转账</option>
                          <option>银行保函</option>
                          <option>保险保函</option>
                        </select>
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">缴纳银行</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
                          placeholder="请输入银行名称" 
                        />
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">缴纳凭证上传</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group">
                          <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                            <Upload size={32} />
                          </div>
                          <p className="text-sm text-slate-600 font-bold">点击或拖拽缴纳凭证或保函扫描件至此处</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8 mt-auto shrink-0 sticky bottom-0 bg-white pb-2">
                      <button 
                        onClick={() => setShowAddModal(false)} 
                        className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                      >
                        确认提交
                      </button>
                      <button 
                        onClick={() => setShowAddModal(false)} 
                        className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Refund Modal */}
      {showRefundModal && selectedDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-orange-50/30">
              <div className="flex items-center gap-2">
                <RefreshCcw size={20} className="text-orange-600" />
                <h3 className="text-lg font-bold text-slate-900">发起退款申请</h3>
              </div>
              <button onClick={() => setShowRefundModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Plus size={20} className="rotate-45 text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Associated Record Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">关联缴纳记录</span>
                  <span className="text-xs font-bold text-primary">{selectedDeposit.id}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">{selectedDeposit.projectName}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Wallet size={12} /> {selectedDeposit.amount}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {selectedDeposit.date}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">退款申请说明</label>
                  <textarea className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-24 resize-none" placeholder="请输入退款原因，如：项目已结束、未中标等..."></textarea>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">退款凭证/申请表</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-orange-50/50 hover:border-orange-200 transition-all cursor-pointer group">
                    <Upload size={20} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                    <p className="text-[10px] text-slate-500 font-medium">上传退款申请表扫描件</p>
                  </div>
                </div>
              </div>

              {/* Process Tracking */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <History size={14} />
                  流程跟踪预览
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="size-4 rounded-full bg-primary flex items-center justify-center text-[8px] text-white">1</div>
                    <div className="w-0.5 h-4 bg-slate-200"></div>
                  </div>
                  <span className="text-xs text-slate-600 font-medium">提交申请 (当前)</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="flex flex-col items-center gap-1">
                    <div className="size-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] text-slate-500">2</div>
                    <div className="w-0.5 h-4 bg-slate-200"></div>
                  </div>
                  <span className="text-xs text-slate-500">财务审核</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="size-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] text-slate-500">3</div>
                  <span className="text-xs text-slate-500">退款完成</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowRefundModal(false)} className="flex-1 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">提交退款申请</button>
              <button onClick={() => setShowRefundModal(false)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">取消</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SecurityDepositManagement;
