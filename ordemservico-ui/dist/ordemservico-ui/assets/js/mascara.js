
/* Metodo para mascaras nos campos */
function criarMascara(mascara, documento) {

    var i = documento.value.length; // vai pegar cada caractere no campo
    var saida = mascara.substring(2,1); // se colocar no substring(0,1) não vai funcionar corretamente a mascara para telefone entao (2,1)
    var texto = mascara.substring(i); 

    if(texto.substring(0,1) != saida) {
      documento.value += texto.substring(0,1);
    }
}
