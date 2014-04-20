$(function () {

  $(".add-author").click(function () {
    $("#modal-add-author").open();
    $.ajax({
      url: '/reviews/add_author/',
      type: 'get',
      cache: false,
      data: {
        'review-id': $('#review-id').val()
      },
      beforeSend: function () {
        $("#modal-add-author .modal-body").loading();
      },
      success: function (data) {
        $("#modal-add-author .modal-body").html(data);
      },
      complete: function () {
        $("#modal-add-author .modal-body").stopLoading();
      }
    });
  });

  $("#modal-add-author").on("click", ".btn-add-author", function () {
    var btn = $(this);
    $.ajax({
      url: '/reviews/add_author_to_review/',
      data: $("#frm-new-author").serialize(),
      type: 'post',
      cache: false,
      beforeSend: function () {
        $(btn).disable();
      },
      success: function (data) {
        $("ul.authors").append(data);
        $("#modal-add-author").close();
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

  $("ul.authors").on("click", ".remove-author", function () {
    var csrf_token = $("ul.authors input[name='csrfmiddlewaretoken']").val()
    var review_id = $("#review-id").val()
    var author_id = $(this).closest("li").attr("author-id");
    var row = $(this).closest("li");
    $.ajax({
      url: '/reviews/remove_author/',
      data: {
        'review-id': review_id,
        'author-id': author_id,
        'csrfmiddlewaretoken': csrf_token
      },
      type: 'post',
      cache: false,
      success: function (data) {
        $(row).remove();
      }
    });
  });

  $("#modal-add-author").on("click", "ul.tab li a", function () {
    var tab_id = $(this).attr("href");
    $("ul.tab li").removeClass("active");
    $(this).closest("li").addClass("active");
    $(".tabs div").hide();
    $(tab_id).fadeIn();
    return false;
  });

});