import React from 'react';

const ThirdWidthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full h-full grid gap-6 grid-cols-3 grid-rows-1 bg-gray-100 p-4 rounded-lg shadow-md">
            {children}
        </div>
    );
};

export default ThirdWidthContainer;