// 地图背景URL
export const mapBackgroundUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=Beijing,China&zoom=12&size=800x600&maptype=roadmap&key=YOUR_API_KEY';

// 模拟的地图坐标点
export const mapCoordinates = {
  // 第一天路线点坐标
  day1: [
    { x: 40, y: 70, name: '故宫', id: 101 },
    { x: 55, y: 75, name: '四季民福烤鸭店', id: 102 },
    { x: 70, y: 80, name: '天安门广场', id: 103 },
  ],
  // 第二天路线点坐标
  day2: [
    { x: 40, y: 40, name: '颐和园', id: 201 },
    { x: 50, y: 45, name: '圆明园', id: 202 },
    { x: 60, y: 50, name: '北京大学', id: 203 },
  ],
  // 第三天路线点坐标
  day3: [
    { x: 75, y: 30, name: '八达岭长城', id: 301 },
    { x: 65, y: 35, name: '明十三陵', id: 302 },
  ]
}; 