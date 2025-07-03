import React from 'react';

const ThirdWidthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full h-[300vh] md:h-full overflow-hidden flex flex-col md:grid md:grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg shadow-md">
            {React.Children.toArray(children).map((child, idx) => (
                <div className="flex-1 h-full overflow-hidden" key={idx}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default ThirdWidthContainer;