import { useState, useEffect } from 'react';

// 移除了死板的 ApiResponse 接口，让数据流转更自由
export function useFetchData<T>(endpoint: string) {
  // 修改为接受任何格式的数据，默认值为 null
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 直接使用传入的相对路径（endpoint 本身就是 /api/xxx）
        // 浏览器会自动向当前域名（Nginx）发请求，Nginx 再完美转发给后端
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // 【修复 3】直接把后端给的原始数据塞进 state，拆包的工作交给组件去做
        setData(result); 
        
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取数据失败');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}