import { useState, useEffect } from 'react';
export default function useFetchData(url, options) {
    const [data, setData] = useState();
    useEffect(() => {
        if(url instanceof Function) {
            fetch(url(), options)
            .then(res => res.json())
            .then(data => {setData(data)});
        }
        else {
            fetch(url, options)
            .then(res => res.json())
            .then(data => {setData(data)});
        }
    }, [])
    return (data?.details) ? data.details : data;
} 