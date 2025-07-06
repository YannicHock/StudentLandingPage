import React, { useContext, useState, useMemo } from 'react';
import { SelectionContext } from "../../../context/SelectionContext.tsx";
import type { Course, Lecture } from "../../../context/SelectionContext.tsx";
import CollapsibleSubtitle from "../CollapsibleSubtitle.tsx";
import Modal from "../../Modal.tsx";

interface CourseListProps {
    title: string;
    courses: Course[];
    onCourseClick: (course: Course) => void;
    storageKey: string;
}

const CourseSubList: React.FC<CourseListProps> = ({ title, courses, onCourseClick, storageKey }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = useMemo(() => {
        if (!searchTerm) return courses;
        return courses.filter(course =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [courses, searchTerm]);

    if (courses.length === 0) {
        return null;
    }

    return (
        <CollapsibleSubtitle storageKey={storageKey} defaultOpen={false} subtitle={title}>
            <input
                type="text"
                placeholder="Kurse durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <ul className="list-none p-0 m-0 max-h-[250px] overflow-y-auto">
                {filteredCourses.map((course: Course) => (
                    <li
                        key={course.key}
                        className="py-2 px-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                        onClick={() => onCourseClick(course)}
                    >
                        <div className="font-semibold">{course.name}</div>
                        <div className="text-sm text-gray-600">
                            {course.credits} ECTS
                            {course.lectures && course.lectures.length > 0 && (
                                <>
                                    {' · '}
                                    {course.lectures.map((lecture: Lecture, index: number) => (
                                        <span key={index}>
                                            {lecture.day.substring(0, 2)}, {lecture.start} Uhr
                                            {index < (course.lectures?.length ?? 0) - 1 && ', '}
                                        </span>
                                    ))}
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </CollapsibleSubtitle>
    );
};


const Wahlpflichtmodule: React.FC = () => {
    const { getWahlpflichtmodule, addRelevantCourse, getCourses, selectionSemester } = useContext(SelectionContext);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const currentCourseKeys = useMemo(() => new Set(getCourses().map(c => c.key)), [getCourses]);

    const informatikWahlpflicht = useMemo(() => {
        return getWahlpflichtmodule('informatik').filter(course => !currentCourseKeys.has(course.key));
    }, [getWahlpflichtmodule, currentCourseKeys]);

    const nichtInformatikWahlpflicht = useMemo(() => {
        return getWahlpflichtmodule('nicht_informatik').filter(course => !currentCourseKeys.has(course.key));
    }, [getWahlpflichtmodule, currentCourseKeys]);

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
    };

    const handleConfirm = () => {
        if (selectedCourse) {
            addRelevantCourse(selectedCourse);
            setSelectedCourse(null);
        }
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    const relevantSemesters = ['4', '5', '6'];
    if (!selectionSemester || !relevantSemesters.includes(selectionSemester)) {
        return null;
    }

    return (
        <>
            <div className="mt-4">
                <CourseSubList
                    title="Informatik-spezifische Wahlpflichtmodule"
                    courses={informatikWahlpflicht}
                    onCourseClick={handleCourseClick}
                    storageKey="wp_info_collapsable"
                />
            </div>
            <div className="mt-4">
                <CourseSubList
                    title="Nicht-Informatik-spezifische Wahlpflichtmodule"
                    courses={nichtInformatikWahlpflicht}
                    onCourseClick={handleCourseClick}
                    storageKey="wp_noninfo_collapsable"
                />
            </div>

            {selectedCourse && (
                <Modal onClose={handleCloseModal}>
                    <div className="relative">
                        <button
                            className="absolute -top-4 -right-4 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">Wahlpflichtmodul hinzufügen</h2>
                        <p className="mb-4">Möchtest du das Modul "{selectedCourse.name}" zusätzlich belegen?</p>
                        {selectedCourse.moduldatenbankUrl && (
                            <div className="mb-6 text-center">
                                <a
                                    href={selectedCourse.moduldatenbankUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    Zur Moduldatenbank
                                </a>
                            </div>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Bestätigen
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default Wahlpflichtmodule;