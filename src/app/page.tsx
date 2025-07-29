"use client";

import AnimatedGridBackground from "@/components/animated-grid-background";
import { useState } from "react";
import HomeLayout from "./components/home/HomeLayout";
import ProfileAside from "./components/home/ProfileAside";
import ShopSection from "./components/home/ShopSection";

import SectionCards from "./components/home/SectionCards";
import GlobalStyles from "./components/home/GlobalStyles";
import { Microchip } from "@/components/ui/microchip";

export default function Home() {
  const [logoHue, setLogoHue] = useState(0);

  return (
    <>
      <AnimatedGridBackground />
      <HomeLayout>
        <div className="
        w-full 
        max-w-5xl 
        flex 
        flex-col 
        md:flex-row 
        gap-8
        ">
          {/* Left: Profile/Bio/Links */}
          <Box1>
          <ProfileAside logoHue={logoHue} />
          </Box1>
          
          {/* Right: Shop and text */}
          <Box2>
            <ShopSection />
        {/* <Section3 /> */}
          </Box2>
          
        </div>
        {/* Section cards below */}
        {/* <SectionCards /> */}

      </HomeLayout>
      <GlobalStyles />
      {/* Google Fonts for retro style */}
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
    </>
  );
}

import { ReactNode } from "react";
const Box1 = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{
      // background: "green"
    }} >
      {children}
    </div>
  );
};
const Box2 = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{
      // background: "yellow"
    }}>
      {children}
    </div>
  );
};



function Section3() {
  const items = [
    {
      title: "Retro Controllers",
      img: "/products/1b.png",
      text: "Classic gamepads reimagined as art and tech relics.",
    },
    {
      title: "Circuit Art",
      img: "/products/4b.png",
      text: "Handcrafted pieces from vintage circuit boards.",
    },
    {
      title: "Custom Orders",
      img: "/products/2b.png",
      text: "Send in your own hardware for a unique creation!",
    },
  ];
  return (
    <div className="w-full max-w-5xl flex flex-col items-center mb-12">
      <div className="text-2xl text-green-300 sparkle-text font-semibold mb-6">Featured Collections</div>
      <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
        {items.map((item, i) => (
          <Microchip key={i} darkness={0.4} className="flex-1 min-w-[220px] max-w-xs flex flex-col items-center p-4 gap-3 text-green-200">
            <span className="text-xl text-green-300 font-bold sparkle-text mb-2">{item.title}</span>
            <img src={item.img} alt={item.title} className="rounded-lg w-32 h-32 object-cover border border-green-700 bg-black" />
            <span className="text-sm text-green-200 haze text-center">{item.text}</span>
          </Microchip>
        ))}
      </div>
    </div>
  );
}