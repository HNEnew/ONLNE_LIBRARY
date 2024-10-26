import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import './BookForm.css'

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $genre: String!, $publicationYear: Int!, $authorId: Int!) {
    addBook(title: $title, genre: $genre, publicationYear: $publicationYear, authorId: $authorId) {
      id
      title
      genre
      publicationYear
      authorId
    }
  }
`;

const AddBookComponent = ({ onAddBook }) => {
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK);
    const [bookDetails, setBookDetails] = useState({
        title: "",
        genre: "",
        publicationYear: "",
        authorId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookDetails({
            ...bookDetails,
            [name]: name === "publicationYear" || name === "authorId" ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addBook({ variables: bookDetails });
            console.log("New Book added:", response.data.addBook);
            if(response?.data?.addBook||data?.addBook) onAddBook(response.data.addBook)
            setBookDetails({ title: "", genre: "", publicationYear: "", authorId: "" })
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="bookform-container">
            <form className="form-addbook" onSubmit={handleSubmit}>
                <h2>Add New Book</h2>
                <div className="bookform-inputdiv">
                    <div className="bookform-inputsubdiv">
                        <label>Title:</label>
                        <input type="text" name="title" value={bookDetails.title} onChange={handleChange} required />
                    </div>
                    <div className="bookform-inputsubdiv">
                        <label>Genre:</label>
                        <input type="text" name="genre" value={bookDetails.genre} onChange={handleChange} required />
                    </div>
                    <div className="bookform-inputsubdiv">
                        <label>Publication Year:</label>
                        <input
                            type="number"
                            name="publicationYear"
                            value={bookDetails.publicationYear}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="bookform-inputsubdiv">
                        <label>Author ID:</label>
                        <input
                            type="number"
                            name="authorId"
                            value={bookDetails.authorId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div><button type="submit">Add Book</button></div>


                {/* {data && <p>New book added: {data.addBook.title}</p>} */}
            </form>
        </div>
    );
};

export default AddBookComponent;
