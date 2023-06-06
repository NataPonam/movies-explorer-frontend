import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer' id='footer'>
      <h4 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className='footer__box'>
        <p className='footer__copyright'>©&nbsp;{year}&nbsp;</p>
        <a
          href='https://practicum.yandex.ru/'
          className='footer__link link'
          target='_blank'
          rel='noreferrer'
        >
          Яндекс.Практикум
        </a>
        <a
          href='https://github.com/NataPonam'
          className='footer__link link'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
      </div>
    </footer>
  );
}
export default Footer;
