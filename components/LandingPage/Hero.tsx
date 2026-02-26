import { ArrowRight, LogIn, Sparkles, UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-black text-white pb-10">

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-[-20%] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
            </div>

            <div className="container mx-auto flex flex-col items-center justify-center px-6 py-32 text-center">

                {/* Heading */}
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                    The most powerful AI suite{" "}
                    <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        for Creatives.
                    </span>
                </h1>

                {/* Subtext */}
                <p className="mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
                    Generate, enhance, and edit images, videos, or 3D meshes for free with AI.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link href="/nodes">
                    <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-500">
                        <UserRoundPlus className="w-4 h-4" />
                        Sign Up
                    </Button>
                    </Link>

                    <Link href="/nodes">
                    <Button
                        size="lg"
                        variant="secondary"
                        className="gap-2 bg-zinc-800 text-white hover:bg-zinc-700"
                    >   
                    <LogIn className="w-4 h-4" />
                        Launch App
                        
                    </Button>
                    </Link>
                </div>

            </div>
            <div className="flex justify-center ">
                <div className="relative mx-auto  max-w-6xl">




                    <div className="relative overflow-hidden rounded-md border border-white/10 ">

                        <video
                            src="https://m.krea.ai/landingHeroVideo/hls/master.m3u8"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />

                    </div>
                </div>

            </div>
        </section>

    )
}