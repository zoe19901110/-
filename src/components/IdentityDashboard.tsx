import React, { useState, useEffect } from 'react';
import { useIdentity } from '../contexts/IdentityContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Plus, Trash2, FileText, Briefcase } from 'lucide-react';

export const IdentityDashboard: React.FC = () => {
  const { user, currentIdentityId, isPersonal, activeEnterprise } = useIdentity();
  const [data, setData] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (!user) return;

    let q;
    if (isPersonal) {
      q = query(collection(db, 'personalNotes'), where('userId', '==', user.uid));
    } else {
      q = query(collection(db, 'enterpriseProjects'), where('enterpriseId', '==', currentIdentityId));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user, currentIdentityId, isPersonal]);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    try {
      if (isPersonal) {
        await addDoc(collection(db, 'personalNotes'), {
          userId: user?.uid,
          content: newItem,
          createdAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'enterpriseProjects'), {
          enterpriseId: currentIdentityId,
          name: newItem,
          createdAt: serverTimestamp()
        });
      }
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="flex items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <div className="flex items-center space-x-2 text-sm font-medium text-blue-600 mb-1">
            {isPersonal ? <FileText size={16} /> : <Briefcase size={16} />}
            <span>{isPersonal ? '个人身份' : '企业身份'}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isPersonal ? '我的个人笔记' : `${activeEnterprise?.name || '企业'} 项目库`}
          </h1>
          <p className="text-gray-500 mt-2">
            {isPersonal ? '这里存储您的私密笔记，仅您可见。' : '这是企业内部项目，仅企业成员可见。'}
          </p>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex space-x-3">
            <input 
              type="text" 
              placeholder={isPersonal ? "添加新笔记..." : "添加新项目..."}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1 p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            />
            <button 
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-6 rounded-2xl font-semibold hover:bg-blue-700 transition-all flex items-center"
            >
              <Plus size={20} className="mr-2" /> 添加
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {data.map((item) => (
            <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPersonal ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {isPersonal ? <FileText size={20} /> : <Briefcase size={20} />}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{isPersonal ? item.content : item.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    创建于 {item.createdAt?.toDate().toLocaleString() || '刚刚'}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {data.length === 0 && (
            <div className="py-20 text-center text-gray-400">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                  {isPersonal ? <FileText size={32} /> : <Briefcase size={32} />}
                </div>
              </div>
              <p>暂无数据</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
