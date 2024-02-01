let listaDeNumeroSorteados = [];
let numMaximo = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    exibirTextoNaTela('.titulo-jogo', 'Jogo do Número Secreto!');
    exibirTextoNaTela('.texto__paragrafo', `Escolha um número entre 1 e ${numMaximo}:`);
}
mensagemInicial()

function verificarChute() {
    let numeroSecreto = document.querySelector('input').value;
    console.log(numeroSecreto == numeroAleatorio);

    if( numeroSecreto == numeroAleatorio ) {
        exibirTextoNaTela('.titulo-jogo', 'Acertou!!!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Isso aí! Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativas}`
        exibirTextoNaTela('.texto__paragrafo', mensagemTentativas);
        
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (numeroSecreto > numeroAleatorio){
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    numeroSecreto = document.querySelector('input');
    numeroSecreto.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numMaximo + 1);
    let qtdElementosLista = listaDeNumeroSorteados.length;

    if (qtdElementosLista == numMaximo) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados)
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


