import { Logo } from "@/pages";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import('@/components/theme-switcher'), { ssr: false, loading: () => <div>Loading...</div> })

function Nav() {
    return (
        <nav className="flex border-b border-neutral-300 py-2 px-5 gap-4 justify-between items-center bg-neutral-100">
            <Logo />
            <ThemeSwitcher />
        </nav>
    )
}

export default Nav