import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const cards = [
    {
      id: '01',
      title: '人物资料',
      path: '/characters',
      tag: 'Archive',
      desc: '鉴宝易，鉴人难。收录五脉及老朝奉势力核心成员。',
    },
    {
      id: '02',
      title: '古董图鉴',
      path: '/antiques',
      tag: 'Collection',
      desc: '真赝之间，乾坤尽藏。剧中关键道具全解析。',
    },
    {
      id: '03',
      title: '轨迹地图',
      path: '/map',
      tag: 'Trajectory',
      desc: '佛头案真相之路。复刻主角团横跨中日的寻宝踪迹。',
    },
    {
      id: '04',
      title: '人物关系',
      path: '/relation',
      tag: 'Network',
      desc: '明争暗斗，因果循环。呈现错综复杂的家族纠葛。',
    }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {cards.map((card) => (
        <Link 
          key={card.id}
          to={card.path} 
          className="neo-card p-8 flex flex-col justify-between h-80 group"
        >
          <div>
            <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase group-hover:bg-[#E53935] transition-colors">
              {card.tag}
            </span>
            <h2 className="text-3xl font-black mt-4 group-hover:underline">{card.title}</h2>
            <p className="mt-2 text-gray-500 font-medium leading-tight">{card.desc}</p>
          </div>
          <div className="text-5xl font-black opacity-10 self-end">{card.id}</div>
        </Link>
      ))}
    </motion.main>
  );
};
