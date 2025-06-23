import {useContext} from 'react';
import {SelectionProvider, SelectionContext} from './context/SelectionContext';
import SelectionPage from './pages/SelectionPage';
import Header from './components/Header.tsx';
import Card from "./components/Card.tsx";
import ThirdWidthContainer from "./components/layout/ThirdWidthContainer.tsx";
import MailList from "./components/card_elements/mail/MailList.tsx";
import Moodle from "./components/card_elements/courses/Moodle.tsx";
import PVL from "./components/card_elements/courses/PVL.tsx";
import Raumservice from "./components/card_elements/courses/Raumservice.tsx";
import Bibliothek from "./components/card_elements/campus/Bibliothek.tsx";
import Mensa from "./components/card_elements/campus/Mensa.tsx";
import HorizontalDivider from "./components/HorizontalDivider.tsx";
import ModulDatabase from "./components/card_elements/courses/ModuleDatabase.tsx";
import Sim from "./components/card_elements/campus/Sim.tsx";
import Calender from "./components/card_elements/Calender.tsx";
function AppContent() {
    const {selectionStudy, selectionSemester} = useContext(SelectionContext);

    return (
        <>
            <Header/>
            <div style={{height: 'calc(100vh - 72px)', overflow: 'auto'}}>
                {(!selectionStudy) ? (
                    <SelectionPage/>
                ) : (!selectionSemester) ? (
                    <SelectionPage/>
                ) : (
                    <ThirdWidthContainer>
                        <Card title={"Campusgeschehen"}>
                            <Mensa/>
                            <Bibliothek/>
                            <HorizontalDivider/>
                            <Sim/>
                        </Card>
                        <Card title={"Webmail"}>
                            <MailList/>
                        </Card>
                        <Card title={"Deine Kurse"}>
                            <Calender/>
                            <Moodle/>
                            <PVL/>
                            <Raumservice/>
                            <HorizontalDivider/>
                            <ModulDatabase/>
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