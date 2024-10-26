import { React, useState } from 'react'
import './AuthorsList.css'
import { gql, useMutation } from '@apollo/client'

const DELETE_AUTHOR = gql`
 mutation deleteAuthor($id: Int!) {
    deleteAuthor(id: $id) {
        id
        name
        bio
    }
}
`
const EDIT_AUTHOR = gql`
    mutation editAuthor($id: Int!, $name: String, $bio: String) {
        editAuthor(id: $id, name: $name, bio: $bio) {
            id
            name
            bio
        }
    }
`;

export default function AuthorList({ authors, onDeleteAuthor, onEditAuthor }) {
    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState({});

    const [deleteId, setDeleteId] = useState(null);
    const [deleteAuthor] = useMutation(DELETE_AUTHOR);

    const [editAuthor] = useMutation(EDIT_AUTHOR);

    const handleEditClick = (author) => {
        setEditingId(author.id);
        setEditedData({ name: author.name, bio: author.bio });
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleEditAuthor = async () => {
        console.log('to be changed author data:', editedData);
        try {
            const response = await editAuthor({
                variables: {
                    id: editingId,
                    name: editedData.name,
                    bio: editedData.bio,
                },
            });
            console.log("Author updated:", response.data.editAuthor);
        } catch (error) {
            console.error("Error updating author:", error);
        }
        setEditingId(null);
    };

    const confirmDelete = async () => {
        console.log('Deleted author ID:', deleteId);
        setDeleteId(null);
        try {
            const response = await deleteAuthor({ variables: { id: deleteId } });
            console.log("response : ", response)
            onDeleteAuthor(deleteId)
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div>
            <h1>Authors</h1>
            <ul className="author-list">
                {authors.map((author) => (
                    <li key={author.id} className="author-card">
                        {editingId === author.id ? (
                            <div className="author-edit-mode">
                                {/* Editable fields */}
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                    placeholder="Author Name"
                                />
                                <textarea
                                    name="bio"
                                    value={editedData.bio}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                    placeholder="Author Bio"
                                ></textarea>
                                <div className="author-actions">
                                    <button className="save-btn" onClick={handleEditAuthor}>Save</button>
                                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="author-display-mode">
                                <div className="author-info">
                                    <h3 className="author-name">{author.name}</h3>
                                    <p className="author-bio">{author.bio}</p>
                                </div>
                                <div className="author-actions">
                                    <button className="edit-btn" onClick={() => handleEditClick(author)}>Edit</button>
                                    <button className="delete-btn" onClick={() => setDeleteId(author.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {deleteId && (
                <div className="delete-confirmation">
                    <div className="confirmation-box">
                        <p>Are you sure you want to delete this author?</p>
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
