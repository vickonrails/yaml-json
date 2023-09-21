import { useCallback, useEffect, useState } from "react";

export function useLocal(key: string) {
    const [value, setValue] = useState('');

    const update = useCallback((code: string) => {
        localStorage.setItem(key, code);
        setValue(code);
    }, [])

    useEffect(() => {
        const localCode = localStorage.getItem(key);
        if (localCode) {
            setValue(localCode);
        }
    }, [])

    return { value, update }
}