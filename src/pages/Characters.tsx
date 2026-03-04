// src/pages/Characters.tsx 完整代码
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 修复：motion 应该从 framer-motion 导入（你之前写错了）
import { CHARACTERS } from '../data';

export const Characters: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <nav className="flex items-center gap-4 font-bold text-sm">
        <Link to="/" className="hover:bg-[#E53935] hover:text-white px-2 transition-colors">首页</Link>
        <span className="opacity-30">/</span>
        <span className="text-gray-500 uppercase tracking-widest">Character Archive</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">人物资料</h1>
        <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
          鉴宝易，鉴人难。这里收录了“佛头案”迷局中的核心玩家。
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {CHARACTERS.map((char) => (
          <Link 
            key={char.id}
            to={`/characters/${char.id}`}
            className="neo-card group flex flex-col"
          >
            <div className="h-64 bg-gray-200 relative overflow-hidden">
              <img 
                src={char.image} 
                alt={char.name}
                className="w-full h-full object-cover grayscale-0 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 border-t border-black bg-white flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black">{char.name}</h3>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-tighter" style={{ backgroundColor: char.color }}>
                  {char.tag}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-bold leading-tight line-clamp-2">
                {char.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Removed footer status bar */}
    </motion.div>
  );
};

export const CharacterDetail: React.FC<{ id?: string }> = ({ id }) => {
  const char = CHARACTERS.find(c => c.id === id);
  if (!char) return <div>Character not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12"
    >
      <div className="lg:col-span-4">
        <div className="neo-card-static overflow-hidden">
          <img 
            src={char.image} 
            alt={char.name}
            className="w-full aspect-[3/4] object-cover grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      <div className="lg:col-span-8 space-y-8">
        <header>
          <div className="inline-block px-4 py-1 bg-black text-white font-bold mb-4 border border-black" style={{ backgroundColor: char.color }}>
            {char.faction} · {char.tag}
          </div>
          <h1 className="text-6xl font-black uppercase">{char.name}</h1>
          <p className="text-2xl font-bold text-gray-500 mt-2">{char.title}</p>
        </header>

        <div className="neo-card-static p-8 bg-[#fffbeb]">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#E53935]"></span>
            人物生平
          </h3>
          <p className="text-lg leading-relaxed font-medium text-gray-700">
            {char.description}
          </p>
        </div>

        <div className="neo-card-static p-8 border-l-[12px] relative overflow-hidden" style={{ borderColor: char.color }}>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 border-4 border-[#E53935] rounded-sm opacity-20 rotate-12 flex items-center justify-center text-[#E53935] font-black text-xl p-2 text-center leading-none">
            古董局中局<br/>
          </div>
          <p className="text-3xl font-black italic text-gray-800 relative z-10">
            “{char.quote}”
          </p>
        </div>

        <div className="flex gap-4">
          <Link to="/characters" className="neo-btn-red">返回图鉴</Link>
          <Link to="/relation" className="neo-btn-gray">查看关系网</Link>
        </div>
      </div>
    </motion.div>
  );
};