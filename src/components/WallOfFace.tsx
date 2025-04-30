import React, { useEffect, useRef } from 'react';

// 该组件基于 public/index.html 的 globe/network 交互逻辑，封装为 React 组件
// 只负责渲染一个 globe 容器，实际渲染和交互通过挂载第三方库和脚本实现

const WallOfFace: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 动态加载 vis-network 脚本
    if (!window.vis) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/vis-network/standalone/umd/vis-network.min.js';
      script.async = true;
      script.onload = () => {
        initNetwork();
      };
      document.body.appendChild(script);
    } else {
      initNetwork();
    }

    function initNetwork() {
      if (!globeRef.current || !window.vis) return;
      // 这里可根据实际需求自定义节点和边的数据
      const nodes = new window.vis.DataSet([
        { id: 1, label: '北京', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/6f6p85he.jpg', x: 0, y: -100 },
        { id: 2, label: '上海', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/nyg1ppwg.jpg', x: 100, y: 0 },
        { id: 3, label: '广州', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/ukegj1hn.jpg', x: -100, y: 0 },
        { id: 4, label: '深圳', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg', x: 0, y: 100 },
        { id: 5, label: '成都', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/0y0y0y0y.jpg', x: 70, y: 70 },
        { id: 6, label: '杭州', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/8kY2bU2F.jpg', x: -70, y: 70 },
        { id: 7, label: '重庆', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg', x: 120, y: -60 },
        { id: 8, label: '南京', shape: 'circularImage', image: 'https://uifaces.co/our-content/donated/2Z7eU7wq.jpg', x: -120, y: -60 }
      ]);
      const edges = new window.vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 5 },
        { from: 4, to: 5 }
      ]);
      const data = { nodes, edges };
      const options = {
        nodes: {
          shape: 'circularImage',
          size: 40,
          borderWidth: 2,
          color: {
            border: '#00bcd4',
            background: '#e0f7fa',
            highlight: { border: '#ff4081', background: '#fffde7' }
          },
          font: { color: '#333', size: 16, face: 'Arial' }
        },
        edges: {
          color: { color: '#bdbdbd', highlight: '#ff4081' },
          width: 2,
          smooth: true
        },
        physics: {
          enabled: true,
          barnesHut: { gravitationalConstant: -3000, springLength: 120, springConstant: 0.04 },
          stabilization: { enabled: true, iterations: 100 }
        },
        interaction: {
          hover: true,
          dragNodes: true,
          zoomView: true
        }
      };
      new window.vis.Network(globeRef.current, data, options);
    }
    // 清理
    return () => {
      if (globeRef.current) globeRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div ref={globeRef} style={{ width: 480, height: 400, background: '#f5f5f5', borderRadius: 16, boxShadow: '0 2px 8px #0001' }} />
    </div>
  );
};

export default WallOfFace;