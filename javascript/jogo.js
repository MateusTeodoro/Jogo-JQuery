//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

    setInterval(criarOvo, 1500);    //Gera um ovo no período determinado
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Função para gerar um ovo na tela
function criarOvo() 
{
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

    let posOvo = ovo.offset();
    let posCesta = cesta.offset();

    // Coleta dados do ovo
    let ovoTopo = posOvo.top;
    let ovoEsq = posOvo.left;
    let ovoBase = ovoTopo + ovo.height();
    let ovoDir = ovoEsq + ovo.width();

    // Coleta dados da cesta
    let cestaTopo = posCesta.top;
    let cestaEsq = posCesta.left;
    let cestaDir = cestaEsq + cesta.width();

    // Verifica se horizontalmente o ovo encostou na cesta
    let alinhadoHorizontal = ovoDir >= cestaEsq && ovoEsq <= cestaDir;

    // Verifica se a parte de baixo do ovo chegou no topo da cesta
    let tocouTopo = ovoBase >= cestaTopo;

    // Retorna o resultado das condições
    return alinhadoHorizontal && tocouTopo;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let pontos = 0; // Variável que conta o placar

//Função para contar e exibir os pontos
function aumentarPontos() 
{
    pontos++;
    $("#placar").text("Pontos: " + pontos);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let tempoRestante = 30; // Variável que controla o tempo de jogo
//Função que controla o tempo de jogo
function iniciarTimer() 
{
    let timer = setInterval(function () 
    {
        tempoRestante--; // Reduz os segundos

        $("#tempo").text("Tempo: " + tempoRestante); // Mostra o tempo restante atualizado

        if (tempoRestante <= 0) 
        {
            clearInterval(timer);
            alert("Fim de jogo! Pontuação: " + pontos);
        }
    }, 1000);
}


//Chama a função após o HTML ser carregado para começar o jogo
$(function () 
{
    iniciarTimer();
});


