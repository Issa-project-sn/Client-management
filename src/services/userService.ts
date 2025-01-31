import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProfile } from '../types/user';

export const userService = {
  async createUserProfile(userId: string, profile: UserProfile): Promise<void> {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...profile,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  },

  async updateUserProfile(userId: string, profile: UserProfile): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        ...profile,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }
};