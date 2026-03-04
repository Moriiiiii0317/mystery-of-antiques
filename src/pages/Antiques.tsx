import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ANTIQUES } from '../data';

export const Antiques: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <nav className="flex items-center gap-4 font-bold text-sm">
        <Link to="/" className="hover:bg-[#E53935] hover:text-white px-2 transition-colors">首页</Link>
        <span className="opacity-30">/</span>
        <span className="text-gray-500 uppercase tracking-widest">Antique Collection</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">古董图鉴</h1>
        <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
          “真赝之间，乾坤尽藏”
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ANTIQUES.map((item, index) => (
          <div 
            key={item.id} 
            className="neo-card flex flex-col group cursor-pointer"
            onClick={() => navigate(`/antiques/${item.id}`)}
          >
            <div className="h-80 bg-zinc-200 border-b border-black flex items-center justify-center relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover grayscale-0 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black group-hover:text-[#E53935] transition-colors">{item.name}</h3>
                <div className="flex gap-2">
                  {item.tag && (
                    <span className="bg-[#E53935] text-white px-2 py-0.5 font-bold border border-black text-[10px] uppercase">
                      {item.tag}
                    </span>
                  )}
                  <span className="text-xs font-bold border border-black px-2 py-0.5">{item.era}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-bold leading-snug flex-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const AntiqueDetail: React.FC<{ id?: string }> = ({ id }) => {
  const item = ANTIQUES.find(a => a.id === id);
  if (!item) return <div>Antique not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12"
    >
      <div className="lg:col-span-5">
        <div className="neo-card-static overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full aspect-square object-cover grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      <div className="lg:col-span-7 space-y-8">
        <header>
          <div className="inline-block px-4 py-1 bg-[#E53935] text-white font-bold mb-4 border border-black">
            {item.era}{item.tag ? ` · ${item.tag}` : ''}
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter">{item.name}</h1>
        </header>

        <div className="neo-card-static p-8 bg-[#fffbeb] flex-1">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#E53935]"></span>
            基本信息
          </h3>
          <p className="text-lg leading-relaxed font-medium text-gray-700 whitespace-pre-wrap">
            {item.description}
          </p>
        </div>

        <div className="flex gap-4">
          <Link to="/antiques" className="neo-btn-red">返回图鉴</Link>
        </div>
      </div>
    </motion.div>
  );
};
