import React, { useContext, useState } from 'react'
import { PostContext } from './PostApp'

function PostList() {
    const { posts, currentPage, perPage, setCurrentPage, removePost } = useContext(PostContext);

    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPage = Math.ceil(posts.length / perPage)

    return (
        <div>
            <h1 style={{display: "flex", justifyContent:"center"}}>Task App</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: 'center' }}>
                {
                    currentPosts.map((post) => (
                        <div key={post.id} style={{ width: "400px", border: '2px solid black', padding: "10px", display:'flex', flexDirection:'column', justifyContent:"center", alignItems:"center", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <button style={{backgroundColor:"red", color:"white", border:"none", padding: "5px 10px"}} onClick={() => removePost(post.id)}>removePost</button>
                        </div>
                    ))
                }
            </div>


            {/*  pagination */}
            <div style={{display:"flex", gap:10, justifyContent:"center", margin:"30px"}} >
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                {/* <div>Page {currentPage} of {totalPage}</div> */}
                {
                    [...Array(totalPage)].map((_,i) => (
                        <button key={i}
                        style={{backgroundColor : currentPage === i+1 ? "blue" : "white"}}
                        onClick={() => setCurrentPage(i+1)}
                        >
                            {i+1}
                        </button>
                    ))
                }
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPage}>Next</button>
            </div>
        </div>
    )
}

export default PostList
