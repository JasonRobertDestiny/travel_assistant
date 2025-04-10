import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Checkbox, Drawer } from 'antd';
import Header from '../components/Header';
import { getTripDetailsById } from '../api/tripService';
import { mapBackgroundUrl, mapCoordinates } from '../assets/map-background';
import '../styles/ItineraryPage.css';

function ItineraryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  // 状态管理
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // 默认显示总览
  const [dailyTimeRange, setDailyTimeRange] = useState({ start: 9, end: 19 }); // 默认9:00-19:00
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [placeDetail, setPlaceDetail] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [transportMode, setTransportMode] = useState('walking');
  const [showTransportOptions, setShowTransportOptions] = useState(true);
  
  // 获取行程数据
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const data = await getTripDetailsById(parseInt(id));
        setTripDetails(data);
        
        // 设置第一天的时间范围
        if (data && data.itinerary && data.itinerary.days && data.itinerary.days.length > 0) {
          setDailyTimeRange(data.itinerary.days[0].dailyTimeRange || { start: 9, end: 19 });
        }
      } catch (error) {
        console.error('获取行程详情失败', error);
        Modal.error({
          title: '获取行程失败',
          content: '无法获取行程信息，请稍后重试。',
          onOk: () => navigate('/history')
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTripDetails();
  }, [id, navigate]);
  
  // 处理时间范围变化
  const handleTimeRangeChange = (type, value) => {
    setDailyTimeRange(prev => {
      const newRange = { ...prev };
      newRange[type] = value;
      
      // 确保开始时间小于结束时间
      if (type === 'start' && value >= newRange.end) {
        newRange.end = value + 1;
      } else if (type === 'end' && value <= newRange.start) {
        newRange.start = value - 1;
      }
      
      return newRange;
    });
    
    // 保存到当天数据中
    if (tripDetails && currentDayIndex > 0) {
      const updatedDays = [...tripDetails.itinerary.days];
      updatedDays[currentDayIndex - 1].dailyTimeRange = dailyTimeRange;
      
      setTripDetails({
        ...tripDetails,
        itinerary: {
          ...tripDetails.itinerary,
          days: updatedDays
        }
      });
    }
  };
  
  // 处理目的地顺序调整，支持跨天拖动
  const handlePlaceReorder = (draggedId, targetId, sourceDayIndex, targetDayIndex) => {
    if (!tripDetails || !tripDetails.itinerary || !tripDetails.itinerary.days) return;
    
    // 复制当前行程数据
    const newTripDetails = { ...tripDetails };
    const days = [...newTripDetails.itinerary.days];
    
    // 找到被拖动的地点
    let draggedPlace = null;
    let draggedPlaceIndex = -1;
    
    // 查找被拖动的地点及其位置
    for (let i = 0; i < days[sourceDayIndex - 1].places.length; i++) {
      if (days[sourceDayIndex - 1].places[i].id === draggedId) {
        draggedPlace = days[sourceDayIndex - 1].places[i];
        draggedPlaceIndex = i;
        break;
      }
    }
    
    if (!draggedPlace) return;
    
    // 从原位置移除
    days[sourceDayIndex - 1].places.splice(draggedPlaceIndex, 1);
    
    // 找到目标位置并插入
    let targetPlaceIndex = 0;
    for (let i = 0; i < days[targetDayIndex - 1].places.length; i++) {
      if (days[targetDayIndex - 1].places[i].id === targetId) {
        targetPlaceIndex = i;
        break;
      }
    }
    
    // 插入到新位置
    days[targetDayIndex - 1].places.splice(targetPlaceIndex, 0, draggedPlace);
    
    // 更新状态
    newTripDetails.itinerary.days = days;
    setTripDetails(newTripDetails);
  };
  
  // 处理目的地详情查看
  const handleViewPlaceDetail = (place) => {
    setPlaceDetail(place);
  };
  
  // 关闭目的地详情
  const handleClosePlaceDetail = () => {
    setPlaceDetail(null);
  };
  
  // 处理AI助手问题提交
  const handleAiQuestionSubmit = (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    
    // 模拟AI响应
    setAiResponse(`关于"${aiQuestion}"的回答：这是一个模拟的AI助手回答，实际应用中应调用相应的AI服务。`);
    setAiQuestion('');
    setIsAiAssistantOpen(true); // 打开AI助手对话框
  };
  
  // 关闭AI助手
  const handleCloseAiAssistant = () => {
    setIsAiAssistantOpen(false);
  };
  
  // 处理预约功能
  const handleBookingOpen = () => {
    setSelectedPlaces([]);
    setShowBookingModal(true);
  };
  
  // 处理预约提交
  const handleBookingSubmit = () => {
    if (selectedPlaces.length === 0) {
      Modal.warning({
        title: '请选择至少一个预约地点',
        content: '您需要勾选想要预约的地点'
      });
      return;
    }
    
    // 模拟预约成功
    Modal.success({
      title: '预约成功',
      content: '您已成功预约所选地点的门票！'
    });
    
    setShowBookingModal(false);
  };
  
  // 返回按钮处理
  const handleBack = () => {
    navigate(-1);
  };
  
  // 切换出行方式选项显示/隐藏
  const toggleTransportOptions = () => {
    setShowTransportOptions(!showTransportOptions);
  };
  
  // 选择出行方式
  const handleTransportSelect = (mode) => {
    setTransportMode(mode);
  };
  
  // 格式化时间显示
  const formatTimeDisplay = (hour) => {
    return `${hour}:00${hour < 12 ? 'AM' : 'PM'}`;
  };
  
  // 获取当前显示的行程数据
  const getCurrentDayPlaces = () => {
    if (!tripDetails || !tripDetails.itinerary || !tripDetails.itinerary.days) {
      return [];
    }
    
    // 总览模式
    if (currentDayIndex === 0) {
      return tripDetails.itinerary.days;
    }
    
    // 单日模式
    const dayIndex = currentDayIndex - 1;
    if (dayIndex >= 0 && dayIndex < tripDetails.itinerary.days.length) {
      return [tripDetails.itinerary.days[dayIndex]];
    }
    
    return [];
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
  
  if (!tripDetails) {
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
    <div className="itinerary-page">
      <Header title={tripDetails.tripInfo.title} showBackButton onBack={handleBack} />
      
      <div className="itinerary-container">
        {/* 左侧行程条 */}
        <div className="itinerary-sidebar">
          <div 
            className={`sidebar-item ${currentDayIndex === 0 ? 'active' : ''}`}
            onClick={() => setCurrentDayIndex(0)}
          >
            <span className="day-label">总览</span>
          </div>
          
          {tripDetails.itinerary.days.map((day, index) => (
            <div 
              key={index}
              className={`sidebar-item ${currentDayIndex === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentDayIndex(index + 1)}
              draggable={true}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', `day-${index + 1}`)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                try {
                  // 尝试解析拖动的数据
                  const dataStr = e.dataTransfer.getData('text/plain');
                  // 如果是JSON格式的，说明是地点
                  if (dataStr.startsWith('{')) {
                    const data = JSON.parse(dataStr);
                    if (data.id && data.dayIndex && data.dayIndex !== index + 1) {
                      // 确定一个目标ID（这里简单地使用天数的第一个景点）
                      const targetId = day.places.length > 0 ? day.places[0].id : null;
                      if (targetId) {
                        handlePlaceReorder(data.id, targetId, data.dayIndex, index + 1);
                      }
                    }
                  }
                } catch (error) {
                  console.error('拖放数据解析错误', error);
                }
              }}
            >
              <div className="day-label">第{index + 1}天</div>
              <div className="sidebar-places">
                {day.places.map((place, placeIndex) => (
                  <div 
                    key={placeIndex} 
                    className="sidebar-place-item"
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', JSON.stringify({
                        id: place.id,
                        dayIndex: index + 1
                      }));
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      try {
                        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                        if (data.id && data.dayIndex) {
                          handlePlaceReorder(data.id, place.id, data.dayIndex, index + 1);
                        }
                      } catch (error) {
                        console.error('拖放数据解析错误', error);
                      }
                    }}
                  >
                    <span className="place-dot"></span>
                    <span className="place-name">{place.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* 中间行程内容区域 */}
        <div className="itinerary-content">
          {/* 今日游玩时间滑块，仅在单日视图显示 */}
          {currentDayIndex > 0 && (
            <div className="time-range-container">
              <div className="time-range-header">
                <span>今日游玩时间</span>
                <span className="time-display">{formatTimeDisplay(dailyTimeRange.start)} — {formatTimeDisplay(dailyTimeRange.end)}</span>
              </div>
              <div className="time-slider-wrapper">
                <div className="time-slider">
                  <div className="time-slider-track">
                    <div 
                      className="time-slider-fill" 
                      style={{
                        left: `${(dailyTimeRange.start - 9) * 100 / 10}%`,
                        width: `${(dailyTimeRange.end - dailyTimeRange.start) * 100 / 10}%`
                      }}
                    ></div>
                  </div>
                  <input 
                    type="range" 
                    min="9" 
                    max={dailyTimeRange.end - 1} 
                    value={dailyTimeRange.start}
                    onChange={(e) => handleTimeRangeChange('start', parseInt(e.target.value))}
                    className="time-slider-handle start-handle"
                  />
                  <input 
                    type="range" 
                    min={dailyTimeRange.start + 1} 
                    max="19" 
                    value={dailyTimeRange.end}
                    onChange={(e) => handleTimeRangeChange('end', parseInt(e.target.value))}
                    className="time-slider-handle end-handle"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* 行程列表 */}
          <div className="places-container">
            {getCurrentDayPlaces().map((day, dayIndex) => (
              <div key={dayIndex} className="day-places">
                {currentDayIndex === 0 && <h3 className="day-title">第{day.day || dayIndex + 1}天</h3>}
                
                {day.places && day.places.map((place, placeIndex) => (
                  <div 
                    key={placeIndex} 
                    className="place-item"
                    onClick={() => handleViewPlaceDetail(place)}
                  >
                    <div className="place-icon">
                      {place.type === '故宫' || place.type === 'attraction' ? '🏛️' : 
                       place.type === '餐厅' || place.name.includes('店') || place.name.includes('餐') ? '🍽️' : 
                       place.type === '酒店' ? '🏨' : '📍'}
                    </div>
                    <div className="place-info">
                      <h4 className="place-name">{place.name}</h4>
                      <div className="place-time">{place.visitTime || `${place.timeStart || '9:00AM'}-${place.timeEnd || '11:30AM'}`}</div>
                      <div className="place-description">{place.description || '景点描述信息'}</div>
                    </div>
                    
                    {/* 连接线，最后一个不显示 */}
                    {placeIndex < (day.places.length - 1) && (
                      <div className="place-connector">
                        <div className="connector-line"></div>
                      </div>
                    )}
                    
                    {/* 底部操作按钮 */}
                    <div className="place-actions">
                      <button className="action-btn walk">步行</button>
                      <button className="action-btn transit">公共交通</button>
                      <button className="action-btn drive">打车</button>
                      <button className="action-btn bike">骑行</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* 右侧地图 */}
        <div className="itinerary-map">
          <div className="map-container" ref={mapRef}>
            {/* 地图背景 */}
            <div className="map-content" style={{backgroundImage: `url(${mapBackgroundUrl})`}}>
              {/* 第一天路线和点 */}
              <div className={`map-route day1 ${currentDayIndex === 0 || currentDayIndex === 1 ? 'active' : 'inactive'}`}>
                {mapCoordinates.day1.map((point, index) => (
                  <div key={`day1-${index}`} 
                       className="map-marker" 
                       style={{left: `${point.x}%`, top: `${point.y}%`}}>
                    <div className="marker-label">DAY1</div>
                  </div>
                ))}
                <svg className="route-line" width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
                  <path 
                    d={`M ${mapCoordinates.day1[0].x}% ${mapCoordinates.day1[0].y}% 
                        L ${mapCoordinates.day1[1].x}% ${mapCoordinates.day1[1].y}% 
                        L ${mapCoordinates.day1[2].x}% ${mapCoordinates.day1[2].y}%`} 
                    stroke="#FF5252" 
                    strokeWidth="3" 
                    fill="none" 
                  />
                </svg>
              </div>
              
              {/* 第二天路线和点 */}
              <div className={`map-route day2 ${currentDayIndex === 0 || currentDayIndex === 2 ? 'active' : 'inactive'}`}>
                {mapCoordinates.day2.map((point, index) => (
                  <div key={`day2-${index}`} 
                       className="map-marker" 
                       style={{left: `${point.x}%`, top: `${point.y}%`}}>
                    <div className="marker-label">DAY2</div>
                  </div>
                ))}
                <svg className="route-line" width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
                  <path 
                    d={`M ${mapCoordinates.day2[0].x}% ${mapCoordinates.day2[0].y}% 
                        L ${mapCoordinates.day2[1].x}% ${mapCoordinates.day2[1].y}% 
                        L ${mapCoordinates.day2[2].x}% ${mapCoordinates.day2[2].y}%`} 
                    stroke="#2196F3" 
                    strokeWidth="3" 
                    fill="none" 
                  />
                </svg>
              </div>
              
              {/* 第三天路线和点 */}
              <div className={`map-route day3 ${currentDayIndex === 0 || currentDayIndex === 3 ? 'active' : 'inactive'}`}>
                {mapCoordinates.day3.map((point, index) => (
                  <div key={`day3-${index}`} 
                       className="map-marker" 
                       style={{left: `${point.x}%`, top: `${point.y}%`}}>
                    <div className="marker-label">DAY3</div>
                  </div>
                ))}
                <svg className="route-line" width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
                  <path 
                    d={`M ${mapCoordinates.day3[0].x}% ${mapCoordinates.day3[0].y}% 
                        L ${mapCoordinates.day3[1].x}% ${mapCoordinates.day3[1].y}%`} 
                    stroke="#4CAF50" 
                    strokeWidth="3" 
                    fill="none" 
                  />
                </svg>
              </div>
              
              {/* 地图控制 */}
              <div className="map-controls">
                <button className="map-zoom-in">+</button>
                <button className="map-zoom-out">-</button>
              </div>
            </div>
          </div>
          
          {/* AI助手 */}
          <div className={`ai-assistant ${isAiAssistantOpen ? 'expanded' : ''}`}>
            {isAiAssistantOpen && (
              <div className="ai-header">
                <button className="ai-collapse-btn" onClick={handleCloseAiAssistant}>收起</button>
              </div>
            )}
            
            <div className="ai-content">
              {aiResponse && <div className="ai-response">{aiResponse}</div>}
            </div>
            
            <form className="ai-input-form" onSubmit={handleAiQuestionSubmit}>
              <input 
                type="text" 
                placeholder="ask anything..." 
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="ai-input"
              />
              <button type="submit" className="ai-send-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        {/* 底部工具栏 */}
        <div className="itinerary-tools">
          {/* 出行方式选择 */}
          <div className="transport-selector">
            <div className="transport-header" onClick={toggleTransportOptions}>
              <span>出行方式</span>
              <span className={`toggle-arrow ${showTransportOptions ? 'up' : 'down'}`}>
                {showTransportOptions ? '▲' : '▼'}
              </span>
            </div>
            
            {showTransportOptions && (
              <div className="transport-options">
                <button 
                  className={`transport-option ${transportMode === 'walking' ? 'active' : ''}`}
                  onClick={() => handleTransportSelect('walking')}
                >
                  步行
                </button>
                <button 
                  className={`transport-option ${transportMode === 'public' ? 'active' : ''}`}
                  onClick={() => handleTransportSelect('public')}
                >
                  公共交通
                </button>
                <button 
                  className={`transport-option ${transportMode === 'drive' ? 'active' : ''}`}
                  onClick={() => handleTransportSelect('drive')}
                >
                  打车
                </button>
                <button 
                  className={`transport-option ${transportMode === 'bike' ? 'active' : ''}`}
                  onClick={() => handleTransportSelect('bike')}
                >
                  骑行
                </button>
              </div>
            )}
          </div>
          
          {/* 预约按钮 */}
          <button className="booking-btn" onClick={handleBookingOpen}>一键预约购票</button>
        </div>
      </div>
      
      {/* 目的地详情抽屉 */}
      <Drawer
        title={placeDetail?.name}
        placement="right"
        onClose={handleClosePlaceDetail}
        open={!!placeDetail}
        width={500}
      >
        {placeDetail && (
          <div className="place-detail">
            {/* 三张图片展示 */}
            <div className="place-photos">
              {[1, 2, 3].map((i) => (
                <div key={i} className="place-photo">
                  <img 
                    src={placeDetail.photos?.[i-1] || `/images/places/${placeDetail.name}-${i}.jpg`} 
                    alt={`${placeDetail.name}照片${i}`} 
                  />
                </div>
              ))}
            </div>
            
            <div className="place-detail-info">
              <p className="place-description">{placeDetail.description || '这是关于此地点的详细介绍。包含历史背景、特色亮点及游玩建议等信息。'}</p>
              <div className="place-meta">
                <div className="meta-item">
                  <span className="meta-label">开放时间：</span>
                  <span className="meta-value">{placeDetail.openingHours || '9:00AM-5:00PM'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">门票：</span>
                  <span className="meta-value">{placeDetail.ticketPrice || '免费'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">地址：</span>
                  <span className="meta-value">{placeDetail.address || '北京市东城区'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
      
      {/* 预约弹窗 */}
      <Modal
        title="选择预约地点"
        open={showBookingModal}
        onOk={handleBookingSubmit}
        onCancel={() => setShowBookingModal(false)}
        okText="确认预约"
        cancelText="取消"
      >
        <div className="booking-options">
          {tripDetails.itinerary.days.flatMap((day, dayIndex) => 
            day.places.filter(place => place.requiresBooking !== false).map((place, placeIndex) => (
              <div key={`${dayIndex}-${placeIndex}`} className="booking-option">
                <Checkbox 
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlaces(prev => [...prev, place.id]);
                    } else {
                      setSelectedPlaces(prev => prev.filter(id => id !== place.id));
                    }
                  }}
                >
                  {place.name} - {place.ticketPrice || '免费'}
                </Checkbox>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ItineraryPage; 