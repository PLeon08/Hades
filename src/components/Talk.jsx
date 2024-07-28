import { useEffect, useState } from "react";

function Talk({
  message,
  talk,
  setTalk,
}) {

  const synth = window.speechSynthesis;

  useEffect(() => {
    if (talk === true) {
      console.log(message);
      speak(message);
      setTalk(false);
    }
  }, [talk]);

  function speak() {
    const speech = new SpeechSynthesisUtterance(message);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 0.4;
    speech.lang = "es-CR";
    speech.voice = synth.getVoices()[4] || synth.getVoices()[0];

    synth.speak(speech);
  }

  return (<></>);
}

export default Talk;