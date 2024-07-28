import Microphone from "./Microphone"
import Talk from "./Talk"
import Gemini from "./Gemini";

import "../styles/Home.css"
import noteicon from "../icons/newnote.png"
import lupaicon from "../icons/lupa.png"

import { useEffect, useState } from "react";

const Home = () => {

    const [loadingPage, setLoadingPage] = useState(true);
    const [err, setErr] = useState(false);
    //Hooks y funciones para la interacción con el micrófono
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [listen, setListen] = useState(false);
    const [stopListening, setStopListening] = useState(false);
    //Hooks de el sistema para hablar
    const [talk, setTalk] = useState(false);
    const [talking, setTalking] = useState(false);
    const [message, setMessage] = useState("");
    //Hooks para controlar a gemini
    const [search, setSearch] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [normalResponse, setNormalResponse] = useState('');
    const [loadingAi, setLoadingAi] = useState(false);
    const [finished, setFinished] = useState(false);
    //Hooks del programa en sí
    const [noteProccessing, setNoteProccessing] = useState(false);
    const [notes, setNotes] =
        useState(["Acuerdame que tengo cita con el dentista el 25 de julio a las 9am",
            "Tengo cita con mi novia el 25 de julio a las 4pm",
            "contraseña amazon: 440mojk0"]);
    const [note, setNote] = useState('');

    //Funciones para recuperar los estados del transcript y el listening
    const updateTranscript = (newTranscript) => {
        setTranscript(newTranscript);
    };
    const updateListening = (newListening) => {
        setListening(newListening);
    };
    //Funciones para empezar a hablar
    const updateTalking = (talking) => {
        setTalking(talking);
    }
    const onTalk = () => {
        setTalk(true);
    }
    //Funciones para controlar a gemini
    const initAiSearch = async (e) => {
        setListen(true);
        setLoadingAi(true);
    }

    //Sitema de notas
    const newNote = (note) => {
        setNotes([...notes, note]);
    }
    const deleteNote = (index) => {
        const notesAux = [...notes];
        notesAux.splice(index, 1);
        setNotes(notesAux);
    }
    const initNoteCreating = async () => {
        setListen(true);
        setNoteProccessing(true);
    }
    useEffect(() => { //cuando termina de escuchar crea la nueva nota
        if (listening === false && noteProccessing === true) {
            setNote(transcript);
            newNote(transcript);
            setNoteProccessing(false);
            setMessage("Se ha agregado una nueva nota");
            setTalk(true);
        }
    }, [listening]);
    useEffect(() => {
        if (aiResponse !== "") {
            setMessage(aiResponse);
            setTalk(true);
        }
    }, [aiResponse]);

    useEffect(() => {
        setLoadingPage(false);
    }, []);

    //Botones y demas
    const onNoteChange = (event) => {
        setNote(event.target.value);
    }

    return (
        <div className="homecontainer">
            {err ? (<h1>Ups... Parece que tú navegador no soporte la página. Prueba con Google Chrome</h1>) : (
                <><Microphone
                    transcript={transcript}
                    setTranscript={setTranscript}
                    listen={listen}
                    setListen={setListen}
                    updateListening={updateListening}
                    setErr={setErr}
                    setLoadingPage={setLoadingPage}
                    loadingPage={loadingPage}
                />
                    <Talk
                        talk={talk}
                        setTalk={setTalk}
                        setTalking={setTalking}
                        message={message}
                        updateTalking={updateTalking}
                    />
                    <Gemini
                        search={search}
                        loadingAi={loadingAi}
                        setAiResponse={setAiResponse}
                        setLoadingAi={setLoadingAi}
                        listening={listening}
                        transcript={transcript}
                        notes={notes}
                    />
                    <div className="conversationcontainer">
                        <span className="toolscontainer">
                            <img src={noteicon} className="toolicon" onClick={initNoteCreating}></img>
                            <img src={lupaicon} className="toolicon" onClick={initAiSearch}></img>
                            {listening && loadingAi !== true ? (<h3 className="tooltittle">Escuchando...</h3>) : (<h3 className="tooltittle">Nueva nota</h3>)}
                            {loadingAi ? (<h3 className="tooltittle">Buscando...</h3>) : (<h3 className="tooltittle">Buscar</h3>)}

                        </span>
                        <input className="toolsinput" type="text" value={note} onChange={onNoteChange} />
                        <button className="toolbutton" onClick={() => newNote(note)}>Agregar</button>
                    </div>
                    <div className="notescontainer">
                        {notes.map((val, index) => {
                            return (
                                <div className="notecontainer" key={index}>
                                    <div className="leftsidenote">
                                        <p className="shortnote">{index + 1}. {val}</p>
                                    </div>
                                    <div className="rightsidenote">
                                        <button className="deletenotebtn" onClick={() => deleteNote(index)}>Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>)
            }
        </div>
    );
}

export default Home;