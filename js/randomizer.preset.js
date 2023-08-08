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
	if (preset > 0) $('.presetoption').prop('checked', false).triggerHandler("click");

	if (preset == 0) return;
	
	if (preset in PRESET_NAMES) {
		PRESET_NAMES[preset]["function"]();
		$('#preset').prop('value', preset);
	} else {
		preset_overworld_normal();
		$('#preset').prop('value', 2);
	}

	updateAllSelectionTooltips();
	updateSelectedLocationsCount();
}

//--------- OVERWORLD LOCATIONS PRESETS
function preset_overworld_easy() //easy
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', false).triggerHandler("click");
	
	$('#randomize_moonorb').prop('checked', false).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', false).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");
	
	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', false).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', false).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 1).triggerHandler("click");
	$('#select-ai-spells').prop('value', 0).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 0).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', false).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', true).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 4).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 1).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 1).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

function preset_overworld_normal() //normal
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', true).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', true).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', false).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spells').prop('value', 1).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 1).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', false).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 3).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 0).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

function preset_overworld_hard() //hard
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', true).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', true).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', true).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_people').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', true).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 1).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 2).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 4).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 3).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-spells').prop('value', 2).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 2).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', true).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', false).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 1).triggerHandler("click");
	$('#select-starting-gold').prop('value', 1).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 2).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

//--------- ALL LOCATIONS PRESETS
function preset_all_easy() //easy
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', false).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', false).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");
	
	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', false).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', false).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 1).triggerHandler("click");
	$('#select-ai-spells').prop('value', 0).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 0).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', false).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', true).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1);	
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 4).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 1).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 1).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

function preset_all_normal() //normal
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', true).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', true).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spells').prop('value', 1).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 1).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', false).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 3).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 0).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true);	
}

function preset_all_hard() //hard
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', true).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', true).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', true).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_people').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', true).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 1).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 2).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 4).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 3).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-spells').prop('value', 2).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 2).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', true).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', false).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 1).triggerHandler("click");
	$('#select-starting-gold').prop('value', 1).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 2).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

//--------- UNDERWORLD LOCATIONS PRESETS
function preset_underworld_easy() //easy
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', false).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', false).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', false).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");
	
	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', false).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', false).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 1).triggerHandler("click");
	$('#select-ai-spells').prop('value', 0).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 0).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', false).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', true).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 4).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 1).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 1).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

function preset_underworld_normal() //normal
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', false).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', true).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', true).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', false).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spells').prop('value', 1).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 1).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', false).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 3).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 0).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

function preset_underworld_hard() //hard
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', false).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', true).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', true).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', true).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_people').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', true).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 1).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 2).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 4).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 3).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-ai-spells').prop('value', 2).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 2).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', true).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', false).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");

	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-starting-party').prop('value', 3).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 1).triggerHandler("click");
	$('#select-starting-gold').prop('value', 1).triggerHandler("click");
	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-spell-level').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 2).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
}

function preset_some_caves() //some caves
{
	$('#randomize_locations_advanced').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles_britannia').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles_empathabbey').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles_lycaeum').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles_serpentshold').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles_stonegate').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_castles_sutekscastle').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves_antmound').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_sewers').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves_cyclopscave').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves_piratecave').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_spidercave').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves_swampcave').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_behlem').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_blaine').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_dupre').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_gorn').prop('checked', false).triggerHandler("click");
  	$('#randomize_locations_joinable_gwenno').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_iolo').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_jaana').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_julia').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_katrina').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_leodon').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_leonna').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_seggal').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_sentri').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_shamino').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', true).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', true).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', true).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('disabled', false).triggerHandler("click");
	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_people').prop('checked', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', true).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");
	$('#maintain_believable_ai').prop('checked', true).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spells').prop('value', 1).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 1).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 0).triggerHandler("click");
	$('#select-starting-party').prop('value', 1).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 4).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 1).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', true).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");

	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 2).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 1).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
	$('#hide_filename_spoiler').prop('checked', false).triggerHandler("click");
}

function preset_npc_shuffle_perarea() //simple npc shuffle
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_behlem').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_blaine').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_dupre').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_gorn').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_gwenno').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_iolo').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_jaana').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_julia').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_katrina').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_leodon').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_leonna').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_seggal').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_sentri').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_shamino').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', true).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', false).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_people').prop('checked', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', true).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");
	$('#maintain_believable_ai').prop('checked', false).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spells').prop('value', 1).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 1).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 2).triggerHandler("click");
	$('#select-starting-party').prop('value', 1).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 4).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 1).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', true).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', true).triggerHandler("click");
	$('#enable_add_potion_shop').prop('checked', true).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");

	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 1).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 1).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
	$('#hide_filename_spoiler').prop('checked', false).triggerHandler("click");
}

function preset_npc_shuffle_standard() //standard npc shuffle
{
	$('#randomize_locations_advanced').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_overworld').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_townsnonvirtue').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles_britannia').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles_empathabbey').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles_lycaeum').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles_serpentshold').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles_stonegate').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_castles_sutekscastle').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dialog').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_treasuremap').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_caves').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_antmound').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_sewers').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_cyclopscave').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_piratecave').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_spidercave').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_caves_swampcave').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_tombs').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_dungeons').prop('checked', false).triggerHandler("click");
	$('#randomize_locations_shrines').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_gargoylecity').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinablepartymembers').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_behlem').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_blaine').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_dupre').prop('checked', true).triggerHandler("click");
	$('#randomize_locations_joinable_gorn').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_gwenno').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_iolo').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_jaana').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_julia').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_katrina').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_leodon').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_leonna').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_seggal').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_sentri').prop('checked', true).triggerHandler("click");
  	$('#randomize_locations_joinable_shamino').prop('checked', true).triggerHandler("click");

	$('#randomize_moonorb').prop('checked', false).triggerHandler("click");
	$('#remove_moonorb').prop('checked', false).triggerHandler("click");
	$('#randomize_spellbook').prop('checked', true).triggerHandler("click");
	$('#randomize_unlockanddispel').prop('checked', false).triggerHandler("click");
	$('#add_sherry_item').prop('checked', true).triggerHandler("click");

	$('#randomize_spellbook').prop('disabled', false).triggerHandler("click");
	$('#add_sherry_item').prop('disabled', false).triggerHandler("click");

	$('#randomize_enemy_monsters').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_wild').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_animals').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_people').prop('checked', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('disabled', false).triggerHandler("click");
	$('#randomize_enemy_mix').prop('checked', true).triggerHandler("click");

	$('#select-ai-spawn-numbers').prop('value', 0).triggerHandler("click");
	$('#select-ai-aggression').prop('value', 1).triggerHandler("click");
	
	$('#enemy_stats_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_spellcasters_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_equipmentusers_shuffle').prop('checked', true).triggerHandler("click");
	$('#enemy_droppossessors_shuffle').prop('checked', true).triggerHandler("click");
	$('#randomize_enemy_drops').prop('checked', true).triggerHandler("click");
	$('#maintain_believable_ai').prop('checked', false).triggerHandler("click");
	$('#add_missing_enemies').prop('checked', true).triggerHandler("click");

	$('#select-ai-stat-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-health-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-damage-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spell-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-ai-spells').prop('value', 1).triggerHandler("click");
	$('#select-ai-equipment').prop('value', 1).triggerHandler("click");

	$('#select-npc-randomization').prop('value', 3).triggerHandler("click");
	$('#select-starting-party').prop('value', 1).triggerHandler("click");
	$('#select-starting-inventory').prop('value', 4).triggerHandler("click");
	$('#select-starting-gold').prop('value', 4).triggerHandler("click");
	$('#enable_expanded_armor_items').prop('checked', true).triggerHandler("click");
	$('#select-junk-items').prop('value', 1).triggerHandler("click");
	$('#select-item-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spell-level').prop('value', 1).triggerHandler("click");
	$('#randomize_player_start').prop('checked', true).triggerHandler("click");
	$('#randomize_moonorb_destinations').prop('checked', true).triggerHandler("click");
	$('#randomize_moon_phases').prop('checked', true).triggerHandler("click");
	$('#open_avatar_shrine').prop('checked', true).triggerHandler("click");
	$('#skip_intro_cinematic').prop('checked', true).triggerHandler("click");
	$('#select-playerclass-randomization').prop('value', 0).triggerHandler("click");
	$('#simplify_npc_schedules').prop('checked', false).triggerHandler("click");
	$('#enable_add_potion_shop').prop('checked', true).triggerHandler("click");
	$('#expanded_camping').prop('checked', true).triggerHandler("click");
	$('#enable_fast_button_mapping').prop('checked', true).triggerHandler("click");

	$('#select-day-night-cycle').prop('value', 1).triggerHandler("click");
	$('#select-karma-difficulty').prop('value', 0).triggerHandler("click");
	$('#select-spiritshrine').prop('value', 1).triggerHandler("click");
	$('#select-placedrafts').prop('value', 1).triggerHandler("click");

	$('#display_spoiler_log').prop('checked', true).triggerHandler("click");
	$('#display_hints').prop('disabled', false).triggerHandler("click");
	$('#display_hints').prop('checked', true).triggerHandler("click");
	$('#hide_filename_spoiler').prop('checked', false).triggerHandler("click");
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

//--------- PATCHED BASE GAME
function preset_patched_base_game()
{
}

//--------- OTHER

$('#preset').change(updatePreset);

// selecting any option by hand should set the preset box to "custom"
$('.presetoption').click(function()
{
	$('#preset').val(0);
});

var PRESET_NAMES =
{
	0: {
	"name": "Custom"
	},
	1: {
	"name": "Overworld-Easy",
	"function": preset_overworld_easy
	},
	2: {
	"name": "Overworld-Normal",
	"function": preset_overworld_normal
	},
	3: {
	"name": "Overworld-Hard",
	"function": preset_overworld_normal
	},
	4: {
	"name": "All-Easy",
	"function": preset_all_easy
	},
	5: {
	"name": "All-Normal",
	"function": preset_all_normal
	},
	6: {
	"name": "All-Hard",
	"function": preset_all_hard
	},
	7: {
	"name": "Underworld-Easy",
	"function": preset_underworld_easy
	},
	8: {
	"name": "Underworld-Normal",
	"function": preset_underworld_normal
	},
	9: {
	"name": "Underworld-Hard",
	"function": preset_underworld_hard
	},
	10: {
	"name": "Daily Challenge",
	"function": preset_daily_challenge
	},
	11: {
	"name": "Random Challenge",
	"function": preset_random_challenge
	},
	12: {
	"name": "Patched Base Game",
	"function": preset_patched_base_game
	},
	13: {
	"name": "Some Caves",
	"function": preset_some_caves
	},
	14: {
	"name": "NPC Shuffle-Per Area",
	"function": preset_npc_shuffle_perarea
	},
	15: {
	"name": "NPC Shuffle-Standard",
	"function": preset_npc_shuffle_standard
	}
};

function getPresetName(n)
{
	if (n === undefined) n = $('#preset').val();
	return PRESET_NAMES[n]["name"] || PRESET_NAMES[0];
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
		$(RANDOMIZER_SETTINGS[i]).prop('checked', x).triggerHandler("click");
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
		$(RANDOMIZER_SETTING_SELECTS[i]).prop('value', x).triggerHandler("click");
	}
}

function shuffleOptions()
{
	$('input:checkbox:enabled.presetoption').each(function()
	{ $(this).prop('checked', Math.random() > 0.5); }).triggerHandler("click");

	var radiogroups = {};
	$('input:radio:enabled.presetoption').each(function()
	{ radiogroups[$(this).attr('name')] = true; });

	for (var k in radiogroups)
	{
		var group = $('input:radio:enabled[name="' + k + '"]');
		var n = Math.floor(Math.random() * group.length);
		group.eq(n).prop('checked', true).triggerHandler("click");
	}
}
