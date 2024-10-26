import { gql, useQuery } from '@apollo/client'
import './Books.css'
import BookForm from './BookForm/BookForm';
import BookList from './BookList/BookList';
import { useEffect, useState } from 'react';

const GET_BOOKS = gql`
 query getBooks {
  books{
    id
    title
    genre
    publicationYear
    authorId
  }
 }
`;

function Books() {
    const { loading, error, data } = useQuery(GET_BOOKS)
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        if (data) setBookList(data.books)
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleAddBook = (newbook) => {
        setBookList((prevBookList) => [...prevBookList, newbook])
        console.log('in books/handleaddbook-', bookList)
    }
    const handleDeletedList = (deleteId) => {
        setBookList((prevBookList) => prevBookList.filter((book) => book.id !== deleteId));
    }
    const handleEditedList = (newlist) => { }

    return (
        <div className='books-container'>
            <BookForm onAddBook={handleAddBook} />
            <BookList books={bookList} onDeleteBook={handleDeletedList} onEditBook={handleEditedList} />
        </div>
    );
}

export default Books;