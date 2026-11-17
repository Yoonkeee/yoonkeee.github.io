import { profile } from "./portfolio";

export type Bullet = {
  text: string;
  sub?: string[];
};

export type Work = {
  title: string;
  period: string;
  bullets: Bullet[];
};

export type Job = {
  id: string;
  company: string;
  role: string;
  period: string;
  meta: string[];
  desc: string;
  summary?: string;
  works?: Work[];
  bullets?: Bullet[];
};

export type SideProject = {
  id: string;
  title: string;
  period: string;
  desc: string;
  bullets: Bullet[];
  stack: string[];
};

export type Skill = {
  label: string;
  items: string[];
  note?: string;
};

export type Record = {
  period: string;
  title: string;
  note: string;
};

export const resumeSections = [
  { id: "experience", no: "01", title: "경력" },
  { id: "side-projects", no: "02", title: "개인 프로젝트" },
  { id: "skills", no: "03", title: "기술" },
  { id: "activities", no: "04", title: "오픈소스 · 발표" },
  { id: "education", no: "05", title: "학력 · 교육" },
] as const;

export type ResumeSectionId = (typeof resumeSections)[number]["id"];

export const resumeIntro = [
  ...profile.intro,
  "AI에 익숙해지고 잘 다루게 되면서 한계가 점점 없어지는 것을 느꼈고, 프론트엔드 직무라는 경계를 넘어 백엔드, QA, 기획, 디자인까지",
  "모두 소화할 수 있는 Product Engineer를 목표로 합니다.",
];

export const experience: Job[] = [
  {
    id: "dwhale",
    company: "디웨일",
    role: "Frontend Developer",
    period: "2024. 02 ~ 2026. 11",
    meta: ["2년 10개월", "CLAP 웹 프론트엔드"],
    desc: "기업용 성과관리 SaaS CLAP의 Next.js 기반 웹과 모바일에서 대규모 조직도 엑셀 업로드, 기업용 MFA, 평가 관리 등의 피처를 개발하며 사내 AX를 주도했습니다.",
    summary:
      "AI로 피처를 개발하기 시작하면서 의도와 다르게 구현되거나 버그가 늘어나는 문제를 겪었습니다. 이를 계기로 하네스를 깊게 파고들며 여러 방식을 시도해 보았고, Agent를 신뢰할 수 있는 개발 방법을 익혔습니다. 그 결과 개발 속도를 높이면서도 QA 단계에서 발생하는 이슈는 줄일 수 있었습니다.",
    works: [
      {
        title: "AI 개발 기반 구축",
        period: "2025. 12 ~",
        bullets: [
          {
            text: "테크 스펙 기반 코드 초안 생성, QA 이슈 수정, Subagent 교차 검증 등 피처 개발 단계별 공용 스킬을 만들어 팀에 정착시켰습니다.",
          },
          {
            text: "코드베이스를 분석해 암묵적인 컨벤션을 팀 규칙으로 문서화하고, 규칙 파일마다 Frontmatter로 적용 경로를 지정해 Context window를 효율적으로 관리했습니다.",
          },
          {
            text: "Claude + GitHub Actions 기반의 AI 코드 리뷰를 구축하고, 프로덕트의 발전에 맞춰 꾸준히 개선했습니다.",
          },
        ],
      },
      {
        title: "비개발 조직 AX",
        period: "2026. 02 ~",
        bullets: [
          {
            text: "기획팀의 핵심 워크플로우로 자리 잡은 다국어 처리 자동화 도구를 만들었습니다. Figma 문구 추출부터 기존 키 재사용 판별, 번역, 시트 반영까지의 과정을 한 번에 처리할 수 있도록 구현했습니다.",
          },
          {
            text: "고객사의 평가 양식을 CLAP 양식으로 옮기는 데 들어가던 CSM팀의 수작업 공수를 AI 스킬로 크게 줄였습니다. 기존 수작업 사례 몇 세트를 기반으로 Eval을 구성하고, CLAP 스키마에 맞는지 검증하는 과정을 넣어 정확도를 높였습니다.",
          },
        ],
      },
      {
        title: "사내 업무 자동화 도구",
        period: "2024. 03 ~",
        bullets: [
          {
            text: "전 직원 근무 현황판 및 근무 시간 관리 도구",
            sub: [
              "재택근무 중인 동료의 현재 근무 상태를 알려면 Slack 메시지를 거슬러 올라가 찾아야 했습니다. 이를 한 화면에 모은 현황판을 만들고, Slack 프로필 상태에 자동으로 연동되도록 구현했습니다.",
              "각자 엑셀에 직접 입력해 계산하던 주간 근무 시간 집계를 자동화했고, 70여 명의 임직원이 매일 누적 근무 시간을 확인하는 데 사용했습니다.",
            ],
          },
          {
            text: "테크 스펙 기반 티켓 생성 자동화",
            sub: [
              "입사 직후 테크 스펙의 일감을 GitHub 이슈로 하나씩 옮겨 등록하던 반복 작업을 발견해 일괄 생성 도구로 자동화했고, 2년 넘게 개발팀의 피처별 이슈 생성에 사용되었습니다.",
            ],
          },
          {
            text: "AI 계정 대시보드",
            sub: [
              "계정마다 리셋 시점이 달라 수동으로 확인하던 사내 Claude 사용량을 별도 데몬 없이 자동 수집하는 대시보드를 만들었습니다.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "harami",
    company: "하람아이",
    role: "SW Engineer",
    period: "2022. 07 ~ 2023. 07",
    meta: ["1년 1개월", "그룹웨어 솔루션 개발"],
    desc: "Java와 JSP 기반 기업용 그룹웨어의 고객사 맞춤 기능을 개발하고, 레거시 데이터 이관을 담당했습니다.",
    bullets: [
      {
        text: "고객사에서 기존에 사용하던 그룹웨어의 데이터를 새 시스템으로 이관하는 작업을 Python으로 자동화해 2억 원 규모 수주에 기여했습니다. 고객사별 설정만 분리한 인터페이스로 설계해 이후 다른 두 프로젝트에서도 그대로 재사용했습니다.",
      },
    ],
  },
];

export const sideProjects: SideProject[] = [
  {
    id: "pilates",
    title: "필라테스 센터 관리 앱",
    period: "2025. 12 ~",
    desc: "필라테스 센터의 회원 및 스케줄 관리와 레슨 예약, 전자 계약을 처리하는 웹 서비스",
    bullets: [
      {
        text: "실제 필라테스 센터에서 회원 300여 명과 강사 15명이 사용 중인 서비스입니다. 회원의 개인 및 그룹 레슨 예약과 강사의 레슨 일지 기록 및 스케줄 관리를 비롯해, 회원권 판매 시 전자 계약과 카카오톡 알림 연동까지 지원하고 있습니다.",
      },
      {
        text: "SpecKit 기반의 SDD(명세 주도 개발)를 적용해 도메인 명세와 구현 계획을 먼저 수립하고 개발하며, 1인 개발 환경에서도 복잡한 예약·결제 로직을 안정적으로 구축했습니다.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Node.js", "PostgreSQL"],
  },
  {
    id: "dog-playroom",
    title: "애견 놀이방 관리 앱",
    period: "2023. 03 ~",
    desc: "애견 놀이방의 회원권 결제 및 차감과 실시간 입퇴장 시간표를 관리하는 PWA",
    bullets: [
      {
        text: "매장 관리자가 수기 장부와 메신저로 처리하던 입퇴장 및 잔여 시간 안내를 자동화해 2023년부터 유료 운영하고 있습니다.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "MariaDB"],
  },
];

export const skills: Skill[] = [
  { label: "Frontend", items: ["TypeScript", "Next.js", "React", "TanStack Query"] },
  { label: "UI · Test", items: ["TailwindCSS", "MUI", "Mantine UI", "Jest", "Playwright"] },
  {
    label: "AI",
    items: [
      "하네스를 깊이 이해하고 Claude와 GPT의 모델들을 다양하게 활용하며, 새로운 도구와 변화를 빠르게 탐색해 실무에 적용합니다.",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Prisma", "Python", "FastAPI", "MySQL"],
    note: "사내 도구 및 사이드 프로젝트 API와 DB 설계",
  },
  { label: "Etc", items: ["Datadog", "Sentry"] },
];

export const activities: Record[] = [
  {
    period: "2026. 07 ~",
    title: "AI 코딩 도구 오픈소스 기여",
    note: "OmO(oh-my-openagent), senpi, opencodex, CodexBar",
  },
  { period: "2026. 04", title: "하네스 엔지니어링 - 같은 모델, 다른 행동의 비밀", note: "사내 개발팀을 대상으로 발표" },
  { period: "2026. 03", title: "Claude Skill 이해하기", note: "사내 임직원을 대상으로 강의" },
];

export const education: Record[] = [
  { period: "2013 ~ 2021", title: "한양대학교", note: "소프트웨어학부 졸업" },
  { period: "2023. 06 ~ 2023. 12", title: "F-Lab", note: "프론트엔드 멘토링 수료" },
  { period: "2019", title: "SW/ICT 종합학술대회", note: "우수상" },
];
