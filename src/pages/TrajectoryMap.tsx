import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { motion } from 'motion/react';

interface City {
  coord: [number, number];
  name: string;
  desc: string;
}

interface Trajectory {
  color: string;
  name: string;
  lines: [keyof typeof cities, keyof typeof cities][];
}

const cities = {
  'Tokyo': { coord: [140, 35], name: '东京', desc: '木户加奈带着佛头归还的使命与爷爷的笔记，从这里启程前往中国。' },
  'Beijing': { coord: [116, 40], name: '北京', desc: '五脉大本营，四恚居所在地。佛头案调查的起点，在这里许愿接受了鉴别佛头真伪的挑战。' },
  'Tianjin': { coord: [117, 39], name: '天津', desc: '许愿为寻找线索前往天津卫，拜访造假高人，牵扯出更多往事。' },
  'Zhengzhou': { coord: [113, 34.7], name: '郑州', desc: '药不然暗中活动的区域，涉及老朝奉势力的地下交易网。' },
  'Anyang': { coord: [114, 36], name: '安阳', desc: '青铜器大市。黄烟烟与许愿在此地追查佛头身躯的线索，遭遇老朝奉手下伏击。' },
  'Xian': { coord: [108.9, 34.3], name: '西安', desc: '各方势力汇聚的历史古都，海东青出没之地。大量线索指向此处的古墓。' },
  'Qishan': { coord: [107.6, 34.4], name: '岐山', desc: '最终的真相揭晓地。许一城当年的布局与玉佛头真伪的秘密在这里大白于天下。' }
} as const;

const trajectories: Record<string, Trajectory> = {
  'xy': {
    color: '#000000', name: '许愿',
    lines: [['Beijing', 'Tianjin'], ['Tianjin', 'Anyang'], ['Anyang', 'Xian'], ['Xian', 'Qishan']]
  },
  'ybr': {
    color: '#2563EB', name: '药不然',
    lines: [['Beijing', 'Zhengzhou'], ['Zhengzhou', 'Xian'], ['Xian', 'Qishan']]
  },
  'hyy': {
    color: '#DC2626', name: '黄烟烟',
    lines: [['Beijing', 'Anyang'], ['Anyang', 'Xian'], ['Xian', 'Qishan']]
  },
  'mdjn': {
    color: '#D97706', name: '木户加奈',
    lines: [['Tokyo', 'Beijing'], ['Beijing', 'Xian']]
  }
};

export const TrajectoryMap: React.FC = () => {
  const [selectedChars, setSelectedChars] = useState<string[]>(['xy', 'ybr', 'hyy', 'mdjn']);
  const [popupInfo, setPopupInfo] = useState<{ name: string; desc: string; key: string } | null>(null);

  const toggleChar = (id: string) => {
    setSelectedChars(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const option = useMemo(() => {
    const scatterData = Object.entries(cities).map(([key, city]) => ({
      name: city.name,
      value: [...city.coord, city.desc, key],
      symbolSize: 16,
      itemStyle: { color: '#fff', borderColor: '#000', borderWidth: 3 }
    }));

    const series: any[] = [{
      type: 'effectScatter',
      coordinateSystem: 'cartesian2d',
      data: scatterData,
      symbolSize: 20,
      showEffectOn: 'render',
      rippleEffect: { brushType: 'stroke', scale: 3 },
      itemStyle: { color: '#000', shadowBlur: 0, shadowColor: '#000', shadowOffsetX: 2, shadowOffsetY: 2 },
      label: {
        show: true,
        formatter: '{b}',
        position: 'right',
        color: '#000',
        fontFamily: 'Noto Sans SC',
        fontWeight: 900,
        fontSize: 14,
        backgroundColor: '#fff',
        padding: [2, 4],
        borderColor: '#000',
        borderWidth: 2
      },
      zlevel: 2
    }];

    selectedChars.forEach(charId => {
      const t = trajectories[charId];
      const lineData = t.lines.map(pair => ({
        coords: [cities[pair[0]].coord, cities[pair[1]].coord]
      }));

      series.push({
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        zlevel: 1,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.1,
          symbol: 'arrow',
          symbolSize: 8
        },
        lineStyle: {
          color: t.color,
          width: 4,
          opacity: 0.7,
          curveness: 0.2
        },
        data: lineData
      });
    });

    return {
      grid: { left: '5%', right: '15%', bottom: '10%', top: '10%' },
      xAxis: { 
        type: 'value', min: 105, max: 142,
        show: false 
      },
      yAxis: { 
        type: 'value', min: 32, max: 42,
        show: false 
      },
      tooltip: { show: false },
      series: series
    };
  }, [selectedChars]);

  const onChartClick = (params: any) => {
    if (params.seriesType === 'effectScatter') {
      setPopupInfo({
        name: params.data.name,
        desc: params.data.value[2],
        key: params.data.value[3]
      });
    }
  };

  const getPassedChars = (cityKey: string) => {
    return Object.entries(trajectories).filter(([_, t]) => 
      t.lines.some(line => line.includes(cityKey as any))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] space-y-8"
    >
      <nav className="flex items-center gap-4 font-bold text-sm shrink-0">
        <Link to="/" className="hover:bg-[#E53935] hover:text-white px-2 transition-colors">首页</Link>
        <span className="opacity-30">/</span>
        <span className="text-gray-500 uppercase tracking-widest">Trajectory Map</span>
      </nav>

      <header className="shrink-0">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">佛头案轨迹</h1>
        <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
          追踪四位主角横跨中日的寻宝踪迹
        </p>
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-8 min-h-0">
        <aside className="w-full md:w-64 flex flex-col shrink-0 min-h-0">
          <div className="neo-card-static p-4 bg-zinc-100 flex-1 flex flex-col">
            <h2 className="font-black text-xl mb-6 uppercase border-b border-black pb-2">行动轨迹</h2>
            
            <div className="flex flex-col gap-3 flex-1">
              {Object.entries(trajectories).map(([id, t]) => (
                <label key={id} className="flex items-center cursor-pointer p-2 border border-black bg-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-sm" style={{ color: t.color }}>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedChars.includes(id)}
                    onChange={() => toggleChar(id)}
                  />
                  <div className="w-6 h-6 border border-black mr-3 flex items-center justify-center">
                    {selectedChars.includes(id) && <div className="w-3.5 h-3.5 bg-current"></div>}
                  </div>
                  <span>{t.name}</span>
                </label>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-black border-dashed">
              <p className="text-xs font-bold text-gray-600">
                点击节点，查看发生在该地的核心剧情。
              </p>
            </div>
          </div>
        </aside>

        <div className="neo-card-static flex-1 relative bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MEgzOS41eiIgc3Ryb2tlPSIjZTVlNWU1IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]">
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            onEvents={{
              'click': onChartClick
            }}
          />
          
          {popupInfo && (
            <div className="neo-card w-64 p-4 absolute top-4 right-4 bg-white z-50">
              <div className="flex justify-between items-start border-b border-black pb-2 mb-2">
                <h3 className="text-2xl font-black">{popupInfo.name}</h3>
                <button 
                  onClick={() => setPopupInfo(null)}
                  className="font-black text-xl hover:text-[#E53935]"
                >
                  ×
                </button>
              </div>
              <p className="text-xs font-bold text-gray-700 leading-snug italic">
                {popupInfo.desc}
              </p>
              <div className="mt-3 pt-2 border-t border-dashed border-gray-400 flex gap-2 flex-wrap">
                {getPassedChars(popupInfo.key).map(([id, t]) => (
                  <span key={id} className="text-[10px] text-white px-2 py-0.5 font-bold border border-black" style={{ backgroundColor: t.color }}>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};
