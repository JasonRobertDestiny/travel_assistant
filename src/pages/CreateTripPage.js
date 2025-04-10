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
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const { title, destination, startDate, endDate, travelType } = formData;
    const newErrors = {};
    let isValid = true;
    
    // 检查必填字段
    if (!title.trim()) {
      newErrors.title = '请输入行程名称';
      isValid = false;
    }
    
    if (!destination.trim()) {
      newErrors.destination = '请输入目的地';
      isValid = false;
    }
    
    if (!startDate) {
      newErrors.startDate = '请选择出发日期';
      isValid = false;
    }
    
    if (!endDate) {
      newErrors.endDate = '请选择结束日期';
      isValid = false;
    } else if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = '结束日期不能早于出发日期';
      isValid = false;
    }
    
    if (!travelType) {
      newErrors.travelType = '请选择出行方式';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Modal.error({
        title: '请填完页面信息',
        content: '请确保您已填写所有必填字段（标记 * 的字段）并确保信息正确。',
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
  
  // 获取输入框的类名（普通/错误状态）
  const getInputClassName = (fieldName) => {
    return errors[fieldName] ? 'form-input error' : 'form-input';
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
              className={getInputClassName('title')}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
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
              className={getInputClassName('destination')}
            />
            {errors.destination && <div className="error-message">{errors.destination}</div>}
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
                className={getInputClassName('startDate')}
              />
              {errors.startDate && <div className="error-message">{errors.startDate}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">结束日期 <span className="required">*</span></label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={getInputClassName('endDate')}
                min={formData.startDate}
              />
              {errors.endDate && <div className="error-message">{errors.endDate}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="travelType">出行方式 <span className="required">*</span></label>
            <select
              id="travelType"
              name="travelType"
              value={formData.travelType}
              onChange={handleInputChange}
              className={getInputClassName('travelType')}
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
            {errors.travelType && <div className="error-message">{errors.travelType}</div>}
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
          
          <div className="form-note">
            <p>带 <span className="required">*</span> 的字段为必填项</p>
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