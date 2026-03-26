import React, { useState } from 'react';
import { 
  ChevronLeft, 
  UploadCloud, 
  FileText, 
  AlertTriangle,
  Trash2,
  Eye,
  Paperclip,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';

interface MarginReceiptUploadProps {
  onBack: () => void;
  isPaused?: boolean;
}

const marginTypes = [
  { id: 'bank_transfer', name: '现金转账' },
  { id: 'electronic_guarantee', name: '电子保函' },
  { id: 'cash', name: '现金/支票' },
  { id: 'other', name: '其他方式' }
];

const MarginReceiptUpload: React.FC<MarginReceiptUploadProps> = ({ onBack, isPaused = false }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('bank_transfer');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = {
        name: e.target.files[0].name,
        size: (e.target.files[0].size / 1024 / 1024).toFixed(2) + ' MB',
        time: new Date().toLocaleString(),
        status: '上传成功',
        type: marginTypes.find(t => t.id === selectedType)?.name
      };
      
      setIsUploading(true);
      
      // Simulate upload
      setTimeout(() => {
        setFiles(prev => [...prev, newFile]);
        setIsUploading(false);
      }, 1000);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header aligned to the left */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-xl font-bold">保证金回执上传</h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            
            {/* Left-Right Form Layout */}
            <div className="flex flex-col md:flex-row gap-12">
              
              {/* Left: Type Selection */}
              <div className="w-full md:w-1/3 shrink-0">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  缴纳方式 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => !isPaused && setIsDropdownOpen(!isDropdownOpen)}
                    disabled={isPaused}
                    className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                      isDropdownOpen ? 'border-primary' : 'border-slate-300'
                    } ${isPaused ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:border-slate-400'}`}
                  >
                    <span className="text-slate-900">
                      {marginTypes.find(t => t.id === selectedType)?.name || '请选择缴纳方式'}
                    </span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && !isPaused && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1">
                      {marginTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => {
                            setSelectedType(type.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                            selectedType === type.id ? 'text-primary font-medium bg-blue-50/50' : 'text-slate-700'
                          }`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Attachment Section */}
              <div className="w-full md:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Paperclip size={18} className="text-blue-500" />
                    <h3 className="text-sm font-medium text-slate-900">
                      缴纳凭证附件 <span className="text-red-500">*</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      if (isPaused) {
                        alert('此项目已暂停');
                        return;
                      }
                      document.getElementById('receipt-upload')?.click();
                    }}
                    disabled={isPaused || isUploading}
                    className={`flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-lg text-sm font-medium transition-colors ${
                      isPaused ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
                    }`}
                  >
                    <UploadCloud size={16} />
                    {isUploading ? '上传中...' : '上传附件'}
                  </button>
                  <input 
                    type="file" 
                    id="receipt-upload" 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    disabled={isPaused || isUploading}
                  />
                </div>

                {files.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-xl py-12 flex flex-col items-center justify-center bg-slate-50/50">
                    <Paperclip size={32} className="text-slate-300 mb-3" />
                    <p className="text-slate-500 text-sm mb-1">暂无附件</p>
                    <p className="text-slate-400 text-xs">点击右上角按钮上传缴纳凭证</p>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="px-4 py-3 font-medium">文件名称</th>
                          <th className="px-4 py-3 font-medium w-24">大小</th>
                          <th className="px-4 py-3 font-medium w-40">上传时间</th>
                          <th className="px-4 py-3 font-medium w-24 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {files.map((file, index) => (
                          <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <FileText size={16} className="text-blue-500 shrink-0" />
                                <span className="text-slate-700 truncate max-w-[150px] sm:max-w-[200px]">{file.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-500">{file.size}</td>
                            <td className="px-4 py-3 text-slate-500">{file.time}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-1.5 text-slate-400 hover:text-primary rounded transition-colors" title="预览">
                                  <Eye size={16} />
                                </button>
                                <button 
                                  onClick={() => removeFile(index)}
                                  className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors" 
                                  title="删除"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </div>
          
          {/* Warning Box */}
          <div className="bg-amber-50 p-6 flex items-start gap-4 border-t border-amber-100">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-amber-800 mb-1 text-sm">注意事项</h4>
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                <li>请确保上传的回执清晰可见，包含付款方、收款方、金额及交易时间等关键信息。</li>
                <li>如采用电子保函形式，请上传完整的保函文件。</li>
                <li>保证金缴纳金额必须与招标文件要求完全一致。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarginReceiptUpload;
