import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  FolderPlus, 
  Shield, 
  Key, 
  Search, 
  MoreHorizontal, 
  ChevronRight,
  UserCheck,
  Building,
  Mail,
  Phone,
  Edit2,
  Trash2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Department {
  id: string;
  name: string;
  count: number;
}

interface User {
  id: string;
  name: string;
  dept: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

interface Role {
  id: string;
  name: string;
  desc: string;
  userCount: number;
}

const OrgStructure: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('dept');
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form States
  const [deptForm, setDeptForm] = useState({ name: '' });
  const [userForm, setUserForm] = useState({
    name: '',
    dept: '',
    role: '',
    email: '',
    phone: '',
    status: '正常'
  });

  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: '总经办', count: 1 },
    { id: '2', name: '市场部', count: 1 },
    { id: '3', name: '技术部', count: 1 },
    { id: '4', name: '财务部', count: 1 },
    { id: '5', name: '法务部', count: 0 },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: '陈经理', dept: '总经办', role: '项目总监', email: 'chen@example.com', phone: '13800008888', status: '正常' },
    { id: '2', name: '王志强', dept: '市场部', role: '市场经理', email: 'wang@example.com', phone: '13900007777', status: '正常' },
    { id: '3', name: '李晓明', dept: '技术部', role: '技术专家', email: 'li@example.com', phone: '13700006666', status: '正常' },
    { id: '4', name: '张美玲', dept: '财务部', role: '财务主管', email: 'zhang@example.com', phone: '13600005555', status: '正常' },
  ]);

  const [roles] = useState<Role[]>([
    { id: '1', name: '超级管理员', desc: '拥有系统所有权限', userCount: 2 },
    { id: '2', name: '部门经理', desc: '负责部门内部项目审批与管理', userCount: 8 },
    { id: '3', name: '普通员工', desc: '参与项目执行与标书制作', userCount: 45 },
    { id: '4', name: '财务审计', desc: '仅拥有财务相关查看与审核权限', userCount: 3 },
  ]);

  const tabs = [
    { id: 'dept', label: '部门与人员', icon: Users },
    { id: 'account', label: '账号分配', icon: UserCheck },
    { id: 'role', label: '角色管理', icon: Shield },
    { id: 'permission', label: '权限管理', icon: Key },
  ];

  // Handlers
  const handleAddDept = () => {
    setEditingDept(null);
    setDeptForm({ name: '' });
    setShowDeptModal(true);
  };

  const handleEditDept = (dept: Department) => {
    setEditingDept(dept);
    setDeptForm({ name: dept.name });
    setShowDeptModal(true);
  };

  const handleSaveDept = () => {
    if (!deptForm.name) return;
    if (editingDept) {
      setDepartments(departments.map(d => d.id === editingDept.id ? { ...d, name: deptForm.name } : d));
    } else {
      const newDept = {
        id: Math.random().toString(36).substr(2, 9),
        name: deptForm.name,
        count: 0
      };
      setDepartments([...departments, newDept]);
    }
    setShowDeptModal(false);
  };

  const handleDeleteDept = (id: string) => {
    if (window.confirm('确定要删除该部门吗？')) {
      setDepartments(departments.filter(d => d.id !== id));
      if (selectedDeptId === id) setSelectedDeptId(null);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      dept: selectedDeptId ? departments.find(d => d.id === selectedDeptId)?.name || '' : '',
      role: '',
      email: '',
      phone: '',
      status: '正常'
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({ ...user });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.dept) return;
    
    let updatedUsers;
    if (editingUser) {
      updatedUsers = users.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u);
    } else {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userForm
      };
      updatedUsers = [...users, newUser];
    }
    setUsers(updatedUsers);

    // Update dept counts
    const newDeptCounts = departments.map(dept => ({
      ...dept,
      count: updatedUsers.filter(u => u.dept === dept.name).length
    }));
    setDepartments(newDeptCounts);
    
    setShowUserModal(false);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('确定要删除该人员吗？')) {
      const updatedUsers = users.filter(u => u.id !== id);
      setUsers(updatedUsers);
      
      // Update dept counts
      const newDeptCounts = departments.map(dept => ({
        ...dept,
        count: updatedUsers.filter(u => u.dept === dept.name).length
      }));
      setDepartments(newDeptCounts);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesDept = selectedDeptId ? user.dept === departments.find(d => d.id === selectedDeptId)?.name : true;
    const matchesSearch = user.name.includes(searchQuery) || user.email.includes(searchQuery) || user.role.includes(searchQuery);
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          组织架构管理
        </h3>
        <div className="flex gap-3">
          {activeSubTab === 'dept' && (
            <>
              <button 
                onClick={handleAddDept}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <FolderPlus size={16} /> 新增部门
              </button>
              <button 
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <UserPlus size={16} /> 新增人员
              </button>
            </>
          )}
          {activeSubTab === 'role' && (
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
              <Shield size={16} /> 新增角色
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeSubTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon size={18} />
              {tab.label}
            </div>
            {activeSubTab === tab.id && (
              <motion.div 
                layoutId="activeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {activeSubTab === 'dept' && (
          <>
            {/* Dept List */}
            <div className="col-span-3 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h4 className="font-bold text-sm">部门列表</h4>
                  <button 
                    onClick={() => setSelectedDeptId(null)}
                    className={`text-xs font-bold ${!selectedDeptId ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    全部
                  </button>
                </div>
                <div className="p-2 space-y-1 max-h-[600px] overflow-y-auto">
                  {departments.map((dept) => (
                    <div key={dept.id} className="group relative">
                      <button 
                        onClick={() => setSelectedDeptId(dept.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left ${
                          selectedDeptId === dept.id ? 'bg-primary/5 text-primary' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building size={16} className={selectedDeptId === dept.id ? 'text-primary' : 'text-slate-400'} />
                          <span className="text-sm font-medium">{dept.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            selectedDeptId === dept.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {dept.count}
                          </span>
                        </div>
                      </button>
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEditDept(dept); }}
                          className="p-1 text-slate-400 hover:text-primary hover:bg-white rounded shadow-sm"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteDept(dept.id); }}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-white rounded shadow-sm"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h5 className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                  <Users size={14} /> 组织概况
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 mb-0.5">总人数</p>
                    <p className="text-lg font-bold text-blue-900">{users.length}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 mb-0.5">部门数</p>
                    <p className="text-lg font-bold text-blue-900">{departments.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="col-span-9 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <div className="flex items-center gap-4">
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索姓名、角色或邮箱..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    {selectedDeptId && (
                      <div className="flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold">
                        {departments.find(d => d.id === selectedDeptId)?.name}
                        <button onClick={() => setSelectedDeptId(null)}><X size={12} /></button>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    共 <span className="font-bold text-slate-600">{filteredUsers.length}</span> 位成员
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">姓名</th>
                        <th className="px-6 py-4">部门/角色</th>
                        <th className="px-6 py-4">联系方式</th>
                        <th className="px-6 py-4">状态</th>
                        <th className="px-6 py-4 text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm shadow-sm">
                                {user.name.charAt(0)}
                              </div>
                              <span className="text-sm font-bold text-slate-900">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold text-slate-700">{user.dept}</p>
                              <p className="text-[10px] text-slate-400">{user.role}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <Mail size={12} className="text-slate-400" /> {user.email}
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <Phone size={12} className="text-slate-400" /> {user.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              user.status === '正常' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}>
                              <span className={`size-1.5 rounded-full ${user.status === '正常' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEditUser(user)}
                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                              <Users size={40} className="opacity-20" />
                              <p className="text-sm">暂无匹配人员</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSubTab === 'role' && (
          <div className="col-span-12 grid grid-cols-3 gap-6">
            {roles.map((role) => (
              <div key={role.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Shield size={24} />
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{role.name}</h4>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{role.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-xs text-slate-400">关联用户: <span className="font-bold text-slate-700">{role.userCount}</span></span>
                  <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    配置权限 <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'account' && (
          <div className="col-span-12 bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="size-16 bg-blue-50 rounded-full flex items-center justify-center text-primary">
              <UserCheck size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold">账号分配与管理</h4>
              <p className="text-slate-500 text-sm max-w-md mt-2">
                为组织成员分配系统登录账号，设置初始密码及安全策略。支持批量导入与导出。
              </p>
            </div>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              立即分配账号
            </button>
          </div>
        )}

        {activeSubTab === 'permission' && (
          <div className="col-span-12 bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="size-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
              <Key size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold">权限矩阵管理</h4>
              <p className="text-slate-500 text-sm max-w-md mt-2">
                精细化控制系统各功能模块的访问权限。支持基于角色的权限继承与自定义权限配置。
              </p>
            </div>
            <button className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all">
              配置权限矩阵
            </button>
          </div>
        )}
      </div>

      {/* Dept Modal */}
      <AnimatePresence>
        {showDeptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold">{editingDept ? '编辑部门' : '新增部门'}</h4>
                <button onClick={() => setShowDeptModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">部门名称</label>
                  <input 
                    type="text" 
                    value={deptForm.name}
                    onChange={(e) => setDeptForm({ name: e.target.value })}
                    placeholder="请输入部门名称"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setShowDeptModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveDept}
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Modal */}
      <AnimatePresence>
        {showUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold">{editingUser ? '编辑人员' : '新增人员'}</h4>
                <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">姓名</label>
                  <input 
                    type="text" 
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">部门</label>
                  <select 
                    value={userForm.dept}
                    onChange={(e) => setUserForm({ ...userForm, dept: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  >
                    <option value="">请选择部门</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">角色</label>
                  <input 
                    type="text" 
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    placeholder="如：项目经理"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">状态</label>
                  <select 
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  >
                    <option value="正常">正常</option>
                    <option value="禁用">禁用</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">电子邮箱</label>
                  <input 
                    type="email" 
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">联系电话</label>
                  <input 
                    type="tel" 
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveUser}
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrgStructure;
