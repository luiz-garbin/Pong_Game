//variavel Bola
let xBola = 300
let yBola= 200
let diametro = 18
let raio = diametro/2

//variavel Raquete
let xMyRaquete = 5
let yMyRaquete = 150
let comprimentoRaquete = 10
let alturaRaquete = 90

//variavel Raquete oponente
let xRaquetePc = 585
let yRaquetePc = 150
let velocidadeYPc;
let chanceDeErrar = 0

//variavel velocidade Bola
let velocidadeXBola = 5
let velocidadeYBola = 5

//Colide
let colisao = false

//Placar Jogo
let meusPontos = 0
let pontosPc = 0

//Som Jogo
let somRaquete;
let somPonto;
let somTrilha;

function preload(){
  somTrilha = loadSound("trilha.mp3");
  somPonto = loadSound("ponto.mp3");
  somRaquete = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  somTrilha.loop()
}

function draw() {
  background(0);
  

  vizualizarBola();
  movimentoBola();
  confirmaBorda();
  mostrarMyRaquete(xMyRaquete,yMyRaquete);
  mostrarRaquetePc(xRaquetePc,yRaquetePc)
  movimentoMyRaquete() ;
  //verificaColisaoMyRaquete();
  verificaColisaoRaquete(xMyRaquete,yMyRaquete);
  movimentoRaquetePc()
  verificaColisaoRaquete(xRaquetePc,yRaquetePc);
  placarJogo();
  marcaPontuacao();
}


function vizualizarBola(){
  circle(xBola,yBola,diametro);
}

function movimentoBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function confirmaBorda(){
  if (xBola + raio > width || xBola- raio<0){
    velocidadeXBola *= -1; }
  if (yBola+ raio >height || yBola - raio<0){
    velocidadeYBola*= -1;}
}

  
function mostrarMyRaquete(x,y){
  
  rect(x,y,comprimentoRaquete,alturaRaquete)
  yMyRaquete = constrain(yMyRaquete, 10,310)
}

function mostrarRaquetePc(x,y){
  
  rect(x,y,comprimentoRaquete,alturaRaquete)
  yRaquetePc = constrain (yRaquetePc,10,300)
}

function movimentoMyRaquete(){
  if (keyIsDown(UP_ARROW)){
    yMyRaquete -=10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yMyRaquete +=10;
  }
  
}
 
  function verificaColisaoMyRaquete(){
     if (xBola -raio < xMyRaquete+ comprimentoRaquete && yBola-raio <yMyRaquete+alturaRaquete && yBola+raio > yMyRaquete){
      velocidadeXBola *= -1;}
  }

function verificaColisaoRaquete(x,y){
   colisao = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBola, yBola, raio);
  if (colisao){
    velocidadeXBola *=-1
    somRaquete.play()
  }
}



function movimentoRaquetePc(){
  velocidadeYPc = yBola - yRaquetePc - comprimentoRaquete/2-40;
  yRaquetePc +=velocidadeYPc + chanceDeErrar
calculaChanceDeErrar()
}

function placarJogo(){
  stroke(355)
  textAlign (CENTER)
  textSize(16);
  fill(color(24, 237, 45))
  rect(130,10,40,20);
  rect(430,10,40,20);
  fill(355)
  text(meusPontos, 150,26);
  text(pontosPc, 450,26);
}

function marcaPontuacao(){
  if(xBola >590){
    meusPontos += 1;
    somPonto.play()
  }
  if (xBola<10){
    pontosPc +=1;
    somPonto.play()
  }
}

function calculaChanceDeErrar(){
  if (pontosPc >=meusPontos){
    chanceDeErrar += 1
  if (chanceDeErrar >=39){
    chanceDeErrar =40
  }
  } else{
    chanceDeErrar -= 1
    if (chanceDeErrar<=35){
      chanceDeErrar =35
    }
  }
}