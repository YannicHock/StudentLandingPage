import React from 'react';
import {FiExternalLink} from "react-icons/fi";

interface ExternalLinkProps {
    subtitle: string,
    href: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({subtitle, href}) => {
    return (
        <h3 className="text-lg font-semibold text-gray-800">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
        <span style={{display: 'inline-flex', alignItems: 'center'}}>
            {subtitle}
            <FiExternalLink style={{marginLeft: 4}}/>
        </span>
            </a>
        </h3>
    );
};

export default ExternalLink;