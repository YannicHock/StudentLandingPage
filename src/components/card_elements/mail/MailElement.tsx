import React from 'react';

interface EmailCardProps {
    sender: string;
    subject: string;
    content: string;
    read: boolean;
    onClick?: () => void;
}

const EmailCard: React.FC<EmailCardProps> = ({ sender, subject, content, read, onClick }) => {
    return (
        <div
            className={`w-full bg-white shadow-md border border-gray-300 rounded-lg p-2 hover:bg-gray-100 cursor-pointer relative ${
                read ? 'opacity-75' : 'font-bold'
            }`}
            onClick={onClick}
        >
            {!read && (
                <span className="absolute top-2 right-2 text-blue-500">&#9679;</span>
            )}
            <div className="flex-1">
                <div className="text-xs text-gray-500 truncate">{sender}</div>
                <div className="text-sm font-semibold text-gray-800 truncate">{subject}</div>
                <div className="text-xs text-gray-600 mt-1 truncate">{content}</div>
            </div>
        </div>
    );
};

export default EmailCard;