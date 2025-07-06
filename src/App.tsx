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
import Sim from "./components/card_elements/courses/Sim.tsx";
import Calender from "./components/card_elements/calender/HTWCalender.tsx";
import Asta from "./components/card_elements/campus/Asta.tsx";
import Saarfahrplan from "./components/card_elements/campus/Saarfahrplan.tsx";
import TwoHeightContainer from "./components/layout/TwoHeightContainer.tsx";
import AllCourses from "./components/card_elements/courses/AllCourses.tsx";
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
                        <TwoHeightContainer>
                            <Card title={"Campusgeschehen"}>
                                <Mensa/>
                                <Raumservice/>
                                <HorizontalDivider/>
                                <Bibliothek/>
                                <Asta/>
                                <HorizontalDivider/>
                                <Saarfahrplan/>
                            </Card>
                            <Card title={"Webmail"}>
                                <MailList/>
                            </Card>
                        </TwoHeightContainer>
                        <Card title={"Deine Kurse"}>
                            <CourseList/>
                            <HorizontalDivider/>
                            <AllCourses/>
                            <Sim/>
                        </Card>
                        <Card title={"Kalender"}>
                            <Calender/>
                        </Card>
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