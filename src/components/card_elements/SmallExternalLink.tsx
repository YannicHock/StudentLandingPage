import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface SmallExternalLinkProps {
    subtitle: string;
    href: string;
}

const SmallExternalLink: React.FC<SmallExternalLinkProps> = ({ subtitle, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-xs font-medium text-blue-600 hover:underline"
    >
        {subtitle}
        <FiExternalLink className="ml-1" size={14} />
    </a>
);

export default SmallExternalLink;