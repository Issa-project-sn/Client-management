import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { DeliveryDetails } from '../types/delivery';
import { convertToFirestoreData } from '../utils/firestore-converters';

const COLLECTION_NAME = 'delivery_requests';
const COMPLETED_COLLECTION = 'completed_deliveries';
const REJECTED_COLLECTION = 'rejected_deliveries';
const RESCHEDULED_COLLECTION = 'rescheduled_deliveries';

export const deliveryService = {
  async createDelivery(delivery: DeliveryDetails): Promise<string> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User must be logged in to create a delivery');
      }

      const deliveryData = {
        ...convertToFirestoreData(delivery),
        userId: currentUser.uid,
        createdAt: new Date(),
        status: 'pending'
      };
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), deliveryData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating delivery request:', error);
      throw new Error('Failed to create delivery request. Please try again.');
    }
  },

  async updateDelivery(id: string, delivery: DeliveryDetails): Promise<void> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User must be logged in to update a delivery');
      }

      const deliveryRef = doc(db, COLLECTION_NAME, id);
      const deliveryData = convertToFirestoreData(delivery);
      
      await updateDoc(deliveryRef, deliveryData);
    } catch (error) {
      console.error('Error updating delivery:', error);
      throw new Error('Failed to update delivery. Please try again.');
    }
  },

  async getActiveDeliveries(): Promise<DeliveryDetails[]> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return [];
      }

      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', currentUser.uid),
        where('status', 'in', ['pending', 'in_progress']),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        scheduledTime: doc.data().scheduledTime.toDate()
      } as DeliveryDetails));
    } catch (error) {
      console.error('Error fetching active deliveries:', error);
      return [];
    }
  }
};