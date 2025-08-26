import {useContext} from 'react';
import {SelectionProvider, SelectionContext} from './context/SelectionContext';
import SelectionPage from './pages/SelectionPage';
import Header from './components/Header.tsx';
import Card from "./components/Card.tsx";
import ThirdWidthContainer from "./components/layout/ThirdWidthContainer.tsx";
import MailList from "./components/card_elements/mail/MailList.tsx";
import CourseList from "./components/card_elements/courses/CourseList.tsx";
import Raumservice from "./components/card_elements/campus/Raumservice.tsx";
import Bibliothek from "./components/card_elements/campus/Bibliothek.tsx";
import Mensa from "./components/card_elements/campus/Mensa.tsx";
import HorizontalDivider from "./components/HorizontalDivider.tsx";
import Calender from "./components/card_elements/calender/HTWCalender.tsx";
import Asta from "./components/card_elements/campus/Asta.tsx";
import Saarfahrplan from "./components/card_elements/campus/Saarfahrplan.tsx";
import TwoHeightContainer from "./components/layout/TwoHeightContainer.tsx";
import AllCourses from "./components/card_elements/courses/AllCourses.tsx";
import Wahlpflichtmodule from "./components/card_elements/courses/Wahlpflichtmodule.tsx";
function AppContent() {
    const {selectionStudy, selectionSemester} = useContext(SelectionContext);

    return (
        <>
            <Header/>
            <div className={"overflow-y-auto md:overflow-hidden"} style={{height: 'calc(100vh - 72px)'}}>
                {(!selectionStudy) ? (
                    <SelectionPage/>
                ) : (!selectionSemester) ? (
                    <SelectionPage/>
                ) : (
                    <ThirdWidthContainer>
                        <Card title={"Deine Kurse"}>
                            <CourseList/>
                            <Wahlpflichtmodule/>
                            <HorizontalDivider/>
                            <AllCourses/>
                        </Card>
                        <Card title={"Kalender"}>
                            <Calender/>
                        </Card>
                        <TwoHeightContainer>
                            <Card title={
                                <div className="relative w-full">
                                    <div className="text-center">Neue eMails</div>
                                    <a href="https://webmail.hiz-saarland.de" target={"_blank"} className="absolute right-0 top-1/2 -translate-y-1/2 mr-1 text-blue-500 hover:text-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            }>
                                <MailList/>
                            </Card>
                            <Card title={"Campusgeschehen"}>
                                <Mensa/>
                                <Raumservice/>
                                <HorizontalDivider/>
                                <Bibliothek/>
                                <Asta/>
                                <HorizontalDivider/>
                                <Saarfahrplan/>
                            </Card>
                        </TwoHeightContainer>
                    </ThirdWidthContainer>
                )}
            </div>
        </>
    );
}

function App() {
    return (
        <SelectionProvider>
            <AppContent/>
        </SelectionProvider>
    );
}

export default App;