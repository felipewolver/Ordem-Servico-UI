 //Método para preenchimento de CEP automático
 $(document).ready(function() {

    function limpaFormularioCep() {

    // Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    // Não estah sendo usado $("#cidade").val(""); 
    // Não estah sendo usad $("#uf").val("");
    // Não estah sendo usad $("#ibge").val("");
    }
  
   // Vai executar quando o campo perder o foco com o evento .blur
    $("#cep").blur(function() {
    
    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, '');
    
    //Variável para limpar a mensagem de erro caso o usuario digitar o Cep inválido ou inexistente. 
    var cepError = document.getElementById("errorCep");
    cepError.innerHTML = "";

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      
      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        $("#rua").val("...");
        $("#bairro").val("...");
        // Não estah sendo usado $("#cidade").val("..."); 
        // Não estah sendo usad $("#uf").val("...");
        // Não estah sendo usad $("#ibge").val("...");

        //Consulta o webservice viacep.com.br/
        $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
          
          if(!("erro" in dados)) {
            
            //Atualiza os campos com os valores da consulta.
            $("#rua").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            // Não estah sendo usado $("#cidade").val(dados.localidade);
            // Não estah sendo usado $("#uf").val(dados.uf);
            // Não estah sendo usado $("#ibge").val(dados.ibge);
          } else {

            //CEP pesquisado não foi encontrado.
            limpaFormularioCep();
            $("#cep").val("");
           // alert("CEP não encontrado.");

            var cepError = document.getElementById("errorCep");
            cepError.innerHTML = "<span class='ui-messages ui-messages-error'> CEP não encontrado </span>"
          } // fim do if que verifica e atualiza os valores da comsulta
        
        }); // fim da função consulta no webservice viacep.com.br

      } else {
       
        // CEP é inválido
        limpaFormularioCep();
        $("#cep").val("");
        //alert("Formato de CEP inválido");
       
        var cepError = document.getElementById("errorCep");
        cepError.innerHTML = "<span class='ui-messages ui-messages-error'> Formato de CEP inválido! </span>"
         
      } // fim do if que verifica se o cep eh válido
    
    } else {

      //cep sem valor, limpa formulário.
      limpaFormularioCep();
    } // fim do if que verifica se o Cep tem valor

  }); // fim da function .blur que perde o foco
  
}); // Fim de toda function