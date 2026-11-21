import images from "./images.json";

export type ImageName = keyof typeof images;

export type ImageVariant = { src: string; width: number; height: number };

export type ImageEntry = { large: ImageVariant; small?: ImageVariant };

export type Shot = {
  image: ImageName;
  caption: string;
};

export type InlineLink = {
  text: string;
  href: string;
};

export type Point = {
  body: string;
  link?: InlineLink;
};

export type Metric = {
  label: string;
  value: string;
};

export type FrameKind = "screen" | "diagram" | "phone" | "inline";

export type StageStep = {
  body?: string;
  points?: Point[];
  frame: FrameKind;
  shots: Shot[];
};

type ProjectBase = {
  id: string;
  no: string;
  title: string;
  sub: string;
  since: string;
  period: string;
  users?: string;
  stack: string[];
  summary: string;
};

export type EditorialProject = ProjectBase & {
  kind: "editorial";
  metrics: Metric[];
  points: Point[];
  story: { paragraphs: string[]; link: InlineLink };
};

export type StageProject = ProjectBase & {
  kind: "stage";
  steps: StageStep[];
};

export type Project = EditorialProject | StageProject;

type FeedbackBase = {
  id: string;
  kind: string;
  image: ImageName;
};

export type FeedbackNote = FeedbackBase & {
  type: "note";
  date: string;
  paragraphs: string[];
};

export type FeedbackReview = FeedbackBase & {
  type: "review";
  question: string;
  score: string;
  comments: string[];
};

export type Feedback = FeedbackNote | FeedbackReview;

export const profile = {
  name: "김윤기",
  role: "프론트엔드 개발자",
  stack: "React · Next.js · TypeScript",
  intro: [
    "Next.js 기반의 웹과 모바일 프론트엔드를 개발해 왔습니다.",
    "AI를 깊이 다루게 되면서 혼자 해결할 수 있는 일의 한계가 사라지는 것을 체감했고, 프론트엔드라는 경계를 넘어 백엔드, QA, 기획, 디자인까지 아우르는 Product Engineer를 지향합니다.",
    "팀의 생산성을 높이고 불편함을 해소하기 위해 스스로 문제를 정의하고 개선책을 찾아 실행해 왔습니다.",
    "타 직군과의 소통에도 능숙하며, 좋은 팀 분위기를 만들기 위해 노력합니다.",
  ],
  email: "yoonkeee@gmail.com",
  github: { label: "github.com/Yoonkeee", url: "https://github.com/Yoonkeee" },
} as const;

export const projects: Project[] = [
  {
    kind: "editorial",
    id: "project-01",
    no: "01",
    title: "CLAP 웹 및 모바일 프론트엔드 개발",
    sub: "목표 및 평가 관리, 대규모 조직도 업로드, 기업용 인증, 다국어(i18n) 지원",
    since: "2024. 02",
    period: "2024. 02 ~ 2026. 11 (2년 10개월)",
    stack: ["Next.js", "TypeScript", "TanStack Query", "TailwindCSS", "next-intl", "MSW", "Jest"],
    summary:
      "기업용 성과관리 SaaS CLAP의 웹과 모바일 프론트엔드를 담당하며, 핵심 도메인인 목표와 리뷰 관리부터 대규모 조직도 업로드, 기업용 맞춤 인증(MFA, FIDO), 다국어(i18n) 지원까지 제품 전반의 주요 피처를 개발했습니다.",
    metrics: [
      { label: "작성한 PR", value: "1,246건" },
      { label: "리뷰한 팀원 PR", value: "2,547건" },
      { label: "개발한 피처", value: "27개" },
    ],
    points: [
      {
        body: "목표 수립과 수정 이력, 목표 그룹화, 성과연계 등급형 리뷰 등 성과관리의 핵심 흐름을 이루는 도메인 피처를 웹과 모바일에 걸쳐 개발했습니다.",
      },
      {
        body: "사번 로그인, 이메일 2차 인증(MFA), MPASS(FIDO) 연동 등 고객사별 요구사항에 맞춘 다양한 인증 플로우를 웹과 모바일에 구축했습니다.",
      },
      {
        body: "제품에 다국어(i18n) 지원을 처음 도입하며 문구 키 관리 규칙과 번역 훅, 다국어 평가 템플릿 구조를 구축했습니다. 이 과정에서 시안 문구를 추출해 기존 키와 대조하고 시트에 옮기는 반복 공수를 체감했고, 이를 해결하기 위해 02번 다국어 처리 자동화 도구를 직접 만들었습니다.",
        link: { text: "02번 다국어 처리 자동화 도구", href: "#project-02" },
      },
      {
        body: "대규모 조직도를 한 번에 등록하고 검수하는 엑셀 업로드 기능과 세부 권한 커스텀 등 엔터프라이즈 관리자 기능을 구현했습니다.",
      },
    ],
    story: {
      paragraphs: [
        "대규모 조직도 엑셀 업로드 피처를 개발할 때, 기존 작업을 덮어쓰도록 되어 있던 초기 기획에 의견을 내어 개선한 경험이 있습니다. 당시 조직도 업로드는 여러 방식이 있었고 고객사마다 한 번에 하나의 방식으로만 진행할 수 있었는데, 최초 기획은 다른 관리자가 새로 업로드하면 앞사람의 작업을 단순 덮어쓰는 구조였습니다. 하지만 조직도 업로드는 검수 과정이 길어, 앞사람이 작업 중일 때 뒷사람이 덮어써 버리면 작업하던 내용이 날아가는 문제가 있었습니다.",
        "이를 기획팀과 백엔드 팀에 공유하고, 한 관리자가 업로드 과정에 진입하면 다른 업로드 방식은 잠가 덮어쓰기를 막자고 제안했습니다. 대신 잠긴 화면에서 누가 작업 중인지 보여주고 이어서 검수할 수 있도록 플로우를 변경해 작업 유실을 방지했습니다. 이후 동료 평가에서도 필요한 개선 사항을 잘 설명하고 제안해 주어 편하게 진행할 수 있었다는 피드백을 받았습니다. (피드백 - 타 직군과의 협업 소통 (다면 평가))",
      ],
      link: { text: "(피드백 - 타 직군과의 협업 소통 (다면 평가))", href: "#feedback-comm" },
    },
  },
  {
    kind: "stage",
    id: "project-02",
    no: "02",
    title: "다국어 처리 자동화 도구",
    sub: "Figma 문구 추출부터 기존 키 재사용 판별, 다국어 번역, Google Sheets 반영까지 자동화",
    since: "2026. 02",
    period: "2026. 02 ~",
    users: "기획팀, 프로덕트 디자이너",
    stack: ["Next.js", "Figma REST API", "Google Sheets API", "Claude Code"],
    summary:
      "신규 피처마다 기획팀이 Figma 시안의 문구를 하나씩 뽑아 다국어 시트에 옮기고 직접 번역하던 수작업을 자동화해, 기획팀의 핵심 워크플로우로 정착시켰습니다.",
    steps: [
      {
        points: [
          {
            body: "최초 설계 시에는 Figma MCP로 연동하려 했으나, 사용할 때마다 Figma 앱과 추출할 페이지를 열어두어야 하는 제약이 있었습니다. 비개발 직군인 기획자와 디자이너가 쓰기에 번거롭다고 판단해 Figma REST API 기반으로 구현했습니다.",
          },
          {
            body: "개발 환경 설정 없이 바로 쓸 수 있도록 각자 PC의 Claude를 활용하는 로컬 웹앱으로 만들고, 프롬프트 한 줄로 설치할 수 있게 저장소를 구성했습니다. 또한 앱 실행 시 자동으로 최신 버전을 유지하고, 오류가 발생하면 로그와 함께 GitHub 이슈로 자동 등록되도록 설정했습니다.",
          },
        ],
        frame: "diagram",
        shots: [
          {
            image: "i18n-architecture",
            caption: "로컬 웹앱이 Figma 문구를 추출하고, Claude로 분류와 번역, 키 생성을 거쳐 Google Sheets에 반영하는 구조",
          },
        ],
      },
      {
        frame: "diagram",
        shots: [
          {
            image: "i18n-flow",
            caption:
              "Figma 링크 하나로 문구를 분석하고, 담당자 검수를 거쳐 Google Sheets에 키를 추가하기까지의 처리 흐름. 같은 번호의 단계는 동시에 실행됩니다.",
          },
        ],
      },
    ],
  },
  {
    kind: "stage",
    id: "project-03",
    no: "03",
    title: "전 직원 근무 현황판 및 근무 시간 관리 도구",
    sub: "실시간 근무 상태 공유와 Slack 프로필 자동 연동, 주간 근무 시간 자동 집계",
    since: "2025. 01",
    period: "2025. 01",
    users: "전 임직원 (약 70명)",
    stack: ["Next.js", "TanStack Query", "Supabase", "Slack Web API", "Mantine UI"],
    summary:
      "주간 40시간 자율 재택근무 환경이라 기존 근태 관리 SaaS를 그대로 적용하기 어려웠습니다. 이로 인해 동료의 현재 근무 상태를 알려면 Slack 메시지를 거슬러 올라가 찾아야 했고, 주간 근무 시간은 각자 엑셀에 직접 기록하고 취합해야 하는 비효율이 있어 근무 현황과 시간 관리를 한 앱에 모은 사내 맞춤 도구를 제작했습니다.",
    steps: [
      {
        frame: "screen",
        shots: [
          {
            image: "work-status-team",
            caption: "팀별 실시간 근무 상태를 확인하고 상단 버튼으로 내 상태를 변경하는 화면",
          },
        ],
      },
      {
        body: "Slack에서 직접 이모지를 입력하는 대신 현황판에서 근무 상태를 설정하면 Slack Web API로 프로필 상태와 이모지가 자동 연동되게 구현했습니다. 덕분에 재택근무 중인 동료에게 대화나 협업을 요청할 때 현재 상태를 즉시 알 수 있어 소통에 큰 도움이 되었습니다.",
        frame: "inline",
        shots: [
          { image: "slack-profile-status", caption: "현황판에서 변경한 상태가 자동 반영된 Slack 프로필" },
          { image: "slack-name-status", caption: "Slack 메시지 목록의 이름 옆에도 동일한 상태 표시" },
        ],
      },
      {
        body: "출퇴근, 휴식, 식사 기록을 바탕으로 일별 및 주간 누적 근무 시간을 자동 집계하여, 70여 명의 임직원이 매일 근무 시간을 확인하고 관리하는 데 사용했습니다.",
        frame: "screen",
        shots: [
          {
            image: "work-status-worktime",
            caption: "출퇴근 및 휴식 기록에서 제외 시간을 빼고 주간 누적 근무 시간을 자동 계산하는 화면",
          },
        ],
      },
    ],
  },
  {
    kind: "stage",
    id: "project-04",
    no: "04",
    title: "AI 계정 대시보드",
    sub: "Claude Code statusLine 기반 사용량 자동 수집 및 사내 계정 관리 대시보드",
    since: "2026. 06",
    period: "2026. 06 ~ 2026. 09",
    users: "AI 계정 운영 담당자",
    stack: ["Next.js", "Supabase", "Drizzle", "AWS Amplify", "Claude Code statusLine"],
    summary:
      "계정마다 리셋 시점이 달라 수동으로 취합하여 확인하던 사내 Claude 사용량을 별도 데몬 없이 자동 수집하는 대시보드를 만들었습니다. 사용자별 사용량과 주간 최대치를 한눈에 비교해 계정을 합리적으로 배분할 수 있게 했습니다.",
    steps: [
      {
        body: "가장 단순한 수집 방식은 각 PC에 상시 구동되는 백그라운드 데몬을 설치하는 것이었지만, 구성원들이 거부감을 느낄 수 있다고 판단했습니다. 대신 Claude Code 실행 중에만 동작하는 상태 표시줄(statusLine)을 활용해, 설치 명령 한 줄로 사용 중에만 가볍게 수집하도록 설계했습니다.",
        frame: "diagram",
        shots: [
          {
            image: "ai-usage-architecture",
            caption: "Claude Code의 statusLine 스크립트가 사용률을 조회해 대시보드 API로 전송하는 구조",
          },
        ],
      },
      {
        body: "계정 및 사용자별 주간 사용률과 리셋까지 남은 시간, 일평균 사용량을 한 표에서 비교할 수 있게 구현했습니다.",
        frame: "screen",
        shots: [
          {
            image: "ai-usage-dashboard",
            caption: "계정별 주간 사용량, 리셋까지 남은 시간, 결제일, 하루 평균 사용률을 비교하는 화면",
          },
        ],
      },
      {
        body: "이후 CTO의 요청을 반영해 리셋 주기별 주간 최대 사용량 비교 화면을 추가하여, 피크 사용량 기준으로도 계정을 재배분할 수 있게 했습니다.",
        frame: "screen",
        shots: [
          {
            image: "ai-usage-weekly-peak",
            caption: "계정별 주간 최대 사용률을 주차별로 비교하는 표 (예시 데이터)",
          },
        ],
      },
    ],
  },
  {
    kind: "stage",
    id: "project-05",
    no: "05",
    title: "필라테스 센터 관리 앱",
    sub: "필라테스 센터의 회원 및 스케줄 관리와 레슨 예약, 전자 계약을 처리하는 웹 서비스",
    since: "2025. 12 ~",
    period: "2025. 12 ~",
    users: "필라테스 센터 (회원 약 300명, 강사 15명)",
    stack: ["Next.js", "TypeScript", "Mantine UI", "Prisma", "PostgreSQL", "Cloudflare Tunnel"],
    summary:
      "실제 필라테스 센터에서 회원 300여 명과 강사 15명이 사용 중인 레슨 예약 및 센터 운영 서비스입니다. 회원용 모바일 PWA와 운영자 및 강사용 관리 웹을 통해 예약부터 스케줄 관리, 전자 계약과 알림톡 발송까지 한 흐름으로 처리합니다.",
    steps: [
      {
        points: [
          {
            body: "복잡한 예약, 결제 도메인을 1인 풀스택으로 개발하며 AI 구현 결과물의 편차를 줄이기 위해 SpecKit 기반의 SDD(명세 주도 개발)를 적용했습니다. 기능별 요구사항 명세와 태스크를 먼저 확정한 뒤 구현을 진행해 설계 누락 없이 빠르게 실서비스를 구축했습니다.",
          },
          {
            body: "회원의 개인 및 그룹 레슨 예약과 강사의 반복 스케줄 관리, 레슨 일지 기록을 모바일 PWA와 관리 웹에 각각 맞춰 구현했습니다.",
          },
          {
            body: "회원권 판매 시 토스페이먼츠 결제와 카카오톡 기반 전자 계약, 알림톡(Solapi) 발송이 자동으로 이어지도록 연동해 센터의 수기 안내와 종이 계약 과정을 없앴습니다.",
          },
          {
            body: "고정 서버 비용을 줄이기 위해 Mac Mini 홈 서버에 Cloudflare Tunnel과 GitHub Actions(self-hosted runner) 배포 파이프라인을 구축하고, Sentry로 운영 에러를 모니터링하고 있습니다.",
          },
        ],
        frame: "diagram",
        shots: [
          {
            image: "fit-studio-architecture",
            caption: "회원용 모바일 PWA와 운영자 및 강사용 관리 웹을 제공하고, 결제와 전자 계약, 카카오 알림톡을 연동한 구조",
          },
        ],
      },
      {
        frame: "screen",
        shots: [{ image: "fit-studio-schedule", caption: "스케줄표" }],
      },
    ],
  },
  {
    kind: "stage",
    id: "project-06",
    no: "06",
    title: "애견 놀이방 관리 앱",
    sub: "애견 놀이방의 입퇴장 시간표 관리와 5분 단위 잔여 시간 차감, 결제 내역을 관리하는 PWA",
    since: "2023. 03 ~",
    period: "2023. 03 ~",
    users: "애견 놀이방 매장 관리자 및 보호자",
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "MariaDB", "PWA"],
    summary:
      "기존에는 매장에서 강아지 정보와 결제 내역, 남은 시간을 모두 수기로 관리하느라 놀이방 이용 단위가 4시간, 8시간 두 가지뿐이었습니다. 이 앱을 통해 5분 단위로 사용 시간을 자동 차감할 수 있게 되면서 보호자가 자유롭게 강아지를 맡기고 찾을 수 있게 되었고, 이용자가 늘어 매장 매출 향상으로 이어졌습니다.",
    steps: [
      {
        body: "관리자가 앱에서 입퇴장 처리를 하면 이용 시간이 5분 단위로 계산되어 강아지별 잔여 시간에서 차감되고, 결제 및 차감 내역을 한눈에 확인할 수 있도록 구현했습니다.",
        frame: "phone",
        shots: [{ image: "petcare-timetable", caption: "강아지별 이용 시간과 주의사항" }],
      },
      {
        body: "매장 현장에서 태블릿과 모바일로 바로 쓸 수 있도록 PWA로 제작해, 수기 장부 기록과 잔여 시간 계산, 메신저 안내에 들던 반복 업무를 없앴습니다.",
        frame: "phone",
        shots: [{ image: "petcare-message", caption: "보호자 안내용 이용 내역 메시지 자동 생성" }],
      },
      {
        body: "2023년 출시 이후 현장의 요구사항을 반영해 호텔링 관리 기능을 추가하고 디자인을 개선하며, 3년 넘게 유료 운영하고 있습니다.",
        frame: "phone",
        shots: [
          { image: "petcare-hotel-calendar", caption: "호텔링 예약 월간 캘린더" },
          { image: "petcare-hotel-detail", caption: "호텔링 예약 상세와 요금 계산" },
        ],
      },
    ],
  },
];

export const feedbackHeading = { no: String(projects.length + 1).padStart(2, "0"), title: "동료 피드백" };

export const feedback: Feedback[] = [
  {
    type: "note",
    id: "feedback-tools",
    kind: "사내 도구 및 업무 자동화",
    image: "feedback-tools",
    date: "25.11.07",
    paragraphs: [
      "윤기님 오랜만에 쓰는 피드백 입니다.\n오랜만에 이슈메이커 사용해보니 사용성이 더 좋아졌더라구요. 지금 하고 계시는 근무현황판 개선도 그렇고,\n업무 외에 직원들의 편의를 위해 노력해주셔서 감사합니다. 덕분에 편하게 잘 사용하고 있습니다!",
      "그 외에도 직무회의나 동료의 테크닥 발표 때 적극적으로 참여하는 모습도 보기 좋았습니다!\n저의 질문에도 빠르게 답변해주셔서 적응하는 데에 큰 도움이 됩니다. 👏\n앞으로 4팀에서 함께 잘 해봐요!",
    ],
  },
  {
    type: "note",
    id: "feedback-issue-maker",
    kind: "이슈 생성 자동화",
    image: "feedback-issue-maker",
    date: "24.04.03",
    paragraphs: [
      "윤기님 실시간으로 이슈 생성기를 사용한 후 '등급형 해당없음 항목 추가' 이슈를 모조리 생성한 후 편해서 피드백 드립니다. :+1\n앞으로도 이렇게 저희를 편하게 해주시면 너무 감사합니다ㅋㅋ\n입사하자마자 불편함 느끼시고 평일 저녁, 주말에 틈틈히 진행해주셔서 덕분에 4월 이슈 생성은 편하게 진행했네요\n감사합니다!",
    ],
  },
  {
    type: "note",
    id: "feedback-ai",
    kind: "AI 활용 및 기술 공유",
    image: "feedback-ai",
    date: "26.02.26",
    paragraphs: [
      "윤기님 안녕하세요!",
      "최근 AI 관련해서 공부 하시는 모습 보면서 많이 자극 받고 있습니다.\n같은 팀이 아니었다면 몰랐을 수도 있는데 같은 팀이 되어서 일하고보니 윤기님은 배울점이 많은 동료고, 개발자인 것 같아요.\n회사에서 일을 진행하면서도 평소 공부하고 관심있어 하던 AI를 어떻게 활용할지 고민하고 고민한 내용을 팀에 공유해주실 때 마다 감사드립니다! :)\n그래서 지금 AX팀에도 들어가 더 적극적으로 임하는 모습을 보니 저도 얼릉 AX팀에서 준비한 강의 들으며 열심히 따라가야겠다는 생각이 들어요.\n궁금한 거 있으면 윤기님께 많이 여쭤보고 조언을 얻어가며 같이 으쌰으쌰 해봐요!",
    ],
  },
  {
    type: "note",
    id: "feedback-culture",
    kind: "문제 인식과 팀 분위기",
    image: "feedback-culture",
    date: "26.06.01",
    paragraphs: [
      "일을 하다보면 적응이 되고 익숙해져서 불편함을 못 느끼고 기계적으로 하는 경우가 있는데 윤기님이 개선해야할 점이 보이거나 불편한 점들이 발견되면 주저하지 않고 말씀해주셔서 좋았어요.\n다만, 회사다보니까 그 모든 것을 다 적용하거나 바꾸기에 어려움이 있지만, 문제를 인식하고, 또 그걸 공유하는 분이 계셔야 바뀌는 것도 있다고 생각하거든요.",
      "또, 스크럼 때 윤기님이 TMI 라며 들고온 일상 이야기들, 그리고 플레이샵 때 손수 만들어온 카레와 귀여운 프로 동행까지,,,!\n저도 노력하긴 하지만 아직 팀 모임을 할 때 부족한 부분들이 많은데, 윤기님 덕분에 회의나 모임을 즐거운 분위기 속에서 이끌어가거나 편하게 진행할 수 있었던 것 같아요. 감사해요!",
    ],
  },
  {
    type: "review",
    id: "feedback-qa",
    kind: "사전 이슈 예방 및 자체 QA (다면 평가)",
    image: "feedback-qa",
    question:
      "프로젝트 진행과정에서 생기는 모든사항을 잘 공유(진행과정, 문제상황, 수정사항 등)하여, 발생할수있는 이슈를 사전에 예방하는데 기여 하였는가?",
    score: "5. 매우 그렇다",
    comments: [
      "TC를 이용한 ai 테스트 툴을 자체 구현해서 실험적으로 사용하였고, QA 진행중에 발생할 수 있는 이슈들을 사전에 많이 잡아서, 전반적으로 QA시간 단축에 기여했음",
      "이번에 클라 이슈가 하나도 안나온거로 알고있는데 자체 QA 꼼꼼하게 봐주셔서 너무 좋았습니다! 고생하셨어요 👍",
      "싱크 미팅이 늦어지면서 스펙이 누락되지 않고 잘 진행되고 있는지 중간에 여러번 확인 요청을 드렸었는데, 꼼꼼하게 잘 챙겨주셔서 감사했습니다. 디펜던시가 많은 피쳐라 중간에 다른 피쳐의 영향을 받았었는데, 마지막까지 명확하게 싱크해 주셔서 이슈없이 잘 마무리할 수 있었던 것 같아요. 이번 피쳐도 고생 많으셨습니다!",
    ],
  },
  {
    type: "review",
    id: "feedback-comm",
    kind: "타 직군과의 협업 소통 (다면 평가)",
    image: "feedback-comm",
    question:
      "이번 프로젝트 진행 시 협업함에 있어 본인 직무의 내용을 잘 이해 할 수 있게 설명하였고, 상대방에게 질문 시 필요한 부분을 잘 정리하여 질문하였는가?",
    score: "5. 매우 그렇다",
    comments: [
      "프로젝트를 진행하면서 필요한 개선사항들을 본인 직무의 상황과 함께 잘 설명해주셔서 싱크를 맞추고 개선, 변경해나감에 있어서 편하게 진행 가능하도록 질문해주셨습니다!",
      "허들을 통해서든, 텍스트를 통해서든 깔끔하게 소통하시는 팀원이라고 생각했습니다.\n저도 윤기님 소통 방식 보면서 배운점이 많았습니다.\n앞으로도 잘 부탁드립니다.",
    ],
  },
  {
    type: "review",
    id: "feedback-code",
    kind: "코드 리뷰 (다면 평가)",
    image: "feedback-code",
    question: "코드 리뷰를 잘해주었는가?",
    score: "5. 매우 그렇다",
    comments: [
      "코드 리뷰를 통해 받은 피드백으로 가능한 만큼 리팩터링을 거칠 수 있어서 코드 퀄리티가 더 좋아졌다고 느꼈고, 꼼꼼히 봐주신다고 생각이 들어서 도움이 많이 되었습니다!",
      "코드 리뷰를 하실 때 단순히 “코드 컨벤션을 잘 지켰는가?”에 그치지 않고, PR에 연결된 이슈나 테크닥까지 꼼꼼히 살펴봐 주신 덕분에 사전에 발생할 수 있었던 이슈를 미리 잡을 수 있었습니다.\n\n큰 도움이 되었고, 앞으로도 많이 배울 수 있을 것 같아요. 감사합니다!",
    ],
  },
];

export function imageOf(name: ImageName): ImageEntry {
  return images[name];
}
