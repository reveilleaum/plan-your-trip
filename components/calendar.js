import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie"


export default function Scheduler(props) {
  const calendarRef = React.createRef();
  const [cookies] = useCookies(['token'])

  const handleBeforeCreateSchedule = event => {
    document.getElementById('modal').setAttribute('start', event.start._date)
    document.getElementById('modal').setAttribute('end', event.end._date)
    document.getElementById('modal').style.display = 'block'
    console.log(event);
  }

  const handleBeforeDeleteSchedule = event => {
    console.log(event);
  }

  const handleBeforeUpdateSchedule = event => {
    console.log(event);
  }

  const updateSchedule = () => {
    const activity_name = document.getElementById('activity_name').value
    const assigned_users = Array.from(document.getElementById('assigned_users').options).filter(option => option.selected)
    const expenses_total = document.getElementById('expenses_total').value
    const expenses_users = Array.from(document.getElementById('expenses_users').options).filter(option => option.selected)
    const start = document.getElementById('modal').getAttribute('start')
    const end = document.getElementById('modal').getAttribute('end')

    axios.post('http://localhost:3001/api/activity',
      {
        title: 'activity_name',
        category: 'time',
        start: '2021-08-20T11:00:00',
        end: '2021-08-20T16:00:00'
      },
      {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
        .then(res => {
          console.log(res);
          document.getElementById('modal').style.display = 'none'
        })
        .catch(err => {
          console.log(err);
        })
  };

  const handleClickPrevButton = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.prev();
  };
  const handleClickNextButton = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.next();
  };

  return (
    <div>

      <nav>
        <button onClick={handleClickPrevButton}>Prev</button>
        <button onClick={handleClickNextButton}>Next</button>
      </nav>

      <div id="modal" style={{display: 'none'}}>
        <label>Nom de l'activité</label>
        <input id="activity_name" type="text" />
        <label>Personnes assignées</label>
        <select id="assigned_users" multiple>
          {
            props.data.users.map((user, i) => (
              <option key={i} value={user.name}>{user.name}</option>
            ))
          }
        </select>
        <label>Coût de l'activité</label>
        <input id="expenses_total" type="number"/>
        <label>Personnes qui ont payé</label>
        <select id="expenses_users" multiple>
          {
            props.data.users.map((user, i) => (
              <option key={i} value={user.name}>{user.name}</option>
            ))
          }
        </select>
        <button onClick={updateSchedule}>Valider</button>
      </div>

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

        schedules={props.data.trip.activities}

        onBeforeUpdateSchedule={handleBeforeUpdateSchedule}
        onBeforeCreateSchedule={handleBeforeCreateSchedule}
        onBeforeDeleteSchedule={handleBeforeDeleteSchedule}
      />

    </div>
  )
};
