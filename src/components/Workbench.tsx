import React, { useState, useEffect } from 'react';
import BidParsing from './BidParsing';
import { 
  Fingerprint, 
  ClipboardList, 
  Share2, 
  Check, 
  UploadCloud, 
  FileText, 
  Download, 
  Eye, 
  Trash2,
  Info,
  Network,
  AlertTriangle,
  FileSearch,
  ShieldCheck,
  BrainCircuit,
  History,
  ArrowRight,
  User,
  Phone,
  Calendar,
  FolderOpen,
  CheckCircle2,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Trophy,
  Receipt,
  Users,
  Copy,
  Languages,
  Building2,
  Clock,
  BarChart3,
  PenTool,
  Scan,
  Activity,
  TrendingUp,
  Search,
  Maximize2,
  ChevronUp,
  Minus,
  List,
  LayoutGrid,
  Edit3,
  LogOut,
  X,
  Monitor,
  Bell,
  AlertCircle,
  ShieldAlert,
  RefreshCw,
  ExternalLink,
  Plus,
  Award,
  MessageSquare,
  Printer,
  MousePointer2,
  Highlighter,
  Type,
  Square,
  Circle,
  Eraser,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Phase = 'preparation' | 'production' | 'inspection' | 'archiving';
type SubView = 'main' | 'annotation-view' | 'key-info-view' | 'qualification-view' | 'risk-view' | 'file-production' | 'inspection-detail' | 'archive-register' | 'resource-center' | 'parsing-report';

interface WorkbenchProps {
  onExit: () => void;
  initialPhase?: Phase;
  initialProjectData?: any;
  currentEnterprise: { id: string; name: string };
  uploadedFiles: Record<string, boolean>;
  setUploadedFiles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const ParsingReportView = ({ onBack, projectData }: { onBack: () => void, projectData: any }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
    <button onClick={onBack} className="mb-4 flex items-center gap-2 text-slate-500 hover:text-primary">
      <ChevronLeft size={16} /> 返回
    </button>
    <h2 className="text-2xl font-bold">解析报告</h2>
    <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-bold text-lg mb-4">项目核心信息</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded border border-slate-100">
          <p className="text-sm text-slate-500">项目名称</p>
          <p className="font-bold">{projectData.projectName}</p>
        </div>
        <div className="p-4 bg-white rounded border border-slate-100">
          <p className="text-sm text-slate-500">招标编号</p>
          <p className="font-bold">{projectData.projectNumber}</p>
        </div>
      </div>
    </div>
  </div>
);

const Workbench: React.FC<WorkbenchProps> = ({ 
  onExit, 
  initialPhase, 
  initialProjectData, 
  currentEnterprise,
  uploadedFiles,
  setUploadedFiles
}) => {
  const [currentPhase, setCurrentPhase] = useState<Phase>(initialPhase || 'preparation');
  const [subView, setSubView] = useState<SubView>('main');
  const [showToolModal, setShowToolModal] = useState(false);
  const [isToolInstalled, setIsToolInstalled] = useState(false); // Mock state
  const [activeRightTab, setActiveRightTab] = useState<string | null>(null);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [activeViewerTab, setActiveViewerTab] = useState<'core' | 'risk' | 'custom'>('risk');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDocDropdown, setShowDocDropdown] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<string>('tender-doc');
  const [notifIndex, setNotifIndex] = useState(0);

  const isTenderUploaded = !!uploadedFiles?.['tender-doc'];

  const clarDocs = Object.keys(uploadedFiles || {})
    .filter(key => key.startsWith('clar-doc-') && uploadedFiles[key])
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[2]);
      const numB = parseInt(b.split('-')[2]);
      return numB - numA; // Latest first
    });

  const hasAnyDoc = isTenderUploaded || clarDocs.length > 0;
  const hasMultipleDocs = (isTenderUploaded && clarDocs.length > 0) || clarDocs.length > 1;
  const latestDocKey = clarDocs.length > 0 ? clarDocs[0] : (isTenderUploaded ? 'tender-doc' : null);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Dummy state for forcing re-render
  const [projectData, setProjectData] = useState(initialProjectData || {
    projectName: `城市基础设施二期项目 (${currentEnterprise.name})`,
    projectNumber: 'BID-2023-00892',
    tenderer: 'XX市交通运输局',
    tendererContact: '张工 010-88888888',
    tenderAgent: 'XX招标代理有限公司',
    tenderAgentContact: '李经理 010-66666666',
    openingTime: '2024-01-15 09:30',
    depositDeadline: '2024-01-12 17:00',
    openingLocation: 'XX市公共资源交易中心 301 会议室',
    filingInfo: '已完成网上备案',
    depositAmount: '¥ 500,000.00',
    collectionTime: '2023-12-25',
    tenderRequirements: '1. 资质要求：具备市政公用工程施工总承包一级及以上资质；\n2. 业绩要求：近三年内具有类似智慧交通项目业绩；\n3. 技术要求：支持国产化适配。',
    otherRemarks: ''
  });

  useEffect(() => {
    if (!initialProjectData) {
      setProjectData(prev => ({
        ...prev,
        projectName: `城市基础设施二期项目 (${currentEnterprise.name})`
      }));
    }
  }, [currentEnterprise.name, initialProjectData]);

  const handleProjectDataChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const analysisResults = {
    riskAnalysis: [
      {
        title: '资格审查潜在废标项',
        original: '17.4.3 在第1.1.4.5目约定的缺陷责任期（工程质量保修期）满时，承包人没有完成缺陷责任的，发包人有权扣留与未履行责任剩余工作所需金额相应的质量保证金余额，并有权根据第19.3款约定要求延长缺陷责任期（工程质量保修期），直至完成剩余工作为止。',
        analysis: '合同条款及格式章节出现缺陷责任期/工程质量保修期，请注意检查。',
        suggestion: '投标附录函中，质量缺陷责任期限响应被废标，其要求在合同条款中：https://ggzyjy.huzhou.gov.cn/art/2024/7/18/art_1229670649_65527.html'
      },
      {
        title: '资格审查潜在废标项',
        original: '（5）承包人在缺陷责任期（工程质量保修期）内，未能对工程接收证书所列的缺陷清单的内容或缺陷责任期（工程质量保修期）内发生的缺陷进行修复，而又拒绝按监理人指示再进行修复；',
        analysis: '合同条款及格式章节出现缺陷责任期/工程质量保修期，请注意检查。',
        suggestion: '投标附录函中，质量缺陷责任期限响应被废标，其要求在合同条款中：https://ggzyjy.huzhou.gov.cn/art/2024/7/18/art_1229670649_65527.html'
      }
    ],
    coreContent: [
      { label: '项目名称', value: '克东县 2021 年老旧小区改造建设项目' },
      { label: '招标编号', value: 'T2300000001003033' },
      { label: '预算金额', value: '¥1,250.0万' },
      { label: '开标时间', value: '2023-12-20 09:30' },
    ]
  };

  const notifications = [
    { id: 1, type: 'warning', text: '保证金缴纳截止时间提醒：2023-11-25 17:00', time: '2小时前', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 2, type: 'info', text: '开标时间提醒：2023-12-20 09:30', time: '5小时前', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, type: 'alert', text: '答疑澄清提醒：收到1条新的澄清公告', time: '1天前', icon: Info, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNotifIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const phases = [
    { id: 'preparation', label: '准备阶段' },
    { id: 'production', label: '制作阶段' },
    { id: 'inspection', label: '检查阶段' },
    { id: 'archiving', label: '标后归档' },
  ];

  const handleStartProduction = () => {
    setShowToolModal(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      {/* Top Navigation / Exit Bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Monitor size={16} />
            <span>工作台模式</span>
          </div>
        </div>
        <button 
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm"
        >
          <LogOut size={16} />
          退出工作台
        </button>
      </div>

      <div className="flex gap-6 relative">
        {/* Main Content Area */}
        <div className="flex-1">

      {/* Project Header */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3 relative">
              <h2 className="text-2xl font-bold text-slate-900">{projectData.projectName}</h2>
              <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                projectData.status === '进行中' 
                  ? 'bg-blue-50 text-blue-500' 
                  : projectData.status === '放弃投标'
                    ? 'bg-red-50 text-red-500'
                    : 'bg-emerald-50 text-emerald-500'
              }`}>
                {projectData.status === '进行中' ? '投标中' : (projectData.status === '已完成' ? '已开标' : projectData.status)}
              </span>
              
              <div className="relative flex items-center gap-0">
                <button 
                  onClick={() => {
                    if (hasAnyDoc) {
                      setViewingDoc(latestDocKey!);
                      setActiveRightTab('annotation');
                    }
                  }}
                  className={`ml-4 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                    hasAnyDoc 
                      ? "bg-slate-100 text-slate-600 hover:bg-primary hover:text-white border-slate-200" 
                      : "bg-red-50 text-red-500 border-red-100"
                  } ${hasMultipleDocs ? 'rounded-r-none border-r-0' : ''}`}
                >
                  <FileText size={14} /> 
                  {!hasAnyDoc && "未上传招标文件"}
                  {hasAnyDoc && !hasMultipleDocs && (isTenderUploaded ? "查看招标文件" : `查看第${parseInt(clarDocs[0].split('-')[2]) + 1}次答疑文件`)}
                  {hasMultipleDocs && (clarDocs.length > 0 ? `查看第${parseInt(clarDocs[0].split('-')[2]) + 1}次答疑文件` : "查看招标文件")}
                </button>
                
                {hasMultipleDocs && (
                  <button
                    onClick={() => setShowDocDropdown(!showDocDropdown)}
                    onBlur={() => setTimeout(() => setShowDocDropdown(false), 200)}
                    className="px-1.5 py-1.5 bg-slate-100 text-slate-600 hover:bg-primary hover:text-white border border-slate-200 rounded-r-lg transition-all"
                  >
                    <ChevronDown size={12} className={`transition-transform ${showDocDropdown ? 'rotate-180' : ''}`} />
                  </button>
                )}

                <AnimatePresence>
                  {showDocDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-4 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        {isTenderUploaded && (
                          <>
                            <button
                              onClick={() => {
                                setViewingDoc('tender-doc');
                                setActiveRightTab('annotation');
                                setShowDocDropdown(false);
                              }}
                              className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-primary flex items-center gap-2 group"
                            >
                              <FileText size={14} className="text-slate-400 group-hover:text-primary" />
                              <span>原始招标文件</span>
                            </button>
                            <div className="h-px bg-slate-50 my-1 mx-2" />
                          </>
                        )}
                        {clarDocs.map((doc, idx) => (
                          <button
                            key={doc}
                            onClick={() => {
                              setViewingDoc(doc);
                              setActiveRightTab('annotation');
                              setShowDocDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-primary flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-slate-400 group-hover:text-primary" />
                              <span>第{parseInt(doc.split('-')[2]) + 1}次答疑文件</span>
                            </div>
                            {idx === 0 && <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-500 text-[10px]">最新</span>}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5">
                <Fingerprint size={18} /> 项目编号：{projectData.projectNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveRightTab(activeRightTab === 'resource-center' ? null : 'resource-center')}
              className={`px-6 py-2 border rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeRightTab === 'resource-center' 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20' 
                  : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'
              }`}
            >
              <FolderOpen size={16} /> 资源中心
            </button>
            <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
              <History size={16} /> 操作日志
            </button>
            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Share2 size={16} /> 协作分享
            </button>
          </div>
        </div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-4 gap-6 pt-6 border-t border-slate-50">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">招标人</p>
                <p className="text-sm font-bold text-slate-900">{projectData.tenderer || '--'}</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <User size={12} /> {projectData.tendererContact ? projectData.tendererContact.split(' ')[0] : '--'} <Phone size={12} className="ml-1" /> {projectData.tendererContact ? projectData.tendererContact.split(' ')[1] || '--' : '--'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Network size={18} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">招标代理</p>
                <p className="text-sm font-bold text-slate-900">{projectData.tenderAgent || '--'}</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <User size={12} /> {projectData.tenderAgentContact ? projectData.tenderAgentContact.split(' ')[0] : '--'} <Phone size={12} className="ml-1" /> {projectData.tenderAgentContact ? projectData.tenderAgentContact.split(' ')[1] || '--' : '--'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">关键时间节点</p>
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>开标时间：</span>
                    <span className="text-primary">{projectData.openingTime || '--'}</span>
                  </p>
                  <p className="text-xs font-medium text-slate-500 flex items-center justify-between">
                    <span>领取截止：</span>
                    <span>{projectData.collectionTime || '--'}</span>
                  </p>
                  <p className="text-xs font-medium text-slate-500 flex items-center justify-between">
                    <span>保证金截止：</span>
                    <span className="text-orange-500">{projectData.depositDeadline || '--'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Scan size={18} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">开标地点</p>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">{projectData.openingLocation || '--'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Ticker */}
        <div 
          onClick={() => setShowNotifications(true)}
          className="bg-orange-50/50 border border-orange-100 rounded-lg px-4 py-4 flex items-center gap-3 overflow-hidden group cursor-pointer hover:bg-orange-50 transition-colors"
        >
          <div className="relative">
            <Bell size={18} className="text-orange-500 shrink-0" />
            <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="flex-1 overflow-hidden relative h-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={notifIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-orange-700 font-medium truncate"
              >
                {notifications[notifIndex].text}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold uppercase tracking-wider">
            查看全部
            <ChevronRight size={12} />
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl py-8 px-12 shadow-sm border border-slate-100">
        <div className="flex items-center justify-center gap-4 max-w-5xl mx-auto">
          {phases.map((phase, idx) => {
            const isActive = currentPhase === phase.id;
            
            return (
              <React.Fragment key={phase.id}>
                <div 
                  onClick={() => {
                    setCurrentPhase(phase.id as Phase);
                    setSubView('main');
                  }}
                  className="flex flex-col items-center cursor-pointer group px-4"
                >
                  <span className={`text-sm font-bold transition-all duration-300 mb-2 ${
                    isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'
                  }`}>
                    {phase.label}
                  </span>
                  <div className={`h-1 w-12 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-primary' : 'bg-transparent'
                  }`} />
                </div>
                {idx < phases.length - 1 && (
                  <div className="flex items-center px-4 text-slate-200 tracking-[4px] font-light select-none">
                    --------
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Phase Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPhase}-${subView}`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="space-y-6"
        >
          {subView === 'main' ? (
            <div className="space-y-8">
              {currentPhase === 'preparation' && (
                <PreparationPhase 
                  onNavigate={(view) => setSubView(view)} 
                  onSelect={setSelectedCard} 
                  setActiveRightTab={setActiveRightTab}
                  activeRightTab={activeRightTab}
                  initialProjectData={initialProjectData}
                  isTenderUploaded={isTenderUploaded}
                  projectData={projectData}
                  handleProjectDataChange={handleProjectDataChange}
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                />
              )}
              {currentPhase === 'production' && <ProductionPhase onNavigate={handleStartProduction} onSelect={setSelectedCard} />}
              {currentPhase === 'inspection' && <InspectionPhase onNavigate={() => setSubView('inspection-detail')} onSelect={setSelectedCard} />}
              {currentPhase === 'archiving' && <ArchivingPhase onNavigate={() => setSubView('archive-register')} />}
            </div>
          ) : (
            <>
              {subView === 'annotation-view' && <AnnotationView onBack={() => setSubView('main')} />}
              {subView === 'key-info-view' && <KeyInfoView onBack={() => setSubView('main')} />}
              {subView === 'qualification-view' && <QualificationView onBack={() => setSubView('main')} />}
              {subView === 'risk-view' && <RiskView onBack={() => setSubView('main')} />}
              {subView === 'file-production' && <FileProductionView onBack={() => setSubView('main')} />}
              {subView === 'inspection-detail' && <InspectionDetailView onBack={() => setSubView('main')} uploadedFiles={uploadedFiles} />}
              {subView === 'archive-register' && <ArchiveRegisterView onBack={() => setSubView('main')} />}
              {subView === 'parsing-report' && <ParsingReportView onBack={() => setSubView('main')} projectData={projectData} />}
              {subView === 'bid-parsing' && (
                <BidParsing 
                  onBack={() => setSubView('main')} 
                  onViewReport={() => setSubView('parsing-report')}
                  autoImported={isTenderUploaded}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
        </div>
      </div>

      {/* Right Sliding Panel */}
      <AnimatePresence>
        {activeRightTab && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRightTab(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-[70]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed right-0 top-0 bottom-0 ${activeRightTab === 'annotation' || activeRightTab === 'resource-center' || activeRightTab === 'material-market' ? 'w-[1200px]' : 'w-[450px]'} bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[80] flex flex-col border-l border-slate-100 transition-all duration-500`}
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-xl flex items-center justify-center text-white shadow-lg ${
                    activeRightTab === 'annotation' ? 'bg-blue-500' :
                    activeRightTab === 'key-info' ? 'bg-indigo-500' :
                    activeRightTab === 'qualification' ? 'bg-emerald-500' :
                    activeRightTab === 'disqualification' ? 'bg-rose-500' : 
                    activeRightTab === 'material-market' ? 'bg-amber-500' :
                    activeRightTab === 'resource-center' ? 'bg-amber-500' : 'bg-purple-500'
                  }`}>
                    {activeRightTab === 'annotation' && <PenTool size={20} />}
                    {activeRightTab === 'key-info' && <BrainCircuit size={20} />}
                    {activeRightTab === 'qualification' && <ShieldCheck size={20} />}
                    {activeRightTab === 'disqualification' && <ShieldAlert size={20} />}
                    {activeRightTab === 'material-market' && <LayoutGrid size={20} />}
                    {activeRightTab === 'resource-center' && <FolderOpen size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {activeRightTab === 'annotation' && '在线批注'}
                      {activeRightTab === 'key-info' && '关键信息提取'}
                      {activeRightTab === 'qualification' && '资格审查'}
                      {activeRightTab === 'disqualification' && '风险建议'}
                      {activeRightTab === 'material-market' && '素材市场'}
                      {activeRightTab === 'resource-center' && '资源中心'}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      {activeRightTab === 'material-market' ? 'Material Market' : 
                       activeRightTab === 'resource-center' ? 'Resource Management' : 'Tender Document Analysis'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveRightTab(null)}
                  className="size-8 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={`flex-1 overflow-y-auto ${activeRightTab === 'annotation' || activeRightTab === 'resource-center' ? 'p-0' : 'p-8'}`}>
                {activeRightTab === 'annotation' && (
                  <div className="flex h-full bg-slate-50">
                    {/* Document Viewer Area */}
                    <div className="flex-1 overflow-y-auto p-12 bg-slate-200/50 shadow-inner">
                      <div className="max-w-4xl mx-auto bg-white shadow-2xl p-20 min-h-[1500px] relative border border-slate-200">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
                        
                        <div className="text-center mb-16">
                          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">城市基础设施二期项目</h1>
                          <h2 className="text-2xl font-bold text-slate-500">
                            {viewingDoc === 'tender-doc' ? '招标文件' : `第${viewingDoc.split('-')[2]}次答疑文件`}
                          </h2>
                          <div className="mt-8 flex justify-center gap-8 text-sm text-slate-400 font-medium">
                            <span>项目编号：BID-2023-00892</span>
                            <span>发布日期：{viewingDoc === 'tender-doc' ? '2023-11-15' : '2023-12-05'}</span>
                          </div>
                        </div>

                        <div className="space-y-12 text-slate-800 leading-relaxed text-lg">
                          <section>
                            <h3 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-100 pb-3 flex items-center gap-3">
                              <span className="size-8 bg-slate-900 text-white rounded flex items-center justify-center text-sm">01</span>
                              第一章 招标公告
                            </h3>
                            <p className="mb-4">受招标人委托，对城市基础设施二期项目进行公开招标。本项目已具备招标条件，现欢迎符合条件的投标人参加投标。</p>
                            <p>1.1 项目概况：本项目主要包含城市道路绿化、照明系统升级及智慧交通设施建设。</p>
                          </section>

                          <section className="relative">
                            <h3 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-100 pb-3 flex items-center gap-3">
                              <span className="size-8 bg-slate-900 text-white rounded flex items-center justify-center text-sm">02</span>
                              第二章 投标人须知
                            </h3>
                            <div className="relative group">
                              <p className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg shadow-sm transition-all hover:bg-blue-100/50">
                                <span className="font-bold text-blue-700 block mb-1">2.1 技术参数要求：</span>
                                本项目涉及的所有智慧交通感应设备必须符合国家 GB/T 12345-2023 标准，且具备行业领先水平，支持 5G 毫秒级响应。
                              </p>
                              <div className="absolute -right-3 top-1/2 -translate-y-1/2 size-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-black shadow-xl border-4 border-white cursor-pointer hover:scale-125 transition-all animate-pulse">
                                1
                              </div>
                            </div>
                            <p className="mt-6">2.2 投标有效期：自投标截止之日起 90 个日历天内有效。</p>
                          </section>

                          <section className="relative">
                            <h3 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-100 pb-3 flex items-center gap-3">
                              <span className="size-8 bg-slate-900 text-white rounded flex items-center justify-center text-sm">03</span>
                              第三章 商务条款
                            </h3>
                            <div className="relative group">
                              <p className="bg-orange-50 border-l-4 border-orange-500 pl-6 py-4 rounded-r-lg shadow-sm transition-all hover:bg-orange-100/50">
                                <span className="font-bold text-orange-700 block mb-1">3.1 交付周期：</span>
                                中标人须在合同签订后 30 个日历天内完成所有设备的交付与安装调试，并确保系统上线运行。
                              </p>
                              <div className="absolute -right-3 top-1/2 -translate-y-1/2 size-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-black shadow-xl border-4 border-white cursor-pointer hover:scale-125 transition-all animate-pulse">
                                2
                              </div>
                            </div>
                            <p className="mt-6 italic text-slate-400 text-base">注：逾期交付将面临每日合同总额 0.5% 的违约金处罚。</p>
                          </section>

                          <section>
                            <h3 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-100 pb-3 flex items-center gap-3">
                              <span className="size-8 bg-slate-900 text-white rounded flex items-center justify-center text-sm">04</span>
                              第四章 评标办法
                            </h3>
                            <p>本项目采用综合评估法。其中技术标权重 60%，商务标权重 40%。</p>
                          </section>
                        </div>

                        <div className="mt-24 pt-12 border-t border-slate-100 text-center text-slate-300 text-sm italic">
                          --- 招标文件正文结束 ---
                        </div>
                      </div>
                    </div>

                    {/* Annotations Sidebar */}
                    <div className="w-96 border-l border-slate-200 bg-white flex flex-col">
                      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h4 className="font-black text-slate-900 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <PenTool size={18} className="text-primary" />
                            批注列表
                          </span>
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full">2 条记录</span>
                        </h4>
                      </div>
                      <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {[
                          { id: 1, user: '张工', role: '技术专家', time: '10:30', content: '此处技术参数需进一步核实，GB/T 标准可能有更新版本，需确认是否适用最新标准。', type: 'technical' },
                          { id: 2, user: '李经理', role: '商务总监', time: '昨天', content: '30天的交付周期对于目前的供应链情况来说极具挑战，建议在答疑环节申请延长至45天。', type: 'business' },
                        ].map((note, i) => (
                          <div key={i} className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="size-8 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xs font-black">
                                  {note.user[0]}
                                </div>
                                <div>
                                  <p className="text-xs font-black text-slate-900">{note.user}</p>
                                  <p className="text-[10px] text-slate-400 font-bold">{note.role}</p>
                                </div>
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium">{note.time}</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{note.content}</p>
                            
                            <div className={`absolute -left-px top-6 w-1 h-12 rounded-r-full ${note.type === 'technical' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                            
                            <div className="absolute -right-2 -top-2 size-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
                              {note.id}
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-[10px] font-bold text-primary hover:underline">回复</button>
                              <button className="text-[10px] font-bold text-slate-400 hover:text-red-500">删除</button>
                            </div>
                          </div>
                        ))}
                        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-black hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                          <Plus size={16} /> 添加新批注
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeRightTab === 'resource-center' && (
                  <div className="h-full flex flex-col bg-slate-50">
                    <ResourceCenterView onBack={() => setActiveRightTab(null)} />
                  </div>
                )}

                {activeRightTab === 'key-info' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { label: '项目名称', value: '城市基础设施二期项目', icon: FileText },
                        { label: '招标编号', value: 'BID-2023-00892', icon: Fingerprint },
                        { label: '预算金额', value: '¥12,500,000.00', icon: Receipt },
                        { label: '开标时间', value: '2023-12-20 09:30', icon: Calendar },
                        { label: '建设地点', value: '某市高新区核心区', icon: Building2 },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="size-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                            <item.icon size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
                            <p className="text-sm font-bold text-slate-900">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeRightTab === 'qualification' && (
                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                        <ShieldCheck size={16} />
                        资格要求概览
                      </div>
                      <p className="text-xs text-emerald-600 leading-relaxed">系统已自动识别出 5 项核心资格要求，请确保企业资料库中相关证件在有效期内。</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: '营业执照', status: '已匹配', desc: '具备独立法人资格，营业执照在有效期内。' },
                        { title: '资质等级', status: '已匹配', desc: '具备市政公用工程施工总承包二级及以上资质。' },
                        { title: '安全生产许可证', status: '待核验', desc: '具备有效的安全生产许可证。' },
                        { title: '项目经理资格', status: '已匹配', desc: '拟派项目经理须具备二级及以上注册建造师。' },
                        { title: '财务要求', status: '已匹配', desc: '近三年财务状况良好，无亏损。' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-900">{item.title}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              item.status === '已匹配' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                            }`}>{item.status}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeRightTab === 'material-market' && (
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2">
                        <LayoutGrid size={16} />
                        素材市场
                      </div>
                      <p className="text-xs text-amber-600 leading-relaxed">提供丰富的投标素材，包括往期优秀方案、人员简历、企业业绩等，点击可快速复用。</p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: '优秀技术方案', count: 12, icon: FileText, color: 'text-blue-500' },
                        { title: '人员简历库', count: 45, icon: User, color: 'text-emerald-500' },
                        { title: '企业业绩库', count: 28, icon: Award, color: 'text-amber-500' },
                        { title: '常见问题答疑', count: 150, icon: MessageSquare, color: 'text-indigo-500' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-primary/30 transition-all cursor-pointer group">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`size-8 rounded-lg bg-slate-50 flex items-center justify-center ${item.color}`}>
                                <item.icon size={18} />
                              </div>
                              <span className="text-sm font-bold text-slate-900">{item.title}</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">{item.count} 条</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">推荐素材</h5>
                      <div className="space-y-3">
                        {[
                          '2023年市政公用工程优秀施工组织设计',
                          '智慧交通系统集成方案模板',
                          '项目经理张工个人业绩汇总',
                        ].map((text, i) => (
                          <div key={i} className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-2">
                            <div className="size-1.5 bg-primary rounded-full"></div>
                            {text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeRightTab === 'disqualification' && (
                  <div className="space-y-6">
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2">
                        <ShieldAlert size={16} />
                        高风险废标项提醒
                      </div>
                      <p className="text-xs text-rose-600 leading-relaxed">请务必仔细核对以下内容，任何一项不符合都将导致直接废标。</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: '投标保证金', risk: '极高', desc: '未按要求缴纳保证金或金额不足。' },
                        { title: '签字盖章', risk: '极高', desc: '投标文件未按要求签字或加盖公章。' },
                        { title: '报价超限', risk: '极高', desc: '投标报价超过最高投标限价。' },
                        { title: '工期响应', risk: '高', desc: '投标工期超过招标文件规定的最长工期。' },
                        { title: '质量承诺', risk: '高', desc: '质量标准未响应招标文件要求。' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 border-l-4 border-rose-500 bg-slate-50 rounded-r-xl">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-slate-900">{item.title}</span>
                            <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">风险: {item.risk}</span>
                          </div>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  <Download size={18} />
                  导出分析报告
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    <AnimatePresence>
      {showToolModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">启动投标工具</h3>
                <button 
                  onClick={() => setShowToolModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-8 text-center space-y-6">
                <div className="size-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Monitor size={40} />
                </div>
                
                {isToolInstalled ? (
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">正在打开投标工具...</h4>
                    <p className="text-slate-500">请稍候，系统正在为您调起本地客户端</p>
                    <div className="pt-4">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">未检测到投标工具</h4>
                    <p className="text-slate-500 text-sm">您尚未安装或启动投标工具客户端，无法直接进行文件制作。建议您下载并安装以获得最佳体验。</p>
                    <div className="flex flex-col gap-3 pt-6">
                      <button 
                        onClick={() => {
                          setIsToolInstalled(true);
                          // In a real app, this would trigger a download
                        }}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                      >
                        立即下载安装包
                      </button>
                      <button 
                        onClick={() => setShowToolModal(false)}
                        className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                      >
                        稍后再说
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification Modal */}
      <AnimatePresence>
        {showNotifications && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Bell className="text-primary" size={20} />
                  项目提醒事项
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 transition-all group">
                      <div className={`size-10 rounded-lg ${notif.bg} ${notif.color} flex items-center justify-center shrink-0`}>
                        <notif.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{notif.text}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          这是系统根据招标文件自动生成的关键节点提醒，请务必在截止日期前完成相关操作。
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* File Viewer Modal */}
      <AnimatePresence>
        {showFileViewer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="w-[98vw] h-[96vh] bg-white shadow-2xl flex flex-col overflow-hidden rounded-lg"
            >
              {/* Top Header with Tabs */}
              <div className="h-12 border-b border-slate-200 flex items-center px-4 bg-white shrink-0">
                <div className="flex gap-4 h-full">
                  {[
                    { id: 'core', label: '核心内容', icon: Info },
                    { id: 'risk', label: '风险分析', icon: AlertTriangle },
                    { id: 'custom', label: '自定义检查项', icon: Search },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveViewerTab(tab.id as any)}
                      className={`px-4 flex items-center gap-2 text-sm font-medium transition-all relative h-full ${
                        activeViewerTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <div className={`size-5 rounded-full flex items-center justify-center ${activeViewerTab === tab.id ? 'bg-primary/10' : 'bg-slate-100'}`}>
                        <tab.icon size={12} />
                      </div>
                      {tab.label}
                      {activeViewerTab === tab.id && (
                        <motion.div layoutId="viewerTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <button onClick={() => setShowFileViewer(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex overflow-hidden bg-slate-50">
                {/* Left Analysis Panel */}
                <div className="w-[450px] bg-white border-r border-slate-200 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-white shrink-0">
                    <h4 className="font-bold text-slate-900 text-sm">{activeViewerTab === 'risk' ? '风险分析' : activeViewerTab === 'core' ? '核心内容' : '自定义检查项'}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {activeViewerTab === 'risk' ? '风险点分析主要针对招标文件三类条款内容，一是表述不够明确、具体，容易出现歧义纠纷的模糊条款；二是条款之间前后矛盾，或者需要相互配合才能够理解的关联条款；三是违反公平性审查要求的潜在条款。' : '系统自动提取的招标文件关键信息。'}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                    {activeViewerTab === 'risk' && analysisResults.riskAnalysis.map((item, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                        <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-white">
                          <span className="text-xs font-bold text-slate-700">{item.title}</span>
                          <ChevronUp size={14} className="text-slate-400" />
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-primary">
                              <List size={14} /> 原文
                            </div>
                            <div className="p-3 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                              <span className="text-slate-400 mr-2">原文</span>
                              {item.original}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-red-500">
                              <AlertTriangle size={14} /> 风险分析
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed pl-1">{item.analysis}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                              <Edit3 size={14} /> 建议
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed pl-1">{item.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {activeViewerTab === 'core' && (
                      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-sm">
                        {analysisResults.coreContent.map((item, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                            <span className="text-xs text-slate-400">{item.label}</span>
                            <span className="text-xs font-bold text-slate-700">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle Toolbar */}
                <div className="w-12 border-r border-slate-200 bg-white flex flex-col items-center py-4 gap-4 shrink-0">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors"><List size={20} /></button>
                  <button className="p-2 bg-primary/10 text-primary rounded-lg"><LayoutGrid size={20} /></button>
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Monitor size={20} /></button>
                  <button className="p-2 text-orange-400 hover:bg-orange-50 rounded-lg transition-colors"><Edit3 size={20} /></button>
                  <button className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"><Search size={20} /></button>
                </div>

                {/* Right Document Viewer */}
                <div className="flex-1 bg-slate-200 overflow-y-auto p-12 relative">
                  <div className="max-w-4xl mx-auto bg-white shadow-2xl p-20 min-h-[1400px] flex flex-col items-center">
                    <div className="mt-40 space-y-20 text-center">
                      <h1 className="text-6xl font-bold tracking-[0.2em] text-slate-900 leading-tight">黑龙江省建设工程</h1>
                      <h1 className="text-6xl font-bold tracking-[0.2em] text-slate-900 leading-tight">标准施工招标文件</h1>
                    </div>
                    
                    <div className="mt-auto mb-20 w-full max-w-lg space-y-6 text-left">
                      <div className="flex gap-4 text-xl">
                        <span className="font-bold text-slate-900 shrink-0">项目名称：</span>
                        <span className="text-slate-700">克东县 2021 年老旧小区改造建设项目</span>
                      </div>
                      <div className="flex gap-4 text-xl">
                        <span className="font-bold text-slate-900 shrink-0">招标编号：</span>
                        <span className="text-slate-700 font-mono">T2300000001003033</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div className="h-10 border-t border-slate-200 bg-white flex items-center px-4 shrink-0 text-[11px] text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>页码:</span>
                    <input type="text" defaultValue="1" className="w-8 h-6 border border-slate-200 rounded text-center" />
                    <span>/ 123</span>
                  </div>
                </div>
                <div className="mx-auto flex items-center gap-2">
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronUp size={14} className="rotate-180" /></button>
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronUp size={14} /></button>
                  <button className="p-1 hover:bg-slate-100 rounded"><ChevronDown size={14} /></button>
                  <button className="p-1 hover:bg-slate-100 rounded rotate-180"><ChevronDown size={14} /></button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-slate-100 rounded"><Copy size={14} /></button>
                    <button className="p-1 hover:bg-slate-100 rounded"><LayoutGrid size={14} /></button>
                    <button className="p-1 hover:bg-slate-100 rounded"><Maximize2 size={14} /></button>
                  </div>
                  <div className="h-4 w-px bg-slate-200 mx-2"></div>
                  <div className="flex items-center gap-2">
                    <select className="bg-transparent border-none outline-none">
                      <option>自动缩放</option>
                      <option>100%</option>
                      <option>150%</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FileProductionView = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack} 
          className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-primary hover:text-primary transition-all shadow-sm group"
          title="返回"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          投标文件在线制作
        </h3>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">多人协作</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">导出标书</button>
      </div>
    </div>
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm h-[600px] flex items-center justify-center text-slate-400">
      <div className="text-center">
        <PenTool size={48} className="mx-auto mb-4 opacity-20" />
        <p>在线编辑器加载中...</p>
      </div>
    </div>
  </div>
);

const InspectionDetailView = ({ onBack, uploadedFiles }: { onBack: () => void, uploadedFiles: Record<string, boolean> }) => {
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [useClarification, setUseClarification] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);

  const hasClarification = Object.keys(uploadedFiles || {}).some(key => key.startsWith('clar-doc-') && uploadedFiles[key]);

  const handleStartCheck = (version: any) => {
    setSelectedVersion(version);
    if (hasClarification && !useClarification) {
      setShowClarificationModal(true);
    } else {
      // Proceed with check
      console.log('Starting check for:', version.name, useClarification ? 'with clarification' : 'original');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-primary hover:text-primary transition-all shadow-sm group"
            title="返回"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            标书检查
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-y-8">
            {[
              { label: '招标人', value: '上海浦东开发集团', icon: Building2 },
              { label: '项目类型', value: '工程类', icon: Network },
              { label: '联系人', value: '王经理', icon: User },
              { label: '联系方式', value: '13800138000', icon: Phone },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <item.icon size={16} />
                  <span className="text-xs">{item.label}</span>
                </div>
                <p className="text-sm font-bold ml-6">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-12 pt-8 border-t border-slate-50 mt-8">
            <div className="flex items-center gap-3">
              <Clock className="text-slate-400" size={20} />
              <div className="text-xs">
                <span className="text-slate-400 block mb-0.5">投标截止</span>
                <span className="text-red-600 font-bold">2026-03-15 17:00</span>
                <span className="bg-red-50 text-red-500 px-1.5 py-0.5 rounded text-[10px] ml-1">剩 3 天</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-slate-400" size={20} />
              <div className="text-xs">
                <span className="text-slate-400 block mb-0.5">开标时间</span>
                <span className="font-bold">2026-03-18 09:30</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen className="text-primary" size={20} />
            <h3 className="text-sm font-bold">招标相关文件</h3>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
            <div className="size-10 bg-white border border-slate-200 rounded flex items-center justify-center text-primary">
              <FileText size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-bold truncate">XX市政道路...招标文件.pdf</p>
                <CheckCircle2 className="text-green-500" size={16} />
              </div>
              <p className="text-[11px] text-slate-400">招标文件 • 11.9 MB</p>
            </div>
          </div>
          <div className="p-4 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/30 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50/50 transition-colors">
            <UploadCloud className="text-primary" size={24} />
            <div className="text-center">
              <p className="text-[13px] text-primary font-bold">点击上传控制价文件</p>
              <p className="text-[11px] text-slate-400">支持 PDF、Word、ZF、CF 格式</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
          <h3 className="font-bold text-sm">投标文件版本</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded text-xs font-medium hover:bg-slate-50">+ 添加版本</button>
            <button className="px-3 py-1.5 bg-primary text-white rounded text-xs font-medium hover:bg-primary/90 flex items-center gap-1">
              <CheckCircle2 size={14} /> 全部检查
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { name: '投标文件-最终版', time: '2026-03-01 10:00', desc: '最终确认版本，准备递交', status: [0, 0, 0] },
            { name: '投标文件-修订版2', time: '2026-02-20 15:30', desc: '针对技术响应点进行了优化', status: [1, 2, 0] },
            { name: '投标文件-修订版1', time: '2026-02-10 09:15', desc: '补充了部分业绩证明材料', status: [1, 3, 1] },
          ].map((v, i) => (
            <div key={i} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{v.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{v.time} | {v.desc}</p>
              </div>
              <div className="flex items-center gap-3 mr-8">
                {['资信', '技术', '经济'].map((tag, idx) => {
                  const s = v.status[idx];
                  return (
                    <span key={tag} className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-[11px] ${
                      s === 1 ? 'border-green-100 bg-green-50 text-green-600' :
                      s === 2 ? 'border-blue-100 bg-blue-50 text-blue-600' :
                      s === 3 ? 'border-orange-100 bg-orange-50 text-orange-600' :
                      'border-slate-200 text-slate-400'
                    }`}>
                      {s === 1 && <CheckCircle2 size={12} />}
                      {s === 2 && <History size={12} className="animate-spin" />}
                      {s === 3 && <AlertTriangle size={12} />}
                      {s === 0 && <span className="size-1.5 rounded-full border border-slate-300"></span>}
                      {tag}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleStartCheck(v)}
                  className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-50"
                >
                  开始检查
                </button>
                <button className="p-1 text-slate-400 hover:text-red-600 transition-colors" title="删除"><Trash2 size={18} /></button>
                <ChevronRight className="text-slate-300" size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showClarificationModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowClarificationModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileSearch size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">发现最新答疑文件</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  系统检测到该项目已上传最新的答疑/澄清文件。为了确保检查结果的准确性，建议导入最新答疑内容进行比对检查。
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setUseClarification(true);
                      setShowClarificationModal(false);
                      // Proceed with check
                      console.log('Starting check with clarification for:', selectedVersion?.name);
                    }}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> 导入最新答疑文件检查
                  </button>
                  <button
                    onClick={() => {
                      setUseClarification(false);
                      setShowClarificationModal(false);
                      // Proceed with check
                      console.log('Starting check with original for:', selectedVersion?.name);
                    }}
                    className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                  >
                    暂不导入，按原招标文件检查
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResourceCenterView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'receipts' | 'personnel' | 'performance'>('receipts');

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 border-b border-slate-100 bg-white">
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          {[
            { id: 'receipts', label: '项目回执', icon: Receipt },
            { id: 'personnel', label: '人员库', icon: Users },
            { id: 'performance', label: '业绩库', icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
        {activeTab === 'receipts' && (
          <motion.div
            key="receipts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: '待处理回执', count: '1', color: 'orange', icon: AlertTriangle },
                { label: '已确认回执', count: '2', color: 'green', icon: CheckCircle2 },
                { label: '累计缴纳金额', count: '¥250,500.00', color: 'primary', icon: Receipt },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color === 'primary' ? 'primary' : stat.color + '-500'}`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xl font-black text-slate-900">{stat.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '标书费缴纳回执', status: '已上传', date: '2026-03-10', amount: '¥500.00', file: 'receipt_bid_fee.pdf' },
              { title: '投标保证金缴纳回执', status: '已上传', date: '2026-03-12', amount: '¥250,000.00', file: 'receipt_security_deposit.pdf' },
              { title: '开标记录表回执', status: '待上传', date: '-', amount: '-', file: null },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.status === '已上传' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                      <Receipt size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">更新时间: {item.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    item.status === '已上传' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-sm font-bold text-slate-700">{item.amount}</span>
                  <div className="flex gap-2">
                    {item.file ? (
                      <>
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="查看"><Eye size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="下载"><Download size={18} /></button>
                      </>
                    ) : (
                      <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded hover:bg-primary/90 flex items-center gap-1">
                        <UploadCloud size={14} /> 立即上传
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'personnel' && (
          <motion.div
            key="personnel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: '总人数', count: '42', icon: Users, color: 'blue' },
                { label: '项目经理', count: '8', icon: User, color: 'indigo' },
                { label: '技术负责人', count: '12', icon: ShieldCheck, color: 'emerald' },
                { label: '证书预警', count: '3', icon: AlertTriangle, color: 'orange' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-lg flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                      <stat.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-lg font-black text-slate-900">{stat.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索姓名、职称、证书..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2">
                <Plus size={16} /> 新增人员
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">姓名</th>
                    <th className="px-6 py-4 font-bold">拟派岗位</th>
                    <th className="px-6 py-4 font-bold">职称/证书</th>
                    <th className="px-6 py-4 font-bold">证书有效期</th>
                    <th className="px-6 py-4 font-bold text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: '张建国', role: '项目经理', cert: '一级建造师（市政）', expiry: '2027-05-20', status: '有效' },
                    { name: '李晓明', role: '技术负责人', cert: '高级工程师', expiry: '2028-11-15', status: '有效' },
                    { name: '王志强', role: '安全员', cert: '安全生产考核合格证(C证)', expiry: '2026-09-10', status: '有效' },
                    { name: '赵敏', role: '造价员', cert: '一级造价工程师', expiry: '2026-03-25', status: '即将过期' },
                  ].map((person, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs">
                            {person.name.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-slate-900">{person.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{person.role}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[11px] font-medium">{person.cert}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-600">{person.expiry}</span>
                          <span className={`text-[10px] font-bold ${person.status === '有效' ? 'text-green-500' : 'text-orange-500'}`}>
                            {person.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Eye size={18} /></button>
                          <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit3 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: '累计业绩数量', count: '156', icon: Trophy, color: 'amber' },
                { label: '近一年业绩', count: '24', icon: Calendar, color: 'blue' },
                { label: '累计中标金额', count: '¥12.8 亿', icon: Receipt, color: 'emerald' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xl font-black text-slate-900">{stat.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
            {[
              { title: '某市中心城区道路改造工程', amount: '¥4,500.00万', date: '2024-12-20', client: '某市住房和城乡建设局', tags: ['市政', '道路', '4000万+'] },
              { title: '高新区智慧交通系统建设项目', amount: '¥2,800.00万', date: '2025-05-15', client: '高新区管委会', tags: ['智慧交通', '弱电', '2000万+'] },
              { title: '滨江公园景观提升工程（二期）', amount: '¥1,200.00万', date: '2023-08-10', client: '某区园林绿化局', tags: ['园林', '景观', '1000万+'] },
            ].map((perf, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <Trophy size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{perf.title}</h4>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={16} />
                        {perf.client}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        竣工日期: {perf.date}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {perf.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right space-y-4">
                    <div className="text-xl font-bold text-primary">{perf.amount}</div>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2 ml-auto">
                      查看合同及证明材料 <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);
};

const ArchiveRegisterView = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack} 
          className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-primary hover:text-primary transition-all shadow-sm group"
          title="返回"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          项目归档登记
        </h3>
      </div>
      <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">提交归档</button>
    </div>
    <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">中标单位</label>
          <input type="text" className="w-full p-2 border border-slate-200 rounded-lg" placeholder="请输入中标单位全称" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">中标金额 (万元)</label>
          <input type="number" className="w-full p-2 border border-slate-200 rounded-lg" placeholder="0.00" />
        </div>
      </div>
    </div>
  </div>
);


const PreparationPhase = ({ onNavigate, onSelect, setActiveRightTab, activeRightTab, initialProjectData, isTenderUploaded, projectData, handleProjectDataChange, uploadedFiles, setUploadedFiles }: { 
  onNavigate: (view: SubView) => void, 
  onSelect: (id: string | null) => void,
  setActiveRightTab: (id: string | null) => void,
  activeRightTab: string | null,
  initialProjectData?: any,
  isTenderUploaded: boolean,
  projectData: any,
  handleProjectDataChange: (field: string, value: string) => void,
  uploadedFiles: Record<string, boolean>,
  setUploadedFiles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) => {
  const [isParsed, setIsParsed] = useState(!!initialProjectData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showResultPage, setShowResultPage] = useState(false);
  const [showQualificationResult, setShowQualificationResult] = useState(false);
  const [showParsingPage, setShowParsingPage] = useState(false);
  const [clarificationRounds, setClarificationRounds] = useState<number>(0);
  
  // New states for upload parsing
  const [activeUpload, setActiveUpload] = useState<{ id: string; label: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<'uploading' | 'parsing' | 'comparing' | 'done'>('uploading');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [diffData, setDiffData] = useState<{ field: string; label: string; oldVal: string; newVal: string }[]>([]);

  const handleToggleUpload = (id: string) => {
    setUploadedFiles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const startUploadFlow = (cat: { id: string; label: string }) => {
    // Just toggle the upload status directly for all documents
    handleToggleUpload(cat.id);
    if (cat.id === 'tender-doc') {
      setUploadedFiles(prev => ({ ...prev, 'tender-doc': true }));
    }
  };

  const applyChanges = () => {
    diffData.forEach(diff => {
      handleProjectDataChange(diff.field, diff.newVal);
    });
    if (activeUpload) {
      handleToggleUpload(activeUpload.id);
      if (activeUpload.id === 'tender-doc') {
        setUploadedFiles(prev => ({ ...prev, 'tender-doc': true }));
      }
    }
    setIsUploading(false);
    setActiveUpload(null);
  };

  const skipChanges = () => {
    if (activeUpload) {
      handleToggleUpload(activeUpload.id);
      if (activeUpload.id === 'tender-doc') {
        setUploadedFiles(prev => ({ ...prev, 'tender-doc': true }));
      }
    }
    setIsUploading(false);
    setActiveUpload(null);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResultPage(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  if (showQualificationResult) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 h-[calc(100vh-300px)] overflow-y-auto">
        <h2 className="text-2xl font-black text-slate-900 mb-6">资格审查结果</h2>
        <div className="p-4 bg-emerald-50 rounded-lg text-emerald-700 font-bold">
          审查通过：符合所有投标资格要求。
        </div>
        <button 
          onClick={() => setShowQualificationResult(false)}
          className="mt-6 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200"
        >
          返回解析结果
        </button>
      </div>
    );
  }

  if (showResultPage) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 h-[calc(100vh-300px)] overflow-y-auto">
        <h2 className="text-2xl font-black text-slate-900 mb-6">解析报告</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg text-blue-700 font-bold">解析完成，已提取项目基本信息。</div>
          <button 
            onClick={() => setShowQualificationResult(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90"
          >
            执行投标资格审查
          </button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] bg-white rounded-xl border border-slate-200 shadow-sm p-12">
        <h2 className="text-3xl font-black text-slate-900 mb-4">正在解析招标文件，请稍候</h2>
        <p className="text-slate-400 mb-8">预计需要5-10分钟，解析过程中可关闭此页面</p>
        <div className="w-full max-w-2xl bg-slate-100 rounded-full h-4 mb-4">
          <div className="bg-primary h-4 rounded-full transition-all duration-300" style={{ width: `${analysisProgress}%` }}></div>
        </div>
        <p className="text-slate-600 font-bold">{analysisProgress}%</p>
      </div>
    );
  }

  const baseCategories = [
    { id: 'tender-doc', label: '招标文件', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'tender-list', label: '招标清单', icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'tender-price', label: '控制价文件', icon: Receipt, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const otherCategories = [
    { id: 'filing', label: '项目备案', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'other', label: '其他信息', icon: Info, color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  if (!isParsed) {
    return (
      <div className="flex gap-6 h-[calc(100vh-450px)] min-h-[600px]">
        {/* Left: Upload & History */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Upload Area */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center flex-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="size-24 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <UploadCloud size={48} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">点击或拖拽招标文件至此处上传</h3>
            <p className="text-slate-400 text-sm mb-8">支持 PDF、Word、ZF、CF 格式，AI将自动识别关键信息并填充表单</p>
            
            <button 
              onClick={handleStartAnalysis}
              disabled={isAnalyzing}
              className={`px-10 py-4 bg-primary text-white rounded-full font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-3 ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={24} className="animate-spin" />
                  正在解析中...
                </>
              ) : (
                <>
                  开始解析 <ArrowRight size={24} />
                </>
              )}
            </button>
          </div>

          {/* History Record */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h4 className="font-black text-slate-900 flex items-center gap-2">
                <History size={18} className="text-slate-400" />
                历史记录
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">文件名称</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">解析时间</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">状态</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: '城市道路绿化工程招标文件.pdf', time: '2023-11-15 10:30', status: '已完成' },
                    { name: '智慧交通系统集成项目招标文件.docx', time: '2023-11-14 15:45', status: '已完成' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-primary" />
                          <span className="text-sm font-bold text-slate-700">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-xs text-slate-400 font-medium">{item.time}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-tighter">{item.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:underline text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity">查看详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Quick Start */}
        <div className="w-96 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <Scan size={18} className="text-primary" />
              快速入门
            </h4>
          </div>
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative mb-8">
              <div className="size-48 bg-blue-50 rounded-full flex items-center justify-center relative z-10">
                <img 
                  src="https://picsum.photos/seed/analysis/400/400" 
                  alt="Analysis Illustration" 
                  className="size-32 object-contain rounded-xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-4 -right-4 size-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary z-20 animate-bounce">
                <Search size={32} />
              </div>
            </div>
            <h5 className="text-lg font-black text-slate-900 mb-3">检查完成 查看检查结果</h5>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">上传招标文件后，系统将自动进行深度解析，提取关键信息并识别潜在风险。</p>
            
            <div className="w-full space-y-4 text-left">
              {[
                { label: '核心内容', desc: '自动提取项目名称、编号、预算等' },
                { label: '注意事项', desc: '识别工期、质量、支付等关键条款' },
                { label: '自定义检查', desc: '根据企业标准进行合规性审查' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="size-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 mb-0.5">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showParsingPage) {
    return <BidParsing autoImported={isTenderUploaded} uploadedFiles={uploadedFiles} onBack={() => setShowParsingPage(false)} />;
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-300px)] min-h-[700px] relative">
      {/* Left: Project Info & Uploads */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-y-auto p-8 shadow-sm space-y-8 custom-scrollbar">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Info size={20} className="text-primary" />
            项目基本信息
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-medium italic">所有字段均可编辑</span>
            <button 
              onClick={() => {
                // Mock save action
                const btn = document.getElementById('save-btn');
                if (btn) {
                  btn.innerHTML = '<span class="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 已保存</span>';
                  btn.classList.add('bg-green-500', 'text-white', 'border-green-500');
                  btn.classList.remove('bg-white', 'text-primary', 'border-primary/20');
                  
                  // Force a re-render by updating a dummy state or just relying on the existing projectData state
                  // Since projectData is already in state, it should re-render automatically.
                  // The issue might be that the header is using a different object or not observing the change.
                  // Let's ensure the component re-renders.
                  
                  setTimeout(() => {
                    btn.innerHTML = '保存修改';
                    btn.classList.remove('bg-green-500', 'text-white', 'border-green-500');
                    btn.classList.add('bg-white', 'text-primary', 'border-primary/20');
                  }, 2000);
                }
              }}
              id="save-btn"
              className="px-4 py-1.5 bg-white border border-primary/20 text-primary rounded-lg text-xs font-bold hover:bg-primary/5 transition-all"
            >
              保存修改
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">项目名称</label>
            <input 
              type="text" 
              value={projectData.projectName}
              onChange={(e) => handleProjectDataChange('projectName', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">项目编号</label>
            <input 
              type="text" 
              value={projectData.projectNumber}
              onChange={(e) => handleProjectDataChange('projectNumber', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">开标时间</label>
            <input 
              type="text" 
              value={projectData.openingTime}
              onChange={(e) => handleProjectDataChange('openingTime', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">招标人及联系方式</label>
            <input 
              type="text" 
              value={projectData.tendererAndContact || projectData.tenderer}
              onChange={(e) => handleProjectDataChange('tendererAndContact', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">招标代理及联系方式</label>
            <input 
              type="text" 
              value={projectData.tenderAgentAndContact || projectData.tenderAgent}
              onChange={(e) => handleProjectDataChange('tenderAgentAndContact', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">保证金金额</label>
            <input 
              type="text" 
              value={projectData.depositAmount}
              onChange={(e) => handleProjectDataChange('depositAmount', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">文件领取时间</label>
            <input 
              type="text" 
              value={projectData.collectionTime}
              onChange={(e) => handleProjectDataChange('collectionTime', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">保证金缴纳截止时间</label>
            <input 
              type="text" 
              value={projectData.depositDeadline}
              onChange={(e) => handleProjectDataChange('depositDeadline', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">开标地点</label>
            <input 
              type="text" 
              value={projectData.openingLocation}
              onChange={(e) => handleProjectDataChange('openingLocation', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="col-span-2 space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">招标要求</label>
            <textarea 
              value={projectData.tenderRequirements}
              onChange={(e) => handleProjectDataChange('tenderRequirements', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm resize-none"
            />
          </div>
          <div className="col-span-2 space-y-1.5">
            <label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-wider">其他备注</label>
            <textarea 
              value={projectData.otherRemarks}
              onChange={(e) => handleProjectDataChange('otherRemarks', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm resize-none"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <UploadCloud size={20} className="text-primary" />
              准备阶段文件上传
            </h3>
            <button 
              onClick={() => setClarificationRounds(prev => prev + 1)}
              className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-1.5"
            >
              <Plus size={14} />
              添加答疑环节
            </button>
          </div>
          
          <div className="space-y-8">
            {/* Base Documents Group */}
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
                招标基础文件
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {baseCategories.map((cat) => {
                  const isUploaded = uploadedFiles[cat.id] || (cat.id === 'tender-doc' && isTenderUploaded);
                  return (
                    <div 
                      key={cat.id} 
                      onClick={() => {
                        if (!isUploaded) {
                          startUploadFlow(cat);
                        } else {
                          handleToggleUpload(cat.id);
                          if (cat.id === 'tender-doc') {
                            setUploadedFiles(prev => ({ ...prev, 'tender-doc': !isTenderUploaded }));
                          }
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all group cursor-pointer ${
                        isUploaded 
                          ? 'bg-blue-50/50 border-blue-200 hover:border-blue-300' 
                          : 'bg-white border-slate-100 hover:border-primary/30 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`size-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${
                          isUploaded ? 'bg-blue-100 text-blue-600' : `${cat.bg} ${cat.color}`
                        }`}>
                          {isUploaded ? <CheckCircle2 size={20} /> : <cat.icon size={20} />}
                        </div>
                        <span className="text-sm font-black text-slate-700">{cat.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-medium ${isUploaded ? 'text-blue-500' : 'text-slate-400'}`}>
                          {isUploaded ? '已上传文件' : '未上传文件'}
                        </span>
                        <button className={`text-[10px] font-black hover:underline ${isUploaded ? 'text-blue-600' : 'text-primary'}`}>
                          {isUploaded ? '重新上传' : '点击上传'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clarification Rounds */}
            {Array.from({ length: clarificationRounds }).map((_, index) => (
              <div key={index} className="bg-purple-50/30 p-6 rounded-2xl border border-purple-100 relative group/round">
                <button 
                  onClick={() => setClarificationRounds(prev => Math.max(0, prev - 1))}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover/round:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1 h-3 bg-purple-500 rounded-full"></span>
                  第 {index + 1} 次答疑文件
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: `clar-doc-${index}`, label: '答疑文件', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { id: `clar-list-${index}`, label: '答疑清单', icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                    { id: `clar-price-${index}`, label: '答疑控制价', icon: Receipt, color: 'text-amber-600', bg: 'bg-amber-100' },
                  ].map((cat) => {
                    const isUploaded = uploadedFiles[cat.id];
                    return (
                      <div 
                        key={cat.id} 
                        onClick={() => {
                          if (!isUploaded) {
                            startUploadFlow(cat);
                          } else {
                            handleToggleUpload(cat.id);
                          }
                        }}
                        className={`p-4 rounded-2xl border transition-all group cursor-pointer ${
                          isUploaded 
                            ? 'bg-purple-100/50 border-purple-200 hover:border-purple-300' 
                            : 'bg-white border-purple-100/50 hover:border-purple-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`size-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${
                            isUploaded ? 'bg-purple-200 text-purple-700' : `${cat.bg} ${cat.color}`
                          }`}>
                            {isUploaded ? <CheckCircle2 size={20} /> : <cat.icon size={20} />}
                          </div>
                          <span className="text-sm font-black text-slate-700">{cat.label}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-medium ${isUploaded ? 'text-purple-600' : 'text-slate-400'}`}>
                            {isUploaded ? '已上传文件' : '未上传文件'}
                          </span>
                          <button className={`text-[10px] font-black hover:underline ${isUploaded ? 'text-purple-600' : 'text-primary'}`}>
                            {isUploaded ? '重新上传' : '点击上传'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Other Documents */}
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1 h-3 bg-slate-400 rounded-full"></span>
                其他材料
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {otherCategories.map((cat) => {
                  const isUploaded = uploadedFiles[cat.id];
                  return (
                    <div 
                      key={cat.id} 
                      onClick={() => handleToggleUpload(cat.id)}
                      className={`p-4 rounded-2xl border transition-all group cursor-pointer ${
                        isUploaded 
                          ? 'bg-blue-50/50 border-blue-200 hover:border-blue-300' 
                          : 'bg-white border-slate-100 hover:border-primary/30 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`size-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${
                          isUploaded ? 'bg-blue-100 text-blue-600' : `${cat.bg} ${cat.color}`
                        }`}>
                          {isUploaded ? <CheckCircle2 size={20} /> : <cat.icon size={20} />}
                        </div>
                        <span className="text-sm font-black text-slate-700">{cat.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-medium ${isUploaded ? 'text-blue-500' : 'text-slate-400'}`}>
                          {isUploaded ? '已上传文件' : '未上传文件'}
                        </span>
                        <button className={`text-[10px] font-black hover:underline ${isUploaded ? 'text-blue-600' : 'text-primary'}`}>
                          {isUploaded ? '重新上传' : '点击上传'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload & Parsing Modal */}
      <AnimatePresence>
        {isUploading && activeUpload && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => {
                if (uploadStep === 'comparing') setIsUploading(false);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-50 px-8 py-6 border-bottom border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <UploadCloud size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {uploadStep === 'uploading' && '正在上传文件...'}
                      {uploadStep === 'parsing' && 'AI 正在解析文件...'}
                      {uploadStep === 'comparing' && '解析结果对比'}
                    </h3>
                    <p className="text-slate-500 text-sm">{activeUpload.label}</p>
                  </div>
                </div>
                {uploadStep === 'comparing' && (
                  <button 
                    onClick={() => setIsUploading(false)}
                    className="size-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                {(uploadStep === 'uploading' || uploadStep === 'parsing') && (
                  <div className="space-y-8 py-4">
                    <div className="flex justify-between text-sm font-black text-slate-700 mb-2">
                      <span>{uploadStep === 'uploading' ? '上传进度' : 'AI 解析进度'}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm bg-blue-50 p-4 rounded-xl">
                      <RefreshCw size={16} className="animate-spin text-primary" />
                      <span>
                        {uploadStep === 'uploading' ? '正在安全传输文件到服务器...' : 'AI 正在提取项目关键信息，请稍候...'}
                      </span>
                    </div>
                  </div>
                )}

                {uploadStep === 'comparing' && (
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                      <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="text-sm font-black text-amber-900">检测到项目信息变动</h4>
                        <p className="text-xs text-amber-700 leading-relaxed mt-1">
                          解析出的文件内容与当前项目信息存在差异。请核对以下变动，并选择是否更新项目数据。
                        </p>
                      </div>
                    </div>

                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-bottom border-slate-100">
                            <th className="px-4 py-3 font-black text-slate-500 uppercase tracking-wider text-[10px]">信息项</th>
                            <th className="px-4 py-3 font-black text-slate-500 uppercase tracking-wider text-[10px]">当前值</th>
                            <th className="px-4 py-3 font-black text-slate-500 uppercase tracking-wider text-[10px]">解析值</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {diffData.map((diff, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-4 py-4 font-bold text-slate-700">{diff.label}</td>
                              <td className="px-4 py-4 text-slate-500 line-through decoration-slate-300">{diff.oldVal || '未填写'}</td>
                              <td className="px-4 py-4 font-black text-blue-600 bg-blue-50/30">{diff.newVal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        onClick={applyChanges}
                        className="flex-1 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                      >
                        <Check size={20} /> 确认并替换更新
                      </button>
                      <button 
                        onClick={skipChanges}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                      >
                        维持现状
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Right Sidebar */}
      <div className="w-80 flex flex-col gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl -ml-8 -mb-8 transition-transform group-hover:scale-150"></div>
          
          <div className="relative z-10">
            <div className="size-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 shadow-inner">
              <FileSearch size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black mb-2">一键上传招标文件</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              快速上传招标文件，系统将自动识别并关联至当前项目，方便后续查阅与管理。
            </p>
            <button 
              onClick={() => setShowParsingPage(true)}
              className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              进入上传页面 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductionPhase = ({ onNavigate, onSelect }: { onNavigate: () => void, onSelect: (id: string | null) => void }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          当前阶段：制作阶段
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div 
        onMouseEnter={() => onSelect('file-production')}
        onMouseLeave={() => onSelect(null)}
        onClick={onNavigate}
        className="bg-primary rounded-xl p-8 text-white shadow-xl shadow-primary/20 group hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm w-fit mb-6">
            <FileText size={24} />
          </div>
          <h4 className="text-xl font-bold mb-3">文件制作</h4>
          <p className="text-blue-100 text-sm mb-10 leading-relaxed min-h-[4.5rem]">跳转至在线编辑器，进行投标文件正文编写，支持多人协同实时编辑。</p>
          <button 
            onClick={onNavigate}
            className="w-full py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            立即开始 <ArrowRight size={16} />
          </button>
        </div>
      </div>
      {[
        { id: 'ai-bid', title: 'AI编标', desc: '利用AI大模型技术自动生成资信、技术等投标文件内容，提升编写效率。', icon: BrainCircuit, btn: '智能生成', color: 'bg-blue-50 text-blue-600' },
        { id: 'material-market', title: '素材市场', desc: '提供丰富的标书素材模板，支持一键引用，快速构建高质量投标文件。', icon: LayoutGrid, btn: '浏览素材', color: 'bg-slate-50 text-slate-600' },
        { id: 'bid-rewrite', title: '标书改写', desc: '智能优化标书语言表达，增强逻辑性与结构性，使内容更符合评委习惯。', icon: Languages, btn: '优化建议', color: 'bg-slate-50 text-slate-600' },
      ].map((card, i) => (
        <div 
          key={i} 
          onMouseEnter={() => card.id !== 'bid-check' && onSelect(card.id)}
          onMouseLeave={() => onSelect(null)}
          className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer flex flex-col"
        >
          <div className={`p-3 rounded-lg w-fit mb-6 ${card.color}`}>
            <card.icon size={24} />
          </div>
          <h4 className="text-xl font-bold mb-3">{card.title}</h4>
          <p className="text-slate-400 text-sm mb-10 leading-relaxed min-h-[4.5rem]">{card.desc}</p>
          <button className="mt-auto w-full py-3.5 border border-slate-200 text-slate-700 font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
            {card.btn}
          </button>
        </div>
      ))}
    </div>
  </div>
  );
};

const InspectionPhase = ({ onNavigate, onSelect }: { onNavigate: () => void, onSelect: (id: string | null) => void }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-primary rounded-full"></span>
        当前阶段：检查阶段
      </h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer flex flex-col">
        <div className="p-3 rounded-lg w-fit mb-6 bg-emerald-50 text-emerald-600">
          <Receipt size={24} />
        </div>
        <h4 className="text-xl font-bold mb-3">保证金回执上传</h4>
        <p className="text-slate-400 text-sm mb-10 leading-relaxed min-h-[4.5rem]">上传保证金缴纳回执，确保投标资格有效性。</p>
        <button className="mt-auto w-full py-3.5 border border-slate-200 text-slate-700 font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
          立即上传
        </button>
      </div>

      <div 
        onMouseEnter={() => onSelect('bid-inspection')}
        onMouseLeave={() => onSelect(null)}
        onClick={onNavigate}
        className="bg-primary rounded-xl p-8 text-white shadow-xl shadow-primary/20 group hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <FileText size={24} />
          </div>
        </div>
        <h4 className="text-xl font-bold mb-3">标书检查</h4>
        <p className="text-blue-100 text-sm mb-10 leading-relaxed min-h-[4.5rem]">系统将自动扫描标书完整性、雷同性及格式规范，确保投标文件的有效性，降低废标风险。</p>
        <button 
          onClick={onNavigate}
          className="mt-auto w-full py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          开始检查 <ArrowRight size={16} />
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer flex flex-col">
        <div className="p-3 rounded-lg w-fit mb-6 bg-slate-50 text-slate-600">
          <Copy size={24} />
        </div>
        <h4 className="text-xl font-bold mb-3">标书查重</h4>
        <p className="text-slate-400 text-sm mb-10 leading-relaxed min-h-[4.5rem]">对标书内容进行深度查重分析，自动识别重复段落，有效降低废标风险。</p>
        <button className="mt-auto w-full py-3.5 border border-slate-200 text-slate-700 font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
          开始检测
        </button>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer flex flex-col">
        <div className="p-3 rounded-lg w-fit mb-6 bg-slate-50 text-slate-600">
          <Users size={24} />
        </div>
        <h4 className="text-xl font-bold mb-3">模拟开标</h4>
        <p className="text-slate-400 text-sm mb-10 leading-relaxed min-h-[4.5rem]">模拟线上开标流程，提前熟悉系统操作，进行数字证书（CA）验证及加解密测试，确保正式开标顺利进行。</p>
        <button className="mt-auto w-full py-3.5 border border-slate-200 text-slate-700 font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
          进入模拟
        </button>
      </div>
    </div>
  </div>
);

const ArchivingPhase = ({ onNavigate }: { onNavigate: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openingRecords, setOpeningRecords] = useState([
    { name: '城市基础设施二期项目', time: '2023-12-20', loc: '市公共资源交易中心', units: '5家', price: '¥1,210.5万', rank: '1' },
    { name: '智慧交通一期工程', time: '2022-05-12', loc: '省招标中心', units: '8家', price: '¥850.0万', rank: '2' },
  ]);
  const [winningRecords, setWinningRecords] = useState([
    { unit: '某某建设集团有限公司', amount: '¥1,210.5万', date: '2023-12-25', url: 'http://ggzy.example.com/...' },
  ]);
  const [contractRecords, setContractRecords] = useState([
    { id: 'HT-2024-001', name: '城市基础设施施工合同', date: '2024-01-05', amount: '¥1,180.0万', owner: '陈经理', status: '履行中' },
  ]);
  const [archiveRecords, setArchiveRecords] = useState([
    { id: 'GD-2024-008', date: '2024-02-15', loc: '档案室-A区-03柜', person: '张美玲' },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you'd send data to a server here
  };

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

  const updateArchive = (index: number, field: string, value: string) => {
    const newRecords = [...archiveRecords];
    (newRecords[index] as any)[field] = value;
    setArchiveRecords(newRecords);
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          标后归档管理
        </h3>
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Download size={16} />
            导出记录
          </button>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/5 transition-all flex items-center gap-2"
            >
              <Edit3 size={16} />
              修改记录
            </button>
          ) : (
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <Check size={16} />
              保存全部
            </button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Opening Records Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ClipboardList size={20} className="text-primary" />
            <h4>开标记录</h4>
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
                        />
                      ) : (
                        <span className="text-sm text-slate-600">{row.units}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.price} 
                          onChange={(e) => updateOpening(i, 'price', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-mono"
                        />
                      ) : (
                        <span className="font-mono text-sm text-primary font-bold">{row.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.rank} 
                          onChange={(e) => updateOpening(i, 'rank', e.target.value)}
                          className="w-16 border border-slate-200 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.rank === '1' ? 'bg-yellow-50 text-yellow-600' : 'bg-slate-100 text-slate-500'}`}>
                          第{row.rank}名
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
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Trophy size={20} className="text-primary" />
            <h4>中标记录</h4>
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
                        />
                      ) : (
                        <span className="font-bold text-slate-900 text-sm">{row.unit}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.amount} 
                          onChange={(e) => updateWinning(i, 'amount', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-mono"
                        />
                      ) : (
                        <span className="font-mono text-sm text-green-600 font-bold">{row.amount}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.date} 
                          onChange={(e) => updateWinning(i, 'date', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-600">{row.date}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.url} 
                          onChange={(e) => updateWinning(i, 'url', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-primary"
                        />
                      ) : (
                        <a href="#" className="text-primary hover:underline text-xs flex items-center gap-1">
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

        {/* Contract Management Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Receipt size={20} className="text-primary" />
            <h4>合同管理</h4>
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
                          <p className="text-sm font-bold text-slate-900">{row.name}</p>
                          <p className="text-[10px] text-slate-400">{row.id}</p>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.date} 
                          onChange={(e) => updateContract(i, 'date', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-600">{row.date}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.amount} 
                          onChange={(e) => updateContract(i, 'amount', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-mono font-bold"
                        />
                      ) : (
                        <span className="font-mono text-sm text-slate-900 font-bold">{row.amount}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.owner} 
                          onChange={(e) => updateContract(i, 'owner', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-600">{row.owner}</span>
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
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600">
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

        {/* Project Archiving Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <FolderOpen size={20} className="text-primary" />
            <h4>项目归档</h4>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="px-6 py-4">归档编号</th>
                  <th className="px-6 py-4">归档日期</th>
                  <th className="px-6 py-4">存放位置</th>
                  <th className="px-6 py-4">移交人</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {archiveRecords.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.id} 
                          onChange={(e) => updateArchive(i, 'id', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm font-mono font-bold"
                        />
                      ) : (
                        <span className="font-mono text-sm text-slate-900 font-bold">{row.id}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.date} 
                          onChange={(e) => updateArchive(i, 'date', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-600">{row.date}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.loc} 
                          onChange={(e) => updateArchive(i, 'loc', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-600">{row.loc}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          value={row.person} 
                          onChange={(e) => updateArchive(i, 'person', e.target.value)}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-600">{row.person}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

const AnnotationView = ({ onBack }: { onBack: () => void }) => (
  <div className="h-[calc(100vh-200px)] flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="size-8 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-600">
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <PenTool size={18} className="text-primary" />
          在线批注模式
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
          <Download size={14} /> 导出批注
        </button>
        <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
          <Share2 size={14} /> 协作分享
        </button>
      </div>
    </div>
    
    <div className="flex-1 flex overflow-hidden">
      {/* Document Viewer Area */}
      <div className="flex-1 overflow-y-auto p-12 bg-slate-100/50 shadow-inner">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl p-20 min-h-[1500px] relative border border-slate-200">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">城市基础设施二期项目</h1>
            <h2 className="text-2xl font-bold text-slate-500">招标文件</h2>
            <div className="mt-8 flex justify-center gap-8 text-sm text-slate-400 font-medium">
              <span>项目编号：BID-2023-00892</span>
              <span>发布日期：2023-11-15</span>
            </div>
          </div>

          <div className="space-y-12 text-slate-800 leading-relaxed text-lg">
            <section>
              <h3 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-100 pb-3 flex items-center gap-3">
                <span className="size-8 bg-slate-900 text-white rounded flex items-center justify-center text-sm">01</span>
                第一章 招标公告
              </h3>
              <p className="mb-4">受招标人委托，对城市基础设施二期项目进行公开招标。本项目已具备招标条件，现欢迎符合条件的投标人参加投标。</p>
              <p>1.1 项目概况：本项目主要包含城市道路绿化、照明系统升级及智慧交通设施建设。</p>
            </section>

            <section className="relative">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-100 pb-3 flex items-center gap-3">
                <span className="size-8 bg-slate-900 text-white rounded flex items-center justify-center text-sm">02</span>
                第二章 投标人须知
              </h3>
              <div className="relative group">
                <p className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg shadow-sm transition-all hover:bg-blue-100/50">
                  <span className="font-bold text-blue-700 block mb-1">2.1 技术参数要求：</span>
                  本项目涉及的所有智慧交通感应设备必须符合国家 GB/T 12345-2023 标准，且具备行业领先水平，支持 5G 毫秒级响应。
                </p>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 size-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-black shadow-xl border-4 border-white cursor-pointer hover:scale-125 transition-all animate-pulse">
                  1
                </div>
              </div>
              <p className="mt-6">2.2 投标有效期：自投标截止之日起 90 个日历天内有效。</p>
            </section>

            <section className="relative">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 border-b-2 border-slate-100 pb-3 flex items-center gap-3">
                <span className="size-8 bg-slate-900 text-white rounded flex items-center justify-center text-sm">03</span>
                第三章 商务条款
              </h3>
              <div className="relative group">
                <p className="bg-orange-50 border-l-4 border-orange-500 pl-6 py-4 rounded-r-lg shadow-sm transition-all hover:bg-orange-100/50">
                  <span className="font-bold text-orange-700 block mb-1">3.1 交付周期：</span>
                  中标人须在合同签订后 30 个日历天内完成所有设备的交付与安装调试，并确保系统上线运行。
                </p>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 size-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-black shadow-xl border-4 border-white cursor-pointer hover:scale-125 transition-all animate-pulse">
                  2
                </div>
              </div>
              <p className="mt-6 italic text-slate-400 text-base">注：逾期交付将面临每日合同总额 0.5% 的违约金处罚。</p>
            </section>
          </div>
        </div>
      </div>

      {/* Annotations Sidebar */}
      <div className="w-80 border-l border-slate-100 bg-white flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h4 className="font-black text-slate-900 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm">
              <PenTool size={16} className="text-primary" />
              批注列表
            </span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full">2 条记录</span>
          </h4>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {[
            { id: 1, user: '张工', role: '技术专家', time: '10:30', content: '此处技术参数需进一步核实，GB/T 标准可能有更新版本。', type: 'technical' },
            { id: 2, user: '李经理', role: '商务总监', time: '昨天', content: '30天的交付周期对于目前的供应链情况来说极具挑战。', type: 'business' },
          ].map((note, i) => (
            <div key={i} className="group relative bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="size-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black">
                    {note.user[0]}
                  </div>
                  <span className="text-[10px] font-black text-slate-900">{note.user}</span>
                </div>
                <span className="text-[10px] text-slate-400">{note.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{note.content}</p>
              <div className={`absolute -left-px top-4 w-1 h-8 rounded-r-full ${note.type === 'technical' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
            </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-[10px] font-black hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
            <Plus size={14} /> 添加新批注
          </button>
        </div>
      </div>
    </div>
  </div>
);

const KeyInfoView = ({ onBack }: { onBack: () => void }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="size-10 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-bold text-slate-900">关键信息提取</h3>
      </div>
    </div>
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={20} />
              AI 智能提取结果
            </h4>
            <div className="space-y-4">
              {[
                { label: '项目名称', value: '城市基础设施二期项目', icon: FileText },
                { label: '招标编号', value: 'BID-2023-00892', icon: Fingerprint },
                { label: '预算金额', value: '¥12,500,000.00', icon: Receipt },
                { label: '开标时间', value: '2023-12-20 09:30', icon: Calendar },
                { label: '建设地点', value: '某市高新区核心区', icon: Building2 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-indigo-50 shadow-sm">
                  <div className="size-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-400">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">原文对照</h4>
            <div className="bg-white p-6 rounded-xl border border-slate-100 text-sm text-slate-500 leading-relaxed h-[400px] overflow-y-auto">
              <p className="mb-4 font-bold text-slate-800">第一章 招标公告</p>
              <p className="mb-4 underline decoration-indigo-300 decoration-2 underline-offset-4 bg-indigo-50/50">1. 项目名称：城市基础设施二期项目</p>
              <p className="mb-4 underline decoration-indigo-300 decoration-2 underline-offset-4 bg-indigo-50/50">2. 招标编号：BID-2023-00892</p>
              <p className="mb-4 underline decoration-indigo-300 decoration-2 underline-offset-4 bg-indigo-50/50">3. 预算金额：人民币壹仟贰佰伍拾万元整（¥12,500,000.00）</p>
              <p className="mb-4 underline decoration-indigo-300 decoration-2 underline-offset-4 bg-indigo-50/50">4. 开标时间：2023年12月20日 09时30分</p>
              <p>...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const QualificationView = ({ onBack }: { onBack: () => void }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="size-10 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-bold text-slate-900">资格审查详情</h3>
      </div>
    </div>
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: '营业执照', status: '已匹配', desc: '具备独立法人资格，营业执照在有效期内。', match: '企业资料库-营业执照.pdf' },
              { title: '资质等级', status: '已匹配', desc: '具备市政公用工程施工总承包二级及以上资质。', match: '企业资料库-市政二级资质.pdf' },
              { title: '安全生产许可证', status: '待核验', desc: '具备有效的安全生产许可证。', match: '未找到匹配文件' },
              { title: '项目经理资格', status: '已匹配', desc: '拟派项目经理须具备二级及以上注册建造师。', match: '人员库-王工-二级建造师.pdf' },
              { title: '财务要求', status: '已匹配', desc: '近三年财务状况良好，无亏损。', match: '财务库-2022审计报告.pdf' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-bold text-slate-900">{item.title}</h5>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === '已匹配' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}>{item.status}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 p-3 rounded-lg">
                  <FileText size={14} />
                  匹配依据：{item.match}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={20} />
              审查总结
            </h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">通过项</span>
                <span className="text-2xl font-black text-emerald-400">4/5</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[80%]"></div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                目前尚缺“安全生产许可证”的匹配依据，请尽快从企业资料库中同步或手动上传。
              </p>
              <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all">
                同步资料库
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RiskView = ({ onBack }: { onBack: () => void }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="size-10 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-bold text-slate-900">风险预警报告</h3>
      </div>
    </div>
    <div className="p-8">
      <div className="space-y-8">
        {[
          { title: '重大废标风险', level: '高', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', content: '招标文件第2.1.5条要求提供“近五年同类项目业绩”，且单项合同额不低于1000万。我司目前仅有一项符合要求的业绩，若该业绩被评委质疑，将面临废标风险。' },
          { title: '合同条款风险', level: '中', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', content: '合同第5.2条约定的违约金比例为每日0.5%，高于行业惯例（通常为0.05%-0.1%）。建议在答疑环节提出修改建议，或在成本核算中预留风险金。' },
          { title: '技术参数歧义', level: '低', icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', content: '技术规格书第12页关于“感应器灵敏度”的描述存在歧义，未明确具体数值范围。需通过答疑澄清。' },
        ].map((risk, i) => (
          <div key={i} className={`${risk.bg} ${risk.border} border rounded-2xl p-8`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-xl bg-white flex items-center justify-center ${risk.color} shadow-sm`}>
                  <risk.icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{risk.title}</h4>
                  <span className={`text-xs font-black uppercase tracking-widest ${risk.color}`}>风险等级：{risk.level}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                生成答疑函
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">{risk.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Workbench;
