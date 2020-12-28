function updatePreset(val)
{
	var preset = val instanceof Number ? val : +$('#preset').val();
	if (preset > 0) $('.presetoption').prop('checked', false);

	if (preset == 0) return;

	switch(preset)
	{
		case 1: //Very Easy
			$('#randomize_core_items').prop('checked', true);
			$('#randomize_chests_overworld').prop('checked', true);
			
			$('#randomize_moonorb').prop('disabled', false);
			$('#randomize_spellbook').prop('disabled', false);
			
			$('#randomize_enemy_animals').prop('checked', true);
			
			$('#randomize_enemy_mix').prop('disabled', true);
			$('#randomize_enemy_mix').prop('checked', false);

			$('#display_hints').prop('disabled', false);
			break;
		case 2: //Easy
			$('#randomize_core_items').prop('checked', true);
			$('#randomize_chests_overworld').prop('checked', true);
			$('#randomize_moonorb').prop('checked', true);
			
			$('#randomize_moonorb').prop('disabled', false);
			$('#randomize_spellbook').prop('disabled', false);

			$('#randomize_enemy_wild').prop('checked', true);
			$('#randomize_enemy_animals').prop('checked', true);

			$('#randomize_enemy_mix').prop('disabled', false);

			$('#display_hints').prop('disabled', false);
			break;
		case 3: //Standard
			$('#randomize_core_items').prop('checked', true);
			$('#randomize_chests_overworld').prop('checked', true);
			$('#randomize_chests_dungeons').prop('checked', true);
			$('#randomize_moonorb').prop('checked', true);
			$('#randomize_spellbook').prop('checked', true);

			$('#randomize_moonorb').prop('disabled', false);
			$('#randomize_spellbook').prop('disabled', false);

			$('#randomize_enemy_animals').prop('checked', true);
			$('#randomize_enemy_wild').prop('checked', true);
			$('#randomize_enemy_mix').prop('checked', true);

			$('#randomize_enemy_mix').prop('disabled', false);

			$('#display_hints').prop('disabled', false);
			break;
		case 4: //Difficult
			$('#randomize_core_items').prop('checked', true);
			$('#randomize_chests_overworld').prop('checked', true);
			$('#randomize_chests_dungeons').prop('checked', true);
			$('#randomize_moonorb').prop('checked', true);
			$('#randomize_spellbook').prop('checked', true);

			$('#randomize_moonorb').prop('disabled', false);
			$('#randomize_spellbook').prop('disabled', false);

			$('#randomize_enemy_monsters').prop('checked', true);
			$('#randomize_enemy_wild').prop('checked', true);
			$('#randomize_enemy_animals').prop('checked', true);
			$('#randomize_enemy_people').prop('checked', true);

			$('#randomize_enemy_mix').prop('disabled', false);

			$('#display_hints').prop('disabled', false);
			break;
		case 5: //Very Difficult
			$('#randomize_core_items').prop('checked', true);
			$('#randomize_chests_overworld').prop('checked', true);
			$('#randomize_chests_dungeons').prop('checked', true);
			$('#randomize_moonorb').prop('checked', true);
			$('#randomize_spellbook').prop('checked', true);

			$('#randomize_moonorb').prop('disabled', false);
			$('#randomize_spellbook').prop('disabled', false);

			$('#randomize_enemy_monsters').prop('checked', true);
			$('#randomize_enemy_wild').prop('checked', true);
			$('#randomize_enemy_animals').prop('checked', true);
			$('#randomize_enemy_people').prop('checked', true);
			$('#randomize_enemy_mix').prop('checked', true);
			$('#randomize_enemy_aggression').prop('checked', true);

			$('#randomize_enemy_mix').prop('disabled', false);

			$('#display_hints').prop('disabled', false);
			break;
		default:
			$('#randomize_core_items').prop('checked', true);
			$('#randomize_chests_overworld').prop('checked', true);

			$('#randomize_moonorb').prop('disabled', false);
			$('#randomize_spellbook').prop('disabled', false);

			$('#randomize_enemy_mix').prop('disabled', true);

			$('#display_hints').prop('disabled', false);
			break;
	}
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
	"Stranger",
	"Standard",
	"Avatar",
	"Guardian",
];
/*
var PRESET_NAMES =
[
	"Custom",
	"TownsFolk",
	"Stranger",
	"Standard",
	"Avatar",
	"Guardian",
];
*/

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
