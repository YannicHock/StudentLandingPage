import React from 'react';

const HorizontalDivider: React.FC = () => {
    return (
        <div style={{
            height: '3px',
            width: '100%',
            backgroundColor: '#888',
            margin: '15px 0',
            borderRadius: '1.5px'
        }} />
    );
};

export default HorizontalDivider;