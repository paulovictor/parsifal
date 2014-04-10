$(function () {

  $(".add-author").click(function () {
    $("#modal-add-author").open();
  });

  $(".btn-add-author").click(function () {
    var review_id = $("#review-id").val();
    var author_ref = $("#author-username-email").val();
    var btn = $(this);
    $.ajax({
      url: '/reviews/add_author/',
      data: {
        'review-id': review_id,
        'author-ref': author_ref
      },
      type: 'post',
      cache: false,
      beforeSend: function () {
        $(btn).disable();
      },
      success: function (data) {

      },
      complete: function () {
        $(btn).enable();
      }
    });
  });

  $("#btn-save-description").click(function () {
    var btn = $(this);
    $.ajax({
      url: '/reviews/save_description/',
      data: $("#form-description").serialize(),
      type: 'post',
      cache: false,
      beforeSend: function () {
        $(btn).disable();
      },
      success: function (data) {
        var msg = btn.siblings('.form-status-message');
        msg.removeClass("text-error").addClass("text-success");
        msg.text(data);
        msg.fadeIn();
        window.setTimeout(function () {
          msg.fadeOut();
        }, 2000);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = btn.siblings('.form-status-message');
        msg.removeClass("text-success").addClass("text-error");
        msg.text(jqXHR.responseText);
        msg.fadeIn();
        window.setTimeout(function () {
          msg.fadeOut();
        }, 2000);
      },
      complete: function () {
        $(btn).enable();
      }
    });
  });

  $("ul.tab li a").click(function () {
    var tab_id = $(this).attr("href");
    $("ul.tab li").removeClass("active");
    $(this).closest("li").addClass("active");
    $(".tabs div").hide();
    $(tab_id).fadeIn();
    return false;
  });

});