Webcam.set({
    height: 300,
    width: 350,
    image_format: 'png',
    png_quality: 200
});
Camera = document.getElementById("camera");
Webcam.attach("camera");

function Take_Snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='Image' src='"+data_uri+"'>"
    });
}
console.log("ml5 version:", ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7l9QfYU30/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
    Speak();
}
function Speak(){
    synth = window.speechSynthesis;
    Speakdata = "Model Loaded!";
    Speaker = new SpeechSynthesisUtterance(Speakdata);
    synth.speak(Speaker);
}
var Ped_1 = "";
var Ped_2 = "";
function Speak_2(){
    synth = window.speechSynthesis;
    Speak_Data_1 = "The first prediction is " + Ped_1;
    Speak_Data_2 = "And the second prediction is " + Ped_2;
    utterThis = new SpeechSynthesisUtterance(Speak_Data_1 + Speak_Data_2);
    synth.speak(utterThis);
}
function Predict(){
    img = document.getElementById("Image");
    classifier.classify(img, Got_Result);
}
function Got_Result(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("Result_Emotion").innerHTML = results[0].label;
        document.getElementById("Result_Emotion_2").innerHTML = results[1].label;
        Ped_1 = results[0].label;
        Ped_2 = results[1].label;
        Speak_2()
        if(results[0].label =="Happy"){
            document.getElementById("Up_1").innerHTML = "&#128522;";
        }
        if(results[0].label =="Sad"){
            document.getElementById("Up_1").innerHTML = "&#128532;";
            document.getElementById("Quote").innerHTML = "Don't be sad! Because God sends hope in the most desperate moments. Don't forget, the heaviest rain comes out of the darkest clouds."
        }
        if(results[0].label =="Angry"){
            document.getElementById("Up_1").innerHTML = "&#128545;";
        }
        if(results[0].label =="Funny Face"){
            document.getElementById("Up_1").innerHTML = "&#128523;";
        }
        if(results[0].label =="Neutral"){
            document.getElementById("Up_1").innerHTML = "&#128528;";
        }

        if(results[1].label =="Happy"){
            document.getElementById("Up_2").innerHTML = "&#128522;";
        }
        if(results[1].label =="Sad"){
            document.getElementById("Up_2").innerHTML = "&#128532;";
        }
        if(results[1].label =="Angry"){
            document.getElementById("Up_2").innerHTML = "&#128545;";
        }
        if(results[1].label =="Funny Face"){
            document.getElementById("Up_2").innerHTML = "&#128523;";
        }
        if(results[1].label =="Neutral"){
            document.getElementById("Up_2").innerHTML = "&#128528;";
        }
    }
}