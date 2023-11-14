import logo from './logo.svg';
import './App.css';
import './BookList.css';
import BookList from './BookList';
import { useState, useCallback, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    console.log('Fetching Books');
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch('https://www.dbooks.org/api/recent?delay=3');
      
      if(!response.ok) {
        throw new Error('Something went wrong!');  // We can throw a error
      }

      const data = await response.json();
      console.log(data);
      setBooks(data.books);
    } catch (error){
      setError(error.message);
      console.error('Error: ',error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]); 

  let content = <p>No book data found</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Fetching data... </p>;
  }

  if (books.length > 0) {
    content = <BookList books={books}/>
  }

  return (
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/

    <>
      <h1>Book World</h1>
      <div className="card">
        <button onClick={fetchBooks}>Fetch Books</button>
      </div>      
      <div className="book__list">
        {content}   
      </div>
    </>

  );
}

export default App;
