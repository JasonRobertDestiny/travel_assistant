import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { createTrip } from '../api/tripService';
import { Modal } from 'antd';
import '../styles/GeneratingTripPage.css';

function GeneratingTripPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('正在收集旅行信息...');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  
  useEffect(() => {
    if (!formData) {
      // 如果没有表单数据，返回创建行程页面
      Modal.warning({
        title: '创建行程出错',
        content: '未接收到行程信息，请重新填写行程表单。',
        onOk: () => navigate('/create-trip')
      });
      return;
    }
    
    // 模拟进度过程
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 300);
    
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
        setError('行程创建失败，请重试');
        setStatus('生成过程出错');
        
        Modal.error({
          title: '行程创建失败',
          content: '很抱歉，行程创建过程中发生错误，请重试。',
          onOk: () => navigate('/create-trip')
        });
      }
    }, 15000); // 增加到15秒，让动画有足够时间展示
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(generationTimeout);
    };
  }, [formData, navigate]);
  
  const handleBack = () => {
    // 显示确认对话框
    Modal.confirm({
      title: '确定要取消行程生成？',
      content: '行程生成正在进行中，返回将取消此次生成。',
      okText: '确定返回',
      cancelText: '继续等待',
      onOk: () => navigate('/create-trip')
    });
  };
  
  return (
    <div className="container">
      <Header title="生成行程中" showBackButton onBack={handleBack} />
      
      <main className="content">
        <div className="generating-container">
          <div className="generating-animation">
            <div className="globe-spinner"></div>
          </div>
          
          <h2 className={error ? 'error-text' : ''}>{status}</h2>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className={`progress-bar-fill ${error ? 'error' : ''}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <p className="progress-text">{progress}%</p>
          </div>
          
          <div className="generating-tips">
            <p>我们正在为您精心设计一个完美的旅行体验。</p>
            <p>这可能需要一点时间，请耐心等待...</p>
            {error && (
              <p className="error-tip">
                {error} <button className="retry-btn" onClick={() => navigate('/create-trip')}>返回重试</button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GeneratingTripPage; 