import React, { useEffect, useState } from 'react'
import instance from '../../../../axios-orders';
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';


export default function GetCount() {

    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(1);
    const { currentUser } = useAuth();


    const postCount = async () => {
        const number = {
            count: 1
        };
        instance.post(`/${currentUser.uid}/count.json`, number)
            .then(response => {
                console.log(response)
                console.log(response.data)
                console.log(`count is ${number.count}`)
            })
            .catch(error => console.log(error));
    }

    // const grabData = async () => {
    //     await instance.get(`/${currentUser.uid}/count.json`)
    //         .then(response => {
    //             console.log(response.data)
    //             let res = []
    //             for (let key in response.data) {
    //                 res.push({
    //                     ...response.data[key],
    //                     id: key
    //                 })
    //             }
    //             setCountId(res);
    //         })
    //         .catch(err => console.log(err));
    // }


    useEffect(() => {
        const number = {
            count: `${count}`
        };
        instance.post(`/${currentUser.uid}/count.json`, number)
            .then(response => {
                console.log(response)
                console.log(response.data)
                // console.log(`count is ${number.count}`)
                const results = [];
                for (let key in response.data) {
                    results.push({
                        ...response.data,
                        count: count,
                        name: response.data.name
                        //         id: key,
                        //         name: response.data.name,
                        //         count: { number }
                    })
                }
                setInfo(results);
            })
            .catch(error => console.log(error));
    }, [])

    return { info };
}