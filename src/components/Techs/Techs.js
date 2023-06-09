import React from 'react';
import './Techs.css';
import '../Section/Section.css';

function Techs() {
  return (
    <section className='techs section' id='techs'>
      <h2 className='techs__title section__title'>Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__text section__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li className='techs__list_item'>HTML</li>
        <li className='techs__list_item'>CSS</li>
        <li className='techs__list_item'>JS</li>
        <li className='techs__list_item'>React</li>
        <li className='techs__list_item'>Git</li>
        <li className='techs__list_item'>Express.js</li>
        <li className='techs__list_item'>mongoDB</li>
      </ul>
    </section>
  );
}
export default Techs;
