import React from 'react';

interface FullEmailViewProps {
    senderName: string;
    senderEmail: string;
    subject: string;
    content: string;
    cc?: string[];
    attachments?: string[];
    read?: boolean;
    onClose: () => void;
}

const FullEmailView: React.FC<FullEmailViewProps> = ({ senderName, senderEmail, subject, content, cc, attachments, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="flex justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">{subject}</h1>
                        <p className="text-sm text-gray-500">Von: {senderName} &lt;{senderEmail}&gt;</p>
                        {cc && cc.length > 0 && (
                            <p className="text-sm text-gray-500">CC: {cc.join(', ')}</p>
                        )}
                    </div>
                    {attachments && attachments.length > 0 && (
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold">Anhänge:</h2>
                            <ul className="list-disc list-inside text-gray-800">
                                {attachments.map((file, index) => (
                                    <li key={index}>{file}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="border-t border-gray-300 pt-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
                </div>
                <div className="border-t border-gray-300 pt-4 mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => alert('Reply functionality not implemented yet')}
                    >
                        Antworten
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FullEmailView;