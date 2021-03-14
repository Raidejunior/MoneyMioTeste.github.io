/* // Este evendo é acionado após o carregamento da página
jQuery(window).load(function() {
    //Após a leitura da pagina o evento fadeOut do loader é acionado, esta com delay para ser perceptivo em ambiente fora do servidor.
    jQuery(".loading-spiner-holder").delay(2000).fadeOut("slow");
});
 */

$(document).ready(function() {

    $("#formSimulacaoWeb").validate({
        rules: {
            ValorSolicitado: {
                maxlength: 10
            }
        }
    })

    $("#ValorSolicitado").keydown(function() {

        $("#ValorSolicitado").maskMoney({
            prefix: 'R$ ',
            thousands: '.',
            decimal: ','
        });

        $("#divSimularEmprestimo").removeClass("d-none");

    });


    $("#ValorImovel").keydown(function() {

        $("#ValorImovel").maskMoney({
            prefix: 'R$ ',
            thousands: '.',
            decimal: ','
        });

        $("#divButtonSubmit").removeClass("d-none");

    });



    document.body.onresize = function() {

        if (document.body.clientWidth < 640) {
            $("#formSimulacaoWebSM").validate({
                rules: {
                    ValorSolicitado: {
                        maxlength: 10
                    }
                }
            })

            $("#ValorSolicitadoSM").keydown(function() {

                $("#ValorSolicitadoSM").maskMoney({
                    prefix: 'R$ ',
                    thousands: '.',
                    decimal: ','
                });

                $("#divSimularEmprestimoSM").removeClass("d-none");

            });


            $("#ValorImovelSM").keydown(function() {

                $("#ValorImovelSM").maskMoney({
                    prefix: 'R$ ',
                    thousands: '.',
                    decimal: ','
                });

                $("#divButtonSubmitSM").removeClass("d-none");

            });

        }
    };



    /* $("#ValorImovel").mask("99.999.990,00", {
            reverse: true
        }) */
    /* 
    $("#cpf").mask("000.000.000-00")
    $("#cnpj").mask("00.000.000/0000-00")
    $("#telefone").mask("(00) 0000-0000")
    $("#cep").mask("00.000-000")
    $("#dataNascimento").mask("00/00/0000")

    $("#rg").mask("999.999.999-W", {
        translation: {
            'W': {
                pattern: /[X0-9]/
            }
        },
        reverse: true
    })

    var options = {
        translation: {
            'A': {
                pattern: /[A-Z]/
            },
            'a': {
                pattern: /[a-zA-Z]/
            },
            'S': {
                pattern: /[a-zA-Z0-9]/
            },
            'L': {
                pattern: /[a-z]/
            },
        }
    }

    $("#placa").mask("AAA-0000", options)

    $("#codigo").mask("AA.LLL.0000", options)

    $("#celular").mask("(00) 0000-00009")

    $("#celular").blur(function(event) {
        if ($(this).val().length == 15) {
            $("#celular").mask("(00) 00000-0009")
        } else {
            $("#celular").mask("(00) 0000-00009")
        }
    }) */
})