import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getTripById } from '../api/tripService';

function TripDetailPage() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        const data = await getTripById(parseInt(id));
        setTrip(data);
      } catch (error) {
        console.error('获取行程详情失败', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container">
        <Header title="行程详情" showBackButton onBack={handleBack} />
        <div className="loading-container">
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="container">
        <Header title="行程详情" showBackButton onBack={handleBack} />
        <div className="error-container">
          <p>未找到行程</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header title={trip.title} showBackButton onBack={handleBack} />
      
      <main className="content">
        <div className="trip-detail">
          <div className="trip-detail-header">
            <h2>{trip.destination}</h2>
            <p>{trip.startDate} - {trip.endDate}</p>
            <p>出行方式: {
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
            }</p>
          </div>
          
          {trip.notes && (
            <div className="trip-detail-notes">
              <h3>备注</h3>
              <p>{trip.notes}</p>
            </div>
          )}
          
          <div className="trip-detail-itinerary">
            <h3>行程安排</h3>
            <p>行程详情内容将在此展示</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TripDetailPage; 