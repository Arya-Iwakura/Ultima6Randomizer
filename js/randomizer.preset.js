function updatePreset(val)
{
	var preset = val instanceof Number ? val : +$('#preset').val();
	if (preset > 0) $('.presetoption').prop('checked', false);

	if (preset == 0) return;

	switch(preset)
	{
		case 1: //Very Easy
			preset_townsfolk();
			break;
		case 2: //Easy
			preset_explorer();
			break;
		case 3: //Standard
			preset_adventurer();
			break;
		case 4: //Difficult
			preset_avatar();
			break;
		case 5: //Very Difficult
			preset_guardian();
			break;
		case 6: //TEST
			preset_test();
			break;
		default:
			preset_townsfolk();
			break;
	}

	updateAllSelectionTooltips();
}

function preset_townsfolk()
{
	$('#randomize_core_items').prop('checked', true);
	$('#randomize_chests_overworld').prop('checked', true);
	
	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);

	$('#randomize_enemy_animals').prop('checked', true);
	
	$('#randomize_enemy_mix').prop('disabled', true);
	$('#randomize_enemy_mix').prop('checked', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 0);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', false);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 1);
	$('#select-ai-spell-difficulty').prop('value', 1);
	$('#select-ai-spells').prop('value', 0);
	$('#select-ai-equipment').prop('value', 0);

	$('#add_missing_enemies').prop('checked', true);
	$('#add_missing_ai_spells').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', false);

	$('#select-starting-inventory').prop('value', 0);
	$('#select-starting-gold').prop('value', 0);
	$('#select-day-night-cycle').prop('value', 2);
	$('#select-karma-difficulty').prop('value', 1);
	$('#select-spiritshrine').prop('value', 0);
	$('#select-placedrafts').prop('value', 0);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_explorer()
{
	$('#randomize_core_items').prop('checked', true);
	$('#randomize_chests_overworld').prop('checked', true);
	$('#randomize_moonorb').prop('checked', true);
	
	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);

	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 0);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', false);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 2);
	$('#select-ai-spell-difficulty').prop('value', 1);
	$('#select-ai-spells').prop('value', 0);
	$('#select-ai-equipment').prop('value', 0);

	$('#add_missing_enemies').prop('checked', true);
	$('#add_missing_ai_spells').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', false);

	$('#select-starting-inventory').prop('value', 0);
	$('#select-starting-gold').prop('value', 0);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 1);
	$('#select-spiritshrine').prop('value', 0);
	$('#select-placedrafts').prop('value', 1);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_adventurer() //standard
{
	$('#randomize_core_items').prop('checked', true);
	$('#randomize_chests_overworld').prop('checked', true);
	$('#randomize_chests_dungeons').prop('checked', true);
	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);

	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_mix').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 1);

	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', false);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-spell-difficulty').prop('value', 0);
	$('#select-ai-spells').prop('value', 0);
	$('#select-ai-equipment').prop('value', 1);

	$('#add_missing_enemies').prop('checked', true);
	$('#add_missing_ai_spells').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', false);

	$('#select-starting-inventory').prop('value', 0);
	$('#select-starting-gold').prop('value', 0);
	$('#select-day-night-cycle').prop('value', 0);
	$('#select-karma-difficulty').prop('value', 0);
	$('#select-spiritshrine').prop('value', 0);
	$('#select-placedrafts').prop('value', 1);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);	
}

function preset_avatar()
{
	$('#randomize_core_items').prop('checked', true);
	$('#randomize_chests_overworld').prop('checked', true);
	$('#randomize_chests_dungeons').prop('checked', true);
	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_people').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);

	$('#select-ai-spawn-numbers').prop('value', 1);
	$('#select-ai-aggression').prop('value', 0);

	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 3);
	$('#select-ai-spell-difficulty').prop('value', 2);
	$('#select-ai-spells').prop('value', 1);
	$('#select-ai-equipment').prop('value', 1);

	$('#add_missing_enemies').prop('checked', true);
	$('#add_missing_ai_spells').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', false);
	$('#enable_fast_button_mapping').prop('checked', false);

	$('#select-starting-inventory').prop('value', 0);
	$('#select-starting-gold').prop('value', 0);
	$('#select-day-night-cycle').prop('value', 0);
	$('#select-karma-difficulty').prop('value', 2);
	$('#select-spiritshrine').prop('value', 0);
	$('#select-placedrafts').prop('value', 1);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);	
}

function preset_guardian()
{
	$('#randomize_core_items').prop('checked', true);
	$('#randomize_chests_overworld').prop('checked', true);
	$('#randomize_chests_dungeons').prop('checked', true);
	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_people').prop('checked', true);

	$('#randomize_enemy_mix').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#select-ai-spawn-numbers').prop('value', 2);
	$('#select-ai-aggression').prop('value', 2);
	
	$('#enemy_stats_shuffle').prop('checked', true);
	$('#enemy_spellcasters_shuffle').prop('checked', true);
	$('#enemy_equipmentusers_shuffle').prop('checked', true);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 4);
	$('#select-ai-spell-difficulty').prop('value', 2);
	$('#select-ai-spells').prop('value', 2);
	$('#select-ai-equipment').prop('value', 2);

	$('#add_missing_enemies').prop('checked', true);
	$('#add_missing_ai_spells').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', false);
	$('#enable_fast_button_mapping').prop('checked', false);

	$('#select-starting-inventory').prop('value', 0);
	$('#select-starting-gold').prop('value', 0);
	$('#select-day-night-cycle').prop('value', 0);
	$('#select-karma-difficulty').prop('value', 2);
	$('#select-spiritshrine').prop('value', 0);
	$('#select-placedrafts').prop('value', 1);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_test()
{
	$('#randomize_core_items').prop('checked', false);
	$('#randomize_chests_overworld').prop('checked', false);
	$('#randomize_chests_dungeons').prop('checked', false);
	
	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	
	$('#randomize_enemy_animals').prop('checked', false);
	
	$('#randomize_enemy_mix').prop('disabled', true);
	$('#randomize_enemy_mix').prop('checked', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 3);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', false);
	$('#randomize_enemy_drops').prop('checked', false);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-spell-difficulty').prop('value', 0);
	$('#select-ai-spells').prop('value', 0);
	$('#select-ai-equipment').prop('value', 0);

	$('#add_missing_enemies').prop('checked', true);
	$('#add_missing_ai_spells').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	
	$('#select-starting-inventory').prop('value', 0);
	$('#select-starting-gold').prop('value', 0);
	$('#select-day-night-cycle').prop('value', 2);
	$('#select-karma-difficulty').prop('value', 1);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 2);
	
	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

$('#preset').change(updatePreset);

// selecting any option by hand should set the preset box to "custom"
$('.presetoption').click(function()
{
	$('#preset').val(0);
});

var PRESET_NAMES =
[
	"Custom",
	"TownsFolk",
	//"Trader",
	"Explorer",
	"Adventurer",
	//"",
	"Avatar",
	"Guardian",
];

function getPresetName(n)
{
	if (n === undefined) n = $('#preset').val();
	console.log(n);
	return PRESET_NAMES[n] || PRESET_NAMES[0];
}

var RANDOMIZER_SETTINGS = [];
$('.presetoption').each(function(){ RANDOMIZER_SETTINGS.push(this); });

function getRandomizerSettings()
{
	var bitset = $.map(RANDOMIZER_SETTINGS, function(x){ return $(x).is(':checked'); });
	return bitsToHex(bitset);
}

function setRandomizerSettings(set)
{
	var bitset = hexToBits(set);
	for (var i = 0; i < RANDOMIZER_SETTINGS.length; ++i)
	{
		var x = i > bitset.length ? 0 : bitset[i];
		$(RANDOMIZER_SETTINGS[i]).prop('checked', x);
	}
}

function shuffleOptions()
{
	$('input:checkbox:enabled.presetoption').each(function()
	{ $(this).prop('checked', Math.random() > 0.5); });

	var radiogroups = {};
	$('input:radio:enabled.presetoption').each(function()
	{ radiogroups[$(this).attr('name')] = true; });

	for (var k in radiogroups)
	{
		var group = $('input:radio:enabled[name="' + k + '"]');
		var n = Math.floor(Math.random() * group.length);
		group.eq(n).prop('checked', true);
	}
}
