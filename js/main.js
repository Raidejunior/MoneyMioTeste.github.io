/**
 * Tuna Signup Form Wizard
 * @type Javascript Class
 */
var valoremprestimo = document.getElementById('valoremprestimo');
var valoremprestimo2 = document.getElementById('valoremprestimo2');
var tn_name = document.getElementById('tn_name');
var valorimovel = document.getElementById('valorimovel');
var valorimovel2 = document.getElementById('valorimovel2');
var valoratualemprestimo;
var valoratualimovel2;
var month;

var tunaWizard = {
    stepCount: 0,
    slider: null,
    /**
     * Resize for Responsive
     */
    setResponsive: function() {
        var self = this;
        /*var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        windowHeight = windowHeight > 360 ? windowHeight : 360;
        var tunaContainer = $(".tuna-signup-container");
        var tunaLeft = $(".tuna-signup-left");
        var tunaRight = $(".tuna-signup-right");

        if (windowWidth >= 768) {
            tunaContainer.add(tunaLeft).add(tunaRight).innerHeight(windowHeight);
        } else {
            tunaContainer.add(tunaLeft).add(tunaRight).css("height", "auto");
        }
        
        //Testimonail Slider Show/Hide
        var sliderContainer = $(".tuna-slider-container");
        if (windowHeight < 600 || windowWidth < 768) {
            sliderContainer.hide();
        } else {
            sliderContainer.show();
            //Reload slider because of hidden
            self.slider.reloadSlider();
        }
        if (windowHeight < 400) {
            $(".button-container").css("bottom", "50px");
        }*/

    },
    /**
     * Change Step
     * @param int currentStep
     * @param int nextStep
     * @returns {void|Boolean}
     */
    changeStep: function(currentStep, nextStep) {
        var self = this;

        if (nextStep <= 0 && nextStep > 8) {
            return false;
        }

        //Validations
        if (nextStep === 1) {
            if (!($("#simulador").hasClass("d-none") && !($("#left-layout").hasClass("d-none")))) {
                $("#simulador").addClass("d-none");
                $("#left-layout").removeClass("d-none");
            }
        }

        if (nextStep === 2) {

            if ($("#valoremprestimo").val().trim() === "") {
                self.setInputError($("#valorimovel"));
                return;
            }

            if ($("#valorimovel").val().trim() === "") {
                self.setInputError($("#valorimovel"));
                return;
            }

            if (($("#valoremprestimo").val().trim() !== "") && ($("#valorimovel").val().trim() !== "")) {
                if ($("#simulador").hasClass("d-none")) {
                    $("#simulador").removeClass("d-none");
                    $("#left-layout").addClass("d-none");
                }
            }

            valoratualemprestimo = valoremprestimo.value;

            simular();

        }



        //Value validation
        if (nextStep === 3) {

            if ($("#valoremprestimo2").val().trim() === "") {
                self.setInputError($("#valoremprestimo2"));
                return;
            }
            if ($("#valorimovel2").val().trim() === "") {
                self.setInputError($("#valorimovel2"));
                return;
            }

            if (!($("#simulador").hasClass("d-none") && !($("#left-layout").hasClass("d-none")))) {
                $("#simulador").addClass("d-none");
                $("#left-layout").removeClass("d-none");
            }

        }

        if (nextStep === 4) {
            if ($("#tn_name").val().trim() === "") {
                self.setInputError($("#tn_name"));
                return;
            }
        }
        if (nextStep === 5) {
            if ($("#tn_email").val().trim() === "" || !self.isEmail($("#tn_email").val().trim())) {
                self.setInputError($("#tn_email"));
                return;
            }
        }
        if (nextStep === 6) {
            if ($("#tn_cpf").val().trim() === "" || $("#tn_cpf").val().trim().length != 14) {
                self.setInputError($("#tn_cpf"));
                return;
            }
        }
        if (nextStep === 8) {
            if ($("#tn_phone").val().trim() === "" || $("#tn_phone").val().trim().length < 14) {
                self.setInputError($("#tn_phone"));
                return;
            }
        }

        //Change Step
        if (nextStep > currentStep) {
            $(".step-active").removeClass("step-active").addClass("step-hide");
        } else {
            $(".step-active").removeClass("step-active");
        }

        var nextStepEl = $(".step[data-step-id='" + nextStep + "']");
        nextStepEl.removeClass("step-hide").addClass("step-active");

        //Focus Input
        window.setTimeout(function() {
            if (nextStep !== self.stepCount) {
                nextStepEl.find("input").focus();
            }
        }, 500);

        var stepCountsEl = $(".steps-count");
        if (nextStep === self.stepCount) {
            stepCountsEl.html("CONFIRME SUAS INFORMAÇÕES");
            $(".button-container").hide();
            var stepConfirm = $(".step-confirm");
            stepConfirm.find("input[name='valoremprestimo']").val($("#valoremprestimo2").val());
            stepConfirm.find("input[name='valorimovel']").val($("#valorimovel2").val());
            stepConfirm.find("input[name='name']").val($("#tn_name").val());
            stepConfirm.find("input[name='email']").val($("#tn_email").val());
            stepConfirm.find("input[name='phone']").val($("#tn_phone").val());
            stepConfirm.find("input[name='cpf']").val($("#tn_cpf").val());
        }

        //Atualização de número do passo atual
        if (nextStep === 2) {

            stepCountsEl.find("span.step-current").text(1);

        }

        if (nextStep === 3) {

            stepCountsEl.find("span.step-current").text(2);




        }

        if (nextStep === 4) {

            stepCountsEl.find("span.step-current").text(2);

        }

        if (nextStep === 5) {

            stepCountsEl.find("span.step-current").text(2);

        }

        if (nextStep === 6) {

            stepCountsEl.find("span.step-current").text(2);

        }

        if (nextStep === 7) {

            stepCountsEl.find("span.step-current").text(3);

        }

        if (nextStep === 8) {

            stepCountsEl.find("span.step-current").text(3);

        }

        //Hide prevButton if we are in first step
        var prevStepEl = $(".prevStep");
        if (nextStep === 1) {
            prevStepEl.hide();
        } else {
            prevStepEl.css("display", "inline-block");
        }

        /* ------------------------------------- Guardando variáveis ------------------------------------------------ */

        if (valoremprestimo && valoremprestimo.value) {
            valoremprestimo2.value = valoremprestimo.value;
        }

        if (valorimovel && valorimovel.value) {
            valorimovel2.value = valorimovel.value;
        }

    },
    /**
     * Show Validation Message
     * @param HtmlElement el
     * @returns void
     */
    setInputError: function(el) {
        el.addClass("input-error");
        el.parents(".step").find(".help-info").hide();
        el.parents(".step").find(".help-error").show();
    },
    /**
     * Check email is valid or not
     * @param String value
     * @returns Boolean
     */
    isEmail: function(value) {
        value = value.toLowerCase();
        var reg = new RegExp(/^[a-z]{1}[\d\w\.-]+@[\d\w-]{3,}\.[\w]{2,3}(\.\w{2})?$/);
        return reg.test(value);
    },
    /**
     * Executes Signup Wizard
     * @returns void
     */
    start: function() {
        var self = this;
        /**
         * Testimonial Slider - Uses bxslider jquery plugin
         */
        self.slider = $('.tuna-slider').bxSlider({
            controls: false, // Left and Right Arrows
            auto: true, // Slides will automatically transition
            mode: 'horizontal', // horizontal,vertical,fade
            pager: true, // true, a pager will be added
            speed: 500, // Slide transition duration (in ms)
            pause: 5000 // The amount of time (in ms) between each auto transition
        });

        //Jquery Uniform Plugin
        $(".tuna-signup-container input[type='checkbox'],.tuna-signup-container input[type='radio'], .select").uniform();

        //Jquery Mask Plugin
        $('.tuna-signup-container input[name="phone"],.tuna-signup-container input[name="tn_phone"]').mask('(00) 00000-0000');

        // Focuses on valoremprestimo input, when page loaded
        window.setTimeout(function() {
            $("#valoremprestimo").focus();
        }, 500);

        // Responsive
        self.setResponsive();
        $(window).resize(function() {
            self.setResponsive();
        });

        // Steps Count
        self.stepCount = $(".tuna-steps .step").length;
        $(".step-count").text(4);

        // Next Step
        $(".nextStep").on("click", function() {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) + 1;
            self.changeStep(currentStep, nextStep);
        });

        // Prev Step
        $(".prevStep").on("click", function() {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) - 1;
            self.changeStep(currentStep, nextStep);
        });

        // Confirm Details - Show Input
        var stepConfirm = $(".step-confirm");
        stepConfirm.find(".input-container a.editInput").on("click", function() {
            $(this).parent().find("input").focus();
        });

        // Confirm Details - Show cpf
        stepConfirm.find(".input-container a.showPass").on("mousedown", function() {
            $(this).parent().find("input").attr("type", "text");
        }).mouseup(function() {
            $(this).parent().find("input").attr("type", "cpf");
        });

        stepConfirm.find(".input-container input").on("focus", function() {
            $(this).parent().find("a").hide();
        });

        stepConfirm.find(".input-container input").on("focusout", function() {
            if (!$(this).hasClass("confirm-input-error")) {
                $(this).parent().find("a").show();
            }
        })

        stepConfirm.find("select").on('shown.bs.select', function(e) {
            $(this).parents(".form-group").find("a.editInput").hide();
        }).on('hidden.bs.select', function(e) {
            $(this).parents(".form-group").find("a.editInput").show();
        });

        //Press Enter and go to nextStep
        $(".step input").not(".step-confirm input").on("keypress", function(e) {
            if (e.keyCode === 13) {
                $(".nextStep").click();
            }
        });

        var signupForm = $("form[name='signupForm']");
        //Press Enter and submit form
        signupForm.find("input").on("keypress", function(e) {
            if (e.keyCode === 13) {
                signupForm.submit();
            }
        });

        //Finish Button
        $(".finishBtn").on("click", function() {
            signupForm.submit();
        })

        // Form Submit
        signupForm.on("submit", function(e) {

            e.preventDefault();

            $(this).find(".confirm-input-error").removeClass("confirm-input-error");

            var nameInput = $(this).find("input[name='valoremprestimo']");
            if (nameInput.val().trim() === "") {
                nameInput.addClass("confirm-input-error").focus();
                return;
            }

            var nameInput = $(this).find("input[name='valorimovel']");
            if (nameInput.val().trim() === "") {
                nameInput.addClass("confirm-input-error").focus();
                return;
            }

            var nameInput = $(this).find("input[name='name']");
            if (nameInput.val().trim() === "") {
                nameInput.addClass("confirm-input-error").focus();
                return;
            }

            var emailInput = $(this).find("input[name='email']");
            if (emailInput.val().trim() === "" || !self.isEmail(emailInput.val().trim())) {
                emailInput.addClass("confirm-input-error").focus();
                return;
            }

            var cpfInput = $(this).find("input[name='cpf']");
            if (cpfInput.val().trim() === "" || cpfInput.val().trim().length != 14) {
                cpfInput.addClass("confirm-input-error").focus();
                return;
            }

            var phoneInput = $(this).find("input[name='phone']");
            if (phoneInput.val().trim() === "" || phoneInput.val().trim().length < 14) {
                phoneInput.addClass("confirm-input-error").focus();
                return;
            }

            if (!$("input[name='agreement']").prop("checked")) {
                swal({
                    title: "Atenção!",
                    text: "Você deve concordar com os termos e condições.",
                    type: "warning",
                    confirmButtonText: "Ok"
                });
                return;
            }

            swal({
                title: null,
                text: "<img class='tuna_loading' src='/images/loading.svg'/> Saving...",
                html: true,
                showConfirmButton: false
            });

            //Send form to php file
            $.post("../php/smtp.php", $(this).serialize(), function(result) {
                if (result.success) {
                    swal({
                        title: "SUCESSO",
                        text: "Suas informações foram enviadas com sucesso! Em breve entraremos em contato",
                        type: "success",
                        confirmButtonText: "Ok"
                    });
                } else {
                    swal({
                        title: "Erro!",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "Ok"
                    });
                }
            }, 'json');

        });


    },
}


/**
 * Material Input 
 * @returns object
 */
$.fn.materialInput = function() {

    var label;
    var el = this;

    el.find('input.formInput').keydown(function(e) {
        el.setLabel(e.target);
        el.checkFocused(e.target);
    });

    el.find('input.formInput').focusout(function(e) {
        el.setLabel(e.target);
        el.checkUnFocused(e.target);
    });

    this.setLabel = function(target) {
        label = el.find('label[for=' + target.id + ']');
    };

    this.getLabel = function() {
        return label;
    };

    this.checkFocused = function(target) {
        el.getLabel().addClass('active', '');
        $(target).removeClass("input-error");
        $(target).next().hide();
        $(target).parent().find(".info").show();
    };

    this.checkUnFocused = function(target) {
        if ($(target).val().length === 0) {
            el.getLabel().removeClass('active');
        }
    };
};


$(document).ready(function() {

    /**
     * Page Loader
     * If you remove loader, you can delete .tuna-loader-container element from Html, and delete this two rows.
     */
    $(".tuna-loader-container").fadeOut("slow");
    $(".tuna-signup-container").show();


    /**
     * Material Inputs
     * Makes, inputs in selected element material design.
     */
    $(".tuna-steps").materialInput();


    $(".selectpicker").selectpicker();

    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    tunaWizard.start();


    /* -------------------------- Scripts adicionados para o simulador ------------------------------------- */


    /* --------------------- MÁSCARA MOEDA REAL MONEYMIO --------------------- */


    /* $("#formSimulacaoWeb").validate({
        rules: {
            ValorSolicitado: {
                maxlength: 10
            }
        }
    }) */

    $("#valoremprestimo").keydown(function() {

        $("#valoremprestimo").maskMoney({
            prefix: 'R$ ',
            thousands: '.',
            decimal: ','
        });

        $("#valorimovel").removeClass("d-none");

        if ($("#valorimovel").hasClass("d-none"))
            $("#formInput").removeClass("d-none");

    });


    $("#valorimovel").keydown(function() {

        $("#valorimovel").maskMoney({
            prefix: 'R$ ',
            thousands: '.',
            decimal: ','
        });

    });



    $('.month').on('click', function(event) {

        var id = $(this).attr('id');

        $('.month').removeClass('selected-month');
        $(this).addClass('selected-month');
        $(".month").removeClass("active-month");
        $(this).addClass("active-month");

        //calcualtePrice(valoremprestimo2.value, valorimovel2.value);
        simular();
    });

    /* 
        update();
        calcualtePrice(); */

});

/* ---------------------------------------------- Cálculo empréstimo ---------------------------------------------- */


var p = {

    0: "100K",
    1: "150K",
    2: "200K",
    3: "250K",
    4: "300K",
    5: "350K",
    6: "400K",
    7: "450K",
    8: "500K",
    9: "550K",
    10: "600K",
    11: "650K",
    12: "700K",
    13: "750K",
    14: "800K",
    15: "850K",
    16: "900K",
    17: "950K",
    18: "1,000K",
    19: "1,100K",
    20: "1,200K",
    21: "1,300K",
    22: "1,400K",
    23: "1,500K",
    24: "1,600K",
    25: "1,700K",
    26: "1,800K",
    27: "19,00K",
    28: "2,000K",
};

/* var t = {
 
    0: "100000",
    1: "150000",
    2: "200000",
    3: "250000",
    4: "300000",
    5: "350000",
    6: "400000",
    7: "450000",
    8: "500000",
    9: "550000",
    10: "600000",
    11: "650000",
    12: "700000",
    13: "750000",
    14: "800000",
    15: "850000",
    16: "900000",
    17: "950000",
    18: "1000000",
    19: "1100000",
    20: "1200000",
    21: "1300000",
    22: "1400000",
    23: "1500000",
    24: "1600000",
    25: "1700000",
    26: "1800000",
    27: "1900000",
    28: "2000000",
 
} */

var obj = {
    '144month': 144,
    '132month': 132,
    '120month': 120,

    '108month': 108,
    '96month': 96,
    '84month': 84,
    '72month': 72,

    '60month': 60,
    '48month': 48,
    '36month': 36
};







/* $("#slider_amirol").slider({
    range: "min",
    animate: true,
 
    min: 0,
    max: 28,
    step: 1,
    slide: function(event, ui) {
        update(1, ui.value); //changed
        calcualtePrice(ui.value);
    }
}); */


// Antiga forma de cálculo.
//function calcualtePrice(valemp, valimo) {

//if (undefined === valemp || undefined === valimo)
//    valemp = 0, valimo = 0;

//valemp = Number(valemp.replace(/[^0-9,]*/g, '').replace(',', '.'));
//valimo = Number(valimo.replace(/[^0-9,]*/g, '').replace(',', '.'));


//month = $(".selected-month").attr('id');
//var term = obj[month];
//var totalPrice = valemp + (valemp * term / (valimo * 0.07)) * 1000;
//var primeiraParcela = totalPrice / 12;


//var valExibir = totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
//var exibirprimeiraParcela = primeiraParcela.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });


//$("#total12").val(valExibir);
//$("#primeiraparcela").val(exibirprimeiraParcela);

// $("#total52").val(Math.round((totalPrice) / 52).toFixed(2));
//}

"use strict"
class financiar {
    constructor(vP, i, n) {
        this.pmt = []; /* Prestação do Financiamento*/
        this.vP = vP; /* Valor Presente(Valor do Financiamento) */
        this.i = i; /* Taxa de Juros ( ao mês)*/
        this.n = n; /* Número de Parcelas(Período)*/
        this.a = 0; /* Amortização = Valor do Financiamento dividido pelo número de parcelas */
        this.totalJuros = 0; /* Total de juros pagos no financiamento*/
        this.totalPago = 0; /* Total pago no financiamento acrescido os juros*/
        this.listaSacText = ""; /* Armazena uma lista de texto puro com as prestações SAC*/
        this.listaSacHTML = ""; /* Armazena uma lista de html com as prestações SAC*/

    }
    tratarMascaraReal() {
        let vp = this.vP.replace(".", "");
        vp = vp.replace(",", ".");
        this.vP = vp;

        let i = this.i.replace(".", "");
        i = i.replace(",", ".");
        this.i = i;

    }
    formataDados() {
        this.i = (this.i) / 100; /* A taxa é dada em %, logo precisamos dividir por 100(pr cento) */
    }

    formataMascara(label, valor) {
        let formato = { minimumFractionDigits: 2, style: 'currency', currency: label }
        return valor.toLocaleString('pt-BR', formato)
    }

    calculaAmortizacao() {
        this.a = this.vP / this.n;
        return this.a;
    }

    financiarPrice() {
        /* Aplicamos a fórmula de financiamento com base na tabela PRICE */
        let prestacao = this.vP * (Math.pow((1 + this.i), this.n) * this.i) / (Math.pow((1 + this.i), this.n) - 1);
        this.pmt.push(prestacao);
        return this.formataMascara('BRL', this.pmt[0]);
    }

    financiarSac() {
        /* Aplicamos a fórmula de financiamento com base na tabela SAC */
        this.calculaAmortizacao();
        for (let y = 0; y < this.n; y++) {
            let prestacao = this.a + this.i * (this.vP - (y * this.a));
            this.pmt.push(prestacao);
            this.listaSacText += (y + 1) + ". prestação: " + this.formataMascara('BRL', prestacao) + "\n\r";
            this.listaSacHTML += (y + 1) + ". prestação: " + this.formataMascara('BRL', prestacao) + "<br>";
        }
    }

    calculaTotalPagoPrice() {
        this.totalPago = this.pmt[0] * this.n;
        return this.formataMascara('BRL', this.totalPago);
    }

    calculaTotalJurosPrice() {
        if (this.totalPago === 0) {
            let total = this.calculaTotalPagoPrice();
            this.totalJuros = total - this.vP;
        } else {
            this.totalJuros = this.totalPago - this.vP;
        }
        return this.formataMascara('BRL', this.totalJuros);
    }
    calculaTotalPagoSac() {
        for (let p = 0; p < this.n; p++) {
            this.totalPago += this.pmt[p];
        }
        return this.formataMascara('BRL', this.totalPago);
    }
    calculaTotalJurosSac() {
        if (this.totalPago === 0) {
            let total = this.calculaTotalPagoSac();
            this.totalJuros = total - this.vP;
        } else {
            this.totalJuros = this.totalPago - this.vP;
        }
        return this.formataMascara('BRL', this.totalJuros);
    }
}


function simular() {
    let valor = Number(valoratualemprestimo.replace(/[^0-9,]*/g, '').replace(',', '.'));;
    let taxa = 0.0079; //i
    month = $(".selected-month").attr('id');
    let parcelas = this.obj[month]; //n
    if (valor !== "" && taxa !== "" && parcelas !== "") {


        let simuladorA = new financiar(valor, taxa, parcelas);


        var primeiraParcela = simuladorA.financiarPrice();
        var totalPrice = simuladorA.calculaTotalPagoPrice();


        $("#primeiraparcela").val(primeiraParcela);
        $("#total").val(totalPrice);

    }
}

function alteravalor() {

    valoratualemprestimo = $('#valoremprestimo2').val();
    valoratualimovel2 = $('#valorimovel2').val();

    simular();

    valoremprestimo.value = valoratualemprestimo;
    valorimovel.value = valoratualimovel2;

}

/* ----------------------------------------- Scripts adicionados timeline ----------------------------------------- */

jQuery(document).ready(function($) {
    var timelines = $('.cd-horizontal-timeline'),
        eventsMinDistance = 60;

    (timelines.length > 0) && initTimeline(timelines);

    function initTimeline(timelines) {
        timelines.each(function() {
            var timeline = $(this),
                timelineComponents = {};
            //cache timeline components 
            timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
            timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
            timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
            timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
            timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
            timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
            timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
            timelineComponents['eventsContent'] = timeline.children('.events-content');

            //assign a left postion to the single events along the timeline
            setDatePosition(timelineComponents, eventsMinDistance);
            //assign a width to the timeline
            var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
            //the timeline has been initialize - show it
            timeline.addClass('loaded');

            //detect click on the next arrow
            timelineComponents['timelineNavigation'].on('click', '.next', function(event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'next');
            });
            //detect click on the prev arrow
            timelineComponents['timelineNavigation'].on('click', '.prev', function(event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'prev');
            });
            //detect click on the a single event - show new event content
            timelineComponents['eventsWrapper'].on('click', 'a', function(event) {
                event.preventDefault();
                timelineComponents['timelineEvents'].removeClass('selected');
                $(this).addClass('selected');
                updateOlderEvents($(this));
                updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                updateVisibleContent($(this), timelineComponents['eventsContent']);
            });

            //on swipe, show next/prev event content
            timelineComponents['eventsContent'].on('swipeleft', function() {
                var mq = checkMQ();
                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
            });
            timelineComponents['eventsContent'].on('swiperight', function() {
                var mq = checkMQ();
                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
            });

            //keyboard navigation
            $(document).keyup(function(event) {
                if (event.which == '37' && elementInViewport(timeline.get(0))) {
                    showNewContent(timelineComponents, timelineTotWidth, 'prev');
                } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                    showNewContent(timelineComponents, timelineTotWidth, 'next');
                }
            });
        });
    }

    function updateSlide(timelineComponents, timelineTotWidth, string) {
        //retrieve translateX value of timelineComponents['eventsWrapper']
        var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
            wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
        //translate the timeline to the left('next')/right('prev') 
        (string == 'next') ?
        translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth): translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
    }

    function showNewContent(timelineComponents, timelineTotWidth, string) {
        //go from one event to the next/previous one
        var visibleContent = timelineComponents['eventsContent'].find('.selected'),
            newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

        if (newContent.length > 0) { //if there's a next/prev event - show it
            var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
                newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

            updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
            updateVisibleContent(newEvent, timelineComponents['eventsContent']);
            newEvent.addClass('selected');
            selectedDate.removeClass('selected');
            updateOlderEvents(newEvent);
            updateTimelinePosition(string, newEvent, timelineComponents);
        }
    }

    function updateTimelinePosition(string, event, timelineComponents) {
        //translate timeline to the left/right according to the position of the selected event
        var eventStyle = window.getComputedStyle(event.get(0), null),
            eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
            timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
            timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
        var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < -timelineTranslate)) {
            translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
        }
    }

    function translateTimeline(timelineComponents, value, totWidth) {
        var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
        value = (value > 0) ? 0 : value; //only negative translate value
        value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
        setTransformValue(eventsWrapper, 'translateX', value + 'px');
        //update navigation arrows visibility
        (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive'): timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
        (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive'): timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
    }

    function updateFilling(selectedEvent, filling, totWidth) {
        //change .filling-line length according to the selected event
        var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
            eventLeft = eventStyle.getPropertyValue("left"),
            eventWidth = eventStyle.getPropertyValue("width");
        eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
        var scaleValue = eventLeft / totWidth;
        setTransformValue(filling.get(0), 'scaleX', scaleValue);
    }

    function setDatePosition(timelineComponents, min) {
        for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
            var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
                distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
            timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
        }
    }

    function setTimelineWidth(timelineComponents, width) {
        var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
            timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
            timeSpanNorm = Math.round(timeSpanNorm) + 4,
            totalWidth = timeSpanNorm * width;
        timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
        updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
        updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

        return totalWidth;
    }

    function updateVisibleContent(event, eventsContent) {
        var eventDate = event.data('date'),
            visibleContent = eventsContent.find('.selected'),
            selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
            selectedContentHeight = selectedContent.height();

        if (selectedContent.index() > visibleContent.index()) {
            var classEnetering = 'selected enter-right',
                classLeaving = 'leave-left';
        } else {
            var classEnetering = 'selected enter-left',
                classLeaving = 'leave-right';
        }

        selectedContent.attr('class', classEnetering);
        visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
            visibleContent.removeClass('leave-right leave-left');
            selectedContent.removeClass('enter-left enter-right');
        });
    }

    function updateOlderEvents(event) {
        event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
    }

    function getTranslateValue(timeline) {
        var timelineStyle = window.getComputedStyle(timeline.get(0), null),
            timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
            timelineStyle.getPropertyValue("-moz-transform") ||
            timelineStyle.getPropertyValue("-ms-transform") ||
            timelineStyle.getPropertyValue("-o-transform") ||
            timelineStyle.getPropertyValue("transform");

        if (timelineTranslate.indexOf('(') >= 0) {
            var timelineTranslate = timelineTranslate.split('(')[1];
            timelineTranslate = timelineTranslate.split(')')[0];
            timelineTranslate = timelineTranslate.split(',');
            var translateValue = timelineTranslate[4];
        } else {
            var translateValue = 0;
        }

        return Number(translateValue);
    }

    function setTransformValue(element, property, value) {
        element.style["-webkit-transform"] = property + "(" + value + ")";
        element.style["-moz-transform"] = property + "(" + value + ")";
        element.style["-ms-transform"] = property + "(" + value + ")";
        element.style["-o-transform"] = property + "(" + value + ")";
        element.style["transform"] = property + "(" + value + ")";
    }

    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(events) {
        var dateArrays = [];
        events.each(function() {
            var singleDate = $(this),
                dateComp = singleDate.data('date').split('T');
            if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                var dayComp = dateComp[0].split('/'),
                    timeComp = dateComp[1].split(':');
            } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                var dayComp = ["2000", "0", "0"],
                    timeComp = dateComp[0].split(':');
            } else { //only DD/MM/YEAR
                var dayComp = dateComp[0].split('/'),
                    timeComp = ["0", "0"];
            }
            var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
            dateArrays.push(newDate);
        });
        return dateArrays;
    }

    function daydiff(first, second) {
        return Math.round((second - first));
    }

    function minLapse(dates) {
        //determine the minimum distance among events
        var dateDistances = [];
        for (i = 1; i < dates.length; i++) {
            var distance = daydiff(dates[i - 1], dates[i]);
            dateDistances.push(distance);
        }
        return Math.min.apply(null, dateDistances);
    }

    /*
        How to tell if a DOM element is visible in the current viewport?
        http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    */
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    function checkMQ() {
        //check if mobile or desktop device
        return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }
});