import React from 'react'
import './Homepage.css'
// import Authors from '../Authors/Authors'
// import Books from '../Books/Books'
import { gql, useQuery } from '@apollo/client';
import AuthorList from '../Authors/AuthorList/AuthorList';
import BookList from '../Books/BookList/BookList';

const GET_AUTHORS_AND_BOOKS = gql`
  query GetAuthorsAndBooks {
    authors {
      id
      name
      bio
    }
    books {
      id
      title
      genre
      publicationYear
      authorId
    }
  }
`;


export default function Homepage() {
  const { loading, error, data } = useQuery(GET_AUTHORS_AND_BOOKS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)
  return (
    <div className="homepage-container">
        <BookList books={data.books}/>
        <AuthorList authors={data.authors}/>
    </div>
  )
}


// const AuthorsAndBooksComponent = () => {
//   const { loading, error, data } = useQuery(GET_AUTHORS_AND_BOOKS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
// console.log(data)
//   return (
//     <div>
//       <h2>Authors</h2>
//       <ul>
//         {data.authors.map((author) => (
//           <li key={author.id}>
//             {author.name} - {author.bio}
//           </li>
//         ))}
//       </ul>

//       <h2>Books</h2>
//       <ul>
//         {data.books.map((book) => (
//           <li key={book.id}>
//             {book.title} - {book.genre} - {book.publicationYear} (Author ID: {book.authorId})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };