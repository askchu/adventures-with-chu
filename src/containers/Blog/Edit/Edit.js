import React from 'react';
import instance from '../../../axios-orders';
import ShowPosts from '../../../component/Blogging/ShowPosts/ShowPosts';
import './Edit.css'

const Edit = (props) => {




    const { id } = props.match.params;
    let blog = {
        id: { id },
        author: ''
    }

    const getData = () => {
        let res = []
        instance.get(`/posts/${id}.json`)
            .then(response => {
                console.log(response.data)
                // console.log(response.data.author)

                // id: response.data.id,
                // author: response.data.author,
                // content: response.data.content,
                // date: response.data.date

                res = [{
                    author: response.data.author,
                    date: response.data.date,
                    content: response.data.content
                }]
                return res
                // for (let key in response.data) {
                //     results.push({
                //         ...response.data,
                //         id: key
                //     })
                // }
                // console.log(results[0].author);
                // return blog = {
                //     author: results[0].author
                // }
            })
        return res;
    }

    const x = getData();



    console.log(x);

    // const post = (
    //     blog.map(results => (
    //         <ShowPosts key={results.id}
    //             author={results.author}
    //             date={results.date}
    //             content={results.content}
    //             id={results.id}
    //         />
    //     ))
    // )

    return (
        <div className='container'>
            <h1>Edit</h1>
            Id: {id}
            <h3>Edited on: {new Date().toLocaleTimeString()}</h3>
            {/* {post} */}
        </div>
    )
}

export default Edit
