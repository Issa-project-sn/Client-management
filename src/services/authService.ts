import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  getAuth
} from 'firebase/auth';
import { userService } from './userService';
import { CompanyProfile } from '../types/user';
import app from '../config/firebase';

const auth = getAuth(app);

export const authService = {
  async signUp(email: string, password: string, companyProfile: CompanyProfile): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      await userService.createUserProfile(userCredential.user.uid, {
        email,
        company: companyProfile,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  async signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  },

  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser(): User | null {
    return auth.currentUser;
  }
};