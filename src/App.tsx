import {useContext} from 'react';
import {SelectionProvider, SelectionContext} from './context/SelectionContext';
import SelectionPage from './pages/SelectionPage';
import Header from './components/Header.tsx';
import Card from "./components/Card.tsx";
import ThirdWidthContainer from "./components/layout/ThirdWidthContainer.tsx";
import MailElement from "./components/card_elements/mail/MailElement.tsx";
import MailList from "./components/card_elements/mail/MailList.tsx";

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
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>3</p>
                        </Card>
                        <Card title={"Webmail"}>
                            <MailList/>
                        </Card>
                        <Card title={"Deine Kurse"}>
                            <p>3</p>
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