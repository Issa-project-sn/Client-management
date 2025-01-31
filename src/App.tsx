import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from './components/Auth';
import { Navbar } from './components/navigation/Navbar';
import { DeliveryRequests } from './pages/DeliveryRequests';
import { AcceptedDeliveries } from './pages/AcceptedDeliveries';
import { CompletedDeliveries } from './pages/CompletedDeliveries';
import { RescheduledDeliveries } from './pages/RescheduledDeliveries';
import { RejectedDeliveries } from './pages/RejectedDeliveries';
import { ActivityPage } from './pages/ActivityPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="md:pl-64">
        <main className="py-4">
          <Routes>
            <Route path="/" element={<DeliveryRequests />} />
            <Route path="/accepted" element={<AcceptedDeliveries />} />
            <Route path="/completed" element={<CompletedDeliveries />} />
            <Route path="/rescheduled" element={<RescheduledDeliveries />} />
            <Route path="/rejected" element={<RejectedDeliveries />} />
            <Route path="/activity" element={<ActivityPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}