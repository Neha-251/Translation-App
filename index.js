

let voice_btn = document.querySelector("#voice-btn");

let voiceIcon = document.querySelector(".fa-microphone");
let input_div = document.getElementById("input-text");

let voice_flag = false;

voice_btn.addEventListener("click", () => {
    if(voice_flag == false){
        voiceIcon.style.color = "red";
        voice_flag = true;
        voiceRecord();

    }
    setTimeout(() => {
        voiceIcon.style.color = "black";
        voice_flag = false;
        
        translateText();

    }, 5000);
});

let translate_btn = document.getElementById("translate-btn");

translate_btn.addEventListener("click", ()=> {
    translateText();

})


function voiceRecord() {

    input_div.innerHTML = null;

    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-GB";

    recognition.onresult = function (event) {
        console.log(event);
        
        document.getElementById("input-text").value = event.results[0][0].transcript;
    }

    recognition.start();
}



async function translateText() {

    try {

        let input = document.getElementById("input-text").value;

        let res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: input,
                source: "en",
                target: "hi",
                format: "text",
            }),
            headers: {
                
                "content-Type": "application/json",
            },
        });
        let data = await res.json();
        document.getElementById("translated-text").innerText = data.translatedText;
        console.log("data:", data)
    } catch (err) {
        console.log("err:", err)
    }
}