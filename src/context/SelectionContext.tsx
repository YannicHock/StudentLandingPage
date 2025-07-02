import React, { createContext, useState, useEffect, useMemo } from 'react';

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

type OptionsData = {
    studyOptions: Record<string, string>;
    semesterOptions: Record<string, string>;
};

export const SelectionContext = createContext<{
    selectionStudy: string | null;
    selectionSemester: string | null;
    setSelectionStudy: (value: string | null) => void;
    setSelectionSemester: (value: string | null) => void;
    getFriendlyStudyName: (value: string | null) => string | null;
    getFriendlySemesterName: (value: string | null) => string | null;
    getCourses: () => Course[];
    studyOptions: Record<string, string>;
    semesterOptions: Record<string, string>;
}>({
    selectionStudy: null,
    selectionSemester: null,
    setSelectionStudy: () => {},
    setSelectionSemester: () => {},
    getFriendlyStudyName: () => null,
    getFriendlySemesterName: () => null,
    getCourses: () => [],
    studyOptions: {},
    semesterOptions: {},
});

const STORAGE_KEY_FIELD_OF_STUDY = 'userFieldOfStudy';
const STORAGE_KEY_SEMESTER = 'userSemester';

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectionStudy, setSelectionStudy] = useState<string | null>(null);
    const [selectionSemester, setSelectionSemester] = useState<string | null>(null);
    const [coursesData, setCoursesData] = useState<CoursesData>({});
    const [studyOptions, setStudyOptions] = useState<Record<string, string>>({});
    const [semesterOptions, setSemesterOptions] = useState<Record<string, string>>({});

    useEffect(() => {
        const savedStudy = localStorage.getItem(STORAGE_KEY_FIELD_OF_STUDY);
        const savedSemester = localStorage.getItem(STORAGE_KEY_SEMESTER);
        if (savedStudy) setSelectionStudy(savedStudy);
        if (savedStudy && savedSemester) setSelectionSemester(savedSemester);
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('courses.json');
                if (!response.ok) throw new Error('Failed to fetch courses');
                const data: CoursesData = await response.json();
                setCoursesData(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch('options.json');
                if (!response.ok) throw new Error('Failed to fetch options');
                const data: OptionsData = await response.json();
                setStudyOptions(data.studyOptions);
                setSemesterOptions(data.semesterOptions);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    // Only studies with at least one course
    const filteredStudyOptions = useMemo(() => {
        return Object.fromEntries(
            Object.entries(studyOptions).filter(([studyKey]) => {
                const semesters = coursesData[studyKey];
                if (!semesters) return false;
                return Object.values(semesters).some(coursesArr => coursesArr.length > 0);
            })
        );
    }, [studyOptions, coursesData]);

    // Only semesters with at least one course for the selected study
    const filteredSemesterOptions = useMemo(() => {
        if (!selectionStudy || !coursesData[selectionStudy]) return {};
        const semesters = coursesData[selectionStudy];
        return Object.fromEntries(
            Object.entries(semesterOptions).filter(([semKey]) => {
                const coursesArr = semesters[semKey];
                return coursesArr && coursesArr.length > 0;
            })
        );
    }, [semesterOptions, coursesData, selectionStudy]);

    const getFriendlyStudyName = (value: string | null): string | null => {
        return value ? studyOptions[value] || null : null;
    };

    const getFriendlySemesterName = (value: string | null): string | null => {
        return value ? semesterOptions[value] || null : null;
    };

    const getCourses = (): Course[] => {
        if (!selectionStudy || !selectionSemester) return [];
        return coursesData[selectionStudy]?.[selectionSemester] || [];
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
                studyOptions: filteredStudyOptions,
                semesterOptions: filteredSemesterOptions,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};