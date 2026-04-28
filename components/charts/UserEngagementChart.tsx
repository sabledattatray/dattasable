'use client';
import ReactECharts from 'echarts-for-react';

const UserEngagementChart = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        smooth: true,
        color: '#c9f31d'
      }
    ],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

export default UserEngagementChart;
