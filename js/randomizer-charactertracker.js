const TEXT_COLOR_OFF = "rgb(224, 192, 192)";
const TEXT_COLOR_ON = "rgb(51, 51, 51)";
const KEY_PREFIX = 'npctracker_';
const NPC_SELECTS = document.getElementsByTagName('select');
const NPC_TYPE_CHECKBOXES = document.querySelectorAll('input[type=checkbox]');

function pageInit()
{
	for (var i = 0; i < NPC_TYPE_CHECKBOXES.length; i++) {
		NPC_TYPE_CHECKBOXES[i].addEventListener('click', saveValueCheckbox, false);
		if (typeof getValueCheckbox(NPC_TYPE_CHECKBOXES[i].id) != 'undefined') {
			NPC_TYPE_CHECKBOXES[i].checked = getValueCheckbox(NPC_TYPE_CHECKBOXES[i].id);
			$('#' + NPC_TYPE_CHECKBOXES[i].id).triggerHandler('click');
		} else {
			NPC_TYPE_CHECKBOXES[i].checked = NPC_TYPE_CHECKBOXES[i].defaultChecked;
		}
	}

	for (var i = 0; i < NPC_SELECTS.length; i++) {
		NPC_SELECTS[i].addEventListener('input', saveValueSelect, false);
		if (getValueSelect(NPC_SELECTS[i].id)) {
			NPC_SELECTS[i].value = getValueSelect(NPC_SELECTS[i].id);
		} else {
			NPC_SELECTS[i].value = '0';
		}
	}

	document.getElementById('reset').addEventListener('click', resetTracker, false);
	document.getElementById('save').addEventListener('click', saveToLocalStorage, false);
	document.getElementById('restore').addEventListener('click', restoreFromLocalStorage, false);
	document.getElementById('clear').addEventListener('click', clearLocalStorage, false);
	document.getElementById('toggle_local_storage').addEventListener('click', toggleStorageOptions, false);
}

function setValueCheckbox(key, value) {
	var setKey = KEY_PREFIX + key;
	sessionStorage.setItem(setKey, value);
}

function getValueCheckbox(key, value) {
	var getKey = KEY_PREFIX + key;
	newValue = sessionStorage.getItem(getKey);
	if (newValue == 'true') {
		return true;
	} else if (newValue == 'false') {
		return false;
	}
}

function saveValueCheckbox(e) {
	var checkboxId = e.target.id;
	var checkboxValue = e.target.checked;
	setValueCheckbox(checkboxId, checkboxValue);
}

function setValueSelect(key, value) {
	var setKey = KEY_PREFIX + key;
	sessionStorage.setItem(setKey, value);
}

function getValueSelect(key, value) {
	var getKey = KEY_PREFIX + key;
	return sessionStorage.getItem(getKey);
}

function saveValueSelect(e) {
	var selectId = e.target.id;
	var selectValue = e.target.value;
	setValueSelect(selectId, selectValue);
}

$( window ).on( "load", pageInit );

$(document).ready(function()
{
    toggleClassDisplayPropOnClick("#npctracker_dialogrewards", "dialogrewards_npc", "npc_location_dialogrewards");
    toggleClassDisplayPropOnClick("#npctracker_treasuremap", "treasuremap_npc", "npc_location_treasuremap");
    toggleClassDisplayPropOnClick("#npctracker_party", "joinablepartymembers_npc", "npc_location_joinablepartymembers");
	toggleClassDisplayPropOnClick("#npctracker_otherimportant", "otherimportant_npc", "npc_location_otherimportant");
	toggleClassDisplayPropOnClick("#npctracker_mages", "mages_npc", "npc_location_mages");
	toggleClassDisplayPropOnClick("#npctracker_shipwrights", "shipwrights_npc", "npc_location_shipwrights");
	toggleClassDisplayPropOnClick("#npctracker_shops", "shops_npc", "npc_location_shops");
	toggleClassDisplayPropOnClick("#npctracker_smiths", "smiths_npc", "npc_location_smiths");
    toggleClassDisplayPropOnClick("#npctracker_healers", "healers_npc", "npc_location_healers");
	toggleClassDisplayPropOnClick("#npctracker_inns", "inns_npc", "npc_location_inns");
    toggleClassDisplayPropOnClick("#npctracker_other", "other_npc", "npc_location_other");
});

function setClassToColor(inClass, inColor)
{
    var all = document.getElementsByClassName(inClass);
    for (var i = 0; i < all.length; i++)
    {
        all[i].style.color = inColor;
    }
}

function setClassDisplayProp(inClass, inProp)
{
    var all = document.getElementsByClassName(inClass);
    for (var i = 0; i < all.length; i++)
    {
        all[i].style.display = inProp;
    }
}

function toggleClassDisplayPropOnClick(inClickTarget, inClass, inLocationSet)
{
    $(inClickTarget).click(function()
    {
        toggleClassDisplayProp(inClickTarget, inClass, inLocationSet);
    });
}

function toggleClassDisplayProp(inClickTarget, inClass, inLocationSet)
{
    var all = document.getElementsByClassName(inClass);
    for (var i = 0; i < all.length; i++)
    {
		if (!$(inClickTarget).is(':checked')) {
			all[i].style.display = "none";
		} else {
			all[i].style.display = "";
		}
	}
    checkHiddenElements(inClass, inLocationSet);
}

function checkHiddenElements(inItemClass, inLocationSet)
{
    var all = document.getElementsByClassName(inLocationSet);
    for (var i = 0; i < all.length; i++)
    {
        var inputElements = all[i].getElementsByTagName('div');
        var totalInputElements = inputElements.length;
        var totalHiddenElements = 0;
        
        for (var j = 0; j < inputElements.length; j++)
        {
            if(inputElements[j].style.display == "none")
            {
                totalHiddenElements += 1;
            }
        }

        if(totalInputElements == totalHiddenElements)
        {
            all[i].style.display = "none";
        }
        else
        {
            all[i].style.display = "";
        }
    }
}

function resetTracker() {
	if (confirm('Are you sure you want to reset the tracker?') == true) {
		for (var i = 0; i < NPC_SELECTS.length; i++) {
			sessionStorage.removeItem(KEY_PREFIX + NPC_SELECTS[i].id);
		}
		for (var i = 0; i < NPC_TYPE_CHECKBOXES.length; i++) {
			sessionStorage.removeItem(KEY_PREFIX + NPC_TYPE_CHECKBOXES[i].id);
		}
		pageInit();
	}
}
