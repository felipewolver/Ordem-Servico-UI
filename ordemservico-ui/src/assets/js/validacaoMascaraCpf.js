/* Vai validar o cpf e cria uma mascara para o mesmo */

//Inicio de validação de Cpf
function validar() {

    var cpf = document.getElementById("cpf");
    var texto = document.getElementById("message-erro");
    texto.innerHTML= "";

    if(testaCPF(cpf)) {
      
      //return alert('CPF inválido');
      texto.innerHTML = " <span class='ui-messages ui-messages-error' >CPF inválido! </span>";
      
    } 
    // else alert('Cpf Válido') testando um CPF Válido.
}
  
// Função para Validar CPF
function testaCPF(controle) {
    const cpf = controle.value;

    let soma = 0;
    let resto;
    let valido;

    const regex = new RegExp('[0-9]{11}');

    if (
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999' ||
    !regex.test(cpf)
    )
    valido = false;
    else {
    for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) valido = false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) valido = false;
    valido = true;
    }

    if (valido) return null;

    return { cpfInvalido: true }; 
}

function criarMascaraCpf() {
    
var campoCpf = document.getElementById("cpf");

var cpf =  campoCpf;

var re_cpf = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;
cpf.value = cpf.value.replace(re_cpf, '$1.$2.$3-$4');  

}  //Fim da validação de Cpf