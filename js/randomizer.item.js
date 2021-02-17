const SHRINE_HONESTY      = 0x11E1E;
const SHRINE_COMPASSION   = 0x11E14;
const SHRINE_VALOR        = 0x11E37;
const SHRINE_JUSTICE      = 0x11DE2;
const SHRINE_SACRIFICE    = 0x11DF1;
const SHRINE_HONOR        = 0x11E3C;
const SHRINE_SPIRITUALITY = 0x11686;
const SHRINE_HUMILTY      = 0x11E46;

//TODO : Add sections to the spoiler log to split up how items are shown
//TODO : Add new chests
//TODO : Add option to randomly lock chests
//TODO : Add dialog items to the pool

function fixPickupGraphics(rom)
{
	//change the graphics of pickup items to chests
	rom.set([0x44, 0x17], 0x9F7FE); //change gargoyle lens location to a chest
	rom.set([0x74, 0x08], 0x97351); //change rune of honor location to a chest
	rom.set([0x3D], 0xCFBDD); //change rune of valor location to a chest
	rom.set([0x59], 0x9EF46); //change vortex cube location to a chest

	//change the flags on new chests to prevent them from being removed during pickup
	rom.set([0xC0], 0x11DC8); //change gargoyle lens location flag to non-delete
	rom.set([0xC0], 0x11E25); //change rune of honor location flag to non-delete
	rom.set([0xC0], 0x10F51); //change rune of valor location flag to non-delete
	rom.set([0xC0], 0x11C39); //change vortex cube location flag to non-delete
}

function prepareLocations(rom)
{
	//swap item order inside locations
	//this will put more valuable items in the item pool as well as give a unique identifier to each chest or location
	//also moves scrolls and keys out of the pool

	//swap gems with rune of honesty
	rom.set([0xDB, 0x93, 0x80, 0x80], 0x1192D); //rune of honesty
	rom.set([0xDB, 0x93, 0x80, 0x67], 0x11931); //rune of honesty

	//swap torches with balloon plans
	rom.set([0xB3, 0xDD, 0x80, 0x8A], 0x11D57); //sutek castle - balloon plans
	rom.set([0xB3, 0xDD, 0x80, 0x6A], 0x11D5B); //sutek castle - balloon plans

	//swap torches with gold
	rom.set([0x0C, 0x25, 0xBC, 0xB3], 0x11400); //buccaneers den - bottom left house
	rom.set([0x0C, 0x25, 0x85, 0x6A], 0x11404); //buccaneers den - bottom left house

	//swap torches with red potion
	rom.set([0x2A, 0x2F, 0xC0, 0x8D], 0x11032); //castle britannia - avatar chest
	rom.set([0x2A, 0x2F, 0xC6, 0x6A], 0x11036); //castle britannia - avatar chest

	//swap scroll with energy wand
	rom.set([0x28, 0x31, 0xC3, 0x2D], 0x11062); //castle britannia - nystful chest
	rom.set([0x28, 0x31, 0xF0, 0xB9], 0x11066); //castle britannia - nystful chest

	//swap torches with gold
	rom.set([0x17, 0x18, 0x8C, 0xB3], 0x1130D); //serpents hold - castle
	rom.set([0x17, 0x18, 0x83, 0x6A], 0x11311); //serpents hold - castle

	//move grapes in south house in serpents hold into chest and move the key to the second item slot
	rom.set([0x19, 0x31, 0x80, 0x3D], 0x113A5); //serpents hold - south house
	rom.set([0x19, 0x31, 0x85, 0x45], 0x113A9); //serpents hold - south house

	//swap key with curve heater
	rom.set([0x0A, 0x1E, 0x80, 0x0A], 0x11331); //serpents hold - upper left house
	rom.set([0x0A, 0x1E, 0x86, 0x45], 0x11335); //serpents hold - upper left house

	//magic chests
	//move spring water in mayor house in jhelom into chest and move the key to the second item slot
	rom.set([0x06, 0x3A, 0x00, 0x4A], 0x10F73); //jhelom - west house
	rom.set([0x06, 0x3A, 0x84, 0x45], 0x10F77); //jhelom - west house

	//swap gems with sleeping powder
	rom.set([0x19, 0x07, 0x83, 0x6B], 0x1151D); //moonglow - penumbra house
	rom.set([0x19, 0x07, 0x84, 0x67], 0x1152D); //moonglow - penumbra house
}

function fixChests(rom)
{
	//move nearby items into empty chests to allow them to be added to the randomization pool
	//overworld chests
	rom.set([0x06, 0x42, 0xC0, 0x4C], 0x1164B); //britain - guild shop
	rom.set([0xEB, 0x35, 0xC0, 0x6E], 0x116D2); //dagger island - house basement
	rom.set([0x2B, 0x41, 0xC0, 0x4A], 0x111A7); //paws - spinnner left
	rom.set([0x2C, 0x41, 0xC0, 0x79], 0x111BF); //paws - spinnner right
	rom.set([0x35, 0x1A, 0xC0, 0x40], 0x11193); //paws - upper wood house
	
	//dungeon chests
	rom.set([0xE9, 0xF2, 0x00, 0x4C], 0x11D63); //dungeon - hythloth - captain john
	rom.set([0xA1, 0xD4, 0x80, 0x08], 0x11C93); //dungeon - pirate cave - empty chest
}

function increaseSherryPickupWeight(rom)
{
	//due to restrictions in how sherry picks up items she can never pick up the following items:
	//	spellbook / gold nugget / gold / book / spell / scroll / key
	rom[0x11FDA] = 0xCF;
}

function replaceMoonOrb(rom)
{
	//replace the moonorb with something else in the case where no item randomization is chosen
	rom[0xF91D] = 0x3F; //bread
}

function randomizeItems(rom, random, spoilers)
{
	console.log("RANDOMIZING ITEMS");

	var items = [];
	var locations = [];
	var restrictions = [];
	var hintLocations = [];

	if ($('#randomize_core_items').is(':checked'))
	{
		items = addDataToDataPool(items, DATA_ITEMS_CORE, 'id');
		locations = addDataToDataPool(locations, DATA_ITEMS_CORE, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_ITEMS_CORE, 'restrictions');
	}

	if ($('#randomize_chests_overworld').is(':checked'))
	{
		items = addDataToDataPool(items, DATA_CHESTS_OVERWORLD, 'id');
		locations = addDataToDataPool(locations, DATA_CHESTS_OVERWORLD, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_CHESTS_OVERWORLD, 'restrictions');
	}

	if ($('#randomize_chests_dungeons').is(':checked'))
	{
		items = addDataToDataPool(items, DATA_CHESTS_DUNGEON, 'id');
		locations = addDataToDataPool(locations, DATA_CHESTS_DUNGEON, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_CHESTS_DUNGEON, 'restrictions');
	}

	if ($('#remove_moonorb').is(':checked'))
	{
		items = addDataToDataPool(items, DATA_ITEM_MOONORB_REPLACEMENTS, 'id');
		locations = addDataToDataPool(locations, DATA_ITEM_MOONORB_REPLACEMENTS, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_ITEM_MOONORB_REPLACEMENTS, 'restrictions');
	}
	else if ($('#randomize_moonorb').is(':checked'))
	{
		items = addDataToDataPool(items, DATA_ITEM_MOONORB, 'id');
		locations = addDataToDataPool(locations, DATA_ITEM_MOONORB, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_ITEM_MOONORB, 'restrictions');
	}

	if ($('#randomize_spellbook').is(':checked'))
	{
		items = addDataToDataPool(items, DATA_ITEM_SPELLBOOK, 'id');
		locations = addDataToDataPool(locations, DATA_ITEM_SPELLBOOK, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_ITEM_SPELLBOOK, 'restrictions');
	}

	if(items.length != locations.length)
	{
		console.log('ERROR - Items length and Locations length are not the same' + items.length + " != " + locations.length);
		return;
	}

	locations = shuffleLocations(random, locations);
	items.shuffle(random);
	hintLocations = getHintLocations();
	var isDonePlacingItems = placeItemsInLocations(rom, random, items, locations, restrictions, spoilers, hintLocations);

	return isDonePlacingItems;
}

function shuffleLocations(random, locations)
{
	//to help prevent failed placements when near the end of the item placement step we shuffle the restricted and unrestricted locations seperately
	//then attempt to place in restricted locations first
	var restrictedLocations = [];
	var unrestrictedLocations = [];

	restrictedLocations = $.grep(locations, function(x){ return x.restrictions.length != 0; });
	unrestrictedLocations = $.grep(locations, function(x){ return x.restrictions.length == 0; });

	restrictedLocations.shuffle(random);
	unrestrictedLocations.shuffle(random);
	locations = restrictedLocations.concat(unrestrictedLocations);
	return locations;
}

function placeItemsInLocations(rom, random, items, locations, restrictions, spoilers, hintLocations)
{
	var iItem = 0;
	var safetyCounter = 0;
	var wasSuccessful = false;

	while (safetyCounter < 1000)
	{
		var iLocation = 0;

		for (iLocation = 0; iLocation < locations.length; ++iLocation)
		{
			var locHex = locations[iLocation].offset + 3;
			var itemHex = items[iItem].id;
			var isItemAllowed = 1;
			
			for( var iR = 0; iR < restrictions.length; ++iR)
			{
				if(restrictions[iR].name == locations[iLocation].name)
				{
					//if we are attempting to place a stacked item at a shrine then flag as not allowed to place here
					if(locations[iLocation].type == "shrine" && items[iItem].type == "stack")
					{
						//console.log('STACK NOT ALLOWED - ITEM ' + items[iItem].name + ' #' + itemHex + ' IS NOT ALLOWED IN LOCATION ' + locations[iLocation].name);
						isItemAllowed = 0;
					}
					else if(locations[iLocation].id == ITEM_RUNE_VALOR && items[iItem].type == "stack")
					{
						//console.log('STACK NOT ALLOWED - ITEM ' + items[iItem].name + ' #' + itemHex + ' IS NOT ALLOWED IN LOCATION ' + locations[iLocation].name);
						isItemAllowed = 0;
					}
					else
					{
						var rArray = restrictions[iR].restrictions;
						for( iRA = 0; iRA < rArray.length; ++iRA)
						{
							if(rArray[iRA] == itemHex)
							{
								//console.log('FAILED PLACEMENT - ITEM ' + items[iItem].name + ' #' + itemHex + ' IS NOT ALLOWED IN LOCATION ' + locations[iLocation].name);
								isItemAllowed = 0;
							}
						}
					}
				}
			}
			
			if(isItemAllowed == 1)
			{
				if(locations[iLocation].offset == 0x0F91D || locations[iLocation].offset == 0x0F923) //moonorb and spellbook
				{
					var locHex = locations[iLocation].offset;
					var itemHex = items[iItem].id;
					rom[locHex] = itemHex;

					if( locations[iLocation].offset == 0x0F923 )
					{
						rom[locations[iLocation].offset+1] = 0x01; //set an item quantity for the spellbook replacement
					}

					if(items[iItem].item != '' && items[iItem].location != '')
					{
						if ($('#display_hints').is(':checked'))
						{
							if(items[iItem].type == "main" || items[iItem].type == "shrine")
							{
								addHint(rom, random, items[iItem].item, locations[iLocation].hints, hintLocations);
							}
						}
						spoilers.push(items[iItem].item + ' located in ' + locations[iLocation].location);
						//console.log('PLACED - ITEM ' + items[iItem].name + ' #' + itemHex + ' IN INVENTORY LOCATION ' + locations[iLocation].name + ' #' + locHex.toHex(3));
					}
					items.splice(iItem, 1);
					locations.splice(iLocation, 1);
					break;
				}
				else if(locations[iLocation].offset == 0x09E3F) //rune of compassion
				{
					var locHex = locations[iLocation].offset;
					var itemHex = items[iItem].id;
					rom[locHex] = itemHex;
					if(items[iItem].item != '' && items[iItem].location != '')
					{
						if ($('#display_hints').is(':checked'))
						{
							if(items[iItem].type == "main" || items[iItem].type == "shrine")
							{
								addHint(rom, random, items[iItem].item, locations[iLocation].hints, hintLocations);
							}
						}
						spoilers.push(items[iItem].item + ' located in ' + locations[iLocation].location);
						//console.log('PLACED - ITEM ' + items[iItem].name + ' #' + itemHex + ' IN DIALOG LOCATION ' + locations[iLocation].name + ' #' + locHex.toHex(3));
					}
					items.splice(iItem, 1);
					locations.splice(iLocation, 1);
					break;
				}
				else
				{
					var flagLocHex = locations[iLocation].offset + 2;
					var flagHex = 0xC0;

					if(locations[iLocation].type == "shrine") //if we are attempting to place at a shrine, always use the location flags
					{
						flagHex = locations[iLocation].flags[0];
						//console.log("shrine");
					}
					else if(items[iItem].type == "main" || items[iItem].type == "shrine") //if we are placing a main/shrine item, always use the item flags to ensure that it will not count as stolen
					{
						flagHex = items[iItem].flags[1];
						//console.log("main");
					}
					else if(locations[iLocation].stolen == "yes") //next check if the location is flagged as stolen
					{
						flagHex = items[iItem].flags[0];
						//console.log("stolen");
					}
					else //we are not a shrine, not a main item, and not being placed in a location that is set as stolen
					{
						flagHex = items[iItem].flags[1];
						//console.log("not stolen");
					}

					rom[locHex] = itemHex;
					rom[flagLocHex] = flagHex;
					if(items[iItem].item != '' && items[iItem].location != '')
					{
						if ($('#display_hints').is(':checked'))
						{
							if(items[iItem].type == "main" || items[iItem].type == "shrine")
							{
								addHint(rom, random, items[iItem].item, locations[iLocation].hints, hintLocations);
							}
						}
						spoilers.push(items[iItem].item + ' located in ' + locations[iLocation].location);
						//console.log('PLACED - ITEM ' + items[iItem].name + ' #' + itemHex + ' IN LOCATION ' + locations[iLocation].name + ' #' + locHex.toHex(3) + " with flags " + flagHex.toHex(1));
					}
					items.splice(iItem, 1);
					locations.splice(iLocation, 1);
					break;
				}
			}
			else //item is not allowed
			{
				if(items.length == 1 || locations.length == 1)
				{
					//console.log('ERROR - LAST ITEM WAS NOT ALLOWED IN LAST LOCATION - RANDOMIZING AGAIN');
					wasSuccessful = false;
					return wasSuccessful;
				}
			}
		}
		safetyCounter++;

		if(items.length == 0 || locations.length == 0)
		{
			if(items.length != locations.length)
			{
				wasSuccessful = false;
				return wasSuccessful;
			}
			else
			{
				wasSuccessful = true;
				return wasSuccessful;
			}
		}
	}

	if(wasSuccessful == false)
	{
		//console.log('=== ERROR - ITEM RANDOMIZATION FAILED - RANDOMIZING AGAIN ===');
	}
	return wasSuccessful;
}

function fixShrines(rom)
{
	var codeOffset = 0x17080;
	
	//shrines are hardcoded to compare against item 5F which needs to change for the shrines to function with random items
	//branch to new injected function
	rom.set([0x20, 0x80, 0xF0],0x14153); //20-jump sub routine to address F080
	
	//inject new function to fix shrine item checks
	rom.set(
		[
			0xC9, 0x5F, 0xF0, 0x1E, 0xC9, 0x60, 0xF0, 0x1E, 0xC9, 0x61, 0xF0, 0x1E, 0xC9, 0x62, 0xF0, 0x1E,
			0xC9, 0x63, 0xF0, 0x1E, 0xC9, 0x64, 0xF0, 0x1E, 0xC9, 0x65, 0xF0, 0x1E, 0xC9, 0x66, 0xF0, 0x1E,
			0x60, 0x38, 0xE9, 0x5F, 0x60, 0x38, 0xE9, 0x5F, 0x60, 0x38, 0xE9, 0x5F, 0x60, 0x38, 0xE9, 0x5F,
			0x60, 0x38, 0xE9, 0x5F, 0x60, 0x38, 0xE9, 0x5F, 0x60, 0x38, 0xE9, 0x5F, 0x60, 0x38, 0xE9, 0x5F,
			0x60
		],
		codeOffset);

	var honestyItem      = rom[SHRINE_HONESTY+3];
	var compassionItem   = rom[SHRINE_COMPASSION+3];
	var valorItem        = rom[SHRINE_VALOR+3];
	var justiceItem      = rom[SHRINE_JUSTICE+3];
	var sacrificeItem    = rom[SHRINE_SACRIFICE+3];
	var honorItem        = rom[SHRINE_HONOR+3];
	var spiritualityItem = rom[SHRINE_SPIRITUALITY+3];
	var humilityItem     = rom[SHRINE_HUMILTY+3];

	rom[codeOffset+0x01] = honestyItem;
	rom[codeOffset+0x05] = compassionItem;
	rom[codeOffset+0x09] = valorItem;
	rom[codeOffset+0x0D] = justiceItem;
	rom[codeOffset+0x11] = sacrificeItem;
	rom[codeOffset+0x15] = honorItem;
	rom[codeOffset+0x19] = spiritualityItem;
	rom[codeOffset+0x1D] = humilityItem;

	rom[codeOffset+0x23] = honestyItem;
	rom[codeOffset+0x27] = compassionItem-1;
	rom[codeOffset+0x2B] = valorItem-2;
	rom[codeOffset+0x2F] = justiceItem-3;
	rom[codeOffset+0x33] = sacrificeItem-4;
	rom[codeOffset+0x37] = honorItem-5;
	rom[codeOffset+0x3B] = spiritualityItem-6;
	rom[codeOffset+0x3F] = humilityItem-7;
}

function addSpiritShrineWarpMountainIsland(rom, random, blockingFlag)
{
	//blockingFlag : 1 = open, 2 = require flying, 3 = random

	setWorldChunksInGrid(rom, 08,10, 16,15, [
		[0x02,0x00, 0x2A,0x00, 0x53,0x00, 0x4C,0x00, 0x4C,0x00, 0x3C,0x00, 0x3D,0x00, 0x28,0x00, 0x02,0x00], //row 1
		[0x2A,0x00, 0x43,0x00, 0x27,0x01, 0x10,0x01, 0x10,0x01, 0x10,0x01, 0x26,0x01, 0x4D,0x00, 0x28,0x00], //row 2
		[0x2A,0x00, 0x42,0x00, 0x21,0x01, 0x13,0x01, 0x7F,0x01, 0x14,0x01, 0x12,0x01, 0x3E,0x00, 0x28,0x00], //row 3
		[0x02,0x00, 0x4B,0x00, 0x21,0x01, 0xCA,0x02, 0x6B,0x01, 0xCB,0x02, 0x12,0x01, 0x59,0x00, 0x02,0x00], //row 4
		[0x39,0x00, 0x61,0x00, 0x1A,0x01, 0x19,0x01, 0xDA,0x02, 0x1A,0x01, 0x19,0x01, 0x6F,0x00, 0x37,0x00], //row 5
		[0x02,0x00, 0x39,0x00, 0x61,0x00, 0x6F,0x00, 0x20,0x00, 0x71,0x00, 0x5F,0x00, 0x01,0x00, 0x53,0x00], //row 6
	])

	var randomTileOptions = 
	[
		{"tile":[0xF3,0x00]}, {"tile":[0xF4,0x00]}, {"tile":[0xFC,0x00]}, {"tile":[0x15,0x01]}, {"tile":[0x16,0x01]}, {"tile":[0x24,0x01]}, {"tile":[0xFB,0x00]}, {"tile":[0xF0,0x00]}, //open
		{"tile":[0xF2,0x00]}, {"tile":[0x33,0x01]}, {"tile":[0x85,0x02]}, //swamps
		{"tile":[0xEF,0x02]}, {"tile":[0xF4,0x02]}, //volcanos
		{"tile":[0x84,0x02]}, //moongate circle
	];

	if(blockingFlag == 3)
	{
		if(random.flipCoin(0.5)) //50% chance to require the balloon
		{
			blockingFlag = 2; //requires balloon
		}
		else
		{
			blockingFlag = 1; //does not require the balloon
		}
	}

	if(blockingFlag == 2) //requires balloon
	{
		setWorldChunkAtCoords(rom, 12,13, 0x50,0x01); //impassable trees
	}
	else
	{
		var randTileNum = random.nextIntRange(0,randomTileOptions.length);
		setWorldChunkAtCoords(rom, 12,13, randomTileOptions[randTileNum].tile[0],randomTileOptions[randTileNum].tile[1]);
	}

	//move upper NW sea serpent spawner to in front of the island
	rom.set([0x78, 0x90],0x6887);
}
