import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ClerkProvider, 
  useUser as useClerkUser, 
  useAuth as useClerkAuth, 
  useSignIn as useClerkSignIn, 
  useSignUp as useClerkSignUp,
  useClerk
} from '@clerk/clerk-react';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

interface AuthContextType {
  isSignedIn: boolean;
  user: UserProfile | null;
  isClerkConfigured: boolean;
  openAuthModal: (mode?: 'signin' | 'signup', redirectAction?: () => void) => void;
  closeAuthModal: () => void;
  signOut: () => Promise<void>;
  authModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  pendingRedirectAction: (() => void) | null;
  // Fallback direct sign-in/up methods when running in test/sandbox
  localSignIn: (email: string, name?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
export const hasValidClerkKey = Boolean(
  CLERK_PUBLISHABLE_KEY && 
  CLERK_PUBLISHABLE_KEY.startsWith('pk_') && 
  !CLERK_PUBLISHABLE_KEY.includes('YOUR_CLERK_PUBLISHABLE_KEY')
);

// Inner context consumer when Clerk is active
const ClerkInnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded: userLoaded, isSignedIn, user } = useClerkUser();
  const { signOut } = useClerk();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [pendingRedirectAction, setPendingRedirectAction] = useState<(() => void) | null>(null);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin', redirectAction?: () => void) => {
    setAuthModalMode(mode);
    if (redirectAction) {
      setPendingRedirectAction(() => redirectAction);
    }
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const userProfile: UserProfile | null = isSignedIn && user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    name: user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Aspirant',
    avatarUrl: user.imageUrl
  } : null;

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: Boolean(isSignedIn),
        user: userProfile,
        isClerkConfigured: true,
        openAuthModal,
        closeAuthModal,
        signOut: handleSignOut,
        authModalOpen,
        authModalMode,
        pendingRedirectAction,
        localSignIn: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Fallback provider when Clerk key is not yet added in environment
const FallbackAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    return localStorage.getItem('mockmaster_auth_signed_in') === 'true';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('mockmaster_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [pendingRedirectAction, setPendingRedirectAction] = useState<(() => void) | null>(null);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin', redirectAction?: () => void) => {
    setAuthModalMode(mode);
    if (redirectAction) {
      setPendingRedirectAction(() => redirectAction);
    }
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const localSignIn = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      avatarUrl: '/src/assets/images/avatar_mentor_1794057337587.jpg'
    };
    setIsSignedIn(true);
    setUser(newUser);
    localStorage.setItem('mockmaster_auth_signed_in', 'true');
    localStorage.setItem('mockmaster_auth_user', JSON.stringify(newUser));
    setAuthModalOpen(false);

    if (pendingRedirectAction) {
      pendingRedirectAction();
      setPendingRedirectAction(null);
    }
  };

  const signOut = async () => {
    setIsSignedIn(false);
    setUser(null);
    localStorage.removeItem('mockmaster_auth_signed_in');
    localStorage.removeItem('mockmaster_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        isClerkConfigured: false,
        openAuthModal,
        closeAuthModal,
        signOut,
        authModalOpen,
        authModalMode,
        pendingRedirectAction,
        localSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const ClerkAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (hasValidClerkKey) {
    return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <ClerkInnerAuthProvider>{children}</ClerkInnerAuthProvider>
      </ClerkProvider>
    );
  }

  return <FallbackAuthProvider>{children}</FallbackAuthProvider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within ClerkAuthProvider');
  }
  return context;
};
