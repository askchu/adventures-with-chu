import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';
import instance from '../../../../axios-orders';


export default function GetData(file, id, dataChanged) {
    const [datas, setData] = useState(null);
    const [changed, setChanged] = useState(null);
    const { currentUser } = useAuth();


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;

    const getProfile = async () => {
        let data = ''
        await instance.get(`users/${currentUser.uid}/profile.json`)
            .then(response => {
                // console.log(response.data)
                const obj = Object.keys(response.data);
                // console.log(obj[0]);
                data = obj[0]
            })
            .catch(err => console.log(err));

        return await data;
    }


    useEffect(async () => {
        // console.log(`id is: ${id}` + ' from GetData page')
        // console.log('grabs data from GetData page')





        if (id) {
            await instance.get(`users/${currentUser.uid}/profile/${id}/images.json`)
                .then(response => {
                    // console.log(response);
                    const results = [];
                    for (let key in response.data) {
                        // console.log(key);
                        results.unshift({
                            ...response.data[key],
                            id: key,
                        })
                    }
                    setData(results);
                    // setChanged('grabbed image')
                })
                .catch(err => console.log(err));
        }



        if (!id) {
            const results = getProfile();
            results.then(async (res) => {
                await instance.get(`users/${currentUser.uid}/profile/${res}/images.json`)
                    .then(response => {
                        // console.log(response)
                        const results = [];
                        for (let key in response.data) {
                            // console.log(key);
                            results.unshift({
                                ...response.data[key],
                                id: key,
                            })
                        }
                        setData(results);
                    })
                    .catch(err => console.log(err));
            })
        }

        // setData(allImages);

    }, [file, dataChanged]);

    return { datas, changed };
}
