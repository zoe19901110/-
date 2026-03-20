import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Download, 
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'motion/react';

interface BidParsingProps {
  autoImported?: boolean;
  uploadedFiles?: Record<string, boolean>;
  onBack?: () => void;
  onViewReport?: () => void;
  currentEnterprise?: { id: string; name: string };
}

const BidParsing: React.FC<BidParsingProps> = ({ autoImported, uploadedFiles, onBack, onViewReport, currentEnterprise }) => {
  const enterpriseName = currentEnterprise?.name || '杭州某某科技有限公司';
  const [files, setFiles] = useState([
    { name: `2023年${enterpriseName}智慧校园建设项目招标文件.pdf`, time: '2023-11-20 14:30', type: 'pdf', status: '分析完成' },
    { name: `${enterpriseName}配套网络设备采购需求清单.docx`, time: '2023-11-19 10:15', type: 'doc', status: '分析完成' }
  ]);
  const [isImported, setIsImported] = useState(autoImported);
  const [isParsed, setIsParsed] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isQualificationChecked, setIsQualificationChecked] = useState(false);
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [useClarification, setUseClarification] = useState(false);

  useEffect(() => {
    if (isImported && !isParsed && !useClarification) {
      const hasClarification = Object.keys(uploadedFiles || {}).some(key => key.startsWith('clar-doc-') && uploadedFiles[key]);
      if (hasClarification) {
        setShowClarificationModal(true);
      }
    }
  }, [isImported, isParsed, uploadedFiles, useClarification]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="flex items-center justify-center p-2 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="返回准备阶段"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            招标文件解析
          </h3>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
          <Download size={16} /> 导出报告
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-8">
          <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">招标文件上传</h3>
            {isImported ? (
              isParsed ? (
                <div className="border-2 border-green-100 bg-green-50/30 rounded-xl p-12 flex flex-col items-center justify-center">
                  <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="font-black text-lg text-slate-900 mb-2">招标文件解析完成</p>
                  <p className="text-slate-500 text-sm mb-6">2024年{enterpriseName}智慧交通管理平台建设项目招标文件.pdf</p>
                  <div className="flex gap-4">
                    <button onClick={onViewReport} className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-8 rounded-lg transition-all shadow-lg shadow-primary/20">
                      查看解析报告
                    </button>
                    <button 
                      onClick={() => { setIsImported(false); setIsParsed(false); }}
                      className="bg-white border border-slate-200 text-slate-600 font-bold py-2.5 px-8 rounded-lg transition-all hover:bg-slate-50"
                    >
                      重新上传
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-blue-100 bg-blue-50/30 rounded-xl p-12 flex flex-col items-center justify-center">
                  <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    {useClarification ? <MessageSquare size={32} /> : <FileText size={32} />}
                  </div>
                  <p className="font-black text-lg text-slate-900 mb-2">{useClarification ? '答疑文件已就绪' : '招标文件已就绪'}</p>
                  <p className="text-slate-500 text-sm mb-6">2024年{enterpriseName}智慧交通管理平台建设项目招标文件.pdf</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        setIsParsing(true);
                        setTimeout(() => {
                          setIsParsing(false);
                          setIsParsed(true);
                          setFiles(prev => {
                            const newFiles = [...prev];
                            if (newFiles.length > 0) {
                              newFiles[0].status = '分析完成';
                            }
                            return newFiles;
                          });
                        }, 2000);
                      }}
                      disabled={isParsing}
                      className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-8 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                      {isParsing ? <><RefreshCw className="animate-spin" size={18} /> 正在解析...</> : '开始智能解析'}
                    </button>
                    <button 
                      onClick={() => setIsImported(false)}
                      className="bg-white border border-slate-200 text-slate-600 font-bold py-2.5 px-8 rounded-lg transition-all hover:bg-slate-50"
                    >
                      重新上传
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="border-2 border-dashed border-slate-100 rounded-xl p-16 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group" onClick={() => setIsImported(true)}>
                <div className="size-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud className="text-primary" size={28} />
                </div>
                <p className="font-bold mb-1">点击或拖拽招标文件至此处上传</p>
                <p className="text-slate-400 text-sm mb-8">支持 PDF、Word、ZF、CF 格式，AI将自动识别关键信息并填充表单</p>
                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-10 rounded-lg transition-all shadow-lg shadow-primary/20">
                  立即开始智能分析
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-bold">分析历史</h3>
              <button className="text-primary text-sm font-medium hover:underline">查看全部</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs font-medium bg-slate-50/30">
                  <th className="px-6 py-4">文件名</th>
                  <th className="px-6 py-4">分析时间</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {files.map((file, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <FileText className={file.type === 'pdf' ? 'text-red-500' : 'text-blue-500'} size={20} />
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-400">{file.time}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-600">
                        <span className="size-1.5 rounded-full bg-green-500"></span>
                        {file.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-4">
                        <button className="text-primary hover:text-primary/80 text-sm font-bold">查看</button>
                        <button className="text-slate-400 hover:text-red-500 text-sm font-bold">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {showClarificationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="size-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6 text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">检测到新的答疑文件</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">系统检测到您已上传最新的答疑文件，是否使用该文件重新进行智能检测？</p>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setUseClarification(true);
                  setShowClarificationModal(false);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
              >
                是，使用最新答疑
              </button>
              <button 
                onClick={() => setShowClarificationModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-all"
              >
                否，维持原文件
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BidParsing;
