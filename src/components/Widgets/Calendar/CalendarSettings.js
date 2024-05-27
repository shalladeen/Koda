import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];

export const calendarToolbar = {
  left: 'customTitle',
  center: '',
  right: 'customPrev,customNext',
};

export const calendarInitialView = 'dayGridMonth';
