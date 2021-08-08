var ORIGINAL_ROM = null;
var BASEURL = window.location.origin + window.location.pathname;

var EN_US = false;
var __U6C = true;

var DEVMODE = window.location.href.indexOf('localhost') != -1;
var DEEPVALIDATION = window.location.href.indexOf('localhost') != -1;

var result;
var prefix;

function doRandomize(buffer, seed)
{
	var __start = +new Date();
	if (console.clear) console.clear();

	prefix = 'ultima6-' + VERSION_STRING;
	result = randomizeROM(buffer, seed);

	//saveAs = function(){};
	if (result.errors.length == 0)
	{
		var url = BASEURL + '#!/' + result.seed + '/' + result.preset;
		//var url = 'Seed:' + result.seed + ' Flags:' + result.preset;

		$('#setgoal-text').val('Generated: ' + url);
		//$('#setgoal-text').val('Generated - Randomizer ' + VERSION_STRING + ' - ' + url + ' Time:' + (+new Date() - __start) + "ms");
		$('#modal-generated-win').modal('show');
		$('#modal-generated-win #modal-seed-text').text(result.seed);
		$('#modal-generated-win #modal-flags-text').text(result.preset);
		$('#download-last-generated-rom').prop('disabled', false);

		$('#generation-time').remove();
		$('body').append($('<div id="generation-time">').html('&Delta;' + (+new Date() - __start) + "ms"));

		//var issuebody = encodeURIComponent('ROM: ' + url + ' (' + result.checksum + ')');
		//$('#bugreport').attr('href', 'https://github.com/Arya-Iwakura/Ultima6Randomizer/issues/new?body=' + issuebody);

		if ($('#display_spoiler_log').is(':checked') && result.spoilers.length > 0)
		{
			createModalSpoilerList(result.spoilers);

			$('#view-spoiler-list').prop('disabled', false);
			$('#download-spoiler-log').prop('disabled', false);
		}
		else
		{
			$('#modal-spoiler-win #modal-spoiler-list').text("");
			$('#view-spoiler-list').prop('disabled', true);
			$('#download-spoiler-log').prop('disabled', true);
		}
	}
	else
	{
		$('#modal-error-win #modal-error-text').text("Randomized ROM did not pass validation");
		$('#modal-error-win #modal-error-list').empty();

		for (var i = 0; i < result.errors.length; ++i)
			$('#modal-error-win #modal-error-list').append($('<li>').text(result.errors[i]).addClass('mono'));
		if (DEVMODE) saveAs(new Blob([result.buffer], {type: "octet/stream"}), prefix + '-broken' + ['.sfc', '.smc'][+(result.buffer.length > 0x80000)]);

		$('#modal-error-win').modal('show');
	}
}

$('#download-generated-rom').click(function(e)
{
	var avatar_sprite = $('#select-avatar-sprite').val();
	var fire_flag = ($('#avatar-sprite-fire-flag').is(':checked'));
	result.buffer = setCharacterSprite(result.buffer, result.seed, avatar_sprite, fire_flag);

	var poison_flash = $('#poison_flash_options').val();
	result.buffer = setPoisionFlash(result.buffer, poison_flash);

	var fileName = "";
	fileName = prefix + '-' + result.seed + '-' + result.preset + result.type;
	if ($('#hide_filename_spoiler').is(':checked'))
	{
		fileName = prefix + '-' + Date.now() + result.type;
	}

	saveAs(new Blob([result.buffer], {type: "octet/stream"}), fileName);
});

$('#download-last-generated-rom').click(function(e)
{
	$('#modal-generated-win').modal('show');
});

$('#generate-randomized-rom').click(function(e)
{
	if (!ORIGINAL_ROM) return;

	var seed = getSeedForGenerator();

	if (ORIGINAL_ROM === true)
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'validation.data', true);
		console.log("generate-randomized-rom - READING VALIDATION DATA");
		xhr.responseType = 'arraybuffer';

		xhr.onload = function(e){ doRandomize(xhr.response, seed); }
		xhr.send();
	}
	else
	{
		var reader = new FileReader();
		reader.onloadend = function(e){ doRandomize(reader.result, seed); };
		reader.readAsArrayBuffer(ORIGINAL_ROM);
	}
});

$('#generate-param-rom').click(function(e)
{
	var seed = getSeedForGenerator();

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'validation.data', true);
	console.log("generate-param-rom - READING VALIDATION DATA");
	xhr.responseType = 'arraybuffer';

	xhr.onload = function(e){ doRandomize(xhr.response, seed); }
	xhr.send();
});

function getSeedForGenerator()
{
	var seed = NaN;

	if ($('#preset').val() == PRESET_DAILY_CHALLENGE)
    {
        //preset mode set to DAILY CHALLENGE
		seed = getDailyChallengeSeed();
    }
	else
	{
		//preset mode set to anything else
		seed = parseInt($('#custom-seed').val(), 16); //if nothing is input this will return as NaN - this is expected
	}
	
	return seed;
}

function getMD5(file, callback)
{
	var w = new Worker('js/md5.worker.js');
	w.onmessage = function(e){ callback(e.data); };
	w.postMessage(file);
}

$('#select-original-rom').click(
	function(e){ $('#original-rom').click(); });

$('#original-rom').change(function(e)
{
	var isvalid = e.target.files.length && e.target.files[0].size >= 0x80000;
	checkRomResult(isvalid, e.target.files[0]);
});

$('form').submit(function(e)
{
	e.preventDefault();
	return false;
});

$('#view-spoiler-list').click(function(e)
{
	$('#modal-spoiler-win').modal('show');
});

$('#randomize_core_items').click(function(e)
{
	checkInventoryFlagStatus();
	checkHintFlagStatus();
});
$('#randomize_chests_overworld').click(function(e)
{
	checkInventoryFlagStatus();
	checkHintFlagStatus();
});
$('#randomize_chests_dungeons').click(function(e)
{
	checkInventoryFlagStatus();
	checkHintFlagStatus();
});

function checkInventoryFlagStatus()
{
	if ($('#randomize_core_items').is(':checked') || $('#randomize_chests_overworld').is(':checked') || $('#randomize_chests_dungeons').is(':checked'))
	{
		$('#randomize_moonorb').prop('disabled', false);
		$('#randomize_spellbook').prop('disabled', false);
		$('#randomize_unlockanddispel').prop('disabled', false);
		//$('#add_sherry_item').prop('disabled', false);
	}
	else
	{
		$('#randomize_moonorb').prop('disabled', true);
		$('#randomize_moonorb').prop('checked', false);

		$('#randomize_spellbook').prop('disabled', true);
		$('#randomize_spellbook').prop('checked', false);
		
		$('#randomize_unlockanddispel').prop('disabled', true);
		$('#randomize_unlockanddispel').prop('checked', false);
	
		//$('#add_sherry_item').prop('disabled', true);
		//$('#add_sherry_item').prop('checked', false);
	}
}

$('#randomize_moonorb').click(function(e)
{
	checkHintFlagStatus();
});
$('#randomize_spellbook').click(function(e)
{
	checkHintFlagStatus();
});
function checkHintFlagStatus()
{
	if ($('#randomize_core_items').is(':checked') || $('#randomize_moonorb').is(':checked') || $('#randomize_spellbook').is(':checked'))
	{
		$('#display_hints').prop('disabled', false);
	}
	else
	{
		$('#display_hints').prop('disabled', true);
		$('#display_hints').prop('checked', false);
	}
}

$('#randomize_enemy_monsters').click(function(e)
{
	checkEnemyMixFlagStatus();
});
$('#randomize_enemy_wild').click(function(e)
{
	checkEnemyMixFlagStatus();
});
$('#randomize_enemy_animals').click(function(e)
{
	checkEnemyMixFlagStatus();
});
$('#randomize_enemy_people').click(function(e)
{
	checkEnemyMixFlagStatus();
});

function checkEnemyMixFlagStatus()
{
	var checkedCounter = 0;
	if ($('#randomize_enemy_monsters').is(':checked'))
		checkedCounter += 1;
	if ($('#randomize_enemy_wild').is(':checked'))
		checkedCounter += 1;
	if ($('#randomize_enemy_animals').is(':checked'))
		checkedCounter += 1;
	if ($('#randomize_enemy_people').is(':checked'))
		checkedCounter += 1;

	if (checkedCounter > 1)
	{
		$('#randomize_enemy_mix').prop('disabled', false);
	}
	else
	{
		$('#randomize_enemy_mix').prop('disabled', true);
		$('#randomize_enemy_mix').prop('checked', false);
	}
}

//=================================================================================

function updateAllSelectionTooltips()
{
	checkAISpawnNumberStatus();
	checkAIAggressionStatus();
	checkAIStatDifficultyStatus();
	checkAIHealthDifficultyStatus();
	checkAIDamageDifficultyStatus();
	checkAISpellDifficultyStatus();
	checkAISpellsStatus();
	checkAIEquipmentStatus();
	checkStartingInventoryStatus();
	checkStartingGoldStatus();
	checkKarmaDifficultyStatus();
	checkDayNightCycleStatus();
	checkSpirtShrineStatus();
	checkPlacedRaftsStatus();
}

$('#select-ai-spawn-numbers').click(function(e)
{
	checkAISpawnNumberStatus();
});

$('#select-ai-spawn-numbers').keyup(function(e)
{
	checkAISpawnNumberStatus();
});

function checkAISpawnNumberStatus()
{
	var selection = +$('#select-ai-spawn-numbers').val();
	if (selection == 0)
	{
		$('#ai-spawn-numbers-tooltip-1').prop('hidden', false);
		$('#ai-spawn-numbers-tooltip-2').prop('hidden', true);
		$('#ai-spawn-numbers-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#ai-spawn-numbers-tooltip-1').prop('hidden', true);
		$('#ai-spawn-numbers-tooltip-2').prop('hidden', false);
		$('#ai-spawn-numbers-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-spawn-numbers-tooltip-1').prop('hidden', true);
		$('#ai-spawn-numbers-tooltip-2').prop('hidden', true);
		$('#ai-spawn-numbers-tooltip-3').prop('hidden', false);
	}
}

$('#select-ai-aggression').click(function(e)
{
	checkAIAggressionStatus();
});

$('#select-ai-aggression').keyup(function(e)
{
	checkAIAggressionStatus();
});

function checkAIAggressionStatus()
{
	var selection = +$('#select-ai-aggression').val();
	if (selection == 0)
	{
		$('#ai-aggression-tooltip-1').prop('hidden', false);
		$('#ai-aggression-tooltip-2').prop('hidden', true);
		$('#ai-aggression-tooltip-3').prop('hidden', true);
		$('#ai-aggression-tooltip-4').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#ai-aggression-tooltip-1').prop('hidden', true);
		$('#ai-aggression-tooltip-2').prop('hidden', false);
		$('#ai-aggression-tooltip-3').prop('hidden', true);
		$('#ai-aggression-tooltip-4').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-aggression-tooltip-1').prop('hidden', true);
		$('#ai-aggression-tooltip-2').prop('hidden', true);
		$('#ai-aggression-tooltip-3').prop('hidden', false);
		$('#ai-aggression-tooltip-4').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#ai-aggression-tooltip-1').prop('hidden', true);
		$('#ai-aggression-tooltip-2').prop('hidden', true);
		$('#ai-aggression-tooltip-3').prop('hidden', true);
		$('#ai-aggression-tooltip-4').prop('hidden', false);
		
	}
}

$('#select-ai-stat-difficulty').click(function(e)
{
	checkAIStatDifficultyStatus();
});

$('#select-ai-stat-difficulty').keyup(function(e)
{
	checkAIStatDifficultyStatus();
});

function checkAIStatDifficultyStatus()
{
	var selection = +$('#select-ai-stat-difficulty').val();
	if (selection == 0)
	{
		$('#ai-stat-difficulty-tooltip-1').prop('hidden', false);
		$('#ai-stat-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-5').prop('hidden', true);

	}
	else if (selection == 1)
	{
		$('#ai-stat-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-2').prop('hidden', false);
		$('#ai-stat-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-stat-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-3').prop('hidden', false);
		$('#ai-stat-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#ai-stat-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-4').prop('hidden', false);
		$('#ai-stat-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 4)
	{
		$('#ai-stat-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-stat-difficulty-tooltip-5').prop('hidden', false);
	}
}

$('#select-ai-health-difficulty').click(function(e)
{
	checkAIHealthDifficultyStatus();
});

$('#select-ai-health-difficulty').keyup(function(e)
{
	checkAIHealthDifficultyStatus();
});

function checkAIHealthDifficultyStatus()
{
	var selection = +$('#select-ai-health-difficulty').val();
	if (selection == 0)
	{
		$('#ai-health-difficulty-tooltip-1').prop('hidden', false);
		$('#ai-health-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-5').prop('hidden', true);

	}
	else if (selection == 1)
	{
		$('#ai-health-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-2').prop('hidden', false);
		$('#ai-health-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-health-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-3').prop('hidden', false);
		$('#ai-health-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#ai-health-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-4').prop('hidden', false);
		$('#ai-health-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 4)
	{
		$('#ai-health-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-health-difficulty-tooltip-5').prop('hidden', false);
	}
}

$('#select-ai-damage-difficulty').click(function(e)
{
	checkAIDamageDifficultyStatus();
});

$('#select-ai-damage-difficulty').keyup(function(e)
{
	checkAIDamageDifficultyStatus();
});

function checkAIDamageDifficultyStatus()
{
	var selection = +$('#select-ai-damage-difficulty').val();
	if (selection == 0)
	{
		$('#ai-damage-difficulty-tooltip-1').prop('hidden', false);
		$('#ai-damage-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-5').prop('hidden', true);

	}
	else if (selection == 1)
	{
		$('#ai-damage-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-2').prop('hidden', false);
		$('#ai-damage-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-damage-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-3').prop('hidden', false);
		$('#ai-damage-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#ai-damage-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-4').prop('hidden', false);
		$('#ai-damage-difficulty-tooltip-5').prop('hidden', true);
	}
	else if (selection == 4)
	{
		$('#ai-damage-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-3').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-4').prop('hidden', true);
		$('#ai-damage-difficulty-tooltip-5').prop('hidden', false);
	}
}

$('#select-ai-spell-difficulty').click(function(e)
{
	checkAISpellDifficultyStatus();
});

$('#select-ai-spell-difficulty').keyup(function(e)
{
	checkAISpellDifficultyStatus();
});

function checkAISpellDifficultyStatus()
{
	var selection = +$('#select-ai-spell-difficulty').val();
	if (selection == 0)
	{
		$('#ai-spell-difficulty-tooltip-1').prop('hidden', false);
		$('#ai-spell-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-spell-difficulty-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#ai-spell-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-spell-difficulty-tooltip-2').prop('hidden', false);
		$('#ai-spell-difficulty-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-spell-difficulty-tooltip-1').prop('hidden', true);
		$('#ai-spell-difficulty-tooltip-2').prop('hidden', true);
		$('#ai-spell-difficulty-tooltip-3').prop('hidden', false);
	}
}

$('#select-ai-spells').click(function(e)
{
	checkAISpellsStatus();
});

$('#select-ai-spells').keyup(function(e)
{
	checkAISpellsStatus();
});

function checkAISpellsStatus()
{
	var selection = +$('#select-ai-spells').val();
	if (selection == 0)
	{
		$('#ai-spells-tooltip-1').prop('hidden', false);
		$('#ai-spells-tooltip-2').prop('hidden', true);
		$('#ai-spells-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#ai-spells-tooltip-1').prop('hidden', true);
		$('#ai-spells-tooltip-2').prop('hidden', false);
		$('#ai-spells-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-spells-tooltip-1').prop('hidden', true);
		$('#ai-spells-tooltip-2').prop('hidden', true);
		$('#ai-spells-tooltip-3').prop('hidden', false);
	}
}

$('#select-ai-equipment').click(function(e)
{
	checkAIEquipmentStatus();
});

$('#select-ai-equipment').keyup(function(e)
{
	checkAIEquipmentStatus();
});

function checkAIEquipmentStatus()
{
	var selection = +$('#select-ai-equipment').val();
	if (selection == 0)
	{
		$('#ai-equipment-tooltip-1').prop('hidden', false);
		$('#ai-equipment-tooltip-2').prop('hidden', true);
		$('#ai-equipment-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#ai-equipment-tooltip-1').prop('hidden', true);
		$('#ai-equipment-tooltip-2').prop('hidden', false);
		$('#ai-equipment-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#ai-equipment-tooltip-1').prop('hidden', true);
		$('#ai-equipment-tooltip-2').prop('hidden', true);
		$('#ai-equipment-tooltip-3').prop('hidden', false);
	}
}

$('#select-junk-items').click(function(e)
{
	checkJunkItemStatus();
});

$('#select-junk-items').keyup(function(e)
{
	checkJunkItemStatus();
});

function checkJunkItemStatus()
{
	var selection = +$('#select-junk-items').val();
	if (selection == 0)
	{
		$('#junk-item-tooltip-1').prop('hidden', false);
		$('#junk-item-tooltip-2').prop('hidden', true);
		$('#junk-item-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#junk-item-tooltip-1').prop('hidden', true);
		$('#junk-item-tooltip-2').prop('hidden', false);
		$('#junk-item-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#junk-item-tooltip-1').prop('hidden', true);
		$('#junk-item-tooltip-2').prop('hidden', true);
		$('#junk-item-tooltip-3').prop('hidden', false);
	}
}

$('#select-starting-inventory').click(function(e)
{
	checkStartingInventoryStatus();
});

$('#select-starting-inventory').keyup(function(e)
{
	checkStartingInventoryStatus();
});

function checkStartingInventoryStatus()
{
	var selection = +$('#select-starting-inventory').val();
	if (selection == 0)
	{
		$('#starting-inventory-tooltip-1').prop('hidden', false);
		$('#starting-inventory-tooltip-2').prop('hidden', true);
		$('#starting-inventory-tooltip-3').prop('hidden', true);
		$('#starting-inventory-tooltip-4').prop('hidden', true);
		$('#starting-inventory-tooltip-5').prop('hidden', true);
		$('#starting-inventory-tooltip-6').prop('hidden', true);
		$('#starting-inventory-tooltip-7').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#starting-inventory-tooltip-1').prop('hidden', true);
		$('#starting-inventory-tooltip-2').prop('hidden', false);
		$('#starting-inventory-tooltip-3').prop('hidden', true);
		$('#starting-inventory-tooltip-4').prop('hidden', true);
		$('#starting-inventory-tooltip-5').prop('hidden', true);
		$('#starting-inventory-tooltip-6').prop('hidden', true);
		$('#starting-inventory-tooltip-7').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#starting-inventory-tooltip-1').prop('hidden', true);
		$('#starting-inventory-tooltip-2').prop('hidden', true);
		$('#starting-inventory-tooltip-3').prop('hidden', false);
		$('#starting-inventory-tooltip-4').prop('hidden', true);
		$('#starting-inventory-tooltip-5').prop('hidden', true);
		$('#starting-inventory-tooltip-6').prop('hidden', true);
		$('#starting-inventory-tooltip-7').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#starting-inventory-tooltip-1').prop('hidden', true);
		$('#starting-inventory-tooltip-2').prop('hidden', true);
		$('#starting-inventory-tooltip-3').prop('hidden', true);
		$('#starting-inventory-tooltip-4').prop('hidden', false);
		$('#starting-inventory-tooltip-5').prop('hidden', true);
		$('#starting-inventory-tooltip-6').prop('hidden', true);
		$('#starting-inventory-tooltip-7').prop('hidden', true);
	}
	else if (selection == 4)
	{
		$('#starting-inventory-tooltip-1').prop('hidden', true);
		$('#starting-inventory-tooltip-2').prop('hidden', true);
		$('#starting-inventory-tooltip-3').prop('hidden', true);
		$('#starting-inventory-tooltip-4').prop('hidden', true);
		$('#starting-inventory-tooltip-5').prop('hidden', false);
		$('#starting-inventory-tooltip-6').prop('hidden', true);
		$('#starting-inventory-tooltip-7').prop('hidden', true);
	}
	else if (selection == 5)
	{
		$('#starting-inventory-tooltip-1').prop('hidden', true);
		$('#starting-inventory-tooltip-2').prop('hidden', true);
		$('#starting-inventory-tooltip-3').prop('hidden', true);
		$('#starting-inventory-tooltip-4').prop('hidden', true);
		$('#starting-inventory-tooltip-5').prop('hidden', true);
		$('#starting-inventory-tooltip-6').prop('hidden', false);
		$('#starting-inventory-tooltip-7').prop('hidden', true);
	}
	else if (selection == 6)
	{
		$('#starting-inventory-tooltip-1').prop('hidden', true);
		$('#starting-inventory-tooltip-2').prop('hidden', true);
		$('#starting-inventory-tooltip-3').prop('hidden', true);
		$('#starting-inventory-tooltip-4').prop('hidden', true);
		$('#starting-inventory-tooltip-5').prop('hidden', true);
		$('#starting-inventory-tooltip-6').prop('hidden', true);
		$('#starting-inventory-tooltip-7').prop('hidden', false);
	}
}

$('#select-starting-gold').click(function(e)
{
	checkStartingGoldStatus();
});

$('#select-starting-gold').keyup(function(e)
{
	checkStartingGoldStatus();
});

function checkStartingGoldStatus()
{
	var selection = +$('#select-starting-gold').val();
	if (selection == 0)
	{
		$('#starting-gold-tooltip-1').prop('hidden', false);
		$('#starting-gold-tooltip-2').prop('hidden', true);
		$('#starting-gold-tooltip-3').prop('hidden', true);
		$('#starting-gold-tooltip-4').prop('hidden', true);
		$('#starting-gold-tooltip-5').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#starting-gold-tooltip-1').prop('hidden', true);
		$('#starting-gold-tooltip-2').prop('hidden', false);
		$('#starting-gold-tooltip-3').prop('hidden', true);
		$('#starting-gold-tooltip-4').prop('hidden', true);
		$('#starting-gold-tooltip-5').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#starting-gold-tooltip-1').prop('hidden', true);
		$('#starting-gold-tooltip-2').prop('hidden', true);
		$('#starting-gold-tooltip-3').prop('hidden', false);
		$('#starting-gold-tooltip-4').prop('hidden', true);
		$('#starting-gold-tooltip-5').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#starting-gold-tooltip-1').prop('hidden', true);
		$('#starting-gold-tooltip-2').prop('hidden', true);
		$('#starting-gold-tooltip-3').prop('hidden', true);
		$('#starting-gold-tooltip-4').prop('hidden', false);
		$('#starting-gold-tooltip-5').prop('hidden', true);
	}
	else if (selection == 4)
	{
		$('#starting-gold-tooltip-1').prop('hidden', true);
		$('#starting-gold-tooltip-2').prop('hidden', true);
		$('#starting-gold-tooltip-3').prop('hidden', true);
		$('#starting-gold-tooltip-4').prop('hidden', true);
		$('#starting-gold-tooltip-5').prop('hidden', false);
	}
}

$('#select-day-night-cycle').click(function(e)
{
	checkDayNightCycleStatus();
});

$('#select-day-night-cycle').keyup(function(e)
{
	checkDayNightCycleStatus();
});

function checkDayNightCycleStatus()
{
	var selection = +$('#select-day-night-cycle').val();
	if (selection == 0)
	{
		$('#day-night-cycle-tooltip-1').prop('hidden', false);
		$('#day-night-cycle-tooltip-2').prop('hidden', true);
		$('#day-night-cycle-tooltip-3').prop('hidden', true);
		$('#day-night-cycle-tooltip-4').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#day-night-cycle-tooltip-1').prop('hidden', true);
		$('#day-night-cycle-tooltip-2').prop('hidden', false);
		$('#day-night-cycle-tooltip-3').prop('hidden', true);
		$('#day-night-cycle-tooltip-4').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#day-night-cycle-tooltip-1').prop('hidden', true);
		$('#day-night-cycle-tooltip-2').prop('hidden', true);
		$('#day-night-cycle-tooltip-3').prop('hidden', false);
		$('#day-night-cycle-tooltip-4').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#day-night-cycle-tooltip-1').prop('hidden', true);
		$('#day-night-cycle-tooltip-2').prop('hidden', true);
		$('#day-night-cycle-tooltip-3').prop('hidden', true);
		$('#day-night-cycle-tooltip-4').prop('hidden', false);
	}
}


$('#select-karma-difficulty').click(function(e)
{
	checkKarmaDifficultyStatus();
});

$('#select-karma-difficulty').keyup(function(e)
{
	checkKarmaDifficultyStatus();
});

function checkKarmaDifficultyStatus()
{
	var selection = +$('#select-karma-difficulty').val();
	if (selection == 0)
	{
		$('#karma-tooltip-1').prop('hidden', false);
		$('#karma-tooltip-2').prop('hidden', true);
		$('#karma-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#karma-tooltip-1').prop('hidden', true);
		$('#karma-tooltip-2').prop('hidden', false);
		$('#karma-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#karma-tooltip-1').prop('hidden', true);
		$('#karma-tooltip-2').prop('hidden', true);
		$('#karma-tooltip-3').prop('hidden', false);
	}
}

$('#select-item-difficulty').click(function(e)
{
	checkItemDifficultyStatus();
});

$('#select-item-difficulty').keyup(function(e)
{
	checkItemDifficultyStatus();
});

function checkItemDifficultyStatus()
{
	var selection = +$('#select-item-difficulty').val();
	if (selection == 0)
	{
		$('#item-difficulty-tooltip-1').prop('hidden', false);
		$('#item-difficulty-tooltip-2').prop('hidden', true);
		$('#item-difficulty-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#item-difficulty-tooltip-1').prop('hidden', true);
		$('#item-difficulty-tooltip-2').prop('hidden', false);
		$('#item-difficulty-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#item-difficulty-tooltip-1').prop('hidden', true);
		$('#item-difficulty-tooltip-2').prop('hidden', true);
		$('#item-difficulty-tooltip-3').prop('hidden', false);
	}
}

$('#select-spiritshrine').click(function(e)
{
	checkSpirtShrineStatus();
});

$('#select-spiritshrine').keyup(function(e)
{
	checkSpirtShrineStatus();
});

function checkSpirtShrineStatus()
{
	var selection = +$('#select-spiritshrine').val();
	if (selection == 0)
	{
		$('#spiritshrine-tooltip-1').prop('hidden', false);
		$('#spiritshrine-tooltip-2').prop('hidden', true);
		$('#spiritshrine-tooltip-3').prop('hidden', true);
		$('#spiritshrine-tooltip-4').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#spiritshrine-tooltip-1').prop('hidden', true);
		$('#spiritshrine-tooltip-2').prop('hidden', false);
		$('#spiritshrine-tooltip-3').prop('hidden', true);
		$('#spiritshrine-tooltip-4').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#spiritshrine-tooltip-1').prop('hidden', true);
		$('#spiritshrine-tooltip-2').prop('hidden', true);
		$('#spiritshrine-tooltip-3').prop('hidden', false);
		$('#spiritshrine-tooltip-4').prop('hidden', true);
	}
	else if (selection == 3)
	{
		$('#spiritshrine-tooltip-1').prop('hidden', true);
		$('#spiritshrine-tooltip-2').prop('hidden', true);
		$('#spiritshrine-tooltip-3').prop('hidden', true);
		$('#spiritshrine-tooltip-4').prop('hidden', false);
	}
}

$('#select-placedrafts').click(function(e)
{
	checkPlacedRaftsStatus();
});

$('#select-placedrafts').keyup(function(e)
{
	checkPlacedRaftsStatus();
});

function checkPlacedRaftsStatus()
{
	var selection = +$('#select-placedrafts').val();
	if (selection == 0)
	{
		$('#placedrafts-tooltip-1').prop('hidden', false);
		$('#placedrafts-tooltip-2').prop('hidden', true);
		$('#placedrafts-tooltip-3').prop('hidden', true);
	}
	else if (selection == 1)
	{
		$('#placedrafts-tooltip-1').prop('hidden', true);
		$('#placedrafts-tooltip-2').prop('hidden', false);
		$('#placedrafts-tooltip-3').prop('hidden', true);
	}
	else if (selection == 2)
	{
		$('#placedrafts-tooltip-1').prop('hidden', true);
		$('#placedrafts-tooltip-2').prop('hidden', true);
		$('#placedrafts-tooltip-3').prop('hidden', false);
	}
}

//=================================================================================

function cleanCustomSeed(seed)
{ return seed.replace(/[^a-fA-F0-9]+/g, '').substr(0, 8); }

$('#custom-seed').bind("keypress paste", function(e)
{
	var self = $(this);
	setTimeout(function(){ self.val(cleanCustomSeed(self.val())); }, 1);
});

function checkRomResult(valid, file)
{
	$('#original-rom-result').removeClass('glyphicon-question-sign');
	$('#original-rom-result').toggleClass('glyphicon-ok', valid);
	$('#original-rom-result').toggleClass('glyphicon-remove', !valid);

	$('#generate-randomized-rom').prop('disabled', !valid);

	if (valid) ORIGINAL_ROM = file;
	return valid;
}

function checkHash()
{
	if (!location.hash || location.hash.indexOf("#!/") !== 0) return;
	var parts = location.hash.split('/').slice(1);
	var partsPreset = parts[1].split('-');

	var seed = cleanCustomSeed(parts[0]);
	if (parts.length > 0) $('#custom-seed').val(seed);

	var givenChecked = partsPreset.length > 0 ? partsPreset[0] : '0';
	var givenSelect = partsPreset.length > 1 ? partsPreset[1] : '0';

	if (givenChecked[0] == 'x' && givenSelect[0] == 's')
	{
		$('#preset').val(0);
		setRandomizerSettings(givenChecked.substr(1));
		setRandomizerSettingsSelects(givenSelect.substr(1));
	}
	else
	{ $('#preset').val(+partsPreset[0]+partsPreset[1]); updatePreset(); }

	//var seedText = seed;
	//var flagsText = givenChecked + "/" + givenSelect;
	//if($('#hide_seed_value').is(':checked'))
	//{
	//	seedText = "hidden";
	//	flagsText = "hidden";
	//}

	//if (parts.length > 1)
	//{
	//	$('#modal-download-win .modal-body .seed').text(seedText);
	//	$('#modal-download-win .modal-body .flags').text(flagsText);
	//	$('#modal-download-win .modal-body .preset').text(getPresetName());
	//	$('#modal-download-win').modal('show');
	//}
}

function deepClone(obj)
{
	if (obj.constructor == Array)
	{
		var x = [], i;
		for (i = 0; i < obj.length; ++i)
			x.push(deepClone(obj[i]));
		return x;
	}
	else if (obj.constructor == Object)
	{
		var x = {};
		for (var k in obj)
			if (obj.hasOwnProperty(k))
				x[k] = deepClone(obj[k]);
		return x;
	}
	else return obj;
}

function compressRLE2(src)
{
	var compress = [], dcopy = [];
	for (var i = 0, len; i < src.length; i += len)
	{
		// determine length of potential RLE segment
		for (var j = 1; src[i] == src[i+j]; ++j);
		var len = j;

		// if this is a worthwhile RLE segment
		if (len > (dcopy.length ? 3 : 1))
		{
			// flush the direct copy buffer
			if (dcopy.length)
			{
				compress.push(dcopy.length - 1);
				for (var k = 0; k < dcopy.length; ++k)
					compress.push(dcopy[k]);
				dcopy = [];
			}

			// add the RLE segment
			compress.push(0x80 | (len - 1));
			compress.push(src[i]);
		}
		// otherwise, hold in direct copy buffer
		else
		{
			// if adding this to the direct copy buffer would
			// overflow the 0x7F length of the RLE opcode
			if (dcopy.length + len > 0x80)
			{
				// flush the buffer
				compress.push(dcopy.length - 1);
				for (var k = 0; k < dcopy.length; ++k)
					compress.push(dcopy[k]);
				dcopy = [];
			}

			while (j--) dcopy.push(src[i]);
		}
	}

	// flush the remaining direct copy values
	if (dcopy.length)
	{
		compress.push(dcopy.length - 1);
		for (var k = 0; k < dcopy.length; ++k)
			compress.push(dcopy[k]);
	}

	// wrap in uint8 array
	return new Uint8Array(compress);
}

function decompressRLE2(src)
{
	var decompress = [];
	for (var i = 0; i < src.length; ++i)
	{
		// get length field from header
		var len = (src[i] & 0x7F) + 1;

		// RLE bit is set
		if (0x80 & src[i])
		{
			// get bit to repeat and repeat it
			var val = src[++i];
			for (var j = 0; j < len; ++j)
				decompress.push(val);
		}
		// direct copy
		else
		{
			// transfer direct copy chunk
			for (var j = 0; j < len; ++j)
				decompress.push(src[++i]);
		}
	}

	// wrap in uint8 array
	return new Uint8Array(decompress);
}

window.onhashchange = checkHash;
checkHash();

Math.sign = Math.sign || function(x)
{
	x = +x;
	if (x > 0) return  1;
	if (x < 0) return -1;
	return 0;
}

Uint8Array.prototype.slice = Uint8Array.prototype.slice || function(start, end)
{
	var src = this.subarray(start, end);
	var dst = new Uint8Array(src.byteLength);
	dst.set(src); return dst;
}

Uint8Array.prototype.writeBytes = function(b, addr, val)
{ var _b = b; for (; b--; val >>= 8) this[addr++] = val & 0xFF; return _b; }

//Uint8Array.prototype.readBytes = function(b, addr)
//{ var x = 0, s = 0; for (; b--; s += 8, addr++) x |= (this[addr] & 0xFF) << s; return x; }

function bitsToHex(_arr)
{
	var arr = _arr.slice(0);

	var h = '', x, i;
	while (arr.length)
	{
		var z = arr.splice(0, 4);
		for (x = 0, i = 0; i < z.length; ++i)
			x |= (z[i] ? 1 : 0) << i;
		h += x.toString(16);
	}

	return h;
}

function hexToBits(x)
{
	for (var a = [], i = 0; i < x.length; ++i)
	{
		var v = parseInt(x[i], 16);
		for (var j = 0; j < 4; v >>= 1, ++j) a.push(v & 1);
	}
	return a;
}

function bitset(x, mask)
{ return (x & mask) == mask; }

function Random(seed)
{ this.seed = Math.floor(seed || (Math.random() * 0xFFFFFFFF)) % 0xFFFFFFFF; }

Random.prototype.clone = function()
{ return new Random(this.seed); }

Random.prototype.pull = function(n)
{ while (n--) this.next(); }

Random.prototype.next = function(z)
{ return this.seed = ((214013 * this.seed + 2531011) & 0x7fffffff) >> 16; }

Random.prototype.nextFloat = function()
{ return this.next() / 0x7fff; }

Random.prototype.flipCoin = function(x)
{ return this.nextFloat() < x; }

// Box-Muller transform, converts uniform distribution to normal distribution
// depends on uniformity of nextFloat(), which I'm not confident of
Random.prototype.nextGaussian = function()
{
	var u = this.nextFloat(), v = this.nextFloat();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

Random.prototype.nextInt = function(z)
{ return (this.nextFloat() * z)|0; }

Random.prototype.nextIntRange = function(a, b)
{ return a + this.nextInt(b - a); }

Random.prototype.from = function(arr)
{ return arr[this.nextInt(arr.length)]; }

Random.prototype.fromWeighted = function(arr)
{
	if (!arr._weight)
	{
		arr._weight = 0;
		for (var i = 0; i < arr.length; ++i)
			arr._weight += arr[i].weight || 1;
	}

	var x = this.nextFloat() * arr._weight;
	for (var i = 0; i < arr.length; ++i)
		if ((x -= arr[i].weight || 1) < 0.0) return arr[i];
	return arr[0];
}

Random.prototype.draw = function(arr)
{
	var which = this.nextInt(arr.length);
	return arr.splice(which, 1)[0];
}

Array.prototype.shuffle = function(random)
{
	if (!random) random = new Random();
	for (var t, i = 1, j; i < this.length; ++i)
	{
		j = random.nextInt(i+1);
		t = this[j]; this[j] = this[i]; this[i] = t;
	}

	return this;
}

Array.prototype.contains = function(x)
{ return this.indexOf(x) != -1; }

Array.prototype.uniq = function()
{ return this.filter(function(a){ return !this[a] ? this[a] = true : false; }, {}); }

function __range(n)
{
	for (var x = [], i = 0; i < n; ++i) x.push(i);
	return x;
}

Number.prototype.toBin = function(p)
{
	var s = p || 'b#', x = (this & 0xFF);
	for (var i = 0x80; i > 0; i >>= 1)
		s += (x & i) ? '1' : '0';
	return s;
}

Number.prototype.toHex = function(n, p)
{
	var hex = this.toString(16);
	while (hex.length < n) hex = '0' + hex;
	return (p != null ? p : '') + hex;
}

Number.prototype.toPrintHex = function(n)
{ return '0x' + this.toHex(n).toUpperCase(); }

function ROMLogger(rom)
{ this.rom = rom; }

ROMLogger.prototype.start = function()
{
	this.orig = new Uint8Array(this.rom.byteLength);
	this.orig.set(this.rom);
	return this;
}

ROMLogger.prototype.print = function()
{
	for (var i = 0; i < this.rom.length; ++i)
	{
		if (this.rom[i] == this.orig[i]) continue;
		console.log(i.toHex(6, '0x') + ' - ' + this.orig[i].toHex(2) + '->' + this.rom[i].toHex(2));
	}
}

var makeCRCTable = function(){
    var c;
    var crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

var CRC_TABLE = [];
for (var i = 0; i < 256; ++i)
{
	var c = i;
	for (var j = 0; j < 8; ++j)
		c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	CRC_TABLE[i] = c;
}

function crc32(arr)
{
    var crc = 0 ^ (-1);
    for (var i = 0; i < arr.length; ++i)
        crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ arr[i]) & 0xFF];
    return (crc ^ (-1)) >>> 0;
}

$(document).ready(function()
{
	var language = window.navigator.userLanguage || window.navigator.language || "";
	EN_US = (language.indexOf('US') != -1);
});

var TESTERS =
{
	'squibbons': 'squibbons',
	'synthpopisback': 'synthpopisback',
	'chadriden': 'chadriden',
	'cloudyshoe': 'cloudyshoe',
	'fenyx4' : 'fenyx4',
	'sathdresh' : 'sathdresh',
}

$('#tester-list').html(
	$.map(TESTERS, function(twitch, name)
	{
		var str = twitch ? '<a href="http://twitch.tv/' + twitch + '">' + name + '</a>' : name;
		return '<span class="tester-' + name + '">' + str + '</span>';
	}).shuffle().join(', ')
);

$('.version-number').text(VERSION_STRING);
