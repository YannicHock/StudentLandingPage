import React, { useContext } from 'react';
import { SelectionContext } from '../context/SelectionContext';

const STUDY_OPTIONS = [
    { value: 'pib', label: 'Praktische Informatik (B.Sc.)' },
    { value: 'pim', label: 'Praktische Informatik (M.Sc.)' },
    { value: 'kib', label: 'Kommunikationsinformatik (B.Sc.)' },
];

const SEMESTER_OPTIONS: Record<string, { value: string; label: string }[]> = {
    pib: [
        { value: '2', label: '2. Fachsemester' },
        { value: '4', label: '4. Fachsemester' },
    ],
    pim: [
        { value: '1', label: '1. Fachsemester' },
        { value: '2', label: '2. Fachsemester' },
        { value: '3', label: '3. Fachsemester' },
        { value: '4', label: '4. Fachsemester' },
    ],
    kib: [
        { value: '1', label: '1. Fachsemester' },
        { value: '2', label: '2. Fachsemester' },
        { value: '3', label: '3. Fachsemester' },
        { value: '4', label: '4. Fachsemester' },
    ],
};

const SelectionPage: React.FC = () => {
    const { selectionStudy, selectionSemester, setSelectionStudy, setSelectionSemester } = useContext(SelectionContext);

    const handleFirstChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectionStudy(value);
        setSelectionSemester(null);
        localStorage.setItem('userFieldOfStudy', value);
        localStorage.removeItem('userSemester');
    };

    const handleSecondChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectionSemester(value);
        localStorage.setItem('userSemester', value);
    };

    const semesterOptions = selectionStudy && SEMESTER_OPTIONS[selectionStudy] ? SEMESTER_OPTIONS[selectionStudy] : [];

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Willkommen zur Auswahlseite</h1>
            <div className="w-full max-w-xs space-y-4">
                {!selectionStudy ? (
                    <select
                        defaultValue=""
                        onChange={handleFirstChange}
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" disabled>Bitte erste Auswahl treffen...</option>
                        {STUDY_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                ) : !selectionSemester ? (
                    <select
                        key={selectionStudy}
                        defaultValue=""
                        onChange={handleSecondChange}
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" disabled>Bitte zweite Auswahl treffen...</option>
                        {semesterOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                ) : (<></>)}
            </div>
        </div>
    );
};

export default SelectionPage;