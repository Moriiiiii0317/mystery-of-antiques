import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <header className="flex justify-between items-end mb-16 border-b border-black pb-4">
    <div>
      <Link to="/">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-[#E53935] transition-colors">
          Mystery of Antiques
        </h1>
      </Link>
      <p className="text-lg mt-2 font-bold text-gray-700">古董局中局 · 互动画廊</p>
    </div>
  </header>
);

export const Footer: React.FC = () => (
  <footer className="mt-20 border-t border-black pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="font-bold text-sm text-gray-700">基于 2018 同名电视剧集制作. 本站仅供学习交流使用</p>
  </footer>
);
