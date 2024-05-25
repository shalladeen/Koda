import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];

export const calendarToolbar = {
  left: 'customToday',
  center: 'customPrev,customTitle,customNext',
  right: '',
};

export const calendarInitialView = 'dayGridMonth';
