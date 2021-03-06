$(function () {

  var cancel_research_question_edition_row = new Array();

  $("#btn-add-question").click(function () {
    var review_id = $("#review-id").val();
    var csrf_token = $("#question-form input[name='csrfmiddlewaretoken']").val();
    $.ajax({
      url: '/reviews/planning/add_or_edit_question/',
      data: {
        'review-id': review_id,
        'question-id': 'None',
        'csrfmiddlewaretoken': csrf_token
      },
      type: 'post',
      cache: false,
      success: function (data) {
        $("#question-form ul").prepend(data);
      }
    });
  });

  $("#question-form").on("click", ".btn-cancel-question", function () {
    var li = $(this).closest("li");
    var question_id = $(li).attr("question-id");
    if (question_id == 'None') {
      $(li).remove();
    }
    else {
      $(li).replaceWith(cancel_research_question_edition_row[question_id]);
    }
  });

  $("#question-form").on("click", ".btn-edit-question", function () {
    var li = $(this).closest("li");
    var btn = $(this);
    var review_id = $("#review-id").val();
    var question_id = $(li).attr("question-id");
    var csrf_token = $("#question-form input[name='csrfmiddlewaretoken']").val();

    cancel_research_question_edition_row[question_id] = li;

    $.ajax({
      url: '/reviews/planning/add_or_edit_question/',
      data: {
        'review-id': review_id,
        'question-id': question_id,
        'csrfmiddlewaretoken': csrf_token
      },
      type: 'post',
      cache: false,
      beforeSend: function () {
        $(btn).disable();
      },
      success: function(data) {
        $(li).replaceWith(data);
      },
      complete: function () {
        $(btn).enable();
      }
    });
  });

  $("#question-form").on("click", ".btn-save-question", function () {
    var li = $(this).closest("li");
    var btn = $(this);
    var review_id = $("#review-id").val();
    var question_id = $(li).attr("question-id");
    var description = $("input[name='question-description']", li).val();
    var csrf_token = $("#question-form input[name='csrfmiddlewaretoken']").val();
    $.ajax({
      url: '/reviews/planning/save_question/',
      data: {
        'review-id': review_id,
        'question-id': question_id,
        'description': description,
        'csrfmiddlewaretoken': csrf_token
      },
      type: 'post',
      cache: false,
      beforeSend: function () {
        $(btn).disable();
      },
      success: function(data) {
        $(li).replaceWith(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      },
      complete: function () {
        $(btn).enable();
      }
    });
  });

  $("#question-form").on("click", ".btn-remove-question", function () {
    var li = $(this).closest("li");
    var btn = $(this);
    var review_id = $("#review-id").val();
    var question_id = $(li).attr("question-id");
    var csrf_token = $("#question-form input[name='csrfmiddlewaretoken']").val();
    $.ajax({
      url: '/reviews/planning/remove_question/',
      data: {
        'review-id': review_id,
        'question-id': question_id,
        'csrfmiddlewaretoken': csrf_token
      },
      type: 'post',
      cache: false,
      beforeSend: function () {
        $(btn).disable();
      },
      success: function (data) {
        $(btn).enable();
        $(li).remove();
      },
      error: function () {
        
      },
      complete: function () {
        $(btn).enable();
      }
    });
  });

});