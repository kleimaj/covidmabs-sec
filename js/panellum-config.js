// PANNELLUM CONFIG

var v = pannellum.viewer('pano', {
	"default": {
		"firstScene" : "boothMain",
		"sceneFadeDuration" : 500,
		"autoLoad": true,
		"minPitch": -5,
		"maxPitch": -5,
		"pitch": -5,
		"yaw": 110,
		"minYaw": 110,
		"maxYaw": 250,
		"hfov": 50,
		//"hotSpotDebug": true,
		"showZoomCtrl": false,
		"showFullscreenCtrl": false,
		"keyboardZoom": false,
		"mouseZoom": false,
		"autoRotate": -5
	},
	"scenes": {
		"boothMain": {
			"type": "equirectangular",
			"panorama": "images/booth/Regeneron_ExhibitHall_Center_360_01.jpg"
		}		
	}
});