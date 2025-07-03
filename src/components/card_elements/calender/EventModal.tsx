import React from 'react';
import type {CalendarEvent} from './HTWCalender';

interface EventModalProps {
    event: CalendarEvent;
    onClose: () => void;
    onDeleteEvent?: (event: CalendarEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({event, onClose, onDeleteEvent}) => {
    if (!event) return null;

    const {title, start, end, description, extendedProps = {}} = event;
    const isCustom = extendedProps?.type === 'custom';
    const isAllDay = !!extendedProps?.allDay;

    const handleNotRelevant = () => {
        const key = extendedProps?.seriesKey;
        if (!key && !isCustom) return;
        if (isCustom) {
            const customKey = `custom_${title}_${start}_${end}`;
            const notRelevant: string[] = JSON.parse(localStorage.getItem('notRelevantEvents') || '[]');
            if (!notRelevant.includes(customKey)) {
                notRelevant.push(customKey);
                localStorage.setItem('notRelevantEvents', JSON.stringify(notRelevant));
            }
        } else if (typeof key === 'string') {
            const notRelevant: string[] = JSON.parse(localStorage.getItem('notRelevantEvents') || '[]');
            if (!notRelevant.includes(key)) {
                notRelevant.push(key);
                localStorage.setItem('notRelevantEvents', JSON.stringify(notRelevant));
            }
        }
        onClose();
    };

    const handleMarkRelevant = () => {
        const key = extendedProps?.seriesKey;
        if (!key && !isCustom) return;
        if (isCustom) {
            const customKey = `custom_${title}_${start}_${end}`;
            const relevant: string[] = JSON.parse(localStorage.getItem('relevantEvents') || '[]');
            if (!relevant.includes(customKey)) {
                relevant.push(customKey);
                localStorage.setItem('relevantEvents', JSON.stringify(relevant));
            }
        } else if (typeof key === 'string') {
            const relevant: string[] = JSON.parse(localStorage.getItem('relevantEvents') || '[]');
            if (!relevant.includes(key)) {
                relevant.push(key);
                localStorage.setItem('relevantEvents', JSON.stringify(relevant));
            }
        }
        onClose();
    };

    const handleDelete = () => {
        if (onDeleteEvent) {
            onDeleteEvent(event);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw]">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="mb-1">
                    <strong>Start:</strong>{" "}
                    {isAllDay
                        ? new Date(start).toLocaleDateString("de-DE")
                        : new Date(start).toLocaleString("de-DE")}
                </p>
                <p className="mb-1">
                    <strong>Ende:</strong>{" "}
                    {isAllDay
                        ? new Date(end).toLocaleDateString("de-DE")
                        : new Date(end).toLocaleString("de-DE")}
                </p>
                {description && <p className="mb-1"><strong>Beschreibung:</strong> {description}</p>}
                {extendedProps && (
                    <div className="mb-2">
                        {typeof extendedProps.lecturer === 'string' && (
                            <p><strong>Dozent:</strong> {extendedProps.lecturer}</p>
                        )}
                        {typeof extendedProps.room === 'string' && (
                            <p><strong>Raum:</strong> {extendedProps.room}</p>
                        )}
                        {typeof extendedProps.type === 'string' && !isCustom && (
                            <p><strong>Typ:</strong> {extendedProps.type}</p>
                        )}
                        {isAllDay && (
                            <p><strong>Ganztägig:</strong> Ja</p>
                        )}
                    </div>
                )}

                <div className="flex gap-2 mt-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Schließen
                    </button>
                    {!isCustom && (
                        <>
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                onClick={handleNotRelevant}
                            >
                                Verbergen
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                onClick={handleMarkRelevant}
                            >
                                Semesterübergreifend anzeigen
                            </button>
                        </>
                    )}
                    {isCustom && onDeleteEvent && (
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            onClick={handleDelete}
                        >
                            Löschen
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventModal;