function dailyChallengeInit()
{
    var dailySeed = getDailyChallengeSeed();
    updateDailyChallengeSettings(dailySeed);
}

function getDailyChallengeSeed()
{
    var dailySeed = parseInt($('#custom-seed').val(), 10); //if nothing is input this will return as NaN - this is expected
    var currentDaySeed = getCurrentDateAsString();

    if(isNaN(dailySeed))
    {
        //the values was NaN, so use the current date
        var random = new Random(currentDaySeed*currentDaySeed);
        var currentDaySeedValue = currentDaySeed * random.next();
        dailySeed = currentDaySeedValue;
    }
    else
    {
        if(dailySeed > currentDaySeed)
        {
            //the value was greater than the current date, so use the current date
            var random = new Random(currentDaySeed*currentDaySeed);
            var currentDaySeedValue = currentDaySeed * random.next();
            dailySeed = currentDaySeedValue;
        }
        else
        {
            //use the set custom date
            var random = new Random(dailySeed*dailySeed);
            var customSeedValue = dailySeed *random.next();
            dailySeed = customSeedValue;
        }
    }

    return dailySeed;
}

function updateDailyChallengeSettings(dailySeed)
{
    if ($('#preset').val() == PRESET_DAILY_CHALLENGE)
    {
        setRandomChallengeSettings(dailySeed);
        getReadableDateAsString();
    }
}

function randomChallengeInit()
{
    if ($('#preset').val() == PRESET_RANDOM_CHALLENGE)
    {
        var randomSeed = getSeedForGenerator();
        setRandomChallengeSettings(randomSeed);
    }
}

function getCurrentDateAsString()
{
    var date = new Date();
    var year = "" + date.getFullYear();
    var month = "" + (date.getMonth() + 1);
    var day = "" + date.getDate();

    if(month.length==1){month = "0"+month;}
    if(day.length==1){day = "0"+day;}

    return year + month + day;
}

function getReadableDateAsString()
{
    var dateSeed = parseInt($('#custom-seed').val(), 10);
    var currentDaySeed = getCurrentDateAsString();

    if(isNaN(dateSeed))
    {
        return getReadableTodayDateAsString();
    }

    if(dateSeed <= currentDaySeed)
    {
        return getReadablePreviousDateAsString(dateSeed);
    }

    return getReadableTodayDateAsString();
}

function getReadableTodayDateAsString()
{
    //get today's date
    var date = new Date();
    var year = "" + date.getFullYear();
    var month = "" + (date.getMonth() + 1);
    var day = "" + date.getDate();

    if(month.length==1){month = "0"+month;}
    if(day.length==1){day = "0"+day;}

    var weekDayName = getDayOfTheWeekName(date.getDay());
    var monthName = getMonthName(date.getMonth());

    var fullDateString = year + "-" + monthName + "-" + day + " " + weekDayName;
    return fullDateString;
}

function getReadablePreviousDateAsString(dateSeed)
{
    //get custom seed date
    var dateSeedString = "" + dateSeed;
    var year = dateSeedString.slice(0,4);
    var month = dateSeedString.slice(4,6);
    var day = dateSeedString.slice(6,8);

    var date = new Date(year,month-1,day);
    var weekDayName = getDayOfTheWeekName(date.getDay());
    var monthName = getMonthName(date.getMonth());

    var fullDateString = year + "-" + monthName + "-" + day + " " + weekDayName;
    return fullDateString;
}

function getDayOfTheWeekName(inWeekDay)
{
    switch(inWeekDay)
    {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return "Unknown";
    }
}

function getMonthName(inMonth)
{
    switch(inMonth)
    {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "Unknown";
    }
}

function getRandomTrueFalse(random, inChance)
{
	if(random.flipCoin(inChance)){return true;}
    return false;
}


//=========================== RANDOMIZED SETTINGS
function setRandomChallengeSettings(dailySeed)
{
    var random = new Random(dailySeed);
    var dataObject = {random:random};
    //var day = 0; - TODO: get day of the week to determine weights

    getRandomPartyMembersSetting(dataObject);

    getRandomMoonOrbShuffleSetting(dataObject);
    getRandomSpellbookShuffleSetting(dataObject);
    getRandomSherryItemSetting(dataObject);
    getRandomItemShuffleSettings(dataObject);

    getRandomProgressionSpellsShuffleSetting(dataObject);
    getRandomEnemyMonstersSetting(dataObject);
    getRandomEnemyWildSetting(dataObject);
    getRandomEnemyAnimalsSetting(dataObject);
    getRandomEnemyPeopleSetting(dataObject);
    getRandomEnemyMixSetting(dataObject);
    getRandomSpawnNumberSetting(dataObject);
	getRandomAggressionSetting(dataObject);
    getEnemyStatShuffleSetting(dataObject);
    getEnemySpellcastersShuffleSetting(dataObject);
    getEnemyEquipmentUsersShuffleSetting(dataObject);
    getEnemyDropPossessorsShuffleSetting(dataObject);
    getRandomEnemyDropsSetting(dataObject);
    getRandomAIStatDifficultySetting(dataObject);
    getRandomAIHealthDifficultySetting(dataObject);
    getRandomAIDamageDifficultySetting(dataObject);
    getRandomAISpellDifficultySetting(dataObject);
    getRandomAISpellsSetting(dataObject);
    getRandomAIEquipmentSetting(dataObject);
    getRandomBelievableAISetting(dataObject);

    $('#add_missing_enemies').prop('checked', true);
	$('#add_missing_ai_spells').prop('checked', true);
    $('#remove_moonorb').prop('checked', false);
	$('#expanded_camping').prop('checked', true);
	$('#enable_fast_button_mapping').prop('checked', true);
	$('#enable_expanded_armor_items').prop('checked', true);
	$('#randomize_moon_phases').prop('checked', true);
    $('#skip_intro_cinematic').prop('checked', true);
	
    getRandomPlayerStartSetting(dataObject);
    getRandomMoonOrbDestiantionsSetting(dataObject);
    getRandomOpenAvatarShrineSetting(dataObject);
    getRandomJunkItemsSetting(dataObject);
    getRandomStartinInventorySetting(dataObject);
    getRandomStartingGoldSetting(dataObject);
    getRandomDayNightCycleSetting(dataObject);
    getRandomKarmaDifficultySetting(dataObject);
    getRandomItemDifficultySetting(dataObject);
    getRandomSpiritShrineSetting(dataObject);
    getRandomPlacedRaftsSetting(dataObject);

	$('#display_spoiler_log').prop('checked', true);
	$('#display_hints').prop('disabled', false);
	$('#display_hints').prop('checked', true);
}

function getRandomItemShuffleSettings(dataObject)
{
    var neededCount = PROGRESSION_CORE.length;

    var checkedList = [];
    var options = [0,1,2,3,4,5,6,7,8,9,10,11];
    options.shuffle(dataObject.random);
    for(var i = 0; i < options.length; ++i)
    {
        checkedList.push(getRandomTrueFalse(dataObject.random, 0.6));
        setRandomLocationTypeSelection(options[i], checkedList[i]);
    }

    var currentCount = 0;
    var loopCount = 0;

    while(currentCount <= neededCount && loopCount < 10)
    {
        var selectedLocationTypes = getSelectedLocationTypesList();
	    var selectedLocations = buildSelectedLocationsList(selectedLocationTypes.selectedLocations);
        if ($('#select-starting-party').val() != 1)
    	{
		    selectedLocations = removePartyMemberLocations(selectedLocations, [DATA_PARTY_MEMBERS[1], DATA_PARTY_MEMBERS[2], DATA_PARTY_MEMBERS[3]]);
	    }
        var requiredProgressionItems = getSelectedProgressionItemsList();
        neededCount = requiredProgressionItems.length;
        currentCount = selectedLocations.length;
        if(currentCount <= neededCount)
        {
            for(var i = 0; i < options.length; ++i)
            {
                if(checkedList[i] == false)
                {
                    checkedList[i] = true;
                    setRandomLocationTypeSelection(options[i], checkedList[i]);
                    break;
                }
            }
        }
        loopCount += 1;
    }
}

function setRandomLocationTypeSelection(selection, value)
{
    switch(selection)
    {
        case 0:
            $('#randomize_locations_overworld').prop('checked', value);
        case 1:
	        $('#randomize_locations_townsvirtue').prop('checked', value);
        case 2:
	        $('#randomize_locations_townsnonvirtue').prop('checked', value);
        case 3:
	        $('#randomize_locations_castles').prop('checked', value);
        case 4:
            $('#randomize_locations_dialog').prop('checked', value);
        case 5:
	        $('#randomize_locations_treasuremap').prop('checked', value);
        case 6:
	        $('#randomize_locations_caves').prop('checked', value);
        case 7:
	        $('#randomize_locations_tombs').prop('checked', value);
        case 8:
	        $('#randomize_locations_dungeons').prop('checked', value);
        case 9:
	        $('#randomize_locations_shrines').prop('checked', value);
        case 10:
	        $('#randomize_locations_gargoylecity').prop('checked', value);
        case 11:
	        $('#randomize_locations_joinablepartymembers').prop('checked', value);
    }
}

function getRandomMoonOrbShuffleSetting(dataObject)
{
    $('#randomize_moonorb').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomSpellbookShuffleSetting(dataObject)
{
    $('#randomize_spellbook').prop('checked', getRandomTrueFalse(dataObject.random, 0.75));
}

function getRandomProgressionSpellsShuffleSetting(dataObject)
{
    $('#randomize_unlockanddispel').prop('checked', getRandomTrueFalse(dataObject.random, 0.75));
}

function getRandomSherryItemSetting(dataObject)
{
    $('#add_sherry_item').prop('checked', getRandomTrueFalse(dataObject.random, 0.75));
}

function getRandomEnemyMonstersSetting(dataObject)
{
    $('#randomize_enemy_monsters').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomEnemyWildSetting(dataObject)
{
    $('#randomize_enemy_wild').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomEnemyAnimalsSetting(dataObject)
{
    $('#randomize_enemy_animals').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomEnemyPeopleSetting(dataObject)
{
    $('#randomize_enemy_people').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomEnemyMixSetting(dataObject)
{
    var count = 0;
    if($('#randomize_enemy_monsters').is('checked')){count += 1;}
    if($('#randomize_enemy_wild').is('checked')){count += 1;}
    if($('#randomize_enemy_animals').is('checked')){count += 1;}
    if($('#randomize_enemy_people').is('checked')){count += 1;}

    if(count > 1)
    {
        $('#randomize_enemy_mix').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
    }
    else
    {
        $('#randomize_enemy_mix').prop('checked', false);
    }
}

function getRandomSpawnNumberSetting(dataObject)
{
    var choices = [
		{choice:0, weight:30},
		{choice:1, weight:20},
		{choice:2, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-spawn-numbers').prop('value', weightedChoice.choice);
}

function getRandomAggressionSetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:30},
		{choice:2, weight:20},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-aggression').prop('value', weightedChoice.choice);
}

function getEnemyStatShuffleSetting(dataObject)
{
    $('#enemy_stats_shuffle').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getEnemySpellcastersShuffleSetting(dataObject)
{
    $('#enemy_spellcasters_shuffle').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getEnemyEquipmentUsersShuffleSetting(dataObject)
{
    $('#enemy_equipmentusers_shuffle').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getEnemyDropPossessorsShuffleSetting(dataObject)
{
    $('#enemy_droppossessors_shuffle').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomEnemyDropsSetting(dataObject)
{
    $('#randomize_enemy_drops').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomAIStatDifficultySetting(dataObject)
{
    var choices = [
		{choice:0, weight:40},
		{choice:1, weight:10},
		{choice:2, weight:30},
        {choice:3, weight:30},
        {choice:4, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-stat-difficulty').prop('value', weightedChoice.choice);
}

function getRandomAIHealthDifficultySetting(dataObject)
{
    var choices = [
		{choice:0, weight:40},
		{choice:1, weight:10},
		{choice:2, weight:30},
        {choice:3, weight:30},
        {choice:4, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-health-difficulty').prop('value', weightedChoice.choice);
}

function getRandomAIDamageDifficultySetting(dataObject)
{
    var choices = [
		{choice:0, weight:40},
		{choice:1, weight:10},
		{choice:2, weight:30},
        {choice:3, weight:30},
        {choice:4, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-damage-difficulty').prop('value', weightedChoice.choice);
}

function getRandomAISpellDifficultySetting(dataObject)
{
    var choices = [
		{choice:0, weight:40},
		{choice:1, weight:10},
		{choice:2, weight:20},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-spell-difficulty').prop('value', weightedChoice.choice);
}

function getRandomAISpellsSetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:10},
		{choice:2, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-spells').prop('value', weightedChoice.choice);
}

function getRandomAIEquipmentSetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:10},
		{choice:2, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-ai-equipment').prop('value', weightedChoice.choice);
}

function getRandomBelievableAISetting(dataObject)
{
    $('#maintain_believable_ai').prop('value', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomOpenAvatarShrineSetting(dataObject)
{
    $('#open_avatar_shrine').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomPlayerStartSetting(dataObject)
{
    $('#randomize_player_start').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomMoonOrbDestiantionsSetting(dataObject)
{
    $('#randomize_moonorb_destinations').prop('checked', getRandomTrueFalse(dataObject.random, 0.5));
}

function getRandomPartyMembersSetting(dataObject)
{
    var choices = [
		{choice:1, weight:10},
		{choice:2, weight:10},
		{choice:3, weight:40},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-starting-party').prop('value', weightedChoice.choice);
}

function getRandomJunkItemsSetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:30},
		{choice:2, weight:20},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-junk-items').prop('value', weightedChoice.choice);
}

function getRandomStartinInventorySetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:10},
		{choice:2, weight:30},
        {choice:3, weight:30},
        {choice:4, weight:30},
        {choice:5, weight:30},
        {choice:6, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-starting-inventory').prop('value', weightedChoice.choice);
}

function getRandomStartingGoldSetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:30},
		{choice:2, weight:20},
        {choice:3, weight:10},
        {choice:4, weight:40},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-starting-gold').prop('value', weightedChoice.choice);
}

function getRandomDayNightCycleSetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:30},
		{choice:2, weight:10},
        {choice:3, weight:20},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-day-night-cycle').prop('value', weightedChoice.choice);
}

function getRandomKarmaDifficultySetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:30},
		{choice:2, weight:20},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-karma-difficulty').prop('value', weightedChoice.choice);
}

function getRandomItemDifficultySetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:30},
		{choice:2, weight:20},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-item-difficulty').prop('value', weightedChoice.choice);
}

function getRandomSpiritShrineSetting(dataObject)
{
    var choices = [
		{choice:1, weight:30},
		{choice:2, weight:10},
		{choice:3, weight:20},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-spiritshrine').prop('value', weightedChoice.choice);
}

function getRandomPlacedRaftsSetting(dataObject)
{
    var choices = [
		{choice:0, weight:10},
		{choice:1, weight:10},
		{choice:2, weight:10},
	];
    var weightedChoice = dataObject.random.fromWeighted(choices);
    $('#select-placedrafts').prop('value', weightedChoice.choice);
}