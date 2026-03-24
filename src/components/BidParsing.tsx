import React, { useState } from 'react';
import BidParsingList from './BidParsingList';
import BidParsingDetail from './BidParsingDetail';

interface BidParsingProps {
  onEnterWorkbench: (project: any) => void;
  currentEnterprise?: { id: string; name: string };
}

const BidParsing: React.FC<BidParsingProps> = ({ onEnterWorkbench, currentEnterprise }) => {
  const defaultProject = {
    id: '1',
    name: `2024年智慧交通管理平台建设项目`,
    code: 'ZB-2024-001',
    tenderer: 'XX市交通运输局',
    updateTime: '2023-11-20 14:30',
    status: '已解析',
    latestFile: '2024年智慧交通管理平台建设项目招标文件.pdf',
    uploadedFiles: { 'tender-doc': true }
  };

  const [view, setView] = useState<'list' | 'detail'>('detail');
  const [selectedProject, setSelectedProject] = useState<any>(defaultProject);

  const handleEnterDetail = (project: any) => {
    setSelectedProject(project);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedProject(null);
  };

  const handleViewReport = () => {
    if (selectedProject) {
      onEnterWorkbench(selectedProject);
    }
  };

  return (
    <div className="w-full h-full">
      <BidParsingDetail 
        project={selectedProject} 
        onBack={handleBackToList}
        onViewReport={handleViewReport}
        currentEnterprise={currentEnterprise}
      />
    </div>
  );
};

export default BidParsing;
