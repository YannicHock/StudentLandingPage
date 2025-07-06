import React, {useContext, useState, useEffect} from 'react';
import FullCalendar from "@fullcalendar/react";
import type {EventClickArg, EventContentArg} from "@fullcalendar/core";
import type {DateClickArg} from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from '@fullcalendar/core/locales-all';
import {SelectionContext} from "../../../context/SelectionContext.tsx";
import EventModal from "./EventModal.tsx";
import AddEventModal from "./AddEventModal";

export interface CalendarEvent {
    id?: string;
    title: string;
    start: string;
    end: string;
    description?: string;
    extendedProps?: Record<string, unknown>;
}

const getCustomEvents = (): CalendarEvent[] => {
    return JSON.parse(localStorage.getItem('customEvents') || '[]');
};

const saveCustomEvent = (event: CalendarEvent) => {
    const events = getCustomEvents();
    const newEvent = {...event, id: crypto.randomUUID(), extendedProps: {...event.extendedProps, type: 'custom'}};
    events.push(newEvent);
    localStorage.setItem('customEvents', JSON.stringify(events));
};

const HTWCalender: React.FC = () => {
    const {getCalendarEvents} = useContext(SelectionContext);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addModalDate, setAddModalDate] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        if (!fullscreen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setFullscreen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [fullscreen]);

    const deleteCustomEvent = (event: CalendarEvent) => {
        const events = getCustomEvents();
        const updated = events.filter(e => e.id !== event.id);
        localStorage.setItem('customEvents', JSON.stringify(updated));
        setSelectedEvent(null);
        setRefresh(r => r + 1);
    };

    const handleEventClick = (arg: EventClickArg) => {
        setSelectedEvent(arg.event.extendedProps?.originalEvent || arg.event);
    };

    const eventClassNames = (arg: EventContentArg) => {
        const type = arg.event.extendedProps?.type;
        if (type === 'Klausur') return ['event-klausur'];
        if (type === 'Vorlesung') return ['event-vorlesung'];
        if (type?.toLowerCase().includes('übung')) return ['event-uebung'];
        if (type?.toLowerCase().includes('praktikum')) return ['event-praktikum'];
        if (type === 'custom') return ['event-custom'];
        return [];
    };

    const handleCloseModal = () => setSelectedEvent(null);

    const handleDateClick = (arg: DateClickArg) => {
        setAddModalDate(arg.dateStr);
        setShowAddModal(true);
    };

    const handleAddEvent = (event: CalendarEvent) => {
        saveCustomEvent(event);
        setShowAddModal(false);
        setRefresh(r => r + 1); // force re-render
    };

    const handleResetHiddenCourses = () => {
        localStorage.removeItem('notRelevantEvents');
        setRefresh(r => r + 1); // force re-render
    };

    // Merge custom events with context events
    const allEvents = [...getCalendarEvents(), ...getCustomEvents()];

    return (
        <div className={fullscreen ? "fixed inset-0 bg-transparent z-[9999] flex flex-col" : ""}>
            <div className={fullscreen? "flex justify-end mb-2 pr-4 pt-4" : "flex justify-end mb-2"}>
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 shadow"
                    onClick={() => setFullscreen(f => !f)}
                >
                    {fullscreen ? "Vollbild verlassen" : "Vollbild"}
                </button>
            </div>
            {fullscreen ? (
                <div className="flex-1 bg-white px-4 mx-4 pt-4 mt-8 flex flex-col">
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
                        events={allEvents}
                        locales={allLocales}
                        locale={'de'}
                        eventClick={handleEventClick}
                        dateClick={handleDateClick}
                        key={refresh}
                        height="-webkit-fill-available"
                    />
                </div>
            ) : (
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
                    events={allEvents}
                    locales={allLocales}
                    locale={'de'}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    key={refresh}
                    // Remove height="100%" here to let it size naturally
                />
            )}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={handleCloseModal}
                    onDeleteEvent={deleteCustomEvent}
                />
            )}
            {showAddModal && (
                <AddEventModal
                    initialDate={addModalDate}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddEvent}
                />
            )}
            <div className="mt-4 flex justify-end">
                <button
                    className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                    onClick={handleResetHiddenCourses}
                >
                    Verborgene Kurse zurücksetzen
                </button>
            </div>
        </div>
    );
};

export default HTWCalender;