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

	//wrong - swap gold with map piece
	rom.set([0x95, 0x01, 0x80, 0xA3], 0x119C0); //wrong - swap gold with map piece
	rom.set([0x95, 0x01, 0x85, 0xB3], 0x119C4); //wrong - swap gold with map piece

	//magic chests
	//move spring water in mayor house in jhelom into chest and move the key to the second item slot
	rom.set([0x06, 0x3A, 0x00, 0x4A], 0x10F73); //jhelom - west house
	rom.set([0x06, 0x3A, 0x84, 0x45], 0x10F77); //jhelom - west house

	//swap gems with sleeping powder
	rom.set([0x19, 0x07, 0x83, 0x6B], 0x1151D); //moonglow - penumbra house
	rom.set([0x19, 0x07, 0x84, 0x67], 0x1152D); //moonglow - penumbra house

	//move nearby items into empty chests to allow them to be added to the randomization pool
	rom.set([0x06, 0x48, 0xC0, 0x4C], 0x1164B); //britain - guild shop
	rom.set([0x2B, 0x41, 0xC0, 0x4A], 0x111A7); //paws - spinnner left
	rom.set([0x2C, 0x41, 0xC0, 0x79], 0x111BF); //paws - spinnner right
	rom.set([0x35, 0x1A, 0xC0, 0x40], 0x11193); //paws - upper wood house
	rom.set([0xE9, 0xF2, 0x00, 0x4C], 0x11D63); //dungeon - hythloth - captain john
	rom.set([0xA1, 0xD4, 0x80, 0x08], 0x11C93); //dungeon - pirate cave - empty chest

	if($('#randomize_chests_dungeons').is(':checked'))
	{
		rom.set([0xEB, 0x35, 0x80, 0xA0], 0x116E6); //dagger island - house basement - move map piece
	}
	else
	{
		rom.set([0xEB, 0x35, 0x80, 0x91], 0x116D2); //dagger island - house basement - move orange potion
	}

}

function addSpellChests(rom)
{
	//Dispel Field Spell in Xiao Shop
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0x73680);
	lzwData.set([0xA0], 0x23B5); //remove the blue potion
	lzwData.set([0xF1], 0x2421); //add the chest (no lock)
	
	//convert items
	rom.set([0x0E, 0x0B, 0x80, 0x93], 0x1146A); //move blue potion and convert

	//Unlock Spell in Rudyom Shop
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0xD9500);
	lzwData.set([0x5F], 0x1220); //remove the blue potion
	lzwData.set([0xF1], 0x1209); //add the chest (no lock)
	
	//convert items
	rom.set([0x25, 0x39, 0x80, 0x8D], 0x110CD); //move blue potion and convert
}

function updateAndAddChests(rom)
{
	addSpellChests(rom);

	//change the flags on new pickup chest replacements to prevent them from being removed during pickup
	rom.set([0xC0], 0x11DC8); //change gargoyle lens location flag to non-delete
	rom.set([0xC0], 0x11E25); //change rune of honor location flag to non-delete
	rom.set([0xC0], 0x10F51); //change rune of valor location flag to non-delete
	rom.set([0xC0], 0x11C39); //change vortex cube location flag to non-delete

	//change the graphics of pickup items to chests
	var lzwData = decompressDataFromLZW(rom, 0x96B00);
	lzwData[0x50DD] = 0x21; //change rune of honor location to a chest

	var lzwData = decompressDataFromLZW(rom, 0xCEA80);
	lzwData[0x17D8] = 0x3D; //change rune of valor location to a chest

	//move Britain Guild Shop chest
	var lzwData = decompressDataFromLZW(rom, 0xD2180);
	lzwData[0x2E21] = 0x81; //replace old chest with barrel
	lzwData[0x2ED1] = 0x85; //add new chest

	//Sin'Vraal Chest
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0xD7000);
	lzwData[0x308] = 0x21; //no lock

	//convert items
	rom.set([0x01, 0x05, 0x86, 0x2F], 0x115E1); //swap item placements
	rom.set([0x01, 0x05, 0x83, 0x6A], 0x115E5); //swap item placements

	//Fighter Chest
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0xD7280);
	lzwData[0x2EB] = 0xF1; //no lock

	//convert items
	rom.set([0x06, 0x04, 0x80, 0x7C], 0x115F0); //convert items

	//Iolo Chest and Empath Abbey Chest
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0x70000);
	lzwData[0x1FC6] = 0xF1; //iolo chest - no lock
	lzwData.set([0xF2], 0x1DD6); //empath abbey chest - magic lock

	//convert items
	rom.set([0x82, 0x32, 0xD8, 0x56], 0x10EF1); //swap item placements in iolo hut
	rom.set([0x82, 0x32, 0xE3, 0x55], 0x10EF5); //swap item placements in iolo hut
	rom.set([0x85, 0x31, 0xC8, 0x6A], 0x10EF9); //swap item placements in iolo hut

	//Underground - Floor 1 Chests
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0x9D000);
	lzwData[0x27EB] = 0x42; //add sherry chest (magic lock)
	lzwData.set([0x41], 0x54B); //lycaeum - boardgame
	lzwData.set([0x41], 0x19E6); //lycaeum - oz
	lzwData[0x5B5] = 0x41; //shame - f1 chest - add chest graphic
	lzwData[0x5AF] = 0x00; //shame - f1 chest - remove item graphic

	rom.set([0x19, 0x8D, 0x80, 0x43], 0x117CA); //convert spring water to cheese for sherry chest
	rom.set([0x2B, 0x5E, 0x00, 0x15], 0x11736); //move leather boots and convert for shame f1 chest

	//Underground - Floor 2 Chests
	var lzwData = decompressDataFromLZW(rom, 0x09DA00);
	lzwData[0x1192] = 0x07; //spider cave - add f2 chest graphic
	lzwData[0x11BA] = 0x00; //spider cave - remove spiked collar graphic
	lzwData[0x3312] = 0x07; //swamp cave - add f2 chest graphic (replaces mace graphic)

	rom.set([0x18, 0x4A, 0x00, 0x18], 0x118C9); //move spiked collar into chest - spider cave

	//Underground - Floor 3 Chests
	var lzwData = decompressDataFromLZW(rom, 0x9E300);
	lzwData[0x10AD] = 0x91; //despise f3 - replace white potion graphic with chest (0x92 is locked)
	lzwData[0x13D5] = 0x47; //despise f3 - change volcano to bear trap to prevent stuckage

	rom.set([0x4B, 0x35, 0x00, 0x17], 0x11A68); //convert white potion to magic armor - despise f3

	//Underground - Floor 4 Chests
	var lzwData = decompressDataFromLZW(rom, 0x9EC00);
	lzwData[0x859] = 0x59; //king's tomb chest
	lzwData[0x2E4A] = 0x59; //ant mound - add f4 chest graphic
	lzwData[0x2765] = 0x59; //swamp cave - add f4 chest graphic
	lzwData[0x120D] = 0x59; //change Vortex Cube location to a chest
	
	//deceit f4 chest and force fields
	lzwData[0x22F5] = 0x59; //chest
	lzwData[0x22E1] = 0x00; //remove fence
	lzwData[0x22E9] = 0xB9; //remove fence and replace with field
	lzwData[0x22D3] = 0x00; //remove fence
	lzwData[0x22D4] = 0xB9; //remove fence and replace with field
	lzwData[0x22D5] = 0xB9; //remove fence and replace with field

	rom.set([0x7F, 0x02, 0x80, 0x29], 0x11B47); //convert item from gold to boomerang - kings tomb chest
	rom.set([0xF8, 0x29, 0x80, 0x9D], 0x11BCB); //move map piece into chest - ant mound chest
	rom.set([0xB3, 0xD4, 0x00, 0x0D], 0x11CAB); //convert item from spear to spike shield - swamp cave f4 chest
	rom.set([0xEB, 0xAE, 0x80, 0x10], 0x11B57); //move mutton from body to chest and convert to magic shield - deceit f4 chest

	//Gargoyle Lands
	//Gargoyle NW House Chest and Gargoyle Lens
	var lzwData = decompressDataFromLZW(rom, 0x9F500);
	lzwData.set([0x5D], 0x5DB); //add chest to NW Gargoyle House - no lock
	lzwData[0x1456] = 0x5D; //change Gargoyle Lens location to a chest
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

function adjustArmorItems(rom)
{
	console.log("ADDING NEW ARMOR ITEMS");
	
	//increase armor accumulator item id check from 33 to 3C to allow boots, belts, and necklaces to provide armor
	rom[0x591D] = 0x3C;

	//change items to allow for armor (unfortunately the helmet equip table is written on top of this, so all armor values are 2)
	rom[0xFA19] = 0x22; //guild belt - set to give armor
	rom[0xFB51] = 0x01; //guild belt - set to accessory slot
	rom[0xFA1A] = 0x20; //gargoyle belt - set to give armor
	rom[0xFA1B] = 0x20; //leather boots - set to give armor
	rom[0xFA1C] = 0x20; //swamp boots - set to give armor
	rom[0xFA1D] = 0x20; //storm cloak - set to give armor
	rom[0xFA1E] = 0x20; //ankh necklace - set to give armor
	rom[0xFA1F] = 0x20; //snake necklace - set to give armor
	
/*
	//inject function to accumulate damage
	rom.set([	
				0xA9, 0x08,					//LDA value 08
				0x85, 0x00,					//STA 00 store the value in the accumulator at 7E0000
				0xB9, 0x72, 0x72,			//LDA load address 7E7272 + y
				//0xF0, 0x16,				//BEQ 16
				0xC9, 0x3C,					//CMP compare to value 3C (item id)
				0xB0, 0x12,					//BCS 12
				0xAA,						//TAX
				0xBF, 0xE4, 0xF9, 0x01,		//LDA load address F9E4 + accumulator (item id) - item flags
				0x29, 0x40,					//AND 40
				0xF0, 0x09,					//BEQ 9
				0xBF, 0x9D, 0xFA, 0x01,		//LDA load address FA9D + accumulator (item id) - item damage value
				0x18,						//CLC
				0x65, 0x06,					//ADC 06
				0x85, 0x06,					//STA 06
				0xC8,						//INY
				0xC6, 0x00,					//DEC 00
				0xD0, 0xE0					//BNE EO
			], 0xFE00);
*/
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
		
		if ($('#randomize_chests_dungeons').is(':checked') == false)
		{
			items = addDataToDataPool(items, DATA_CHESTS_OVERWORLD_MAPPIECE, 'id');
			locations = addDataToDataPool(locations, DATA_CHESTS_OVERWORLD_MAPPIECE, 'offset');
			restrictions = addDataToDataPool(restrictions, DATA_CHESTS_OVERWORLD_MAPPIECE, 'restrictions');
		}
	}

	if ($('#randomize_chests_dungeons').is(':checked'))
	{
		items = addDataToDataPool(items, DATA_CHESTS_DUNGEON, 'id');
		locations = addDataToDataPool(locations, DATA_CHESTS_DUNGEON, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_CHESTS_DUNGEON, 'restrictions');

		items = addDataToDataPool(items, DATA_CHESTS_DUNGEONS_MAPPIECE, 'id');
		locations = addDataToDataPool(locations, DATA_CHESTS_DUNGEONS_MAPPIECE, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_CHESTS_DUNGEONS_MAPPIECE, 'restrictions');
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

	if ($('#randomize_unlockanddispel').is(':checked')) //randomize spells is selected
	{
		items = addDataToDataPool(items, DATA_CHESTS_SPELLS, 'id');
		locations = addDataToDataPool(locations, DATA_CHESTS_SPELLS, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_CHESTS_SPELLS, 'restrictions');
	}
	else
	{
		if ($('#randomize_chests_overworld').is(':checked')) //randomize spells is not selected
		{
			items = addDataToDataPool(items, DATA_CHESTS_NO_SPELLS, 'id');
			locations = addDataToDataPool(locations, DATA_CHESTS_NO_SPELLS, 'offset');
			restrictions = addDataToDataPool(restrictions, DATA_CHESTS_NO_SPELLS, 'restrictions');
		}
	}
	
	if ($('#add_sherry_item').is(':checked')) //randomize sherry item is selected
	{
		items = addDataToDataPool(items, DATA_CHESTS_SHERRY_ITEM, 'id');
		locations = addDataToDataPool(locations, DATA_CHESTS_SHERRY_ITEM, 'offset');
		restrictions = addDataToDataPool(restrictions, DATA_CHESTS_SHERRY_ITEM, 'restrictions');
	}
	else
	{
		if ($('#randomize_chests_overworld').is(':checked')) //randomize sherry item is not selected
		{
			items = addDataToDataPool(items, DATA_CHESTS_NO_SHERRY_ITEM, 'id');
			locations = addDataToDataPool(locations, DATA_CHESTS_NO_SHERRY_ITEM, 'offset');
			restrictions = addDataToDataPool(restrictions, DATA_CHESTS_NO_SHERRY_ITEM, 'restrictions');
		}
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

function checkRestrictions(restrictions, locations, items, iLocation, iItem, itemHex, isItemAllowed)
{
	outerLoop:
	for(var iR = 0; iR < restrictions.length; ++iR)
	{
		if(restrictions[iR].name == locations[iLocation].name)
		{
			locationHasRestrictions = true;
			
			//if we are attempting to place a stacked item at a shrine then flag as not allowed to place here
			if(locations[iLocation].type == "shrine" && items[iItem].type == "stack")
			{
				isItemAllowed = 0;
				break outerLoop;
			}
			else if(locations[iLocation].id == ITEM_RUNE_VALOR && items[iItem].type == "stack")
			{
				isItemAllowed = 0;
				break outerLoop;
			}
			else if(locations[iLocation].offset == 0x04 || locations[iLocation].offset == 0x05) //Lord British and Phoenix Special Code
			{
				if(itemHex > 0x7F)
				{
					isItemAllowed = 0;
					break outerLoop;
				}
			}
			else
			{
				var rArray = [];
				rArray = rArray.concat(restrictions[iR].restrictions);
				rArray = rArray.concat(restrictions[iR].requires);
				rArray = rArray.concat(restrictions[iR].addedRequires);
				for(var iRA = 0; iRA < rArray.length; ++iRA)
				{
					if(rArray[iRA] == itemHex)
					{
						isItemAllowed = 0;
						break outerLoop;
					}
				}
			}
		}
	}
	
	return {
		locationHasRestrictions: locationHasRestrictions,
		isItemAllowed: isItemAllowed,
	};
}

function checkSpellRestrictions(locations, items, iLocation, iItem, isItemAllowed)
{
	if(isItemAllowed == 1 && items[iItem].type == "spell")
	{
		var rArray = [];
		rArray = rArray.concat(locations[iLocation].spellrestrictions);
		rArray = rArray.concat(locations[iLocation].addedSpellRequires);
		for(var iRA = 0; iRA < rArray.length; ++iRA)
		{
			if(items[iItem].flags[0] == rArray[iRA])
			{
				isItemAllowed = 0;
				break;
			}
		}
	}
	return {
		isItemAllowed: isItemAllowed,
	};
}

function clearedAddedRequirements(locations)
{
	for(var iLocation = 0; iLocation < locations.length; ++iLocation)
	{
		locations[iLocation].addedRequires = [];
	}
	for(var iLocation = 0; iLocation < locations.length; ++iLocation)
	{
		locations[iLocation].addedSpellRequires = [];
	}
	return locations;
}

function updateLocationRequirements(locations, inLocation, inItem)
{
	//we placed an item in a restricted location
	//find all locations that require this item and add the locations required items to that list
	//example: rune of valor placed in shrine of justice so all places that require the valor rune should also require the justice rune
	for(var iLocation = 0; iLocation < locations.length; ++iLocation) //look through all locations
	{
		for(var iRequires = 0; iRequires < locations[iLocation].requires.length; ++iRequires) //look through the requirements of each location
		{
			if(locations[iLocation].requires[iRequires] == inItem.id) //determine if this location has a requirement that is this item
			{
				//add the placed location requirements to this location
				locations[iLocation] = addLocationRequirements(locations[iLocation], inLocation);
			}
		}
		for(var iRequires = 0; iRequires < locations[iLocation].addedRequires.length; ++iRequires) //look through the added requirements of each location
		{
			if(locations[iLocation].addedRequires[iRequires] == inItem.id) //determine if this location has a requirement that is this item
			{
				//add the placed location requirements to this location
				locations[iLocation] = addLocationRequirements(locations[iLocation], inLocation);
			}
		}

		//do the same as above for spell requirements
		for(var iSpellRestriction = 0; iSpellRestriction < locations[iLocation].spellrestrictions.length; ++iSpellRestriction)
		{
			if(locations[iLocation].spellrestrictions[iSpellRestriction] == inItem.flags[0]) //determine if this location has a requirement that is this spell
			{
				//add the placed location spell requirements to this location
				locations[iLocation] = addLocationSpellRequirements(locations[iLocation], inLocation);
			}
		}
		for(var iSpellRestriction = 0; iSpellRestriction < locations[iLocation].spellrestrictions.length; ++iSpellRestriction)
		{
			if(locations[iLocation].addedSpellRequires[iSpellRestriction] == inItem.flags[0]) //determine if this location has a requirement that is this spell
			{
				//add the placed location spell requirements to this location
				locations[iLocation] = addLocationSpellRequirements(locations[iLocation], inLocation);
			}
		}
	}
	return locations;
}

function addLocationRequirements(location1, location2)
{
	var allRequires2 = location2.requires.concat(location2.addedRequires);
	var allRequires1 = location1.requires.concat(location1.addedRequires);
	for(var i = 0; i < allRequires2.length; ++i) //look through the requirements of the placed location
	{
		var requirementMatchFound = false;
		for(var j = 0; j < allRequires1.length; ++j) //look through the requirements of the searched location
		{
			if(allRequires1[j] == allRequires2[i]) //avoid adding duplicates
			{
				requirementMatchFound = true;
				break;
			}
		}
		if(requirementMatchFound == false) //no duplicate found so add the requirement
		{
			location1.addedRequires.push(allRequires2[i]);
		}
	}
	return location1;
}

function addLocationSpellRequirements(location1, location2)
{
	var allRequires2 = location2.spellrestrictions.concat(location2.addedSpellRequires);
	var allRequires1 = location1.spellrestrictions.concat(location1.addedSpellRequires);
	for(var i = 0; i < allRequires2.length; ++i) //look through the requirements of the placed location
	{
		var requirementMatchFound = false;
		for(var j = 0; j < allRequires1.length; ++j) //look through the requirements of the searched location
		{
			if(allRequires1[j] == allRequires2[i]) //avoid adding duplicates
			{
				requirementMatchFound = true;
				break;
			}
		}
		if(requirementMatchFound == false) //no duplicate found so add the requirement
		{
			location1.addedSpellRequires.push(allRequires2[i]);
		}
	}

	return location1;
}

function placeItemsInLocations(rom, random, items, locations, restrictions, spoilers, hintLocations)
{
	var iItem = 0;
	var safetyCounter = 0;
	var wasSuccessful = false;
	
	clearedAddedRequirements(locations);

	while (safetyCounter < 1000)
	{
		var iLocation = 0;

		for(iLocation = 0; iLocation < locations.length; ++iLocation)
		{
			var locHex = locations[iLocation].offset + 3;
			var itemHex = items[iItem].id;
			var isItemAllowed = 1;
			var locationHasRestrictions = false;

			//check restrictions on location 
			var restrictionResults = checkRestrictions(restrictions, locations, items, iLocation, iItem, itemHex, isItemAllowed);
			isItemAllowed = restrictionResults.isItemAllowed;
			locationHasRestrictions = restrictionResults.locationHasRestrictions;

			//check spell restrictions on location if we did not already fail
			var spellRestrictionResults = checkSpellRestrictions(locations, items, iLocation, iItem, isItemAllowed)
			isItemAllowed = spellRestrictionResults.isItemAllowed;

			//we are allowed to be placed here by normal restrictions, now we check requirement restrictions
			if(locationHasRestrictions == true)
			{
				locations = updateLocationRequirements(locations, locations[iLocation], items[iItem]);
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
						rom[locations[iLocation].offset+1] = items[iItem].flags[2]; //set an item quantity for the spellbook replacement
					}

					if(items[iItem].item[0] != '' && items[iItem].location != '')
					{
						if ($('#display_hints').is(':checked'))
						{
							if(items[iItem].type == "main" || items[iItem].type == "shrine" || items[iItem].type == "spell")
							{
								addHint(rom, random, items[iItem].item[0], locations[iLocation].hints, hintLocations);
							}
						}
						spoilers.push(items[iItem].item[0] + ' located in ' + locations[iLocation].location);
					}
					items.splice(iItem, 1);
					locations.splice(iLocation, 1);
					break;
				}
				else if(locations[iLocation].offset < 0x0F) //dialog items
				{
					var locHex = locations[iLocation].offset;
					var itemHex = items[iItem].id;
					var flagHex = items[iItem].flags[2];
					if(locations[iLocation].offset == 0x01) //pocket of ariana
					{
						dialogItemAriana(rom, items[iItem].item[0], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x02) //pocket of antonio
					{
						dialogItemAntonio(rom, items[iItem].item[0], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x03) //pocket of selganor
					{
						dialogItemSelganor(rom, items[iItem].item[0], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x04) //pocket of lord british
					{
						dialogItemLordBritish(rom, items[iItem].item[0], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x05) //pocket of phoenix
					{
						dialogItemPhoenix(rom, items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x06) //pocket of ybarra
					{
						dialogItemYbarra(rom, items[iItem].item[0], items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x07) //pocket of whitsaber
					{
						dialogItemWhitsaber(rom, items[iItem].item[0], items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x08) //pocket of arturos
					{
						dialogItemArturos(rom, items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x09) //pocket of morchella
					{
						dialogItemMorchella(rom, items[iItem].item[0], items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x0A) //pocket of homer
					{
						dialogItemHomer(rom, items[iItem].item[0], items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x0B) //pocket of captain john
					{
						dialogItemCaptainJohn(rom, items[iItem].item[0], items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x0C) //pocket of the lensmaker
					{
						dialogItemLensmaker(rom, items[iItem].item[0], items[iItem].item[1], itemHex, flagHex);
					}
					else if(locations[iLocation].offset == 0x0D) //pocket of ephemerides
					{
						dialogItemEphemerides(rom, items[iItem].item[0], items[iItem].item[1], itemHex, flagHex);
					}
					if(items[iItem].item[0] != '' && items[iItem].location != '')
					{
						if ($('#display_hints').is(':checked'))
						{
							if(items[iItem].type == "main" || items[iItem].type == "shrine")
							{
								addHint(rom, random, items[iItem].item[0], locations[iLocation].hints, hintLocations);
							}
						}
						spoilers.push(items[iItem].item[0] + ' located in ' + locations[iLocation].location);
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
					if(items[iItem].item[0] != '' && items[iItem].location != '')
					{
						if ($('#display_hints').is(':checked'))
						{
							if(items[iItem].type == "main" || items[iItem].type == "shrine")
							{
								addHint(rom, random, items[iItem].item[0], locations[iLocation].hints, hintLocations);
							}
						}
						spoilers.push(items[iItem].item[0] + ' located in ' + locations[iLocation].location);
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
					console.log('ERROR - LAST ITEM WAS NOT ALLOWED IN LAST LOCATION - RANDOMIZING AGAIN');
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

function dialogItemAntonio(rom, itemText, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x60000);
	lzwData[0x950] = itemHex;
	lzwData[0x952] = itemQuantity;
	writeTextToAddress(lzwData, 0xB43, 16, "it again!");
	writeTextToAddress(lzwData, 0xB5F, 40, itemText);
	lzwData.set([0x0E], 0xB5F + itemText.length);
	writeTextToAddress(lzwData, 0xB5F + itemText.length + 1, 0, " Good luck!");
}

function dialogItemAriana(rom, itemText, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x49D00);
	lzwData[0x8B1] = itemHex;
	lzwData[0x8B3] = itemQuantity;
	lzwData.set([0x39, 0x4F, 0x55, 0x5F, 0x47, 0x45, 0x54, 0x5F], 0xDBB); //change to say YOU GET
	writeTextToAddress(lzwData, 0xDC3, 28, itemText);
	lzwData.set([0x0E], 0xDC3 + itemText.length);
}

function dialogItemLordBritish(rom, itemText, itemHex, itemQuantity)
{
	//lord british can NOT give any item with an item id that is higher than 7F
	var lzwData = decompressDataFromLZW(rom, 0x48000);
	lzwData.set([itemHex], 0x110F); //item ID
	lzwData.set([itemQuantity], 0x1111); //item quantity
	lzwData.set([0x0E, 0x02, 0x5F, 0x5F, 0x5F, 0x5F], 0x1F29); //clear mention of gems
	writeTextToAddress(lzwData, 0x1F8C, 28, itemText);
	lzwData.set([0x0E], 0x1F8C + itemText.length);
}

function dialogItemSelganor(rom, itemText, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x53900);
	lzwData[0x161F] = itemHex;
	lzwData[0x1621] = itemQuantity;
	lzwData.set([0x47, 0x49, 0x56, 0x45], 0x1B4A); //change HANDS to say GIVES
	writeTextToAddress(lzwData, 0x1B50, 29, itemText);
	lzwData.set([0x0E], 0x1B50 + itemText.length);
}

function dialogItemPhoenix(rom, itemText, itemHex, itemQuantity)
{
	//phoenix can NOT give any item with an item id that is higher than 7F
	//phoenix text requires short item text
	var lzwData = decompressDataFromLZW(rom, 0x1D700);
	lzwData[0x48] = itemHex;
	lzwData[0x4A] = itemQuantity;
	writeTextToAddress(lzwData, 0x198, 29, "You get ");
	writeTextToAddress(lzwData, 0x1A0, 21, itemText);
	lzwData.set([0x0E], 0x1A0 + itemText.length);
	writeTextToAddress(lzwData, 0x13C, 14, "I gave you it.");
}

function dialogItemYbarra(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	//ybarra text requires short item text
	var lzwData = decompressDataFromLZW(rom, 0x1D700);
	lzwData[0x11E4] = itemHex; //ensures no duplication of reward
	lzwData[0x1230] = itemHex;
	lzwData[0x1232] = itemQuantity;
	writeTextToAddress(lzwData, 0x14C9, 4, "Got ");
	writeTextToAddress(lzwData, 0x14CD, 0x17, itemTextLong);
	lzwData.set([0x0E], 0x14CD + itemTextLong.length);
	
	writeTextToAddress(lzwData, 0x1369, 4, "got "); //if you have the item already show the text of what you have
	writeTextToAddress(lzwData, 0x136D, 0x15, itemTextShort);
	lzwData.set([0x0E, 0x02], 0x136D + itemTextShort.length);
}

function dialogItemWhitsaber(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	//ybarra text requires short item text
	var lzwData = decompressDataFromLZW(rom, 0x55F80);
	lzwData[0x1904] = itemHex;
	lzwData[0x1906] = itemQuantity;
	writeTextToAddress(lzwData, 0x1E13, 0x23, "You get ");
	writeTextToAddress(lzwData, 0x1E1B, 0, itemTextLong);
	lzwData.set([0x0E], 0x1E1B + itemTextLong.length);

	writeTextToAddress(lzwData, 0x1AC7, 0x24, itemTextShort);
	var finishingText = ". Do you want more?";
	writeTextToAddress(lzwData, 0x1AC7 + itemTextShort.length, 0, finishingText);
	lzwData.set([0x02], 0x1AC7 + itemTextShort.length + finishingText.length);
}

function paladinJoke(rom)
{
	//paladin joke
	var lzwData = decompressDataFromLZW(rom, 0x55F80);
	writeTextToAddress(lzwData, 0x2440, 0x31, "I am a weaponsmith, and make weapons for the ");
	lzwData.set([0xFE, 0x20, 0x01, 0x02], 0x246D);
	writeTextToAddress(lzwData, 0x2473, 0x0A, "paladins");
	writeTextToAddress(lzwData, 0x247F, 0x5A, "What's a paladin? Why, Trinsic is the home of the "); //replaces "aye. just a few years ago i was a simple apprentice."
	lzwData.set([0xFE, 0x20, 0x01, 0x02, 0xF3], 0x24B1);
	writeTextToAddress(lzwData, 0x24B6, 0, "Dupre seems to hold back a laugh."); //replaces "now i supply arms to all of trinsic!"
}

function dialogItemArturos(rom, itemTextShort, itemHex, itemQuantity)
{
	//arturos text requires short item text
	var lzwData = decompressDataFromLZW(rom, 0x62E00);
	lzwData[0x2CBA] = itemHex; //ensures no duplication of reward
	lzwData[0x2E45] = itemHex;
	lzwData[0x2E47] = itemQuantity;
	writeTextToAddress(lzwData, 0x3DA9, 7, "Here's ");
	writeTextToAddress(lzwData, 0x3DB0, 0x38, itemTextShort);
	var finishingText = ". May fortune bring you gold."
	writeTextToAddress(lzwData, 0x3DB0 + itemTextShort.length, 0, finishingText);
	lzwData.set([0x02], 0x3DB0 + itemTextShort.length + finishingText.length);
	//writeTextToAddress(lzwData, 0x2EDC, 14, "I gave you it.");
	writeTextToAddress(lzwData, 0x2EDB, 0x10, itemTextShort+"."); //TODO - Reword Arturos dialog to give more room for "you have it already" text
}

function dialogItemMorchella(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x69E80);
	lzwData[0x1229] = itemHex;
	lzwData[0x122B] = itemQuantity;

	lzwData.set([
		0x02, 0x29, 0x5F, 0x57, 0x41, 0x53, 0x5F, 0x47, 0x4F, 0x49, 0x4E, 0x47, 0x5F,
		0x54, 0x4F, 0x5F, 0x47, 0x49, 0x56, 0x45, 0x5F, 0x54, 0x48, 0x49, 0x53, 0x5F, 0x4D, 0x41, 0x47,
		0x49, 0x43, 0x5F, 0xFE, 0x06, 0x5F, 0x54, 0x4F, 0x5F, 0xFE, 0x21, 0x0C, 0x5F, 0x42, 0x55, 0x54,
		0x5F, 0x4D, 0x45, 0x54, 0x48, 0x49, 0x4E, 0x4B, 0x53, 0x5F, 0x29, 0x07, 0x4C, 0x4C, 0x5F, 0x4B,
		0x45, 0x45, 0x50, 0x5F, 0x49, 0x54, 0x5F, 0x46, 0x4F, 0x52, 0x5F, 0x4D, 0x45, 0x53, 0x45, 0x4C,
		0x46, 0x5F, 0x49, 0x4E, 0x53, 0x54, 0x45, 0x41, 0x44, 0x01, 0x02, 0xF3
	], 0x166A); //0x58 long

	var itemTextPrefix = "She hands over to you ";
	writeTextToAddress(lzwData, 0x16C3, 0x4D, itemTextPrefix);
	writeTextToAddress(lzwData, 0x16C3 + itemTextPrefix.length, 0, itemTextLong);
	lzwData.set([0x0E, 0xF3, 0x02], 0x16C3 + itemTextPrefix.length + itemTextLong.length);
	var itemTextPostfix = "Good bye. Thank you!";
	writeTextToAddress(lzwData, 0x16C3 + itemTextPrefix.length + itemTextLong.length + 3, 0, itemTextPostfix);
	lzwData.set([0x02], 0x16C3 + itemTextPrefix.length + itemTextLong.length + 3 + itemTextPostfix.length);
}

function dialogItemHomer(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x5D480);
	lzwData[0x2D15] = itemHex;
	lzwData[0x2D17] = itemQuantity;
	writeTextToAddress(lzwData, 0x36C2, 0x24, "The item that you be after is hidden"); //"look for" or "be after" both fit
	var itemPreText = "He grins wickedly and hands you ";
	writeTextToAddress(lzwData, 0x3704, 0x3A, itemPreText);
	writeTextToAddress(lzwData, 0x3704 + itemPreText.length, 0, itemTextLong);
	lzwData.set([0x0E], 0x3704 + itemPreText.length + itemTextLong.length);

	//change homer dialog for belt
	writeTextToAddress(lzwData, 0x2F32, 0x15, "");
	lzwData.set([0xFE, 0x05, 0x0E], 0x2F32); //reference to theives guild to prevent soft lock

	//change budo dialog for belt
	var beltText = "He glances about quickly, taking notice that you have the "
	writeTextToAddress(lzwData, 0x2636, 0x40, beltText);
	lzwData.set([0xFE, 0x05, 0x0E], 0x2636 + beltText.length); //reference to belt to prevent soft lock
}

function dialogItemCaptainJohn(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	//captain john text requires short item text
	var lzwData = decompressDataFromLZW(rom, 0x1D700);
	lzwData[0x727] = itemHex; //ensures no duplication of reward
	lzwData[0x77D] = itemHex;
	lzwData[0x77F] = itemQuantity;

	writeTextToAddress(lzwData, 0x10C9, 0x2A, "Take this ");
	writeTextToAddress(lzwData, 0x10D3, 0, itemTextShort);
	lzwData.set([0x0E, 0xF3], 0x10D3 + itemTextShort.length);
	writeTextToAddress(lzwData, 0x10E4, 0, "Learn the basic ");
	writeTextToAddress(lzwData, 0x110E, 0, "You must use the scroll");
	
	//if you have the item already show the text of what you have
	var haveText01 = "I have learned the ";
	var haveText02 = " with the help of ";
	var haveText03 = " and ";
	writeTextToAddress(lzwData, 0xD6E, 0x47, haveText01); //I have learned the
	lzwData.set([0xFE, 0x03, 0x5F, 0xFE, 0x04], 0xD6E + haveText01.length); //gargoyle langauge
	writeTextToAddress(lzwData, 0xD6E + haveText01.length + 5, 0, haveText02); //with the help of
	lzwData.set([0xFE, 0x06], 0xD6E + haveText01.length + 5 + haveText02.length); //beh lem
	writeTextToAddress(lzwData, 0xD6E + haveText01.length + 5 + haveText02.length + 2, 0, haveText03); //and
	writeTextToAddress(lzwData, 0xD6E + haveText01.length + 5 + haveText02.length + 2 + haveText03.length, 0, itemTextShort);
	lzwData.set([0x0E, 0x02], 0xD6E + haveText01.length + 5 + haveText02.length + 2 + haveText03.length + itemTextShort.length);
}

function dialogItemLensmaker(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x6D480);
	lzwData[0xB9] = itemHex;
	lzwData[0xBB] = itemQuantity;

	//writeTextToAddress(lzwData, 0x10C9, 0x2A, "Take this ");
	//writeTextToAddress(lzwData, 0x10D3, 0, itemTextShort);
	//lzwData.set([0x0E, 0xF3], 0x10D3 + itemTextShort.length);
	//writeTextToAddress(lzwData, 0x10E4, 0, "Learn the basic ");
	//writeTextToAddress(lzwData, 0x110E, 0, "You must use the scroll");
}

function dialogItemEphemerides(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x4B900);
	lzwData[0x2037] = itemHex;
	lzwData[0x2039] = itemQuantity;

	//writeTextToAddress(lzwData, 0x10C9, 0x2A, "Take this ");
	//writeTextToAddress(lzwData, 0x10D3, 0, itemTextShort);
	//lzwData.set([0x0E, 0xF3], 0x10D3 + itemTextShort.length);
	//writeTextToAddress(lzwData, 0x10E4, 0, "Learn the basic ");
	//writeTextToAddress(lzwData, 0x110E, 0, "You must use the scroll");
}

function setDrCatReward(rom, random)
{
	var lzwData = decompressDataFromLZW(rom, 0x5D480);

	//set random amount of gold reward
	var goldChoices = [
		{gold:[0x80,0xC8], weight:30, text:[0x12, 0x10, 0x10]}, //200
		{gold:[0x80,0xFA], weight:25, text:[0x12, 0x15, 0x10]}, //250
		{gold:[0x81,0x2C], weight:20, text:[0x13, 0x10, 0x10]}, //300
		{gold:[0x81,0x5E], weight:15, text:[0x13, 0x15, 0x10]}, //350
		{gold:[0x81,0x90], weight:10, text:[0x14, 0x10, 0x10]}, //400
		{gold:[0x81,0xC2], weight:5, text:[0x14, 0x15, 0x10]}, //450
		{gold:[0x81,0xF4], weight:1, text:[0x15, 0x10, 0x10]}, //500
	];

	var goldAmount = random.fromWeighted(goldChoices)
	lzwData.set(goldAmount.gold, 0x32C);
	lzwData.set(goldAmount.text, 0xF58);
}

function getItemsFromPool(itemPool)
{
    var items = [];

    for(var i = 0; i < itemPool.length; ++i)
    {
        items.push(itemPool[i]);
    }

    return items;
}

function setRandomWorldItem(rom, random, itemPool, address)
{
	var chosenPool = random.fromWeighted(itemPool)
	var chosenItem = random.nextIntRange(0,chosenPool.items.length);
	var randQuantity = random.nextIntRange(0xC1,chosenPool.quantity[chosenItem]);

	rom.set([randQuantity, chosenPool.items[chosenItem]], address);
}

function randomizeCastleBritanniaContents(rom, random)
{
	var itemPool = [];
	itemPool = getItemsFromPool(DATA_CASTLE_BRITANNIA_ITEMS);

	//Lord British's Closet
	setRandomWorldItem(rom, random, itemPool, 0x10FBE+2);
	setRandomWorldItem(rom, random, itemPool, 0x10FC2+2);
	setRandomWorldItem(rom, random, itemPool, 0x10FC6+2);
	setRandomWorldItem(rom, random, itemPool, 0x10FB2+2);
	setRandomWorldItem(rom, random, itemPool, 0x10FB6+2);

	//Avatar Room
	setRandomWorldItem(rom, random, itemPool, 0x11036+2);
	setRandomWorldItem(rom, random, itemPool, 0x1103A+2);
	setRandomWorldItem(rom, random, itemPool, 0x1103E+2);
	setRandomWorldItem(rom, random, itemPool, 0x11042+2);
	setRandomWorldItem(rom, random, itemPool, 0x11046+2);
	setRandomWorldItem(rom, random, itemPool, 0x1104A+2);
	setRandomWorldItem(rom, random, itemPool, 0x1104E+2);
	setRandomWorldItem(rom, random, itemPool, 0x11052+2);
	setRandomWorldItem(rom, random, itemPool, 0x11056+2);
	setRandomWorldItem(rom, random, itemPool, 0x1105A+2);
	setRandomWorldItem(rom, random, itemPool, 0x1105E+2);

	//Nystful Room
	setRandomWorldItem(rom, random, itemPool, 0x1106A+2);

	//NW Tower
	setRandomWorldItem(rom, random, itemPool, 0x10FAA+2);

	//SE Storage
	setRandomWorldItem(rom, random, itemPool, 0x11096+2);
	setRandomWorldItem(rom, random, itemPool, 0x1109A+2);
	setRandomWorldItem(rom, random, itemPool, 0x11092+2);
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
