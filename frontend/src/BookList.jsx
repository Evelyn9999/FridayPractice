import BookListItem from './BookListItem';

import './BookList.css';

const BookList = ({books}) => {
  return (
    <div className='book__list'>
      {books?.map((p) => <BookListItem 
      key={p.id} 
      title={p.title}
      subtitle={p.subtitle}
      authors={p.authors}  
      image={p.image} 
      />)}
    </div>
  )
};

export default BookList;