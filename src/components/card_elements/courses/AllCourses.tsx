import React, { useContext, useState, useMemo } from 'react';
import { SelectionContext } from "../../../context/SelectionContext.tsx";
import type { Course } from "../../../context/SelectionContext.tsx";
import CollapsibleSubtitle from "../CollapsibleSubtitle.tsx";
import Modal from "../../Modal.tsx";

const AllCourses: React.FC = () => {
    const { getOtherCoursesForStudy, addRelevantCourse, getCourses } = useContext(SelectionContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const currentCourseKeys = useMemo(() => {
        return new Set(getCourses().map(c => c.key));
    }, [getCourses]);

    const otherCourses = useMemo(() => {
        return getOtherCoursesForStudy().filter(course => !currentCourseKeys.has(course.key));
    }, [getOtherCoursesForStudy, currentCourseKeys]);

    const filteredCourses = useMemo(() => {
        if (!searchTerm) return otherCourses;
        return otherCourses.filter(course =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [otherCourses, searchTerm]);

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

    if (otherCourses.length === 0) {
        return null;
    }

    return (
        <>
            <CollapsibleSubtitle storageKey={"allcourses_collapsable"} defaultOpen={false} subtitle={"Weitere Kurse im Studiengang"}>
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
                            className="py-2 px-1 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCourseClick(course)}
                        >
                            {course.name}
                        </li>
                    ))}
                </ul>
            </CollapsibleSubtitle>
            {selectedCourse && (
                <Modal onClose={handleCloseModal}>
                    <div className="relative">
                        <button
                            className="absolute -top-4 -right-4 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">Kurs hinzufügen</h2>
                        <p className="mb-6">Möchtest du den Kurs "{selectedCourse.name}" zusätzlich belegen?</p>
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

export default AllCourses;