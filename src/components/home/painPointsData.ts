// 只负责数据，不负责样式
export interface PainPointDataItem {
  key: string;
  type: 'battery' | 'sleep' | 'digest' | 'skin' | 'emotion';
  text: string;
}

export const PAIN_POINTS_LIST: PainPointDataItem[] = [
  {
    key: 'battery',
    type: 'battery',
    text: '莫名疲惫，精力不济？',
  },
  {
    key: 'sleep',
    type: 'sleep',
    text: '辗转难眠，越睡越累？（我曾失眠20余年）',
  },
  {
    key: 'digest',
    type: 'digest',
    text: '肠胃敏感，饮食处处小心？',
  },
  {
    key: 'skin',
    type: 'skin',
    text: '皮肤问题反复，痘痘、疹子不断？（我曾战痘十年、荨麻疹四年）',
  },
  {
    key: 'emotion',
    type: 'emotion',
    text: '情绪波动，焦虑不安？',
  },
];
