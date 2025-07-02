import React, { useContext } from 'react';
import CollapsibleSubtitle from '../CollapsibleSubtitle';
import CourseCard from "./CourseCard.tsx";
import TwoWidthContainer from "../../layout/TwoWitdthContainer.tsx";
import { SelectionContext } from "../../../context/SelectionContext.tsx";

const CourseList: React.FC = () => {
    const { getCourses } = useContext(SelectionContext);
    const courses = getCourses();

    return (
        <CollapsibleSubtitle defaultOpen={true} subtitle={"Kurse"}>
            <TwoWidthContainer>
                {courses.map((course: any) => (
                    <CourseCard {...course} key={course.key} />
                ))}
            </TwoWidthContainer>
        </CollapsibleSubtitle>
    );
};

export default CourseList;