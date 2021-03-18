/**
 * Tuna Signup Form Wizard
 * @type Javascript Class
 */

var valoremprestimo = document.getElementById('valoremprestimo');
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
        var windowHeight = $(window).height();
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
        }

    },
    /**
     * Change Step
     * @param int currentStep
     * @param int nextStep
     * @returns {void|Boolean}
     */
    changeStep: function(currentStep, nextStep) {
        var self = this;

        if (nextStep <= 0 && nextStep > 4) {
            return false;
        }


        //Validations
        if (nextStep === 2) {
            if ($("#tn_name").val().trim() === "") {
                self.setInputError($("#tn_name"));
                return;
            }

            if ($("#valorimovel").val().trim() === "") {
                self.setInputError($("#valorimovel"));
                return;
            }

            if (($("#tn_name").val().trim() !== "") && ($("#valorimovel").val().trim() !== "")) {
                if ($("#simulador").hasClass("d-none")) {
                    $("#simulador").removeClass("d-none");
                    $("#left-layout").addClass("d-none");
                }
            }


        } else if (!($("#simulador").hasClass("d-none") && !($("#left-layout").hasClass("d-none")))) {
            $("#simulador").addClass("d-none");
            $("#left-layout").removeClass("d-none");
        }

        calcualtePrice(tn_name.value, valorimovel.value);



        //Value validation
        if (nextStep === 3) {

            if ($("#valoremprestimo").val().trim() === "") {
                self.setInputError($("#valoremprestimo"));
                return;
            }
            if ($("#valorimovel2").val().trim() === "") {
                self.setInputError($("#valorimovel2"));
                return;
            }

        }
        //Radio validation
        if (nextStep === 4) {
            if ($("input[name='tn_gender']:checked").val() === "") {
                self.setInputError($("input[name='tn_gender']"));
                return;
            }
        }
        if (nextStep === 5) {
            if ($("#tn_sport").val().trim() === "") {
                self.setInputError($("#tn_sport"));
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
            stepCountsEl.html("CONFIRM DETAILS");
            $(".button-container").hide();
            var stepConfirm = $(".step-confirm");
            stepConfirm.find("input[name='name']").val($("#tn_name").val());

            var hobbies = $("input[name='tn_hobbies[]']:checked").map(function() {
                return this.value;
            }).get();
            stepConfirm.find("select[name='hobbies[]']").selectpicker("val", hobbies);
            stepConfirm.find("select[name='gender']").selectpicker("val", $("input[name='tn_gender']:checked").val());
            stepConfirm.find("select[name='sport']").selectpicker("val", $("#tn_sport").val());

        }

        //Current Step Number update
        stepCountsEl.find("span.step-current").text(nextStep);

        //Hide prevButton if we are in first step
        var prevStepEl = $(".prevStep");
        if (nextStep === 1) {
            prevStepEl.hide();
        } else {
            prevStepEl.css("display", "inline-block");
        }

        /* ---------------------------------------- MÁSCARA MOEDA REAL MONEYMIO --------------------------------------- */

        $("#formSimulacaoWeb").validate({
            rules: {
                ValorSolicitado: {
                    maxlength: 10
                }
            }
        })

        $("#valoremprestimo").keydown(function() {

            $("#valoremprestimo").maskMoney({
                prefix: 'R$ ',
                thousands: '.',
                decimal: ','
            });

            $("#valorimovel").removeClass("d-none");

            if ($("#valorimovel2").hasClass("d-none"))
                $("#formInput").removeClass("d-none");

        });


        $("#valorimovel2").keydown(function() {

            $("#valorimovel2").maskMoney({
                prefix: 'R$ ',
                thousands: '.',
                decimal: ','
            });

            $("#divButtonSubmit").removeClass("d-none");

        });

        /* ------------------------------------- Guardando variáveis ------------------------------------------------ */

        if (tn_name && tn_name.value) {
            tn_name.value = tn_name.value;
            valoremprestimo.value = tn_name.value;
        }

        if (valorimovel && valorimovel.value) {
            valorimovel.value = valorimovel.value;
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
        $(".tuna-signup-container input[type='checkbox'],.tuna-signup-container input[type='radio'],.tuna-signup-container input[type='file'],.select").uniform();

        //Jquery Mask Plugin
        $('.tuna-signup-container input[name="phone"],.tuna-signup-container input[name="tn_phone"]').mask('000 000 00 00');

        // Focuses on name input, when page loaded
        window.setTimeout(function() {
            $("#tn_name").focus();
            $("#valorimovel").focus();
        }, 500);

        // Responsive
        self.setResponsive();
        $(window).resize(function() {
            self.setResponsive();
        });

        // Steps Count
        self.stepCount = $(".tuna-steps .step").length;
        $(".step-count").text(self.stepCount);

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

        // Confirm Details - Show Password
        stepConfirm.find(".input-container a.showPass").on("mousedown", function() {
            $(this).parent().find("input").attr("type", "text");
        }).mouseup(function() {
            $(this).parent().find("input").attr("type", "password");
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

            var nameInput = $(this).find("input[name='name']");
            if (nameInput.val().trim() === "") {
                nameInput.addClass("confirm-input-error").focus();
                return;
            }


            var hobbyInput = $(this).find("select[name='hobbies[]']");
            console.log(hobbyInput);
            if (hobbyInput.find("option:selected").length === 0) {
                //add class to parent element, because this is bootstrap-select.
                hobbyInput.parents(".bootstrap-select").addClass("confirm-input-error").focus();
                hobbyInput.selectpicker('toggle');
                return;
            }

            var genderInput = $(this).find("select[name='gender']");
            if (genderInput.val() === "") {
                genderInput.addClass("confirm-input-error").focus();
                return;
            }

            var sportInput = $(this).find("select[name='sport']");
            if (sportInput.val() === "") {
                sportInput.addClass("confirm-input-error").focus();
                return;
            }

            if (!$("input[name='agreement']").prop("checked")) {
                swal({
                    title: "Warning!",
                    text: "You must agree with the terms and conditions.",
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
                        title: "Success",
                        text: "Your information submitted successfully!",
                        type: "success",
                        confirmButtonText: "Ok"
                    });
                } else {
                    swal({
                        title: "Error!",
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

    /**
     * Bootstrap Select Plugin
     */
    $(".selectpicker").selectpicker();

    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    tunaWizard.start();

    /* -------------------------- Adicionados para o simulador ------------------------------------- */




    $("#formSimulacaoWeb").validate({
        rules: {
            ValorSolicitado: {
                maxlength: 10
            }
        }
    })

    $("#tn_name").keydown(function() {

        $("#tn_name").maskMoney({
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
    }





    $("#total").val("10000");

    $('.month').on('click', function(event) {

        var id = $(this).attr('id');

        $('.month').removeClass('selected-month');
        $(this).addClass('selected-month');
        $(".month").removeClass("active-month");
        $(this).addClass("active-month");

        calcualtePrice(valoremprestimo.value, valorimovel2.value);
    });

    /* 
        update();
        calcualtePrice(); */

});




/* ----------------------------------------- Scripts adicionados ----------------------------------------- */

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
    '144month': '1.10',
    '132month': '1.20',
    '120month': '1.30',

    '108month': '1.40',
    '96month': '1.50',
    '84month': '1.60',
    '72month': '1.70',

    '60month': '1.80',
    '48month': '1.90',
    '36month': '2.0'
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



function calcualtePrice(valemp, valimo) {

    if (undefined === valemp || undefined === valimo)
        valemp = 0, valimo = 0;

    valemp = Number(valemp.replace(/[^0-9,]*/g, '').replace(',', '.'));
    valimo = Number(valimo.replace(/[^0-9,]*/g, '').replace(',', '.'));


    month = $(".selected-month").attr('id');
    var term = obj[month];
    16, 567.64
    var totalPrice = valemp * term / (valimo * 0.07);

    $("#total").val(totalPrice.toFixed(2));
    $("#total12").val(Math.round((totalPrice) / 12).toFixed(2));
    $("#total52").val(Math.round((totalPrice) / 52).toFixed(2));
}

function alteravalor() {

    valoratualemprestimo = $('#valoremprestimo').val();
    valoratualimovel2 = $('#valorimovel2').val();

    calcualtePrice(valoratualemprestimo, valoratualimovel2);

}