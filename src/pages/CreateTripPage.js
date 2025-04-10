import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Modal } from 'antd';
import '../styles/CreateTripPage.css';

function CreateTripPage() {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelType: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const { title, destination, startDate, endDate, travelType } = formData;
    return title && destination && startDate && endDate && travelType;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Modal.error({
        title: '请填完页面信息',
        content: '请确保您已填写所有必填字段（行程名称、目的地、出发日期、结束日期和出行方式）。',
      });
      return;
    }
    
    setLoading(true);
    
    // 跳转到生成行程页面，并传递表单数据
    navigate('/generating-trip', { state: { formData } });
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="container">
      <Header title="创建新的行程" showBackButton onBack={handleBack} />
      
      <main className="content">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">行程名称 <span className="required">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="给您的行程起个名字"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="destination">目的地 <span className="required">*</span></label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="您想去哪里？"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">出发日期 <span className="required">*</span></label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">结束日期 <span className="required">*</span></label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="travelType">出行方式 <span className="required">*</span></label>
            <select
              id="travelType"
              name="travelType"
              value={formData.travelType}
              onChange={handleInputChange}
            >
              <option value="">-- 请选择 --</option>
              <option value="self">自由行</option>
              <option value="group">跟团游</option>
              <option value="business">商务出行</option>
              <option value="study">学习考察</option>
              <option value="drive">自驾游</option>
              <option value="bicycle">骑行</option>
              <option value="train">火车</option>
              <option value="cruise">邮轮</option>
              <option value="hiking">徒步</option>
              <option value="camping">露营</option>
              <option value="backpack">背包客</option>
              <option value="food">美食之旅</option>
              <option value="photography">摄影之旅</option>
              <option value="sports">体育赛事</option>
              <option value="culture">文化探索</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">备注</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="添加一些关于这次行程的备注..."
              rows="4"
            ></textarea>
          </div>
          
          <button type="submit" className="btn-generate" disabled={loading}>
            {loading ? '生成中...' : '立即生成'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateTripPage; 