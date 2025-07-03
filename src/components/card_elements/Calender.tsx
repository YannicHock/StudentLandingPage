import React, { useContext, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from '@fullcalendar/core/locales-all';
import { SelectionContext } from "../../context/SelectionContext.tsx";
import EventModal from "../EventModal.tsx";

const ModulDatabase: React.FC = () => {
    const { getCalendarEvents } = useContext(SelectionContext);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    const handleEventClick = (arg: any) => {
        setSelectedEvent(arg.event.extendedProps?.originalEvent || arg.event);
    };

    const eventClassNames = (arg: any) => {
        const type = arg.event.extendedProps?.type;
        if (type === 'Klausur') return ['event-klausur'];
        if (type === 'Vorlesung') return ['event-vorlesung'];
        if (type?.toLowerCase().includes('übung')) return ['event-uebung'];
        if (type?.toLowerCase().includes('praktikum')) return ['event-praktikum'];
        return [];
    };

    const handleCloseModal = () => setSelectedEvent(null);

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'today,prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                eventClassNames={eventClassNames}
                slotMinTime="07:00:00"
                slotMaxTime="20:00:00"
                slotDuration="00:30:00"
                weekends={false}
                weekNumbers={true}
                events={getCalendarEvents()}
                locales={allLocales}
                locale={'de'}
                eventClick={handleEventClick}
            />
            {selectedEvent && (
                <EventModal event={selectedEvent} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default ModulDatabase;