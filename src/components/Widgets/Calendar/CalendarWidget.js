import React, { useEffect, useRef, useState } from 'react';
import { Box, ChakraProvider, useDisclosure, useColorMode, VStack, HStack, Text, IconButton } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import FullCalendar from '@fullcalendar/react';
import { calendarPlugins, calendarToolbar, calendarInitialView } from './CalendarSettings';
import eventService from '../../../services/eventService';
import MonthYearPickerModal from './MonthYearPickerModal';
import CalendarEventModal from './CalendarEventModal';
import TodaysEvents from './TodaysEvents';
import UpcomingEventsWidget from './UpcomingEvents';
import '../Calendar/CalendarStyle.css';
import moment from 'moment';

const CalendarWidget = () => {
  const calendarRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isMonthYearPickerOpen, onOpen: onMonthYearPickerOpen, onClose: onMonthYearPickerClose } = useDisclosure();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { colorMode } = useColorMode();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await eventService.getEvents();
      setEvents(events.map(event => ({
        ...event,
        id: event._id,
        end: event.allDay ? moment(event.end).add(1, 'days').toISOString() : event.end
      })));
      console.log('Events after fetching:', events);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (calendarRef.current && currentDate) {
      calendarRef.current.getApi().gotoDate(currentDate);
    }
  }, [currentDate]);

  const handleDateSelect = (selectInfo) => {
    setStartDate(moment(selectInfo.start).format('YYYY-MM-DD'));
    setEndDate(selectInfo.end ? moment(selectInfo.end).subtract(1, 'days').format('YYYY-MM-DD') : moment(selectInfo.start).format('YYYY-MM-DD'));
    setAllDay(selectInfo.allDay);
    setEventTitle('');
    setCurrentEvent(null);
    if (!selectInfo.allDay) {
      setStartTime(moment(selectInfo.start).format('HH:mm'));
      setEndTime(moment(selectInfo.end).format('HH:mm'));
    } else {
      setStartTime('00:00');
      setEndTime('23:59');
    }
    onOpen();
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    if (!event) {
      console.error('Event is undefined');
      return;
    }
    console.log('Event clicked:', event);
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
    setEndDate(event.end ? moment(event.end).subtract(event.allDay ? 1 : 0, 'days').format('YYYY-MM-DD') : moment(event.start).format('YYYY-MM-DD'));
    setStartTime(event.allDay ? '00:00' : moment(event.start).format('HH:mm'));
    setEndTime(event.allDay ? '23:59' : (event.end ? moment(event.end).format('HH:mm') : '11:00'));
    onOpen();
  };

  const handleEventDrop = async (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.allDay ? moment(event.end).subtract(1, 'days').endOf('day').toISOString() : event.end,
      allDay: event.allDay,
    };
    console.log('Event dropped:', updatedEvent);
    try {
      await eventService.updateEvent(event.id, updatedEvent);
      const events = await eventService.getEvents();
      setEvents(events.map(event => ({
        ...event,
        id: event._id,
        end: event.allDay ? moment(event.end).add(1, 'days').toISOString() : event.end
      })));
      console.log('Events after update:', events);
    } catch (error) {
      console.error('Error updating event:', error.message);
    }
  };

  const handleEventResize = async (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.allDay ? moment(event.end).subtract(1, 'days').endOf('day').toISOString() : event.end,
      allDay: event.allDay,
    };
    console.log('Event resized:', updatedEvent);
    try {
      await eventService.updateEvent(event.id, updatedEvent);
      const events = await eventService.getEvents();
      setEvents(events.map(event => ({
        ...event,
        id: event._id,
        end: event.allDay ? moment(event.end).add(1, 'days').toISOString() : event.end
      })));
      console.log('Events after resize:', events);
    } catch (error) {
      console.error('Error updating event:', error.message);
    }
  };

  const saveEvent = async () => {
    const isSingleDayEvent = startDate === endDate;

    const newEvent = {
      title: eventTitle,
      start: allDay ? moment(startDate).startOf('day').toISOString() : moment(startDate + 'T' + startTime).toISOString(),
      end: allDay ? (isSingleDayEvent ? moment(startDate).endOf('day').toISOString() : moment(endDate).endOf('day').toISOString()) : moment(endDate + 'T' + endTime).toISOString(),
      allDay: allDay,
      userId: currentEvent ? currentEvent.userId : undefined
    };

    console.log('Saving event:', newEvent);

    try {
      if (currentEvent) {
        await eventService.updateEvent(currentEvent.id, newEvent);
      } else {
        const createdEvent = await eventService.createEvent(newEvent);
        console.log('Created event with ID:', createdEvent._id);
      }
      const events = await eventService.getEvents();
      setEvents(events.map(event => ({
        ...event,
        id: event._id,
        end: event.allDay ? moment(event.end).add(1, 'days').toISOString() : event.end
      })));
      onClose();
    } catch (error) {
      console.error('Error saving event:', error.message);
    }
  };

  const handleDeleteEvent = async () => {
    if (currentEvent && currentEvent.id) {
      console.log('Deleting event with ID:', currentEvent.id);
      try {
        await eventService.deleteEvent(currentEvent.id);
        const events = await eventService.getEvents();
        setEvents(events.map(event => ({
          ...event,
          id: event._id,
          end: event.allDay ? moment(event.end).add(1, 'days').toISOString() : event.end
        })));
        onClose();
      } catch (error) {
        console.error('Error deleting event:', error.message);
      }
    } else {
      console.error("No event selected or event ID is missing");
    }
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
      text: moment().format('ddd, MMM DD, YYYY'),
      click: handleToday
    },
    customTitle: {
      text: moment(currentDate).format('MMMM YYYY'),
      click: () => handleToday(),
    }
  };

  const todaysEvents = events.filter(event => {
    const start = moment(event.start).startOf('day');
    const end = event.allDay ? moment(event.end).subtract(1, 'days').endOf('day') : moment(event.end).endOf('day');
    return moment().isBetween(start, end, null, '[]');
  });

  return (
    <ChakraProvider>
      <Box className={colorMode === 'dark' ? 'dark-mode' : ''} p={5} maxWidth="800px" mx="auto">
        <HStack mb={4} justifyContent="flex-end">
          <Text fontSize="md">{moment().format('ddd, MMM DD, YYYY')}</Text>
          <IconButton
            icon={<CalendarIcon />}
            aria-label="Open Calendar"
            onClick={onMonthYearPickerOpen}
            variant="ghost"
            size="md"
          />
        </HStack>
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
          eventClick={handleEventClick}
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
          setAllDay={checked => {
            setAllDay(checked);
            if (checked) {
              setStartTime('00:00');
              setEndTime('23:59');
            } else {
              setStartTime('10:00');
              setEndTime('11:00');
            }
          }}
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
        <Box mt={4}>
          <TodaysEvents events={todaysEvents} />
          <UpcomingEventsWidget events={events} />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default CalendarWidget;
