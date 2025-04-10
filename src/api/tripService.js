// 模拟的行程数据
const mockTrips = [
  { id: 1, title: '北京三日游', destination: '北京', startDate: '2023-05-01', endDate: '2023-05-03', travelType: 'self' },
  { id: 2, title: '上海周末行', destination: '上海', startDate: '2023-06-10', endDate: '2023-06-12', travelType: 'self' },
  { id: 3, title: '广州美食之旅', destination: '广州', startDate: '2023-07-15', endDate: '2023-07-20', travelType: 'group' },
  { id: 4, title: '杭州西湖游', destination: '杭州', startDate: '2023-08-05', endDate: '2023-08-07', travelType: 'self' },
  { id: 5, title: '成都休闲游', destination: '成都', startDate: '2023-09-20', endDate: '2023-09-25', travelType: 'business' }
];

// 模拟详细行程数据
const mockTripDetails = {
  1: {
    // 行程基本信息
    tripInfo: {
      id: 1,
      title: '北京三日游',
      destination: '北京',
      startDate: '2023-05-01',
      endDate: '2023-05-03',
      travelType: 'self',
      notes: '这是一次北京文化之旅，主要参观北京的历史文化景点。'
    },
    
    // 行程详情
    itinerary: {
      days: [
        {
          day: 1,
          dailyTimeRange: { start: 9, end: 19 },
          color: '#FF5252', // 红色路线
          places: [
            { 
              id: 101, 
              name: '故宫', 
              timeStart: '9:00AM', 
              timeEnd: '11:30AM', 
              description: '故宫博物院，旧称为紫禁城，是中国明清两代的皇家宫殿，位于北京中轴线的中心，是中国古代宫廷建筑之精华。', 
              address: '北京市东城区景山前街4号',
              openingHours: '8:30AM - 5:00PM',
              images: [
                'https://pic3.zhimg.com/80/v2-5e168af0be957562646691bebffd6e45_720w.webp',
                'https://pic1.zhimg.com/80/v2-c86b76a46cd1a6e3d034e6c8763d42e7_720w.webp',
                'https://pic2.zhimg.com/80/v2-1209f7de03035f07ed0e5e5f9b08ea6e_720w.webp'
              ],
              location: {
                lat: 39.916345,
                lng: 116.397155
              }
            },
            { 
              id: 102, 
              name: '四季民福烤鸭店', 
              timeStart: '12:00PM', 
              timeEnd: '1:30PM', 
              description: '四季民福烤鸭店是北京著名的老字号烤鸭店，以其正宗的北京烤鸭和优质的服务而闻名。', 
              address: '北京市东城区王府井大街枣林前街1-2号',
              openingHours: '11:00AM - 9:00PM',
              images: [
                'https://pic1.zhimg.com/80/v2-75ab1deaf0fee171fb0c9a323258d32c_720w.webp',
                'https://pic3.zhimg.com/80/v2-2ae006a7d9110ddd95b4f9b5c9e54ebe_720w.webp',
                'https://pic1.zhimg.com/80/v2-a3bbc6e8d8a407d8150bf4ffa8c11f99_720w.webp'
              ],
              location: {
                lat: 39.914812,
                lng: 116.406177
              }
            },
            { 
              id: 103, 
              name: '天安门广场', 
              timeStart: '2:30PM', 
              timeEnd: '4:30PM', 
              description: '天安门广场是世界上最大的城市中心广场，位于北京市中心，可以观赏到天安门城楼、人民英雄纪念碑等标志性建筑。', 
              address: '北京市东城区东长安街',
              openingHours: '全天开放',
              images: [
                'https://pic1.zhimg.com/80/v2-9ac0a8210d35d56dd3d3fab2de3112d3_720w.webp',
                'https://pic2.zhimg.com/80/v2-16c0a56b1e205d6d98656f856a70cbee_720w.webp',
                'https://pic3.zhimg.com/80/v2-bb60aa3c7c4e762d0dae89d4e6d2a992_720w.webp'
              ],
              location: {
                lat: 39.903524,
                lng: 116.397441
              }
            },
            { 
              id: 104, 
              name: '王府井步行街', 
              timeStart: '5:00PM', 
              timeEnd: '7:00PM', 
              description: '王府井是北京最著名的商业街之一，有着百年历史，汇集各类商场、专卖店和特色小吃。', 
              address: '北京市东城区王府井大街',
              openingHours: '9:00AM - 10:00PM',
              images: [
                'https://pic2.zhimg.com/80/v2-6e2b72606b241ca6a91f465c01831431_720w.webp',
                'https://pic2.zhimg.com/80/v2-be5a863fd3d3f8fb7e812e6e92fa0aeb_720w.webp',
                'https://pic3.zhimg.com/80/v2-63f704989235c52c2a60eb8f1deff505_720w.webp'
              ],
              location: {
                lat: 39.915706,
                lng: 116.41744
              }
            }
          ]
        },
        {
          day: 2,
          dailyTimeRange: { start: 8, end: 18 },
          color: '#2196F3', // 蓝色路线
          places: [
            { 
              id: 201, 
              name: '颐和园', 
              timeStart: '8:00AM', 
              timeEnd: '11:30AM', 
              description: '颐和园是中国清朝时期皇家园林，也是保存最完整的一座皇家行宫御苑，被誉为"皇家园林博物馆"。', 
              address: '北京市海淀区新建宫门路19号',
              openingHours: '6:30AM - 6:00PM',
              images: [
                'https://pic3.zhimg.com/80/v2-e9388e4542e22803f6ed3d13e8a95754_720w.webp',
                'https://pic2.zhimg.com/80/v2-a6e2cb5e2a8b8fd26e8bf84a59f9cc5c_720w.webp',
                'https://pic1.zhimg.com/80/v2-6c8c02791e5a76c5ecad4bf49b0d384c_720w.webp'
              ],
              location: {
                lat: 39.991632,
                lng: 116.273911
              }
            },
            { 
              id: 202, 
              name: '圆明园遗址公园', 
              timeStart: '12:30PM', 
              timeEnd: '2:30PM', 
              description: '圆明园原是清代大型皇家园林，被誉为"万园之园"，现为历史文化遗址公园，展示了当年被毁的皇家园林的壮观和历史悲剧。', 
              address: '北京市海淀区清华西路28号',
              openingHours: '7:00AM - 7:00PM',
              images: [
                'https://pic1.zhimg.com/80/v2-401e5751f0ab8f582bbc5f6e65d89f57_720w.webp',
                'https://pic1.zhimg.com/80/v2-1f61ca3851adbfe35d471d5f8b8c3c3a_720w.webp',
                'https://pic1.zhimg.com/80/v2-b7b53b1bc61f24f88d78c834e1a92d37_720w.webp'
              ],
              location: {
                lat: 40.007763,
                lng: 116.303591
              }
            },
            { 
              id: 203, 
              name: '北京大学', 
              timeStart: '3:00PM', 
              timeEnd: '5:00PM', 
              description: '北京大学是中国最著名的高等学府之一，校园环境优美，有未名湖、博雅塔等著名景点，浓厚的学术氛围吸引许多游客前来参观。', 
              address: '北京市海淀区颐和园路5号',
              openingHours: '校园大门全天开放，未名湖景区9:00AM - 4:00PM',
              images: [
                'https://pic1.zhimg.com/80/v2-43892e6a0a4050fb24b9dd11b41c9265_720w.webp',
                'https://pic2.zhimg.com/80/v2-00151dcb5cb2b3a2658e5d027518260a_720w.webp',
                'https://pic3.zhimg.com/80/v2-b1e09e00163dfe9aa734c6070c38a969_720w.webp'
              ],
              location: {
                lat: 39.992706,
                lng: 116.310504
              }
            }
          ]
        },
        {
          day: 3,
          dailyTimeRange: { start: 7, end: 17 },
          color: '#4CAF50', // 绿色路线
          places: [
            { 
              id: 301, 
              name: '八达岭长城', 
              timeStart: '7:00AM', 
              timeEnd: '12:00PM', 
              description: '八达岭长城是明长城中保存最好的一段，也是最具代表性的一段，登上长城可以领略"不到长城非好汉"的雄伟壮观。', 
              address: '北京市延庆区八达岭特区',
              openingHours: '7:30AM - 5:30PM',
              images: [
                'https://pic3.zhimg.com/80/v2-0c9c53391e90963d5b53f1a5d7d3cd98_720w.webp',
                'https://pic3.zhimg.com/80/v2-04ed9d98751a4e3a4ad5febcf3f0cfcf_720w.webp',
                'https://pic2.zhimg.com/80/v2-2db945ab2e706d1524ab3c0125ed9f29_720w.webp'
              ],
              location: {
                lat: 40.359787,
                lng: 116.020071
              }
            },
            { 
              id: 302, 
              name: '明十三陵', 
              timeStart: '1:30PM', 
              timeEnd: '4:00PM', 
              description: '明十三陵是明朝十三位皇帝的陵墓群，是中国规模最大、体系最完整、保存最好的皇家陵寝建筑群之一。', 
              address: '北京市昌平区十三陵特区',
              openingHours: '8:00AM - 5:30PM',
              images: [
                'https://pic2.zhimg.com/80/v2-87aa94c9dcfade8d13be2ee7cd5fd932_720w.webp',
                'https://pic2.zhimg.com/80/v2-68b9c43d3a33fe85e8f18c9cfe42ce13_720w.webp',
                'https://pic3.zhimg.com/80/v2-8be3d3af384112d7eb7c13a0ad44a6ee_720w.webp'
              ],
              location: {
                lat: 40.299854,
                lng: 116.248711
              }
            }
          ]
        }
      ]
    },
    
    // 交通选项
    transportOptions: {
      walking: true,
      publicTransit: true,
      taxi: true,
      driving: true
    }
  }
};

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

// 获取行程详情
export const getTripDetailsById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tripDetails = mockTripDetails[id];
      if (tripDetails) {
        resolve(tripDetails);
      } else {
        reject(new Error('未找到行程详情'));
      }
    }, 500);
  });
};

// 创建新行程
export const createTrip = (tripData) => {
  // 生成新行程ID
  const newTripId = mockTrips.length + 1;
  
  // 创建新行程对象
  const newTrip = {
    id: newTripId,
    ...tripData
  };
  
  // 添加到模拟行程列表
  mockTrips.push(newTrip);
  
  // 为新行程创建详细行程数据
  const startDate = new Date(tripData.startDate);
  const endDate = new Date(tripData.endDate);
  const tripDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // 根据目的地自动生成行程详情
  const daysArray = [];
  const colors = ['#FF5252', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0'];
  
  for (let i = 0; i < tripDays; i++) {
    daysArray.push({
      day: i + 1,
      dailyTimeRange: { start: 9, end: 19 },
      color: colors[i % colors.length],
      places: generatePlacesForDestination(tripData.destination, i + 1)
    });
  }
  
  // 创建详细行程
  mockTripDetails[newTripId] = {
    tripInfo: {
      ...newTrip,
      notes: tripData.notes || `这是一次${tripData.destination}之旅`
    },
    itinerary: {
      days: daysArray
    }
  };
  
  // 直接返回新创建的行程ID，不使用模拟延迟
  return Promise.resolve({ id: newTripId });
};

// 根据目的地生成对应的景点
function generatePlacesForDestination(destination, day) {
  // 这里根据目的地和天数生成不同的景点组合
  const commonPlaces = [
    {
      id: Math.floor(Math.random() * 10000),
      name: `${destination}博物馆`,
      timeStart: '9:00AM',
      timeEnd: '11:30AM',
      description: `这是${destination}最有名的博物馆，展示了丰富的历史文化遗产。`,
      address: `${destination}市中心区域`,
      openingHours: '9:00AM - 5:00PM',
      requiresBooking: true,
      ticketPrice: '￥60',
      images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
      type: 'attraction',
      location: { lat: 30 + Math.random(), lng: 110 + Math.random() }
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: `${destination}特色餐厅`,
      timeStart: '12:00PM',
      timeEnd: '1:30PM',
      description: `品尝正宗的${destination}本地美食，感受当地饮食文化。`,
      address: `${destination}市美食街`,
      openingHours: '10:00AM - 10:00PM',
      requiresBooking: false,
      ticketPrice: '人均￥100',
      images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
      type: '餐厅',
      location: { lat: 30 + Math.random(), lng: 110 + Math.random() }
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: `${destination}公园`,
      timeStart: '2:30PM',
      timeEnd: '4:30PM',
      description: `这是${destination}最大的城市公园，环境优美，是放松休闲的好去处。`,
      address: `${destination}市公园路`,
      openingHours: '6:00AM - 8:00PM',
      requiresBooking: false,
      ticketPrice: '免费',
      images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
      type: 'attraction',
      location: { lat: 30 + Math.random(), lng: 110 + Math.random() }
    }
  ];
  
  // 为不同的天数添加不同的景点
  if (day === 1) {
    commonPlaces.push({
      id: Math.floor(Math.random() * 10000),
      name: `${destination}古街`,
      timeStart: '5:00PM',
      timeEnd: '7:00PM',
      description: `这条古街保存了${destination}的传统风貌，是体验当地文化的绝佳地点。`,
      address: `${destination}市古城区`,
      openingHours: '全天开放',
      requiresBooking: false,
      ticketPrice: '免费',
      images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
      type: 'attraction',
      location: { lat: 30 + Math.random(), lng: 110 + Math.random() }
    });
  } else if (day === 2) {
    commonPlaces.push({
      id: Math.floor(Math.random() * 10000),
      name: `${destination}山景区`,
      timeStart: '3:00PM',
      timeEnd: '6:00PM',
      description: `${destination}山是当地著名的自然景观，风景秀丽，登山健行非常受欢迎。`,
      address: `${destination}市郊区`,
      openingHours: '7:00AM - 6:00PM',
      requiresBooking: true,
      ticketPrice: '￥80',
      images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
      type: 'attraction',
      location: { lat: 30 + Math.random(), lng: 110 + Math.random() }
    });
  } else {
    commonPlaces.push({
      id: Math.floor(Math.random() * 10000),
      name: `${destination}特产商店`,
      timeStart: '5:00PM',
      timeEnd: '6:30PM',
      description: `这里汇聚了${destination}的各种特色商品和纪念品，是购物的好去处。`,
      address: `${destination}市商业区`,
      openingHours: '10:00AM - 9:00PM',
      requiresBooking: false,
      ticketPrice: '免费',
      images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
      type: 'shopping',
      location: { lat: 30 + Math.random(), lng: 110 + Math.random() }
    });
  }
  
  return commonPlaces;
} 