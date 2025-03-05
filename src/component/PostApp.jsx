import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import PostList from './PostList';

export const PostContext = createContext();

function PostApp() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const perPage = 6;

    const getData = async() => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        console.log(res.data)
        setPosts(res.data);
        setTimeout(() => setLoading(false),5000);
    }

    const removePost = (postId) => {
        setPosts((prevPosts) => {
            const filterPosts = prevPosts.filter((post) => post.id !== postId);
            const indexOfLastPost = currentPage * perPage;
            const newPost = prevPosts[indexOfLastPost];

            return newPost ? [...filterPosts, newPost] : filterPosts;
        })
    }

    useEffect(() => {
        getData()
    },[])

  return (
    <PostContext.Provider value={{posts, currentPage, setCurrentPage, perPage, removePost}}>
        <div>
            { loading ? <h2>Loading... (for 5 seconds)</h2> : <PostList/>}
        </div>
    </PostContext.Provider>
  )
}

export default PostApp
