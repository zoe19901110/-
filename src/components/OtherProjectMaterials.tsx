import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  Paperclip, 
  Download,
  Eye,
  Folder,
  FolderOpen,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Briefcase,
  User,
  Edit3,
  Trash2,
  MoreHorizontal,
  MoreVertical,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Pagination from './Pagination';
import { useTableResizer } from '../hooks/useTableResizer';

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
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [uploadFiles, setUploadFiles] = useState<{ file: File; name: string }[]>([]);
  const [materialName, setMaterialName] = useState('');
  const [uploadType, setUploadType] = useState('技术材料');
  const [uploadRemarks, setUploadRemarks] = useState('');
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [detailSearchTerm, setDetailSearchTerm] = useState('');
  const [previewFile, setPreviewFile] = useState<{ url: string; type: string; name: string } | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detailCurrentPage, setDetailCurrentPage] = useState(1);
  const [detailPageSize, setDetailPageSize] = useState(10);

  const { widths: projectWidths, onMouseDown: onProjectMouseDown } = useTableResizer([
    'auto', // 项目名称
    150,    // 项目编号
    150,    // 招标人
    100,    // 材料数量
    150,    // 最后更新
    150     // 操作
  ]);

  const { widths: materialWidths, onMouseDown: onMaterialMouseDown } = useTableResizer([
    40,     // Checkbox
    'auto', // 文件名
    120,    // 类型
    150,    // 上传日期
    100,    // 大小
    120,    // 上传人
    150     // 操作
  ]);

  const [projects, setProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('全部文档');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
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
    setModalMode('add');
    setMaterialName('');
    setUploadType('技术材料');
    setUploadRemarks('');
    setUploadFiles([]);
    setHasAttemptedSave(false);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (item: any) => {
    if (isPaused) {
      alert('此项目已暂停');
      return;
    }
    setModalMode('edit');
    setEditingMaterialId(item.id);
    
    const nameWithoutExt = item.fileName.includes('.') 
      ? item.fileName.substring(0, item.fileName.lastIndexOf('.')) 
      : item.fileName;
      
    setMaterialName(nameWithoutExt);
    setUploadType(item.type);
    setUploadRemarks(''); 
    
    const mockFile = new File([""], item.fileName, { type: "application/octet-stream" });
    const sizeMatch = item.size ? item.size.match(/[\d.]+/) : null;
    const sizeInMB = sizeMatch ? parseFloat(sizeMatch[0]) : 0;
    Object.defineProperty(mockFile, 'size', { value: sizeInMB * 1024 * 1024 });
    
    setUploadFiles([{ file: mockFile, name: nameWithoutExt }]);
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

  const filteredMaterials = (activeCategory === '全部文档' 
    ? projectMaterials 
    : projectMaterials.filter(m => m.type === activeCategory))
    .filter(m => m.fileName.toLowerCase().includes(detailSearchTerm.toLowerCase()));

  const currentPageMaterials = filteredMaterials.slice((detailCurrentPage - 1) * detailPageSize, detailCurrentPage * detailPageSize);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelected = new Set(selectedMaterials);
      currentPageMaterials.forEach(item => newSelected.add(item.id));
      setSelectedMaterials(Array.from(newSelected));
    } else {
      const newSelected = new Set(selectedMaterials);
      currentPageMaterials.forEach(item => newSelected.delete(item.id));
      setSelectedMaterials(Array.from(newSelected));
    }
  };

  const handleSelectMaterial = (id: string) => {
    if (selectedMaterials.includes(id)) {
      setSelectedMaterials(selectedMaterials.filter(mId => mId !== id));
    } else {
      setSelectedMaterials([...selectedMaterials, id]);
    }
  };

  const isAllCurrentPageSelected = currentPageMaterials.length > 0 && currentPageMaterials.every(item => selectedMaterials.includes(item.id));
  const isSomeCurrentPageSelected = currentPageMaterials.some(item => selectedMaterials.includes(item.id));

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
          <button className="px-8 py-2.5 bg-[#0052CC] text-white rounded-xl text-sm font-bold hover:bg-[#0052CC]/90 shadow-sm hover:shadow-md transition-all active:scale-95">
            查询
          </button>
          <button 
            onClick={() => {
              setSearchTerm('');
              setDateFilter('');
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Filter size={16} /> 重置
          </button>
        </div>
      </div>

      {/* Project Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {[
                  { label: '项目名称', key: 'name' },
                  { label: '项目编号', key: 'code' },
                  { label: '招标人', key: 'tenderer' },
                  { label: '材料数量', key: 'count', align: 'center' },
                  { label: '最后更新', key: 'update' },
                  { label: '操作', key: 'action', align: 'right' }
                ].map((col, idx) => (
                  <th 
                    key={col.key} 
                    style={{ width: projectWidths[idx] }}
                    className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider relative group/th ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}`}
                  >
                    <span className="truncate">{col.label}</span>
                    {idx < 5 && (
                      <div 
                        onMouseDown={(e) => onProjectMouseDown(idx, e)}
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/30 active:bg-primary transition-colors z-10"
                      />
                    )}
                  </th>
                ))}
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
                    <td className="px-6 py-4 overflow-hidden">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="size-8 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                          <Briefcase size={16} />
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <p className="font-bold text-slate-900 group-hover:text-primary transition-colors text-sm truncate" title={project.name}>{project.name}</p>
                          {isProjectPaused && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 w-fit">
                              已暂停
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 overflow-hidden">
                      <div className="truncate" title={project.code}>{project.code}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 overflow-hidden">
                      <div className="truncate" title={project.tenderer}>{project.tenderer}</div>
                    </td>
                    <td className="px-6 py-4 text-center overflow-hidden">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold truncate inline-block w-fit">
                        {project.materialCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 overflow-hidden">
                      <div className="truncate" title={project.lastUpdate}>{project.lastUpdate}</div>
                    </td>
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

  const deleteCategory = (id: string) => {
    const findAndRemove = (nodes: CategoryNode[]): CategoryNode[] => {
      return nodes.filter(node => {
        if (node.id === id) return false;
        if (node.children.length > 0) {
          node.children = findAndRemove(node.children);
        }
        return true;
      });
    };
    setCategories(findAndRemove(categories));
  };

  const CategoryItem: React.FC<{
    node: CategoryNode;
    level?: number;
    activeCategory: string;
    editingCatId: string | null;
    setActiveCategory: (name: string) => void;
    updateCategoryName: (id: string, newName: string) => void;
    addSubCategory: (parentId: string, name: string) => void;
    deleteCategory: (id: string) => void;
    setEditingCatId: (id: string | null) => void;
  }> = ({ 
    node, 
    level = 0, 
    activeCategory, 
    editingCatId, 
    setActiveCategory, 
    updateCategoryName, 
    addSubCategory, 
    setDeleteConfirmId,
    setEditingCatId
  }) => {
    const isActive = activeCategory === node.name;
    const isEditing = editingCatId === node.id;
    const [showActions, setShowActions] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

    const hasChildren = node.children.length > 0;

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
      const handleClick = () => setContextMenu(null);
      if (contextMenu) {
        window.addEventListener('click', handleClick);
        window.addEventListener('contextmenu', handleClick);
      }
      return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('contextmenu', handleClick);
      };
    }, [contextMenu]);

    return (
      <div className="relative">
        <div className="space-y-1">
          <div 
            className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer relative ${
              isActive ? 'bg-primary/5 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
            onClick={() => setActiveCategory(node.name)}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            onContextMenu={handleContextMenu}
          >
            <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
              {hasChildren ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="p-0.5 hover:bg-slate-200 rounded transition-colors text-slate-400"
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              ) : (
                <div className="w-5" /> // Spacer for alignment
              )}

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
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {isExpanded && hasChildren ? (
                    <FolderOpen size={14} className={`${isActive ? 'text-primary' : 'text-slate-400'} shrink-0`} />
                  ) : (
                    <Folder size={14} className={`${isActive ? 'text-primary' : 'text-slate-400'} shrink-0`} />
                  )}
                  <span className={`truncate whitespace-nowrap ${level === 0 ? 'text-sm' : 'text-xs'}`}>
                    {node.name}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCatId(node.id);
                    }}
                    className={`p-0.5 text-slate-400 hover:text-primary transition-all ${isActive && showActions ? 'opacity-100' : 'opacity-0'}`}
                    title="重命名"
                  >
                    <Edit3 size={12} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 shrink-0 opacity-100">
              {level < 2 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addSubCategory(node.id, '新子分类');
                    setIsExpanded(true);
                  }} 
                  className="p-1 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-all"
                  title="新增子分类"
                >
                  <Plus size={14}/>
                </button>
              )}
            </div>
          </div>

          {/* Custom Context Menu */}
          <AnimatePresence>
            {contextMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ 
                  position: 'fixed', 
                  top: contextMenu.y, 
                  left: contextMenu.x,
                  zIndex: 9999
                }}
                className="bg-white rounded-xl shadow-2xl border border-slate-100 py-1.5 w-32 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => {
                    setDeleteConfirmId(node.id);
                    setContextMenu(null);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>删除分类</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence initial={false}>
            {isExpanded && hasChildren && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-1">
                  {node.children.map(child => (
                    <CategoryItem 
                      key={child.id}
                      node={child} 
                      level={level + 1}
                      activeCategory={activeCategory}
                      editingCatId={editingCatId}
                      setActiveCategory={setActiveCategory}
                      updateCategoryName={updateCategoryName}
                      addSubCategory={addSubCategory}
                      setDeleteConfirmId={setDeleteConfirmId}
                      setEditingCatId={setEditingCatId}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
      <div className="w-80 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-y-auto">
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
          {categories.map((node) => (
            <CategoryItem 
              key={node.id}
              node={node}
              activeCategory={activeCategory}
              editingCatId={editingCatId}
              setActiveCategory={setActiveCategory}
              updateCategoryName={updateCategoryName}
              addSubCategory={addSubCategory}
              setDeleteConfirmId={setDeleteConfirmId}
              setEditingCatId={setEditingCatId}
            />
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">确认操作</h3>
              <p className="text-sm text-slate-600 mb-6">
                删除此节点将删除此节点下所有子节点下以及素材内容，是否确认删除？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    deleteCategory(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="flex-1 px-4 py-2 bg-[#0052CC] text-white rounded-xl text-sm font-bold hover:bg-[#0052CC]/90 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Right Content */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6 flex-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 shrink-0">
              <FolderOpen className="text-primary" size={20} />
              {activeCategory}
            </h3>
            
            <div className="max-w-xs w-full relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="搜索文档名称..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                value={detailSearchTerm}
                onChange={(e) => setDetailSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleOpenAddModal}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95 ${
                isPaused 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-[#0052CC] text-white hover:bg-[#0052CC]/90 shadow-blue-500/10'
              }`}
            >
              <Plus size={16} />
              上传材料
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#0052CC] text-[#0052CC] rounded-xl text-sm font-bold hover:bg-blue-50 transition-all shadow-sm hover:shadow-md active:scale-95">
              <Trash2 size={16} />
              删除资料
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
              <Download size={14} />
              导出数据
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                {[
                  { label: 'Checkbox', key: 'checkbox', type: 'checkbox' },
                  { label: '文件名', key: 'name' },
                  { label: '类型', key: 'type' },
                  { label: '大小', key: 'size' },
                  { label: '上传人', key: 'uploader' },
                  { label: '最后更新日期', key: 'date' },
                  { label: '操作', key: 'action', align: 'right' }
                ].map((col, idx) => (
                  <th 
                    key={col.key} 
                    style={{ width: materialWidths[idx] }}
                    className={`px-6 py-4 relative group/th ${col.align === 'right' ? 'text-right' : ''}`}
                  >
                    {col.type === 'checkbox' ? (
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                        checked={isAllCurrentPageSelected}
                        onChange={handleSelectAll}
                      />
                    ) : (
                      <span className="truncate">{col.label}</span>
                    )}
                    {idx < 6 && (
                      <div 
                        onMouseDown={(e) => onMaterialMouseDown(idx, e)}
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/30 active:bg-primary transition-colors z-10"
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMaterials
                .slice((detailCurrentPage - 1) * detailPageSize, detailCurrentPage * detailPageSize)
                .map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                      checked={selectedMaterials.includes(item.id)}
                      onChange={() => handleSelectMaterial(item.id)}
                    />
                  </td>
                  <td className="px-6 py-4 overflow-hidden">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-900 truncate" title={item.fileName}>
                        {item.fileName.includes('.') ? item.fileName.substring(0, item.fileName.lastIndexOf('.')) : item.fileName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 overflow-hidden">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider truncate block w-fit" title={item.type}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 overflow-hidden">
                    <div className="truncate" title={item.size}>{item.size}</div>
                  </td>
                  <td className="px-6 py-4 overflow-hidden">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="size-6 bg-slate-200 rounded-full overflow-hidden shrink-0">
                        <img src={`https://i.pravatar.cc/100?u=${item.uploader}`} alt="uploader" className="size-full object-cover" />
                      </div>
                      <span className="text-xs text-slate-600 truncate">{item.uploader}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 overflow-hidden">
                    <div className="truncate" title={item.uploadDate}>{item.uploadDate}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleOpenEditModal(item)}
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
                      {modalMode === 'add' ? <Upload size={24} /> : <Edit3 size={24} />}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{modalMode === 'add' ? '上传项目材料' : '修改项目材料'}</h3>
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
                          <div className="relative">
                            <div 
                              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between cursor-pointer hover:border-primary/50 transition-all shadow-sm"
                              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            >
                              <span>{uploadType}</span>
                              <ChevronDown size={16} className={`text-slate-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {showCategoryDropdown && (
                              <>
                                <div className="fixed inset-0 z-[60]" onClick={() => setShowCategoryDropdown(false)} />
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-[70] max-h-60 overflow-y-auto py-2 animate-in fade-in slide-in-from-top-2 duration-200 custom-scrollbar">
                                  {(() => {
                                    const renderNodes = (nodes: CategoryNode[], level = 0) => {
                                      return nodes.map(node => {
                                        const isLeaf = node.children.length === 0;
                                        return (
                                          <div key={node.id}>
                                            <div 
                                              className={`px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                                                isLeaf 
                                                  ? `cursor-pointer hover:bg-slate-50 ${uploadType === node.name ? 'text-primary font-bold bg-primary/5' : 'text-slate-600'}` 
                                                  : 'cursor-default text-slate-400 font-medium bg-slate-50/30'
                                              }`}
                                              style={{ paddingLeft: `${level * 20 + 16}px` }}
                                              onClick={() => {
                                                if (isLeaf) {
                                                  setUploadType(node.name);
                                                  setShowCategoryDropdown(false);
                                                }
                                              }}
                                            >
                                              {node.children.length > 0 ? (
                                                <FolderOpen size={14} className="text-slate-400 shrink-0" />
                                              ) : (
                                                <Folder size={14} className="text-primary/60 shrink-0" />
                                              )}
                                              <span className="truncate">{node.name}</span>
                                            </div>
                                            {node.children.length > 0 && renderNodes(node.children, level + 1)}
                                          </div>
                                        );
                                      });
                                    };
                                    return renderNodes(categories);
                                  })()}
                                </div>
                              </>
                            )}
                          </div>
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
                        <div className="space-y-3 mt-4">
                          {uploadFiles.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                              <div className="flex items-center gap-4 overflow-hidden">
                                <div className="size-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                                  <FileText size={20} className="text-red-500" />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                  <span className="text-sm font-bold text-slate-900 truncate">
                                    {item.file.name.includes('.') ? item.file.name.substring(0, item.file.name.lastIndexOf('.')) : item.file.name}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                    <span>{(item.file.size / 1024 / 1024).toFixed(1)}MB</span>
                                    <span>·</span>
                                    <span>{new Date().toISOString().split('T')[0]}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button 
                                  onClick={() => {
                                    const url = URL.createObjectURL(item.file);
                                    const type = item.file.type || (item.file.name.endsWith('.pdf') ? 'application/pdf' : '');
                                    setPreviewFile({ url, type, name: item.file.name });
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                                  title="预览"
                                >
                                  <Eye size={18} />
                                </button>
                                <button 
                                  onClick={() => handleRemoveUploadFile(idx)}
                                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                  title="删除"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          ))}
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
                        disabled={(modalMode === 'add' && uploadFiles.length === 0) || !materialName.trim()}
                        className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {modalMode === 'add' ? '保存' : '修改保存'}
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

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setPreviewFile(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <h3 className="text-lg font-bold text-slate-900 truncate pr-4">{previewFile.name}</h3>
              <button 
                onClick={() => setPreviewFile(null)}
                className="p-2 hover:bg-slate-200 text-slate-500 rounded-xl transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-slate-100/50 flex items-center justify-center min-h-[400px]">
              {previewFile.type.startsWith('image/') ? (
                <img src={previewFile.url} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
              ) : previewFile.type === 'application/pdf' ? (
                <iframe src={previewFile.url} className="w-full h-full min-h-[600px] rounded-lg shadow-sm border-0" title="PDF Preview" />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-4">
                  <div className="size-20 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <FileText size={40} className="text-slate-300" />
                  </div>
                  <p className="font-medium">该文件类型不支持预览</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OtherProjectMaterials;

