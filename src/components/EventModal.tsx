import React from 'react';

interface EventModalProps {
    event: any;
    onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
    if (!event) return null;

    const { title, start, end, description, extendedProps } = event;

    const handleNotRelevant = () => {
        const key = extendedProps?.seriesKey;
        if (!key) return;
        const notRelevant: string[] = JSON.parse(localStorage.getItem('notRelevantEvents') || '[]');
        if (!notRelevant.includes(key)) {
            notRelevant.push(key);
            localStorage.setItem('notRelevantEvents', JSON.stringify(notRelevant));
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw]">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="mb-1"><strong>Start:</strong> {new Date(start).toLocaleString()}</p>
                <p className="mb-1"><strong>End:</strong> {new Date(end).toLocaleString()}</p>
                {description && <p className="mb-1"><strong>Description:</strong> {description}</p>}
                {extendedProps && (
                    <div className="mb-2">
                        {extendedProps.lecturer && <p><strong>Lecturer:</strong> {extendedProps.lecturer}</p>}
                        {extendedProps.room && <p><strong>Room:</strong> {extendedProps.room}</p>}
                        {extendedProps.type && <p><strong>Type:</strong> {extendedProps.type}</p>}
                    </div>
                )}
                <div className="flex gap-2 mt-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        onClick={handleNotRelevant}
                    >
                        Not relevant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;