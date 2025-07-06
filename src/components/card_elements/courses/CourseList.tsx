import React, { useContext } from 'react';
import CollapsibleSubtitle from '../CollapsibleSubtitle';
import TwoWidthContainer from "../../layout/TwoWitdthContainer.tsx";
import { SelectionContext } from "../../../context/SelectionContext.tsx";
import CourseCard from "./CourseCard.tsx";

const CourseList: React.FC = () => {
    const { getCourses } = useContext(SelectionContext);
    const courses = getCourses();

    return (
        <CollapsibleSubtitle storageKey={"coursecolapsable"} defaultOpen={true} subtitle={"Kurse"}>
            <TwoWidthContainer>
                {courses.map((course: any) => (
                    <CourseCard {...course} key={course.key} courseKey={course.key} />
                ))}
            </TwoWidthContainer>
        </CollapsibleSubtitle>
    );
};

export default CourseList;