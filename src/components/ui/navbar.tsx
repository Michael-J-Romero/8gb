"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import "@/app/green-glow.css";
import "@/app/fade-edges.css";

const navItems = [
	{ href: "/shop", label: "Shop" },
	{ href: "/evolutions", label: "Evolutions" },
	{ href: "/donations", label: "Donations" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/events", label: "Events" },
	{ href: "/resin-care", label: "Resin Care" },
];

export function Navbar() {
	return (
	   <nav className="w-full border-b border-border shadow-sm mb-2 green-glow-nav " style={{ background: "#0002" }}>
			<div className="w-full flex flex-row items-center justify-center py-0 px-0 gap-4" style={{
				// borderBottom: "1px solid rgb(2 245 2 / 5%)",
				background: "rgba(9, 237, 18, 0.07)", 
			}}>
				<div className="px-12
				flex w-full max-w-4xl mx-auto justify-between items-center">
					<span
						className="ml-0"
						style={{
							fontSize: "3em",
							textTransform: "uppercase",
							fontFamily: 'VT323, monospace, system-ui',
							letterSpacing: "0.1em",
							color: "rgb(112, 236, 112)",
							textShadow: "0px 0px 7px #6fe53bb3",
 
						}}
					>
						8 Gigabyte
					</span>
					<div className="flex items-center min-w-[200px] max-w-xs w-full justify-end">
						<Input
							type="search"
							placeholder="Search..."
							className="bg-white text-black px-3 py-2 rounded-md w-full"
						/>
					</div>
				</div>
			</div>
			<ul className=" flex w-full justify-center items-center px-0 py-0 gap-0" style={{ background: "rgb(20 55 21 / 43%)" }}>
		<div className="px-6 
		flex w-full max-w-4xl mx-auto justify-between items-center">
			{navItems.map((item, idx) => (
				<React.Fragment key={item.href}>
					<Link
						href={item.href}
						className="text-type1 font-medium px-2 py-2 hover:text-blue-700 transition-colors"
						style={{ display: "inline-block", whiteSpace: "nowrap" }}
					>
						{item.label}
					</Link>
					{idx < navItems.length - 1 && (
						<span className="text-green-700 text-lg select-none mx-1">|</span>
					)}
				</React.Fragment>
			))}
		</div>
			</ul>
		</nav>
	);
}

export function Footer() {
	return (
		<footer className="w-full bg-card border-t border-border mt-12 py-8">
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
				<div className="flex items-center gap-2">
					<img
						src="/globe.svg"
						alt="8 Gigabyte Logo"
						className="w-8 h-8 rounded-full border border-primary"
					/>
					<span className="font-bold text-primary text-lg tracking-wide">
						8 Gigabyte
					</span>
				</div>
				<div className="text-muted-foreground text-sm text-center md:text-right">
					&copy; {new Date().getFullYear()} 8 Gigabyte. All rights reserved.
					<span className="mx-2">·</span>
					<a href="/about" className="hover:underline">
						About
					</a>
					<span className="mx-2">·</span>
					<a href="/contact" className="hover:underline">
						Contact
					</a>
				</div>
			</div>
		</footer>
	);
}
