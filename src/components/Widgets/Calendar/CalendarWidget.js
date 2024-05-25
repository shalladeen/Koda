import React, { useState, useEffect, useRef } from 'react';
import { Box, ChakraProvider, useDisclosure, useColorMode } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import { calendarPlugins, calendarToolbar, calendarInitialView } from './CalendarSettings';
import { loadEvents, addOrUpdateEvent, deleteEvent } from './CalendarEvents';
import CalendarEventList from './CalendarEventList';
import MonthYearPickerModal from './MonthYearPickerModal';
import CalendarEventModal from './CalendarEventModal';
import '../Calendar/CalendarStyle.css';
import moment from 'moment';

const CalendarWidget = ({ events, onAddOrUpdateEvent, onDeleteEvent }) => {
  const calendarRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isMonthYearPickerOpen, onOpen: onMonthYearPickerOpen, onClose: onMonthYearPickerClose } = useDisclosure();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { colorMode } = useColorMode();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  useEffect(() => {
    if (calendarRef.current && currentDate) {
      calendarRef.current.getApi().gotoDate(currentDate);
    }
  }, [currentDate]);

  const handleDateSelect = (selectInfo) => {
    setStartDate(moment(selectInfo.start).format('YYYY-MM-DD'));
    setEndDate(moment(selectInfo.end).subtract(1, 'days').format('YYYY-MM-DD'));
    setAllDay(selectInfo.allDay);
    setEventTitle('');
    setCurrentEvent(null);
    if (!selectInfo.allDay) {
      setStartTime(moment(selectInfo.start).format('HH:mm'));
      setEndTime(moment(selectInfo.end).format('HH:mm'));
    }
    onOpen();
  };

  const handleEventClick = (event) => {
    if (!event) {
      console.error('Event is undefined');
      return;
    }
    setCurrentEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay
    });
    setEventTitle(event.title);
    setAllDay(event.allDay);
    setStartDate(moment(event.start).format('YYYY-MM-DD'));
    setEndDate(event.end ? moment(event.end).format('YYYY-MM-DD') : moment(event.start).format('YYYY-MM-DD'));
    setStartTime(moment(event.start).format('HH:mm'));
    setEndTime(moment(event.end ? moment(event.end).format('HH:mm') : moment(event.start).format('HH:mm')));
    onOpen();
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
    onAddOrUpdateEvent(updatedEvent);
  };

  const handleEventResize = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
    onAddOrUpdateEvent(updatedEvent);
  };

  const saveEvent = () => {
    const newEvent = {
      id: currentEvent ? currentEvent.id : Date.now().toString(),
      title: eventTitle,
      start: allDay ? startDate : moment(startDate + 'T' + startTime).toISOString(),
      end: allDay ? moment(endDate).add(1, 'day').toISOString() : moment(endDate + 'T' + endTime).toISOString(),
      allDay: allDay,
    };
    onAddOrUpdateEvent(newEvent);
    onClose();
  };

  const handleDeleteEvent = () => {
    if (currentEvent && currentEvent.id) {
      onDeleteEvent(currentEvent.id);
      onClose();
    } else {
      console.error("No event selected or event ID is missing");
    }
  };

  const handleAddTodayEvent = () => {
    const today = moment().format('YYYY-MM-DD');
    setStartDate(today);
    setEndDate(today);
    setAllDay(true);
    setEventTitle('');
    setCurrentEvent(null);
    onOpen();
  };

  const handleAddUpcomingEvent = () => {
    const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
    setStartDate(tomorrow);
    setEndDate(tomorrow);
    setAllDay(true);
    setEventTitle('');
    setCurrentEvent(null);
    onOpen();
  };

  const handlePrev = () => {
    const newDate = moment(currentDate).subtract(1, 'month').toDate();
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = moment(currentDate).add(1, 'month').toDate();
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  const onMonthYearChange = ({ year, month }) => {
    const date = new Date(year, month, 1);
    setCurrentDate(date);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(date);
    }
    onMonthYearPickerClose();
  };

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();

    const handleDatesSet = (info) => {
      const newDate = new Date(info.start); 
      if (newDate.getTime() !== currentDate.getTime()) {
        setCurrentDate(newDate); 
      }
    };

    calendarApi.on('datesSet', handleDatesSet);

    return () => {
      calendarApi.off('datesSet', handleDatesSet);
    };
  }, [currentDate]);

  const customButtons = {
    customPrev: {
      text: '<',
      click: handlePrev,
    },
    customNext: {
      text: '>',
      click: handleNext
    },
    customToday: {
      text: 'Today',
      click: handleToday
    },
    customTitle: {
      text: moment(currentDate).format('MMMM YYYY'),
      click: () => onMonthYearPickerOpen(),
    }
  };

  const todaysEvents = events.filter(event => moment().isSame(event.start, 'day'));
  const upcomingEvents = events.filter(event => moment(event.start).isAfter(moment()));

  return (
    <ChakraProvider>
      <Box className={colorMode === 'dark' ? 'dark-mode' : ''} p={5} maxWidth="800px" mx="auto">
        <FullCalendar
          ref={calendarRef}
          plugins={calendarPlugins}
          initialView={calendarInitialView}
          headerToolbar={calendarToolbar}
          selectable
          editable
          selectMirror
          dayMaxEvents
          weekends
          events={events}
          select={handleDateSelect}
          eventClick={(clickInfo) => handleEventClick(clickInfo.event)}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          customButtons={customButtons}
        />
        <MonthYearPickerModal
          isOpen={isMonthYearPickerOpen}
          onClose={onMonthYearPickerClose}
          onChangeMonthYear={onMonthYearChange}
          currentDate={currentDate}
        />
        <CalendarEventModal
          isOpen={isOpen}
          onClose={onClose}
          title={currentEvent ? 'Edit Event' : 'Add New Event'}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          allDay={allDay}
          setAllDay={setAllDay}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onSave={saveEvent}
          onDelete={handleDeleteEvent}
          isEditing={!!currentEvent}
        />
      </Box>
    </ChakraProvider>
  );
};

export default CalendarWidget;
