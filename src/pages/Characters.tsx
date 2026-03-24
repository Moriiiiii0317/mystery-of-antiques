import React from 'react';
// 【修复 1】引入 useParams 获取动态路由 ID
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetchData } from '../hooks/useFetchData';

interface Character {
  id: string;
  name: string;
  title: string;
  tag: string;
  description: string;
  quote: string;
  faction: '五脉' | '老朝奉' | '其他';
  color: string;
  image: string;
}

export const Characters: React.FC = () => {
  // 【修复 2】不直接使用 characters 变量，改用 rawData 接收，准备拆包装
  const { data: rawData, loading, error } = useFetchData<any>('/api/characters');

  // 【修复 3】智能拆包装：安全提取真正的数组
  const charArray: Character[] = Array.isArray(rawData) ? rawData : (rawData?.data || []);

  // 加载状态
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-12"
      >
        <nav className="flex items-center gap-4 font-bold text-sm">
          <Link to="/" className="hover:bg-[#E53935] hover:text-white px-2 transition-colors">首页</Link>
          <span className="opacity-30">/</span>
          <span className="text-gray-400 uppercase tracking-widest">Character Archive</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">人物资料</h1>
          <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
            鉴宝易，鉴人难。这里收录了”佛头案”迷局中的核心玩家。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="neo-card">
              <div className="h-80 sm:h-64 bg-gray-200 relative overflow-hidden rounded-t-lg"></div>
              <div className="p-4 border-t border-black bg-white">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-12"
      >
        <nav className="flex items-center gap-4 font-bold text-sm">
          <Link to="/" className="hover:bg-[#E53935] hover:text-white px-2 transition-colors">首页</Link>
          <span className="opacity-30">/</span>
          <span className="text-gray-400 uppercase tracking-widest">Character Archive</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">人物资料</h1>
          <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
            鉴宝易，鉴人难。这里收录了”佛头案”迷局中的核心玩家。
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-red-800 mb-2">加载数据失败</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            重新加载
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <nav className="flex items-center gap-4 font-bold text-sm">
        <Link to="/" className="hover:bg-[#E53935] hover:text-white px-2 transition-colors">首页</Link>
        <span className="opacity-30">/</span>
        <span className="text-gray-400 uppercase tracking-widest">Character Archive</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">人物资料</h1>
        <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
          鉴宝易，鉴人难。这里收录了”佛头案”迷局中的核心玩家。
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* 【修复 4】使用安全的 charArray 进行映射 */}
        {charArray.map((char) => (
          <Link 
            key={char.id}
            to={`/characters/${char.id}`}
            className="neo-card group flex flex-col"
          >
            <div className="h-80 sm:h-64 bg-gray-200 relative overflow-hidden">
              <img 
                // 【修复 5】清洗列表页的图片路径
                src={char.image?.replace(/^\.\.\//, '/')} 
                alt={char.name}
                className="w-full h-full object-cover grayscale-0 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 border-t border-black bg-white flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-black">{char.name}</h3>
                <span className="text-xs text-white px-2 py-0.5 font-bold" style={{ backgroundColor: char.color }}>
                  {char.tag}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-tight line-clamp-2">
                {char.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export const CharacterDetail: React.FC<{ id?: string }> = ({ id: propId }) => {
  // 【修复 6】获取并合并路由中的 ID
  const { id: paramId } = useParams();
  const actualId = propId || paramId;

  // 【修复 7】加入后端数据请求
  const { data: rawData, loading, error } = useFetchData<any>('/api/characters');

  // 【修复 8】加入加载、错误、空数据拦截
  if (loading) return <div className="text-center py-20 text-xl font-bold">人物档案调取中...</div>;
  if (error) return <div className="text-center py-20 text-red-500">档案调取失败</div>;
  if (!rawData) return null;

  // 【修复 9】智能拆包并查找真实数据
  const charArray: Character[] = Array.isArray(rawData) ? rawData : (rawData?.data || []);
  const char = charArray.find(c => c.id === actualId);

  if (!char) return <div className="text-center py-20 text-xl font-bold">未找到该人物信息</div>;

  // 【修复 10】清洗详情页图片路径
  const safeImagePath = char.image?.replace(/^\.\.\//, '/');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12"
    >
      <div className="lg:col-span-4">
        <div className="neo-card-static overflow-hidden">
          <img 
            src={safeImagePath} // 使用安全路径
            alt={char.name}
            className="w-full aspect-[3/4] object-cover grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      <div className="lg:col-span-8 space-y-8">
        <header>
          <div className="inline-block px-4 py-1 bg-black text-white font-bold mb-4" style={{ backgroundColor: char.color }}>
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
          <p className="text-lg leading-relaxed font-medium text-gray-500">
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