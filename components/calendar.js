import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import React from 'react'
import { useState } from 'react'


export default function Scheduler(props) {
  console.log(props);

  const calendarRef = React.createRef();

  const [events, updateEvents] = useState([
    {
      id: '1',
      title: 'Mon activité',
      category: 'time',
      start: '2021-05-03T12:00:00',
      end: '2021-05-03T14:00:00',
      body: {
        title: 'body title'
      },
    },
    {
      id: '2',
      title: 'Mon autre activité',
      category: 'time',
      start: '2021-05-04T15:00:00',
      end: '2021-05-04T18:00:00',
      body: {
        title: 'body title'
      },
    },
  ])

  const handleBeforeUpdateSchedule = event => {
    const eventId = event.schedule.id

    let test = [
      {
        id: '1',
        title: 'Mon activité 2',
        category: 'time',
        start: '2021-05-03T12:00:00',
        end: '2021-05-03T14:00:00',
        body: {
          title: 'body title'
        },
      },
      {
        id: '2',
        title: 'Mon autre activité 2',
        category: 'time',
        start: '2021-05-04T15:00:00',
        end: '2021-05-04T18:00:00',
        body: {
          title: 'body title'
        },
      },
    ]

    for (event of test) {
      if (event.id === eventId) {
        event.title = 'new title'
      }
    }

    test.find(event => event.id === eventId).title = 'special title';

    setTimeout(() => {
      updateEvents(test)
    }, 500);
  };

  const [modalOpen, toggleModal] = useState(false)

  const handleClickPrevButton = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.prev();
  };

  const handleClickNextButton = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.next();
  };

  const handleBeforeCreateSchedule = event => {
    toggleModal(true)
    console.log(event);
  }

  const handleBeforeDeleteSchedule = event => {
    console.log(event);
  }

  const modalContent = () => {
    if (modalOpen) {
      return (
        <div className="modal">
          <label>Nom de l'activité</label>
          <input type="text" />
          <label>Personnes assignées</label>
          <select>
            <option value=""></option>
          </select>
          <label>Coût de l'activité</label>
          <input type="number"/>
          <label>Personnes qui ont payé</label>
          <select>
            <option value=""></option>
          </select>
        </div>
      )
    }
  }

  return (
    <div>
      <nav>
        <button onClick={handleClickPrevButton}>Prev</button>
        <button onClick={handleClickNextButton}>Next</button>
      </nav>
      {modalContent()}
      <Calendar
        ref={calendarRef}
        taskView={false}
        scheduleView={['time']}
        week={{
          startDayOfWeek: 1,
          daynames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        }}
        useCreationPopup={false}
        useDetailPopup={true}
        disableClick={true}
        template={{
          timegridDisplayPrimayTime(time) {
            return `${time.hour} h`;
          },
          popupDetailDate(isAllDay, start, end) {
            console.log(start, end);
            return `start: ${start._date.getTime()} \n end: ${end._date.getTime()}`
          },
          popupDetailBody(schedule) {
            return schedule.body.title
          },
        }}

        schedules={events}

        onBeforeUpdateSchedule={handleBeforeUpdateSchedule}
        onBeforeCreateSchedule={handleBeforeCreateSchedule}
        onBeforeDeleteSchedule={handleBeforeDeleteSchedule}
      />
    </div>
  )
};
