import { useThemes } from '../hooks/useTheme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useThemes();

    const toggleTheme = () => {
        if (theme === 'light') {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            setTheme('dark');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            setTheme('light');
        }
    };

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </button>
    );
};

export default ThemeSwitcher;
