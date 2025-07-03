import React, {createContext, useState, useEffect, useMemo} from 'react';

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
    lectures?: Lecture[];
}

export interface Lecture {
    day: string;
    start: string;
    duration: string;
    room?: string;
    type?: string;
}

export interface CalendarEvent {
    title: string;
    start: string;
    end: string;
    description?: string;
    extendedProps?: Record<string, unknown>;
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
    getCalendarEvents: () => CalendarEvent[];
    studyOptions: Record<string, string>;
    semesterOptions: Record<string, string>;
}>({
    selectionStudy: null,
    selectionSemester: null,
    setSelectionStudy: () => {
    },
    setSelectionSemester: () => {
    },
    getFriendlyStudyName: () => null,
    getFriendlySemesterName: () => null,
    getCourses: () => [],
    getCalendarEvents: () => [],
    studyOptions: {},
    semesterOptions: {},
});

const STORAGE_KEY_FIELD_OF_STUDY = 'userFieldOfStudy';
const STORAGE_KEY_SEMESTER = 'userSemester';

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
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

    const filteredStudyOptions = useMemo(() => {
        return Object.fromEntries(
            Object.entries(studyOptions).filter(([studyKey]) => {
                const semesters = coursesData[studyKey];
                if (!semesters) return false;
                return Object.values(semesters).some(coursesArr => coursesArr.length > 0);
            })
        );
    }, [studyOptions, coursesData]);

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

    function parseGermanDate(dateStr: string): Date | null {
        const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(dateStr);
        if (!match) return null;
        const [, day, month, year] = match;
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    const getCalendarEvents = (): CalendarEvent[] => {
        const courses = getCourses();
        const events: CalendarEvent[] = [];
        const startDate = new Date('2025-04-01');
        const endDate = new Date('2025-07-18');

        const notRelevant: string[] = JSON.parse(localStorage.getItem('notRelevantEvents') || '[]');
        const relevant: string[] = JSON.parse(localStorage.getItem('relevantEvents') || '[]');

        const dayMap: Record<string, number> = {
            'Montag': 1, 'Dienstag': 2, 'Mittwoch': 3, 'Donnerstag': 4, 'Freitag': 5, 'Samstag': 6, 'Sonntag': 0
        };

        // Helper to add an event if not already present (avoid duplicates)
        const addEvent = (event: CalendarEvent) => {
            if (!events.some(e => e.extendedProps?.seriesKey === event.extendedProps?.seriesKey && e.start === event.start)) {
                events.push(event);
            }
        };

        // 1. Add all relevant events from all courses (across all semesters/studies)
        Object.values(coursesData).forEach(semesters =>
            Object.values(semesters).forEach(coursesArr =>
                coursesArr.forEach(course => {
                    // Klausur
                    let examDate: Date | null = null;
                    if (course.klausurdate) {
                        examDate = parseGermanDate(course.klausurdate) || new Date(course.klausurdate);
                    }
                    if (examDate && !isNaN(examDate.getTime())) {
                        examDate.setHours(9, 0, 0, 0);
                        const examEnd = new Date(examDate);
                        examEnd.setHours(12, 0, 0, 0);
                        const seriesKey = `${course.key}_Klausur_${examDate.toISOString().slice(0, 10)}`;
                        if (relevant.includes(seriesKey)) {
                            addEvent({
                                title: `Klausur: ${course.name} (${course.room})`,
                                start: examDate.toISOString().slice(0, 16),
                                end: examEnd.toISOString().slice(0, 16),
                                description: `Klausur für ${course.name} im Raum ${course.room}`,
                                extendedProps: {
                                    lecturer: course.lecturer,
                                    room: course.room,
                                    type: 'Klausur',
                                    seriesKey,
                                }
                            });
                        }
                    }
                    // Lectures
                    if (Array.isArray(course.lectures)) {
                        course.lectures.forEach((lecture: Lecture) => {
                            const first = new Date(startDate);
                            const targetDay = dayMap[lecture.day];
                            const dayDiff = (targetDay + 7 - first.getDay()) % 7;
                            first.setDate(first.getDate() + dayDiff);

                            const [hour, minute] = lecture.start.split(':').map(Number);
                            const seriesKey = `${course.key}_${lecture.type}_${lecture.day}_${lecture.start}`;
                            if (relevant.includes(seriesKey)) {
                                for (
                                    let d = new Date(first);
                                    d <= endDate;
                                    d.setDate(d.getDate() + 7)
                                ) {
                                    const start = new Date(d);
                                    start.setHours(hour, minute, 0, 0);

                                    const end = new Date(start);
                                    end.setMinutes(end.getMinutes() + Number(lecture.duration));

                                    addEvent({
                                        title: `${course.name} (${lecture.room || course.room})`,
                                        start: start.toISOString().slice(0, 16),
                                        end: end.toISOString().slice(0, 16),
                                        description: `${course.name} (${lecture.room || course.room})`,
                                        extendedProps: {
                                            lecturer: course.lecturer,
                                            room: lecture.room || course.room,
                                            type: lecture.type,
                                            seriesKey,
                                        }
                                    });
                                }
                            }
                        });
                    }
                })
            )
        );

        // 2. Add normal events for current selection, unless not relevant or already added
        courses.forEach(course => {
            // Klausur
            let examDate: Date | null = null;
            if (course.klausurdate) {
                examDate = parseGermanDate(course.klausurdate) || new Date(course.klausurdate);
            }
            if (examDate && !isNaN(examDate.getTime())) {
                examDate.setHours(9, 0, 0, 0);
                const examEnd = new Date(examDate);
                examEnd.setHours(12, 0, 0, 0);
                const seriesKey = `${course.key}_Klausur_${examDate.toISOString().slice(0, 10)}`;
                if (!notRelevant.includes(seriesKey) && !relevant.includes(seriesKey)) {
                    addEvent({
                        title: `Klausur: ${course.name} (${course.room})`,
                        start: examDate.toISOString().slice(0, 16),
                        end: examEnd.toISOString().slice(0, 16),
                        description: `Klausur für ${course.name} im Raum ${course.room}`,
                        extendedProps: {
                            lecturer: course.lecturer,
                            room: course.room,
                            type: 'Klausur',
                            seriesKey,
                        }
                    });
                }
            }
            // Lectures
            if (Array.isArray(course.lectures)) {
                course.lectures.forEach((lecture: Lecture) => {
                    const first = new Date(startDate);
                    const targetDay = dayMap[lecture.day];
                    const dayDiff = (targetDay + 7 - first.getDay()) % 7;
                    first.setDate(first.getDate() + dayDiff);

                    const [hour, minute] = lecture.start.split(':').map(Number);
                    const seriesKey = `${course.key}_${lecture.type}_${lecture.day}_${lecture.start}`;
                    if (notRelevant.includes(seriesKey) || relevant.includes(seriesKey)) return;
                    for (
                        let d = new Date(first);
                        d <= endDate;
                        d.setDate(d.getDate() + 7)
                    ) {
                        const start = new Date(d);
                        start.setHours(hour, minute, 0, 0);

                        const end = new Date(start);
                        end.setMinutes(end.getMinutes() + Number(lecture.duration));

                        addEvent({
                            title: `${course.name} (${lecture.room || course.room})`,
                            start: start.toISOString().slice(0, 16),
                            end: end.toISOString().slice(0, 16),
                            description: `${course.name} (${lecture.room || course.room})`,
                            extendedProps: {
                                lecturer: course.lecturer,
                                room: lecture.room || course.room,
                                type: lecture.type,
                                seriesKey,
                            }
                        });
                    }
                });
            }
        });

        return events;
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
                getCalendarEvents,
                studyOptions: filteredStudyOptions,
                semesterOptions: filteredSemesterOptions,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};