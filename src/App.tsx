import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuctionProvider, useAuctions } from './context/AuctionContext';

import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { LowConnectionBanner } from './components/common/LowConnectionBanner';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';

import { HomePage } from './pages/public/HomePage';
import { AuctionsPage } from './pages/public/AuctionsPage';
import { AuctionDetailPage } from './pages/public/AuctionDetailPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { FaqPage } from './pages/public/FaqPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

import { UserDashboardPage } from './pages/user/UserDashboardPage';
import { MyBidsPage } from './pages/user/MyBidsPage';
import { MyWinsPage } from './pages/user/MyWinsPage';
import { WatchlistPage } from './pages/user/WatchlistPage';
import { ProfileSettingsPage } from './pages/user/ProfileSettingsPage';

import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminBikesPage } from './pages/admin/AdminBikesPage';
import { AdminAuctionsPage } from './pages/admin/AdminAuctionsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminBidsPage } from './pages/admin/AdminBidsPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminWinnersPage } from './pages/admin/AdminWinnersPage';

import { BikeModal } from './components/admin/BikeModal';
import { AuctionModal } from './components/admin/AuctionModal';

import { Bike, Auction } from './types';
import { bikeService } from './services/bike.service';
import { auctionService } from './services/auction.service';

const MainApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedAuctionId, setSelectedAuctionId] = useState<string>('auction-1');

  // Admin Modals State
  const [bikeModalOpen, setBikeModalOpen] = useState(false);
  const [selectedBikeForEdit, setSelectedBikeForEdit] = useState<Bike | null>(null);

  const [auctionModalOpen, setAuctionModalOpen] = useState(false);
  const [selectedAuctionForEdit, setSelectedAuctionForEdit] = useState<Auction | null>(null);

  const { refreshAuctions } = useAuctions();
  const { showToast } = useToast();

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAuction = (id: string) => {
    setSelectedAuctionId(id);
    handleNavigate(`/auctions/${id}`);
  };

  const handleSaveBike = (bikeData: any) => {
    if (bikeData.id) {
      bikeService.updateBike(bikeData.id, bikeData);
      showToast({ type: 'success', title: 'Motorcycle Updated', message: 'Vehicle specifications saved.' });
    } else {
      bikeService.createBike(bikeData);
      showToast({ type: 'success', title: 'Motorcycle Added', message: 'New superbike registered into inventory.' });
    }
    refreshAuctions();
  };

  const handleSaveAuction = (auctionData: any) => {
    if (auctionData.id) {
      auctionService.updateAuction(auctionData.id, auctionData);
      showToast({ type: 'success', title: 'Auction Updated', message: 'Auction configuration modified.' });
    } else {
      auctionService.createAuction(auctionData);
      showToast({ type: 'success', title: 'Auction Scheduled', message: 'Live auction slated for bidding.' });
    }
    refreshAuctions();
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <div className="app-container">
      {/* Top Persona & Network Switcher Bar */}
      <RoleSwitcherBar />

      {/* Low-bandwidth alert banner */}
      <LowConnectionBanner />

      {/* Main Navbar */}
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Toast notifications container */}
      <ToastContainer />

      {/* Admin Layout vs Regular Layout */}
      {isAdminRoute ? (
        <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 120px)' }}>
          <AdminSidebar currentPath={currentPath} onNavigate={handleNavigate} />
          <div style={{ flex: 1, overflowX: 'auto', backgroundColor: 'var(--bg-asphalt)' }}>
            {currentPath === '/admin' && (
              <AdminDashboardPage
                onNavigate={handleNavigate}
                onOpenCreateBike={() => {
                  setSelectedBikeForEdit(null);
                  setBikeModalOpen(true);
                }}
                onOpenCreateAuction={() => {
                  setSelectedAuctionForEdit(null);
                  setAuctionModalOpen(true);
                }}
              />
            )}
            {currentPath === '/admin/bikes' && (
              <AdminBikesPage
                onOpenCreate={() => {
                  setSelectedBikeForEdit(null);
                  setBikeModalOpen(true);
                }}
                onEditBike={(b) => {
                  setSelectedBikeForEdit(b);
                  setBikeModalOpen(true);
                }}
              />
            )}
            {currentPath === '/admin/auctions' && (
              <AdminAuctionsPage
                onOpenCreate={() => {
                  setSelectedAuctionForEdit(null);
                  setAuctionModalOpen(true);
                }}
                onEditAuction={(a) => {
                  setSelectedAuctionForEdit(a);
                  setAuctionModalOpen(true);
                }}
              />
            )}
            {currentPath === '/admin/users' && <AdminUsersPage />}
            {currentPath === '/admin/bids' && <AdminBidsPage />}
            {currentPath === '/admin/payments' && <AdminPaymentsPage />}
            {currentPath === '/admin/winners' && <AdminWinnersPage />}
          </div>
        </div>
      ) : (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {currentPath === '/' && (
            <HomePage onNavigate={handleNavigate} onSelectAuction={handleSelectAuction} />
          )}
          {currentPath === '/auctions' && (
            <AuctionsPage onSelectAuction={handleSelectAuction} />
          )}
          {currentPath.startsWith('/auctions/') && (
            <AuctionDetailPage
              auctionId={selectedAuctionId}
              onBack={() => handleNavigate('/auctions')}
              onRegisterClick={() => handleNavigate('/register')}
              onPaymentClick={() => handleNavigate('/register')}
            />
          )}
          {currentPath === '/how-it-works' && <HowItWorksPage onNavigate={handleNavigate} />}
          {currentPath === '/about' && <AboutPage />}
          {currentPath === '/faq' && <FaqPage />}
          {currentPath === '/login' && <LoginPage onNavigate={handleNavigate} />}
          {currentPath === '/register' && <RegisterPage onNavigate={handleNavigate} />}

          {/* User Dashboard Routes */}
          {currentPath === '/dashboard' && (
            <UserDashboardPage onNavigate={handleNavigate} onSelectAuction={handleSelectAuction} />
          )}
          {currentPath === '/dashboard/bids' && (
            <MyBidsPage onSelectAuction={handleSelectAuction} onNavigate={handleNavigate} />
          )}
          {currentPath === '/dashboard/wins' && (
            <MyWinsPage onNavigate={handleNavigate} />
          )}
          {currentPath === '/dashboard/watchlist' && (
            <WatchlistPage onSelectAuction={handleSelectAuction} onNavigate={handleNavigate} />
          )}
          {currentPath === '/dashboard/profile' && (
            <ProfileSettingsPage onNavigate={handleNavigate} />
          )}
        </main>
      )}

      {/* Footer */}
      {!isAdminRoute && <Footer onNavigate={handleNavigate} />}

      {/* Authenticated Mobile Bottom Navigation */}
      <MobileBottomNav currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Admin Bike Modal */}
      <BikeModal
        isOpen={bikeModalOpen}
        bike={selectedBikeForEdit}
        onClose={() => setBikeModalOpen(false)}
        onSave={handleSaveBike}
      />

      {/* Admin Auction Modal */}
      <AuctionModal
        isOpen={auctionModalOpen}
        auction={selectedAuctionForEdit}
        bikes={bikeService.getAllBikes()}
        onClose={() => setAuctionModalOpen(false)}
        onSave={handleSaveAuction}
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AuctionProvider>
          <MainApp />
        </AuctionProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
