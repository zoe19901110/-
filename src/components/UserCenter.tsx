import React, { useState, useEffect } from 'react';
import { useIdentity } from '../contexts/IdentityContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { Building2, User, Plus, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UserCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user, currentIdentityId, switchIdentity } = useIdentity();
  const [enterprises, setEnterprises] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEnterpriseName, setNewEnterpriseName] = useState('');

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'enterpriseMembers'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const enterpriseIds = snapshot.docs.map(doc => doc.data().enterpriseId);
      if (enterpriseIds.length > 0) {
        // Fetch enterprise details
        const enterprisePromises = enterpriseIds.map(id => {
          return new Promise((resolve) => {
            onSnapshot(doc(db, 'enterprises', id), (doc) => {
              if (doc.exists()) {
                resolve({ id: doc.id, ...doc.data() });
              } else {
                resolve(null);
              }
            });
          });
        });
        const results = await Promise.all(enterprisePromises);
        setEnterprises(results.filter(e => e !== null));
      } else {
        setEnterprises([]);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleAddEnterprise = async () => {
    if (!user || !newEnterpriseName.trim()) return;
    try {
      const enterpriseRef = await addDoc(collection(db, 'enterprises'), {
        name: newEnterpriseName,
        ownerId: user.uid,
        createdAt: serverTimestamp()
      });
      
      // Add as admin member
      await setDoc(doc(db, 'enterpriseMembers', `${enterpriseRef.id}_${user.uid}`), {
        enterpriseId: enterpriseRef.id,
        userId: user.uid,
        role: 'admin'
      });

      setNewEnterpriseName('');
      setIsAdding(false);
      // Automatically switch to new enterprise
      await switchIdentity(enterpriseRef.id);
    } catch (error) {
      console.error('Error adding enterprise:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">用户中心</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Plus className="rotate-45" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Personal Identity */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">个人身份</h3>
            <button 
              onClick={() => { switchIdentity('personal'); onClose(); }}
              className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                currentIdentityId === 'personal' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-100 hover:border-gray-200 text-gray-700'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                <User size={20} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{user?.displayName || '个人用户'}</div>
                <div className="text-xs opacity-70">{user?.email}</div>
              </div>
              {currentIdentityId === 'personal' && <Check size={20} />}
            </button>
          </section>

          {/* Enterprise Identities */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">企业身份</h3>
              <button 
                onClick={() => setIsAdding(true)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center"
              >
                <Plus size={14} className="mr-1" /> 新增企业
              </button>
            </div>

            <div className="space-y-3">
              {enterprises.map((ent) => (
                <button 
                  key={ent.id}
                  onClick={() => { switchIdentity(ent.id); onClose(); }}
                  className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                    currentIdentityId === ent.id 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
                    <Building2 size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{ent.name}</div>
                    <div className="text-xs opacity-70">企业 ID: {ent.id.slice(0, 8)}...</div>
                  </div>
                  {currentIdentityId === ent.id && <Check size={20} />}
                </button>
              ))}
              
              {enterprises.length === 0 && !isAdding && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  暂无企业身份
                </div>
              )}
            </div>
          </section>

          {/* Add Enterprise Form */}
          <AnimatePresence>
            {isAdding && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100">
                  <input 
                    type="text" 
                    placeholder="输入企业名称"
                    value={newEnterpriseName}
                    onChange={(e) => setNewEnterpriseName(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleAddEnterprise}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      确认新增
                    </button>
                    <button 
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
