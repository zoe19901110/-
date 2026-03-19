import React, { useState } from 'react';
import { Search, Plus, FolderPlus, FileText, Image as ImageIcon, File, MoreVertical, Download, Trash2, Filter, Edit2, ChevronRight, ChevronDown, Folder, FolderOpen, Upload } from 'lucide-react';

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

const mockFiles = [
  { id: 'f1', name: '2024版企业介绍PPT.pptx', type: 'ppt', size: '12.5MB', date: '2024-03-18' },
  { id: 'f2', name: '施工现场标准化图集.pdf', type: 'pdf', size: '8.2MB', date: '2024-03-15' },
  { id: 'f3', name: '项目经理部组织架构图.png', type: 'image', size: '2.1MB', date: '2024-03-12' },
  { id: 'f4', name: '某省体育馆项目业绩证明.zip', type: 'zip', size: '156MB', date: '2024-03-10' },
  { id: 'f5', name: '技术标通用模板-房建类.docx', type: 'word', size: '1.4MB', date: '2024-03-05' },
  { id: 'f6', name: '安全生产许可证.pdf', type: 'pdf', size: '3.2MB', date: '2024-02-28' },
  { id: 'f7', name: '质量管理体系认证.pdf', type: 'pdf', size: '2.8MB', date: '2024-02-25' },
];

const Materials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['1', '1-2', '1-2-3']);
  const [selectedFolder, setSelectedFolder] = useState<string>('1-1');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const renderFolder = (folder: FolderNode, level: number = 0) => {
    const isExpanded = expandedFolders.includes(folder.id);
    const isSelected = selectedFolder === folder.id;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div 
          className={`flex items-center gap-1.5 py-2 px-2 rounded-lg cursor-pointer transition-colors mb-0.5 ${
            isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 text-slate-700'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            setSelectedFolder(folder.id);
          }}
        >
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
              isExpanded ? <ChevronDown size={14} className={isSelected ? "text-primary" : "text-slate-400"} /> : <ChevronRight size={14} className={isSelected ? "text-primary" : "text-slate-400"} />
            ) : <span className="w-4" />}
          </div>
          
          {isExpanded && hasChildren ? (
            <FolderOpen size={16} className={isSelected ? "text-primary" : "text-amber-500"} />
          ) : (
            <Folder size={16} className={isSelected ? "text-primary" : "text-amber-500"} />
          )}
          <span className={`text-sm truncate select-none ${isSelected ? 'font-bold' : 'font-medium'}`}>
            {folder.name}
          </span>
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
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
      {/* Header: Upload Button */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
            <Plus size={20} />
            上传文件
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95">
            <Upload size={18} />
            批量导入
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95">
            <Download size={18} />
            批量导出 {selectedFiles.length > 0 && `(${selectedFiles.length})`}
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-8 shrink-0">
        <div className="w-56 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="搜索文件名称..."
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

      {/* Main Content: Left/Right Split */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: Folder Tree */}
        <div className="w-72 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-slate-800">知识库目录</h3>
            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="新建文件夹">
              <FolderPlus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {initialFolders.map(folder => renderFolder(folder))}
          </div>
        </div>

        {/* Right: File List */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FolderOpen size={18} className="text-amber-500" />
              当前目录文件
            </h4>
            <span className="text-xs text-slate-500 font-medium">共 {mockFiles.length} 个文件</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-sm">
                <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  <th className="px-6 py-3 border-b border-slate-100 w-12">
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
                  <th className="px-6 py-3 border-b border-slate-100">文件名称</th>
                  <th className="px-6 py-3 border-b border-slate-100">大小</th>
                  <th className="px-6 py-3 border-b border-slate-100">上传日期</th>
                  <th className="px-6 py-3 border-b border-slate-100 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-3">
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
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-lg flex items-center justify-center shadow-sm ${
                          file.type === 'ppt' ? 'bg-orange-50 text-orange-500' :
                          file.type === 'pdf' ? 'bg-rose-50 text-rose-500' :
                          file.type === 'image' ? 'bg-blue-50 text-blue-500' :
                          file.type === 'zip' ? 'bg-purple-50 text-purple-500' :
                          'bg-indigo-50 text-indigo-500'
                        }`}>
                          {file.type === 'image' ? <ImageIcon size={16} /> : <FileText size={16} />}
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors cursor-pointer">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500">{file.size}</td>
                    <td className="px-6 py-3 text-sm text-slate-500">{file.date}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="导出/下载"><Download size={14} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="删除"><Trash2 size={14} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="更多"><MoreVertical size={14} /></button>
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
};

export default Materials;
