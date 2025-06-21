import React, { useState } from 'react';

interface CollapsibleSubtitleProps {
    subtitle: string;
    children: React.ReactNode;
}

const CollapsibleSubtitle: React.FC<CollapsibleSubtitleProps> = ({ subtitle, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full">
            <div
                className="flex justify-between items-center cursor-pointer py-2 border-b border-gray-300"
                onClick={toggleCollapse}
            >
                <h3 className="text-lg font-semibold text-gray-800">{subtitle}</h3>
                <span className="text-gray-500">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="mt-2 text-gray-600">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSubtitle;