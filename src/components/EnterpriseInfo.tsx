import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Award, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Wallet,
  Archive,
  Calendar, 
  MapPin, 
  Globe, 
  Plus, 
  Search, 
  Filter,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Edit2,
  Trash2,
  User,
  Handshake,
  HeartPulse,
  Paperclip,
  Eye,
  Upload,
  ImageIcon,
  File
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Certificates from './Certificates';

interface EnterpriseInfoProps {
  initialTab?: string;
  currentEnterprise?: { id: string; name: string };
}

const EnterpriseInfo: React.FC<EnterpriseInfoProps> = ({ initialTab, currentEnterprise }) => {
  const [activeTab, setActiveTab] = useState(initialTab && !['certificates'].includes(initialTab) ? initialTab : 'basic');
  const [sidePanel, setSidePanel] = useState<'certificates' | null>(
    initialTab === 'certificates' ? initialTab : null
  );

  const [showAddPersonnelModal, setShowAddPersonnelModal] = useState(false);
  const [personnelMode, setPersonnelMode] = useState<'add' | 'edit'>('add');
  const [personnelTab, setPersonnelTab] = useState('basic');
  const [showPerformanceDetail, setShowPerformanceDetail] = useState(false);
  const [editingPerformanceIndex, setEditingPerformanceIndex] = useState<number | null>(null);
  const [performanceDetailTab, setPerformanceDetailTab] = useState('notification');
  const [performanceFormData, setPerformanceFormData] = useState<any>({
    packageName: '',
    packageCode: '',
    client: '',
    clientContact: '',
    projectLeader: '',
    leaderLeftCompany: '否',
    winningAmount: '',
    amountUnit: '元',
    winningDate: '',
    constructionLocation: '',
    attachments: {
      notification: [] as any[],
      contract: [] as any[],
      completion: [] as any[]
    }
  });
  const [personnelFormData, setPersonnelFormData] = useState<any>({
    // 基本信息
    name: '',
    isForeigner: '否',
    gender: '男',
    birthDate: '',
    idCard: '',
    region: '',
    phone: '',
    workPhone: '',
    postalCode: '',
    techTitle: '高级工程师',
    position: '',
    isEmployed: '是',
    careerStartDate: '',
    careerYears: '',
    education: '博士',
    major: '',
    address: '',
    experience: '',
    unitCode: '91999779974015331P',
    unitName: '上线运维测试有限公司',
    graduationDate: '',
    graduationSchool: '',
    unitPosition: '',
    email: '',
    dept: '',
    entryDate: '',
    
    // 职称证信息
    titleNumber: '',
    titleMajor: '',
    titleAuthority: '',
    titleLevel: '高级',
    titleIssueDate: '',

    // 附件
    attachments: {
      socialSecurity: [] as any[],
      contract: [] as any[],
      photo: [] as any[],
      titleCert: [] as any[],
      others: [] as any[]
    },

    // 人员业绩
    performance: [] as any[],
    // 职业资格
    qualifications: [] as any[]
  });
  const [performanceSearch, setPerformanceSearch] = useState('');
  const [qualificationSearch, setQualificationSearch] = useState('');
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const enterpriseName = currentEnterprise?.name || 'XX建设集团有限公司';
  const enterpriseId = currentEnterprise?.id || 'ent-1';

  React.useEffect(() => {
    if (initialTab) {
      if (initialTab === 'certificates') {
        setSidePanel('certificates');
      } else {
        setActiveTab(initialTab);
      }
    }
  }, [initialTab]);

  const tabs = [
    { id: 'basic', label: '基本信息', icon: Building2 },
    { id: 'personnel', label: '职业人员', icon: Users },
    { id: 'qualification', label: '经营资质', icon: FileText },
    { id: 'performance', label: '投标业绩', icon: Briefcase },
    { id: 'finance', label: '企业财务', icon: Wallet },
    { id: 'rewards', label: '奖惩信息', icon: Award },
    { id: 'honors', label: '荣誉奖项', icon: Award },
    { id: 'materials-list', label: '投标所需材料', icon: Archive },
    { id: 'disclosure', label: '信息披露', icon: Globe },
    { id: 'credit', label: '信用评价', icon: ShieldCheck },
  ];

  const renderSearchAndFilter = (placeholder: string) => (
    <div className="bg-white border-b border-slate-200 px-6 py-3">
      <div className="flex flex-wrap items-center gap-8">
        {/* Text Input */}
        <div className="w-56 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown for Certificate */}
        <div className="w-40 relative group">
          <select className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all appearance-none cursor-pointer text-slate-600 font-medium">
            <option value="">所有证书/类型</option>
            <option value="1">一级建造师</option>
            <option value="2">二级建造师</option>
            <option value="3">高级工程师</option>
            <option value="4">注册会计师</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={16} />
        </div>

        {/* Date Picker */}
        <div className="w-40 relative group">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="date" 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-slate-600 font-medium"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all">
            查询
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} /> 重置
          </button>
        </div>
      </div>
    </div>
  );

  const getEnterpriseData = () => {
    const data: Record<string, any> = {
      'personal': {
        basicInfo: [
          { label: '姓名', value: '张三' },
          { label: '职业', value: '项目经理' },
          { label: '联系方式', value: '13800138000' },
          { label: '电子邮箱', value: 'zhangsan@example.com' },
          { label: '擅长领域', value: '房建工程、市政工程' },
          { label: '工作年限', value: '12年' },
        ],
        personnel: [
          { name: '张三', title: '高级工程师', cert: '一级建造师', code: '京111060800001', date: '2025-12-31' },
        ],
        qualification: [
          { name: '一级建造师执业资格', code: '京111060800001', date: '2025-12-31', status: 'valid' },
        ],
        performance: [
          { name: '个人参与：某市中心医院项目', amount: '4.2 亿元', date: '2023-08-15', manager: '张三', location: '江苏省南京市' },
        ]
      },
      'ent-1': {
        basicInfo: [
          { label: '法定代表人', value: '张建国' },
          { label: '注册资本', value: '50,000.00 万人民币' },
          { label: '成立日期', value: '2008-05-18' },
          { label: '企业类型', value: '有限责任公司(国有独资)' },
          { label: '所属行业', value: '房屋建筑业' },
          { label: '登记机关', value: '北京市市场监督管理局' },
          { label: '注册地址', value: '北京市朝阳区某某路某某大厦 18 层' },
          { label: '经营范围', value: '各类房屋建筑工程施工总承包；市政公用工程施工总承包等。' },
        ],
        personnel: [
          { name: '张建国', title: '高级工程师', cert: '一级建造师', code: '京111060800001', date: '2025-12-31' },
          { name: '李晓明', title: '工程师', cert: '二级建造师', code: '京211060800002', date: '2024-06-15' },
        ],
        qualification: [
          { name: '建筑工程施工总承包特级', code: 'A1011011000101', date: '2028-12-31', status: 'valid' },
          { name: '市政公用工程施工总承包一级', code: 'A2021022000202', date: '2027-06-15', status: 'valid' },
        ],
        performance: [
          { name: '某市中心医院综合大楼建设项目', amount: '4.2 亿元', date: '2023-08-15', manager: '王志强', location: '江苏省南京市' },
          { name: '某新区市政道路及管网配套工程', amount: '8,500 万元', date: '2023-05-20', manager: '李晓明', location: '浙江省杭州市' },
        ]
      },
      'ent-2': {
        basicInfo: [
          { label: '法定代表人', value: '李市政' },
          { label: '注册资本', value: '20,000.00 万人民币' },
          { label: '成立日期', value: '2012-10-22' },
          { label: '企业类型', value: '有限责任公司' },
          { label: '所属行业', value: '土木工程建筑业' },
          { label: '登记机关', value: '上海市市场监督管理局' },
          { label: '注册地址', value: '上海市浦东新区某某路 88 号' },
          { label: '经营范围', value: '市政公用工程施工总承包；公路工程施工总承包等。' },
        ],
        personnel: [
          { name: '李市政', title: '高级工程师', cert: '一级建造师', code: '沪111060800003', date: '2026-05-18' },
          { name: '王路桥', title: '高级工程师', cert: '一级建造师', code: '沪111060800004', date: '2025-09-12' },
        ],
        qualification: [
          { name: '市政公用工程施工总承包特级', code: 'S1011011000101', date: '2029-01-10', status: 'valid' },
          { name: '公路工程施工总承包一级', code: 'G2021022000202', date: '2027-11-30', status: 'valid' },
        ],
        performance: [
          { name: '上海市某跨海大桥建设项目', amount: '15.6 亿元', date: '2023-11-10', manager: '李市政', location: '上海市' },
          { name: '某省高速公路扩建工程', amount: '8.2 亿元', date: '2023-04-05', manager: '王路桥', location: '浙江省' },
        ]
      },
      'ent-3': {
        basicInfo: [
          { label: '院长', value: '王设计' },
          { label: '注册资本', value: '10,000.00 万人民币' },
          { label: '成立日期', value: '1995-03-15' },
          { label: '企业类型', value: '事业单位' },
          { label: '所属行业', value: '专业技术服务业' },
          { label: '登记机关', value: '广东省市场监督管理局' },
          { label: '注册地址', value: '广州市天天河区某某路 1 号' },
          { label: '经营范围', value: '工程设计；工程勘察；工程咨询等。' },
        ],
        personnel: [
          { name: '王设计', title: '国家一级注册建筑师', cert: '一级注册建筑师', code: '粤111060800005', date: '2027-03-15' },
          { name: '陈结构', title: '国家一级注册结构工程师', cert: '一级注册结构工程师', code: '粤111060800006', date: '2026-12-20' },
        ],
        qualification: [
          { name: '工程设计综合资质甲级', code: 'SJ1011011000101', date: '2030-05-18', status: 'valid' },
          { name: '工程勘察综合资质甲级', code: 'KC2021022000202', date: '2028-09-12', status: 'valid' },
        ],
        performance: [
          { name: '广州某地标性超高层建筑设计', amount: '2,800 万元', date: '2023-12-01', manager: '王设计', location: '广东省广州市' },
          { name: '深圳某大型体育场馆方案设计', amount: '1,500 万元', date: '2023-06-20', manager: '陈结构', location: '广东省深圳市' },
        ]
      }
    };
    return data[enterpriseId] || data['ent-1'];
  };

  const currentData = getEnterpriseData();

  const renderPersonnel = () => {
    const personnelData = currentData.personnel.map((p: any) => ({ ...p, name: `${p.name} (${enterpriseName})` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <th className="px-6 py-4">姓名</th>
              <th className="px-6 py-4">职位/职称</th>
              <th className="px-6 py-4">持有证书</th>
              <th className="px-6 py-4">证书编号</th>
              <th className="px-6 py-4">有效期</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {personnelData.map((item: any, idx: number) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">{item.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold border border-blue-100">
                    {item.cert}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{item.code}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={() => {
                        setPersonnelMode('edit');
                        const personName = item.name.split(' (')[0];
                        setPersonnelFormData({
                          ...personnelFormData,
                          name: personName,
                          position: item.title,
                          techTitle: item.title.includes('工程师') ? item.title : '高级工程师',
                          certificates: [{ name: item.cert, code: item.code, expiryDate: item.date, attachments: [] }],
                          // Mocking other data for edit mode
                          isForeigner: '否',
                          gender: '男',
                          birthDate: '1985-06-15',
                          idCard: '44010619850615XXXX',
                          region: '广州市',
                          phone: '13800138000',
                          education: '硕士',
                          isEmployed: '是',
                          performance: [
                            { packageName: 'XX市中心医院建设项目', client: 'XX市卫生局', winningDate: '2023-05-20', winningAmount: '1500.00', amountUnit: '万元', projectLeader: personName, isEditing: false }
                          ],
                          qualifications: [
                            { personName: personName, qualificationName: item.cert, startDate: '2021-01-01', endDate: item.date, certificateNumber: item.code, isEditing: false }
                          ],
                        });
                        setPerformanceSearch('');
                        setQualificationSearch('');
                        setPersonnelTab('basic');
                        setShowAddPersonnelModal(true);
                      }}
                      className="text-primary hover:text-blue-700 transition-colors" 
                      title="编辑"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setPersonnelMode('edit');
                        const personName = item.name.split(' (')[0];
                        setPersonnelFormData({
                          ...personnelFormData,
                          name: personName,
                          position: item.title,
                          techTitle: item.title.includes('工程师') ? item.title : '高级工程师',
                          certificates: [{ name: item.cert, code: item.code, expiryDate: item.date, attachments: [] }],
                          isForeigner: '否',
                          gender: '男',
                          birthDate: '1985-06-15',
                          idCard: '44010619850615XXXX',
                          region: '广州市',
                          phone: '13800138000',
                          education: '硕士',
                          isEmployed: '是',
                          performance: [
                            { packageName: 'XX市中心医院建设项目', client: 'XX市卫生局', winningDate: '2023-05-20', winningAmount: '1500.00', amountUnit: '万元', projectLeader: personName, isEditing: false }
                          ],
                          qualifications: [
                            { personName: personName, qualificationName: item.cert, startDate: '2021-01-01', endDate: item.date, certificateNumber: item.code, isEditing: false }
                          ],
                        });
                        setPerformanceSearch('');
                        setQualificationSearch('');
                        setPersonnelTab('performance');
                        setShowAddPersonnelModal(true);
                      }}
                      className="text-blue-600 text-xs font-bold hover:underline"
                    >
                      维护业绩
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                      <Trash2 size={16} />
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
  );
};

  const renderFinance = () => {
    const financeData = [
      { name: '2023年度财务审计报告', year: '2023', revenue: '12.8 亿元', profit: '8,500 万元', status: '已审计' },
      { name: '2022年度财务审计报告', year: '2022', revenue: '11.1 亿元', profit: '7,800 万元', status: '已审计' },
      { name: '2021年度财务审计报告', year: '2021', revenue: '9.5 亿元', profit: '6,200 万元', status: '已审计' },
    ].map(f => ({ ...f, name: `${enterpriseName} - ${f.name}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">报表名称</th>
                <th className="px-6 py-4">年度</th>
                <th className="px-6 py-4">营收金额</th>
                <th className="px-6 py-4">净利润</th>
                <th className="px-6 py-4">审计状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {financeData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.year}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.revenue}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.profit}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-primary text-xs font-bold hover:underline">下载报告</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  const renderRewards = () => {
    const rewardsData = [
      { type: '奖励', title: '2023年度建筑业纳税百强企业', org: '某市人民政府', date: '2024-01-10', status: 'active' },
      { type: '奖励', title: '抗洪救灾突出贡献奖', org: '某省应急管理厅', date: '2023-08-20', status: 'active' },
      { type: '处罚', title: '某工地扬尘治理不力通报批评', org: '某市住建局', date: '2023-03-15', status: 'expired' },
    ].map(r => ({ ...r, title: `${enterpriseName} - ${r.title}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">类别</th>
                <th className="px-6 py-4">事由</th>
                <th className="px-6 py-4">决定机关</th>
                <th className="px-6 py-4">日期</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rewardsData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.type === '奖励' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.org}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold ${item.status === 'active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {item.status === 'active' ? '生效中' : '已失效'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-primary text-xs font-bold hover:underline">查看详情</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  const renderMaterials = () => {
    const materialsData = [
      { name: '营业执照副本', type: '证照类', count: 1 },
      { name: '开户许可证', type: '证照类', count: 1 },
      { name: '安全生产许可证', type: '证照类', count: 1 },
      { name: '法人身份证复印件', type: '人员类', count: 2 },
      { name: '近三年财务审计报告', type: '财务类', count: 3 },
      { name: '社保缴纳证明', type: '人员类', count: 12 },
      { name: '纳税证明', type: '财务类', count: 6 },
      { name: '诚信承诺书', type: '通用类', count: 1 },
    ].map(m => ({ ...m, name: `${enterpriseName} - ${m.name}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">材料名称</th>
                <th className="px-6 py-4">材料类别</th>
                <th className="px-6 py-4">文件数量</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {materialsData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Archive size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{item.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">共 {item.count} 份文件</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-primary text-xs font-bold hover:underline">查看文件</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  const renderBasicInfo = () => {
    const basicInfoData = currentData.basicInfo;

    return (
    <div className="flex flex-col">
      <div className="p-8 border-b border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-6">
          <div className="size-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
            <Building2 size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{enterpriseName}</h3>
            <p className="text-sm text-slate-500 mt-1">统一社会信用代码：91110000100001234X</p>
          </div>
        </div>
      </div>
      <div className="p-0">
        <div className="grid grid-cols-1 divide-y divide-slate-100">
          {basicInfoData.map((item: any, idx: number) => (
            <div key={idx} className="flex px-8 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-40 shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
              <div className="text-sm text-slate-700 font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  };

  const renderQualification = () => {
    const qualificationData = currentData.qualification.map((q: any) => ({ ...q, name: `${enterpriseName} - ${q.name}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">资质名称</th>
                <th className="px-6 py-4">资质编号</th>
                <th className="px-6 py-4">有效期至</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {qualificationData.map((item: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-lg flex items-center justify-center ${
                        item.status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-primary/5 text-primary'
                      }`}>
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{item.code}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className={item.status === 'warning' ? 'text-amber-500' : 'text-slate-400'} />
                      <span className={`text-xs font-bold ${item.status === 'warning' ? 'text-amber-600' : 'text-slate-500'}`}>
                        {item.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'warning' ? (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold border border-amber-100">
                        即将到期
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                        正常
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-primary text-xs font-bold hover:underline">查看详情</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  const renderPerformance = () => {
    const performanceData = currentData.performance.map((p: any) => ({ ...p, name: `${enterpriseName} - ${p.name}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">项目名称</th>
                <th className="px-6 py-4">合同金额</th>
                <th className="px-6 py-4">竣工日期</th>
                <th className="px-6 py-4">项目负责人</th>
                <th className="px-6 py-4">项目所在地</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {performanceData.map((item: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Briefcase size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary">{item.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 font-medium">{item.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 font-medium">{item.manager}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin size={12} />
                      <span className="text-xs">{item.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-primary text-xs font-bold hover:underline">查看详情</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  const renderHonors = () => {
    const honorsData = [
      { name: '中国建筑工程鲁班奖', year: '2023', level: '国家级', icon: Award, color: 'text-amber-500 bg-amber-50' },
      { name: '全国优秀施工企业', year: '2022', level: '国家级', icon: ShieldCheck, color: 'text-blue-500 bg-blue-50' },
      { name: '省优质工程“扬子杯”', year: '2023', level: '省级', icon: Award, color: 'text-emerald-500 bg-emerald-50' },
      { name: '市建筑业先进单位', year: '2022', level: '市级', icon: Award, color: 'text-purple-500 bg-purple-50' },
      { name: 'AAA 级信用企业', year: '2023', level: '国家级', icon: ShieldCheck, color: 'text-rose-500 bg-rose-50' },
      { name: '安全生产文明工地', year: '2021', level: '省级', icon: CheckCircle2, color: 'text-cyan-500 bg-cyan-50' },
    ].map(h => ({ ...h, name: `${enterpriseName} - ${h.name}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">荣誉奖项名称</th>
                <th className="px-6 py-4">级别</th>
                <th className="px-6 py-4">年度</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {honorsData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold border border-slate-100">
                      {item.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.year}年度</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-primary text-xs font-bold hover:underline">查看证书</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  const renderDisclosure = () => {
    const disclosureData = [
      { title: '关于公司 2023 年度利润分配预案的公告', date: '2024-03-20', type: '定期报告' },
      { title: '关于中标重大工程项目的公告', date: '2024-02-15', type: '临时公告' },
      { title: '关于公司法定代表人变更的公告', date: '2023-12-10', type: '临时公告' },
    ].map(d => ({ ...d, title: `${enterpriseName} - ${d.title}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">公告标题</th>
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">发布日期</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {disclosureData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold border border-slate-100">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-primary" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  const renderCredit = () => {
    const creditData = [
      { name: '企业信用等级', value: 'AAA', org: '中国建筑业协会', icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-500' },
      { name: '荣誉称号', value: '守合同重信用', org: '国家工商行政管理总局', icon: CheckCircle2, color: 'bg-blue-50 text-blue-500' },
      { name: '售后服务评价', value: '五星级', org: 'GB/T 27922-2011', icon: Award, color: 'bg-purple-50 text-purple-500' },
    ].map(c => ({ ...c, name: `${enterpriseName} - ${c.name}` }));

    return (
    <div className="flex flex-col">
      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">评价项</th>
                <th className="px-6 py-4">等级/称号</th>
                <th className="px-6 py-4">颁发/评级机构</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {creditData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{item.value}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.org}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-primary hover:text-blue-700 transition-colors" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors" title="删除">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-primary text-xs font-bold hover:underline">查看详情</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="flex flex-col h-full">
      {/* Top Header with Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (activeTab === 'personnel') {
                setPersonnelMode('add');
                setPersonnelFormData({
                  name: '',
                  isForeigner: '否',
                  gender: '男',
                  birthDate: '',
                  idCard: '',
                  region: '',
                  phone: '',
                  workPhone: '',
                  postalCode: '',
                  techTitle: '高级工程师',
                  position: '',
                  isEmployed: '是',
                  careerStartDate: '',
                  careerYears: '',
                  education: '博士',
                  major: '',
                  address: '',
                  experience: '',
                  unitCode: '91999779974015331P',
                  unitName: '上线运维测试有限公司',
                  graduationDate: '',
                  graduationSchool: '',
                  unitPosition: '',
                  email: '',
                  dept: '',
                  entryDate: '',
                  titleNumber: '',
                  titleMajor: '',
                  titleAuthority: '',
                  titleLevel: '高级',
                  titleIssueDate: '',
                  attachments: {
                    socialSecurity: [],
                    contract: [],
                    photo: [],
                    titleCert: [],
                    others: []
                  },
                  performance: [],
                  qualifications: []
                });
                setPerformanceSearch('');
                setQualificationSearch('');
                setPersonnelTab('basic');
                setShowAddPersonnelModal(true);
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={18} /> 
            {sidePanel === 'certificates' ? '上传证照' : 
             activeTab === 'personnel' ? '新增人员' :
             activeTab === 'qualification' ? '新增资质' :
             activeTab === 'performance' ? '新增业绩' :
             activeTab === 'finance' ? '新增财务数据' :
             activeTab === 'rewards' ? '新增奖惩' :
             activeTab === 'honors' ? '新增荣誉' :
             activeTab === 'materials-list' ? '上传材料' :
             activeTab === 'disclosure' ? '新增披露' :
             activeTab === 'credit' ? '新增评价' : '编辑信息'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidePanel('certificates')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                sidePanel === 'certificates' 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md' 
                  : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
              }`}
            >
              <Archive size={16} /> 电子证照库
            </button>
          </div>
          
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} /> 导出企业档案
          </button>
        </div>
      </div>

      {/* Tabs and Search Integrated Container */}
      <div className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        {/* Tabs */}
        <div className="flex bg-slate-100/50 border-b border-slate-200 overflow-x-auto no-scrollbar p-1.5 gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidePanel(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all whitespace-nowrap rounded-xl ${
                activeTab === tab.id && !sidePanel
                  ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar - Integrated */}
        {!sidePanel && activeTab !== 'basic' && renderSearchAndFilter(`搜索${tabs.find(t => t.id === activeTab)?.label}...`)}

        {/* Content Area */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'basic' && renderBasicInfo()}
              {activeTab === 'personnel' && renderPersonnel()}
              {activeTab === 'qualification' && renderQualification()}
              {activeTab === 'performance' && renderPerformance()}
              {activeTab === 'finance' && renderFinance()}
              {activeTab === 'rewards' && renderRewards()}
              {activeTab === 'honors' && renderHonors()}
              {activeTab === 'materials-list' && renderMaterials()}
              {activeTab === 'disclosure' && renderDisclosure()}
              {activeTab === 'credit' && renderCredit()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Add Personnel Modal */}
      <AnimatePresence>
        {showAddPersonnelModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-[1000px] h-[80vh] flex flex-col overflow-hidden"
              >
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                      <Users size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{personnelMode === 'add' ? '新增人员资料' : '修改人员资料'}</h3>
                  </div>
                  <button 
                    onClick={() => setShowAddPersonnelModal(false)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                {/* Modal Tabs */}
                <div className="flex border-b border-slate-100 bg-white px-8">
                  {[
                    { id: 'basic', label: '基本信息', icon: User },
                    { id: 'performance', label: '人员业绩', icon: Briefcase },
                    { id: 'qualifications', label: '职业资格', icon: ShieldCheck },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setPersonnelTab(tab.id)}
                      className={`px-6 py-4 text-sm font-bold transition-all relative flex items-center gap-2 ${
                        personnelTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                      {personnelTab === tab.id && (
                        <motion.div 
                          layoutId="personnelTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  {personnelTab === 'basic' && (
                    <div className="space-y-12">
                      {/* 1. 个人基本信息 */}
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-4 bg-blue-600 rounded-full" />
                          <h4 className="text-sm font-bold text-slate-900">个人基本信息</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                          {/* Row 1 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">姓名 <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入姓名"
                              value={personnelFormData.name}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">是否为外籍人员 <span className="text-red-500">*</span></label>
                            <div className="flex items-center gap-6 h-[46px]">
                              {['是', '否'].map(option => (
                                <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                  <input 
                                    type="radio" 
                                    className="size-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    checked={personnelFormData.isForeigner === option}
                                    onChange={() => setPersonnelFormData({...personnelFormData, isForeigner: option})}
                                  />
                                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Row 2 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">性别 <span className="text-red-500">*</span></label>
                            <div className="flex items-center gap-6 h-[46px]">
                              {['男', '女'].map(option => (
                                <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                  <input 
                                    type="radio" 
                                    className="size-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    checked={personnelFormData.gender === option}
                                    onChange={() => setPersonnelFormData({...personnelFormData, gender: option})}
                                  />
                                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">出生年月 <span className="text-red-500">*</span></label>
                            <input 
                              type="date" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              value={personnelFormData.birthDate}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, birthDate: e.target.value})}
                            />
                          </div>

                          {/* Row 3 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">身份证号码 <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.idCard}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, idCard: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">所在行政区域 <span className="text-red-500">*</span></label>
                            <select 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              value={personnelFormData.region}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, region: e.target.value})}
                            >
                              <option value="">请选择</option>
                              <option value="北京市">北京市</option>
                              <option value="上海市">上海市</option>
                              <option value="广州市">广州市</option>
                              <option value="深圳市">深圳市</option>
                            </select>
                          </div>

                          {/* Row 4 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">联系手机 <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.phone}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">单位电话</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.workPhone}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, workPhone: e.target.value})}
                            />
                          </div>

                          {/* Row 5 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">邮政编码</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.postalCode}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, postalCode: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">技术职称 <span className="text-red-500">*</span></label>
                            <select 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              value={personnelFormData.techTitle}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, techTitle: e.target.value})}
                            >
                              <option>高级工程师</option>
                              <option>中级工程师</option>
                              <option>助理工程师</option>
                            </select>
                          </div>

                          {/* Row 6 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">职务 <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.position}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, position: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">是否在职</label>
                            <div className="flex items-center gap-6 h-[46px]">
                              {['是', '否'].map(option => (
                                <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                  <input 
                                    type="radio" 
                                    className="size-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    checked={personnelFormData.isEmployed === option}
                                    onChange={() => setPersonnelFormData({...personnelFormData, isEmployed: option})}
                                  />
                                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Row 7 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">从业开始时间</label>
                            <input 
                              type="date" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              value={personnelFormData.careerStartDate}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, careerStartDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">从业年限</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all pr-12"
                                placeholder="请输入"
                                value={personnelFormData.careerYears}
                                onChange={(e) => setPersonnelFormData({...personnelFormData, careerYears: e.target.value})}
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">年</span>
                            </div>
                          </div>

                          {/* Row 8 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">学历 <span className="text-red-500">*</span></label>
                            <select 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              value={personnelFormData.education}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, education: e.target.value})}
                            >
                              <option>博士</option>
                              <option>硕士</option>
                              <option>本科</option>
                              <option>大专</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">毕业专业</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.major}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, major: e.target.value})}
                            />
                          </div>

                          {/* Row 9 */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">毕业时间</label>
                            <input 
                              type="date" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              value={personnelFormData.graduationDate}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, graduationDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">毕业学校</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.graduationSchool}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, graduationSchool: e.target.value})}
                            />
                          </div>

                          {/* Full Width Rows */}
                          <div className="col-span-2 space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">通讯地址</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.address}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, address: e.target.value})}
                            />
                          </div>

                          <div className="col-span-2 space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">从业经历</label>
                            <textarea 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all min-h-[100px] resize-none"
                              placeholder="请输入"
                              value={personnelFormData.experience}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, experience: e.target.value})}
                            />
                          </div>
                        </div>
                      </section>

                      {/* 2. 职称证信息 */}
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-4 bg-blue-600 rounded-full" />
                          <h4 className="text-sm font-bold text-slate-900">职称证信息</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">职称编号</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.titleNumber}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, titleNumber: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">职称专业</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.titleMajor}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, titleMajor: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">职称级别</label>
                            <select 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              value={personnelFormData.titleLevel}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, titleLevel: e.target.value})}
                            >
                              <option>高级</option>
                              <option>中级</option>
                              <option>初级</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1">职称发证机关</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="请输入"
                              value={personnelFormData.titleAuthority}
                              onChange={(e) => setPersonnelFormData({...personnelFormData, titleAuthority: e.target.value})}
                            />
                          </div>
                        </div>
                      </section>

                      {/* 3. 附件 */}
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-4 bg-blue-600 rounded-full" />
                          <h4 className="text-sm font-bold text-slate-900">附件材料</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          {[
                            { id: 'photo', label: '个人照片' },
                            { id: 'titleCert', label: '职称证' },
                            { id: 'socialSecurity', label: '社保证明' },
                            { id: 'contract', label: '劳动合同' },
                            { id: 'others', label: '其他材料' },
                          ].map((item) => (
                            <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex items-center justify-between mb-3">
                                <label className="text-xs font-bold text-slate-600">{item.label}</label>
                                <button className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1">
                                  <Plus size={14} /> 上传
                                </button>
                              </div>
                              <div className="space-y-2">
                                {personnelFormData.attachments[item.id].length === 0 ? (
                                  <div className="text-center py-4 border-2 border-dashed border-slate-200 rounded-xl">
                                    <span className="text-[10px] text-slate-400">暂无附件</span>
                                  </div>
                                ) : (
                                  personnelFormData.attachments[item.id].map((file: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-100 text-xs">
                                      <span className="text-slate-600 truncate max-w-[150px]">{file.name}</span>
                                      <div className="flex items-center gap-2">
                                        <button className="text-blue-600 hover:text-blue-700"><Eye size={14} /></button>
                                        <button className="text-red-500 hover:text-red-600"><Trash2 size={14} /></button>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}

                  {personnelTab === 'performance' && (
                    <div className="h-full flex flex-col">
                      <AnimatePresence mode="wait">
                        {!showPerformanceDetail ? (
                          <motion.div 
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 flex flex-col h-full"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="relative flex-1 max-w-md">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                  <input 
                                    type="text"
                                    placeholder="搜索标段名称、交易甲方..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={performanceSearch}
                                    onChange={(e) => setPerformanceSearch(e.target.value)}
                                  />
                                </div>
                              </div>
                              <button 
                                onClick={() => {
                                  setPerformanceFormData({
                                    packageName: '',
                                    packageCode: '',
                                    client: '',
                                    clientContact: '',
                                    projectLeader: personnelFormData.name || '',
                                    leaderLeftCompany: '否',
                                    winningAmount: '',
                                    amountUnit: '元',
                                    winningDate: '',
                                    constructionLocation: '',
                                    attachments: {
                                      notification: [],
                                      contract: [],
                                      completion: []
                                    }
                                  });
                                  setEditingPerformanceIndex(null);
                                  setShowPerformanceDetail(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
                              >
                                <Plus size={14} /> 新增业绩
                              </button>
                            </div>

                            <div className="flex-1 overflow-hidden border border-slate-200 rounded-2xl bg-white">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                                    <th className="px-4 py-3 w-12 text-center">序</th>
                                    <th className="px-4 py-3">标段（包）名称</th>
                                    <th className="px-4 py-3">交易甲方</th>
                                    <th className="px-4 py-3">中标时间</th>
                                    <th className="px-4 py-3">中标金额</th>
                                    <th className="px-4 py-3">项目负责人</th>
                                    <th className="px-4 py-3 text-right">操作</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {(personnelFormData.performance || [])
                                    .filter((p: any) => 
                                      !performanceSearch || 
                                      p.packageName?.toLowerCase().includes(performanceSearch.toLowerCase()) ||
                                      p.client?.toLowerCase().includes(performanceSearch.toLowerCase())
                                    )
                                    .map((item: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                      <td className="px-4 py-3 text-center text-xs text-slate-400">{idx + 1}</td>
                                      <td className="px-4 py-3">
                                        <span className="text-xs font-bold text-slate-700">{item.packageName || '-'}</span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className="text-xs text-slate-600">{item.client || '-'}</span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className="text-xs text-slate-500">{item.winningDate || '-'}</span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className="text-xs font-mono text-blue-600 font-bold">{item.winningAmount} {item.amountUnit}</span>
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className="text-xs text-slate-600">{item.projectLeader || '-'}</span>
                                      </td>
                                      <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          <button 
                                            onClick={() => {
                                              setPerformanceFormData({...item});
                                              setEditingPerformanceIndex(idx);
                                              setShowPerformanceDetail(true);
                                            }}
                                            className="text-blue-600 hover:underline text-[11px] font-bold"
                                          >
                                            编辑
                                          </button>
                                          <button 
                                            onClick={() => {
                                              const newList = personnelFormData.performance.filter((_: any, i: number) => i !== idx);
                                              setPersonnelFormData({...personnelFormData, performance: newList});
                                            }}
                                            className="text-red-500 hover:underline text-[11px] font-bold"
                                          >
                                            删除
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {(personnelFormData.performance || []).length === 0 && (
                                    <tr>
                                      <td colSpan={7} className="px-4 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                          <Briefcase size={40} className="mb-2 opacity-20" />
                                          <p className="text-xs">暂无业绩记录，点击右上角新增</p>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col h-full bg-slate-50 -m-6 rounded-b-3xl overflow-hidden"
                          >
                            {/* Form Header */}
                            <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                              <div className="flex items-center gap-8">
                                <button 
                                  onClick={() => setPerformanceDetailTab('notification')}
                                  className={`text-sm font-bold pb-1 border-b-2 transition-all ${performanceDetailTab === 'notification' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                  业绩中标通知书
                                </button>
                                <button 
                                  onClick={() => setPerformanceDetailTab('contract')}
                                  className={`text-sm font-bold pb-1 border-b-2 transition-all ${performanceDetailTab === 'contract' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                  业绩合同协议书
                                </button>
                                <button 
                                  onClick={() => setPerformanceDetailTab('completion')}
                                  className={`text-sm font-bold pb-1 border-b-2 transition-all ${performanceDetailTab === 'completion' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                                >
                                  工程竣工验收证明
                                </button>
                              </div>
                              <button 
                                onClick={() => setShowPerformanceDetail(false)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-all"
                              >
                                <X size={18} />
                              </button>
                            </div>

                            {/* Form Content */}
                            <div className="flex-1 flex overflow-hidden">
                              {/* Left: Upload */}
                              <div className="w-48 bg-white border-r border-slate-200 p-6 flex flex-col items-center">
                                <div className="w-full aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
                                  <Plus size={24} className="text-slate-300 group-hover:text-blue-500" />
                                  <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">上传图片</span>
                                </div>
                                <div className="mt-6 space-y-2">
                                  <h5 className="text-xs font-bold text-slate-900">证照照片要求</h5>
                                  <p className="text-[10px] text-slate-400 leading-relaxed">
                                    支持格式：jpg、jpeg、bmp、png<br />
                                    文件大小上限：5M
                                  </p>
                                </div>
                              </div>

                              {/* Middle: Preview */}
                              <div className="flex-1 bg-slate-100/50 p-8 flex items-center justify-center relative">
                                <div className="flex flex-col items-center gap-4 text-slate-300">
                                  <ImageIcon size={64} strokeWidth={1} />
                                  <p className="text-sm font-medium">请上传证照图片</p>
                                </div>
                              </div>

                              {/* Right: Fields */}
                              <div className="w-96 bg-white border-l border-slate-200 p-6 overflow-y-auto custom-scrollbar">
                                <div className="space-y-4">
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                      <span className="text-red-500">*</span> 标段（包）名称
                                    </label>
                                    <input 
                                      type="text"
                                      placeholder="请输入"
                                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                      value={performanceFormData.packageName}
                                      onChange={(e) => setPerformanceFormData({...performanceFormData, packageName: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                      <span className="text-red-500">*</span> 标段（包）编号
                                    </label>
                                    <input 
                                      type="text"
                                      placeholder="请输入"
                                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                      value={performanceFormData.packageCode}
                                      onChange={(e) => setPerformanceFormData({...performanceFormData, packageCode: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500">交易甲方</label>
                                    <input 
                                      type="text"
                                      placeholder="请输入"
                                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                      value={performanceFormData.client}
                                      onChange={(e) => setPerformanceFormData({...performanceFormData, client: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500">交易甲方联系人/电话</label>
                                    <input 
                                      type="text"
                                      placeholder="请输入"
                                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                      value={performanceFormData.clientContact}
                                      onChange={(e) => setPerformanceFormData({...performanceFormData, clientContact: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                      <span className="text-red-500">*</span> 项目负责人
                                    </label>
                                    <input 
                                      type="text"
                                      placeholder="请输入"
                                      className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm outline-none text-slate-500"
                                      value={performanceFormData.projectLeader}
                                      onChange={(e) => setPerformanceFormData({...performanceFormData, projectLeader: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500">原项目负责人已不在公司</label>
                                    <div className="flex items-center gap-6 pt-1">
                                      <label className="flex items-center gap-2 cursor-pointer group">
                                        <input 
                                          type="radio" 
                                          name="leaderLeft" 
                                          className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                                          checked={performanceFormData.leaderLeftCompany === '是'}
                                          onChange={() => setPerformanceFormData({...performanceFormData, leaderLeftCompany: '是'})}
                                        />
                                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">是</span>
                                      </label>
                                      <label className="flex items-center gap-2 cursor-pointer group">
                                        <input 
                                          type="radio" 
                                          name="leaderLeft" 
                                          className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                                          checked={performanceFormData.leaderLeftCompany === '否'}
                                          onChange={() => setPerformanceFormData({...performanceFormData, leaderLeftCompany: '否'})}
                                        />
                                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">否</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                        <span className="text-red-500">*</span> 中标金额
                                      </label>
                                      <input 
                                        type="text"
                                        placeholder="请输入"
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                        value={performanceFormData.winningAmount}
                                        onChange={(e) => setPerformanceFormData({...performanceFormData, winningAmount: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-1.5">
                                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                        <span className="text-red-500">*</span> 中标单位
                                      </label>
                                      <select 
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                                        value={performanceFormData.amountUnit}
                                        onChange={(e) => setPerformanceFormData({...performanceFormData, amountUnit: e.target.value})}
                                      >
                                        <option value="元">元</option>
                                        <option value="万元">万元</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500">中标时间</label>
                                    <div className="relative">
                                      <input 
                                        type="date"
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                        value={performanceFormData.winningDate}
                                        onChange={(e) => setPerformanceFormData({...performanceFormData, winningDate: e.target.value})}
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500">建设地点</label>
                                    <input 
                                      type="text"
                                      placeholder="请输入"
                                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                                      value={performanceFormData.constructionLocation}
                                      onChange={(e) => setPerformanceFormData({...performanceFormData, constructionLocation: e.target.value})}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Form Footer */}
                            <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-center gap-4">
                              <button 
                                onClick={() => {
                                  const newList = [...(personnelFormData.performance || [])];
                                  if (editingPerformanceIndex !== null) {
                                    newList[editingPerformanceIndex] = {...performanceFormData};
                                  } else {
                                    newList.push({...performanceFormData});
                                  }
                                  setPersonnelFormData({...personnelFormData, performance: newList});
                                  setShowPerformanceDetail(false);
                                }}
                                className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
                              >
                                保存
                              </button>
                              <button 
                                onClick={() => setShowPerformanceDetail(false)}
                                className="px-8 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all"
                              >
                                取消
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {personnelTab === 'qualifications' && (
                    <div className="space-y-6 flex flex-col h-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              type="text"
                              placeholder="搜索姓名、证书名称..."
                              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                              value={qualificationSearch}
                              onChange={(e) => setQualificationSearch(e.target.value)}
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => setPersonnelFormData({
                            ...personnelFormData,
                            qualifications: [...(personnelFormData.qualifications || []), { 
                              personName: personnelFormData.name || '', 
                              qualificationName: '', 
                              startDate: '', 
                              endDate: '', 
                              certificateNumber: '',
                              isEditing: true 
                            }]
                          })}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
                        >
                          <Plus size={14} /> 新增资格
                        </button>
                      </div>

                      <div className="flex-1 overflow-hidden border border-slate-200 rounded-2xl bg-white">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                              <th className="px-4 py-3 w-12 text-center">序</th>
                              <th className="px-4 py-3">姓名</th>
                              <th className="px-4 py-3">资格序列</th>
                              <th className="px-4 py-3">资格证书编号</th>
                              <th className="px-4 py-3 text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {(personnelFormData.qualifications || [])
                              .filter((q: any) => 
                                !qualificationSearch || 
                                q.personName?.toLowerCase().includes(qualificationSearch.toLowerCase()) ||
                                q.qualificationName?.toLowerCase().includes(qualificationSearch.toLowerCase())
                              )
                              .map((item: any, idx: number) => (
                              <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-4 py-3 text-center text-xs text-slate-400">{idx + 1}</td>
                                <td className="px-4 py-3">
                                  {item.isEditing ? (
                                    <input 
                                      type="text"
                                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                                      value={item.personName}
                                      onChange={(e) => {
                                        const newList = [...personnelFormData.qualifications];
                                        newList[idx].personName = e.target.value;
                                        setPersonnelFormData({...personnelFormData, qualifications: newList});
                                      }}
                                    />
                                  ) : (
                                    <span className="text-xs font-bold text-slate-700">{item.personName || '-'}</span>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  {item.isEditing ? (
                                    <div className="flex items-center gap-2">
                                      <input 
                                        type="text"
                                        placeholder="证书名称"
                                        className="flex-1 px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                                        value={item.qualificationName}
                                        onChange={(e) => {
                                          const newList = [...personnelFormData.qualifications];
                                          newList[idx].qualificationName = e.target.value;
                                          setPersonnelFormData({...personnelFormData, qualifications: newList});
                                        }}
                                      />
                                      <input 
                                        type="date"
                                        className="w-28 px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                                        value={item.startDate}
                                        onChange={(e) => {
                                          const newList = [...personnelFormData.qualifications];
                                          newList[idx].startDate = e.target.value;
                                          setPersonnelFormData({...personnelFormData, qualifications: newList});
                                        }}
                                      />
                                      <span className="text-slate-400">至</span>
                                      <input 
                                        type="date"
                                        className="w-28 px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                                        value={item.endDate}
                                        onChange={(e) => {
                                          const newList = [...personnelFormData.qualifications];
                                          newList[idx].endDate = e.target.value;
                                          setPersonnelFormData({...personnelFormData, qualifications: newList});
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-xs text-slate-600">
                                      {item.qualificationName || '-'} 
                                      {(item.startDate || item.endDate) && ` (${item.startDate || ''}至${item.endDate || ''})`}
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  {item.isEditing ? (
                                    <input 
                                      type="text"
                                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                                      value={item.certificateNumber}
                                      onChange={(e) => {
                                        const newList = [...personnelFormData.qualifications];
                                        newList[idx].certificateNumber = e.target.value;
                                        setPersonnelFormData({...personnelFormData, qualifications: newList});
                                      }}
                                    />
                                  ) : (
                                    <span className="text-xs font-mono text-slate-500">{item.certificateNumber || '-'}</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    {item.isEditing ? (
                                      <button 
                                        onClick={() => {
                                          const newList = [...personnelFormData.qualifications];
                                          newList[idx].isEditing = false;
                                          setPersonnelFormData({...personnelFormData, qualifications: newList});
                                        }}
                                        className="text-blue-600 hover:underline text-[11px] font-bold"
                                      >
                                        保存
                                      </button>
                                    ) : (
                                      <button 
                                        onClick={() => {
                                          const newList = [...personnelFormData.qualifications];
                                          newList[idx].isEditing = true;
                                          setPersonnelFormData({...personnelFormData, qualifications: newList});
                                        }}
                                        className="text-blue-600 hover:underline text-[11px] font-bold"
                                      >
                                        编辑
                                      </button>
                                    )}
                                    <button 
                                      onClick={() => {
                                        const newList = personnelFormData.qualifications.filter((_: any, i: number) => i !== idx);
                                        setPersonnelFormData({...personnelFormData, qualifications: newList});
                                      }}
                                      className="text-red-500 hover:underline text-[11px] font-bold"
                                    >
                                      删除
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {(personnelFormData.qualifications || []).length === 0 && (
                              <tr>
                                <td colSpan={5} className="px-4 py-20 text-center">
                                  <div className="flex flex-col items-center justify-center text-slate-400">
                                    <ShieldCheck size={40} className="mb-2 opacity-20" />
                                    <p className="text-xs">暂无资格证书，点击右上角新增</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-4">
                  <button 
                    onClick={() => setShowAddPersonnelModal(false)}
                    className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => {
                      // Handle save logic here
                      console.log('Saving personnel:', personnelFormData);
                      setShowAddPersonnelModal(false);
                    }}
                    className="px-10 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
                  >
                    确认保存
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* File Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setPreviewFile(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={previewFile} 
                alt="File Preview" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setPreviewFile(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X size={32} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Side Panel Drawer */}
      <AnimatePresence>
        {sidePanel && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidePanel(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[900px] bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-xl flex items-center justify-center ${
                    sidePanel === 'certificates' ? 'bg-amber-50 text-amber-500' : 'bg-indigo-50 text-indigo-500'
                  }`}>
                    <Archive size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      电子证照库
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">管理企业投标所需的各类电子证明与素材文件</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSidePanel(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                <Certificates />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnterpriseInfo;
