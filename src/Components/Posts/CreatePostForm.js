import React, { Component } from 'react';

class CreatePostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "",
            body: "",
            animal: props.animal,
            user: props.currentUser
        }
    }

    render() {
        return (
            <form>
                <input type="text"
                    name="image"
                    placeholder="url of your image here"
                />
                <input type="text"
                    name="body"
                    placeholder="create your post"
                />
                <input type="submit"
                    value="Create Post"
                />
            </form>
        )
    }
}

export default CreatePostForm;