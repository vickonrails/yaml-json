import { useEffect, useState } from "react";

export function useLocal(key: string, initialValue = ''): [string, (value: string) => void] {
    const [value, setValue] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key) || initialValue
        }
        return initialValue
    });

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue]
}