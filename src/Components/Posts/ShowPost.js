import React from 'react';

function ShowPost(props) {

    const post = props.post.find(post => {
        return post._id === props.id;
    })
    return (
        
            <div>
                {post && (
                    <div>
                        <img src={post.image} alt="animal" />
                        <p>{post.post}</p>
                        <button 
                            onClick={() => props.destroyPost(post._id)}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
    )
}

export default ShowPost;