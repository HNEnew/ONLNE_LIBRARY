import { gql, useMutation } from '@apollo/client';
import { React, useState } from 'react'
// import './AuthorsList.css'

const DELETE_BOOK = gql`
mutation DELETE_BOOK($id: Int!) {
    deleteBook(id: $id) {
        id
    }
}`

const EDIT_BOOK = gql`
    mutation editBook($id: Int!, $title: String, $genre: String, $publicationYear: Int!) {
        editBook(id: $id, title: $title, genre: $genre, publicationYear: $publicationYear) {
            id
            title
            genre
            publicationYear
        }
    }
`;

export default function BookList({ books, onDeleteBook, onEditBook }) {

    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState({});

    const [deleteId, setDeleteId] = useState(null);
    const [deleteBook] = useMutation(DELETE_BOOK);

    const [editBook] = useMutation(EDIT_BOOK);

    const handleEditClick = (book) => {
        setEditingId(book.id);
        setEditedData({ title: book.title, genre: book.genre, publicationYear: book.publicationYear });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleEditBook = async () => {
        console.log('to be changed book data:', editedData);
        try {
            const response = await editBook({
                variables: {
                    id: editingId,
                    title: editedData.title,
                    genre: editedData.genre,
                    publicationYear: parseInt(editedData.publicationYear,10),
                },
            });
            console.log("Book updated:", response.data.editBook);
        } catch (error) {
            console.error("Error updating book:", error);
        }
        setEditingId(null);
    };

    const confirmDelete = async () => {
        console.log('Deleted book ID:', deleteId);
        setDeleteId(null);
        try {
            const response = await deleteBook({ variables: { id: deleteId } });
            console.log(response)
            onDeleteBook(deleteId)
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div>
            <h1>Books</h1>
            <ul className="author-list">
                {books.map((book) => (
                    <li key={book.id} className="author-card">
                        {editingId === book.id ? (
                            <div className="author-edit-mode">
                                {/* Editable fields */}
                                <input
                                    type="text"
                                    name="title"
                                    value={editedData.title}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                    placeholder="Book Title"
                                />
                                <input
                                    type="text"
                                    name="genre"
                                    value={editedData.genre}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                    placeholder="Genre"
                                />
                                <input
                                    type="number"
                                    name="publicationYear"
                                    value={editedData.publicationYear}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                    placeholder="Publication Year"
                                />
                                <div className="author-actions">
                                    <button className="save-btn" onClick={handleEditBook}>Save</button>
                                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="author-display-mode">
                                <div className="author-info">
                                    <h3 className="author-name">{book.title}</h3>
                                    <p className="author-bio">{book.genre}</p>
                                    <p className="author-bio">{book.publicationYear}</p>
                                </div>
                                <div className="author-actions">
                                    <button className="edit-btn" onClick={() => handleEditClick(book)}>Edit</button>
                                    <button className="delete-btn" onClick={() => setDeleteId(book.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {deleteId && (
                <div className="delete-confirmation">
                    <div className="confirmation-box">
                        <p>Are you sure you want to delete this book?</p>
                        <div className="confirmation-actions">
                            <button className="yes-btn" onClick={confirmDelete}>Yes</button>
                            <button className="no-btn" onClick={() => setDeleteId(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
