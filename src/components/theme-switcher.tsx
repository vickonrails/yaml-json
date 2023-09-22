
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'react-feather';

const ThemeSwitcher = () => {
    // TODO: find the right loading state for the icon
    const { setTheme, theme } = useTheme();
    return (
        <button
            onClick={ev => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='text-neutral-900'
        >
            {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
    )
}

export default ThemeSwitcher