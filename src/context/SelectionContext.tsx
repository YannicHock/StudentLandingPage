import React, { createContext, useState, useEffect } from 'react';

export const SelectionContext = createContext<{
    selectionStudy: string | null;
    selectionSemester: string | null;
    setSelectionStudy: (value: string | null) => void;
    setSelectionSemester: (value: string | null) => void;
    getFriendlyStudyName: (value: string | null) => string | null;
    getFriendlySemesterName: (value: string | null) => string | null;
}>({
    selectionStudy: null,
    selectionSemester: null,
    setSelectionStudy: () => {},
    setSelectionSemester: () => {},
    getFriendlyStudyName: () => null,
    getFriendlySemesterName: () => null,
});

const STORAGE_KEY_FIELD_OF_STUDY = 'userFieldOfStudy';
const STORAGE_KEY_SEMESTER = 'userSemester';

const STUDY_OPTIONS: Record<string, string> = {
    pib: 'Praktische Informatik (B.Sc.)',
    pim: 'Praktische Informatik (M.Sc.)',
    kib: 'Kommunikationsinformatik (B.Sc.)',
};

const SEMESTER_OPTIONS: Record<string, string> = {
    '1': '1. Fachsemester',
    '2': '2. Fachsemester',
    '3': '3. Fachsemester',
    '4': '4. Fachsemester',
};

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectionStudy, setSelectionStudy] = useState<string | null>(null);
    const [selectionSemester, setSelectionSemester] = useState<string | null>(null);

    useEffect(() => {
        const savedStudy = localStorage.getItem(STORAGE_KEY_FIELD_OF_STUDY);
        const savedSemester = localStorage.getItem(STORAGE_KEY_SEMESTER);
        if (savedStudy) setSelectionStudy(savedStudy);
        if (savedStudy && savedSemester) setSelectionSemester(savedSemester);
    }, []);

    const getFriendlyStudyName = (value: string | null): string | null => {
        return value ? STUDY_OPTIONS[value] || null : null;
    };

    const getFriendlySemesterName = (value: string | null): string | null => {
        return value ? SEMESTER_OPTIONS[value] || null : null;
    };

    return (
        <SelectionContext.Provider
            value={{
                selectionStudy,
                selectionSemester,
                setSelectionStudy,
                setSelectionSemester,
                getFriendlyStudyName,
                getFriendlySemesterName,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};