import React from 'react'

const Home = ({ posts }) => (
    <div>
        <ul>
            <li>
                <p>Id: {posts.id}</p>
                <p>Author: {posts.author}</p>
                <p>Content: {posts.content}</p>
            </li>
        </ul>

    </div>
)

export default Home;
