import React from 'react';

interface TwoWidthContainerProps {
    children: React.ReactNode;
}

const TwoWidthContainer: React.FC<TwoWidthContainerProps> = ({ children }) => (
    <div className="flex flex-wrap -mx-2">
        {React.Children.map(children, (child, idx) => (
            <div className="w-full xl:w-1/2 px-2 mb-4" key={idx}>
                {child}
            </div>
        ))}
    </div>
);

export default TwoWidthContainer;