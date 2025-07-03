import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import allLocales from '@fullcalendar/core/locales-all';

const ModulDatabase: React.FC = () => {
    const handleDateClick = (arg:any) => {
        alert(arg.dateStr)
    }

    const handleEventClick = (arg:any) => {
        console.log(arg)
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={[
                {title: 'event 1', date: '2025-07-07'},
                {title: 'event 2', date: '2025-07-08'}
            ]}
            locales={allLocales}
            locale={'de'}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
        />
    );
};

export default ModulDatabase;

