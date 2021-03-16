import React, { useEffect, useState } from 'react'
import instance from '../../../../axios-orders'
import useFirestore from '../../../../hooks/useFirestore';
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';


export default function ShowImages({ userId }) {
    const { currentUser } = useAuth();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;
    const { docs } = useFirestore(currentUser.uid);


    const [url, setUrl] = useState([]);
    const length = docs.length

    const user = userId;
    console.log(user);

    useEffect(() => {
        instance.get(`/${user}/images/${output}.json`)
            .then(response => {
                console.log(response.data);
                const results = [];

                for (let key in response.data) {
                    results.push({
                        ...response.data[key],
                        id: key
                    })
                }
                setUrl(results);
                console.log(url);
            })
            .catch(err => console.log(err));
        return { url }
    }, [userId, setUrl])

    console.log(url);

    return (
        <div>
            <h1> Show Images Here</h1>
            {url.map(urls => (
                <li key={urls.id}><strong>{urls.id}</strong>: {urls.imageUrl}</li>
            ))}
        </div>
    )
}