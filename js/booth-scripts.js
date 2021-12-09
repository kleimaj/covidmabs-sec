// BOOTH SCRIPTS

$(function() {
	
	$('#cookie-modal a.accept-btn').click(function(e) {
		e.preventDefault();
		setCookie( 'cookiePolicy', $(this).text(), 7 );
		$('.modal').has(this).removeClass('active');
		$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').removeClass('hidden');
	});
	
	$('body').on('click','a#hcp-btn, a.hcp-btn', function(e) {
		setCookie( 'isHCP', true, 7 );
	});
	
	$('body').on('click','a.hcp-btn', function(e) {
		e.preventDefault();
		$('.modal').has(this).removeClass('active');
		console.log('hit');
		if ( getCookie('cookiePolicy') == '' ) {
			$('#cookie-modal').addClass('active');
		} else if ( !$('.modal').hasClass('active') ) {
			$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').removeClass('hidden');
		}
	});

	$('body').on('click','a.external-link', function(e) {
		e.preventDefault();
		var thisLink = $(this).attr('href');
		$('#external-link-modal a.continue-btn').attr('href', thisLink);
		$('#external-link-modal, #regeneron-link-modal').removeClass('active');
		$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').addClass('hidden');
		$('.modal.active').addClass('was-active');
		$('#external-link-modal').addClass('active');
	});
	
	$('body').on('click','a.regeneron-link', function(e) {
		e.preventDefault();
		var thisLink = $(this).attr('href');
		$('#regeneron-link-modal a.continue-btn').attr('href', thisLink);
		$('#external-link-modal, #regeneron-link-modal').removeClass('active');
		$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').addClass('hidden');
		$('.modal.active').addClass('was-active');
		$('#regeneron-link-modal').addClass('active');
	});
	
	$('body').on('click','.modal a.cancel-btn, .modal a.continue-btn, .modal button[type=reset], .modal a.close-btn', function(e) {
		$('.modal').has(this).removeClass('active');
		$('.modal.was-active').removeClass('was-active');
		if ( !$('.modal').hasClass('active') ) {
			$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').removeClass('hidden');
		}
	});
	
	$('body').on('click','a#subscribe-btn', function(e) {
		e.preventDefault();
		$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').addClass('hidden');
		$('#external-link-modal, #regeneron-link-modal').removeClass('active');
		$('#subscribe-modal').addClass('active');		
	});
	
	$('body').on('click','#subscribe-form  button[type=submit]', function(e) {
		var thisForm = $(this).parent().parent().parent();
		$.post("helpers/subscriber-helper.php", thisForm.serialize())
			.done(function(data){
				//$("button#subscribe-btn").text("Thank you for subscribing!");
				$('button').css('display','none');
				$('h5, a.close-btn').css('display','block');
				if ( thisForm.hasClass('mobile-subscribe') ) {
					$('#subscribe-ty-modal').addClass('active');
				}	
				
				setTimeout(function() {
					$('.pod, .pdf-viewer, .asset-container, a#back-btn').removeClass('hidden');
					$('.modal').removeClass('active');
				},2000);
			})
			.fail(function(jqXHR, statusText, errorMessage){
				alert("Something went wrong saving your subscription.");
			});
	});
	
	$('body').on('click','.file-toggle > a', function(e) {
		e.preventDefault();
		$('.file-toggle > a').removeClass('active');
		var thisBtn = $(this).attr('class');
		$(this).addClass('active');
		$('.toggle').removeClass('right left').addClass(thisBtn);
		updatePDF( $(this).attr('href') );
	});
	
	$('body').on('click','.file-toggle .toggle', function() {
		$(this).toggleClass('left right');
		console.log( $(this).attr('class').split(' ')[1] );
		$('.file-toggle > a').removeClass('active');
		$('.file-toggle > a.' + $(this).attr('class').split(' ')[1]).addClass('active');
		updatePDF( $('.file-toggle > a.' + $(this).attr('class').split(' ')[1]).attr('href') );
	});	
	
	$('body').on('input','#subscribe-form input', function() {
		if ( isEmail( $(this).val() ) ) {
			$('#subscribe-form button[type=submit]').removeClass('disabled');
		} else {
			$('#subscribe-form button[type=submit]').addClass('disabled');
		}
	});
	
	$('body').on('input','#subscribe-footer input', function() {
		if ( isEmail( $(this).val() ) ) {
			$('#subscribe-footer button[type=submit]').removeClass('disabled');
		} else {
			$('#subscribe-footer button[type=submit]').addClass('disabled');
		}
	});
	
	$('body').on('click','a.share-btn', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		window.open(url,'sharer','toolbar=0,status=0,width=648,height=395');
	});

	$('body').on('click','a.hotspot', function(e) {
		var evtObj = {};
		evtObj = {
			event: 'asset_view',
			assetType: 'pdf',
			assetTitle: $(this).find("img").attr("alt"),
			pagePath: $(this).attr("href")
		};
		if (!$.isEmptyObject(evtObj)) {
			dataLayer.push(evtObj);
		}
	});

});

function externalLink(thisLink) {
	//e.preventDefault();
	$('#external-link-modal a.continue-btn').attr('href', thisLink);
	$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').addClass('hidden');
	$('.modal.active').addClass('was-active');
	$('#external-link-modal').addClass('active');
}

function updatePDF(thisHREF,thisTitle) {
	$('iframe.pdf-viewer').attr('src','/pdf/web/viewer.html?file=' + thisHREF);

	var evtObj = {};
	evtObj = {
		event: 'asset_view',
		assetType: 'pdf',
		assetTitle: thisTitle || thisHREF,
		pagePath: thisHREF
	};
	if (!$.isEmptyObject(evtObj)) {
		dataLayer.push(evtObj);
	}
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
	  c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
	  return c.substring(name.length, c.length);
	}
  }
  return "";
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
