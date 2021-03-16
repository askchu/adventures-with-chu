import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';
import instance from '../../../../axios-orders';


export default function GetData(file, id) {
    const [datas, setData] = useState(null);
    const { currentUser } = useAuth();


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;


    useEffect(async () => {
        console.log(`id is: ${id}` + ' from GetData page')
        console.log('grabs data from GetData page')
        await instance.get(`/${currentUser.uid}/images/${output}/${id}.json`)
            .then(response => {
                console.log(response);
                const results = [];
                for (let key in response.data) {
                    console.log(key);
                    results.push({
                        ...response.data[key],
                        id: key,
                    })
                }
                setData(results);
            })
            .catch(err => console.log(err));

    }, [file]);

    return { datas };
}
