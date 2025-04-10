const axios = require('axios');

// FireCrawl API密钥
const FIRE_CRAWL_API_KEY = 'fc-93451bbf9c4042d087feb4fee44bf72b';

// 爬取GitHub趋势页面
async function crawlGithubTrending() {
  try {
    const response = await axios.post(
      'https://api.firecrawl.dev/v1/scrape',
      {
        url: 'https://github.com/trending',
        timeout: 30000
      },
      {
        headers: {
          'Authorization': `Bearer ${FIRE_CRAWL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('爬取结果:', response.data);
    return response.data;
  } catch (error) {
    console.error('爬取失败:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// 执行爬取
crawlGithubTrending()
  .then(data => {
    console.log('成功完成爬取任务');
  })
  .catch(err => {
    console.error('爬取过程中出错:', err);
  }); 