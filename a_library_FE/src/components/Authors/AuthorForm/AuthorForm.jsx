import React, { useState } from "react";
import './AuthorForm.css'
import { gql, useMutation } from '@apollo/client'

const ADD_AUTHOR = gql`
    mutation addAuthor($name: String! , $bio: String!){
        addAuthor(name: $name, bio: $bio){
            id    
            name
            bio
        }
    }
`;

const AuthorForm = ({ onAddAuthor }) => {
    const [addAuthor, { data }] = useMutation(ADD_AUTHOR)
    const [authorName, setAuthorName] = useState("");
    const [authorBio, setAuthorBio] = useState("");
    const [errors, setErrors] = useState({
        authorName: "",
        authorBio: "",
    });

    const validateForm = () => {
        let isValid = true;
        let tempErrors = { authorName: "", authorBio: "" };

        if (!authorName) {
            tempErrors.authorName = "Please input author name!";
            isValid = false;
        }
        if (!authorBio) {
            tempErrors.authorBio = "Please input author Bio!";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted with: ", { authorName, authorBio });
            try {
                const response = await addAuthor({ variables: { name: authorName, bio: authorBio } })
                if (response?.data || data) {
                    onAddAuthor(response.data.addAuthor)
                    console.log(response?.data)
                }
            } catch (error) {
                console.log(error)
            }
            // Reset form after submission
            setAuthorName("");
            setAuthorBio("");
        }
    };

    return (
        <div className="authorform-container">
            <h2>Add New Author : </h2>
            <form className="form-addauthor" onSubmit={handleSubmit}>
                <div className="authorform-inputdiv">
                    <div>
                        <label htmlFor="authorName">Author Name</label>
                        <div>
                            <input
                                className="formInput"
                                type="text"
                                id="authorName"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                            />
                            {errors.authorName && <p className="error">{errors.authorName}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="authorBio">Bio</label>
                        <div>
                            <textarea
                                className="formInput"
                                id="authorBio"
                                value={authorBio}
                                onChange={(e) => setAuthorBio(e.target.value)}
                            />
                            {errors.authorBio && <p className="error">{errors.authorBio}</p>}
                        </div>

                    </div></div>
                <div><button type="submit">Add Author</button></div>

            </form>
        </div>
    );
};

export default AuthorForm;
