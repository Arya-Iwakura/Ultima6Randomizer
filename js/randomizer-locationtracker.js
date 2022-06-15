const TEXT_COLOR_OFF = "rgb(224, 192, 192)";
const TEXT_COLOR_ON = "rgb(51, 51, 51)";
const ITEMS_LIST = [
	"bookboardgames",
	"bookoz",
	"brokenlens",
	"gargishtext",
	"gargoylelens",
	"guildbelt",
	"map",
	"sherry",
	"spellbook",
	"dispelfield",
	"unlock",
	"runecompassion",
	"runehonor",
	"runehonesty",
	"runehumility",
	"runejustice",
	"runesacrifice",
	"runespirituality",
	"runevalor"
];
const LOCATIONS_LIST = [
	"overworld",
	"virtuetown",
	"nonvirtuetown",
	"castles",
	"dialogrewards",
	"treasuremap",
	"caves",
	"tombs",
	"dungeons",
	"shrines",
	"gargoylecity",
	"joinablepartymembers"
];
const TRACKERS_LIST = [
	"locationtype",
	"progressionitem",
	"check",
	"hint"
];

function pageInit() {
	for (item in ITEMS_LIST) {
		setItemStatus(ITEMS_LIST[item]);
		setItemStatusOnClick(ITEMS_LIST[item]);
	}

	for (loc in LOCATIONS_LIST) {
		setLocationStatus(LOCATIONS_LIST[loc]);
		setLocationStatusOnClick(LOCATIONS_LIST[loc]);
	}
	
	for (tracker in TRACKERS_LIST) {
		toggleTracker(TRACKERS_LIST[tracker]);
		toggleSetup(TRACKERS_LIST[tracker]);
	}
}

window.addEventListener('load', pageInit);

function setItemStatusOnClick(item) {
	itemId = 'tracker_item_' + item;
	document.getElementById(itemId).addEventListener('click', setItemStatus.bind(null, item), false);
}

function setItemStatus(item) {
	itemClass = 'tracker_requires_' + item;
	itemElements = document.querySelectorAll('label.' + itemClass);

	for (var label = 0; label < itemElements.length; label++) {
		var requirements= itemElements[label].classList
		var requirementsMet = 0;
		for (var requiresItem = 0; requiresItem < requirements.length; requiresItem++) {
			var requiresId = 'tracker_item_' + requirements[requiresItem].split('_')[2]
			if (document.getElementById(requiresId).checked == true) {
				requirementsMet += 1;
			}
		}
		if (requirementsMet == itemElements[label].classList.length) {
			itemElements[label].style.color = TEXT_COLOR_ON;
		} else {
			itemElements[label].style.color = TEXT_COLOR_OFF;
		}
	}
}

function setLocationStatusOnClick(loc) {
	locId = 'tracker_locations_' + loc;
	document.getElementById(locId).addEventListener('click', setLocationStatus.bind(null, loc), false);
}

function setLocationStatus(loc) {
	locationCheckbox = 'tracker_locations_' + loc
	locationClass = 'location_' + loc;
	itemClass = loc + '_item';
	locationElements = document.querySelectorAll('div.' + locationClass);
	itemElements = document.querySelectorAll('div.' + itemClass);

	for (var item = 0; item < itemElements.length; item++) {
		if (document.getElementById(locationCheckbox).checked == true) {
			itemElements[item].style.display = "";
		} else {
			itemElements[item].style.display = "none";
		}
	}

	for (var div = 0; div < locationElements.length; div++) {
		var memberships= locationElements[div].classList
		var membershipsMet = 0;
		for (var includesLocation = 0; includesLocation < memberships.length; includesLocation++) {
			var includesId = 'tracker_locations_' + memberships[includesLocation].split('_')[1]
			if (document.getElementById(includesId).checked == false) {
				membershipsMet += 1;
			}
		}
		if (membershipsMet == memberships.length) {
			locationElements[div].style.display = "none";
		} else {
			locationElements[div].style.display = "";
		}
	}
}

function toggleSetup(tracker) {
	toggleId = tracker + '_tracker_toggle';
	toggleElement = document.getElementById(toggleId);
	toggleLabel = document.querySelector('[for=\"' + tracker + '_tracker_toggle\"] small');
	toggleElement.addEventListener('click', toggleTracker.bind(null, tracker), false);
	toggleLabel.style.cursor = 'pointer';
}

function toggleTracker(tracker) {
	content = document.getElementsByClassName(tracker + '_tracker');
	showHide = document.getElementById(tracker + '_tracker_toggle');
	showHideLabel = document.querySelector('[for=\"' + tracker + '_tracker_toggle\"] small');

	if (showHide.checked == true) {
		for (var i = 0; i < content.length; i++) {
			content[i].style.display = '';
			showHideLabel.innerHTML = '[hide]';
		}
	} else {
		for (var i = 0; i < content.length; i++) {
			content[i].style.display = 'none';
			showHideLabel.innerHTML = '[show]';
		}
	}
}
