import React from 'react';
import CollapsibleSubtitle from '../CollapsibleSubtitle';
import ExternalLink from "../ExternalLink.tsx";

const Saarfahrplan: React.FC = () => {
    return (
        <ExternalLink subtitle={"Saarfahrplan"} href={"https://saarfahrplan.de/"}/>
    );
};

export default Saarfahrplan;