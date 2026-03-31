import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface IdentityContextType {
  user: User | null;
  currentIdentityId: string; // 'personal' or enterpriseId
  isPersonal: boolean;
  activeEnterprise: any | null;
  switchIdentity: (id: string) => Promise<void>;
  loading: boolean;
}

const IdentityContext = createContext<IdentityContextType | undefined>(undefined);

export const IdentityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentIdentityId, setCurrentIdentityId] = useState<string>('personal');
  const [activeEnterprise, setActiveEnterprise] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) {
        setCurrentIdentityId('personal');
        setActiveEnterprise(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    let unsubscribeUser: () => void;

    const setupUser = async () => {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          currentIdentityId: 'personal'
        });
      }

      unsubscribeUser = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const newId = data.currentIdentityId || 'personal';
          setCurrentIdentityId((prev) => {
            if (prev !== newId) return newId;
            return prev;
          });
        }
        setLoading(false);
      });
    };

    setupUser();

    return () => {
      if (unsubscribeUser) unsubscribeUser();
    };
  }, [user]);

  useEffect(() => {
    if (user && currentIdentityId !== 'personal') {
      const unsubscribeEnterprise = onSnapshot(doc(db, 'enterprises', currentIdentityId), (doc) => {
        if (doc.exists()) {
          const data = { id: doc.id, ...doc.data() };
          setActiveEnterprise((prev: any) => {
            // Simple check to avoid unnecessary state updates
            if (prev?.id === data.id && JSON.stringify(prev) === JSON.stringify(data)) return prev;
            return data;
          });
        } else {
          setActiveEnterprise(null);
          // Fallback if enterprise deleted
          switchIdentity('personal');
        }
      });
      return () => unsubscribeEnterprise();
    } else {
      setActiveEnterprise(null);
    }
  }, [user, currentIdentityId]);

  const switchIdentity = async (id: string) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { currentIdentityId: id }, { merge: true });
  };

  return (
    <IdentityContext.Provider value={{ 
      user, 
      currentIdentityId, 
      isPersonal: currentIdentityId === 'personal',
      activeEnterprise,
      switchIdentity,
      loading
    }}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentity = () => {
  const context = useContext(IdentityContext);
  if (context === undefined) {
    throw new Error('useIdentity must be used within an IdentityProvider');
  }
  return context;
};
