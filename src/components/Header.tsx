import React, {useContext} from 'react';
import {SelectionContext} from '../context/SelectionContext.tsx';
import {MdRefresh} from 'react-icons/md';

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
        setSelectionStudy(null);
        setSelectionSemester(null);
        localStorage.removeItem('userFieldOfStudy');
        localStorage.removeItem('userSemester');
    };

    const friendlyStudyName = getFriendlyStudyName(selectionStudy);
    const friendlySemesterName = getFriendlySemesterName(selectionSemester);

    return (
        <header className="bg-blue-700 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="flex items-center space-x-3">
                    <img src="/icon.svg" alt="Logo" className="h-8 w-8"/>
                    <h1 className="text-2xl font-bold">Student Landing Page</h1>
                </div>
                <nav className="flex items-center space-x-4">
                    <ul className="flex space-x-4 border-r border-l border-gray-400 pr-8 mr-8 pl-8">
                        <li>
                            <a href="/public" className="hover:underline">Home</a>
                        </li>
                    </ul>
                    <div className="text-xs text-gray-300 flex flex-col items-end">
                        {friendlyStudyName && <span>{friendlyStudyName}</span>}
                        {friendlySemesterName && <span>{friendlySemesterName}</span>}
                    </div>
                    <button
                        onClick={handleResetSelection}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        title="Studienwahl und Semester zurücksetzen"
                    >
                        <MdRefresh size={20}/>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;