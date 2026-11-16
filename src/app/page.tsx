import { Hero } from "@/components/Hero";
import { PageChoice } from "@/components/PageChoice";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/data/portfolio";
import { resumeSections } from "@/data/resume";
import { pageMetadata, ROUTES } from "@/data/site";

export const metadata = pageMetadata(profile.name, ROUTES.home);

const PAGES = [
  { href: ROUTES.resume, title: "이력서", contents: resumeSections.map((section) => section.title) },
  { href: ROUTES.portfolio, title: "포트폴리오", contents: ["포트폴리오", "동료 피드백"] },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main">
        <Hero>
          <PageChoice pages={PAGES} />
        </Hero>
      </main>
    </>
  );
}
