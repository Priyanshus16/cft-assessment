import React, { useContext } from 'react';
import { PostContext } from './PostApp';

function PostList() {
  const { posts, currentPage, perPage, setCurrentPage, removePost } = useContext(PostContext);

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPage = Math.ceil(posts.length / perPage);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Task App</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center'
        }}
      >
        {currentPosts.map((post) => (
          <div
            key={post.id}
            style={{
              width: '400px',
              height: '200px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 10px 0' }}>{post.title}</h3>
              <p style={{ margin: 0 }}>{post.body}</p>
            </div>
            <button
              onClick={() => removePost(post.id)}
              style={{
                alignSelf: 'flex-end',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '30px'
        }}
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: '5px 10px', borderRadius: '4px' }}
        >
          Prev
        </button>

        {[...Array(totalPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: currentPage === i + 1 ? 'lightblue' : 'white',
              border: '1px solid #ccc'
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage}
          style={{ padding: '5px 10px', borderRadius: '4px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostList;
