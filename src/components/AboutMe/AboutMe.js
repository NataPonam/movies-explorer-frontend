import './AboutMe.css';
import me from '../../images/me.jpg';

function AboutMe() {
  return (
    <section className='student section' id='student'>
      <h2 className='student__title section__title'>Студент</h2>
      <div className='student__container'>
        <div className='student__box'>
          <h3 className='student__subtitle'>Наталья</h3>
          <h4 className='student__info'>Фронтенд-разработчик, 36 лет</h4>
          <p className='student__text section__text'>
            Привет из Иркутска! После 15 лет работы в РЖД решила сменить
            деятельность и податься в IT. Начала издалека, с курсов по
            web-дизайну, после их успешного окончания появилась идея написать
            свой сайт с нуля, но для этого нужно было изучить программирование,
            поэтому следующим шагом в моем развитиии стал курс "Веб-разработчик"
            от ЯП. Теперь у меня есть полная уверенность, что я смогу воплотить
            свою идею в жизнь.
          </p>
          <a className='student__link link' href='https://github.com/NataPonam'>
            Github
          </a>
        </div>
        <div className='student__box'>
          <img className='student__img' src={me}></img>
        </div>
      </div>
    </section>
  );
}
export default AboutMe;
