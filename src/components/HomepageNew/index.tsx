import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { navbarData } from "@/data/navbar";
import { homeData } from "@/data/home";

const ecosystemItems = [
  {
    title: "Cricket",
    description:
      "Indoor nets, coaching, tracking, and skill work in one focused training space.",
    image: "/images/homec/card4-1.svg",
    href: "/cricket",
  },
  {
    title: "Fitness",
    description:
      "Strength, conditioning, and performance training built around real goals.",
    image: "/images/homec/card4-2.webp",
    href: "/fitness",
  },
  {
    title: "Recovery",
    description:
      "Cold plunge, sauna, compression, percussion, and physio support.",
    image: "/images/homec/card4-3.webp",
    imageClassName: "object-[65%_center]",
    href: "/recovery",
  },
  {
    title: "Running",
    description:
      "Pace, agility, and endurance sessions for athletes and everyday movers.",
    image: "/images/homec/card4-4.webp",
    href: "/running",
  },
];

const trainingItems = [
  {
    title: "Group Classes",
    image: "/images/homec/card3-1.webp",
    href: "/group-classes",
  },
  {
    title: "Pilates",
    image: "/images/homec/card3-2.webp",
    href: "/pilates",
  },
  {
    title: "Personal Training",
    image: "/images/homec/card3-3.webp",
    href: "/personal-training",
  },
];

const HomepageNew = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Navbar data={navbarData} isMobile={isMobile} overlayOnTop />

      <section className="relative min-h-screen overflow-hidden">
        <Image
          src={
            isMobile
              ? "/images/hero/home-shubhman-preity-mobile.svg"
              : "/images/hero/home-shubhman-preity.svg"
          }
          alt="Drive FITT club"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,13,13,0.86)_0%,rgba(13,13,13,0.68)_34%,rgba(13,13,13,0.18)_62%,rgba(13,13,13,0)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.02)_0%,rgba(13,13,13,0.04)_56%,rgba(13,13,13,0.88)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[220px] bg-[linear-gradient(180deg,rgba(13,13,13,0.72)_0%,rgba(13,13,13,0)_100%)] md:h-[280px]" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-[1280px] flex-col justify-center gap-8 px-6 pb-8 pt-28 md:px-10 md:pb-12 lg:px-12">
          <div className="max-w-[660px]">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#00DBDC]/40 bg-[#00DBDC]/10 px-5 py-2.5">
              <span className="text-xs font-semibold uppercase leading-4 tracking-[0.18em] text-[#00DBDC]">
                GURUGRAM FLAGSHIP CLUB NOW OPEN
              </span>
            </div>
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[0px] md:text-[64px] lg:text-[72px]">
              India&apos;s First Cricket and Fitness Club
            </h1>
            <p className="mt-5 max-w-[560px] text-base font-light leading-6 text-[#E7E7E7] md:text-lg md:leading-7">
              designed for training, play, recovery, and the everyday rhythm of
              a high-performance life.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="flex h-12 items-center justify-center rounded-lg bg-[#00DBDC] px-6 text-base font-medium text-[#0D0D0D] transition-colors hover:bg-[#00DBDC]/90 md:h-14 md:px-8"
            >
              Talk to Us
            </Link>
            <Link
              href="/membership"
              className="flex h-12 items-center justify-center rounded-lg border border-white/30 px-6 text-base font-medium text-white transition-colors hover:border-[#00DBDC] hover:text-[#00DBDC] md:h-14 md:px-8"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase leading-4 tracking-[0.18em] text-[#00DBDC]">
                The club ecosystem
              </p>
              <h2 className="mt-3 max-w-[660px] text-3xl font-semibold leading-tight md:text-5xl">
                Everything you need to move better, in one place.
              </h2>
            </div>
            <p className="max-w-[430px] text-sm font-light leading-6 text-[#A7A7A7] md:text-base">
              Fewer decisions. Better sessions. Step in for cricket, fitness,
              recovery, and community without bouncing between formats.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative min-h-[360px] overflow-hidden rounded-[20px] border border-white/10 bg-[#161616] md:min-h-[420px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    item.imageClassName || ""
                  }`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.08)_0%,rgba(13,13,13,0.82)_78%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="text-2xl font-semibold leading-7">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-5 text-[#D6D6D6]">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-10 md:pb-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-[600px] text-3xl font-semibold leading-tight md:text-5xl">
              Choose the way you train today, on your terms.
            </h2>
            <Link
              href="/contact-us"
              className="text-base font-medium leading-6 text-[#00DBDC] transition-colors hover:text-[#0BFFB6]"
            >
              Ask about availability
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {trainingItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative min-h-[280px] overflow-hidden rounded-[20px] border border-white/10 bg-[#171717] md:min-h-[420px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.05)_0%,rgba(13,13,13,0.78)_100%)]" />
                <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-semibold leading-7">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-10 md:pb-20 lg:px-12">
        <div className="mx-auto max-w-[1080px]">
          <div className="mx-auto mb-8 max-w-[720px] text-center md:mb-10">
            <p className="text-xs font-medium uppercase leading-4 tracking-[0.18em] text-[#00DBDC]">
              Club philosophy
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {homeData.ecosystemGifSection?.title ||
                "The Drive FITT Sports Club Philosophy"}
            </h2>
            <p className="mt-4 text-sm font-light leading-6 text-[#A7A7A7] md:text-base">
              {homeData.ecosystemGifSection?.description ||
                "The Drive FITT Model: Engineered for Excellence"}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[20px]">
            <Image
              src="/images/ecosystem4.gif"
              alt="Drive FITT sports club philosophy"
              width={1060}
              height={596}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {homeData.footerSection && (
        <Footer data={homeData.footerSection} isMobile={isMobile} />
      )}
    </main>
  );
};

export default HomepageNew;
