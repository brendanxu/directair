// pages/index/index.js
Page({
  data: {
    // 本地局域网测试地址 (同一局域网 Wi-Fi 下可直接真机访问)
    // 部署到公网 (如 Vercel / Cloudflare) 后可替换为生产 HTTPS 域名
    directAirUrl: 'http://192.168.1.8:3000'
  },

  onLoad(options) {
    console.log('DirectAir Web-View 加载地址:', this.data.directAirUrl);
  },

  onShareAppMessage() {
    return {
      title: '直航 DirectAir - 航司官方直通与常旅客雷达',
      path: '/pages/index/index'
    };
  }
});
