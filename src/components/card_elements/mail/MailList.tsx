import React, { useState } from 'react';
import EmailCard from './MailElement';
import FullEmailView from './FullMailView';

const EmailList: React.FC = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emails, setEmails] = useState([
    {
        senderName: 'Professor Müller',
        senderEmail: 'mueller@university.de',
        subject: 'Raumänderung',
        content: 'Die morgige Vorlesung findet im Raum 204 statt, anstatt in Raum 101. Bitte beachten Sie diese Änderung.',
        cc: ['assistenz@university.de'],
        attachments: ['Vorlesungsplan.pdf']
    },
    {
        senderName: 'Universitätsverwaltung',
        senderEmail: 'verwaltung@university.de',
        subject: 'Erinnerung an Rückmeldung',
        content: 'Bitte stellen Sie sicher, dass Ihre Studiengebühren bis Ende des Monats bezahlt sind, um Verzögerungen zu vermeiden.',
        cc: [],
        attachments: []
    },
    {
        senderName: 'Bibliotheksdienst',
        senderEmail: 'bibliothek@university.de',
        subject: 'Überfällige Buchrückgabe',
        content: 'Das Buch "Einführung in Algorithmen" ist überfällig. Bitte geben Sie es so bald wie möglich zurück.',
        cc: ['student1@university.de', 'student2@university.de'],
        attachments: []
    },
    {
        senderName: 'Karrierezentrum',
        senderEmail: 'karriere@university.de',
        subject: 'Praktikumsmöglichkeiten',
        content: 'Entdecken Sie die neuesten Praktikumsmöglichkeiten in Ihrem Studienbereich.',
        cc: [],
        attachments: ['Praktikumsliste.pdf']
    },
    {
        senderName: 'Studierendenrat',
        senderEmail: 'studierendenrat@university.de',
        subject: 'Bevorstehendes Event: Hackathon',
        content: 'Nehmen Sie dieses Wochenende am jährlichen Hackathon teil. Preise für die besten Teams!',
        cc: ['team@university.de'],
        attachments: ['HackathonDetails.pdf', 'Anmeldeformular.pdf']
    },
    {
        senderName: 'IT-Support',
        senderEmail: 'support@university.de',
        subject: 'Systemwartungsbenachrichtigung',
        content: 'Das Universitätsportal wird am Samstag von 2 Uhr bis 6 Uhr wegen Wartungsarbeiten nicht verfügbar sein.',
        cc: [],
        attachments: []
    },
    {
        senderName: 'Kurskoordinator',
        senderEmail: 'koordinator@university.de',
        subject: 'Erinnerung an Abgabefrist',
        content: 'Vergessen Sie nicht, Ihre Aufgabe für "Datenstrukturen" bis Freitag einzureichen.',
        cc: ['professor@university.de'],
        attachments: ['Aufgabenbeschreibung.pdf']
    },
    {
        senderName: 'Sportverein',
        senderEmail: 'sport@university.de',
        subject: 'Wöchentlicher Trainingsplan',
        content: 'Der Trainingsplan für diese Woche wurde aktualisiert. Siehe die angehängte Datei.',
        cc: [],
        attachments: ['Trainingsplan.pdf']
    },
    {
        senderName: 'Studierendenservice',
        senderEmail: 'service@university.de',
        subject: 'Verfügbarkeit von Beratungsterminen',
        content: 'Neue Termine für Beratungssitzungen sind jetzt verfügbar. Buchen Sie noch heute Ihren Termin.',
        cc: ['beratung@university.de'],
        attachments: []
    },
    {
        senderName: 'Campus-Sicherheit',
        senderEmail: 'sicherheit@university.de',
        subject: 'Sicherheitswarnung',
        content: 'Bitte seien Sie vorsichtig im Bereich des Hauptparkplatzes aufgrund laufender Bauarbeiten.',
        cc: [],
        attachments: ['Sicherheitsrichtlinien.pdf']
    },
    {
        senderName: 'Projektleiter',
        senderEmail: 'projektleiter@university.de',
        subject: 'Projektabschlussbericht',
        content: 'Der Abschlussbericht des Projekts wurde fertiggestellt. Bitte überprüfen Sie die angehängten Dateien.',
        cc: ['team@university.de', 'supervisor@university.de'],
        attachments: [
            'Bericht.pdf',
            'Diagramm1.png',
            'Diagramm2.png',
            'Diagramm3.png',
            'Diagramm4.png',
            'Diagramm5.png',
            'Diagramm6.png',
            'Diagramm7.png',
            'Diagramm8.png',
            'Diagramm9.png',
            'Diagramm10.png'
        ]
    }
    ]);

    const handleEmailClick = (email: any) => {
        setSelectedEmail(email);
        setIsModalOpen(true);

        // Mark email as read
        setEmails(prevEmails =>
            prevEmails.map(e =>
                e === email ? { ...e, read: true } : e
            )
        );
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmail(null);
    };

    return (
        <div className="space-y-4">
            {emails.map((email, index) => (
                <EmailCard
                    key={index}
                    sender={email.senderName}
                    subject={email.subject}
                    content={email.content}
                    read={email.read}
                    onClick={() => handleEmailClick(email)}
                />
            ))}
            {isModalOpen && selectedEmail && (
                <FullEmailView
                    senderEmail={selectedEmail.senderEmail}
                    senderName={selectedEmail.senderName}
                    subject={selectedEmail.subject}
                    content={selectedEmail.content}
                    cc={selectedEmail.cc}
                    attachments={selectedEmail.attachments}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default EmailList;const emails = [
    {
        senderName: 'Professor Müller',
        senderEmail: 'mueller@university.de',
        subject: 'Raumänderung',
        content: 'Die morgige Vorlesung findet im Raum 204 statt, anstatt in Raum 101. Bitte beachten Sie diese Änderung.',
        cc: ['assistenz@university.de'],
        attachments: ['Vorlesungsplan.pdf']
    },
    {
        senderName: 'Universitätsverwaltung',
        senderEmail: 'verwaltung@university.de',
        subject: 'Erinnerung an Rückmeldung',
        content: 'Bitte stellen Sie sicher, dass Ihre Studiengebühren bis Ende des Monats bezahlt sind, um Verzögerungen zu vermeiden.',
        cc: [],
        attachments: []
    },
    {
        senderName: 'Bibliotheksdienst',
        senderEmail: 'bibliothek@university.de',
        subject: 'Überfällige Buchrückgabe',
        content: 'Das Buch "Einführung in Algorithmen" ist überfällig. Bitte geben Sie es so bald wie möglich zurück.',
        cc: ['student1@university.de', 'student2@university.de'],
        attachments: []
    },
    {
        senderName: 'Karrierezentrum',
        senderEmail: 'karriere@university.de',
        subject: 'Praktikumsmöglichkeiten',
        content: 'Entdecken Sie die neuesten Praktikumsmöglichkeiten in Ihrem Studienbereich.',
        cc: [],
        attachments: ['Praktikumsliste.pdf']
    },
    {
        senderName: 'Studierendenrat',
        senderEmail: 'studierendenrat@university.de',
        subject: 'Bevorstehendes Event: Hackathon',
        content: 'Nehmen Sie dieses Wochenende am jährlichen Hackathon teil. Preise für die besten Teams!',
        cc: ['team@university.de'],
        attachments: ['HackathonDetails.pdf', 'Anmeldeformular.pdf']
    },
    {
        senderName: 'IT-Support',
        senderEmail: 'support@university.de',
        subject: 'Systemwartungsbenachrichtigung',
        content: 'Das Universitätsportal wird am Samstag von 2 Uhr bis 6 Uhr wegen Wartungsarbeiten nicht verfügbar sein.',
        cc: [],
        attachments: []
    },
    {
        senderName: 'Kurskoordinator',
        senderEmail: 'koordinator@university.de',
        subject: 'Erinnerung an Abgabefrist',
        content: 'Vergessen Sie nicht, Ihre Aufgabe für "Datenstrukturen" bis Freitag einzureichen.',
        cc: ['professor@university.de'],
        attachments: ['Aufgabenbeschreibung.pdf']
    },
    {
        senderName: 'Sportverein',
        senderEmail: 'sport@university.de',
        subject: 'Wöchentlicher Trainingsplan',
        content: 'Der Trainingsplan für diese Woche wurde aktualisiert. Siehe die angehängte Datei.',
        cc: [],
        attachments: ['Trainingsplan.pdf']
    },
    {
        senderName: 'Studierendenservice',
        senderEmail: 'service@university.de',
        subject: 'Verfügbarkeit von Beratungsterminen',
        content: 'Neue Termine für Beratungssitzungen sind jetzt verfügbar. Buchen Sie noch heute Ihren Termin.',
        cc: ['beratung@university.de'],
        attachments: []
    },
    {
        senderName: 'Campus-Sicherheit',
        senderEmail: 'sicherheit@university.de',
        subject: 'Sicherheitswarnung',
        content: 'Bitte seien Sie vorsichtig im Bereich des Hauptparkplatzes aufgrund laufender Bauarbeiten.',
        cc: [],
        attachments: ['Sicherheitsrichtlinien.pdf']
    },
    {
        senderName: 'Projektleiter',
        senderEmail: 'projektleiter@university.de',
        subject: 'Projektabschlussbericht',
        content: 'Der Abschlussbericht des Projekts wurde fertiggestellt. Bitte überprüfen Sie die angehängten Dateien.',
        cc: ['team@university.de', 'supervisor@university.de'],
        attachments: [
            'Bericht.pdf',
            'Diagramm1.png',
            'Diagramm2.png',
            'Diagramm3.png',
            'Diagramm4.png',
            'Diagramm5.png',
            'Diagramm6.png',
            'Diagramm7.png',
            'Diagramm8.png',
            'Diagramm9.png',
            'Diagramm10.png'
        ]
    }
];