import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import BusinessDashboard from './components/BusinessDashboard';
import Workbench from './components/Workbench';
import BidParsing from './components/BidParsing';
import BidInspection from './components/BidInspection';
import OrgStructure from './components/OrgStructure';
import TenderProjectRegistration from './components/TenderProjectRegistration';
import SecurityDepositManagement from './components/SecurityDepositManagement';
import TenderOpeningStatusManagement from './components/TenderOpeningStatusManagement';
import OtherProjectMaterials from './components/OtherProjectMaterials';
import PersonalCenter from './components/PersonalCenter';
import EnterpriseInfo from './components/EnterpriseInfo';
import Certificates from './components/Certificates';
import Materials from './components/Materials';
import Login from './components/Login';

import { motion, AnimatePresence } from 'motion/react';
import { User, Building2 } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workbenchStage, setWorkbenchStage] = useState<string | undefined>(undefined);
  const [projectData, setProjectData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [autoImported, setAutoImported] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, boolean>>({
    'tender-doc': true
  });

  const [enterprises, setEnterprises] = useState([
    { id: 'personal', name: '陈经理', status: '13800138000' },
    { id: '1', name: '中建八局第三建设有限公司', status: '已加入' },
    { id: '2', name: '中铁建工集团有限公司', status: '已加入' },
    { id: '3', name: '中国建筑第一局(集团)有限公司', status: '审核中' },
  ]);
  const [currentEnterprise, setCurrentEnterprise] = useState(enterprises[1]);

  const handleLogin = (enterpriseId: string) => {
    const selected = enterprises.find(e => e.id === enterpriseId);
    if (selected) {
      setCurrentEnterprise(selected);
    } else if (enterpriseId === 'personal') {
      setCurrentEnterprise(enterprises[0]);
    }
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  React.useEffect(() => {
    const enterprisePrefix = currentEnterprise.id === 'personal' ? '个人' : currentEnterprise.name.substring(0, 4);
    setProjects([
      { id: '1', name: `${enterprisePrefix}2026年智慧交通管理平台建设项目`, code: 'ZB-2026-001', tenderer: 'XX市交通运输局', tendererContact: '张工 010-88888888', agent: 'XX招标代理有限公司', agentContact: '李经理 010-66666666', bidOpeningTime: '2026-05-20 10:00', status: '投标中', deposit: '¥50,000', depositDeadline: '2026-05-15 17:00', openingLocation: 'XX市公共资源交易中心 301 会议室', collectionTime: '2026-04-15', requirements: '关键招标要求、资质要求等...', otherRemarks: '', tenderControlPrice: '¥1,200,000' },
      { id: '2', name: `${enterprisePrefix}政务云扩容采购项目`, code: 'ZB-2026-005', tenderer: 'XX市大数据局', tendererContact: '王工 010-77777777', agent: 'YY咨询管理公司', agentContact: '赵经理 010-55555555', bidOpeningTime: '2026-06-15 14:30', status: '已完成', deposit: '¥30,000', depositDeadline: '2026-06-10 17:00', openingLocation: 'XX省政务中心 2楼', collectionTime: '2026-05-10', requirements: '政务云相关资质要求...', otherRemarks: '', tenderControlPrice: '¥850,000' },
      { id: '3', name: `${enterprisePrefix}城市绿化带自动灌溉系统`, code: 'ZB-2026-008', tenderer: 'XX市园林局', tendererContact: '刘工 010-99999999', agent: 'ZZ工程咨询公司', agentContact: '孙经理 010-44444444', bidOpeningTime: '2026-07-10 09:00', status: '投标中', deposit: '¥20,000', depositDeadline: '2026-07-05 17:00', openingLocation: 'XX市园林局 5楼会议室', collectionTime: '2026-06-01', requirements: '自动化灌溉系统技术指标...', otherRemarks: '', tenderControlPrice: '¥450,000' },
      { id: '4', name: `${enterprisePrefix}XX区智慧教育云平台二期`, code: 'ZB-2026-012', tenderer: 'XX区教育局', tendererContact: '陈工 010-11111111', agent: 'AA招标代理公司', agentContact: '周经理 010-22222222', bidOpeningTime: '2026-08-05 15:00', status: '投标中', deposit: '¥80,000', depositDeadline: '2026-08-01 17:00', openingLocation: 'XX区教育局 1楼大厅', collectionTime: '2026-07-01', requirements: '教育云平台二期扩容需求...', otherRemarks: '', tenderControlPrice: '¥2,100,000' },
      { id: '5', name: `${enterprisePrefix}社区养老服务中心智能化改造`, code: 'ZB-2026-015', tenderer: 'XX市民政局', tendererContact: '黄工 010-33333333', agent: 'BB项目管理公司', agentContact: '吴经理 010-44444444', bidOpeningTime: '2026-09-25 10:30', status: '投标中', deposit: '¥15,000', depositDeadline: '2026-09-20 17:00', openingLocation: 'XX市民政局 3楼', collectionTime: '2026-08-15', requirements: '适老化智能设备安装调试...', otherRemarks: '', tenderControlPrice: '¥320,000' },
      { id: '6', name: `${enterprisePrefix}XX市城市道路照明节能改造`, code: 'ZB-2026-020', tenderer: 'XX市城管局', tendererContact: '赵工 010-22223333', agent: 'CC招标代理公司', agentContact: '钱经理 010-11112222', bidOpeningTime: '2026-10-15 09:00', status: '投标中', deposit: '¥40,000', depositDeadline: '2026-10-10 17:00', openingLocation: 'XX市城管局会议室', collectionTime: '2026-09-01', requirements: 'LED节能灯具更换...', otherRemarks: '', tenderControlPrice: '¥1,500,000' },
      { id: '7', name: `${enterprisePrefix}XX区公共图书馆数字化升级`, code: 'ZB-2026-025', tenderer: 'XX区文广旅局', tendererContact: '孙工 010-55556666', agent: 'DD咨询管理公司', agentContact: '李经理 010-77778888', bidOpeningTime: '2026-11-20 14:00', status: '投标中', deposit: '¥25,000', depositDeadline: '2026-11-15 17:00', openingLocation: 'XX区图书馆', collectionTime: '2026-10-01', requirements: '数字化阅读系统...', otherRemarks: '', tenderControlPrice: '¥680,000' },
      { id: '8', name: `${enterprisePrefix}XX市污水处理厂扩容工程`, code: 'ZB-2026-030', tenderer: 'XX市水务局', tendererContact: '周工 010-33334444', agent: 'EE工程管理公司', agentContact: '郑经理 010-55556666', bidOpeningTime: '2026-12-05 09:30', status: '投标中', deposit: '¥60,000', depositDeadline: '2026-12-01 17:00', openingLocation: 'XX市水务局会议室', collectionTime: '2026-11-01', requirements: '污水处理设备...', otherRemarks: '', tenderControlPrice: '¥3,500,000' }
    ]);
  }, [currentEnterprise]);

  const handleUpdateProject = (updatedProject: any) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? { ...p, ...updatedProject } : p));
    setProjectData(updatedProject);
  };

  const handleEnterWorkbench = (stage: string, data?: any) => {
    // Map status string to Phase type
    const stageMap: Record<string, string> = {
      '准备阶段': 'preparation',
      '制作阶段': 'production',
      '检查阶段': 'inspection',
      '标后归档': 'archiving'
    };
    if (data) {
      setProjectData(data);
    }
    setWorkbenchStage(stageMap[stage] || 'preparation');
    setActiveTab('workbench');
  };

  const renderContent = () => {
    // Handle enterprise sub-tabs
    if (activeTab.startsWith('ent-')) {
      const subTab = activeTab.replace('ent-', '');
      return <EnterpriseInfo initialTab={subTab} currentEnterprise={currentEnterprise} />;
    }

    if (activeTab === 'certificates' || activeTab === 'materials') {
      return <EnterpriseInfo initialTab={activeTab} currentEnterprise={currentEnterprise} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onEnterWorkbench={handleEnterWorkbench} 
            setActiveTab={setActiveTab} 
            currentEnterprise={currentEnterprise} 
            projects={projects}
          />
        );
      case 'business-dashboard':
        return <BusinessDashboard currentEnterprise={currentEnterprise} projects={projects} />;
      case 'workbench':
        return (
          <Workbench 
            onExit={() => setActiveTab('dashboard')} 
            initialPhase={workbenchStage as any} 
            initialProjectData={projectData}
            currentEnterprise={currentEnterprise}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            onUpdateProject={handleUpdateProject}
          />
        );
      case 'parsing':
        return <BidParsing onEnterWorkbench={handleEnterWorkbench} currentEnterprise={currentEnterprise} />;
      case 'inspection':
        return <BidInspection currentEnterprise={currentEnterprise} uploadedFiles={uploadedFiles} projects={projects} />;
      case 'org':
        return <OrgStructure enterprisesList={enterprises} currentEnterprise={currentEnterprise} />;
      case 'enterprise':
        return <EnterpriseInfo currentEnterprise={currentEnterprise} />;
      case 'knowledge-base':
        return <Materials currentEnterprise={currentEnterprise} />;
      case 'project-registration':
        return <TenderProjectRegistration 
          onEnterWorkbench={handleEnterWorkbench} 
          currentEnterprise={currentEnterprise} 
          projects={projects}
          setProjects={setProjects}
        />;
      case 'deposit-management':
        return <SecurityDepositManagement currentEnterprise={currentEnterprise} projects={projects} />;
      case 'opening-management':
        return <TenderOpeningStatusManagement currentEnterprise={currentEnterprise} projects={projects} />;
      case 'other-materials':
        return <OtherProjectMaterials currentEnterprise={currentEnterprise} projects={projects} />;
      case 'personal-center':
        return <PersonalCenter currentEnterprise={currentEnterprise} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
            <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">?</span>
            </div>
            <p className="text-lg font-medium">该模块正在开发中...</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="text-[#0052CC] font-bold hover:underline"
            >
              返回首页
            </button>
          </div>
        );
    }
  };

  const handleAddEnterprise = (name: string) => {
    const newId = (enterprises.length + 1).toString();
    const newEnterprise = { id: newId, name, status: '已加入' };
    setEnterprises(prev => [...prev, newEnterprise]);
    return newId;
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg-light">
      {activeTab !== 'workbench' && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          enterprises={enterprises}
          currentEnterprise={currentEnterprise}
          setCurrentEnterprise={setCurrentEnterprise}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar 
          setActiveTab={setActiveTab} 
          enterprises={enterprises}
          currentEnterprise={currentEnterprise}
          setCurrentEnterprise={setCurrentEnterprise}
          onLogout={() => {
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
          }}
          onAddEnterprise={handleAddEnterprise}
        />
        <main className="flex-1 overflow-y-auto p-8 [scrollbar-gutter:stable]">
          <div className="max-w-[1600px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
          <footer className="mt-12 py-8 text-center text-slate-400 text-xs border-t border-slate-200">
            <p>© 2026 招标管理智能分析系统 - 数字化招采效能提升系统</p>
          </footer>
        </main>

        {/* Bottom Right Account Switcher */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => {
              if (currentEnterprise.id === 'personal') {
                // Switch to the first enterprise if available
                const enterprise = enterprises.find(e => e.id !== 'personal') || enterprises[0];
                setCurrentEnterprise(enterprise);
              } else {
                // Switch to personal
                const personal = enterprises.find(e => e.id === 'personal');
                if (personal) setCurrentEnterprise(personal);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-lg hover:shadow-xl hover:border-primary/30 transition-all group active:scale-95"
          >
            <div className={`size-8 rounded-full flex items-center justify-center transition-colors ${currentEnterprise.id === 'personal' ? 'bg-orange-50 text-orange-600' : 'bg-primary/10 text-primary'}`}>
              {currentEnterprise.id === 'personal' ? <User size={16} /> : <Building2 size={16} />}
            </div>
            <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
              {currentEnterprise.id === 'personal' ? '切换企业登录' : '切换个人登录'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

