//Play with getEnergy()  

let ratio = 1.3333; //4:3 aspect ratio
let globeScale; // Scale factor

let mic; // Microphone 
let vol; //volume
let normVol = 1; // Normalized volume
let volSense = 100; // Volume sensitivity
let sliderStep = 10; // Slider step size
let volSenseSlider; // Volume sensitivity slider
let startAudio = false; // Start audio flag

//Frequency variables
let fft; // Fast Fourier Transform
let spectrum; // Frequency spectrum
let waveform; // Waveform  

//GAME VARIABLES------------------------------- 
let showGame = false;
let xSpeed;
let x, y;
let xStart, yStart;
let imgW, imgH;

let ubie;
let ubieR = [];
let ubieJ = [];
let ubieRo = [];
let indexRun = 0;
let indexJump = 0;
let indexRoll = 0;
//BOOLEANS
let ubieStill = true;
let ubieRun = false;
let ubieRoll = false;
let ubieJump = false;
//RED DOT
let redX, redY, redCircS;
let a = 0;
let dotShow = true;
let characterRatio = 1.3; //character size
let words;
let textShow = true;
let angelShow = false;

function preload() {
    ubie = loadImage("Ubie/Ubie.png");
    words = loadFont("font.ttf");

    //RUNNING
    for (let i = 1; i < 8; i++) {
        ubieR[i - 1] = loadImage("Ubie/Run/Ubie_Run" + i + ".png");
    }

    //Jumping
    for (let i = 0; i < 2; i++) {
        ubieJ[i] = loadImage("Ubie/Jump/" + i + ".png");
    }

    //ROLLING
    for (let i = 1; i < 15; i++) {
        ubieRo[i - 1] = loadImage("Ubie/Roll/Ubie_Flip" + i + ".png");
    }
}


function setup() {

    createCanvas(window.innerWidth, window.innerWidth / ratio);
    globeScale = min(width, height);
    colorMode(HSB);
    getAudioContext().suspend();    //NEED THIS TO START PUASE AUDIO CONTEXT

    volSenseSlider = createSlider(0, 200, volSense, sliderStep);

    
    setupGame(); 

}

function draw() {
    if (!showGame) {
        background(200, 100, 100, 0.1);

        if (startAudio) {

            vol = mic.getLevel(); // Get volume level
            spectrum = fft.analyze(); // Get frequency spectrum
            waveform = fft.waveform(); // Get waveform

            volSense = volSenseSlider.value(); // Get volume sensitivity
            normVol = vol * volSense; // Normalize volume

            waveForm(); // Draw waveform
            spectrumF(); // Draw frequency spectrum

        }

        smileyFace();
    }

    if(startAudio){
    setTimeout(displayGame, 5000);
    } 


}

function mousePressed() {

    if (showGame) {
        textShow = !textShow;
    }

    userStartAudio();   //NEED THIS TO START AUDIO CONTEXT

    if (!startAudio) {
        mic = new p5.AudioIn();
        fft = new p5.FFT();
        fft.setInput(mic);

        mic.start();
        startAudio = true;
    }
}

function waveForm() {
    if (startAudio) {
        //WAVEFORM VISUALIZATION-------------------
        noFill();
        beginShape();
        for (let i = 0; i < waveform.length; i++) {
            let x = map(i, 0, waveform.length, 0, width);
            let y = map(waveform[i], -1, 1, 0, height);
            let strokeCol = map(waveform[i], -1, 1, 0, 360);
            let strokeSat = map(waveform[i], -1, 1, 0, 100);

            stroke(strokeCol, strokeSat, 100);
            strokeWeight(globeScale * 0.01);
            vertex(x, y);

        }
        endShape();
    }
}

function spectrumF() {

    if (startAudio) {
        for (let i = 0; i < spectrum.length; i++) {

            let rectX = map(i, 0, spectrum.length, 0, width);
            let rectY = height;
            let rectW = globeScale * 0.05;
            let rectH = -map(spectrum[i], 0, 255, 0, height);
            noStroke();
            fill(spectrum[i], 100, 100, 0.1);
            rect(rectX, rectY, rectW, rectH);

            let rectX2 = width - rectX - rectW;
            rect(rectX2, rectY, rectW, rectH);


        }
    }


}