import React from 'react';

const ThirdWidthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full min-h-screen md:h-full flex flex-col md:grid md:grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg shadow-md">
            {React.Children.toArray(children).map((child) => (
                <div className="flex-1">{child}</div>
            ))}
        </div>
    );
};

export default ThirdWidthContainer;