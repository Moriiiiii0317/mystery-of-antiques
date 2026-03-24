// src/data.ts 完整代码
export interface Character {
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

export interface Antique {
  id: string;
  name: string;
  era: string;
  description: string;
  story: string;
  image: string;
  tag: string;
  metadata: {
    label: string;
    value: string;
  };
}

// 关键修复：把 characterList 重命名为 CHARACTERS 并导出
export const CHARACTERS = [
  // 许愿（xuyuan.jpg）
  {
    id: 'xu-yuan',
    name: '许愿',
    title: '白门传人',
    tag: '四悔斋主',
    description: '北京琉璃厂小古董店“四悔斋”的主人，五脉白门传人。看似玩世不恭，实则胸怀大义，凭借过人的鉴宝天赋和缜密的逻辑推理，揭开佛头案真相。',
    quote: '鉴宝易，鉴人难。',
    faction: '五脉',
    color: '#E53935',
    image: '../images/xuyuan.jpg'
  },

  // 药不然（yaoburan.jpg）
  {
    id: 'yao-buran',
    name: '药不然',
    title: '玄门传人',
    tag: '药家二爷',
    description: '五脉玄门传人，人称“药二爷”。西装革履，风度翩翩，鉴宝手段科学严谨。与许愿亦敌亦友，身份神秘莫测。',
    quote: '真相往往藏在最显眼的地方。',
    faction: '五脉',
    color: '#1E88E5',
    image: '../images/yaoburan.jpg'
  },

  // 黄烟烟（huangyanyan.jpg）
  {
    id: 'huang-yanyan',
    name: '黄烟烟',
    title: '青门传人',
    tag: '黄家大小姐',
    description: '五脉青门传人，黄克武的孙女。性格冷傲，身手不凡，是许愿调查路上的得力伙伴。',
    quote: '古董的事，要靠古董的规矩解决。',
    faction: '五脉',
    color: '#43A047',
    image: '../images/huangyanyan.jpg'
  },

  // 木户加奈（muhujianai.jpg）
  {
    id: 'kido-kana',
    name: '木户加奈',
    title: '木户家族',
    tag: '日本友人',
    description: '木户有三的孙女，为了归还武则天明堂玉佛头来到中国，开启了整个故事的序幕。',
    quote: '爷爷的遗愿，就是让佛头回到它该去的地方。',
    faction: '其他',
    color: '#FB8C00',
    image: '../images/muhujianai.jpg'
  },

  // 老朝奉（laochaofeng.jpg）
  {
    id: 'lao-chaofeng',
    name: '老朝奉',
    title: '神秘首领',
    tag: '造假巨头',
    description: '古董造假集团“老朝奉”的幕后首领，身份极其神秘，与五脉有着数十年的恩怨情仇。',
    quote: '这世上的真假，我说了算。',
    faction: '老朝奉',
    color: '#212121',
    image: '../images/laochaofeng.jpg'
  },

  // 许一城（xuyicheng.jpg）
  {
    id: 'xu-yicheng',
    name: '许一城',
    title: '白门先祖',
    tag: '一代宗师',
    description: '许愿的爷爷，五脉白门前任掌门。在动荡年代为了保护国宝不惜背负骂名，是佛头案真正的守护者。',
    quote: '人可以死，东西不能丢。',
    faction: '五脉',
    color: '#E53935',
    image: '../images/xuyicheng.jpg'
  },

  // 付贵（fugui.jpg）
  {
    id: 'fu-gui',
    name: '付贵',
    title: '江湖老炮',
    tag: '情报专家',
    description: '混迹江湖多年的老警察，消息灵通，在许愿调查佛头案的过程中提供了许多关键情报。',
    quote: '这琉璃厂的水，深着呢。',
    faction: '其他',
    color: '#795548',
    image: '../images/fugui.jpg'
  },

  // 罗局（luoju.jpg）
  {
    id: 'luo-ju',
    name: '罗局',
    title: '官方代表',
    tag: '文物局长',
    description: '文物局领导，负责佛头归还事宜。在规则与真相之间寻找平衡。',
    quote: '文物归国，是国家的大事。',
    faction: '其他',
    color: '#607D8B',
    image: '../images/luoju.jpg'
  },

  // 木户有三（muhuyousan.jpg）
  {
    id: 'kido-yuzo',
    name: '木户有三',
    title: '日本学者',
    tag: '佛头案亲历者',
    description: '日本著名的中国文物学者，许一城生前好友。当年佛头案的关键人物，带走佛头并终身致力于寻找真相。',
    quote: '艺术无国界，但真相有归处。',
    faction: '其他',
    color: '#FB8C00',
    image: '../images/muhuyousan.jpg'
  },

  // 黄克武（huangkewu.jpg）
  {
    id: 'huang-kewu',
    name: '黄克武',
    title: '青门掌门',
    tag: '五脉大佬',
    description: '五脉青门掌门，黄烟烟的爷爷。性格古板，对许家有着极深的成见，但在大是大非面前依然坚守底蕴。',
    quote: '黄家的东西，从来不讲价。',
    faction: '五脉',
    color: '#43A047',
    image: '../images/huangkewu.jpg'
  },

  // 药来（yaolai.jpg）
  {
    id: 'yao-lai',
    name: '药来',
    title: '玄门掌门',
    tag: '五脉大佬',
    description: '五脉玄门掌门，药不然的爷爷。在古董界德高望重，行事稳健，对家族声誉极度看重。',
    quote: '任何时候，最需要当心地，是身边人。',
    faction: '五脉',
    color: '#1E88E5',
    image: '../images/yaolai.jpg'
  },

  // 细川太郎（xichuantailang.jpg）
  {
    id: 'hosokawa-taro',
    name: '细川太郎',
    title: '细川家族',
    tag: '日本代表',
    description: '日本细川家族的代表，对中国古董有着浓厚兴趣，在佛头案的国际交涉中扮演重要角色。',
    quote: '我愿意为加奈小姐做任何事，除了这一件。',
    faction: '其他',
    color: '#9C27B0',
    image: '../images/xichuantailang.jpg'
  }
];

export const ANTIQUES: Antique[] = [
  {
    id: 'buddha-head',
    name: '则天玉佛头',
    era: '唐代/玉器',
    tag: '',
    description: '全剧之眼。这尊玉佛头的真假，牵动了跨越半个世纪的家族恩怨与国宝归还。1937年，许一城被指盗卖佛头给日本人木户有三，被定为汉奸枪决。六十年后，木户有三的孙女木户加奈秉承祖父遗愿，将佛头归还中国，却指定要许家后人参与交接仪式。\n许愿在鉴定时发现佛头为赝品，从而展开了一场追寻真相的冒险，在追寻真相的过程中逐渐揭开了爷爷许一城的冤屈，也揭露了老朝奉的阴谋。',
    story: '整个故事的核心，牵扯出许家三代的荣辱兴衰。',
    image: '../images/buddha-head.jpg',
    metadata: { label: 'DYNASTY', value: 'TANG' }
  },
  {
    id: 'kido-notebook',
    name: '木户笔记',
    era: '现代/文献',
    tag: '',
    description: '木户有三留下的笔记，不仅记录了佛头案的疑点，更包含了一段深藏已久的真相。',
    story: '许愿通过笔记中的线索，逐步还原了当年佛头案的真实经过。',
    image: '../images/kido-notebook.jpg',
    metadata: { label: 'ORIGIN', value: 'JAPAN' }
  },
  {
    id: 'bronze-ware',
    name: '父辛爵',
    era: '西周/青铜器',
    tag: '',
    description: '世间仅存三件的宝贝，其中一件被黄家收藏，但多年前遗失了。',
    story: '许愿一行在安阳斗口时靠着黄烟烟拿出的父辛爵棋胜一招。许愿惊讶于这件东西的仿制技术，但黄烟烟却说这是真品。是真是假，背后藏着不为人知的隐秘。',
    image: '../images/bronze-ware.jpg',
    metadata: { label: 'FAMILY', value: 'HUANG' }
  },
  {
    id: 'bronze-mirror',
    name: '海兽葡萄纹铜镜',
    era: '唐代',
    tag: '',
    description: '纹饰繁复，工艺考究，是唐代铜镜的巅峰之作。刻有“宝志”二字。',
    story: '许愿在调查过程中发现的关键线索之一。',
    image: '../images/bronze-mirror.jpg',
    metadata: { label: 'DYNASTY', value: 'TANG' }
  }
];