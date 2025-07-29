import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { Microchip } from "@/components/ui/microchip";
import Link from "next/link";
const imgs = [
  "/products/z1.png",
  "/products/z6.png",
  "/products/6d2.png",
  "/products/z8.png",

  "/products/z5.png",
  "/products/z2.png",
  "/products/z3.png",
  "/products/z4.png",
  
  
  "/products/z7.png",


  "/products/1d.png",
  "/products/3d.png",
  "/products/2b.png",
  
  // "/products/5d.png",
  
  "/products/1b.png",
  "/products/8b.png",
  "/products/2d.png",
  "/products/7b.png",
  "/products/4d.png",
  // "/products/3b.png",

  "/products/4b.png",
  "/products/4b.png",
  "/products/6b.png",
  
  "/products/5b.png",
  "/products/7d.png",
  "/products/1b.png",

  
  
  // "/products/1.jpg",
  
  // "/products/4.jpg",
  // "/products/3.jpg",

    "/products/5b.png",
  "/products/6b.png",
  "/products/7b.png",
  "/products/2b.png",

  "/products/9b.png",
  
  "/products/6.webp",
  "/products/7.webp",
  "/products/5.jfif",
  "/products/2.jpg",
  "/products/1b.jfif",
  "/products/2b.jfif",
  "/products/3b.jfif",
  "/products/4b.jfif",
  "/products/5b.jfif",
  "/products/6b.jfif",
  "/products/7b.jfif",
  "/products/9b.jfif",
  "/products/8b.jfif",
  "https://discount-drugmart.com/wp-content/uploads/2024/05/View-All.png",
  "https://winternetweb.com/wp-content/uploads/2024/09/IMG_4223-scaled.jpeg",

]
let k8gb=`  ______   __________________ 
 /  __  \ /  _____/\______   \
 >      </   \  ___ |    |  _/
/   --   \    \_\  \|    |   \
\______  /\______  /|______  /
       \/        \/        \/ `
export default function ShopSection() {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-start" style={{ background: "none" }}>
      <div className="green-glow
      w-full 
      flex items-center justify-center 
      text-xl  text-green-300 
      mb-2 p-6
      uppercase 
      text-type2
      ">
        8 gigabyte is in your extended network
      </div>
      <TomText title="Analog Afterlife" body={`
        One-of-a-kind pieces crafted from vintage tech and hardware. 
        Send in your dead controllers, busted chips, or other listed parts for discounts and exclusive gear!
        `} />
      <Shop />
      {/* <Section2 /> */}
      <Section3 />
      {/* <TomText title="whatever the FUCK!!!" body={lorumIpsum(10)} /> */}
    </div>
  );
}
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

function Section3() {
  // State to control delayed appearance of action buttons
  const [showActions, setShowActions] = useState(false);
  // Steps for the prompt, each with text and optional user input
  const steps = [
    {
      type: "cmd",
      text: <><span className="text-green-400">C:\8GB&gt;</span> <span className="text-green-200">run vintage_tech --mode=afterlife</span></>,
      chunk: "run vintage_tech --mode=afterlife",
      prefix: <span className="text-green-400">C:\8GB&gt; </span>,
      delay: 400,
      typing: true, // user input
    },
    {
      type: "info",
      text: <><span className="text-purple-400">[OK]</span> <span className="text-green-200">Initializing hardware restoration procedure...</span></>,
      chunk: "[OK] Initializing hardware restoration procedure...",
      prefix: null,
      delay: 500,
      typing: false, // system message
    },
    {
      type: "ok-system",
      text: <><span className="text-purple-400">[WARNING]</span><span className="text-green-200"> Legacy chips detected. Continue?</span></>,
      chunk: "[WARNING] Legacy chips detected. Continue?",
      prefix: null,
      delay: 400, // increased delay after this step
      typing: false, // system message
    },
    {
      type: "ok-user",
      text:<> <span className="text-green-400">C:\8GB&gt;</span> <span className="text-green-200"></span><span className="text-green-200"> yes</span></>,
      chunk: " yes",
      prefix: <span className="text-green-400">C:\8GB&gt; </span>,
      delay: 650,
      typing: true, // user input
      slow: true, // custom property to indicate slower typing
    },
    {
      type: "success",
      text: <><span className="text-purple-400">[SUCCESS]</span> <span className="text-green-200">Welcome to the Analog Afterlife. Select an option to continue:</span></>,
      chunk: "[SUCCESS] Welcome to the Analog Afterlife. Select an option to continue:",
      prefix: null,
      delay: 300,
      typing: false, // system message
    },
    {
      type: "actions",
      text: null,
      chunk: null,
      prefix: null,
      delay: 0,
      typing: false,
    },
    // Final step: type 'test complete' as a system message, no prefix, no [info]
//         {
//           type: "test-complete",
//           text: (
//             <pre className="text-green-200" style={{fontFamily: 'inherit', margin: 0, padding: 0, lineHeight: 1.1}}>{`
//   ______   __________________ 
//  /  __  \\ /  _____/\\______   \\
//  >      </   \\  ___ |    |  _/
//  /   --   \\    \\_\\  \\|    |   \\
//  \\______  /\\______  /|______  /
//         \\/        \\/        \\/ `}</pre>
//           ),
//           chunk: `  ______   __________________ \n /  __  \\ /  _____/\\______   \\\n >      </   \\  ___ |    |  _/\n/   --   \\    \\_\\  \\|    |   \\\n\\______  /\\______  /|______  /\n       \\/        \\/        \\/ `,
//           prefix: null,
//           delay: 700,
//           typing: true,
//         },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [typedChunks, setTypedChunks] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  // Track if the inline prompt is actually visible (first char typed for a prefix step)
  const [inlinePromptVisible, setInlinePromptVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    if (!inView) return;
    if (currentStep >= steps.length) return;
    const step = steps[currentStep];
    setInlinePromptVisible(false); // Reset for each step
    if (!step.typing) {
      setTypedChunks((prev) => [...prev, step.chunk || ""]);
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
      }, step.delay);
      return;
    }
    // Special case: add delay before typing 'yes'
    const startTyping = () => {
      setTyping(true);
      setTypedText("");
      let i = 0;
      const chunk = step.chunk || "";
      let groupSize = 1;
      if (chunk.startsWith("[")) groupSize = 2;
      if (chunk.includes("...")) groupSize = 3;
      if (chunk.includes("run ")) groupSize = 2;
      if (step.slow) groupSize = 1;
      function typeNext() {
        if (i < chunk.length) {
          let next = chunk.slice(i, i + groupSize);
          setTypedText((prev) => {
            // Mark inline prompt visible as soon as first char is typed for a prefix step
            if (!inlinePromptVisible && step.prefix && prev.length === 0 && next.length > 0) {
              setInlinePromptVisible(true);
            }
            return prev + next;
          });
          i += groupSize;
          let pause = 30 + Math.random() * 40;
          if (step.slow) pause = 220 + Math.random() * 160;
          if (next.includes("...")) pause = 1200;
          if (next.includes("[")) pause = 620;
          // For the ASCII art step, do NOT slow down for spaces
          if (step.type === "test-complete") pause = 12 + Math.random() * 10;
          setTimeout(typeNext, pause);
        } else {
          setTimeout(() => {
            setTypedChunks((prev) => [...prev, chunk]);
            setTyping(false);
            setCurrentStep((s) => s + 1);
          }, step.delay);
        }
      }
      setTimeout(typeNext, 400);
    };
    if (step.type === "ok-user" && steps[currentStep - 1]?.delay) {
      setTimeout(startTyping, steps[currentStep - 1].delay);
    } else {
      startTyping();
    }
    // eslint-disable-next-line
  }, [currentStep, inView]);

  // Show action buttons after a delay when last step is reached
  useEffect(() => {
    if (currentStep >= steps.length - 1 && !typing) {
      setShowActions(false);
      const timeout = setTimeout(() => setShowActions(true), 700);
      return () => clearTimeout(timeout);
    } else {
      setShowActions(false);
    }
  }, [currentStep, typing, steps.length]);

  // Render logic for each step
  function renderStep(idx: number, step: any, typed: string) {
    if (step.type === "actions") {
      return null; // Remove duplicate buttons, only show via showActions
    }
    if (typed.length === 0 && step.typing) return null;
    // For steps with a prompt prefix (including user input), show blinking cursor inline if currently typing this step
    if (step.prefix) {
      return (
        <div className="mb-2 flex items-center gap-2">
          {step.prefix}
          <span className="text-green-200">{typed}</span>
          {typing && currentStep === idx && (
            <span
              className="inline-block align-middle"
              style={{
                width: '10px',
                height: '18px',
                background: '#22c55e',
                marginLeft: '2px',
                animation: 'blink-cursor 1.1s steps(1) infinite',
                opacity: 1,
              }}
            />
          )}
        </div>
      );
    }
    // For ok-system step
    if (step.type === "ok-system") {
      return (
        <div className="mb-2 flex items-center gap-2">
          <span className="text-purple-400">[WARNING]</span>
          <span className="text-green-200">Legacy chips detected. Continue?</span>
        </div>
      );
    }
    // For ok-user step (handled by prefix logic above)
    if (step.type === "ok-user") {
      return null;
    }
    // For the final test-complete step, show just the text, no prefix, no [info]
    if (step.type === "test-complete") {
        return (
            <div className="mb-2">
                <pre className="text-green-200" style={{fontFamily: 'inherit', margin: 0, padding: 0, lineHeight: 1.1}}>{typed}</pre>
            </div>
        );
    }
    // For other steps (system messages)
    if (!step.typing) {
      return (
        <div className="mb-2">{step.text}</div>
      );
    }
    // For other steps (user input)
    return (
      <div className="mb-2">
        <span className="text-green-200">{typed}</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative w-full max-w-3xl mt-2 mb-8 rounded-lg border border-green-400 bg-black/90 shadow-lg overflow-hidden"
      style={{ fontFamily: 'monospace', boxShadow: '0 0 24px 2px #22c55e44' }}
    >
      {/* Fake window bar */}
      <div className="flex items-center px-3 py-1 bg-green-900/60 border-b border-green-400">
        <span className="w-3 h-3 rounded-full bg-red-500 mr-2 border border-red-900 shadow-inner"></span>
        <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 border border-yellow-700 shadow-inner"></span>
        <span className="w-2 h-2 rounded-full bg-green-500 border border-green-900 shadow-inner"></span>
        <span className="ml-4 text-green-300 text-xs tracking-widest opacity-70">cmd.exe</span>
      </div>
      {/* Command prompt content */}
      <div className="p-5 text-green-300 text-[15px] min-h-[160px] bg-black font-mono">
        {steps.map((step, idx) => {
          if (idx < currentStep) {
            return <React.Fragment key={idx}>{renderStep(idx, step, step.chunk || "")}</React.Fragment>;
          } else if (idx === currentStep && typing) {
            return <React.Fragment key={idx}>{renderStep(idx, step, typedText)}</React.Fragment>;
          }
          return null;
        })}
        {/* Show buttons after all steps are done, with delay */}
        {showActions && (
          <div className="flex gap-4 my-3" style={{ transformOrigin: 'center' }}>
            <a
              href="#shop"
              className="px-4 py-1 rounded bg-green-700 hover:bg-green-600 text-black font-bold border border-green-400 transition-colors duration-150 cursor-pointer text-[15px] shadow-green-400/30 shadow-md animate-fade-in-btn"
              style={{ animationDelay: '0.05s', animationFillMode: 'backwards', transformOrigin: 'center' }}
            >
              Shop
            </a>
            <a
              href="#donate"
              className="px-4 py-1 rounded bg-green-700 hover:bg-green-600 text-black font-bold border border-green-400 transition-colors duration-150 cursor-pointer text-[15px] shadow-green-400/30 shadow-md animate-fade-in-btn"
              style={{ animationDelay: '0.18s', animationFillMode: 'backwards', transformOrigin: 'center' }}
            >
              Donate
            </a>
            <style>{`
              @keyframes fade-in-btn {
                0% {
                  opacity: 0;
                }
                100% {
                  opacity: 1;
                }
              }
              .animate-fade-in-btn {
                animation: fade-in-btn 0.6s cubic-bezier(0.6,0.2,0.2,1.1);
              }
            `}</style>
          </div>
        )}
        {/* Blinking cursor at bottom only if not typing, or if typing but the current step's inline prompt is not yet visible */}
        {(
          !typing || (typing && !(steps[currentStep]?.prefix && inlinePromptVisible))
        ) && (
          <div className="text-green-500    flex items-center">
            <span className="text-green-400">C:\8GB&gt;</span>
            <span className="text-green-200">&nbsp;</span>
            <span
              className="inline-block align-middle"
              style={{
                width: '10px',
                height: '18px',
                background: '#22c55e',
                marginLeft: '2px',
                animation: 'blink-cursor 1.1s steps(1) infinite',
                opacity: currentStep === steps.length ? 1 : 0.3,
              }}
            />
          </div>
        )}
        <style>{`
          @keyframes blink-cursor {
            0%, 60% { opacity: 1; }
            61%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

function lorumIpsum(length: number) {
  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
    "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
    "incididunt", "ut", "labore", "et", "dolore", "magna",
    "aliqua"
  ];
  let result = "";
  for (let i = 0; i < length; i++) {
    result += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return result.trim();
}
function Shop() {
  return ( <>
    {/* <div className="pl-8 sparkle-text font-semibold text-type1 text-2xl self-start  "> 
         Top 8gb - Featured Products
        </div> */}
    <div className="
      grid grid-cols-4 grid-rows-2 gap-4 
      w-full max-w-2xl 
    ">
      {Array.from({ length: 8 }).map((_, i) =>
        i === 73 ? (
          <div className="
            flex items-center justify-center 
            p-1 border border-dashed border-green-300
            text-green-500 text-lg uppercase text-type1
            font-bold
            cursor-pointer
            bg-black
            hover:bg-green-900/20
            transition-all duration-300
          ">
            view all
          </div>
        ) : (
          <Link href={`/product/${i}`} key={i} className="contents">
            <Card key={i} className="overflow-hidden flex items-center justify-center aspect-square">
              <div className="relative w-full h-full">
                <img
                  src="/products/metal6.png"
                  alt="metal background"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  draggable={false}
                />
                <img
                style={{ 
                  filter: "brightness(0.8) contrast(1.2)",
                 }}
                  src={imgs[i % imgs.length]}
                  alt={`Shop item ${i + 1}`}
                  className="relative z-10 object-cover w-full h-full cursor-pointer hover:scale-115 transition-transform duration-300"
                />
              </div>
            </Card>
          </Link>
        )
      )}
    </div>
  </>
  );
}
function Shop2() {
  return (
    <div className=" green-glow">
      <div className=" green-glow-bottom px-4 py-1 w-full flex items-center justify-between ">
        <div className="text-type2 text-lg">Top 8gb - Featured Products</div>
        <Button variant="text" className="text-type1">View All</Button>
      </div>
      <div
        className=" grid grid-cols-4 grid-rows-2 w-full max-w-2xl"
        style={{ background: "none" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Link href={`/product/${i}`} key={i} className="contents">
            <Card className="overflow-hidden flex items-center justify-center aspect-square">
              <div className="relative w-full h-full">
                <img
                  src="/products/metal4.jpg"
                  alt="metal background"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  draggable={false}
                />
                <img
                  src={imgs[i % imgs.length]}
                  alt={`Shop item ${i + 1}`}
                  className="relative z-10 object-contain w-full h-full cursor-pointer hover:scale-115 transition-transform duration-300"
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TomText({ title, body }: { title: string; body: string }) {
  return (
    <Microchip darkness={0.35} className=" 
    w-full 
    flex items-center justify-center 
    flex-col gap-2
    text-2xl text-green-300 
    p-1
    text-type1
    ">
      <span className="sparkle-text text-3xl pb-4 pl-2 font-semibold">
        {title}
      </span>
      {body && <span className="p-1 haze text-green-200 text-[16px] font-normal">
        {body}
      </span>}
    </Microchip>
  );
}


function Section2() {
  return (
    <Microchip
      darkness={0.35}
      className="w-full max-w-5xl mt-4 mb-12 p-1 rounded-lg flex flex-col gap-6 text-2xl text-green-300 text-type1"
    >
      <h2 className="text-2xl text-green-300 mb-4 sparkle-text font-semibold">
        Page under construction
      </h2>
      <div className="flex flex-row w-full items-center gap-6">
        <div className="flex-1 min-w-0">
          <p className="text-green-200 text-[16px] haze">
            Homepage content can inclued upcoming dropdates, events, news, or other information, depending on what you want to highlight. Layout will be updated as we finalize the design.
            {/* At 8 Gigabyte, we believe in the power of nostalgia and the beauty of repurposing vintage technology. Our mission is to breathe new life into old hardware, transforming it into unique, one-of-a-kind pieces that celebrate the past while embracing the future. Whether you're a collector, a gamer, or simply someone who appreciates the charm of retro tech, you'll find something special here. */}
          </p>
          {/* <p className="text-green-200 text-md haze mt-4">
            Explore our curated selection of products, each crafted with care and attention to detail. From custom controllers to art pieces made from reclaimed circuit boards, our offerings are as diverse as they are distinctive. Join us on this journey through time and technology, and discover how old can become new again.
          </p> */}
        </div>
        <div className="flex-shrink-0">
          <img src="/heart.jpg" alt="Heart" className="rounded-lg w-40 h-40 object-cover" />
        </div>
      </div>
    </Microchip>
  );
}