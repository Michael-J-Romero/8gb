import React from "react";

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      html, body, #__next, #__next > div {
        min-height: 100vh;
        height: 100%;
        width: 100%;
      }
      body, html {
        // background: none !important;
      }
      .myspace-profile {
        box-shadow: 0 0 24px 4px #0f0, 0 0 0 2px #222 inset;
        border-radius: 1.5rem;
        background: none !important;
      }
      .retro-card {
         border-width: 1px;
       box-shadow: 0 0 8px #00ff0078, 0 0 0 2px #222 inset;
        }
      .font-retro {
        font-family: 'Press Start 2P', 'VT323', monospace, system-ui;
      }
      .drop-shadow-glow {
        filter: drop-shadow(0 0 4px #0f0) drop-shadow(0 0 2px #fff);
      }
      .sparkle-text {
        position: relative;
        display: inline-block;
        color: #fff;
        background: linear-gradient(90deg, #fff 0%, #ffe066 20%, #fff 40%, #b5e853 60%, #fff 80%, #ffe066 100%);
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: sparkle-move 2s linear infinite;
        filter: drop-shadow(0 0 6px #fff) drop-shadow(0 0 2px #ffe066) hue-rotate(32deg);
      }
      @keyframes sparkle-move {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
      .sparkle-text::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        background: url('data:image/svg+xml;utf8,<svg width="100" height="30" xmlns="http://www.w3.org/2000/svg"><g><circle cx="10" cy="10" r="2" fill="white" opacity="0.8"/><circle cx="30" cy="20" r="1.5" fill="yellow" opacity="0.7"/><circle cx="60" cy="8" r="1.2" fill="white" opacity="0.6"/><circle cx="80" cy="18" r="1.8" fill="yellow" opacity="0.8"/></g></svg>');
        background-size: 60px 20px;
        background-repeat: repeat-x;
        animation: sparkle-overlay 1.5s linear infinite;
        opacity: 0.7;
      }
      @keyframes sparkle-overlay {
        0% { background-position-x: 0; }
        100% { background-position-x: 60px; }
      }
      .bg-background, .bg-card, .bg-card\/80, .bg-circuit-board, .bg-black\/80, .bg-background\/80, .bg-background\/90, .bg-white, .bg-white\/80, .bg-white\/90, .bg-neutral-50, .bg-neutral-900, .bg-neutral-950, .bg-muted, .bg-muted\/50, .bg-muted\/80, .bg-muted\/90 {
        background: none !important;
        background-color: transparent !important;
      }
    `}</style>
  );
}
