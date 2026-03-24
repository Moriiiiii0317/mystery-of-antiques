import React from 'react';
<<<<<<< HEAD
// 【修复】增加了 useParams 用于获取网址中的 ID
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useFetchData } from '../hooks/useFetchData';

interface Antique {
  id: string;
  name: string;
  era: string;
  description: string;
  story: string;
  image: string;
  tag: string;
  metadata?: {
    label: string;
    value: string;
  };
}

export const Antiques: React.FC = () => {
  const navigate = useNavigate();
  // 【修复 1】不再直接假设返回的是纯数组，改用 rawData 接收
  const { data: rawData, loading, error } = useFetchData<any>('/api/antiques');

  // 【修复 2】智能拆包装：安全提取真正的数组，防止 .map 报错
  const antiquesArray: Antique[] = Array.isArray(rawData) ? rawData : (rawData?.data || []);

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
          <span className="text-gray-400 uppercase tracking-widest">Antique Collection</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">古董图鉴</h1>
          <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
            "人压物，压不住；物压人，压断魂。"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="neo-card">
              <div className="h-80 bg-zinc-200 rounded-t-lg"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
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
          <span className="text-gray-400 uppercase tracking-widest">Antique Collection</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">古董图鉴</h1>
          <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
            "人压物，压不住；物压人，压断魂。"
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
=======
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ANTIQUES } from '../data';

export const Antiques: React.FC = () => {
  const navigate = useNavigate();
>>>>>>> aff91c23d1b064124edd80425f560395edccc498

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <nav className="flex items-center gap-4 font-bold text-sm">
        <Link to="/" className="hover:bg-[#E53935] hover:text-white px-2 transition-colors">首页</Link>
        <span className="opacity-30">/</span>
        <span className="text-gray-400 uppercase tracking-widest">Antique Collection</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">古董图鉴</h1>
        <p className="mt-4 border-l-4 border-[#E53935] pl-4 text-lg font-medium max-w-2xl text-gray-700 italic">
<<<<<<< HEAD
          "人压物，压不住；物压人，压断魂。"
=======
          “人压物，压不住；物压人，压断魂。”
>>>>>>> aff91c23d1b064124edd80425f560395edccc498
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
<<<<<<< HEAD
        {/* 【修复 3】使用安全提取出的 antiquesArray 进行循环 */}
        {antiquesArray.map((item) => (
          <div
            key={item.id}
=======
        {ANTIQUES.map((item, index) => (
          <div 
            key={item.id} 
>>>>>>> aff91c23d1b064124edd80425f560395edccc498
            className="neo-card flex flex-col group cursor-pointer"
            onClick={() => navigate(`/antiques/${item.id}`)}
          >
            <div className="h-80 bg-zinc-200 border-b border-black flex items-center justify-center relative overflow-hidden">
<<<<<<< HEAD
              <img
                // 【修复 4】确保列表页的图片路径也被清洗，防止裂图
                src={item.image?.replace(/^\.\.\//, '/')}
=======
              <img 
                src={item.image} 
>>>>>>> aff91c23d1b064124edd80425f560395edccc498
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
              <p className="text-sm text-gray-500 font-medium leading-snug flex-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

<<<<<<< HEAD
export const AntiqueDetail: React.FC<{ id?: string }> = ({ id: propId }) => {
  // 【修复 5】从网址参数中抓取 ID
  const { id: paramId } = useParams();
  const actualId = propId || paramId;

  const { data: rawData, loading, error } = useFetchData<any>('/api/antiques');

  // 【修复 6】增加加载与错误状态拦截，防止 .find 报错白屏
  if (loading) return <div className="text-center py-20 text-xl font-bold">秘宝档案调取中...</div>;
  if (error) return <div className="text-center py-20 text-red-500">档案调取失败</div>;
  if (!rawData) return null;

  // 【修复 7】智能拆包装，找出具体的古董
  const antiquesArray: Antique[] = Array.isArray(rawData) ? rawData : (rawData?.data || []);
  const antique = antiquesArray.find((item) => item.id === actualId);

  if (!antique) return <div className="text-center py-20 text-xl font-bold">未找到该古董信息</div>;

  // 【修复 8】清洗图片路径
  const safeImagePath = antique.image?.replace(/^\.\.\//, '/');
=======
export const AntiqueDetail: React.FC<{ id?: string }> = ({ id }) => {
  const item = ANTIQUES.find(a => a.id === id);
  if (!item) return <div>Antique not found</div>;
>>>>>>> aff91c23d1b064124edd80425f560395edccc498

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12"
    >
      <div className="lg:col-span-5">
        <div className="neo-card-static overflow-hidden">
<<<<<<< HEAD
          <img
            src={safeImagePath}
            alt={antique.name}
=======
          <img 
            src={item.image} 
            alt={item.name}
>>>>>>> aff91c23d1b064124edd80425f560395edccc498
            className="w-full aspect-square object-cover grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
<<<<<<< HEAD

      <div className="lg:col-span-7 space-y-8">
        <header>
          <div className="inline-block px-4 py-1 bg-[#E53935] text-white font-bold mb-4 border border-black">
            {antique.era}
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter">{antique.name}</h1>
=======
      
      <div className="lg:col-span-7 space-y-8">
        <header>
          <div className="inline-block px-4 py-1 bg-[#E53935] text-white font-bold mb-4 border border-black">
            {item.era}{item.tag ? ` · ${item.tag}` : ''}
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter">{item.name}</h1>
>>>>>>> aff91c23d1b064124edd80425f560395edccc498
        </header>

        <div className="neo-card-static p-8 bg-[#fffbeb] flex-1">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#E53935]"></span>
            基本信息
          </h3>
          <p className="text-lg leading-relaxed font-medium text-gray-500 whitespace-pre-wrap">
<<<<<<< HEAD
            {antique.description}
          </p>
          
          {antique.story && (
             <>
                <h3 className="text-xl font-black mb-4 mt-8 flex items-center gap-2">
                  <span className="w-2 h-6 bg-black"></span>
                  背后故事
                </h3>
                <p className="text-lg leading-relaxed font-medium text-gray-500 whitespace-pre-wrap">
                  {antique.story}
                </p>
             </>
          )}
=======
            {item.description}
          </p>
>>>>>>> aff91c23d1b064124edd80425f560395edccc498
        </div>

        <div className="flex gap-4">
          <Link to="/antiques" className="neo-btn-red">返回图鉴</Link>
        </div>
      </div>
    </motion.div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> aff91c23d1b064124edd80425f560395edccc498
