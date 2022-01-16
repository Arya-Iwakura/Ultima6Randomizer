const PRESET_DAILY_CHALLENGE = 10;
const PRESET_RANDOM_CHALLENGE = 11;
const PRESET_PATCHED_BASE_GAME = 12;

$('#custom-seed').change(function()
{
	if ($('#preset').val() == PRESET_DAILY_CHALLENGE)
    {
		dailyChallengeInit();
	}
	else if ($('#preset').val() == PRESET_RANDOM_CHALLENGE)
    {
		randomChallengeInit();
	}
});

function updatePreset(val)
{
	var preset = val instanceof Number ? val : +$('#preset').val();
	if (preset > 0) $('.presetoption').prop('checked', false);

	if (preset == 0) return;

	switch(preset)
	{
		case 1: //overworld easy
			preset_overworld_easy();
			break;
		case 2: //overworld normal
			preset_overworld_normal();
			break;
		case 3: //overworld hard
			preset_overworld_hard();
			break;
		case 4: //all easy
			preset_all_easy();
			break;
		case 5: //all normal
			preset_all_normal();
			break;
		case 6: //all hard
			preset_all_hard();
			break;
		case 7: //underworld easy
			preset_underworld_easy();
			break;
		case 8: //underworld normal
			preset_underworld_normal();
			break;
		case 9: //underworld hard
			preset_underworld_hard();
			break;
		case 10: //daily challenge
			preset_daily_challenge();
			break;
		case 11: //random challenge
			preset_random_challenge();
			break;
		default:
			preset_overworld_normal();
			break;
	}

	updateAllSelectionTooltips();
	updateSelectedLocationsCount();
}

//--------- OVERWORLD LOCATIONS PRESETS
function preset_overworld_easy() //easy
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', true);
	$('#randomize_locations_townsvirtue').prop('checked', true);
	$('#randomize_locations_townsnonvirtue').prop('checked', true);
	$('#randomize_locations_castles').prop('checked', false);
	$('#randomize_locations_dialog').prop('checked', true);
	$('#randomize_locations_treasuremap').prop('checked', false);
	$('#randomize_locations_caves').prop('checked', false);
	$('#randomize_locations_tombs').prop('checked', false);
	$('#randomize_locations_dungeons').prop('checked', false);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', false);
	$('#randomize_locations_joinablepartymembers').prop('checked', false);
	
	$('#randomize_moonorb').prop('checked', false);
	$('#randomize_spellbook').prop('checked', false);
	$('#randomize_unlockanddispel').prop('checked', false);
	$('#add_sherry_item').prop('checked', true);
	
	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#randomize_enemy_mix').prop('checked', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 1);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', false);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 2);
	$('#select-ai-health-difficulty').prop('value', 2);
	$('#select-ai-damage-difficulty').prop('value', 2);
	$('#select-ai-spell-difficulty').prop('value', 1);
	$('#select-ai-spells').prop('value', 0);
	$('#select-ai-equipment').prop('value', 0);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', false);
	$('#randomize_moonorb_destinations').prop('checked', false);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', true);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 4);
	$('#select-starting-gold').prop('value', 4);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 1);
	$('#select-item-difficulty').prop('value', 0);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 1);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_overworld_normal() //normal
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', true);
	$('#randomize_locations_townsvirtue').prop('checked', true);
	$('#randomize_locations_townsnonvirtue').prop('checked', true);
	$('#randomize_locations_castles').prop('checked', false);
	$('#randomize_locations_dialog').prop('checked', true);
	$('#randomize_locations_treasuremap').prop('checked', false);
	$('#randomize_locations_caves').prop('checked', false);
	$('#randomize_locations_tombs').prop('checked', false);
	$('#randomize_locations_dungeons').prop('checked', false);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', true);
	$('#randomize_locations_joinablepartymembers').prop('checked', true);

	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', false);
	$('#randomize_unlockanddispel').prop('checked', true);
	$('#add_sherry_item').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#randomize_enemy_mix').prop('checked', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 1);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-health-difficulty').prop('value', 0);
	$('#select-ai-damage-difficulty').prop('value', 0);
	$('#select-ai-spell-difficulty').prop('value', 0);
	$('#select-ai-spells').prop('value', 1);
	$('#select-ai-equipment').prop('value', 1);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', true);
	$('#randomize_moonorb_destinations').prop('checked', false);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', false);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 3);
	$('#select-starting-gold').prop('value', 4);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 0);
	$('#select-item-difficulty').prop('value', 0);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 0);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_overworld_hard() //hard
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', true);
	$('#randomize_locations_townsvirtue').prop('checked', true);
	$('#randomize_locations_townsnonvirtue').prop('checked', true);
	$('#randomize_locations_castles').prop('checked', true);
	$('#randomize_locations_dialog').prop('checked', true);
	$('#randomize_locations_treasuremap').prop('checked', false);
	$('#randomize_locations_caves').prop('checked', false);
	$('#randomize_locations_tombs').prop('checked', true);
	$('#randomize_locations_dungeons').prop('checked', false);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', true);
	$('#randomize_locations_joinablepartymembers').prop('checked', true);

	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', true);
	$('#randomize_unlockanddispel').prop('checked', true);
	$('#add_sherry_item').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_people').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#randomize_enemy_mix').prop('checked', true);

	$('#select-ai-spawn-numbers').prop('value', 1);
	$('#select-ai-aggression').prop('value', 2);
	
	$('#enemy_stats_shuffle').prop('checked', true);
	$('#enemy_spellcasters_shuffle').prop('checked', true);
	$('#enemy_equipmentusers_shuffle').prop('checked', true);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-health-difficulty').prop('value', 4);
	$('#select-ai-damage-difficulty').prop('value', 3);
	$('#select-ai-spell-difficulty').prop('value', 2);
	$('#select-ai-spells').prop('value', 2);
	$('#select-ai-equipment').prop('value', 2);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', true);
	$('#randomize_moonorb_destinations').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', false);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 1);
	$('#select-starting-gold').prop('value', 1);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 2);
	$('#select-item-difficulty').prop('value', 2);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 2);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

//--------- ALL LOCATIONS PRESETS
function preset_all_easy() //easy
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', true);
	$('#randomize_locations_townsvirtue').prop('checked', true);
	$('#randomize_locations_townsnonvirtue').prop('checked', true);
	$('#randomize_locations_castles').prop('checked', true);
	$('#randomize_locations_dialog').prop('checked', true);
	$('#randomize_locations_treasuremap').prop('checked', true);
	$('#randomize_locations_caves').prop('checked', true);
	$('#randomize_locations_tombs').prop('checked', true);
	$('#randomize_locations_dungeons').prop('checked', true);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', true);
	$('#randomize_locations_joinablepartymembers').prop('checked', true);

	$('#randomize_moonorb').prop('checked', false);
	$('#randomize_spellbook').prop('checked', false);
	$('#randomize_unlockanddispel').prop('checked', false);
	$('#add_sherry_item').prop('checked', true);
	
	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#randomize_enemy_mix').prop('checked', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 1);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', false);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 2);
	$('#select-ai-health-difficulty').prop('value', 2);
	$('#select-ai-damage-difficulty').prop('value', 2);
	$('#select-ai-spell-difficulty').prop('value', 1);
	$('#select-ai-spells').prop('value', 0);
	$('#select-ai-equipment').prop('value', 0);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', false);
	$('#randomize_moonorb_destinations').prop('checked', false);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', true);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);	
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 4);
	$('#select-starting-gold').prop('value', 4);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 1);
	$('#select-item-difficulty').prop('value', 0);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 1);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_all_normal() //normal
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', true);
	$('#randomize_locations_townsvirtue').prop('checked', true);
	$('#randomize_locations_townsnonvirtue').prop('checked', true);
	$('#randomize_locations_castles').prop('checked', true);
	$('#randomize_locations_dialog').prop('checked', true);
	$('#randomize_locations_treasuremap').prop('checked', true);
	$('#randomize_locations_caves').prop('checked', true);
	$('#randomize_locations_tombs').prop('checked', true);
	$('#randomize_locations_dungeons').prop('checked', true);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', true);
	$('#randomize_locations_joinablepartymembers').prop('checked', true);

	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', false);
	$('#randomize_unlockanddispel').prop('checked', true);
	$('#add_sherry_item').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 1);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-health-difficulty').prop('value', 0);
	$('#select-ai-damage-difficulty').prop('value', 0);
	$('#select-ai-spell-difficulty').prop('value', 0);
	$('#select-ai-spells').prop('value', 1);
	$('#select-ai-equipment').prop('value', 1);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', true);
	$('#randomize_moonorb_destinations').prop('checked', false);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', false);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 3);
	$('#select-starting-gold').prop('value', 4);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 0);
	$('#select-item-difficulty').prop('value', 0);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 0);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);	
}

function preset_all_hard() //hard
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', true);
	$('#randomize_locations_townsvirtue').prop('checked', true);
	$('#randomize_locations_townsnonvirtue').prop('checked', true);
	$('#randomize_locations_castles').prop('checked', true);
	$('#randomize_locations_dialog').prop('checked', true);
	$('#randomize_locations_treasuremap').prop('checked', true);
	$('#randomize_locations_caves').prop('checked', true);
	$('#randomize_locations_tombs').prop('checked', true);
	$('#randomize_locations_dungeons').prop('checked', true);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', true);
	$('#randomize_locations_joinablepartymembers').prop('checked', true);

	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', true);
	$('#randomize_unlockanddispel').prop('checked', true);
	$('#add_sherry_item').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_people').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#randomize_enemy_mix').prop('checked', true);

	$('#select-ai-spawn-numbers').prop('value', 1);
	$('#select-ai-aggression').prop('value', 2);
	
	$('#enemy_stats_shuffle').prop('checked', true);
	$('#enemy_spellcasters_shuffle').prop('checked', true);
	$('#enemy_equipmentusers_shuffle').prop('checked', true);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-health-difficulty').prop('value', 4);
	$('#select-ai-damage-difficulty').prop('value', 3);
	$('#select-ai-spell-difficulty').prop('value', 2);
	$('#select-ai-spells').prop('value', 2);
	$('#select-ai-equipment').prop('value', 2);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', true);
	$('#randomize_moonorb_destinations').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', false);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 1);
	$('#select-starting-gold').prop('value', 1);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 2);
	$('#select-item-difficulty').prop('value', 2);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 2);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

//--------- UNDERWORLD LOCATIONS PRESETS
function preset_underworld_easy() //easy
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', false);
	$('#randomize_locations_townsvirtue').prop('checked', false);
	$('#randomize_locations_townsnonvirtue').prop('checked', false);
	$('#randomize_locations_castles').prop('checked', true);
	$('#randomize_locations_dialog').prop('checked', false);
	$('#randomize_locations_treasuremap').prop('checked', true);
	$('#randomize_locations_caves').prop('checked', true);
	$('#randomize_locations_tombs').prop('checked', true);
	$('#randomize_locations_dungeons').prop('checked', true);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', false);
	$('#randomize_locations_joinablepartymembers').prop('checked', false);

	$('#randomize_moonorb').prop('checked', false);
	$('#randomize_spellbook').prop('checked', false);
	$('#randomize_unlockanddispel').prop('checked', false);
	$('#add_sherry_item').prop('checked', true);
	
	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#randomize_enemy_mix').prop('checked', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 1);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', false);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 2);
	$('#select-ai-health-difficulty').prop('value', 2);
	$('#select-ai-damage-difficulty').prop('value', 2);
	$('#select-ai-spell-difficulty').prop('value', 1);
	$('#select-ai-spells').prop('value', 0);
	$('#select-ai-equipment').prop('value', 0);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', false);
	$('#randomize_moonorb_destinations').prop('checked', false);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', true);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 4);
	$('#select-starting-gold').prop('value', 4);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 1);
	$('#select-item-difficulty').prop('value', 0);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 1);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_underworld_normal() //normal
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', false);
	$('#randomize_locations_townsvirtue').prop('checked', false);
	$('#randomize_locations_townsnonvirtue').prop('checked', false);
	$('#randomize_locations_castles').prop('checked', true);
	$('#randomize_locations_dialog').prop('checked', false);
	$('#randomize_locations_treasuremap').prop('checked', true);
	$('#randomize_locations_caves').prop('checked', true);
	$('#randomize_locations_tombs').prop('checked', true);
	$('#randomize_locations_dungeons').prop('checked', true);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', false);
	$('#randomize_locations_joinablepartymembers').prop('checked', false);

	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', false);
	$('#randomize_unlockanddispel').prop('checked', true);
	$('#add_sherry_item').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);

	$('#select-ai-spawn-numbers').prop('value', 0);
	$('#select-ai-aggression').prop('value', 1);
	
	$('#enemy_stats_shuffle').prop('checked', false);
	$('#enemy_spellcasters_shuffle').prop('checked', false);
	$('#enemy_equipmentusers_shuffle').prop('checked', false);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-health-difficulty').prop('value', 0);
	$('#select-ai-damage-difficulty').prop('value', 0);
	$('#select-ai-spell-difficulty').prop('value', 0);
	$('#select-ai-spells').prop('value', 1);
	$('#select-ai-equipment').prop('value', 1);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', true);
	$('#randomize_moonorb_destinations').prop('checked', false);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', false);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 3);
	$('#select-starting-gold').prop('value', 4);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 0);
	$('#select-item-difficulty').prop('value', 0);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 0);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function preset_underworld_hard() //hard
{
	$('#randomize_locations_advanced').prop('checked', false);
	$('#randomize_locations_overworld').prop('checked', false);
	$('#randomize_locations_townsvirtue').prop('checked', false);
	$('#randomize_locations_townsnonvirtue').prop('checked', false);
	$('#randomize_locations_castles').prop('checked', true);
	$('#randomize_locations_dialog').prop('checked', false);
	$('#randomize_locations_treasuremap').prop('checked', true);
	$('#randomize_locations_caves').prop('checked', true);
	$('#randomize_locations_tombs').prop('checked', true);
	$('#randomize_locations_dungeons').prop('checked', true);
	$('#randomize_locations_shrines').prop('checked', true);
	$('#randomize_locations_gargoylecity').prop('checked', false);
	$('#randomize_locations_joinablepartymembers').prop('checked', false);

	$('#randomize_moonorb').prop('checked', true);
	$('#randomize_spellbook').prop('checked', true);
	$('#randomize_unlockanddispel').prop('checked', true);
	$('#add_sherry_item').prop('checked', true);

	$('#randomize_moonorb').prop('disabled', false);
	$('#randomize_spellbook').prop('disabled', false);
	$('#randomize_unlockanddispel').prop('disabled', false);
	$('#add_sherry_item').prop('disabled', false);

	$('#randomize_enemy_monsters').prop('checked', true);
	$('#randomize_enemy_wild').prop('checked', true);
	$('#randomize_enemy_animals').prop('checked', true);
	$('#randomize_enemy_people').prop('checked', true);
	$('#randomize_enemy_mix').prop('disabled', false);
	$('#randomize_enemy_mix').prop('checked', true);

	$('#select-ai-spawn-numbers').prop('value', 1);
	$('#select-ai-aggression').prop('value', 2);
	
	$('#enemy_stats_shuffle').prop('checked', true);
	$('#enemy_spellcasters_shuffle').prop('checked', true);
	$('#enemy_equipmentusers_shuffle').prop('checked', true);
	$('#enemy_droppossessors_shuffle').prop('checked', true);
	$('#randomize_enemy_drops').prop('checked', true);

	$('#select-ai-stat-difficulty').prop('value', 0);
	$('#select-ai-health-difficulty').prop('value', 4);
	$('#select-ai-damage-difficulty').prop('value', 3);
	$('#select-ai-spell-difficulty').prop('value', 2);
	$('#select-ai-spells').prop('value', 2);
	$('#select-ai-equipment').prop('value', 2);
	$('#add_missing_enemies').prop('checked', true);

	$('#randomize_player_start').prop('checked', true);
	$('#randomize_moonorb_destinations').prop('checked', true);
	$('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
	$('#open_avatar_shrine').prop('checked', false);
	$('#skip_intro_cinematic').prop('checked', true);

	$('#select-junk-items').prop('value', 1);
	$('#select-starting-party').prop('value', 3);
	$('#select-starting-inventory').prop('value', 1);
	$('#select-starting-gold').prop('value', 1);
	$('#select-day-night-cycle').prop('value', 1);
	$('#select-karma-difficulty').prop('value', 2);
	$('#select-item-difficulty').prop('value', 2);
	$('#select-spell-level').prop('value', 0);
	$('#select-spiritshrine').prop('value', 1);
	$('#select-placedrafts').prop('value', 2);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

//--------- DAILY CHALLENGE PRESET
function preset_daily_challenge()
{
	dailyChallengeInit();
}

//--------- RANDOM CHALLENGE PRESET
function preset_random_challenge()
{
	randomChallengeInit();
}

//--------- OTHER

$('#preset').change(updatePreset);

// selecting any option by hand should set the preset box to "custom"
$('.presetoption').click(function()
{
	$('#preset').val(0);
});

var PRESET_NAMES =
[
	"Custom",
	"Overworld-Easy",
	"Overworld-Normal",
	"Overworld-Hard",
	"All-Easy",
	"All-Normal",
	"All-Hard",
	"Underworld-Easy",
	"Underworld-Normal",
	"Underworld-Hard",
	"Daily Challenge",
	"Random Challenge",
	"Patched Base Game",
];

function getPresetName(n)
{
	if (n === undefined) n = $('#preset').val();
	return PRESET_NAMES[n] || PRESET_NAMES[0];
}

var RANDOMIZER_SETTINGS = [];
$('.presetoption').each(function(){ RANDOMIZER_SETTINGS.push(this); });

function getRandomizerSettings()
{
	var bitset = $.map(RANDOMIZER_SETTINGS, function(x){ return $(x).is(':checked') });
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

var RANDOMIZER_SETTING_SELECTS = [];
$('.presetselect').each(function(){ RANDOMIZER_SETTING_SELECTS.push(this); });

function getRandomizerSettingsSelects()
{
	var settingsText = "";
	for (var i = 0; i < RANDOMIZER_SETTING_SELECTS.length; ++i)
	{
		settingsText = settingsText.concat(RANDOMIZER_SETTING_SELECTS[i].value);
	}
	return settingsText;
}

function setRandomizerSettingsSelects(set)
{
	for (var i = 0; i < RANDOMIZER_SETTING_SELECTS.length; ++i)
	{
		var x = set[i];
		$(RANDOMIZER_SETTING_SELECTS[i]).prop('value', x);
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
