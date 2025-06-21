import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="w-full h-full bg-white shadow-xl border border-gray-200 rounded-lg p-6 pt-0 flex flex-col overflow-y-scroll">
            <div className="sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 mt-6">{title}</h2>
                <hr className="border-gray-300" />
            </div>
            <div className="flex-grow pt-4">{children}</div>
        </div>
    );
};

export default Card;