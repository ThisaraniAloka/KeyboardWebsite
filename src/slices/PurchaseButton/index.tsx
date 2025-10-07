"use client";
import React, { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";
import { LuChevronRight, LuLoader } from "react-icons/lu";
import { resolve } from "path";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { checkout } from "@/checkout";

gsap.registerPlugin(useGSAP)

export type PurchaseButtonProps = SliceComponentProps<Content.PurchaseButtonSlice>;

const PurchaseButton: FC<PurchaseButtonProps> = ({ slice }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const handlePurchaseClick = async () => {
    setIsPressed(true)
    //add checkout logic later
    await checkout()
    setIsPressed(false)
  };
  useGSAP(() => {
    if (!buttonRef.current || !textRef.current) return;
    const handleMouseMove = (event: MouseEvent) => {
      if (!buttonRef.current || !textRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = event.clientX - buttonRect.left;
      const buttonWidth = buttonRect.width;
      const normalizedX = Math.max(0, Math.min(1, mouseX / buttonWidth));
      const newWdth = 120 - normalizedX * 70;
      const newWght = 700 + normalizedX * 300;
      gsap.to(textRef.current, {
        "--wdth": newWdth,
        "--wght": newWght,
        duration: .3,
        ease: "power2.out"
      });  
    };
    const handleMouseLeave = () => {
      if (!textRef.current) return
      gsap.to(textRef.current, {
         "--wdth": 85,
        "--wght": 850,
        duration: .5,
        ease: "power2.out"
      })
    }
    buttonRef.current?.addEventListener("mousemove", handleMouseMove);
    buttonRef.current?.addEventListener("mouseleave", handleMouseLeave)
    gsap.set(textRef.current, {
      "--wdth": 85,
      "--wght": 850,
    })
    return () => {
      if(buttonRef.current) {
        buttonRef.current?.removeEventListener("mousemove", handleMouseMove);
        buttonRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
  })
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
       ref={buttonRef}
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
      <span
      ref={textRef}
      style={{"--wdth":85, "--wght": 850 } as React.CSSProperties}
      className="font-black-slanted text-4xl tracking-wide text-gray-900 uppercase group-hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300 md:text-7xl lg:text-9xl">
        { isPressed? (
          <span
          
          
          className="flex items-center gap-4 md:gap-6">
            <LuLoader className="size-12 animate-spin text-gray-900 md:size-16 " />
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
