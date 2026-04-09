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
  Edit3,
  Trash2,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Pagination from './Pagination';

interface OtherProjectMaterialsProps {
  currentEnterprise?: { id: string; name: string };
  projects?: any[];
}

interface CategoryNode {
  id: string;
  name: string;
  children: CategoryNode[];
}

const OtherProjectMaterials: React.FC<OtherProjectMaterialsProps> = ({ currentEnterprise, projects: allProjects = [] }) => {
  const [view, setView] = useState<'projects' | 'detail'>('projects');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<{ file: File; name: string }[]>([]);
  const [materialName, setMaterialName] = useState('');
  const [uploadType, setUploadType] = useState('技术材料');
  const [uploadRemarks, setUploadRemarks] = useState('');
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detailCurrentPage, setDetailCurrentPage] = useState(1);
  const [detailPageSize, setDetailPageSize] = useState(10);

  const [projects, setProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('全部文档');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryNode[]>([
    { id: 'cat-1', name: '技术材料', children: [] },
    { id: 'cat-2', name: '商务材料', children: [] },
    { id: 'cat-3', name: '新分类', children: [{ id: 'sub-1', name: '新子分类', children: [] }] }
  ]);

  const isPaused = allProjects.find(p => p.code === selectedProject?.code || p.name === selectedProject?.name)?.status === '放弃投标';

  const handleOpenAddModal = () => {
    if (isPaused) {
      alert('此项目已暂停');
      return;
    }
    setHasAttemptedSave(false);
    setShowAddModal(true);
  };

  React.useEffect(() => {
    setProjects([
      {
        id: '1',
        name: `2026年智慧交通管理平台建设项目`,
        code: 'ZB-2026-001',
        tenderer: 'XX市交通运输局',
        manager: '张伟',
        materialCount: 5,
        lastUpdate: '2026-03-15',
        hasMaterials: true
      },
      {
        id: '2',
        name: `政务云扩容采购项目`,
        code: 'ZB-2026-005',
        tenderer: 'XX市大数据局',
        manager: '李芳',
        materialCount: 3,
        lastUpdate: '2026-03-12',
        hasMaterials: true
      },
      {
        id: '3',
        name: `城市绿化带自动灌溉系统`,
        code: 'ZB-2026-008',
        tenderer: 'XX市园林局',
        manager: '王强',
        materialCount: 0,
        lastUpdate: '--',
        hasMaterials: false
      }
    ]);
  }, [currentEnterprise]);

  const [projectMaterials, setProjectMaterials] = useState([
    {
      id: 'm1',
      fileName: '技术方案初稿.pdf',
      type: '技术材料',
      uploadDate: '2026-03-15',
      size: '4.2 MB',
      uploader: '张伟'
    },
    {
      id: 'm2',
      fileName: '商务资质证明.zip',
      type: '商务材料',
      uploadDate: '2026-03-12',
      size: '12.8 MB',
      uploader: '李芳'
    },
    {
      id: 'm3',
      fileName: '施工组织设计.docx',
      type: '技术材料',
      uploadDate: '2026-03-16',
      size: '2.5 MB',
      uploader: '张伟'
    },
    {
      id: 'm4',
      fileName: '营业执照副本.jpg',
      type: '商务材料',
      uploadDate: '2026-03-10',
      size: '1.2 MB',
      uploader: '李芳'
    },
    {
      id: 'm5',
      fileName: '项目人员社保证明.pdf',
      type: '新分类',
      uploadDate: '2026-03-18',
      size: '3.8 MB',
      uploader: '王强'
    }
  ]);

  const filteredMaterials = activeCategory === '全部文档' 
    ? projectMaterials 
    : projectMaterials.filter(m => m.type === activeCategory);

  const handleEnterDetail = (project: any) => {
    setSelectedProject(project);
    setView('detail');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((f: any) => ({
        file: f,
        name: f.name
      }));
      setUploadFiles([...uploadFiles, ...newFiles]);
    }
  };

  const handleRemoveUploadFile = (index: number) => {
    setUploadFiles(uploadFiles.filter((_, i) => i !== index));
  };

  const handleUpdateFileName = (index: number, newName: string) => {
    const updated = [...uploadFiles];
    updated[index].name = newName;
    setUploadFiles(updated);
  };

  const handleUpload = () => {
    setHasAttemptedSave(true);
    if (!materialName.trim()) {
      alert('请填写所有必填项');
      return;
    }
    // Mock upload logic
    setShowAddModal(false);
    setUploadFiles([]);
    setMaterialName('');
    setUploadRemarks('');
  };

  const renderProjectList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
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
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-slate-600 font-medium"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="px-8 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 shadow-sm hover:shadow-md transition-all">
            查询
          </button>
          <button 
            onClick={() => {
              setSearchTerm('');
              setDateFilter('');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Filter size={16} /> 重置
          </button>
        </div>
      </div>

      {/* Project Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
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
              {projects.filter(p => {
                const matchesSearch = p.name.includes(searchTerm) || p.code.includes(searchTerm);
                const matchesDate = !dateFilter || p.bidOpeningTime?.includes(dateFilter);
                return matchesSearch && matchesDate;
              })
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((project) => {
                const globalProject = allProjects.find(p => p.code === project.code || p.name === project.name);
                const isProjectPaused = globalProject?.status === '放弃投标';

                return (
                  <tr key={project.id} className={`hover:bg-slate-50/50 transition-colors group ${isProjectPaused ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                          <Briefcase size={16} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-slate-900 group-hover:text-primary transition-colors text-sm">{project.name}</p>
                          {isProjectPaused && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 w-fit">
                              已暂停
                            </span>
                          )}
                        </div>
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
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                          isProjectPaused
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                            : project.hasMaterials 
                              ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/10' 
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {project.hasMaterials ? <Edit3 size={14} /> : <Plus size={14} />}
                        {project.hasMaterials ? '修改记录' : '新增记录'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(projects.filter(p => {
            const matchesSearch = p.name.includes(searchTerm) || p.code.includes(searchTerm);
            const matchesDate = !dateFilter || p.bidOpeningTime?.includes(dateFilter);
            return matchesSearch && matchesDate;
          }).length / pageSize)}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          totalItems={projects.filter(p => {
            const matchesSearch = p.name.includes(searchTerm) || p.code.includes(searchTerm);
            const matchesDate = !dateFilter || p.bidOpeningTime?.includes(dateFilter);
            return matchesSearch && matchesDate;
          }).length}
        />
      </div>
    </div>
  );

  const addCategory = (name: string) => {
    setCategories([...categories, { id: `cat-${Date.now()}`, name, children: [] }]);
  };

  const addSubCategory = (parentId: string, name: string) => {
    const updateNodes = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...node.children, { id: `sub-${Date.now()}`, name, children: [] }]
          };
        }
        if (node.children.length > 0) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    setCategories(updateNodes(categories));
  };

  const updateCategoryName = (id: string, newName: string) => {
    let oldName = '';
    const findAndReplace = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          oldName = node.name;
          return { ...node, name: newName };
        }
        if (node.children.length > 0) {
          return { ...node, children: findAndReplace(node.children) };
        }
        return node;
      });
    };
    
    const newCategories = findAndReplace(categories);
    setCategories(newCategories);
    
    if (oldName) {
      setProjectMaterials(prev => prev.map(m => m.type === oldName ? { ...m, type: newName } : m));
      if (activeCategory === oldName) {
        setActiveCategory(newName);
      }
    }
    setEditingCatId(null);
  };

  const renderCategoryNode = (node: CategoryNode, level: number = 0) => {
    const isActive = activeCategory === node.name;
    const isEditing = editingCatId === node.id;

    return (
      <div key={node.id} className="space-y-1">
        <div 
          className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
            isActive ? 'bg-primary/5 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'
          }`}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
          onClick={() => setActiveCategory(node.name)}
        >
          {isEditing ? (
            <input 
              autoFocus
              className="bg-white border border-primary/30 rounded px-1 w-full outline-none text-sm"
              defaultValue={node.name}
              onBlur={(e) => updateCategoryName(node.id, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && updateCategoryName(node.id, (e.target as HTMLInputElement).value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="flex items-center gap-2 flex-1 overflow-hidden">
              <span className={`truncate ${level === 0 ? 'text-sm' : 'text-xs'}`}>{node.name}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingCatId(node.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-primary transition-all"
              >
                <Edit3 size={level === 0 ? 12 : 10} />
              </button>
            </div>
          )}
          {level < 2 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addSubCategory(node.id, '新子分类');
              }} 
              className="text-slate-400 hover:text-primary p-1"
            >
              <Plus size={level === 0 ? 14 : 12}/>
            </button>
          )}
        </div>
        {node.children.length > 0 && (
          <div className="space-y-1">
            {node.children.map(child => renderCategoryNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderDetailView = () => (
    <div className="flex flex-col gap-4 h-[calc(100vh-120px)]">
      {/* Global Back Button & Breadcrumb */}
      <div className="flex items-center justify-between bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('projects')}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-primary rounded-full transition-all"
            title="返回项目列表"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1"></div>
          <div className="flex items-center gap-2 text-sm">
            <Briefcase size={16} className="text-primary" />
            <span className="font-bold text-slate-900">{selectedProject?.name}</span>
            <span className="text-slate-400 mx-1">/</span>
            <span className="text-slate-500 font-medium">{activeCategory}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">项目编号:</span>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{selectedProject?.code}</span>
        </div>
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Left Tree Structure */}
      <div className="w-64 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-y-auto">
        <div 
          className="px-2 mb-4 cursor-pointer hover:text-primary transition-colors"
          onClick={() => setActiveCategory('全部文档')}
        >
          <h3 className="font-bold text-slate-900 text-lg">文档素材</h3>
        </div>
        
        <div className="px-2 mb-6">
          <button 
            onClick={() => addCategory('新分类')}
            className="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all"
          >
            <Plus size={18} /> 新增目录
          </button>
        </div>

        <div className="space-y-1">
          {categories.map((node) => renderCategoryNode(node))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <FolderOpen className="text-primary" size={20} />
            {activeCategory}
          </h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleOpenAddModal}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isPaused 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90 shadow-primary/10'
              }`}
            >
              <Plus size={14} />
              上传材料
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all">
              <Trash2 size={14} />
              删除资料
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
              <Download size={14} />
              导出数据
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4">文件名</th>
                {activeCategory === '全部文档' && <th className="px-6 py-4">所属目录</th>}
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">大小</th>
                <th className="px-6 py-4">上传人</th>
                <th className="px-6 py-4">上传日期</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMaterials
                .slice((detailCurrentPage - 1) * detailPageSize, detailCurrentPage * detailPageSize)
                .map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-900 truncate max-w-xs" title={item.fileName}>{item.fileName}</span>
                    </div>
                  </td>
                  {activeCategory === '全部文档' && <td className="px-6 py-4 text-xs text-slate-500">{item.type}</td>}
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
                      <button 
                        onClick={handleOpenAddModal}
                        className="p-2 text-primary hover:text-blue-700 transition-colors" 
                        title="修改"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          currentPage={detailCurrentPage}
          totalPages={Math.ceil(filteredMaterials.length / detailPageSize)}
          pageSize={detailPageSize}
          onPageChange={setDetailCurrentPage}
          onPageSizeChange={setDetailPageSize}
          totalItems={filteredMaterials.length}
        />
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
                className="bg-white rounded-3xl shadow-2xl w-full max-w-[1000px] max-h-[90vh] flex flex-col overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                      <Upload size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">上传项目材料</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setShowAddModal(false);
                      setUploadFiles([]);
                    }}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="p-10 flex-1 flex flex-col overflow-hidden">
                  <div className="space-y-8 flex-1 overflow-y-auto pr-4 custom-scrollbar flex flex-col">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 ml-1 uppercase">关联项目</label>
                          <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
                            {selectedProject?.name || "未选择项目"}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 ml-1 uppercase">材料类型</label>
                          <select 
                            value={uploadType}
                            onChange={(e) => setUploadType(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                          >
                            <option>技术材料</option>
                            <option>商务材料</option>
                            <option>资质文件</option>
                            <option>补充说明</option>
                            <option>其他</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">材料名称 <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center">
                          <input 
                            type="text" 
                            value={materialName}
                            onChange={(e) => setMaterialName(e.target.value)}
                            placeholder="请输入材料名称..."
                            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm ${hasAttemptedSave && !materialName.trim() ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-slate-200'}`}
                          />
                          {hasAttemptedSave && !materialName.trim() && (
                            <div className="absolute right-4 text-red-500">
                              <AlertCircle size={16} className="fill-red-500 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">选择文件 (支持多选)</label>
                        <div className="relative group">
                          <input 
                            type="file" 
                            multiple 
                            accept=".pdf,image/*,.doc,.docx,.xls,.xlsx,.zip,.rar"
                            onChange={handleFileSelect}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group-hover:bg-primary/5 group-hover:border-primary/30 transition-all">
                            <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                              <Paperclip size={32} />
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-slate-600 font-bold">点击或拖拽文件上传</p>
                              <p className="text-[10px] text-slate-400 mt-1">支持 PDF、图片、Word、Excel、压缩包等格式</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {uploadFiles.length > 0 && (
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 ml-1 uppercase">待上传列表 ({uploadFiles.length})</label>
                          <div className="space-y-3">
                            {uploadFiles.map((item, idx) => (
                              <div key={idx} className="flex flex-col gap-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 overflow-hidden">
                                    <FileText size={18} className="text-primary shrink-0" />
                                    <span className="text-xs text-slate-400 truncate">{item.file.name}</span>
                                  </div>
                                  <button 
                                    onClick={() => handleRemoveUploadFile(idx)}
                                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="text" 
                                    value={item.name}
                                    onChange={(e) => handleUpdateFileName(idx, e.target.value)}
                                    placeholder="输入材料名称..."
                                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                  />
                                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">备注信息</label>
                        <textarea 
                          value={uploadRemarks}
                          onChange={(e) => setUploadRemarks(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm h-24 resize-none" 
                          placeholder="请输入材料相关说明..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8 mt-auto shrink-0 sticky bottom-0 bg-white pb-2">
                      <button 
                        onClick={handleUpload} 
                        disabled={uploadFiles.length === 0 || !materialName.trim()}
                        className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        开始上传
                      </button>
                      <button 
                        onClick={() => {
                          setShowAddModal(false);
                          setUploadFiles([]);
                          setMaterialName('');
                        }} 
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

