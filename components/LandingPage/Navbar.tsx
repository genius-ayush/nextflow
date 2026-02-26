import { Button } from "../ui/button";
import { Workflow } from 'lucide-react';
import Link from 'next/link'

export default function Navbar(){
    return(
        <nav className="flex justify-between pl-10 pr-10 p-2 border-b border-zinc-800 bg-[#000000] text-white">
            <div className="flex gap-2 font-bold">
            <Workflow />
            <p>NextFlow</p>
            </div>
            <div className="flex gap-10">
                <div>App</div>
                <div>Features</div>
                <div>API</div>
            </div>
            <div className="flex gap-5">
                <Link href="/nodes">
                <Button className="bg-background text-black hover:bg-background text-black font-md">Sign up for free</Button>
                </Link>
                <Link href="/nodes">
                <Button>Log in</Button>
                </Link>
            </div>

            
        </nav>
    )
}