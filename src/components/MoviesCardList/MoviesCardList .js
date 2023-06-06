import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <>
      <ul className='card__list'>
        <MoviesCard />
      </ul>
      <button className='card__more button'>Ещё</button>
    </>
  );
}

export default MoviesCardList;
