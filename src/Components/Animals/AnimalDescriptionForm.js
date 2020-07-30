import React from 'react';

function AnimalDescriptionForm(props) {
    return (
        <form>
            <input type="text"
                value="body"
                placeholder="place your animals description here!"
            />
            <input type="submit"
                value="Add Description"
            />
        </form>
    )
}

export default AnimalDescriptionForm;