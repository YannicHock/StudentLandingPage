import React, { createContext, useState, useEffect } from 'react';

export interface Course {
    name: string;
    room: string;
    lecturer: string;
    moduldatenbankUrl: string;
    anmeldenUrl: string;
    pvl?: string;
    klausurdate: string;
    credits: number;
    hilfsmittel: string;
    key: string | number;
}

type CoursesData = {
    [fieldOfStudy: string]: {
        [semester: string]: Course[];
    };
};

export const SelectionContext = createContext<{
    selectionStudy: string | null;
    selectionSemester: string | null;
    setSelectionStudy: (value: string | null) => void;
    setSelectionSemester: (value: string | null) => void;
    getFriendlyStudyName: (value: string | null) => string | null;
    getFriendlySemesterName: (value: string | null) => string | null;
    getCourses: () => Course[];
}>({
    selectionStudy: null,
    selectionSemester: null,
    setSelectionStudy: () => {},
    setSelectionSemester: () => {},
    getFriendlyStudyName: () => null,
    getFriendlySemesterName: () => null,
    getCourses: () => [],
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
    const [coursesData, setCoursesData] = useState<CoursesData>({});

    useEffect(() => {
        const savedStudy = localStorage.getItem(STORAGE_KEY_FIELD_OF_STUDY);
        const savedSemester = localStorage.getItem(STORAGE_KEY_SEMESTER);
        if (savedStudy) setSelectionStudy(savedStudy);
        if (savedStudy && savedSemester) setSelectionSemester(savedSemester);
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/courses.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data: CoursesData = await response.json();
                setCoursesData(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const getFriendlyStudyName = (value: string | null): string | null => {
        return value ? STUDY_OPTIONS[value] || null : null;
    };

    const getFriendlySemesterName = (value: string | null): string | null => {
        return value ? SEMESTER_OPTIONS[value] || null : null;
    };

    const getCourses = (): Course[] => {
        if (!selectionStudy || !selectionSemester) return [];
        return (
            coursesData[selectionStudy]?.[selectionSemester] || []
        );
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
                getCourses,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};