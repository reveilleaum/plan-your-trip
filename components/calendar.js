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

  const activities = props.data.activities.filter(activity => activity.trip_id === props.data.trip._id)

  const handleBeforeCreateSchedule = event => {
    document.getElementById('modal').setAttribute('action', 'create')
    document.getElementById('modal').setAttribute('start', event.start._date)
    document.getElementById('modal').setAttribute('end', event.end._date)
    document.getElementById('modal').style.display = 'block'
  }

  const handleBeforeUpdateSchedule = event => {
    document.getElementById('modal').setAttribute('action', 'update')
    document.getElementById('modal').setAttribute('activity_id', event.schedule.id)

    if (event.target) {
      document.getElementById('modal').setAttribute('start', event.schedule.start._date)
      document.getElementById('modal').setAttribute('end', event.schedule.end._date)
      document.getElementById('modal').style.display = 'block'
    } else {
      document.getElementById('modal').setAttribute('start', event.start._date)
      document.getElementById('modal').setAttribute('end', event.end._date)
      updateActivities()
    }
  }

  const handleBeforeDeleteSchedule = event => {
    axios.delete(`http://localhost:3001/api/activity/${event.schedule.id}`,
      {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
  }

  const formatDate = (date) => {
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    const day = new Date(date).getDate()
    const hour = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:00`
  }

  const updateActivities = () => {
    const action = document.getElementById('modal').getAttribute('action')
    const activity_id = document.getElementById('modal').getAttribute('activity_id')
    const start = document.getElementById('modal').getAttribute('start')
    const end = document.getElementById('modal').getAttribute('end')
    const activity_name = document.getElementById('activity_name').value
    const assigned_users = Array.from(document.getElementById('assigned_users').options).filter(option => option.selected).map(user => user.attributes.user_id.value)
    const expenses_total = document.getElementById('expenses_total').value
    const expenses_users = Array.from(document.getElementById('expenses_users').options).filter(option => option.selected).map(user => user.attributes.user_id.value)


    if (action === 'create') {
      axios.post('http://localhost:3001/api/activity',
        {
          trip_id: props.data.trip._id,
          title: activity_name,
          category: 'time',
          start: formatDate(start),
          end: formatDate(end),
          body: {
            assigned_users,
            expenses_total,
            expenses_users
          }
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
    }
    if (action === 'update') {
      axios.put(`http://localhost:3001/api/activity/${activity_id}`,
        {
          title: activity_name ? activity_name : activities.filter(activity => activity.id === activity_id).title,
          start: formatDate(start),
          end: formatDate(end),
          body: {
            assigned_users: assigned_users.length > 0 ? assigned_users : activities.filter(activity => activity.id === activity_id)[0].body.assigned_users,
            expenses_total: expenses_total ? expenses_total : activities.filter(activity => activity.id === activity_id)[0].body.expenses_total,
            expenses_users: expenses_users.length > 0 ? expenses_users : activities.filter(activity => activity.id === activity_id)[0].body.expenses_users
          }
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
    }
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
              <option key={i} user_id={user._id} value={user.name}>{user.name}</option>
            ))
          }
        </select>
        <label>Coût de l'activité</label>
        <input id="expenses_total" type="number"/>
        <label>Personnes qui ont payé</label>
        <select id="expenses_users" multiple>
          {
            props.data.users.map((user, i) => (
              <option key={i} user_id={user._id} value={user.name}>{user.name}</option>
            ))
          }
        </select>
        <button onClick={updateActivities}>Valider</button>
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
          // popupDetailDate(isAllDay, start, end) {
          //   console.log(start, end);
          //   return `
          //     <div>start: ${start._date.getHours()}</div>
          //     <div>end: ${end._date.getHours()}</div>
          //   `
          // },
          popupDetailBody(schedule) {
            return `
              <div>${schedule.title}</div>
              <div>${schedule.body.expenses_total}€</div>
            `
          },
        }}

        schedules={activities}

        onBeforeUpdateSchedule={handleBeforeUpdateSchedule}
        onBeforeCreateSchedule={handleBeforeCreateSchedule}
        onBeforeDeleteSchedule={handleBeforeDeleteSchedule}
      />

    </div>
  )
};
