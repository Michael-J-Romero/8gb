import AnimatedLogoHome from "@/components/AnimatedLogoHome";
import React from "react";
import { EnvelopeClosedIcon, CameraIcon, ChatBubbleIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

export default function ProfileAside({ logoHue }: { logoHue: number }) {
  return (
    <aside className="
    
    flex flex-col items-center justify-center
     
    " style={{ background: "" }}>
        <AnimatedLogoHome hue={logoHue} width={300} />
        <div style={{ background: "",width: '100%', }}>
          <div style={{
            filter:'invert(1)',
            background: "url('https://seeklogo.com/images/M/music-player-logo-2AC66544B9-seeklogo.com.png')",
            width: '100%',
            height: 70,
            backgroundSize: "cover",
          }}  
            // alt="music player"
            
          />
        </div>
        <Contact/>
        <EventsSection/>
    </aside>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fakeEvents = [
  {
    id: 1,
    title: "Donation Dropoff",
    date: "2025-08-05",
    location: "Local Community Center",
    description: "Bring your old tech, controllers, microchips, or retro electronics to donate. ",
    link: "#"
  },
  {
    id: 2,
    title: "New Product Drop Date",
    date: "2025-08-15",
    location: "glitchcore.studio/shop",
    description: "Discover our latest collection—one-of-a-kind, resin-covered creations featuring retro tech and rare finds. Available for a limited time!",
    link: "#"
  },
  {
    id: 3,
    title: "Event Title",
    date: "TBA",
    location: "This Page",
    description: "Event details and info will appear here when new events are announced.",
    link: "#"
  }
];

function EventsSection() {
  return (
    <div className="w-full mt-6 green-glow darkbg">
      <div className="w-full green-glow-bottom
      text-green-200 text-left text-md   pl-4 py-1 mb-1 uppercase tracking-wide border-b-2 border-green-400 shadow-md flex items-center gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block text-green-400"><path d="M7 2v2M17 2v2M3 7h18M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6M9 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Upcoming Events
      </div>
      <ul className="w-full p-2">
        {fakeEvents.map(event => (
          <li
            key={event.id}
            className="border-b border-green-500 last:border-b-0 py-4 flex flex-col gap-2 transition-all duration-200 hover:bg-green-400/10 hover:cursor-pointer"
          >
            <div>
              <div className="font-semibold text-green-100 text-base mb-1">{event.title}</div>
              <div className="text-xs text-green-700 mb-1 text-type1">{event.date} &bull; {event.location}</div>
              <div className="text-sm text-green-200/80 mb-2">{event.description}</div>
            </div>
            {/* <div className="flex justify-center">
              <a href={event.link} target="_blank" rel="noopener">
                <Button variant="outline" className="border-green-500 text-green-300 hover:bg-green-900/30 px-4 py-1 text-sm w-full max-w-xs">
                  Details
                </Button>
              </a>
            </div> */}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-2">
        <Button variant="outline" className="border-green-500 text-green-300 hover:bg-green-900/30 px-5 py-1 text-sm w-full max-w-xs">
          View All
        </Button>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="w-full mt-6 green-glow darkbg">
      <div className="w-full green-glow-bottom
      text-green-200 text-left text-md   
      pl-4 py-1 mb-1
      uppercase tracking-wide 
      border-b-2 border-green-400 shadow-md">
        Contact 8 Gigabyte

      </div>
      <div className="grid grid-cols-2 gap-4 w-full p-2">
        <a href="mailto:youremail@example.com" className="flex items-center gap-2 p-2 text-type1 hover:underline transition cursor-pointer">
          <EnvelopeClosedIcon className="w-5 h-5" />
          <span>Email</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener" className="flex items-center gap-2 p-2 text-type1 hover:underline transition cursor-pointer">
          <CameraIcon className="w-5 h-5" />
          <span>Instagram</span>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener" className="flex items-center gap-2 p-2 text-type1 hover:underline transition cursor-pointer">
          <ChatBubbleIcon className="w-5 h-5" />
          <span>Twitter</span>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener" className="flex items-center gap-2 p-2 text-type1 hover:underline transition cursor-pointer">
          {/* Replace with a Facebook icon from shadcn/ui or Radix if available, else fallback to a simple svg */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          <span>Facebook</span>
        </a>
      </div>
    </div>
  );
}

