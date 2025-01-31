import { doc, getDoc, setDoc, increment, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const STATS_COLLECTION = 'activity_stats';

export const activityService = {
  async incrementCompletedDeliveries(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const statsRef = doc(db, STATS_COLLECTION, userId);

    try {
      const statsDoc = await getDoc(statsRef);
      
      if (!statsDoc.exists()) {
        // Create new stats document if it doesn't exist
        await setDoc(statsRef, {
          totalCompletedDeliveries: 1,
          dailyStats: {
            [today.toISOString()]: {
              completedDeliveries: 1,
              lastUpdated: Timestamp.now()
            }
          },
          lastUpdated: Timestamp.now()
        });
      } else {
        // Update existing stats
        const data = statsDoc.data();
        const dailyStats = data.dailyStats || {};
        const todayKey = today.toISOString();
        const todayStats = dailyStats[todayKey] || { completedDeliveries: 0 };

        await setDoc(statsRef, {
          totalCompletedDeliveries: increment(1),
          dailyStats: {
            ...dailyStats,
            [todayKey]: {
              completedDeliveries: todayStats.completedDeliveries + 1,
              lastUpdated: Timestamp.now()
            }
          },
          lastUpdated: Timestamp.now()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Error updating activity stats:', error);
      throw new Error('Failed to update activity statistics');
    }
  }
};