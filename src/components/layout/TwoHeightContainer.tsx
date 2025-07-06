import React from 'react';

interface TwoHeightContainerProps {
    children: React.ReactNode;
}

const TwoHeightContainer: React.FC<TwoHeightContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-full gap-4">
            {React.Children.map(children, (child, idx) => (
                <div className="flex-1 overflow-hidden" key={idx}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default TwoHeightContainer;