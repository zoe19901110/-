import React, { useState } from 'react';
import { Search, Plus, FolderPlus, FileText, Image as ImageIcon, File, MoreVertical, Download, Trash2, Filter, Edit2, ChevronRight, ChevronDown, Folder, FolderOpen, Upload } from 'lucide-react';
import Pagination from './Pagination';

interface FolderNode {
  id: string;
  name: string;
  children?: FolderNode[];
}

const initialFolders: FolderNode[] = [
  {
    id: '1',
    name: '技术方案模板',
    children: [
      { id: '1-1', name: '房建类' },
      { 
        id: '1-2', 
        name: '市政类', 
        children: [
          { id: '1-2-1', name: '道路工程' },
          { id: '1-2-2', name: '桥梁工程' },
          { 
            id: '1-2-3', 
            name: '隧道工程',
            children: [
              { id: '1-2-3-1', name: '盾构法' },
              { id: '1-2-3-2', name: '暗挖法' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '企业资质文件',
    children: [
      { id: '2-1', name: '营业执照' },
      { id: '2-2', name: '资质证书' }
    ]
  },
  { id: '3', name: '业绩证明材料' },
  { id: '4', name: '人员证件' }
];



interface MaterialsProps {
  currentEnterprise?: { id: string; name: string };
}

const Materials: React.FC<MaterialsProps> = ({ currentEnterprise }) => {
  const enterpriseName = currentEnterprise?.name || '杭州某某科技有限公司';
  const enterpriseId = currentEnterprise?.id || 'ent-1';

  const getMockFiles = () => {
    const baseFiles = [
      { id: 'f1', name: `2026版介绍PPT.pptx`, type: 'ppt', size: '12.5MB', date: '2026-03-18' },
      { id: 'f2', name: `施工现场标准化图集.pdf`, type: 'pdf', size: '8.2MB', date: '2026-03-15' },
      { id: 'f3', name: `项目经理部组织架构图.png`, type: 'image', size: '2.1MB', date: '2026-03-12' },
      { id: 'f4', name: `某省体育馆项目业绩证明.zip`, type: 'zip', size: '156MB', date: '2026-03-10' },
      { id: 'f5', name: `技术标通用模板-房建类.docx`, type: 'word', size: '1.4MB', date: '2026-03-05' },
      { id: 'f6', name: `安全生产许可证.pdf`, type: 'pdf', size: '3.2MB', date: '2026-02-28' },
      { id: 'f7', name: `质量管理体系认证.pdf`, type: 'pdf', size: '2.8MB', date: '2026-02-25' },
    ];

    if (enterpriseId === 'personal') {
      return [
        { id: 'p1', name: '个人简历.pdf', type: 'pdf', size: '1.2MB', date: '2026-01-10' },
        { id: 'p2', name: '作品集.zip', type: 'zip', size: '45MB', date: '2026-02-15' },
      ];
    }

    return baseFiles.map(f => ({ ...f, name: `${enterpriseName}-${f.name}` }));
  };

  const mockFiles = getMockFiles();

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['1', '1-2', '1-2-3']);
  const [selectedFolder, setSelectedFolder] = useState<string>('1-1');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; folderId: string } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, folderId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, folderId });
  };

  const closeContextMenu = () => setContextMenu(null);

  React.useEffect(() => {
    window.addEventListener('click', closeContextMenu);
    return () => window.removeEventListener('click', closeContextMenu);
  }, []);

  const renderFolder = (folder: FolderNode, level: number = 0) => {
    const isExpanded = expandedFolders.includes(folder.id);
    const isSelected = selectedFolder === folder.id;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div 
          className={`group/folder flex items-center justify-between py-2 px-2 rounded-xl cursor-pointer transition-all mb-0.5 ${
            isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-700'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => setSelectedFolder(folder.id)}
          onContextMenu={(e) => handleContextMenu(e, folder.id)}
        >
          <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
            <div 
              className="w-4 h-4 flex items-center justify-center shrink-0 hover:bg-slate-200 rounded transition-colors"
              onClick={(e) => {
                if (hasChildren) {
                  e.stopPropagation();
                  setExpandedFolders(prev => 
                    prev.includes(folder.id) ? prev.filter(id => id !== folder.id) : [...prev, folder.id]
                  );
                }
              }}
            >
              {hasChildren ? (
                isExpanded ? <ChevronDown size={14} className={isSelected ? "text-blue-600" : "text-slate-400"} /> : <ChevronRight size={14} className={isSelected ? "text-blue-600" : "text-slate-400"} />
              ) : <span className="w-4" />}
            </div>
            
            {isExpanded && hasChildren ? (
              <FolderOpen size={16} className={isSelected ? "text-blue-600" : "text-slate-400"} />
            ) : (
              <Folder size={16} className={isSelected ? "text-blue-600" : "text-slate-400"} />
            )}
            
            <div className="flex items-center gap-1 truncate">
              <span className={`text-sm truncate select-none ${isSelected ? 'font-bold' : 'font-medium'}`}>
                {folder.name}
              </span>
              <button 
                className={`p-0.5 text-slate-400 hover:text-blue-600 transition-opacity opacity-0 ${isSelected ? 'group-hover/folder:opacity-100' : ''}`} 
                title="重命名"
                onClick={(e) => {
                  e.stopPropagation();
                  const newName = prompt('请输入新的文件夹名称:', folder.name);
                  if (newName) {
                    // In a real app, update state here
                    console.log(`Renaming folder ${folder.id} to ${newName}`);
                  }
                }}
              >
                <Edit2 size={12} />
              </button>
            </div>
          </div>

          <button 
            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all shrink-0" 
            title="新增子目录"
            onClick={(e) => {
              e.stopPropagation();
              // Add logic here
            }}
          >
            <Plus size={14} />
          </button>
        </div>
        {isExpanded && hasChildren && (
          <div>
            {folder.children!.map((child) => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[calc(100vh-120px)] flex overflow-hidden">
      {/* Left: Folder Tree */}
      <div className="w-80 border-r border-slate-100 p-6 flex flex-col shrink-0">
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 text-lg">文档素材</h3>
        </div>
        
        <div className="mb-6">
          <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all group">
            <Plus size={18} className="group-hover:scale-110 transition-transform" /> 新增目录
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {initialFolders.map(folder => renderFolder(folder))}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="fixed z-[100] bg-white border border-slate-200 rounded-xl shadow-2xl py-1.5 min-w-[140px] animate-in fade-in zoom-in duration-200"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
            onClick={() => {
              // In a real app, update state here to delete folder
              console.log(`Deleting folder ${contextMenu.folderId}`);
              closeContextMenu();
            }}
          >
            <Trash2 size={14} />
            删除目录
          </button>
        </div>
      )}

      {/* Right: File List */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8 flex-1">
            <h4 className="text-base font-bold text-slate-800 flex items-center gap-2 shrink-0">
              <FolderOpen size={20} className="text-[#0052CC]" />
              全部文档
            </h4>
            
            <div className="max-w-md w-full relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0052CC] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="搜索文档名称..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0052CC]/20 focus:bg-white transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0052CC] text-white rounded-xl text-sm font-bold hover:bg-[#0052CC]/90 shadow-md shadow-blue-500/20 transition-all active:scale-95">
              <Plus size={18} />
              上传材料
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">
              <Trash2 size={18} className="text-slate-400" />
              删除资料
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
              <Download size={16} />
              导出数据
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-8 py-4 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                    checked={selectedFiles.length === mockFiles.length && mockFiles.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(mockFiles.map(f => f.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                  />
                </th>
                <th className="px-8 py-4">文件名</th>
                <th className="px-8 py-4">类型</th>
                <th className="px-8 py-4">大小</th>
                <th className="px-8 py-4">上传人</th>
                <th className="px-8 py-4">最后更新日期</th>
                <th className="px-8 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockFiles
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((file) => (
                <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles(prev => [...prev, file.id]);
                        } else {
                          setSelectedFiles(prev => prev.filter(id => id !== file.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-xl flex items-center justify-center shadow-sm ${
                        file.type === 'ppt' ? 'bg-orange-50 text-orange-500' :
                        file.type === 'pdf' ? 'bg-rose-50 text-rose-500' :
                        file.type === 'image' ? 'bg-blue-50 text-blue-500' :
                        file.type === 'zip' ? 'bg-purple-50 text-purple-500' :
                        'bg-indigo-50 text-indigo-500'
                      }`}>
                        {file.type === 'image' ? <ImageIcon size={20} /> : <FileText size={20} />}
                      </div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors cursor-pointer">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold">
                      {file.type === 'ppt' ? '技术材料' : file.type === 'pdf' ? '商务材料' : '其它'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500 font-medium">{file.size}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${file.id}`} alt="avatar" className="size-full object-cover" />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">管理员</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500">{file.date}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all" title="编辑">
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/30">
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(mockFiles.length / pageSize)}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={mockFiles.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Materials;
