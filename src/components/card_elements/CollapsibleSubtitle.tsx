import React, { useState, useEffect } from 'react';

interface CollapsibleSubtitleProps {
    subtitle: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    storageKey: string;
}

const CollapsibleSubtitle: React.FC<CollapsibleSubtitleProps> = ({
    subtitle,
    children,
    defaultOpen = false,
    storageKey,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) {
            setIsOpen(saved === 'true');
        }
    }, [storageKey]);

    const toggleCollapse = () => {
        setIsOpen((prev) => {
            localStorage.setItem(storageKey, (!prev).toString());
            return !prev;
        });
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