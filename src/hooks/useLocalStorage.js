import { useState, useEffect } from 'react';
export default function useLocalStorage(key, value) {
    const [storage, setStorage] = useState(() => {
        // if item exists in local storage, return it as the initial value
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : value;
    })

    // if value changes, update local storage.
    // Runs when setStorage is called
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storage));
    }, [key, value])

    return [storage, setStorage];
}