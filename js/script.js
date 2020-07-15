jQuery(function ($) {
    $(document).ready(function () {
        $('.modal .close').click(function (e) {
            $('.modal').fadeOut(300);
        });
        $('.modal').click(function (e) {
            if (!$(event.target).closest('.modal-content').length && !$(event.target).is('.modal-content')) {
                $('.modal').fadeOut(300);
            }
        });
        $('.link').change(function (e) {
            if ($(this).is(':checked')) {
                $(location).attr('href', $(this).data('link'));
            }
        });
        $('.show-submit-btn').change(function (e) {
            $(this).parents('.hide-submit-btn').find('.btn-container').fadeIn(300);
        });


        var formValid = document.getElementsByClassName('form-valid')[0];
        $('.valid-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                var el = document.querySelectorAll('.form-valid [data-reqired]');
                var erroreArrayElemnts = [];
                for (var i = 0; i < el.length; i++) {
                    if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                        erroreArrayElemnts.push(el[i]);
                        $('.modal').fadeIn(300);
                        $(el[i]).addClass('has-error');
                        $(el[i]).focus(function (e) {
                            $(e.target).removeClass('has-error');
                        });
                    }
                }

                var el = document.querySelectorAll('.form-valid input[type="radio"]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'INPUT') {
                        var name = el[i].getAttribute('name');
                        if ($(el[i]).parents('.show-detail-answer').length > 0) {
                            if (!$(el[i]).parents('.show-detail-answer').find('input[type="text"]').val() && $(el[i]).parents('.show-detail-answer').find('input[type="radio"]').is(':checked')) {
                                erroreArrayElemnts.push(el[i]);
                                $('.modal').fadeIn(300);
                            }
                        }
                        if (document.querySelectorAll('[name=' + name + ']:checked').length === 0) {
                            if ($(el[i]).parents('.show-detail-answer').length == 0) {
                                erroreArrayElemnts.push(el[i]);
                                $('.modal').fadeIn(300);
                            }
                        }
                    }
                }
                if (erroreArrayElemnts.length == 0) {
                    formValid.submit();
                }
                if (erroreArrayElemnts.length > 0) {
                    console.log('error');
                    $(".main").animate({ scrollTop: erroreArrayElemnts[0] }, "slow");
                    return false;
                }
            });
        });

        var firstForm = document.getElementsByClassName('first-question')[0];
        $('.first-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                var erroreArrayElemnts = [];
                var el = document.querySelectorAll('.first-question input[type="radio"]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'INPUT') {
                        var name = el[i].getAttribute('name');
                        if (document.querySelectorAll('[name=' + name + ']:checked').length === 0) {
                            if ($(el[i]).parents('.input-radio-group').find('.show-detail-answer').length > 0) {
                                if (!$(el[i]).parents('.input-radio-group').find('.show-detail-answer input').val()) {
                                    erroreArrayElemnts.push(el[i]);
                                    $('.modal').fadeIn(300);
                                }
                            }
                            else {
                                erroreArrayElemnts.push(el[i]);
                                $('.modal').fadeIn(300);
                            }
                        }
                    }
                }
                if (erroreArrayElemnts.length == 0) {
                    $(location).attr('href', $('.first-question input[type="radio"]:checked').data('link'));
                    // firstForm.submit();
                }
                if (erroreArrayElemnts.length > 0) {
                    console.log('error');
                    $(".main").animate({ scrollTop: erroreArrayElemnts[0] }, "slow");
                    return false;
                }
            });
        });
    });
});