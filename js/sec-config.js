// sec-config.js
var app = angular.module("SEC", ['ui.router']);



app.run(function ($rootScope, $transitions, $location, $state, $stateParams, $anchorScroll) {
	$transitions.onSuccess({}, function() {
		
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		
		$('.modal').removeClass('active');
		$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').removeClass('hidden');
		
		if ( !getCookie('isHCP') && $state.current.url != '/' && $state.current.url != '/landing-page' ) {
			$('.pod, .pdf-viewer, .asset-container, a#back-btn, .file-toggle').addClass('hidden');
			$('#hcp-modal').addClass('active');
		}
		
		if ( !$('#hcp-modal').hasClass('active') && $state.current.url != '/' && $state.current.url != '/landing-page' && getCookie('cookiePolicy') == '' ) {
			$('#cookie-modal').addClass('active');
		}
		
		if ( $state.current.url == '/' ) {
			$('footer h5, footer #subscribe-form').css('display','none');
		} else {
			$('footer h5, footer #subscribe-form').css('display','block');
		}
		
		/*$('.st-custom-button').attr({
			'data-url'	: 'covidmabs.com' + $state.current.url,
			'data-short-url'	: 'covidmabs.com' + $state.current.url
		});*/
		// UPDATE EMAIL SHARE
		$('a.email-share').attr('href','mailto:?subject=Regeneron Scientific Experience Center&body=http://www.covidmabs.com' + $state.current.url);
		// UPDATE LINKEDIN SHARE
		$('a.share-btn.linkedin').attr('href','http://www.linkedin.com/shareArticle?mini=true&url=covidmabs.com' + $state.current.url);
		// UPDATE TWITTER SHARE
		$('a.share-btn.twitter').attr('href','http://twitter.com/share?text=Regeneron Scientific Experience Center&url=covidmabs.com' + $state.current.url);
		
        //send page view
        dataLayer.push({
            event: 'page_view',
            pagePath: $state.current.url,
            pageTitle: 'COVIDMABS - ' + $state.current.name
        });
		
	});
});
	
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //$urlRouterProvider.when("", "/");
	$urlRouterProvider.otherwise('/');
	
	$locationProvider.html5Mode({
		enabled	: true
	});

    $stateProvider
        .state("LandingPage", {
            url: "/",
            templateUrl: "landing-page.html",
			controller: 'hallCtrl'
        })
        .state("ExhibitHall", {
            url: "/exhibit-hall",
            templateUrl: "exhibit-hall.html",
			controller: 'hallCtrl'
        })
		/*** POD A ***/
		.state("PodA", {
            url: "",
            templateUrl: "exhibit-hall.html",
			controller: 'podCtrl'
        })
		.state("PodA.Main", {
            url: "/sars-cov-2-variants-and-mabs",
            templateUrl: "content/pod-a.html"
        })
		.state("PodA.1", {
            url: "/variants-and-mab-treatments-video",
            templateUrl: "content/pod-a-1.html"
        })
		.state("PodA.2", {
            url: "/mabs-in-infectious-disease",
            templateUrl: "content/pod-a-2.html"
        })
		.state("PodA.3", {
            url: "/vaccines-and-mabs",
            templateUrl: "content/pod-a-3.html"
        })
		/*** POD B ***/
		.state("PodB", {
            url: "",
            templateUrl: "exhibit-hall.html",
			controller: 'podCtrl'
        })
		.state("PodB.Main", {
            url: "/mab-mechanism-of-action-and-data",
            templateUrl: "content/pod-b.html"
        })
		.state("PodB.1", {
            url: "/mechanism-of-action-video",
            templateUrl: "content/pod-b-1.html"
        })
		.state("PodB.2", {
            url: "/advantages-of-combination-therapy",
            templateUrl: "content/pod-b-2.html"
        })
		.state("PodB.3", {
            url: "/covid-19-variants",
            templateUrl: "content/pod-b-3.html"
        })
		.state("PodB.4a", {
            url: "/mabs-for-covid-19-prevention",
            templateUrl: "content/pod-b-4a.html"
        })
		.state("PodB.4b", {
            url: "/mabs-for-early-covid-19-treatment",
            templateUrl: "content/pod-b-4b.html"
        })
		.state("PodB.4c", {
            url: "/covid-19-mabs-dosing-study",
            templateUrl: "content/pod-b-4c.html"
        })
		.state("PodB.4d", {
            url: "/mabs-for-covid-19-treatment",
            templateUrl: "content/pod-b-4d.html"
        })
		.state("PodB.4e", {
            url: "/mAbs-for-COVID-19-treatment-update",
            templateUrl: "content/pod-b-4e.html"
        })
		.state("PodB.4f", {
            url: "/mab-outpatient-results",
            templateUrl: "content/pod-b-4f.html"
        })
		.state("PodB.4g", {
            url: "/mab-prevention-interim",
            templateUrl: "content/pod-b-4g.html"
        })
		.state("PodB.5", {
            url: "/covid-19-prevention-study-results",
            templateUrl: "content/pod-b-5.html"
        })
		.state("PodB.6", {
            url: "/key-literature",
            templateUrl: "content/pod-b-6.html"
        })
		.state("PodB.7", {
            url: "/covid-19-treatment-study-results",
            templateUrl: "content/pod-b-7.html"
        })
		.state("PodB.8", {
            url: "/appropriate-patients-for-mAbs",
            templateUrl: "content/pod-b-8.html"
        })
		.state("PodB.9", {
            url: "/PEP-decision-tree",
            templateUrl: "content/pod-b-9.html"
        })
		/*** POD C ***/
		.state("PodC", {
            url: "",
            templateUrl: "exhibit-hall.html",
			controller: 'podCtrl'
        })
		.state("PodC.Main", {
            url: "/facilitating-access",
            templateUrl: "content/pod-c.html"
        })
		.state("PodC.1a", {
            url: "/patients-at-high-risk-for-severe-covid-19",
            templateUrl: "content/pod-c-1a.html"
        })
		.state("PodC.1b", {
            url: "/pacientes-de-alto-riesgo-para-covid-19-severo",
            templateUrl: "content/pod-c-1b.html"
        })
		.state("PodC.2a", {
            url: "/educate-your-patients",
            templateUrl: "content/pod-c-2a.html"
        })
		.state("PodC.2b", {
            url: "/eduque-a-sus-pacientes",
            templateUrl: "content/pod-c-2b.html"
        });
});

app.controller("podCtrl", function ($scope) {
	$scope.lobbyClass = "blur";
	$scope.shaderClass = "active";
}).controller("hallCtrl", function ($scope) {
	$scope.lobbyClass = "";
	$scope.shaderClass = "";
});
