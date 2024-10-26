import { gql, useQuery } from '@apollo/client';
import './Authors.css'
import Authorform from './AuthorForm/AuthorForm';
import AuthorList from './AuthorList/AuthorList';
import { useEffect, useState } from 'react';

const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      id
      name
      bio
    }
  }
`;

function Authors() {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [authorList, setAuthorList] = useState([])

  useEffect(() => {
    if (data) setAuthorList(data.authors)
  }, [data])


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddAuthor = (newauthor) => {
    setAuthorList((prevAuthorList) => [...prevAuthorList, newauthor])
  }
  const handleDeletedList = (deleteId) =>{
    setAuthorList((prevAuthorList) => prevAuthorList.filter((book) => book.id !== deleteId));
  }
  const handleEditedList = (newlist) => {}
  
  return (
    <div className='Authors-container'>
      <Authorform onAddAuthor={handleAddAuthor} />
      <AuthorList authors={authorList} onDeleteAuthor={handleDeletedList} onEditAuthor={handleEditedList} />
    </div>
  );
}

export default Authors;