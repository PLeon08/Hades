import { useEffect } from "react";

function Microphone({
  transcript,
  setTranscript,
  listen,
  setListen,
  updateListening,
  setErr,
  setLoadingPage,
}) {

  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuos = true;
    recognition.lang = 'es-CR';
    recognition.interimResult = false;

    recognition.onstart = function () {
      updateListening(true);
    }
    recognition.onend = function () {
      updateListening(false);
    }
    recognition.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    }
  } catch (er) {
    setErr(true);
  }


  const startListen = () => {
    recognition.start();
  }

  const stop = () => {
    recognition.abort();
  }

  useEffect(() => {
    if (listen === true) {
      startListen();
      setListen(false);
    }
  }, [listen]);

  return (<></>);
}

export default Microphone;