//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let pontos = 0; // Variável que conta o placar
let tempo = 30; // Variável que controla o tempo de jogo
let jogoAtivo = true; // Variável para determinar se o jogo terminou
let intervaloOvos; // Variável para controlar a geração de ovos
let intervaloTimer; // Variável para controlar o timer de jogo

// Função de movimento da cesta
$(function() // Espera o HTML ser carregado antes de ser executado
{
    $(document).mousemove(function(e) // Evento de movimento do mouse | Ativa sempre que o mouse se mexe
    {
        let tela = $(".tela"); // Recebe a div para saber a posição na página
        let cesta = $(".cesta"); // Recebe a div para poder mudar sua posição

        let mouseX = e.pageX - tela.offset().left; // Calcula a posição do mouse dentro da área do jogo | Posição horizontal do mouse na tela toda - posição início do jogo 
        cesta.css("left", mouseX - cesta.width() / 2); // Move a cesta e centraliza no mouse
    });

    intervaloOvos = setInterval(criarOvo, 1500);    //Gera um ovo no período determinado

    iniciarTimer(); // Inicia timer do jogo
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função para gerar um ovo na tela
function criarOvo() 
{
    if (!jogoAtivo) return; // Bloqueia geração de ovos no final do jogo
    
    let ovo = $('<img class="ovo" src="imagens/ovo.png">'); // Cria uma imagem de ovo

    let posX = Math.random() * ($('.tela').width() - 40);   // Atribui à uma variável uma posição horizontal aleatória (entre 0 e a largura da tela - largura do ovo)

    // Define posição inicial do ovo
    ovo.css({
        left: posX + 'px',  //Pega a variável posX e define seu valor como pixels
        top: '-50px'    // Acima da tela jogável
    });

    $('.tela').append(ovo);     // Adiciona o ovo dentro da tela

    cairOvo(ovo);   // Chama função para fazer o ovo cair
}


// Função de animação de queda do ovo
function cairOvo(ovo) 
{
    let cesta = $(".cesta");

    ovo.animate(
        { top: "600px" },   // Move da posição vertical(top) até 600px
        {
            duration: 3000,     // Duração (milissegundos)
            easing: "linear",   // Tipo de animação
            
            step: function ()   //Função step - verifica a cada frame de animação
            {
                if (houveColisao(ovo, cesta)) 
                {
                    ovo.stop();   // Para a animação
                    ovo.remove(); // Remove o ovo
                    aumentarPontos(); // Soma pontos
                }
            },
            
            complete: function () 
            {
                ovo.remove(); // Quando a animação termina, remove o ovo
            }
        }
    );
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função que verifica colisão simples entre ovo e cesta
function houveColisao(ovo, cesta) 
{
    // offset() - Função JQuery que retorna a posição absoluta de algo na página em pixels

    let posOvo = ovo.offset(); // Pega a posição atual do ovo | Exemplo: { top: 123, left: 250 }
    let posCesta = cesta.offset(); // Pega a posição atual da cesta

    // Coleta dados do ovo
    let ovoTopo = posOvo.top; // Distância do topo da página até a parte de cima do ovo
    let ovoEsq = posOvo.left; // Distância da esquerda da página até a lateral esquerda do ovo
    let ovoBase = ovoTopo + ovo.height(); // A posição da parte de baixo do ovo
    let ovoDir = ovoEsq + ovo.width(); // A posição da lateral direita do ovo

    // Com essas quatro variáveis, têm a posição exata do retângulo do ovo
    
    // Coleta dados da cesta
    let cestaTopo = posCesta.top; // Posição do topo da cesta
    let cestaEsq = posCesta.left; // Lateral esquerda da cesta
    let cestaDir = cestaEsq + cesta.width(); //Lateral direita da cesta

    // Com essas três variáveis, têm a posição da boca da cesta

    // Verifica se horizontalmente o ovo encostou na cesta
    let alinhadoHorizontal = ovoDir >= cestaEsq && ovoEsq <= cestaDir; // A direita do ovo passou da esquerda da cesta? | A esquerda do ovo passou da direita da cesta?

    // Verifica se a parte de baixo do ovo chegou no topo da cesta
    let tocouTopo = ovoBase >= cestaTopo; // A base do ovo encostou ou passou da borda superior da cesta?

    // Retorna o resultado das condições
    return alinhadoHorizontal && tocouTopo;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função para contar e exibir os pontos
function aumentarPontos() 
{
    pontos++; // Aumenta pontuação
    $("#placar").text("Pontos: " + pontos); // Exibe placar atualizado
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função que controla o tempo de jogo
function iniciarTimer() 
{
    intervaloTimer = setInterval(function () 
    {
        tempo--; // Reduz os segundos

        $("#tempo").text("Tempo: " + tempo); // Mostra o tempo restante atualizado

        if (tempo <= 0) 
        {
            fimDeJogo();
        }
    }, 1000);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função que termina o jogo, reseta os valores e mostra pontuação
function fimDeJogo() 
{
    jogoAtivo = false; // Muda a flag para falso

    clearInterval(intervaloTimer); // Reseta o timer
    clearInterval(intervaloOvos); // Reseta ovos na tela

    alert("Fim de jogo! Pontuação: " + pontos); // Mostra pontuação do jogador
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------