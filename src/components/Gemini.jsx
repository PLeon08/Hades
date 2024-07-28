import { GoogleGenerativeAI } from "@google/generative-ai";
import "../styles/Gemini.css"
import { useEffect, useState } from "react";


export default function Gemini(props) {
    const {
        search,
        loadingAi,
        setAiResponse,
        setLoadingAi,
        listening,
        transcript,
        notes,
    } = props;

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const [date, setDate] = useState(new Date());

    async function searchInNotes() {
        //Juntar todas las notas y la peticion usando transcript y notes
        let notestxt = "";
        let index = 0;
        
        while (index<notes.length){
            notestxt = notestxt + (index+1)+". "+notes[index]+"\n";
            index=index+1;
        }
        
        const prompt = `Eres un asistente virtual en una aplicación de notas, el usuario te acaba de hacer 
        una consulta que generalmente es buscar entre sus notas un recordatorio, contraseña, evento próximo, 
        actividad, o cualquier otra cosa que pudiese haber apuntado en el pasado. En base a la consulta debes 
        buscar entre sus notas para satisfacer la necesidad que presente el usuario en el momento, puede suceder 
        que el usuario consulte información que no se encuentre en las notas, en dicho caso debes indicarle que en
        sus notas no hay nada que corresponda a la consulta. Ejemplo de prueba:
        - Consulta: "Tengo pendientes para hoy". - Respuesta en caso de encontrar alguna fecha asociada con la 
        fecha actual: Sí, el día de hoy debes acordarte (Nota). - Respuesta en caso de NO encontrar alguna fecha asociada con la 
        fecha actual: Parece que el día de hoy no tienes compromisos.
        Debes responder a corde a las siguientes premisas:
        - Humano: Debes contestar de forma natural como si un amigo le estuviera recordando la nota que no debía olvidar.
        - Conversión de nota: No debes decir explícitamente lo que dice la nota sino recordarle lo importante de dicha nota.
        - Fecha actual: La fecha actual es ${date}. Si la fecha de la consulta no coincide con la fecha en la nota no las uses como referencia.
        - Varias notas: Puede que más de una nota esté relacionada con la consulta, de ser así responde usando todas las notas relevantes.
        - Existencia de alguna nota: No siempre habrá una nota relacionada a la consulta del usuario, en dado caso señala que no encuentras ninguna nota relevante
        Ahora analiza la consulta del usuario: ¿${transcript}?\n Ahora busca entre las siguiente notas si algo es de utilidad 
        para recordarle al usuario: \n${notestxt} \nDe no haber notas o no haber ninguna nota relacionada con la petición ya sabes 
        que debes indicar algo similar a que no hay recordatorios.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        //console.log(await text);
        setAiResponse(await text);
        setLoadingAi(false);
    }

    useEffect(() => {
        if (loadingAi === true) {
            searchInNotes();
        }
    }, [transcript])

}