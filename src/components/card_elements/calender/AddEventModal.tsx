import React, { useState } from 'react';
import type { CalendarEvent } from './HTWCalender';

interface AddEventModalProps {
    initialDate: string | null;
    onClose: () => void;
    onSave: (event: CalendarEvent) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ initialDate, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(initialDate || '');
    const [end, setEnd] = useState(initialDate || '');
    const [description, setDescription] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [room, setRoom] = useState('');
    const [allDay, setAllDay] = useState(false);

    const handleAllDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllDay(e.target.checked);
        if (e.target.checked) {
            // Remove time part for all-day events
            setStart(start ? start.slice(0, 10) : '');
            setEnd(end ? end.slice(0, 10) : '');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !start || !end) return;
        onSave({
            title,
            start: allDay ? start.slice(0, 10) : start,
            end: allDay ? end.slice(0, 10) : end,
            description,
            extendedProps: {
                type: 'custom',
                lecturer,
                room,
                allDay
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw]" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-2">Kalendereintrag hinzufügen</h2>
                <label className="block mb-2">
                    Title:
                    <input className="w-full border p-1" value={title} onChange={e => setTitle(e.target.value)} required />
                </label>
                <label className="block mb-2">
                    Ganztägig:
                    <input
                        type="checkbox"
                        className="ml-2"
                        checked={allDay}
                        onChange={handleAllDayChange}
                    />
                </label>
                <label className="block mb-2">
                    Start:
                    <input
                        className="w-full border p-1"
                        type={allDay ? "date" : "datetime-local"}
                        value={start}
                        onChange={e => setStart(e.target.value)}
                        required
                    />
                </label>
                <label className="block mb-2">
                    Ende:
                    <input
                        className="w-full border p-1"
                        type={allDay ? "date" : "datetime-local"}
                        value={end}
                        onChange={e => setEnd(e.target.value)}
                        required
                    />
                </label>
                <label className="block mb-2">
                    Beschreibung:
                    <input className="w-full border p-1" value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <label className="block mb-2">
                    Dozent:
                    <input className="w-full border p-1" value={lecturer} onChange={e => setLecturer(e.target.value)} />
                </label>
                <label className="block mb-2">
                    Raum:
                    <input className="w-full border p-1" value={room} onChange={e => setRoom(e.target.value)} />
                </label>
                <div className="flex gap-2 mt-4">
                    <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" onClick={onClose}>Abbrechen</button>
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Speichern</button>
                </div>
            </form>
        </div>
    );
};

export default AddEventModal;