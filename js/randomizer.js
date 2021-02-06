var VERSION_STRING = 'v0.5c';

const SUBSYSTEM_ITEMS = 0;
const SUBSYSTEM_SPAWNERS = 1;
const SUBSYSTEM_SPAWNERS_MIX = 2;
const SUBSYSTEM_AGGRESSION = 3;
const SUBSYSTEM_WORLD = 4;
const SUBSYSTEM_CREDITS = 5;
const SUBSYSTEM_HINTS = 6;
const SUBSYSTEM_NEW_ENEMIES = 7; 
const SUBSYSTEM_SPAWN_NUMBERS = 8;
const SUBSYSTEM_MONSTER_DATA_STATS = 9;
const SUBSYSTEM_MONSTER_DATA_SPELLS = 10;
const SUBSYSTEM_MONSTER_DATA_DROPS = 11;
const SUBSYSTEM_MONSTER_DATA_EQUIPMENT = 12;
const SUBSYSTEM_PLAYER_INVENTORY = 13;

function randomizeROM(buffer, seed)
{
	var rom = new Uint8Array(buffer);
	var ext = '.sfc';
	if (rom.length == 0x80200)
	{
		console.log('headered rom?');
		rom = rom.subarray(0x200);
		ext = '.smc';
	}

	var crc32rom = crc32(rom);
	if (crc32rom != BASE_CHECKSUM)
	{
		var errorText = 'Base rom is not valid. Expected checksum ' + BASE_CHECKSUM.toPrintHex(8) + " and we got " + crc32rom.toPrintHex(8);
		$('#modal-error-win #modal-error-list').text("");
		$('#modal-error-win #modal-error-list').append($('<li>').text(errorText));
		$('#modal-error-win').modal('show');
		$('#original-rom-result').toggleClass('glyphicon-remove', true);
		$('#generate-randomized-rom').prop('disabled', true);

		throw new Error(errorText);
	}

	var random = new Random(seed);
	var vseed = random.seed.toHex(8);
	var subSystemSeeds = getSubystemSeeds(seed);

	//---------prepare for randomization
	var randomizedOptionsSelected = false;
	var itemsRandomized = false;

	//---------gameplay and other
	if ($('#expanded_camping').is(':checked'))
	{
		adjustCamping(rom);
	}
	
	if ($('#select-day-night-cycle').val() == 1)
	{
		adjustDayLength(rom, 2);
	}
	else if ($('#select-day-night-cycle').val() == 2)
	{
		adjustDayLength(rom, 3);
	}
	else if ($('#select-day-night-cycle').val() == 3)
	{
		adjustDayLength(rom, 1);
	}

	if ($('#select-karma-difficulty').val() == 1)
	{
		easyKarmaMode(rom);
	}
	else if ($('#select-karma-difficulty').val() == 2)
	{
		hardKarmaMode(rom);
	}
	
	if ($('#select-starting-inventory').val() == 1)
	{
		setStartingInventory(rom, subSystemSeeds[SUBSYSTEM_PLAYER_INVENTORY], 1); //no inventory
	}
	else if ($('#select-starting-inventory').val() == 6)
	{
		setStartingInventoryChaotic(rom, subSystemSeeds[SUBSYSTEM_PLAYER_INVENTORY]); //random chaotic inventory
	}
	else if ($('#select-starting-inventory').val() > 1)
	{
		setStartingInventory(rom, subSystemSeeds[SUBSYSTEM_PLAYER_INVENTORY], $('#select-starting-inventory').val()); //random inventory
	}

	if ($('#select-starting-gold').val() == 1)
	{
		setStartingGold(rom, 1, subSystemSeeds[SUBSYSTEM_PLAYER_INVENTORY]); //no gold
	}
	else if ($('#select-starting-gold').val() == 2)
	{
		setStartingGold(rom, 2, subSystemSeeds[SUBSYSTEM_PLAYER_INVENTORY]); //2x gold
	}
	else if ($('#select-starting-gold').val() == 3)
	{
		setStartingGold(rom, 3, subSystemSeeds[SUBSYSTEM_PLAYER_INVENTORY]); //4x gold
	}
	else if ($('#select-starting-gold').val() == 4)
	{
		setStartingGold(rom, 4, subSystemSeeds[SUBSYSTEM_PLAYER_INVENTORY]); //random gold
	}

	if ($('#select-placedrafts').val() == 1)
	{
		addRafts(rom);
	}
	else if ($('#select-placedrafts').val() == 2)
	{
		removeRafts(rom);
	}

	var addEnemiesFlag = false;
	if ($('#add_missing_enemies').is(':checked'))
	{
		addZuFlower(rom);
		addSilverSerpent(rom);
		addNewEnemySpawns(rom, subSystemSeeds[SUBSYSTEM_NEW_ENEMIES]);
		addEnemiesFlag = true;
	}
	
	if ($('#add_missing_ai_spells').is(':checked'))
	{
		fixAISpellListBug(rom);
		fixSpiders(rom);
	}

	if ($('#enable_fast_button_mapping').is(':checked'))
	{
		fastActionButtonBinding(rom);
	}

	//---------items
	if ($('#remove_moonorb').is(':checked'))
	{
		replaceMoonOrb(rom);
	}
	if ($('#remove_moonorb').is(':checked') || $('#randomize_moonorb').is(':checked') || $('#randomize_spellbook').is(':checked'))
	{
		overrideMoongateShrineCheck(rom);
	}
	if ($('#randomize_core_items').is(':checked') || $('#randomize_chests_overworld').is(':checked') || $('#randomize_chests_dungeons').is(':checked')) 
	{
		randomizedOptionsSelected = true;
		itemsRandomized = true;
		fixPickupGraphics(rom);
		prepareLocations(rom);
		fixChests(rom);
		increaseSherryPickupWeight(rom);

		if ($('#display_hints').is(':checked'))
		{
			prepareHintText(rom, subSystemSeeds[SUBSYSTEM_HINTS]);
		}

		var spoilers = [];
		var randomizeItemsDone = false;
		do
		{
			randomizeItemsDone = randomizeItems(rom, subSystemSeeds[SUBSYSTEM_ITEMS], spoilers);	
		}
		while (randomizeItemsDone == false);
		
		fixShrines(rom); //after item randomization the shrines must be fixed for the new items
		updateShrineText(rom);
	}

	//---------monsters
	var monsterFlag = false;
	var wildFlag = false;
	var animalFlag = false;
	var peopleFlag = false;

	if ($('#randomize_enemy_monsters').is(':checked'))
		monsterFlag = true;

	if ($('#randomize_enemy_wild').is(':checked'))
		wildFlag = true;

	if ($('#randomize_enemy_animals').is(':checked'))
		animalFlag = true;

	if ($('#randomize_enemy_people').is(':checked'))
		peopleFlag = true;

	if(monsterFlag || wildFlag || animalFlag || peopleFlag)
	{
		randomizedOptionsSelected = true;
		if ($('#randomize_enemy_mix').is(':checked'))
		{
			randomizeEnemySpawnersMix(rom, subSystemSeeds[SUBSYSTEM_SPAWNERS_MIX], monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag);
		}
		else
		{
			randomizeEnemySpawners(rom, subSystemSeeds[SUBSYSTEM_SPAWNERS], monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag);
		}
	}

	if ($('#select-ai-aggression').val() == 1)
	{
		intuitiveEnemyAggression(rom, subSystemSeeds[SUBSYSTEM_AGGRESSION]);
	}
	else if ($('#select-ai-aggression').val() == 2)
	{
		randomizedOptionsSelected = true;
		shuffleEnemyAggression(rom, subSystemSeeds[SUBSYSTEM_AGGRESSION]);
	}
	else if ($('#select-ai-aggression').val() == 3)
	{
		passiveEnemyAggression(rom, subSystemSeeds[SUBSYSTEM_AGGRESSION]);
	}

	if ($('#select-ai-spawn-numbers').val() == 1)
	{
		shuffleSpawnNumbers(rom, subSystemSeeds[SUBSYSTEM_SPAWN_NUMBERS]);
	}
	else if ($('#select-ai-spawn-numbers').val() == 2)
	{
		randomSpawnNumbers(rom, subSystemSeeds[SUBSYSTEM_SPAWN_NUMBERS]);
	}

	if ($('#enemy_stats_shuffle').is(':checked'))
	{
		randomizedOptionsSelected = true;
		if ($('#select-ai-stat-difficulty').val() == 1) //easier stats
		{
			shuffleEnemyStats(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_STATS], 1);
		}
		else if ($('#select-ai-stat-difficulty').val() == 2) //easy stats
		{
			shuffleEnemyStats(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_STATS], 2);
		}
		else if ($('#select-ai-stat-difficulty').val() == 3) //hard stats
		{
			shuffleEnemyStats(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_STATS], 3);
		}
		else if ($('#select-ai-stat-difficulty').val() == 4) //harder stats
		{
			shuffleEnemyStats(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_STATS], 4);
		}
		else //default stats
		{
			shuffleEnemyStats(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_STATS], 0);
		}
	}
	else
	{
		if ($('#select-ai-stat-difficulty').val() == 1) //easier
		{
			changeEnemyStatDifficulty(rom, 1);
		}
		else if ($('#select-ai-stat-difficulty').val() == 2) //easy
		{
			changeEnemyStatDifficulty(rom, 2);
		}
		else if ($('#select-ai-stat-difficulty').val() == 3) //hard
		{
			changeEnemyStatDifficulty(rom, 3);
		}
		else if ($('#select-ai-stat-difficulty').val() == 4) //harder
		{
			changeEnemyStatDifficulty(rom, 4);
		}
	}

	if ($('#enemy_spellcasters_shuffle').is(':checked'))
	{
		if($('#maintain_believable_ai').is(':checked'))
		{
			shuffleEnemySpellCastersBelievable(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_SPELLS]);
		}
		else
		{
			randomizedOptionsSelected = true;
			shuffleEnemySpellCasters(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_SPELLS]);
		}
	}

	if ($('#enemy_equipmentusers_shuffle').is(':checked'))
	{
		if($('#maintain_believable_ai').is(':checked'))
		{
			shuffleEnemyEquipmentUsersBelievable(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_EQUIPMENT]);
		}
		else
		{
			randomizedOptionsSelected = true;
			shuffleEnemyEquipmentUsers(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_EQUIPMENT]);
		}
	}

	if ($('#enemy_droppossessors_shuffle').is(':checked'))
	{
		if($('#maintain_believable_ai').is(':checked'))
		{
			shuffleEnemyDropPossessorsBelievable(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_DROPS]);
		}
		else
		{
			randomizedOptionsSelected = true;
			shuffleEnemyDropPossessors(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_DROPS]);
		}
	}

	if ($('#select-ai-equipment').val() == 1)
	{
		shuffleEnemyEquipment(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_EQUIPMENT]);
	}
	else if ($('#select-ai-equipment').val() == 2)
	{
		randomizeEnemyEquipment(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_EQUIPMENT]);
	}

	if ($('#randomize_enemy_drops').is(':checked'))
	{
		if($('#maintain_believable_ai').is(':checked'))
		{
			randomizeEnemyDropsBelievable(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_DROPS]);
		}
		else
		{
			randomizedOptionsSelected = true;
			randomizeEnemyDrops(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_DROPS]);
		}
	}

	var spellDifficultySetting = 0;
	if ($('#select-ai-spell-difficulty').val() == 1)
	{
		spellDifficultySetting = 1;
	}
	else if ($('#select-ai-spell-difficulty').val() == 2)
	{
		spellDifficultySetting = 2;
	}

	if ($('#select-ai-spells').val() == 1)
	{
		randomizedOptionsSelected = true;
		shuffleEnemySpells(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_SPELLS], spellDifficultySetting);
	}
	else if ($('#select-ai-spells').val() == 2)
	{
		randomizedOptionsSelected = true;
		randomizeEnemySpells(rom, subSystemSeeds[SUBSYSTEM_MONSTER_DATA_SPELLS], spellDifficultySetting);
	}

	if ($('#select-spiritshrine').val() > 0 )
	{
		addSpiritShrineWarpMountainIsland(rom, subSystemSeeds[SUBSYSTEM_WORLD], $('#select-spiritshrine').val());
	}

	//---------world
	if ($('#randomize_world_map').is(':checked'))
	{
		randomizeWorld(rom, subSystemSeeds[SUBSYSTEM_WORLD]);
	}

	//---------randomizer book
	if(randomizedOptionsSelected == true )
	{
		bookLordBritishRandomizerBook(rom);
	}

	//---------wrap it up
	var preset = +$('#preset').val();
	if (!preset) preset = 'x' + getRandomizerSettings();

	// validate the rom before we spit it out
	//var errors = validateROM(rom);
	var errors = [];

	// write version number and the randomizer seed to the rom
	var checksum = getChecksum(rom).toHex(4);

	if ($('#hide_seed_value').is(':checked'))
	{
		if(VERSION_STRING.length == 3)
		{
			writeTextToAddress(rom, TEXT_SEED_LOC, 16, VERSION_STRING + "-U6 RANDO:  ");
		}
		else
		{
			writeTextToAddress(rom, TEXT_SEED_LOC, 16, VERSION_STRING + "-U6 RANDO: ");
		}
	}
	else
	{
		if(VERSION_STRING.length == 3)
		{
			writeTextToAddress(rom, TEXT_SEED_LOC, 16, VERSION_STRING + "-"+vseed+":  ");
		}
		else
		{
			writeTextToAddress(rom, TEXT_SEED_LOC, 16, VERSION_STRING + "-"+vseed+": ");
		}
	}
	
	writeTextToAddress(rom, TEXT_SPEED_LOC, 21, " Fast -  Text  - Slow");

	writeTextToAddress(rom, TEXT_FLAGS_LOC, 21, "");
	writeSymbolHash(rom, random);

	//writeTextToAddress(rom, TEXT_FLAGS_LOC, 21, "Flags = " + preset);
	//if ($('#hide_seed_value').is(':checked'))
	//	writeSymbolHash(rom, random);
	
	writeCredits(rom, subSystemSeeds[SUBSYSTEM_CREDITS]);
	fixText(rom, itemsRandomized);

	//testLZW(rom);

	// fix the checksum (not necessary, but good to do!)
	fixChecksum(rom);

	return {
		// return the modified buffer
		buffer: buffer,
		type: ext || '.sfc',

		// all of the data needed to recreate (or validate) a ROM
		seed: vseed,
		checksum: checksum,
		preset: preset,

		// errors
		errors: errors,

		// spoilers
		spoilers: spoilers,
	};
}

function getSubystemSeeds(seed)
{
	var subSystemSeeds = [];
	var numSeeds = 20;
	for (var i = 0; i < numSeeds; ++i)
	{
		subSystemSeeds.push(new Random(seed+i));
	}
	return subSystemSeeds;
}

function addDataToDataPool(inPool, inData, grepValue)
{
	var grepPool = $.grep(inData, function(x){ return (grepValue in x); });
	var outPool = inPool.concat(grepPool);
	return outPool;
}

function checkIfInList(item, inList)
{
    for(var i = 0; i < inList.length; ++i)
    {
        if(item == inList[i])
        {
            return true;
        }
    }
}

function hexToHexArray(inHex)
{
    var hexArray = [];
    for(var i = inHex.length-1; i >= 0; i=i-2)
    {
        if(i > 0)
        {
            hexArray.push("0x"+(inHex[i-1]+inHex[i]));
        }
        else
        {
            hexArray.push("0x"+inHex[i]);
        }
    }

    return hexArray;
}

//=================================================================================
//=================================================================================
//=================================================================================


function bytesToLittleEndian(arr)
{
	for (var i = 0, x = 0; i < arr.length; ++i)
		x |= (arr[i] << (i*8));
	return x;
}

function littleEndianToBytes(x, k)
{
	var arr = [];
	for (var i = 0; i < k; ++i, x >>= 8)
		arr.push(x & 0xFF);
	return arr;
}

// assumes little-endian
function getPointer(off, len, rom)
{
	for (var i = 0, x = 0; i < len; ++i)
		x |= (rom[off+i] << (i*8));
	return x;
}

function getBigEndian(off, len, rom)
{
	for (var i = 0, x = 0; i < len; ++i)
		x = (x << 8) | rom[off+i];
	return x;
}

function snesAddressToOffset(addr)
{
	// bank (high byte) * 0x8000 + addr (low 2 bytes) - 0x8000
	return ((addr & 0xFF0000) >> 1) + (addr & 0x00FFFF) - 0x8000;
}

function offsetToSnesAddress(x)
{
	return ((x & 0xFF8000) << 1) + (x & 0xFFFF) + ((x & 0x8000) ? 0 : 0x8000);
}

function validateROM(stages, rom)
{
	var errors = [];
	var reachable = new Array(0x200);
/*
	for (var i = 0; i < stages.length; ++i)
	{
		var stage = stages[i];

		// skip warp entries
		var copyfrom = stage.copyfrom ? stage.copyfrom : stage;
		if (copyfrom && copyfrom.warp) continue;

		var location = copyfrom.name + '(@' + stage.name + ')';

		var exitinfo = checkExits(stage, rom);
		if (stage.castle !== 8 && exitinfo.count != stage.exits)
			errors.push(location + ' has ' + exitinfo.count + ' exit(s) (' + stage.exits + ' expected)');
		if (exitinfo.types == SECRET_EXIT)
			errors.push(location + ' has only secret exit ???');

		var stage = stages[i], sub = getRelatedSublevels(stage.id, rom);
		for (var j = 0; j < sub.length; ++j)
		{
			if (isSublevelFree(sub[j], rom))
				errors.push('Sublevel ' + sub[j].toPrintHex(3) + ' of ' + location + ' is empty');

			var meta = getSublevelData(sub[j], rom);

			var exits = parseExits(sub[j], rom);
			for (var k = 0; k < exits.length; ++k)
			{
				var dest = exits[k].sublevel;
				if (dest & 0xFF == 0) errors.push('Exit in ' + sub[j].toPrintHex(3) + ' of ' + location + ' is ' + dest.toPrintHex(3));
			}

			if (!reachable[sub[j]])
				reachable[sub[j]] = [];
			reachable[sub[j]].push(location);
		}
	}

	if (DEEPVALIDATION)
	{
		var spritemap = {}, spritedata = {};
		for (var i = 0; i < SPRITE_SETS.length; ++i)
		{
			var set = [];
			for (var k in SPRITE_SETS[i])
			{
				spritemap[+k] = set;
				set.push(spritedata[+k] = SPRITE_SETS[i][k])
				SPRITE_SETS[i][k].id = +k;
			}
		}

		for (var id = 0; id < 0x200; ++id)
		{
			var mode = getLevelMode(id, rom);
			var sprites = getSprites(id, rom);
			var meta = getSublevelData(id, rom);

			for (var i = 0; i < sprites.sprites.length; ++i)
			{
				var sprite = spritedata[sprites.sprites[i].id];
				if (!sprite) continue;

				if (mode.boss && [0x33].contains(sprite.id)) continue;
				$(['sp3', 'sp4']).each(function(_,x)
				{
					if (sprite[x] && !sprite[x].contains(meta[x]))
						errors.push('Sublevel ' + id.toPrintHex(3) + ' has wrong ' + x +
							' setting for sprite ' + sprite.id.toPrintHex(2) + ': ' + meta[x].toPrintHex(1));
				});
			}
		}
	}

	for (var i = 0; i < 0x200; ++i) if (reachable[i] && reachable[i].length > 1)
		errors.push('Sublevel ' + i.toPrintHex(3) + ' reachable from ' + reachable[i].length + ' stages: ' + reachable[i].join(', '));

	*/
	return errors;
}

function expandROM(rom)
{
	// upgrade to next rom size
	var size = rom[0x7FD7] += 1;
	var newrom = new Uint8Array(0x400 * (1 << size));

	newrom.set(rom, 0);
	return newrom;
}

function getChecksum(rom)
{
	var checksum = 0;
	for (var i = 0; i < rom.length; ++i)
	{
		checksum += rom[i];
		checksum &= 0xFFFF;
	}
	return checksum;
}

function fixChecksum(rom)
{
	var checksum = getChecksum(rom);

	// checksum
	rom.writeBytes(2, 0x7FDE, checksum);
	rom.writeBytes(2, 0x7FDC, checksum ^ 0xFFFF);
}
