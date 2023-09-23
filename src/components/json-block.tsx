import { useTheme } from 'next-themes';
import Highlighter from 'react-syntax-highlighter';
import { stackoverflowDark, stackoverflowLight, atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const JSONBlock = ({ json }: { json: string }) => {
    const { theme } = useTheme()
    return (
        <Highlighter language='json' style={theme === 'dark' ? stackoverflowDark : atelierForestLight}>
            {JSON.stringify(json, null, 2)}
        </Highlighter>
    )
}

export default JSONBlock