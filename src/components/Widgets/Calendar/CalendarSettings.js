import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];

export const calendarToolbar = {
  left: 'prev,next today',
  center: 'customTitle',
  right: 'dayGridMonth,timeGridWeek,timeGridDay',
};

export const calendarInitialView = 'dayGridMonth';
