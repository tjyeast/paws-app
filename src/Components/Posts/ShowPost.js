import React from 'react';

function ShowPost(props) {

    const post = props.post.find(post => {
        return post._id === props.id;
    })
    return (
        
            <div>
                {post && (
                    <div className="showpost">
                        <div className="showpost-image">
                            <img src={post.image} alt="animal" width="100%" className="showpost-image-css"/>
                        </div>

                        <div className="showpost-text">
                            <p>{post.post}</p>
                        </div>

                        <div className="showpost-delete-field">
                            <button 
                                onClick={() => props.destroyPost(post._id)} className="post-delete">
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
    )
}

export default ShowPost;