var VERSION_STRING = 'v0.4';

const SUBSYSTEM_ITEMS = 0;
const SUBSYSTEM_SPAWNERS = 1;
const SUBSYSTEM_SPAWNERS_MIX = 2;
const SUBSYSTEM_AGGRESSION = 3;
const SUBSYSTEM_WORLD = 4;
const SUBSYSTEM_CREDITS = 5;
const SUBSYSTEM_HINTS = 6;
const SUBSYSTEM_NEW_ENEMIES = 7; 
const SUBSYSTEM_SPAWN_NUMBERS = 8; 

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

	//TODO : Ensure seed is affected by flags

	var random = new Random(seed);
	var vseed = random.seed.toHex(8);
	var subSystemSeeds = getSubystemSeeds(seed);

	//prepare for randomization
	fixPickupGraphics(rom);
	prepareLocations(rom);
	fixChests(rom);
	increaseSherryPickupWeight(rom);
	bookLordBritishRandomizerBook(rom);
	
	//adjustCamping(rom);

	if ($('#day_length_2x').is(':checked'))
	{
		adjustDayLength(rom, 2);
	}
	else if ($('#day_length_3x').is(':checked'))
	{
		adjustDayLength(rom, 3);
	}
	else if ($('#day_length_pc').is(':checked'))
	{
		adjustDayLength(rom, 1);
	}

	if ($('#karma_options_easy').is(':checked'))
	{
		easyKarmaMode(rom);
	}
	else if ($('#karma_options_hard').is(':checked'))
	{
		hardKarmaMode(rom);
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

	if ($('#display_hints').is(':checked'))
	{
		prepareHintText(rom, subSystemSeeds[SUBSYSTEM_HINTS]);
	}

	//perform randomization
	var spoilers = [];
	var randomizeItemsDone = false;
	do
	{
		randomizeItemsDone = randomizeItems(rom, subSystemSeeds[SUBSYSTEM_ITEMS], spoilers);	
	}
	while (randomizeItemsDone == false);
	
	fixShrines(rom); //after item randomization the shrines must be fixed for the new items
	
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
		if ($('#randomize_enemy_mix').is(':checked'))
		{
			randomizeEnemySpawnersMix(rom, subSystemSeeds[SUBSYSTEM_SPAWNERS_MIX], monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag);
		}
		else
		{
			randomizeEnemySpawners(rom, subSystemSeeds[SUBSYSTEM_SPAWNERS], monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag);
		}
	}

	if ($('#enemy_aggression_intuitive').is(':checked'))
	{
		intuitiveEnemyAggression(rom, subSystemSeeds[SUBSYSTEM_AGGRESSION]);
	}
	else if ($('#enemy_aggression_shuffle').is(':checked'))
	{
		shuffleEnemyAggression(rom, subSystemSeeds[SUBSYSTEM_AGGRESSION]);
	}
	else if ($('#enemy_aggression_passive').is(':checked'))
	{
		passiveEnemyAggression(rom, subSystemSeeds[SUBSYSTEM_AGGRESSION]);
	}

	if ($('#shuffle_spawn_numbers').is(':checked'))
	{
		shuffleSpawnNumbers(rom, subSystemSeeds[SUBSYSTEM_SPAWN_NUMBERS]);
	}
	else if ($('#random_spawn_numbers').is(':checked'))
	{
		randomSpawnNumbers(rom, subSystemSeeds[SUBSYSTEM_SPAWN_NUMBERS]);
	}

	if ($('#randomize_world_map').is(':checked'))
	{
		randomizeWorld(rom, subSystemSeeds[SUBSYSTEM_WORLD]);
	}

	//wrap it up
	var preset = +$('#preset').val();
	if (!preset) preset = 'x' + getRandomizerSettings();

	// validate the rom before we spit it out
	//var errors = validateROM(rom);
	var errors = [];

	// write version number and the randomizer seed to the rom
	var checksum = getChecksum(rom).toHex(4);

	writeTextToAddress(rom, TEXT_SEED_LOC, 16, VERSION_STRING + "-"+vseed+" : ");
	writeTextToAddress(rom, TEXT_FLAGS_LOC, 21, "Flags = " + preset);
	writeTextToAddress(rom, TEXT_SPEED_LOC, 21, " Fast -  Text  - Slow");
	if ($('#display_symbol_hash').is(':checked'))
		writeSymbolHash(rom, random);
	
	writeCredits(rom, subSystemSeeds[SUBSYSTEM_CREDITS]);
	fixText(rom);

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

function addDataToDataPool(inPool, inData, grepValue)
{
	var grepPool = $.grep(inData, function(x){ return (grepValue in x); });
	var outPool = inPool.concat(grepPool);
	return outPool;
}

function getSubystemSeeds(seed)
{
	var subSystemSeeds = [];
	var numSeeds = 10;
	for (var i = 0; i < numSeeds; ++i)
	{
		subSystemSeeds.push(new Random(seed+i));
	}
	return subSystemSeeds;
}

function dev(rom)
{
	console.log("=========DEV CODE FOR TESTING=========")
	//74 - skiff : A8 - balloon
	rom.set([0x6F],0x19898); //gargoyles in throne room flags
	rom.set([0x24],0x19899); //gargoyles in throne room
	//rom.set([0xB4],0x19899); //gargoyles in throne room
	//rom.set([0xB7],0x1989B); //enemies after gargoyles in throne room
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
