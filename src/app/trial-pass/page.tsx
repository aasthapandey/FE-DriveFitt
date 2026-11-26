import type { Metadata } from "next";
import Image from "next/image";
import { headers } from "next/headers";
import Navbar from "@/components/common/Navbar";
import TrialPassForm from "@/components/TrialPass/TrialPassForm";
import { formatTrialPrice, getTrialDateWindow } from "@/config/trialPass";
import { getTrialPassOffer } from "@/lib/trialPassOffer";
import { navbarData } from "@/data/navbar";
import { isMobileDevice } from "@/utils/deviceDetection";

export const metadata: Metadata = {
  title: "Book a Trial Pass | Drive FITT Gurugram",
  description: "Book a one-day trial pass at the Drive FITT flagship club in Gurugram.",
};

export default async function TrialPassPage() {
  const isMobile = isMobileDevice(headers().get("user-agent") || "");
  const { today, yesterday, last } = getTrialDateWindow();
  const offer = await getTrialPassOffer();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Navbar data={navbarData} isMobile={isMobile} />
      <main className="mx-auto grid max-w-[1320px] gap-8 px-5 pb-16 pt-4 sm:px-8 lg:grid-cols-[2fr_3fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-10">
        <section className="relative isolate flex min-h-[290px] flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-9 lg:min-h-[560px]">
          <Image
            src="/images/homec/full-gallery-1.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/25 to-black" />
          <p className="text-sm font-semibold text-[#00DBDC]">Drive FITT flagship club</p>
          <div>
            <p className="max-w-sm text-base text-white/85">
              Spend a day at Drive FITT and experience our cricket, fitness and recovery club in Gurugram.
            </p>
            {offer && (
              <p className="mt-5 text-3xl font-semibold text-[#00DBDC]">
                One-day trial pass only at {formatTrialPrice(offer.amountPaise)}/-
              </p>
            )}
            <p className="mt-3 text-sm text-white/85">M3M 65th Avenue, Sector 65, Gurugram</p>
          </div>
        </section>
        <TrialPassForm
          latestBirthDate={yesterday}
          firstDate={today}
          lastDate={last}
          offer={offer}
        />
      </main>
    </div>
  );
}
