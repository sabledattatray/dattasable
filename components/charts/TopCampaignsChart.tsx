'use client';
import ReactECharts from 'echarts-for-react';

const TopCampaignsChart = () => {
  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['Search', 'Direct', 'Referral', 'Social']
    },
    series: [
      {
        name: 'Users',
        type: 'bar',
        data: [320, 302, 301, 334],
        itemStyle: { color: '#00C9F2' }
      }
    ],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

export default TopCampaignsChart;
