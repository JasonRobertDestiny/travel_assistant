import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAllTrips } from '../api/tripService';
import '../styles/HomePage.css';

function HomePage() {
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // 从API获取行程数据
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await getAllTrips();
        // 只取前5个行程作为精选
        setFeaturedTrips(data.slice(0, 5));
      } catch (error) {
        console.error('获取行程数据失败', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, []);
  
  // 处理创建新行程按钮点击
  const handleCreateTrip = () => {
    navigate('/create-trip');
  };
  
  // 处理行程卡片点击
  const handleTripClick = (tripId) => {
    navigate(`/trip/${tripId}`);
  };
  
  return (
    <div className="container">
      <Header title="旅行助手" />
      
      <main className="content">
        <div className="earth-container">
          <div className="static-earth">
            <div className="create-trip-button-container">
              <button className="btn-create-trip" onClick={handleCreateTrip}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                创建新的行程
              </button>
            </div>
          </div>
        </div>
        
        <section className="featured-trips-section">
          <h2 className="section-title">行程精选</h2>
          
          {loading ? (
            <div className="loading-container">
              <p>加载中...</p>
            </div>
          ) : (
            <div className="featured-trips-grid">
              {featuredTrips.map(trip => (
                <div 
                  key={trip.id} 
                  className="featured-trip-card"
                  onClick={() => handleTripClick(trip.id)}
                >
                  <div className="trip-image-placeholder"></div>
                  <div className="trip-card-content">
                    <h3>{trip.title}</h3>
                    <p className="trip-destination">{trip.destination}</p>
                    <p className="trip-date">{trip.startDate} - {trip.endDate}</p>
                    <div className="trip-tags">
                      <span className="trip-tag">{
                        trip.travelType === 'self' ? '自由行' :
                        trip.travelType === 'group' ? '跟团游' :
                        trip.travelType === 'business' ? '商务出行' :
                        trip.travelType === 'study' ? '学习考察' :
                        trip.travelType === 'drive' ? '自驾游' :
                        trip.travelType === 'bicycle' ? '骑行' :
                        trip.travelType === 'train' ? '火车' :
                        trip.travelType === 'cruise' ? '邮轮' :
                        trip.travelType === 'hiking' ? '徒步' :
                        trip.travelType === 'camping' ? '露营' : '其他'
                      }</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage; 