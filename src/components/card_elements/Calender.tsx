import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from '@fullcalendar/core/locales-all';

const ModulDatabase: React.FC = () => {
    const handleDateClick = (arg: { dateStr: string }) => {
        alert(arg.dateStr);
    };

    const handleEventClick = (arg: { event: any }) => {
        console.log(arg);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'today,prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            slotMinTime="07:00:00"
            slotMaxTime="20:00:00"
            slotDuration="00:30:00"
            weekends={false}
            weekNumbers={true}
            events={[
                {
                    title: 'event 1',
                    start: '2025-07-03T10:15:00',
                    end: '2025-07-03T11:30:00',
                    description: 'This is the first event',
                    extendedProps: {
                        location: 'Berlin',
                        organizer: 'John Doe'
                    },
                    display: "block",
                },
            ]}
            locales={allLocales}
            locale={'de'}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
        />
    );
};

export default ModulDatabase;