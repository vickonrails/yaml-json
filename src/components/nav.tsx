import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(
    () => import('@/components/theme-switcher'), {
    ssr: false,
    loading: () => <div className="h-5 w-5 bg-neutral-300 rounded-md" />
})

function Nav() {
    return (
        <nav className="flex border-b border-neutral-300 py-2 px-5 gap-4 justify-between items-center bg-neutral-100">
            <Logo />
            <ThemeSwitcher />
        </nav>
    )
}

export function Logo() {
    return (
        <div className="flex gap-1 items-center py-1">
            <span className="bg-neutral-900 text-neutral-100 rounded-md py-1 px-2">YAML</span>
            <span className="text-neutral-900">JSON</span>
        </div>
    )
}

export default Nav