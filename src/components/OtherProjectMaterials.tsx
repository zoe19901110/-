import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  Paperclip, 
  Download,
  Eye,
  FolderOpen,
  Upload,
  X,
  ChevronLeft,
  Briefcase,
  User,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const OtherProjectMaterials: React.FC = () => {
  const [view, setView] = useState<'projects' | 'detail'>('projects');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const projects = [
    {
      id: '1',
      name: '2024年智慧交通管理平台建设项目',
      code: 'ZB-2024-001',
      tenderer: 'XX市交通运输局',
      manager: '张伟',
      materialCount: 5,
      lastUpdate: '2024-03-15'
    },
    {
      id: '2',
      name: '政务云扩容采购项目',
      code: 'ZB-2024-005',
      tenderer: 'XX市大数据局',
      manager: '李芳',
      materialCount: 3,
      lastUpdate: '2024-03-12'
    },
    {
      id: '3',
      name: '城市绿化带自动灌溉系统',
      code: 'ZB-2024-008',
      tenderer: 'XX市园林局',
      manager: '王强',
      materialCount: 2,
      lastUpdate: '2024-03-10'
    }
  ];

  const projectMaterials = [
    {
      id: 'm1',
      fileName: '技术方案初稿.pdf',
      type: '技术材料',
      uploadDate: '2024-03-15',
      size: '4.2 MB',
      uploader: '张伟'
    },
    {
      id: 'm2',
      fileName: '商务资质证明.zip',
      type: '商务材料',
      uploadDate: '2024-03-12',
      size: '12.8 MB',
      uploader: '李芳'
    }
  ];

  const handleEnterDetail = (project: any) => {
    setSelectedProject(project);
    setView('detail');
  };

  const renderProjectList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} />
          新增材料
        </button>
      </div>

      {/* Search & Filter */}
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">项目名称</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">项目编号</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">招标人</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">材料数量</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">最后更新</th>
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
                <td className="px-6 py-4 text-sm text-slate-500">{project.code}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{project.tenderer}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                    {project.materialCount}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{project.lastUpdate}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleEnterDetail(project)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all"
                  >
                    <Upload size={14} />
                    上传材料
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('projects')}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{selectedProject?.name}</h2>
            <div className="flex items-center gap-6 mt-1">
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span className="text-slate-400">项目编号:</span> {selectedProject?.code}
              </p>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span className="text-slate-400">负责人:</span> {selectedProject?.manager}
              </p>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span className="text-slate-400">最后更新:</span> {selectedProject?.lastUpdate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
          >
            <Plus size={20} />
            上传新材料
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">已上传材料</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Search size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">文件名</th>
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">大小</th>
                <th className="px-6 py-4">上传人</th>
                <th className="px-6 py-4">上传日期</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectMaterials.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-900 truncate max-w-xs" title={item.fileName}>{item.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{item.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 bg-slate-200 rounded-full overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${item.uploader}`} alt="uploader" />
                      </div>
                      <span className="text-xs text-slate-600">{item.uploader}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{item.uploadDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="预览">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="下载">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="更多">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {view === 'projects' ? renderProjectList() : renderDetailView()}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-[720px] max-h-[90vh] flex flex-col overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                      <Upload size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">上传新材料</h3>
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
                    <div className="space-y-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">关联项目</label>
                        <select 
                          defaultValue={selectedProject?.name || "请选择项目..."}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                        >
                          <option disabled>请选择项目...</option>
                          {projects.map(p => (
                            <option key={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">材料类型</label>
                        <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm">
                          <option>技术材料</option>
                          <option>商务材料</option>
                          <option>资质文件</option>
                          <option>补充说明</option>
                          <option>其他</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">选择文件</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group">
                          <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                            <Paperclip size={32} />
                          </div>
                          <p className="text-sm text-slate-600 font-bold">点击或拖拽文件上传</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">备注信息</label>
                        <textarea 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm h-32 resize-none" 
                          placeholder="请输入材料相关说明..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8 mt-auto shrink-0 sticky bottom-0 bg-white pb-2">
                      <button 
                        onClick={() => setShowAddModal(false)} 
                        className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                      >
                        开始上传
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
    </motion.div>
  );
};

export default OtherProjectMaterials;

