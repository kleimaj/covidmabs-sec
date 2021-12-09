// custom-scripts.js

$(function() {

	$('a.file-pdf').click(function(e) {
		e.preventDefault();
		data = {};
		data.iResourceID = $(this).attr('id')
		data.iQuestionID = $(this).data('qid')
		$.post('meetingsess-helper.php', data);

		$(this).find('.fa-check').show();
		$(this).data('seen', true);

		let next = $(this).data('order') + 1;
		$(document).find("[data-order='" + next + "']").removeClass('disabled');
		$(document).find("[data-order='" + next + "']").find('.fa-lock').hide();
		if(checkRequiredSeen()){
			$("#question-button").removeClass('disabled');
		}
		var pdfurl = $(this).attr('href'),
			sessionID = $(this).data('sess'),
			topicID = $(this).data('topic'),
			materialID = $(this).data('material');

		// window.open(pdfurl, '_blank');

		$('<div>').attr({id: 'shader', class: 'modal'}).appendTo('body');
		var pdfContainer = $('<div>').attr('id', 'pdf-container').css('display','block');
		pdfContainer.appendTo('#shader');

		pdfContainer.prepend($('<a>').addClass('close').html('<i class="fas fa-times-circle"></i>'));
		$('<iframe>').attr({'id': 'pdf-iframe', 'src':pdfurl}).appendTo(pdfContainer);


		$('div#shader, a.close').click(function(e) {
			$('div#shader, #pdf-iframe, #pdf-container').remove();
		});


		//log the view
		 LogActivity('Material',
					 materialID,
					 '{"Session":'+sessionID+',"topic":'+topicID+'}',
					 'PDF opened');
	});
});