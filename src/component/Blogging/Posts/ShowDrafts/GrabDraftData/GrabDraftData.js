import React, { useEffect, useState } from 'react'
import instance from '../../../../../axios-orders';
import { useAuth } from '../../../../Authentication/AuthContext/AuthContext';

export default function GrabDraftData() {
    const [datas, setData] = useState(null);
    const { currentUser } = useAuth();


    useEffect(async () => {
        console.log('grabs data from GrabDraftData page')
        await instance.get(`/${currentUser.uid}/drafts.json`)
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
            })
            .catch(err => console.log(err));

    }, []);

    return { datas };
}

