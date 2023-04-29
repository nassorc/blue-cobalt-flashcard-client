import { useState, useEffect } from 'react';
export default function useFetchData(url, options) {
    const [data, setData] = useState();
    useEffect(() => {
        fetch(url, options)
            .then(res => res.json())
            .then(data => {setData(data)})
            .catch(err => {throw new Error(err.message)});
    }, [])
    return (data?.details) ? data.details : data;
} 