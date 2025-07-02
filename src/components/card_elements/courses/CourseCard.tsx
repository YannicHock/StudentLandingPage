import React, {useState} from 'react';
import SmallExternalLink from "../SmallExternalLink.tsx";

interface CourseCardProps {
    name: string;
    room: string;
    lecturer: string;
    details: React.ReactNode;
    moduldatenbankUrl: string;
    anmeldenUrl: string;
    pvl?: string;
    klausurdate: string;
    credits: number;
    hilfsmittel: string;
    key: string | number;
}

const buttonBase =
    "absolute px-3 py-1 text-sm rounded border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-100 transition-colors";

const CourseCard: React.FC<CourseCardProps> = ({
                                                   name,
                                                   room,
                                                   lecturer,
                                                   moduldatenbankUrl,
                                                   anmeldenUrl,
                                                   pvl = "Keine",
                                                   klausurdate,
                                                   credits,
                                                   hilfsmittel,
                                                   key,
                                               }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={`relative w-full min-h-[140px] bg-blue-50 rounded-xl shadow-2xl border border-gray-300 flex flex-col items-center justify-center p-4 pt-12 pb-12 mx-auto backdrop-blur-sm  ${expanded ? "min-h-[220px]" : ""}`}>
            {/* Top right button */}
            <button className={`${buttonBase} top-2.5 right-2.5 z-10`}>
                <SmallExternalLink subtitle={"Moduldatenbank"} href={moduldatenbankUrl}/>
            </button>
            {/* Bottom left button */}
            <button
                className={`${buttonBase} bottom-2.5 left-2.5`}
                onClick={() => setExpanded((prev) => !prev)}
            >
                {expanded ? "Weniger Infos" : "Mehr Infos"}
            </button>
            {/* Bottom right button */}
            <button className={`${buttonBase} bottom-2.5 right-2.5`}>
                <SmallExternalLink subtitle={"Anmelden"} href={anmeldenUrl}/>
            </button>
            {/* Centered text */}
            <span className="text-center w-full text-base font-medium leading-tight">
                <span className="text-blue-800">{name}</span>
                <br/>
                <span className="text-gray-600 text-xs">Raum: {room}</span>
                <br/>
                <span className="text-gray-600 text-xs">Dozent: {lecturer}</span>
            </span>
            {/* Expanded content */}
            {expanded && (
                <div
                    className={`w-full text-xs text-gray-700 bg-white rounded shadow-inner p-2 border border-gray-200 max-w-full overflow-hidden ${expanded ? "mt-2 max-h-40" : "max-h-0"}`}
                    style={{zIndex: 1}}
                >
                    <dl className="grid grid-cols-1 gap-y-1">
                        <div className="flex justify-between">
                            <dt className="font-semibold">PVL:</dt>
                            <dd>{pvl}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="font-semibold">Klausurtermin:</dt>
                            <dd>{klausurdate}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="font-semibold">Credits:</dt>
                            <dd>{credits} ECTS</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="font-semibold">Hilfsmittel:</dt>
                            <dd>{hilfsmittel}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="font-semibold">Anmeldeschlüssel:</dt>
                            <dd>{key}</dd>
                        </div>
                    </dl>
                </div>
            )}
        </div>
    );
};

export default CourseCard;