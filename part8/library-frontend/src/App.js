import React, { useState } from 'react'
import { gql, useQuery, useMutation} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
{
  allAuthors{
    name
    born
    bookCount
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks{
    title
    author
    published
  }
}
`
const ADD_BOOK = gql`
  mutation addBook($title:String!,$author:String!,$published:Int!,$genres:[String!]!){
    addBook(
      title:$title
      published:$published
      author:$author
      genres:$genres
    ){
      title
      author
      published
      genres
    }
  }
`

const EDIT_AUTHOR = gql `
  mutation editAuthor($name:String!,$date:Int!){
    editAuthor(
      name:$name
      setBornTo:$date
    ){
      name
      born
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(ADD_BOOK,{
    refetchQueries:[{query:ALL_BOOKS},{query:ALL_AUTHORS}]
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR,{
    refetchQueries:[{query:ALL_AUTHORS}]
  })

  return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
        </div>

        <Authors
          show={page === 'authors'} result={authors.data} editAuthor={editAuthor}
        />

        <Books
          show={page === 'books'} result={books.data}
        />

        <NewBook
          show={page === 'add'} addBook={addBook}
        />

      </div>
  )
}

export default App