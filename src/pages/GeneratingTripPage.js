import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { createTrip } from '../api/tripService';

function GeneratingTripPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('正在收集旅行信息...');
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  
  useEffect(() => {
    if (!formData) {
      // 如果没有表单数据，返回创建行程页面
      navigate('/create-trip');
      return;
    }
    
    // 模拟进度过程
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 500);
    
    // 更新状态文本
    const statusMessages = [
      { time: 0, message: '正在收集旅行信息...' },
      { time: 2000, message: '正在规划行程路线...' },
      { time: 5000, message: '正在寻找合适的住宿...' },
      { time: 8000, message: '正在准备美食推荐...' },
      { time: 11000, message: '正在整理行程清单...' }
    ];
    
    statusMessages.forEach(({ time, message }) => {
      setTimeout(() => {
        setStatus(message);
      }, time);
    });
    
    // 模拟行程创建过程
    const generationTimeout = setTimeout(async () => {
      try {
        const createdTrip = await createTrip(formData);
        // 创建成功后跳转到行程详情页
        navigate(`/trip/${createdTrip.id}`);
      } catch (error) {
        console.error('行程创建失败', error);
        setStatus('行程创建失败，请重试');
      }
    }, 12000);
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(generationTimeout);
    };
  }, [formData, navigate]);
  
  const handleBack = () => {
    navigate('/create-trip');
  };
  
  return (
    <div className="container">
      <Header title="生成行程中" showBackButton onBack={handleBack} />
      
      <main className="content">
        <div className="generating-container">
          <div className="generating-animation">
            <div className="globe-spinner"></div>
          </div>
          
          <h2>{status}</h2>
          
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="progress-text">{progress}%</p>
          
          <div className="generating-tips">
            <p>我们正在为您精心设计一个完美的旅行体验。</p>
            <p>这可能需要一点时间，请耐心等待...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GeneratingTripPage; 