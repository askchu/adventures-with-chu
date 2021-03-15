import React, { useEffect, useState } from 'react'
import { isElementOfType } from 'react-dom/test-utils';
import instance from '../../../../axios-orders'
import useFirestore from '../../../../hooks/useFirestore';
import { useAuth } from '../../../Authentication/AuthContext/AuthContext';


export default function ShowImages({ change }) {
    const { currentUser } = useAuth();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = year + '/' + month + '/' + day;
    const { docs } = useFirestore(currentUser.uid);

    // console.log(currentUser.uid);

    const [imgUrl, setImgUrl] = useState([]);
    // console.log(docs.length)
    const length = docs.length
    // console.log(change);
    // console.log(imgUrl.length)

    useEffect(() => {

        function getData() {
            instance.get(`/${currentUser.uid}/images/${output}.json`)
                .then(response => {
                    console.log(response.data);
                    const results = [];

                    for (let key in response.data) {
                        results.push({
                            ...response.data[key],
                            id: key
                        })
                    }
                    setImgUrl(results);
                    console.log(results);
                })
                .catch(err => console.log(err));


            return { imgUrl }
        }

        getData();

        //NOTE: By setting [] at the end of useEffect, it only runs once.
    }, [change, setImgUrl])

    console.log(imgUrl)

    return (
        <div>
            <h1> Show Images Here</h1>
        </div>
    )
}