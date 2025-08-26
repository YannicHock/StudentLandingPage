import React, { useContext } from 'react';
import { SelectionContext } from '../context/SelectionContext.tsx';
import { MdRefresh, MdDeleteForever } from 'react-icons/md';

const Header: React.FC = () => {
    const {
        selectionStudy,
        selectionSemester,
        setSelectionStudy,
        setSelectionSemester,
        getFriendlyStudyName,
        getFriendlySemesterName,
    } = useContext(SelectionContext);

    const handleResetSelection = () => {
        setSelectionSemester(null);
        localStorage.removeItem('userFieldOfStudy');
        localStorage.removeItem('userSemester');
    };

    const handleClearAllData = () => {
        setSelectionStudy(null);
        setSelectionSemester(null);

        localStorage.removeItem('userFieldOfStudy');
        localStorage.removeItem('userSemester');
        localStorage.removeItem('relevantEvents');
        localStorage.removeItem('notRelevantEvents');

        window.location.reload();
    };

    const friendlyStudyName = getFriendlyStudyName(selectionStudy);
    const friendlySemesterName = getFriendlySemesterName(selectionSemester);

    return (
        <header className="bg-blue-700 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="flex items-center space-x-3">
                    <img src="icon.svg" alt="Logo" className="h-8 w-8"/>
                    <h1 className="text-2xl font-bold">Student Landing Page</h1>
                </div>
                <nav className="flex items-center space-x-4">
                    <div className="text-xs text-gray-300 flex flex-col items-end">
                        {friendlyStudyName && <span>{friendlyStudyName}</span>}
                        {friendlySemesterName && <span>{friendlySemesterName}</span>}
                    </div>
                    <button
                        onClick={handleResetSelection}
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition"
                        title="Studienwahl und Semester zurücksetzen"
                    >
                        <MdRefresh size={18} />
                        <span>Semesterauswahl</span>
                    </button>
                    <button
                        onClick={handleClearAllData}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
                        title="Alle gespeicherten Daten löschen"
                    >
                        <MdDeleteForever size={18} />
                        <span>Alle Daten löschen</span>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;