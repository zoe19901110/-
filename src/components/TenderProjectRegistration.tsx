import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Briefcase, 
  Calendar, 
  User, 
  DollarSign,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Building2,
  FileText,
  Tag,
  X,
  Loader2,
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TenderProjectRegistrationProps {
  onEnterWorkbench?: (stage: string, data?: any) => void;
  currentEnterprise?: { id: string; name: string };
}

const TenderProjectRegistration: React.FC<TenderProjectRegistrationProps> = ({ onEnterWorkbench, currentEnterprise }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isTenderUploaded, setIsTenderUploaded] = useState(false);
  const [analyzedData, setAnalyzedData] = useState({
    strategy: '',
    purchaseAmount: '',
    purchaseDate: '',
    projectName: '',
    projectNumber: '',
    tenderer: '',
    tendererContact: '',
    tenderAgent: '',
    tenderAgentContact: '',
    openingTime: '',
    depositDeadline: '',
    openingLocation: '',
    depositAmount: '',
    collectionTime: '',
    tenderRequirements: '',
    otherRemarks: ''
  });

  const handleFileUpload = () => {
    setIsAnalyzing(true);
    // Simulate AI Analysis
    setTimeout(() => {
      setAnalyzedData({
        projectName: '2024年XX市智慧交通管理平台建设项目',
        projectNumber: 'T2024-ZHJT-001',
        tenderer: 'XX市交通运输局',
        tendererContact: '张工 010-88888888',
        tenderAgent: 'XX招标代理有限公司',
        tenderAgentContact: '李经理 010-66666666',
        openingTime: '2024-01-15T09:30',
        depositDeadline: '2024-01-12T17:00',
        openingLocation: 'XX市公共资源交易中心 301 会议室',
        depositAmount: '¥ 500,000.00',
        collectionTime: '2023-12-25',
        tenderRequirements: '1. 资质要求：具备市政公用工程施工总承包一级及以上资质；\n2. 业绩要求：近三年内具有类似智慧交通项目业绩；\n3. 技术要求：支持国产化适配。',
        otherRemarks: '',
        strategy: '',
        purchaseAmount: '',
        purchaseDate: ''
      });
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      setIsTenderUploaded(true);
    }, 2500);
  };

  const handleDataChange = (field: keyof typeof analyzedData, value: string) => {
    setAnalyzedData({ ...analyzedData, [field]: value });
  };

  const resetAddModal = () => {
    setShowAddModal(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(false);
      setIsTenderUploaded(false);
      setIsEditing(false);
      setEditingId(null);
      setAnalyzedData({
        projectName: '',
        projectNumber: '',
        tenderer: '',
        tendererContact: '',
        tenderAgent: '',
        tenderAgentContact: '',
        openingTime: '',
        depositDeadline: '',
        openingLocation: '',
        depositAmount: '',
        collectionTime: '',
        tenderRequirements: '',
        otherRemarks: '',
        strategy: '',
        purchaseAmount: '',
        purchaseDate: ''
      });
    }, 300);
  };
  const [statusFilter, setStatusFilter] = useState('全部');
  const [dateFilter, setDateFilter] = useState('');

  const enterprisePrefix = currentEnterprise?.name ? `[${currentEnterprise.name}] ` : '';

  const [projects, setProjects] = useState([
    {
      id: '1',
      name: `${enterprisePrefix}2024年智慧交通管理平台建设项目`,
      code: 'ZB-2024-001',
      tenderer: 'XX市交通运输局',
      agent: 'XX招标代理有限公司',
      tendererContact: '张工 010-88888888',
      agentContact: '李经理 010-66666666',
      bidOpeningTime: '2024-05-20 10:00',
      status: '进行中',
      deposit: '¥50,000',
      depositDeadline: '2024-05-15 17:00',
      openingLocation: 'XX市公共资源交易中心 301 会议室',
      collectionTime: '2024-04-15',
      requirements: '关键招标要求、资质要求等...',
      strategy: '投标策略、定价策略等...',
      purchaseAmount: '¥500',
      purchaseDate: '2024-04-10',
      otherRemarks: ''
    },
    {
      id: '2',
      name: `${enterprisePrefix}政务云扩容采购项目`,
      code: 'ZB-2024-005',
      tenderer: 'XX市大数据局',
      agent: 'YY咨询管理公司',
      tendererContact: '王工 010-77777777',
      agentContact: '赵经理 010-55555555',
      bidOpeningTime: '2024-06-15 14:30',
      status: '已完成',
      deposit: '¥30,000',
      depositDeadline: '2024-06-10 17:00',
      openingLocation: 'XX省政务中心 2楼',
      collectionTime: '2024-05-10',
      requirements: '政务云相关资质要求...',
      strategy: '高性价比策略...',
      purchaseAmount: '¥300',
      purchaseDate: '2024-05-05',
      otherRemarks: ''
    },
    {
      id: '3',
      name: `${enterprisePrefix}城市绿化带自动灌溉系统`,
      code: 'ZB-2024-008',
      tenderer: 'XX市园林局',
      agent: 'ZZ工程咨询公司',
      tendererContact: '刘工 010-99999999',
      agentContact: '孙经理 010-44444444',
      bidOpeningTime: '2024-07-10 09:00',
      status: '进行中',
      deposit: '¥20,000',
      depositDeadline: '2024-07-05 17:00',
      openingLocation: 'XX市园林局 5楼会议室',
      collectionTime: '2024-06-01',
      requirements: '自动化灌溉系统技术指标...',
      strategy: '技术领先策略...',
      purchaseAmount: '¥200',
      purchaseDate: '2024-05-20',
      otherRemarks: ''
    },
    {
      id: '4',
      name: `${enterprisePrefix}XX区智慧教育云平台二期`,
      code: 'ZB-2024-012',
      tenderer: 'XX区教育局',
      agent: 'AA招标代理公司',
      tendererContact: '陈工 010-11111111',
      agentContact: '周经理 010-22222222',
      bidOpeningTime: '2024-08-05 15:00',
      status: '进行中',
      deposit: '¥80,000',
      depositDeadline: '2024-08-01 17:00',
      openingLocation: 'XX区教育局 1楼大厅',
      collectionTime: '2024-07-01',
      requirements: '教育云平台二期扩容需求...',
      strategy: '综合实力展示...',
      purchaseAmount: '¥800',
      purchaseDate: '2024-06-15',
      otherRemarks: ''
    },
    {
      id: '5',
      name: `${enterprisePrefix}社区养老服务中心智能化改造`,
      code: 'ZB-2024-015',
      tenderer: 'XX市民政局',
      agent: 'BB项目管理公司',
      tendererContact: '黄工 010-33333333',
      agentContact: '吴经理 010-44444444',
      bidOpeningTime: '2024-09-25 10:30',
      status: '进行中',
      deposit: '¥15,000',
      depositDeadline: '2024-09-20 17:00',
      openingLocation: 'XX市民政局 3楼',
      collectionTime: '2024-08-15',
      requirements: '适老化智能设备安装调试...',
      strategy: '服务品质优先...',
      purchaseAmount: '¥0',
      purchaseDate: '2024-08-01',
      otherRemarks: ''
    }
  ]);

  React.useEffect(() => {
    setProjects([
      {
        id: '1',
        name: `${enterprisePrefix}2024年智慧交通管理平台建设项目`,
        code: 'ZB-2024-001',
        tenderer: 'XX市交通运输局',
        agent: 'XX招标代理有限公司',
        tendererContact: '张工 010-88888888',
        agentContact: '李经理 010-66666666',
        bidOpeningTime: '2024-05-20 10:00',
        status: '进行中',
        deposit: '¥50,000',
        depositDeadline: '2024-05-15 17:00',
        openingLocation: 'XX市公共资源交易中心 301 会议室',
        collectionTime: '2024-04-15',
        requirements: '关键招标要求、资质要求等...',
        strategy: '投标策略、定价策略等...',
        purchaseAmount: '¥500',
        purchaseDate: '2024-04-10',
        otherRemarks: ''
      },
      {
        id: '2',
        name: `${enterprisePrefix}政务云扩容采购项目`,
        code: 'ZB-2024-005',
        tenderer: 'XX市大数据局',
        agent: 'YY咨询管理公司',
        tendererContact: '王工 010-77777777',
        agentContact: '赵经理 010-55555555',
        bidOpeningTime: '2024-06-15 14:30',
        status: '已完成',
        deposit: '¥30,000',
        depositDeadline: '2024-06-10 17:00',
        openingLocation: 'XX省政务中心 2楼',
        collectionTime: '2024-05-10',
        requirements: '政务云相关资质要求...',
        strategy: '高性价比策略...',
        purchaseAmount: '¥300',
        purchaseDate: '2024-05-05',
        otherRemarks: ''
      },
      {
        id: '3',
        name: `${enterprisePrefix}城市绿化带自动灌溉系统`,
        code: 'ZB-2024-008',
        tenderer: 'XX市园林局',
        agent: 'ZZ工程咨询公司',
        tendererContact: '刘工 010-99999999',
        agentContact: '孙经理 010-44444444',
        bidOpeningTime: '2024-07-10 09:00',
        status: '进行中',
        deposit: '¥20,000',
        depositDeadline: '2024-07-05 17:00',
        openingLocation: 'XX市园林局 5楼会议室',
        collectionTime: '2024-06-01',
        requirements: '自动化灌溉系统技术指标...',
        strategy: '技术领先策略...',
        purchaseAmount: '¥200',
        purchaseDate: '2024-05-20',
        otherRemarks: ''
      },
      {
        id: '4',
        name: `${enterprisePrefix}XX区智慧教育云平台二期`,
        code: 'ZB-2024-012',
        tenderer: 'XX区教育局',
        agent: 'AA招标代理公司',
        tendererContact: '陈工 010-11111111',
        agentContact: '周经理 010-22222222',
        bidOpeningTime: '2024-08-05 15:00',
        status: '进行中',
        deposit: '¥80,000',
        depositDeadline: '2024-08-01 17:00',
        openingLocation: 'XX区教育局 1楼大厅',
        collectionTime: '2024-07-01',
        requirements: '教育云平台二期扩容需求...',
        strategy: '综合实力展示...',
        purchaseAmount: '¥800',
        purchaseDate: '2024-06-15',
        otherRemarks: ''
      },
      {
        id: '5',
        name: `${enterprisePrefix}社区养老服务中心智能化改造`,
        code: 'ZB-2024-015',
        tenderer: 'XX市民政局',
        agent: 'BB项目管理公司',
        tendererContact: '黄工 010-33333333',
        agentContact: '吴经理 010-44444444',
        bidOpeningTime: '2024-09-25 10:30',
        status: '进行中',
        deposit: '¥15,000',
        depositDeadline: '2024-09-20 17:00',
        openingLocation: 'XX市民政局 3楼',
        collectionTime: '2024-08-15',
        requirements: '适老化智能设备安装调试...',
        strategy: '服务品质优先...',
        purchaseAmount: '¥0',
        purchaseDate: '2024-08-01',
        otherRemarks: ''
      }
    ]);
  }, [currentEnterprise]);

  const handleEditProject = (project: any) => {
    setIsEditing(true);
    setEditingId(project.id);
    setAnalyzedData({
      projectName: project.name,
      projectNumber: project.code,
      tenderer: project.tenderer,
      tendererContact: project.tendererContact || '',
      tenderAgent: project.agent,
      tenderAgentContact: project.agentContact || '',
      openingTime: project.bidOpeningTime.replace(' ', 'T'),
      depositDeadline: (project.depositDeadline || '').replace(' ', 'T'),
      openingLocation: project.openingLocation || '',
      depositAmount: project.deposit,
      collectionTime: project.collectionTime,
      tenderRequirements: project.requirements,
      otherRemarks: project.otherRemarks || '',
      strategy: project.strategy,
      purchaseAmount: project.purchaseAmount,
      purchaseDate: project.purchaseDate
    });
    setIsAnalyzed(true);
    setShowAddModal(true);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('确定要删除该项目吗？')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSaveProject = () => {
    const newProjectData = {
      id: isEditing ? editingId! : Date.now().toString(),
      name: analyzedData.projectName,
      code: analyzedData.projectNumber,
      tenderer: analyzedData.tenderer,
      tendererContact: analyzedData.tendererContact,
      agent: analyzedData.tenderAgent,
      agentContact: analyzedData.tenderAgentContact,
      bidOpeningTime: analyzedData.openingTime.replace('T', ' '),
      status: isEditing ? projects.find(p => p.id === editingId)?.status || '进行中' : '进行中',
      deposit: analyzedData.depositAmount,
      depositDeadline: analyzedData.openingTime.replace('T', ' '),
      openingLocation: analyzedData.openingLocation,
      collectionTime: analyzedData.collectionTime,
      requirements: analyzedData.tenderRequirements,
      strategy: analyzedData.strategy,
      purchaseAmount: analyzedData.purchaseAmount,
      purchaseDate: analyzedData.purchaseDate,
      otherRemarks: analyzedData.otherRemarks
    };

    if (isEditing) {
      setProjects(projects.map(p => p.id === editingId ? newProjectData : p));
    } else {
      setProjects([newProjectData, ...projects]);
    }
    resetAddModal();
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
          新增项目登记
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">投标中项目</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">12 个</h3>
          <p className="text-xs text-slate-400 mt-2">预计投标金额 ¥450万</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">本月新增项目</span>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Plus size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">8 个</h3>
          <p className="text-xs text-slate-400 mt-2">较上月 +15%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">本月投标成功</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">3 个</h3>
          <p className="text-xs text-slate-400 mt-2">成功率 37.5%</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-8">
        <div className="w-56 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="搜索项目名称、编号..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-40 relative group">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all appearance-none cursor-pointer text-slate-600 font-medium"
          >
            <option value="全部">全部状态</option>
            <option value="进行中">进行中</option>
            <option value="已完成">已完成</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={16} />
        </div>

        <div className="w-40 relative group">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-slate-600 font-medium"
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

      {/* Project Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">项目名称</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">项目编号</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">招标人</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">招标代理</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">开标时间</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.filter(p => p.name.includes(searchTerm) || p.code.includes(searchTerm)).map((project) => (
              <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <Briefcase size={16} />
                    </div>
                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors text-sm">{project.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {project.code}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {project.tenderer}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {project.agent}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} className="text-slate-400" />
                    {project.bidOpeningTime}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    project.status === '进行中' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {project.status === '进行中' ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEnterWorkbench?.('preparation', { 
                        projectName: project.name, 
                        projectNumber: project.code,
                        isTenderUploaded: true 
                      })}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all flex items-center gap-1"
                      title="进入工作台"
                    >
                      <ExternalLink size={16} />
                      <span className="text-xs font-bold">进入工作台</span>
                    </button>
                    <button 
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="编辑"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="删除"
                    >
                      <Trash2 size={16} />
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
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{isEditing ? '编辑投标项目' : '新增投标项目'}</h3>
                </div>
                <button 
                  onClick={resetAddModal}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="p-10 flex-1 flex flex-col overflow-hidden">
                <div className="space-y-8 flex-1 overflow-y-auto pr-4 custom-scrollbar flex flex-col">
                  
                  {/* Import Section */}
                  {!isAnalyzed && !isAnalyzing && !isEditing && (
                    <div 
                      onClick={handleFileUpload}
                      className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group shrink-0"
                    >
                      <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                        <Upload size={32} />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-600 font-bold">点击或拖拽招标文件至此处上传</p>
                        <p className="text-slate-400 text-xs mt-1">支持 PDF、Word、ZF、CF 格式，AI将自动识别关键信息并填充表单</p>
                      </div>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="border-2 border-blue-100 bg-blue-50/30 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 text-center shrink-0">
                      <Loader2 size={40} className="text-primary animate-spin" />
                      <div>
                        <h4 className="font-bold text-slate-900">AI 正在深度解析招标文件...</h4>
                        <p className="text-slate-500 text-sm mt-1">正在识别关键时间节点、技术要求及商务条款</p>
                      </div>
                    </div>
                  )}

                  {isAnalyzed && !isEditing && (
                    <div className="flex items-center justify-between p-5 bg-green-50 rounded-2xl border border-green-100 shrink-0">
                      <div className="flex items-center gap-4">
                        <div className="size-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                          <CheckCircle2 size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-green-900">解析成功！</h4>
                          <p className="text-green-700/70 text-sm">已自动识别出关键信息，请核对并完善以下项目详情</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setIsAnalyzed(false);
                          setAnalyzedData({
                            projectName: '',
                            projectNumber: '',
                            tenderer: '',
                            tendererContact: '',
                            tenderAgent: '',
                            tenderAgentContact: '',
                            openingTime: '',
                            depositDeadline: '',
                            openingLocation: '',
                            depositAmount: '',
                            collectionTime: '',
                            tenderRequirements: '',
                            otherRemarks: '',
                            strategy: '',
                            purchaseAmount: '',
                            purchaseDate: ''
                          });
                        }}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 underline"
                      >
                        重新导入
                      </button>
                    </div>
                  )}

                  {/* Form Section */}
                  <div className="grid grid-cols-3 gap-6 shrink-0">
                    <div className="col-span-3 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
                        项目名称 <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={analyzedData.projectName || ''}
                        onChange={(e) => handleDataChange('projectName', e.target.value)}
                        placeholder="请输入项目名称"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">项目编号</label>
                      <input 
                        type="text" 
                        value={analyzedData.projectNumber || ''}
                        onChange={(e) => handleDataChange('projectNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">招标人</label>
                      <input 
                        type="text" 
                        value={analyzedData.tenderer || ''}
                        onChange={(e) => handleDataChange('tenderer', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">招标人联系方式</label>
                      <input 
                        type="text" 
                        value={analyzedData.tendererContact || ''}
                        onChange={(e) => handleDataChange('tendererContact', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">招标代理</label>
                      <input 
                        type="text" 
                        value={analyzedData.tenderAgent || ''}
                        onChange={(e) => handleDataChange('tenderAgent', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">招标代理联系方式</label>
                      <input 
                        type="text" 
                        value={analyzedData.tenderAgentContact || ''}
                        onChange={(e) => handleDataChange('tenderAgentContact', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5 col-span-3">
                      <label className="text-xs font-bold text-slate-500 ml-1">投标策略</label>
                      <textarea 
                        value={analyzedData.strategy || ''}
                        onChange={(e) => handleDataChange('strategy', e.target.value)}
                        placeholder="请输入投标策略、定价策略等..."
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm h-24 resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">购买金额</label>
                      <input 
                        type="text" 
                        value={analyzedData.purchaseAmount || ''}
                        onChange={(e) => handleDataChange('purchaseAmount', e.target.value)}
                        placeholder="¥ 0.00"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">购买日期</label>
                      <input 
                        type="date" 
                        value={analyzedData.purchaseDate || ''}
                        onChange={(e) => handleDataChange('purchaseDate', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
                        开标时间
                      </label>
                      <input 
                        type="datetime-local" 
                        value={analyzedData.openingTime || ''}
                        onChange={(e) => handleDataChange('openingTime', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">保证金缴纳截止时间</label>
                      <input 
                        type="datetime-local" 
                        value={analyzedData.depositDeadline || ''}
                        onChange={(e) => handleDataChange('depositDeadline', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">开标地点</label>
                      <input 
                        type="text" 
                        value={analyzedData.openingLocation || ''}
                        onChange={(e) => handleDataChange('openingLocation', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">文件领取截止时间</label>
                      <input 
                        type="date" 
                        value={analyzedData.collectionTime || ''}
                        onChange={(e) => handleDataChange('collectionTime', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">保证金金额</label>
                      <input 
                        type="text" 
                        value={analyzedData.depositAmount || ''}
                        onChange={(e) => handleDataChange('depositAmount', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="col-span-3 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">招标要求</label>
                      <textarea 
                        value={analyzedData.tenderRequirements || ''}
                        onChange={(e) => handleDataChange('tenderRequirements', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm resize-none"
                      />
                    </div>
                    <div className="col-span-3 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">其他备注</label>
                      <textarea 
                        value={analyzedData.otherRemarks || ''}
                        onChange={(e) => handleDataChange('otherRemarks', e.target.value)}
                        rows={3}
                        placeholder="请输入其他备注信息..."
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 shrink-0">
                    <h5 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Upload size={18} className="text-primary" />
                      文件附件上传
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: '招标文件', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: '招标清单', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: '控制价清单', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      ].map((file, i) => (
                        <div key={i} className={`p-4 rounded-2xl border border-slate-100 transition-all group cursor-pointer border-dashed border-2 ${
                          file.label === '招标文件' && isTenderUploaded ? 'bg-green-50 border-green-200' : 'bg-slate-50 hover:border-primary/30 hover:bg-white'
                        }`}>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`size-10 rounded-xl flex items-center justify-center ${
                              file.label === '招标文件' && isTenderUploaded ? 'bg-green-100 text-green-600' : `${file.bg} ${file.color}`
                            } shadow-sm group-hover:scale-110 transition-transform`}>
                              <file.icon size={20} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">{file.label}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-medium italic">
                              {file.label === '招标文件' && isTenderUploaded ? '招标文件已自动导入' : '点击上传附件'}
                            </span>
                            {!(file.label === '招标文件' && isTenderUploaded) && <Plus size={14} className="text-primary" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8 mt-auto shrink-0 sticky bottom-0 bg-white pb-2">
                    <button 
                      onClick={handleSaveProject}
                      disabled={!analyzedData.projectName.trim()}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isEditing ? '保存修改' : '确认新增'}
                    </button>
                    <button 
                      onClick={resetAddModal}
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

    </motion.div>
  );
};

export default TenderProjectRegistration;
