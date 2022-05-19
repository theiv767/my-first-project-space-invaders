// CONSERTAR A GERAÇÃO DE INIMIGOS
// OLHAR, LÁ EM BAIXO, O VALOR DE JOGOESTATUS, PARA CRAMAR A FUNÇAO CRIA INIMIGOS

var dX, dY, pX, pY, velPlayer, velTiro, velInimigo, velTiroInimigo, velMeteoro
var dInimigoY  = new Array
var dInimigoX = new Array;
var tamanhoTW, tamanhoTH;
var telaInicial, bodyJogo, hud;
var navPlayer;
var jogoStatus = true
var vetorInimigos = new Array
var quantidadeInimigos
var contInimigosMortos = 0   //quando um inimigo morrer add +1
var andadasI            //util para a animação dos inimigos
var tempCriacaoInimigos = 10000
var tempCriacaoMeteoro
var maximoInimigos = maximoMeteoros = 4
var quantInimigosGerados = 1
var vetorExplosao = new Array
var porcentagemBAttack, porcentagemBLife
var barra
var vetorLifeMeteoro = new Array;
var autoRemoveExplosao = true
var iexp
var TempMeteoros
var TempTInimigos = new Array;
var velTiRealX = new Array;
var velTiRealY = new Array;
var distanciaInimigoPlayerX
var botaoJogar
var controleDanoMeteoro = true
var telaGameOver
var bgameOver
var intervalo1, intervalo2
var audioMenu = new Audio("audios/menu.mp3")
audioMenu.isAtivado = false

function main() {
    inicia();
    loopGameMain();
    
}

function atvAudio(){
    if(!audioMenu.isAtivado){
        audioMenu.play()
        audioMenu.loop = true
        audioMenu.isAtivado = true
        document.querySelector(".botaoMusica").style.backgroundImage = "url(imagens/comAudio.png)"
        console.log(audioMenu.isAtivado,"if")
    }else{
        audioMenu.pause()
        audioMenu.isAtivado = false
        document.querySelector(".botaoMusica").style.backgroundImage = "url(imagens/semAudio.png)"
        console.log(audioMenu.isAtivado,"else");
    }

    

}

function botaoDeMusica(){
    document.querySelector(".botaoMusica").addEventListener("click", atvAudio);
    console.log("oi")
}

function iniciaElementos(){
    navPlayer = document.getElementById("navP");
    navPlayer.style.visibility = "hidden"

    hud = document.getElementById("hud")
    hud.style.display = "none"



}


function reiniciar(){
    dX = dY = 0;
    pX = tamanhoTW / 2.2
    pY = tamanhoTH / 1.5
    navPlayer = document.getElementById("navP");
    navPlayer.style.top = pY + "px"
    navPlayer.style.left = pX + "PX"
    porcentagemBAttack = 100
    porcentagemBLife = 100;
    document.getElementById("barraLife").style.width = "100%";

    telaInicial = document.getElementById("telaInic")
    bodyJogo = document.getElementById("tudo")
    telaInicial.style.width = (tamanhoTW * 60) / 100
    bodyJogo.style.width = tamanhoTW - 8 + "px"
    bodyJogo.style.height = tamanhoTH - 16 + "px"
    botaoJogar= document.getElementById("bIniciar")  // não tá pegando o valor
    telaInicial.style.top = "8%"
    var caixaTxt = document.getElementById("inputName")
    caixaTxt.value = "";

    //tiro
    velTiro = 7

    //inimigos
    velInimigo = 1
    andadasI =0
    velTiroInimigo = 3

    //explosao
    iexp = 0

    //meteoro
    tempCriacaoMeteoro = 200
    velMeteoro = 1
}


function inicia() {
   

    //tamanho tela
    tamanhoTW = window.innerWidth
    tamanhoTH = window.innerHeight
    var tamanhoFundo = document.getElementById("tudo")

    //inicialização do navePlayer
    dX = dY = 0;
    pX = tamanhoTW / 2.2
    pY = tamanhoTH / 1.5
    velPlayer = 6
    navPlayer = document.getElementById("navP");
    navPlayer.style.top = pY + "px"
    navPlayer.style.left = pX + "PX"
    porcentagemBAttack = 100;
    porcentagemBLife = 100;
    

    //menu
    telaInicial = document.getElementById("telaInic")
    bodyJogo = document.getElementById("tudo")
    telaInicial.style.width = (tamanhoTW * 60) / 100
    bodyJogo.style.width = tamanhoTW - 8 + "px"
    bodyJogo.style.height = tamanhoTH - 16 + "px"
    botaoJogar= document.getElementById("bIniciar")  
    telaInicial.style.top = "8%"
    botaoDeMusica()

    
    //
    telaGameOver = document.getElementById("telaGameOver")
    bgameOver = document.getElementById("bGameOver")
    

    //hud
    document.getElementById("barraLife").style.width = "100%";

    //tiro
    velTiro = 7

    //inimigos
    velInimigo = 1
    andadasI =0
    velTiroInimigo = 3

    //explosao
    iexp = 0

    //meteoro
    tempCriacaoMeteoro = 200
    velMeteoro = 1




    botaoJogar.onclick = function(){
        jogoStatus = true;

        tamanhoFundo.style.backgroundImage = "url(imagens/possivelBackGround.gif)"
        navPlayer = document.getElementById("navP");
        hud = document.getElementById("hud")

        telaInicial.style.display = "none"
        
        navPlayer.style.visibility = "visible"

        hud.style.display = "inline"

        var caixaTxt = document.getElementById("inputName")
        if(caixaTxt.value != ""){
            var atualizaNome = document.getElementById("name")
            atualizaNome.innerHTML = caixaTxt.value

            
        }
        main()
        audioMenu.pause()
        audioMenu = new Audio("audios/battle.mp3")
        audioMenu.isAtivado = false
        atvAudio()
    }
    
}

function navAndar() {
    var tecla = event.keyCode;
    
    if (tecla == 87) {
        dY = -1
    }else if (tecla == 83) {
        dY = 1
    }else if (tecla == 65) {
        dX = -1
    }else if (tecla == 68) {
        dX = 1
    }

    if (tecla == 74) {
        if(porcentagemBAttack >= 20){
            porcentagemBAttack -= 20
            tiro((pX + 47), pY)
            barra.style.width = porcentagemBAttack+"%"
        }
        
    }
}

function aumentaBAttack(){
   if(porcentagemBAttack < 100){
        porcentagemBAttack += 1
        barra.style.width = porcentagemBAttack+"%"
   }
}

function tiro(x, y) {
    var tiro = document.createElement("div"); //cria o elemento "tiro" como uma div
    var attrClass = document.createAttribute("class");    //cria um atributo de class
    var attrStyle = document.createAttribute("style");  //cria um atributo de Style

    attrClass.value = "tiroPlayer"                         //preenche o valor do class como "tiroPlayer"
    attrStyle.value = "top:" + y + "px; left:" + x + "px";      //preenche o valor de style com uma posição

    tiro.setAttributeNode(attrClass);          //atribui o id criado à div tiro
    tiro.setAttributeNode(attrStyle);       //atribui o style(a posição) à div tiro

    document.body.appendChild(tiro);    //especifica o tiro como um elemento filho do body
    //adiciona na tela
}

function movimentacaoTiros() {
    var vetorTiros = document.getElementsByClassName("tiroPlayer");
    var tamanhoVTiros = vetorTiros.length
    for (let i = 0; i < tamanhoVTiros; i++) {
        if (vetorTiros[i]) {
            var posiYTiro = vetorTiros[i].offsetTop;
            if (posiYTiro >= 0) {
                posiYTiro -= velTiro
                vetorTiros[i].style.top = posiYTiro + "px"
                colisaoTiroPlayer(vetorTiros[i]);
                colisaoTMeteoro(vetorTiros[i]);
            } else {
                vetorTiros[i].remove()
            }
        }
    }
}

function tiroInimigo(x,y, dNpX, dNpY){
    var tiroInimigo = document.createElement("div"); //cria o elemento "tiro" como uma div
    var attrClass = document.createAttribute("class");    //cria um atributo de class
    var attrStyle = document.createAttribute("style");  //cria um atributo de Style

    attrClass.value = "tiroInimigo"                         //preenche o valor do class como "tiroPlayer"
    attrStyle.value = "top:" + y + "px; left:" + x + "px";      //preenche o valor de style com uma posição

    tiroInimigo.setAttributeNode(attrClass);          //atribui o id criado à div tiro
    tiroInimigo.setAttributeNode(attrStyle);       //atribui o style(a posição) à div tiro

    document.body.appendChild(tiroInimigo);    //especifica o tiro como um elemento filho do body
    //adiciona na tela

    if(dNpX > 0){
        var dReal = Math.pow(dNpX, 2) + Math.pow(dNpY, 2);
        dReal = Math.sqrt(dReal)   //dReal é a distancia diagonal entro o inimigo e o player
        
        var tempTinimigoToPlayer = dReal/velTiroInimigo //quantidade de passo do inimigo até o player

        if(distanciaInimigoPlayerX < 0){
            velTiRealX.push((dNpX/tempTinimigoToPlayer))
        }else{
            velTiRealX.push((dNpX/tempTinimigoToPlayer)*-1)
        }

        velTiRealY.push((dNpY/tempTinimigoToPlayer))

    }

}


function movimentaTiroInimigo(){
    var tiroInimigo = document.getElementsByClassName("tiroInimigo")
    var quantidadeTirosInimigos = tiroInimigo.length
    
    if(tiroInimigo[0]){
        for(let i=0; i<quantidadeTirosInimigos; i++){
            let pXtInimigo = tiroInimigo[i].offsetLeft+velTiRealX[i]
            let pYtInimigo = tiroInimigo[i].offsetTop+velTiRealY[i]

            

            if(pXtInimigo<= tamanhoTW -30 && pXtInimigo >= 1 && tamanhoTH-30 >= pYtInimigo){
                tiroInimigo[i].style.left = pXtInimigo+"px"
                tiroInimigo[i].style.top = pYtInimigo+"px"

                if(
                    navPlayer.offsetTop+15 <=((tiroInimigo[i].offsetTop)+24) &&
                    tiroInimigo[i].offsetTop <= (navPlayer.offsetTop+68) &&
                    (navPlayer.offsetLeft+55) >= tiroInimigo[i].offsetLeft &&
                    (tiroInimigo[i].offsetLeft+25) >= navPlayer.offsetLeft+28                
                  ){
                        tiroInimigo[i].remove()
                        velTiRealX.splice(i,1)
                        velTiRealY.splice(i,1)

                        var barraDLife = document.getElementById("barraLife")
                        porcentagemBLife -= 20
                        gameOver()
                        
                        if(porcentagemBLife < 0){
                            porcentagemBLife = 0
                        }

                        barraDLife.style.width = porcentagemBLife+"%"
                }


            }else{
                tiroInimigo[i].remove()
                velTiRealX.splice(i,1)
                velTiRealY.splice(i,1)
            
            }
            
            tiroInimigo = document.getElementsByClassName("tiroInimigo")
            quantidadeTirosInimigos = tiroInimigo.length
        }
    }
}

function recVida(){
    if(porcentagemBLife < 100){
        var barraDLife = document.getElementById("barraLife")
        porcentagemBLife +=0.003
        barraDLife.style.width = porcentagemBLife+"%"
    }
}

function attCorBLife(){
    var barraDLife = document.getElementById("barraLife")
    if(porcentagemBLife <=20){
        barraDLife.style.backgroundColor = "rgb(247, 28, 12)"
        barraDLife.style.boxShadow = "0 0 10px 0 #b61b1bbb inset, 0 0 10px 4px #f15151"
        barraDLife.style.opacity = "0.3"
    }else if(porcentagemBLife <= 40){
        barraDLife.style.backgroundColor = "rgb(246, 250, 17)"
        barraDLife.style.opacity = "0.3"
        barraDLife.style.boxShadow = "0 0 0px 0 #b61b1bbb inset, 0 0 0px 0px #f15151"
    }else{
        barraDLife.style.backgroundColor = "rgb(64, 233, 64)"
        barraDLife.style.opacity = "0.3"
        barraDLife.style.boxShadow = "0 0 0px 0 #b61b1bbb inset, 0 0 0px 0px #f15151"
    }
}

function movimentacao() {
    if(dY > 0 && tamanhoTH-105 >= navPlayer.offsetTop){
        pY += dY * velPlayer
        navPlayer.style.top = pY + "px"
    }else if(dY < 0 && tamanhoTH/3 <= navPlayer.offsetTop){
        pY += dY * velPlayer
        navPlayer.style.top = pY + "px"
    }

    
    if(dX < 0 && navPlayer.offsetLeft >= 1){
        pX += dX * velPlayer
        navPlayer.style.left = pX + "PX"
    }else if(dX > 0 && navPlayer.offsetLeft <= tamanhoTW -105){
        pX += dX * velPlayer
        navPlayer.style.left = pX + "PX"
    }

    danoMeteoro()
}

function navPararAndar() {
    var tecla = event.keyCode;
    if (tecla == 87 || tecla == 83) {
        dY = 0
    } else if (tecla == 65 || tecla == 68) {
        dX = 0
    }
}


function criaInimigos() {
   if(jogoStatus){
    for(let i=0;i<quantInimigosGerados;i++){
        if(quantidadeInimigos < maximoInimigos){
                var inimigo = document.createElement("div");
                var inimigoY = 0;
                var inimigoX = Math.random() * tamanhoTW - 57;

                var attrClass = document.createAttribute("class");
                var attrStyle = document.createAttribute("style");

                attrClass.value = "inimigo";
                attrStyle.value = "top:" + inimigoY + "px; left:" + inimigoX+ "px";

                inimigo.setAttributeNode(attrClass);
                inimigo.setAttributeNode(attrStyle);

                document.body.appendChild(inimigo)
                TempTInimigos.push(100+ (Math.floor(Math.random()*400))) //geração do tiro
            }
        }
    }
}

function direcaoAleatoria() {
    var direcaoAleatoria = Math.floor(Math.random() * (2))
    return direcaoAleatoria;
}

function movimentaInimigos() { 
    var seletor = [-1,1] 
    
    vetorInimigos=document.getElementsByClassName("inimigo");
    quantidadeInimigos = vetorInimigos.length
    
    if(andadasI == 0){
        for(let i=0; i<quantidadeInimigos; i++){
            dInimigoX.shift()
        }
        for(let i=0; i<quantidadeInimigos; i++){
            dInimigoY.shift()
        }
        
        for(let i=0; i<quantidadeInimigos; i++){
            dInimigoX.push(direcaoAleatoria())
        }
        for(let i=0; i<quantidadeInimigos; i++){
            dInimigoY.push(direcaoAleatoria())
        }
        
    }
    
    for(let i=0; i<quantidadeInimigos;i++){
        if(vetorInimigos[i]){
            var posiYInimigo = vetorInimigos[i].offsetTop
            var posiXInimigo = vetorInimigos[i].offsetLeft
            


            if(vetorInimigos[i].offsetTop <= tamanhoTH/3 && vetorInimigos[i].offsetTop >= 0 &&vetorInimigos[i].offsetLeft >= 1 && vetorInimigos[i].offsetLeft <= tamanhoTW-100){
    
                posiXInimigo += velInimigo*seletor[ dInimigoX[i] ]
                posiYInimigo += velInimigo*seletor[ dInimigoY[i] ]
                vetorInimigos[i].style.top = posiYInimigo+"px"
                vetorInimigos[i].style.left = posiXInimigo+"px"
    
            }else{
                if(vetorInimigos[i].offsetTop > tamanhoTH/3){
                    posiYInimigo -= velInimigo
                    vetorInimigos[i].style.top = posiYInimigo+"px"
        
                }
                if(vetorInimigos[i].offsetTop < 0 ){
                posiYInimigo += velInimigo
                vetorInimigos[i].style.top = posiYInimigo+"px"
                }
                if(vetorInimigos[i].offsetLeft < 1){
                   posiXInimigo += velInimigo
                    vetorInimigos[i].style.left = posiXInimigo+"px"
                }
                if(vetorInimigos[i].offsetLeft > tamanhoTW-100){
                posiXInimigo -= velInimigo
                vetorInimigos[i].style.left = posiXInimigo+"px"
                }
            }
        }

        TempTInimigos[i] -= 1;
        if(TempTInimigos[i] < 1){
            TempTInimigos[i] = (300+ (Math.floor(Math.random()*350))) // geração do tiro


            //definindo a direção que o tiro vai se movimentar
            let dNpX = posiXInimigo+20 - (pX+47)
            distanciaInimigoPlayerX = dNpX
            if(dNpX < 0){
                dNpX = dNpX*(-1)
            }
            let dNpY = posiYInimigo+30 - (pY+50)
            if(dNpY < 0){
                dNpY = dNpY*(-1)
            }
            tiroInimigo(posiXInimigo+20, posiYInimigo+33, dNpX, dNpY)

        }
    }

    andadasI++
    if(andadasI == 50){

        andadasI = 0
    }
}


function colisaoTiroPlayer(tiroP){
    quantidadeInimigos = vetorInimigos.length

    for(let i=0;i<quantidadeInimigos;i++){
        if(vetorInimigos[i]){
            if(
                vetorInimigos[i].offsetTop <=((tiroP.offsetTop)+22) &&
                tiroP.offsetTop <= (vetorInimigos[i].offsetTop+60) &&
                (vetorInimigos[i].offsetLeft+61) >= tiroP.offsetLeft &&
                (tiroP.offsetLeft+9) >= vetorInimigos[i].offsetLeft
            ){
                
                tiroP.remove();
                explosao(vetorInimigos[i].offsetLeft, vetorInimigos[i].offsetTop) // tentar tirar essa função daki e colocar em um loop pra ver se resolve o bug

                vetorInimigos[i].remove();
                
                contInimigosMortos++
                if(contInimigosMortos%5 == 0 && maximoInimigos<24){
                    maximoInimigos++
                }

                if(contInimigosMortos>20 && velTiroInimigo < 14){
                    if(contInimigosMortos%10 == 0){
                        velTiroInimigo++
                    }

                }


                if(contInimigosMortos%3==0 && tempCriacaoInimigos>3000){
                    tempCriacaoInimigos -= 1000
                    quantInimigosGerados++
                }    
            
            }    

        }
    }
}

function explosao(x, y){  //de vez em quando cria uma explosão a mais na esqueda da tela

    var explosao = document.createElement("div")
    var imagemExplosao = document.createElement("img")
    var audioExplosao = document.createElement("audio")

    var attrClass = document.createAttribute("class")
    var attrStyle = document.createAttribute("style")
    var attrId = document.createAttribute("id")
    var attrId2 = document.createAttribute("id")
    var attrSrc = document.createAttribute("src")
    var attrSrc2 = document.createAttribute("src")

    
    attrId.value = "explosao"+iexp;
    attrClass.value = "explosaoInimigo";
    attrStyle.value = "left:"+x+"px; top:"+y+"px";
    attrSrc.value = "imagens/explosao.gif?"+iexp;
    attrSrc2.value = "audios/explosaoAudio.mp3";

    explosao.setAttributeNode(attrClass)
    explosao.setAttributeNode(attrStyle)
    explosao.setAttributeNode(attrId)
    imagemExplosao.setAttributeNode(attrSrc)
    audioExplosao.setAttributeNode(attrSrc2)
    
    document.body.appendChild(explosao);
    explosao.appendChild(imagemExplosao);
    explosao.appendChild(audioExplosao)
    
    audioExplosao.play()
    
    
    iexp++
    removeExplosao()

}

function removeExplosao(){
    setTimeout(removeAtraso, 700)
    function removeAtraso(){
        var vetorExplosao = document.getElementsByClassName("explosaoInimigo")
        vetorExplosao[0].remove();
    }
}

function atualizaPontos(){
    var pontos = document.getElementById("pontos")
    pontos.innerHTML = contInimigosMortos
}




function criaMeteoro(){     //usar uma matriz pra relacionar a vida do meteoro com o meteoro
    
    if(tempCriacaoMeteoro < 0){
        if(contInimigosMortos > 29){
            var quantidadeMeteoro = document.getElementsByClassName("meteoro")
            quantidadeMeteoro = quantidadeMeteoro.length

            if(quantidadeMeteoro < maximoMeteoros){
                var meteoro = document.createElement("div");
                var meteoroY = -150;
                var meteoroX = Math.random() * (tamanhoTW - 178);

                var attrClass = document.createAttribute("class");
                var attrStyle = document.createAttribute("style");

                attrClass.value = "meteoro";
                attrStyle.value = "top:" + meteoroY + "px; left:" + meteoroX+ "px";

                meteoro.setAttributeNode(attrClass);
                meteoro.setAttributeNode(attrStyle);

                document.body.appendChild(meteoro)
                vetorLifeMeteoro.push(100)  //adicionando um valor de vida para o meteoro recem criado
                TempMeteoros = (700+ (Math.floor(Math.random()*400))) //geração do tiro
            }

        }

        tempCriacaoMeteoro = Math.floor(400+(Math.random()*400))

    }else{
        tempCriacaoMeteoro--;

    }
}


function movimentacaoMeteoro() {
    var vetorMeteoros = document.getElementsByClassName("meteoro");
    var tamanhoVTMeteoro = vetorMeteoros.length
    for (let i = 0; i < tamanhoVTMeteoro; i++) {
        if (vetorMeteoros[i]) {
            var posiYTMeteoro = vetorMeteoros[i].offsetTop;
            if (posiYTMeteoro <= tamanhoTH - 150) {
                posiYTMeteoro += velMeteoro
                vetorMeteoros[i].style.top = posiYTMeteoro + "px"
            } else {
                vetorMeteoros[i].remove()
                vetorLifeMeteoro.splice(i,1)   //vetor com os valores da vida dos meteoros
            }
        }
    }
}

function criaBarraLifeMeteoro(i, x, y){
    var barraFullMetoero = document.createElement("div")
    var barraLifeMeteoro = document.createElement("div")

    var attrClass = document.createAttribute("class")
    var attrClass2 = document.createAttribute("class")
    var attrStyle = document.createAttribute("style")


    attrClass.value = "lifeMeteoro"
    attrClass2.value = "barraLifeMeteoro"
    attrStyle.value = "left:"+x+"px; top:"+y+"px";

    barraFullMetoero.setAttributeNode(attrClass)
    barraFullMetoero.setAttributeNode(attrStyle)
    barraLifeMeteoro.setAttributeNode(attrClass2)
    var arrayMeteoros = document.getElementsByClassName("meteoro")

    arrayMeteoros[i].appendChild(barraFullMetoero)
    barraFullMetoero.appendChild(barraLifeMeteoro);
}

function colisaoTMeteoro(tiroP){
    var arrayMeteoros = document.getElementsByClassName("meteoro")
    var quantidadeMeteoros = arrayMeteoros.length

    for(let i=0;i<quantidadeMeteoros;i++){
        if(arrayMeteoros[i] && tiroP){
            if(
                arrayMeteoros[i].offsetTop <=((tiroP.offsetTop)+22) &&
                tiroP.offsetTop <= (arrayMeteoros[i].offsetTop+157) &&
                (arrayMeteoros[i].offsetLeft+190) >= tiroP.offsetLeft &&
                (tiroP.offsetLeft+9) >= arrayMeteoros[i].offsetLeft
            ){
                
                tiroP.remove();
                vetorLifeMeteoro[i] -= 12.5
                if( vetorLifeMeteoro[i] >= 87.5){
                    criaBarraLifeMeteoro(i, 38, 30)
                }else{  
                    var lifeMeteoro = document.getElementsByClassName("barraLifeMeteoro")
                    
                    if(lifeMeteoro[i])
                        lifeMeteoro[i].style.width = vetorLifeMeteoro[i]+"%"
                }

                if(vetorLifeMeteoro[i]<= 40){
                    arrayMeteoros[i].style.backgroundImage = "url('imagens/download-removebg-preview2.png')";
                }

                if(vetorLifeMeteoro[i] <= 0){
                    arrayMeteoros[i].remove();  
                    vetorLifeMeteoro.splice(i,1)
                }
            }    
        }
    }
}

function danoMeteoro(){
    var arrayMeteoros = document.getElementsByClassName("meteoro")
    var quantidadeMeteoros = arrayMeteoros.length

        for(let i=0;i<quantidadeMeteoros;i++){
            if(
                arrayMeteoros[i].offsetTop-55 <=((navPlayer.offsetTop)+22) &&
                navPlayer.offsetTop <= (arrayMeteoros[i].offsetTop+144) &&
                (arrayMeteoros[i].offsetLeft+188) >= navPlayer.offsetLeft &&
                (navPlayer.offsetLeft+9) >= arrayMeteoros[i].offsetLeft-88
            ){

                desviaMeteoro(arrayMeteoros[i])


                if(porcentagemBLife <= 0){
                    porcentagemBLife = 0
                    gameOver()
                }
            
            }
        }
    

}

function desviaMeteoro(arrayMeteoros){
    var barraDLife = document.getElementById("barraLife")
    
    if(controleDanoMeteoro){
        porcentagemBLife -=50
        barraDLife.style.width = porcentagemBLife+"%"
    }

    controleDanoMeteoro = false
    
    //-------------------------------------------------------------------------------
    
    if((arrayMeteoros.offsetLeft+188) >= navPlayer.offsetLeft &&
      ((navPlayer.offsetLeft+9) >= arrayMeteoros.offsetLeft-88)
      ) {

        if(
           (navPlayer.offsetLeft) <= arrayMeteoros.offsetLeft+30
        ){
            
            if(pX >= 7){
                pX -= 6
            }

            navPlayer.style.left = pX+"px"
            

            if(navPlayer.offsetTop >= (arrayMeteoros.offsetTop+80)){
                if(pY < tamanhoTH-111 ){
                    pY += 6
                }
    
                navPlayer.style.top = pY+"px"
                    
                for(let j=0; j < 100; j++){
                    setTimeout(function(){
                        if(pY < tamanhoTH-106){
                            pY += 1  
                        }

                        if(pX >= 2){
                            pX -= 1
                        }
                        navPlayer.style.top = pY+"px"
                        navPlayer.style.left = pX+"px"
                    },100)
                }
    
            }else{

                if(pX >= 7){
                    pX -= 6
                }
    
                navPlayer.style.left = pX+"px"

                if(pY >= tamanhoTH/3+6){
                    pY -= 6
                }
        
                navPlayer.style.left = pX+"px"
                
                for(let j=0; j < 100; j++){
                    setTimeout(function(){
                        if(pY > tamanhoTH/3+1){
                            pY -= 1
                        }
                        if(pX >= 2){
                            pX -= 1
                        }
                        navPlayer.style.top = pY+"px"
                        navPlayer.style.left = pX+"px"
                    },100)
                }
        
            }



       //---------------------------------------------------------------- 

        }else{
            if(pX <= tamanhoTW -111){
                pX += 6
            }

            navPlayer.style.left = pX+"px"


            
            if(navPlayer.offsetTop >= (arrayMeteoros.offsetTop+80)){
                if(pY < tamanhoTH-111 ){
                    pY += 6
                }
    
            navPlayer.style.top = pY+"px"        
    
                for(let j=0; j < 100; j++){
                    setTimeout(function(){
                        if(pY < tamanhoTH-106){
                            pY += 1  
                        }
                        if(pX <= tamanhoTW -106){
                            pX += 1
                        }
        
                        navPlayer.style.left = pX+"px"
                        navPlayer.style.top = pY+"px" 
                        
                    },100)
                }
    
            }else{
                
                if(pX <= tamanhoTW -111){
                    pX += 6
                }
    
                navPlayer.style.left = pX+"px"

                if(pY >= tamanhoTH/3+6){
                    pY -= 6
                }
        
                navPlayer.style.top = pY+"px" 
                
                for(let j=0; j < 100; j++){
                    setTimeout(function(){
                        if(pY > tamanhoTH/3+1){
                            pY -= 1
                        }
                        if(pX <= tamanhoTW -106){
                            pX += 1
                        }
        
                        navPlayer.style.left = pX+"px"
                        navPlayer.style.top = pY+"px"
                    },100)

                }
        
            }
        }
        
        
        
    }

   
    //--------------------------------------------------------------------------------
    setTimeout(function(){controleDanoMeteoro = true; }, 2000);
            
}


function gameOver(){    // o jogo tá ficando acelerado depois de reiniciar
    if(porcentagemBLife <= 0){
        jogoStatus = false
            

        telaGameOver.style.display = "inline";
        //bgameOver.style.display = "inline";
        
        bgameOver.onclick = function(){  
            iniciaElementos()
            inicia()
            
            telaGameOver.style.display = "none";
            bgameOver.style.display = "none";
            telaInicial.style.display = "block";
            document.getElementById("tudo").style.backgroundImage = "url('imagens/possivelBackground.gif')"
        
            porcentagemBLife = 100

            var num = vetorInimigos.length
            for(let i=0; i< num; i++){ // excluir todos os inimigos
                vetorInimigos[0].remove()
            }
            
            var vetorLocal = document.getElementsByClassName("tiroPlayer");
            num = vetorLocal.length
            for(let i=0; i<num;i++){ //excluir todos os tiros player
                vetorLocal[0].remove()
            }
            
            var vetorLocal = document.getElementsByClassName("tiroInimigo");
            num = vetorLocal.length
            for(let i=0; i<num;i++){ //exluir todos os tiros inimigo
                vetorLocal[0].remove()
                velTiRealX.splice(0,1)
                velTiRealY.splice(0,1)

            }
            
            var vetorLocal = document.getElementsByClassName("meteoro");
            num = vetorLocal.length
            for(let i=0; i<num;i++){ //excluir todos os meteoros
                vetorLocal[0].remove()
                vetorLifeMeteoro.splice(0,1)

            }

            contInimigosMortos = 0
            var pontos = document.getElementById("pontos")
            pontos.innerHTML = contInimigosMortos

           clearInterval(intervalo1)
           clearInterval(intervalo2)

           intervalo1 = setInterval(criaInimigos, tempCriacaoInimigos);
           intervalo2 = setInterval(aumentaBAttack, 25)
        }
        
        

    }
    
}




function loopGameMain() {
    if (jogoStatus) {
        barra = document.getElementById("barraAttack")
        movimentacao()  // essa função usa os dados da função navAndar
        movimentacaoTiros()
        atualizaPontos()
        movimentaInimigos()
        movimentaTiroInimigo()
        recVida()
        attCorBLife()
        criaMeteoro();
        movimentacaoMeteoro()
        

    }
    
    requestAnimationFrame(loopGameMain) //loop de recursividade
}

//------------------execução---------------------------------------

window.onload = function () {
    iniciaElementos()
    inicia()
    //main()
    
}

//setInterval(criaMeteoro, Math.floor(tempCriacaoMeteoro+(Math.random()*5000)))
if(jogoStatus){
    intervalo1 = setInterval(criaInimigos, tempCriacaoInimigos);
    intervalo2 = setInterval(aumentaBAttack, 25)
    addEventListener("keydown", navAndar);
    addEventListener("keyup", navPararAndar);
}

//function de controle de regras colisaoTiroPlayer()