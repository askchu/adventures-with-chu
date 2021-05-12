import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';
import instance from '../../../../axios-orders';


export default function GetData(file, id, savedDescription, deletedImage, draftId) {
    const [datas, setData] = useState(null);
    const { currentUser } = useAuth();


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;

    let draftImageData = [];



    useEffect(async () => {
        console.log(`id is: ${id}` + ' from GetData page')
        console.log('grabs data from GetData page')
        let allImages = [];


        await instance.get(`users/${currentUser.uid}/profile/${id}/images.json`)
            .then(response => {
                console.log(response);
                const results = [];
                for (let key in response.data) {
                    console.log(key);
                    results.unshift({
                        ...response.data[key],
                        id: key,
                    })
                }
                setData(results);
                // allImages.push(results);
            })
            .catch(err => console.log(err));


        // setData(allImages);

    }, [file, savedDescription, deletedImage, draftId]);

    return { datas };
}
