import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import './Progress.css';

export default function ProgressBar({ file, setFile, id, setId }) {
    const { url, progress } = useStorage(file, id);
    console.log(id + ' from progressBar.js');
    console.log(progress, url);

    useEffect(() => {
        if (url) {
            setFile(null);
            // setId(null);
        }
    }, [url, setFile, setId])


    return (
        <div className='progress-bar'
            style={{ width: progress + '%' }}>
        </div>
    )
}
