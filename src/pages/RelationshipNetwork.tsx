import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { motion } from 'motion/react';

interface NodeData {
  id: string;
  name: string;
  symbolSize: number;
  category: number;
  faction: string;
  desc: string;
}

interface LinkData {
  source: string;
  target: string;
  label: {
    show: boolean;
    formatter: string;
  };
}

export const RelationshipNetwork: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const categories = [
    { name: '主角团', itemStyle: { color: '#ffffff' } },
    { name: '五脉长辈', itemStyle: { color: '#e5e5e5' } },
    { name: '老朝奉势力', itemStyle: { color: '#E53935' } },
    { name: '木户家族', itemStyle: { color: '#fcd34d' } },
    { name: '外部势力', itemStyle: { color: '#9ca3af' } }
  ];

  const nodes: NodeData[] = [
    { id: '0', name: '许愿', symbolSize: 80, category: 0, faction: '白门', desc: '四悔传人，北京小古董店老板，佛头案破局核心。' },
    { id: '1', name: '药不然', symbolSize: 70, category: 0, faction: '玄门', desc: '五脉天才，表面玩世不恭，实则背负家族秘密。' },
    { id: '2', name: '黄烟烟', symbolSize: 65, category: 0, faction: '青门', desc: '黄克武孙女，行事干练，许愿的坚定盟友。' },
    { id: '3', name: '木户加奈', symbolSize: 65, category: 3, faction: '木户家', desc: '木户有三孙女，带着归还佛头的使命来到中国。' },
    { id: '4', name: '老朝奉', symbolSize: 85, category: 2, faction: '造假集团', desc: '古董界最大的造假头目，真实身份成谜。' },
    { id: '5', name: '许一城', symbolSize: 75, category: 1, faction: '白门', desc: '许愿祖父，当年被指控将佛头卖给日本人而被枪决。' },
    { id: '6', name: '付贵', symbolSize: 60, category: 4, faction: '警界', desc: '曾负责佛头案的警察，掌握当年重要线索。' },
    { id: '7', name: '罗局', symbolSize: 60, category: 4, faction: '文物局', desc: '官方代表，在背后推动许愿调查真相。' },
    { id: '8', name: '黄克武', symbolSize: 65, category: 1, faction: '青门', desc: '五脉掌门之一，对许家抱有极深成见。' },
    { id: '9', name: '木户有三', symbolSize: 65, category: 3, faction: '木户家', desc: '日本学者，当年带走佛头的人。' },
    { id: '10', name: '药来', symbolSize: 65, category: 1, faction: '玄门', desc: '五脉掌门之一，药不然的爷爷，行事老辣。' },
    { id: '11', name: '细川太郎', symbolSize: 60, category: 3, faction: '细川家', desc: '日本细川家族代表，对佛头案真相极度关注。' }
  ];

  const links: LinkData[] = [
    { source: '0', target: '1', label: { show: true, formatter: '宿敌/挚友' } },
    { source: '0', target: '2', label: { show: true, formatter: '恋人/盟友' } },
    { source: '0', target: '3', label: { show: true, formatter: '协助/情愫' } },
    { source: '0', target: '4', label: { show: true, formatter: '死敌' } },
    { source: '0', target: '5', label: { show: true, formatter: '祖孙' } },
    { source: '1', target: '4', label: { show: true, formatter: '下属/潜伏' } },
    { source: '2', target: '8', label: { show: true, formatter: '爷孙' } },
    { source: '3', target: '9', label: { show: true, formatter: '爷孙' } },
    { source: '5', target: '9', label: { show: true, formatter: '跨国知音' } },
    { source: '0', target: '6', label: { show: true, formatter: '长辈/寻访' } },
    { source: '0', target: '7', label: { show: true, formatter: '上级/利用' } },
    { source: '6', target: '5', label: { show: true, formatter: '好友/看守' } },
    { source: '1', target: '10', label: { show: true, formatter: '爷孙' } },
    { source: '10', target: '8', label: { show: true, formatter: '同僚' } },
    { source: '3', target: '11', label: { show: true, formatter: '合作' } },
    { source: '8', target: '5', label: { show: true, formatter: '旧怨' } }
  ];

  const option = {
    tooltip: { show: false },
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 1000,
          edgeLength: [100, 250],
          gravity: 0.1
        },
        roam: true,
        draggable: true,
        data: nodes.map(node => ({
          ...node,
          itemStyle: {
            borderColor: '#000',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffsetX: 4,
            shadowOffsetY: 4
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}',
            color: '#000',
            fontFamily: 'Noto Sans SC',
            fontWeight: 900,
            fontSize: 14
          }
        })),
        links: links.map(link => ({
          ...link,
          lineStyle: {
            color: '#000',
            width: 3,
            curveness: 0.1
          },
          label: {
            color: '#000',
            fontFamily: 'Noto Sans SC',
            fontWeight: 'bold',
            backgroundColor: '#fff',
            borderColor: '#000',
            borderWidth: 2,
            padding: [4, 6]
          }
        })),
        categories: categories,
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 6 }
        }
      }
    ]
  };

  const onChartClick = (params: any) => {
    if (params.dataType === 'node') {
      setSelectedNode(params.data);
    }
  };

  const onChartDblClick = (params: any) => {
    if (params.dataType === 'node') {
      // Mapping node names to IDs used in Characters.tsx
      const nameToId: Record<string, string> = {
        '许愿': 'xu-yuan',
        '药不然': 'yao-buran',
        '黄烟烟': 'huang-yanyan',
        '木户加奈': 'kido-kana',
        '老朝奉': 'lao-chaofeng',
        '许一城': 'xu-yicheng',
        '付贵': 'fu-gui',
        '罗局': 'luo-ju',
        '木户有三': 'kido-yuzo',
        '黄克武': 'huang-kewu',
        '药来': 'yao-lai',
        '细川太郎': 'hosokawa-taro'
      };
      const charId = nameToId[params.data.name];
      if (charId) {
        navigate(`/characters/${charId}`);
      }
    }
  };

  const getRelatedRelations = () => {
    if (!selectedNode) return [];
    return links.filter(l => l.source === selectedNode.id || l.target === selectedNode.id).map(l => {
      const isSource = l.source === selectedNode.id;
      const otherNodeId = isSource ? l.target : l.source;
      const otherNode = nodes.find(n => n.id === otherNodeId);
      return {
        name: otherNode?.name || '未知',
        relation: l.label.formatter
      };
    });
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
        <span className="text-gray-500 uppercase tracking-widest">Character Network</span>
      </nav>

      <header className="shrink-0 flex justify-between items-end">
        <div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">人物关系</h1>
          <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
            明争暗斗，因果循环。恩怨情仇织就一张大网。
          </p>
        </div>
      </header>

      <main className="flex-1 flex gap-8 min-h-0 relative overflow-hidden">
        <div className="neo-card-static flex-1 h-full relative overflow-hidden bg-white">
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            onEvents={{
              'click': onChartClick,
              'dblclick': onChartDblClick
            }}
          />
        </div>

        {/* Side Panel */}
        <div className={`neo-card-static w-80 h-full p-6 flex flex-col bg-[#fffbeb] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 absolute right-3 top-0 z-50 md:relative md:right-0 md:-ml-3 ${selectedNode ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 md:translate-x-0 md:opacity-100'}`}>
          <div className="border-b border-black pb-4 mb-4 flex justify-between items-start">
            <h2 className="text-3xl font-black">{selectedNode?.name || '人物信息'}</h2>
            <div className="flex gap-2">
              {selectedNode && (
                <span className={`px-2 py-0.5 font-black text-[10px] uppercase border border-black ${selectedNode.category === 2 ? 'bg-[#E53935] text-white' : 'bg-black text-white'}`}>
                  {selectedNode.faction}
                </span>
              )}
              <button 
                onClick={() => setSelectedNode(null)}
                className="md:hidden font-black text-xl hover:text-[#E53935]"
              >
                ×
              </button>
            </div>
          </div>
          
          <p className="text-gray-700 font-bold leading-snug mb-6 flex-1 italic">
            {selectedNode?.desc || '点击左侧关系图中的气泡，查看该人物的详细网络关系。双击气泡可跳转至人物详情页。'}
          </p>

          {selectedNode && (
            <div className="border-t border-black pt-4 mb-6">
              <h3 className="font-black text-sm mb-4 uppercase flex items-center gap-2">
                <span className="w-2 h-4 bg-black"></span>
                关联线索
              </h3>
              <ul className="space-y-3 text-xs font-bold text-gray-600">
                {getRelatedRelations().map((rel, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b border-dashed border-gray-300 pb-2">
                    <span>与 <span className="text-black font-black">{rel.name}</span></span>
                    <span className="bg-gray-200 px-2 py-0.5 border border-black text-[10px]">{rel.relation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button 
            disabled={!selectedNode}
            onClick={() => {
              if (selectedNode) {
                const nameToId: Record<string, string> = {
                  '许愿': 'xu-yuan',
                  '药不然': 'yao-buran',
                  '黄烟烟': 'huang-yanyan',
                  '木户加奈': 'kido-kana',
                  '老朝奉': 'lao-chaofeng',
                  '许一城': 'xu-yicheng',
                  '付贵': 'fu-gui',
                  '罗局': 'luo-ju',
                  '木户有三': 'kido-yuzo',
                  '黄克武': 'huang-kewu',
                  '药来': 'yao-lai',
                  '细川太郎': 'hosokawa-taro'
                };
                const charId = nameToId[selectedNode.name];
                if (charId) navigate(`/characters/${charId}`);
              }
            }}
            className="neo-btn-red w-full mt-auto disabled:opacity-50 disabled:cursor-not-allowed text-sm py-3"
          >
            查看详情 -&gt;
          </button>
        </div>
      </main>
    </motion.div>
  );
};
