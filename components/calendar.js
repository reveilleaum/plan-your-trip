import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'

export default function Scheduler(props) {
  console.log(props);

  const handleBeforeCreateSchedule = (e) => {
    console.log(e);
  };

  return (
    <Calendar
      taskView={false}
      scheduleView={['time']}
      week={{
        startDayOfWeek: 1,
        daynames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      }}
      useCreationPopup={true}
      useDetailPopup={true}
      disableClick={true}
      template={{
        timegridDisplayPrimayTime(time) {
          return `${time.hour} h`;
        },
      }}
      schedules={[
        {
          id: '1',
          title: 'Mon activité',
          category: 'time',
          start: '2021-04-14T12:00:00',
          end: '2021-04-14T14:00:00'
        },
      ]}
      beforeCreateSchedule={handleBeforeCreateSchedule}
    />
  )
};
