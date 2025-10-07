"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";
import { LuChevronRight, LuLoader } from "react-icons/lu";
import { resolve } from "path";

export type PurchaseButtonProps = SliceComponentProps<Content.PurchaseButtonSlice>;

const PurchaseButton: FC<PurchaseButtonProps> = ({ slice }) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePurchaseClick = async () => {
    setIsPressed(true)
    //add checkout logic later
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsPressed(false)
  }
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn className="relative mx-auto max-w-7xl px-4 text-center" targetChildren>
        <p className="mb-6 text-xl font-medium text-gray-700 md:text-2xl">
          {slice.primary.eyebrow}
        </p>
        <h2 className="font-bold-slanted mb-8 scroll-pt-6 text-5xl text-gray-900 uppercase md:text-7xl lg:text-8xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
       <button
       onClick={handlePurchaseClick}
       disabled={isPressed}
  className={clsx(
    "group relative mx-auto overflow-hidden rounded-full border-4 border-gray-900 bg-linear-to-r/oklch from-sky-300 to-sky-600 px-6 py-4 md:px-12 md:py-8",
    "hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30",
    "active:scale-95",
    isPressed? "scale-95 cursor-not-allowed opacity-80" : 
    "cursor-pointer transition-all duration-300"
  )}
>

  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent ease-out group-hover:translate-x-full motion-safe:transition-transform motion-safe:duration-1000" />
    <div className="relative z-10 flex items-center justify-center gap-6 md:gap-8">
      <span className="font-black-slanted text-4xl tracking-wide text-gray-900 uppercase group-hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300 md:text-7xl lg:text-9xl">
        { isPressed? (
          <span>
            <LuLoader />
            Loading...
          </span>
        ) :
        
        (slice.primary.button_text)}
      </span>
      {!isPressed && (
      <div className="hidden group-hover:translate-x-2 group-hover:scale-125 motion-safe:transition-all motion-safe:duration-300 md:block">
        <LuChevronRight className="size-12 text-gray-900 md:size-16" />
      </div>
      )}
  </div>
</button>
  <div className="mt-12 space-y-3 text-base text-gray-600 md:text-lg">
        <PrismicRichText field={slice.primary.body} />
        </div>
      </FadeIn>
    </Bounded>
  );
};

export default PurchaseButton;
