import React, { useEffect, useState } from 'react';
import instance from '../../axios-orders';
import useImageStorage from '../../hooks/useImageStorage';
import { useAuth } from '../Authentication/AuthContext/AuthContext';
import './Progress.css';

export default function ProgressBar({ file, setFile, id, setId }) {
    const [ifImg, setIfImg] = useState(false);
    const [imgId, setImgId] = useState('');
    const { url, progress } = useImageStorage(file, id, ifImg, imgId);
    console.log(id + ' from progressBar.js');
    console.log(progress, url);
    const { currentUser } = useAuth();

    useEffect(async () => {
        if (url) {
            setFile(null);
            // setId(null);
        }

        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    const id = Object.keys(response.data);
                    console.log(id);
                    setImgId(id[0]);
                    console.log('there is data');
                    setIfImg(true);
                }
            })
            .catch(err => console.log(err));

        console.log(imgId);

    }, [url, setFile, setId, file])


    return (
        <div className='progress-bar'
            style={{ width: progress + '%' }}>
        </div>
    )
}
