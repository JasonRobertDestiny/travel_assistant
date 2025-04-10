import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateTripPage from './pages/CreateTripPage';
import TripDetailPage from './pages/TripDetailPage';
import ItineraryPage from './pages/ItineraryPage';
import DiscoverPage from './pages/DiscoverPage';
import CommunityPage from './pages/CommunityPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import GeneratingTripPage from './pages/GeneratingTripPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-trip" element={<CreateTripPage />} />
      <Route path="/trip/:id" element={<TripDetailPage />} />
      <Route path="/itinerary/:id" element={<ItineraryPage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/generating-trip" element={<GeneratingTripPage />} />
    </Routes>
  );
}

export default App; 