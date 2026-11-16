# yoonkeee.github.io

김윤기의 프론트엔드 개발자 이력서와 포트폴리오입니다. https://yoonkeee.github.io/

| 주소 | 내용 |
|---|---|
| `/` | 소개와 이력서 / 포트폴리오 선택 |
| `/resume/` | 이력서 |
| `/pf/` | 포트폴리오 |

Next.js(App Router) 정적 내보내기, TypeScript, CSS Modules로 만들었습니다. 런타임 의존성은 `next`, `react`, `react-dom`뿐입니다.

## 실행

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # out/ 에 배포할 파일 생성
npm run typecheck
```

`dev`와 `build`는 먼저 `npm run fonts`를 돌려 `src/`에 쓰인 글자만 담은 Pretendard 가변 글꼴(`public/fonts/pretendard-subset.woff2`)을 만듭니다.

`main`에 push하면 `.github/workflows/deploy.yml`이 빌드해서 `out/`을 GitHub Pages에 배포합니다.

## 구조

| 경로 | 내용 |
|---|---|
| `src/app/page.tsx`, `src/app/resume/page.tsx`, `src/app/pf/page.tsx` | 선택 화면, 이력서, 포트폴리오 |
| `src/data/portfolio.ts` | 프로필, 프로젝트, 피드백 문구 (포트폴리오 PDF 원문) |
| `src/data/resume.ts` | 경력, 개인 프로젝트, 기술, 활동, 학력 문구 (이력서 PDF 원문) |
| `src/data/images.json` | 이미지 크기 목록 (`npm run images`가 생성) |
| `src/data/site.ts` | 페이지 주소와 페이지별 메타데이터 |
| `src/components/Stage.tsx` | 프로젝트 설명부, 이미지 설명부, 이미지의 2열 틀. 스크롤 단계마다 이미지 설명부와 이미지가 바뀌는 고정 무대 |
| `src/components/ShotGroup.tsx` | 캡처 프레임 (화면, 구조도, 휴대폰, 작은 캡처) |
| `src/components/Lightbox.tsx` | `<dialog>` 기반 확대 보기 |
| `src/app/globals.css` | 디자인 토큰 |
| `scripts/optimize-images.ts` | 원본 이미지를 webp로 변환 |
| `scripts/subset-font.mjs` | 페이지에 쓰는 글자만 추린 글꼴 생성 (빌드 전 자동 실행) |
| `DESIGN.md` | 색, 글자, 배치, 움직임 기준 |

## 읽는 축

1024px 이상에서는 페이지 전체가 같은 두 열(글 5 : 그림 6)을 씁니다. 그림이 있는 프로젝트는 제목, 본문, 캡션, 진행 표시를 모두 왼쪽 열에 두고 오른쪽 열에는 그림만 둡니다. 그림이 없는 01은 오른쪽 열에 지표와 본문을 둡니다. 첫 화면은 한 열이고 소개 문단은 한 줄에 한 문장씩 둡니다.

## 스크롤 무대

이미지가 있는 프로젝트는 1024px 이상에서 왼쪽에 설명부와 이미지 설명부(진행 표시, 캡션), 오른쪽에 이미지를 두는 같은 2열 틀을 씁니다. 이미지가 여러 장이면 이 틀을 화면에 고정하고, 스크롤 진행률로 이미지 설명부와 이미지만 바꿉니다. 설명부는 그대로 있습니다.

내용이 고정 영역에 다 들어가는지는 `Stage`가 직접 잽니다. 낮거나 좁은 화면, 브라우저 확대로 내용이 넘치면 고정을 풀고 같은 2열 틀로 단계를 아래로 쌓습니다. 모바일이거나 스크립트가 꺼져 있으면 같은 내용이 글 다음에 캡처가 오는 순서로 쌓입니다. `prefers-reduced-motion`이 켜져 있으면 이동 없이 투명도만 바뀝니다. 자세한 규칙은 `DESIGN.md` 4장에 있습니다.

## 이미지 다시 만들기

```sh
bun scripts/optimize-images.ts <원본 이미지 폴더>
```

스크립트 안의 `PUBLISHED` 목록에 있는 파일만 `public/images/`로 변환합니다.
