// 修改个人信息、简历和 Demo 后，保存并刷新网页。
// 简历资料来自用户提供的 PDF；投稿与在研状态按原简历保留。
window.STUDIO = {
  name: 'Viola Du',
  title: 'Viola Du’s studio',
  email: '13251891573@163.com',
  resume: {
    headline: '杜佳蔚 Jiawei Du',
    introduction: '北京协和医学院遗传学硕士在读，预计 2027 年毕业。关注基因治疗、神经系统疾病、单细胞组学与 AI 辅助药物研发，尝试把湿实验、组学数据和 AI 工具结合起来。',
    pdf: 'assets/viola-du-resume.pdf',
    education: [
      { title: '北京协和医学院（清华大学医学部）', subtitle: '硕士 · 遗传学｜平均成绩 88/100', period: '2024.09 — 2027.06（预计）', description: '研究方向：神经系统疾病、单细胞组学与 AIDD。' },
      { title: '大连民族大学', subtitle: '本科 · 食品质量与安全｜工学学士', period: '2020.09 — 2024.06', description: '' }
    ],
    experience: [
      { title: '靶点调研与多模态证据聚合 Agent', subtitle: '个人项目 · Dify / Python / Cloudflare Workers / REST API', description: '整合 UniProt、PubMed/PMC 与 Open Targets，构建基因驱动的自动化调研流程；关联文献与图文证据，支持结论回溯。' },
      { title: 'ATCAY 相关开曼型共济失调的致病机制与基因治疗', subtitle: '硕士课题 · 在研', description: '结合小脑单细胞转录组、分子表征与超微结构分析，研究疾病阶段、细胞类型和分子通路，为干预策略提供依据。' },
      { title: '神经系统精准基因治疗与核酸药物技术路线研究', subtitle: '英文综述 · 已投稿', description: '比较 AAV、血脑屏障递送、ASO、mRNA 与基因编辑等技术路线，分析适用场景、证据与转化局限。' }
    ],
    highlights: [
      'Human Genetics（2025）｜第二作者，已发表',
      'PAX1 研究论文｜第二作者，已投稿',
      'ATCAY 小脑单细胞转录组研究｜已投稿',
      '基因治疗技术综述｜已投稿'
    ],
    skills: ['Python / R', '基因编辑', '单细胞组学', '基因组学', 'AIDD']
  },
  demos: [
    {
      id: 'target-research', title: '靶点调研信息整合 Agent', category: 'RESEARCH & EVIDENCE',
      description: '从一个靶点出发，连接蛋白功能、疾病关联与文献证据，让科研调研更有条理。',
      tags: ['靶点调研', '多源信息整合', '科研 Agent'],
      url: 'https://udify.app/chat/OmVkV2a1NfGbL4Wp', status: 'live',
      image: 'assets/demo-research.svg', imageAlt: '粉色研究工作台：基因靶点连接文献、蛋白与证据卡片'
    },
    {
      id: 'disease-target', title: '疾病驱动的小分子靶点评估 Agent', category: 'DISEASE & DISCOVERY',
      description: '从疾病问题出发，探索小分子靶点的评估思路。体验入口即将开放。',
      tags: ['疾病驱动', '小分子', '靶点评估'],
      url: '', status: 'coming-soon',
      image: 'assets/demo-discovery.svg', imageAlt: '浅紫色实验笔记：疾病线索、分子结构与评估清单'
    }
  ]
};
