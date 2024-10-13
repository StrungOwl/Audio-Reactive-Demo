setupGame(){
    textFont(words);

    mic = new p5.AudioIn();
    mic.start();
  
    imgW = width * 0.15;
    imgH = imgW / ratio;
  
    xStart = width * 0.4 - imgW / 2;
    yStart = height / 1.2 - imgH / 2;
  
    x = xStart;
    y = yStart;
    xSpeed = width * 0.005;
  
    //RED DOT
    redX = width * 0.8;
    redY = height * 0.35;
    circS = width * 0.1;
}

displayGame(){
    
}