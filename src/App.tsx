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
import SystemSettings from './components/SystemSettings';
import EnterpriseInfo from './components/EnterpriseInfo';
import Certificates from './components/Certificates';
import Materials from './components/Materials';

import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workbenchStage, setWorkbenchStage] = useState<string | undefined>(undefined);
  const [projectData, setProjectData] = useState<any>(null);
  const [autoImported, setAutoImported] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, boolean>>({});

  const [enterprises, setEnterprises] = useState([
    { id: '1', name: '杭州某某科技有限公司' },
    { id: '2', name: '上海分公司' },
    { id: '3', name: '北京研发中心' },
  ]);
  const [currentEnterprise, setCurrentEnterprise] = useState(enterprises[0]);

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
        return <Dashboard onEnterWorkbench={handleEnterWorkbench} setActiveTab={setActiveTab} currentEnterprise={currentEnterprise} />;
      case 'business-dashboard':
        return <BusinessDashboard currentEnterprise={currentEnterprise} />;
      case 'workbench':
        return (
          <Workbench 
            onExit={() => setActiveTab('dashboard')} 
            initialPhase={workbenchStage as any} 
            initialProjectData={projectData}
            currentEnterprise={currentEnterprise}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        );
      case 'parsing':
        return <BidParsing autoImported={autoImported} currentEnterprise={currentEnterprise} uploadedFiles={uploadedFiles} />;
      case 'inspection':
        return <BidInspection currentEnterprise={currentEnterprise} uploadedFiles={uploadedFiles} />;
      case 'org':
        return <OrgStructure enterprisesList={enterprises} currentEnterprise={currentEnterprise} />;
      case 'enterprise':
        return <EnterpriseInfo currentEnterprise={currentEnterprise} />;
      case 'knowledge-base':
        return <Materials currentEnterprise={currentEnterprise} />;
      case 'project-registration':
        return <TenderProjectRegistration onEnterWorkbench={handleEnterWorkbench} currentEnterprise={currentEnterprise} />;
      case 'deposit-management':
        return <SecurityDepositManagement currentEnterprise={currentEnterprise} />;
      case 'opening-management':
        return <TenderOpeningStatusManagement currentEnterprise={currentEnterprise} />;
      case 'other-materials':
        return <OtherProjectMaterials currentEnterprise={currentEnterprise} />;
      case 'settings':
        return <SystemSettings currentEnterprise={currentEnterprise} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
            <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">?</span>
            </div>
            <p className="text-lg font-medium">该模块正在开发中...</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="text-primary font-bold hover:underline"
            >
              返回首页
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-light">
      {activeTab !== 'workbench' && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          enterprises={enterprises} 
          setEnterprises={setEnterprises}
          currentEnterprise={currentEnterprise}
          setCurrentEnterprise={setCurrentEnterprise}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          setActiveTab={setActiveTab} 
          enterprises={enterprises} 
          currentEnterprise={currentEnterprise}
          setCurrentEnterprise={setCurrentEnterprise}
        />
        <main className="flex-1 overflow-y-auto p-8">
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
            <p>© 2023 招标管理智能分析系统 - 数字化招采效能提升平台</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

