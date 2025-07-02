import React, { useContext } from 'react';
import { SelectionContext } from '../context/SelectionContext';

const SelectionPage: React.FC = () => {
    const {
        selectionStudy,
        selectionSemester,
        setSelectionStudy,
        setSelectionSemester,
        studyOptions,
        semesterOptions,
    } = useContext(SelectionContext);

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

    // Build semester options for the selected study
    const semesterOptionsArray = selectionStudy
        ? Object.entries(semesterOptions)
            .filter(([key]) => {
                // Only show semesters that exist for the selected study in coursesData
                // If you want to filter further, adjust here
                return true;
            })
            .map(([value, label]) => ({ value, label }))
        : [];

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
                        {Object.entries(studyOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
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
                        {semesterOptionsArray.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                ) : (<></>)}
            </div>
        </div>
    );
};

export default SelectionPage;