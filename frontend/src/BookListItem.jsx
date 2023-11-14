import './BookListItem.css';

const BookListItem = ({title, subtitle, authors, image}) => {

return (
    <li className="book__list-item">
      <img className="book__list-item__image" src={image}></img>
      <section className='book__list-item__section'>
        <h3>{title}</h3>
        <h3>{subtitle}</h3>
        <h3>{authors}</h3>
      </section>
    </li>
  )
};

export default BookListItem;