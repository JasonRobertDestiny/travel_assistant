// 模拟的行程数据
const mockTrips = [
  { id: 1, title: '北京三日游', destination: '北京', startDate: '2023-05-01', endDate: '2023-05-03', travelType: 'self' },
  { id: 2, title: '上海周末行', destination: '上海', startDate: '2023-06-10', endDate: '2023-06-12', travelType: 'self' },
  { id: 3, title: '广州美食之旅', destination: '广州', startDate: '2023-07-15', endDate: '2023-07-20', travelType: 'group' },
  { id: 4, title: '杭州西湖游', destination: '杭州', startDate: '2023-08-05', endDate: '2023-08-07', travelType: 'self' },
  { id: 5, title: '成都休闲游', destination: '成都', startDate: '2023-09-20', endDate: '2023-09-25', travelType: 'business' }
];

// 获取所有行程
export const getAllTrips = () => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      resolve(mockTrips);
    }, 500);
  });
};

// 根据ID获取行程
export const getTripById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const trip = mockTrips.find(trip => trip.id === id);
      if (trip) {
        resolve(trip);
      } else {
        reject(new Error('未找到行程'));
      }
    }, 500);
  });
};

// 创建新行程
export const createTrip = (tripData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTrip = {
        id: mockTrips.length + 1,
        ...tripData
      };
      // 在实际应用中，这里会将数据发送到服务器
      mockTrips.push(newTrip);
      resolve(newTrip);
    }, 500);
  });
}; 