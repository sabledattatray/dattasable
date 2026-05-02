import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const UserEngagementChart = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? resolvedTheme : theme) : 'dark';
  const accentColor = currentTheme === 'light' ? '#0890EC' : '#c9f31d';

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: { color: currentTheme === 'light' ? '#666' : '#999' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: currentTheme === 'light' ? '#eee' : '#333' } },
      axisLabel: { color: currentTheme === 'light' ? '#666' : '#999' }
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        smooth: true,
        color: accentColor,
        lineStyle: { width: 3, shadowBlur: 10, shadowColor: accentColor }
      }
    ],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

export default UserEngagementChart;
