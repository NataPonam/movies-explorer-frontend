import React from 'react';
import './AboutProject.css';
import '../Section/Section.css';

function AboutProject() {
  return (
    <section className='project section' id='project'>
      <h2 className='project__title section__title'>О проекте</h2>
      <div className='project__wrapper'>
        <div className='project__container'>
          <h3 className='project__subtitle section__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='project__text section__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='project__container'>
          <h3 className='project__subtitle section__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='project__text section__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='project__time'>
        <h3 className='project__time-box project__time-box_green'>1 неделя</h3>
        <h3 className='project__time-box project__time-box_grey'>4 недели</h3>
        <p className='project__time-subtitle'>Back-end</p>
        <p className='project__time-subtitle'>Front-end</p>
      </div>
    </section>
  );
}
export default AboutProject;
