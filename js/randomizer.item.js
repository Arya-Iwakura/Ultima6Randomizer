const SHRINE_HONESTY      = 0x11E1E;
const SHRINE_COMPASSION   = 0x11E14;
const SHRINE_VALOR        = 0x11E37;
const SHRINE_JUSTICE      = 0x11DE2;
const SHRINE_SACRIFICE    = 0x11DF1;
const SHRINE_HONOR        = 0x11E3C;
const SHRINE_SPIRITUALITY = 0x11686;
const SHRINE_HUMILTY      = 0x11E46;

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

	//move map 4 from crate to chest
	rom.set([0xEB, 0x35, 0x80, 0xA0], 0x116E6); //dagger island - house basement - move map piece
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
	lzwData.set([0xF1], 0x1209); //add rudyom shop chest (no lock)
	lzwData.set([0xF1], 0x115B); //add stonegate upper floor chest (no lock)
	
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
	lzwData[0x3911] = 0x21; //change cove grapes location to a chest

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

	//Horance Chest
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0xD8000);
	lzwData.set([0x63], 0x19C4); //change red potion in horance shop to a chest

	//Iolo Chest and Empath Abbey Chest
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0x70000);
	lzwData[0x1FC6] = 0xF1; //iolo chest - no lock
	lzwData.set([0xF2], 0x1DD6); //empath abbey house chest - magic lock
	lzwData.set([0xF2], 0x1CDA); //empath abbey castle chest - magic lock

	//convert items
	rom.set([0x82, 0x32, 0xD8, 0x56], 0x10EF1); //swap item placements in iolo hut
	rom.set([0x85, 0x31, 0xE3, 0x55], 0x10EF5); //swap item placements in iolo hut
	rom.set([0x85, 0x31, 0xC8, 0x6A], 0x10EF9); //swap item placements in iolo hut

	//Lycaeum Entrance Floor Chest
	var lzwData = decompressDataFromLZW(rom, 0x73680);
	lzwData.set([0xF1], 0x267E); //change far left crate to chest

	//Underground - Floor 1 Chests
	//add new chest graphics
	var lzwData = decompressDataFromLZW(rom, 0x9D000);
	lzwData[0x27EB] = 0x42; //add sherry chest (magic lock)
	//lzwData.set([0x41], 0x54C); //lycaeum - boardgame (shifted off the pedestal one tile)
	//lzwData.set([0x41], 0x19E5); //lycaeum - oz (shifted off the pedestal one tile)
	lzwData.set([0x41], 0x54B); //lycaeum - boardgame
	lzwData.set([0x41], 0x19E6); //lycaeum - oz
	lzwData[0x5B5] = 0x41; //shame - f1 chest - add chest graphic
	lzwData[0x5AF] = 0x00; //shame - f1 chest - remove item graphic
	lzwData[0x216F] = 0x41; //britain sewers - f1 chest - change crate to chest graphic
	lzwData[0x3EF] = 0x00; //sutek - f1 chest - remove red potion graphic
	lzwData[0x44B] = 0x41; //sutek - f1 chest - add chest graphic
	lzwData[0xBF6] = 0x41; //despise - f1 chest - replaces milk

	rom.set([0xC9, 0xF1, 0x00, 0x8D], 0x11806); //move red potion to chest

	//rom.set([0xEA],0x1175E); //move book of boardgames over one tile
	//rom.set([0xEB],0x1174E); //move book of oz over one tile
	rom.set([0x19, 0x8D, 0x80, 0x43], 0x117CA); //convert spring water to cheese for sherry chest
	rom.set([0x2B, 0x5E, 0x00, 0x15], 0x11736); //move leather boots and convert for shame f1 chest
	rom.set([0x45, 0x7D, 0x80, 0x8F], 0x1172E); //move wood ladder and convert for britain sewers f1 chest

	//Underground - Floor 2 Chests
	var lzwData = decompressDataFromLZW(rom, 0x09DA00);
	lzwData[0x1192] = 0x07; //spider cave - add f2 chest graphic
	lzwData[0x11BA] = 0x00; //spider cave - remove spiked collar graphic
	lzwData[0x3312] = 0x07; //swamp cave - add f2 chest graphic (replaces mace graphic)
	lzwData[0x39CB] = 0x07; //wrong / covetous - add 07 chest graphic (08 locked) (replaces powder keg)
	lzwData[0x2D1C] = 0x08; //destard - add chest graphic (08 locked) (replaces glass sword)
	lzwData[0x34B1] = 0x07; //despise - add chest graphic (08 locked) (replaces ring of protection)
	lzwData[0x34B9] = 0x66; //despise - moving ring of protection graphic
	lzwData[0x34DC] = 0x00; //despise - removing ring of protection graphic
	lzwData[0x3522] = 0x00; //despise - removing ring of protection graphic
	//lzwData[0x31E7] = 0x07; //heftimus - add 07 chest graphic (08 locked)
	
	rom.set([0x0F, 0x2D, 0x00, 0x31], 0x1188D); //despise - move ring of protection to new chest
	rom.set([0x0F, 0x2E, 0x00, 0x31], 0x11891); //despise - move ring of protection to reachable location

	rom.set([0x18, 0x4A, 0x00, 0x18], 0x118C9); //spider cave - move spiked collar into chest

	//Underground - Floor 3 Chests
	var lzwData = decompressDataFromLZW(rom, 0x9E300);
	lzwData[0x525] = 0x91; //shame f3 - replace magic bow graphic with chest (0x92 is locked)
	lzwData[0x10AD] = 0x91; //despise f3 - replace white potion graphic with chest (0x92 is locked)
	lzwData[0x13D5] = 0x47; //despise f3 - change volcano to bear trap to prevent stuckage
	lzwData[0x3B59] = 0x00; //cyclops cave f3 - remove powder keg to move to hythloth
	lzwData[0x2D12] = 0x91; //hythloth f3 - add f3 chest (0x92 is locked)

	rom.set([0xE0, 0xCA, 0x00, 0x7C], 0x11AF0); //move powder keg from cyclops cave to hythloth lava room
	rom.set([0x4B, 0x35, 0x00, 0x17], 0x11A68); //convert white potion to magic armor - despise f3

	//Underground - Floor 4 Chests
	var lzwData = decompressDataFromLZW(rom, 0x9EC00);
	lzwData[0x859] = 0x59; //king's tomb chest
	lzwData[0x2E4A] = 0x59; //ant mound - add f4 chest graphic
	lzwData[0x2765] = 0x59; //swamp cave - add f4 chest graphic
	lzwData[0x120D] = 0x59; //change Vortex Cube location to a chest
	lzwData[0x2D2F] = 0x59; //destard - add f4 chest graphic (59 is chest and 5A is locked)

	lzwData[0x346D] = 0x59; //deceit - add f4 chest graphic to body chest (59 is chest and 5A is locked)
	rom.set([0xE3, 0x05, 0x80, 0x32], 0x11B77); //deceit - move item 1 left off of body into new chest
	lzwData[0x3461] = 0xB9; //deceit - add energy field to body chest

	//deceit f4 cage chest and energy fields
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
	consoleLog("ADDING NEW ARMOR ITEMS");
	
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

function randomizeItems(rom, random, spoilers, hintsSpoiler, partyMembers)
{
	var items = [];
	var hintLocations = [];

	//build a locations list based on the selected location types
	var selectedLocationTypes = getSelectedLocationTypesList();
	var locations = buildSelectedLocationsList(selectedLocationTypes.selectedLocations);
	locations = removePartyMemberLocations(locations, partyMembers);
	//locations.shuffle(random);

	//build a progression items list based on the selected progression items (shuffle this list)
	var progressionItems = getSelectedProgressionItemsList();

	//from the list of selected locations generate a list of locations that contain those items and a seperate of those locations that do not
	var locationsItemsSeperated = getLocationsWithSpecificItems(locations, progressionItems); //returns an object that contains three lists, withItems, withoutItems, foundItems, missingItems
	locationsItemsSeperated.withItems.shuffle(random); //we shuffle the items lists seperately as we want to place progression items first
	locationsItemsSeperated.withoutItems.shuffle(random); //we shuffle the items lists seperately as we want to place progression items first
	
	if(locations.length > progressionItems.length)
	{
		//enough locations were selected to cover all default progression item placements
		if(locationsItemsSeperated.withItems.length == progressionItems.length)
		{
			//all progression items are accounted for already so simply copy the lists
			//for(var i = 0; i < locations.length; ++i)
			//{
			//	items.push(locations[i]);
			//}
			for(var i = 0; i < locationsItemsSeperated.withItems.length; ++i)
			{
				items.push(locationsItemsSeperated.withItems[i]);
			}
			for(var i = 0; i < locationsItemsSeperated.withoutItems.length; ++i)
			{
				items.push(locationsItemsSeperated.withoutItems[i]);
			}
		}
		else
		{
			//some progression items were missing so we need to get a list of those missing locations to avoid progression item duplication issues
			//identify any progression items that are missing and create a list of those missing locations (if they had original locations)
			var nonSelectedLocations = buildSelectedLocationsList(selectedLocationTypes.nonSelectedLocations);
			nonSelectedLocations = removePartyMemberLocations(nonSelectedLocations, partyMembers);
			var locationsOfMissingProgressionItems = getLocationsWithSpecificItems(nonSelectedLocations, locationsItemsSeperated.missingItems);
			locationsItemsSeperated.withItems.shuffle(random);
			locationsOfMissingProgressionItems.withItems.shuffle(random);
			locationsItemsSeperated.withoutItems.shuffle(random);

			for(var i = 0; i < locationsItemsSeperated.withItems.length; ++i)
			{
				items.push(locationsItemsSeperated.withItems[i]); //add items from locations from the initial list that had progression items
			}
			for(var i = 0; i < locationsOfMissingProgressionItems.withItems.length; ++i)
			{
				items.push(locationsOfMissingProgressionItems.withItems[i]); //add items from locations from the missing progression item locations list
			}

			//add the remaining withoutItems locations if there is room to add them - we remove an amount based on how many missing progression items we had to add
			var replacementItems = [];
			var totalItemsLeftToReplace = locationsOfMissingProgressionItems.withItems.length;
			for(var i = 0; i < locationsItemsSeperated.withoutItems.length; ++i)
			{
				if(totalItemsLeftToReplace > 0)
				{
					//replacementItems.push(locationsItemsSeperated.withoutItems[i]); //mark this location as one to use as a replacement item
					totalItemsLeftToReplace -=1;
				}
				else
				{
					items.push(locationsItemsSeperated.withoutItems[i]); //we are done marking replacement items so add the rest of the list
				}
			}
			
			replacementItems = randomizeReplacedLocations(rom, random, locationsOfMissingProgressionItems.withItems);
			var otherItems = locationsOfMissingProgressionItems.withoutItems.concat(replacementItems);
			var otherLocations = locationsOfMissingProgressionItems.withoutItems.concat(locationsOfMissingProgressionItems.withItems);
			otherLocations = sortAndShuffleLocations(random, otherLocations);
			placeItemsInLocations(rom, random, otherItems, otherLocations, spoilers, [], []); //place non-estential items
		}
	}
	else
	{
		//not enough locations were selected
		for(var i = 0; i < locations.length; ++i)
		{
			items.push(locations[i]);
		}
	}

	if(items.length != locations.length)
	{
		consoleError('ERROR - Items length and Locations length are not the same' + items.length + " != " + locations.length);
		consoleError(items);
		consoleError(locations);
		return;
	}

	locations = sortAndShuffleLocations(random, locations);
	items = sortAndShuffleItems(random, items);
	hintLocations = getHintLocations();
	var isDonePlacingItems = placeItemsInLocations(rom, random, items, locations, spoilers, hintLocations, hintsSpoiler);

	return isDonePlacingItems;
}

function getSelectedLocationTypesList()
{
	var selectedLocationTypes = [];
	var nonSelectedLocationTypes = [];

	var joinableSubLists = getJoinableLocationsSublists();
	selectedLocationTypes = selectedLocationTypes.concat(joinableSubLists.selectedLocationTypes);
	nonSelectedLocationTypes = nonSelectedLocationTypes.concat(joinableSubLists.nonSelectedLocationTypes);

	var castleSubLists = getCastleLocationsSublists();
	selectedLocationTypes = selectedLocationTypes.concat(castleSubLists.selectedLocationTypes);
	nonSelectedLocationTypes = nonSelectedLocationTypes.concat(castleSubLists.nonSelectedLocationTypes);
	
	if ($('#randomize_locations_townsvirtue').is(':checked'))
	{
		selectedLocationTypes.push("towns_virtue");
		if ($('#add_sherry_item').is(':checked')) //sherry odd cheese chest
		{
			selectedLocationTypes.push("towns_virtue_oddcheese");
		}
		else
		{
			selectedLocationTypes.push("towns_virtue_no_oddcheese");
		}
		if ($('#randomize_unlockanddispel').is(':checked')) //unlock and dispel field chests
		{
			selectedLocationTypes.push("towns_virtue_unlockdispel");
		}
		else
		{
			selectedLocationTypes.push("towns_virtue_no_unlockdispel");
		}
	}
	else
	{
		nonSelectedLocationTypes.push("towns_virtue");
		if ($('#add_sherry_item').is(':checked')) //sherry odd cheese chest
		{
			nonSelectedLocationTypes.push("towns_virtue_oddcheese");
		}
		else
		{
			nonSelectedLocationTypes.push("towns_virtue_no_oddcheese");
		}
		if ($('#randomize_unlockanddispel').is(':checked')) //unlock and dispel field chests
		{
			nonSelectedLocationTypes.push("towns_virtue_unlockdispel");
		}
		else
		{
			nonSelectedLocationTypes.push("towns_virtue_no_unlockdispel");
		}
	}
	if ($('#randomize_locations_townsnonvirtue').is(':checked')){selectedLocationTypes.push("towns_nonvirtue");}else{nonSelectedLocationTypes.push("towns_nonvirtue");}
	if ($('#randomize_locations_overworld').is(':checked')){selectedLocationTypes.push("overworld");}else{nonSelectedLocationTypes.push("overworld");}
	if ($('#randomize_locations_dialog').is(':checked')){selectedLocationTypes.push("dialog");}else{nonSelectedLocationTypes.push("dialog");}
	if ($('#randomize_locations_treasuremap').is(':checked')){selectedLocationTypes.push("treasuremap");}else{nonSelectedLocationTypes.push("treasuremap");}

	var caveSubLists = getCaveLocationsSublists();
	selectedLocationTypes = selectedLocationTypes.concat(caveSubLists.selectedLocationTypes);
	nonSelectedLocationTypes = nonSelectedLocationTypes.concat(caveSubLists.nonSelectedLocationTypes);

	if ($('#randomize_locations_tombs').is(':checked')){selectedLocationTypes.push("tombs");}else{nonSelectedLocationTypes.push("tombs");}

	var dungeonsSubLists = getDungeonLocationsSublists();
	selectedLocationTypes = selectedLocationTypes.concat(dungeonsSubLists.selectedLocationTypes);
	nonSelectedLocationTypes = nonSelectedLocationTypes.concat(dungeonsSubLists.nonSelectedLocationTypes);

	if ($('#randomize_locations_shrines').is(':checked')){selectedLocationTypes.push("shrines");}else{nonSelectedLocationTypes.push("shrines");}
	if ($('#randomize_locations_gargoylecity').is(':checked')){selectedLocationTypes.push("gargoylecity");}else{nonSelectedLocationTypes.push("gargoylecity");}
	if ($('#randomize_moonorb').is(':checked'))
	{
		if ($('#remove_moonorb').is(':checked'))
		{
			selectedLocationTypes.push("playerinventory_slot1_no_moonorb");
		}
		else
		{
			selectedLocationTypes.push("playerinventory_slot1");
		}
	}
	if ($('#randomize_spellbook').is(':checked')){selectedLocationTypes.push("playerinventory_slot2");}

	return {
				selectedLocations:selectedLocationTypes,
				nonSelectedLocations:nonSelectedLocationTypes,
			};
}

function getCastleLocationsSublists()
{
	var selectedLocationTypes = [];
	var nonSelectedLocationTypes = [];
	if ($('#randomize_locations_castles').is(':checked'))
	{
		if ($('#randomize_locations_advanced').is(':checked'))
		{
			var locationCount = 0;
			if($('#randomize_locations_castles_britannia').is(':checked')){	selectedLocationTypes.push("castles_britannia");}else{nonSelectedLocationTypes.push("castles_britannia");}
			if($('#randomize_locations_castles_empathabbey').is(':checked')){	selectedLocationTypes.push("castles_empath");}else{nonSelectedLocationTypes.push("castles_empath");}
			if($('#randomize_locations_castles_lycaeum').is(':checked')){	selectedLocationTypes.push("castles_lycaeum");}else{nonSelectedLocationTypes.push("castles_lycaeum");}
			if($('#randomize_locations_castles_serpentshold').is(':checked')){	selectedLocationTypes.push("castles_shold");}else{nonSelectedLocationTypes.push("castles_shold");}
			if($('#randomize_locations_castles_stonegate').is(':checked')){	selectedLocationTypes.push("castles_stonegate");}else{nonSelectedLocationTypes.push("castles_stonegate");}
			if($('#randomize_locations_castles_sutekscastle').is(':checked')){	selectedLocationTypes.push("castles_sutek");}else{nonSelectedLocationTypes.push("castles_sutek");}
		}
		else
		{
			selectedLocationTypes.push("castles");
		}
	}
	else
	{
		nonSelectedLocationTypes.push("castles");
	}
	return {
		selectedLocationTypes:selectedLocationTypes,
		nonSelectedLocationTypes:nonSelectedLocationTypes,
	};
}

function getCaveLocationsSublists()
{
	var selectedLocationTypes = [];
	var nonSelectedLocationTypes = [];
	if ($('#randomize_locations_caves').is(':checked'))
	{
		if ($('#randomize_locations_advanced').is(':checked'))
		{
			var locationCount = 0;
			if($('#randomize_locations_caves_antmound').is(':checked')){	selectedLocationTypes.push("caves_ant");}else{nonSelectedLocationTypes.push("caves_ant");}
			if($('#randomize_locations_caves_sewers').is(':checked')){	selectedLocationTypes.push("caves_sewers");}else{nonSelectedLocationTypes.push("caves_sewers");}
			if($('#randomize_locations_caves_cyclopscave').is(':checked')){	selectedLocationTypes.push("caves_cyclops");}else{nonSelectedLocationTypes.push("caves_cyclops");}
			if($('#randomize_locations_caves_piratecave').is(':checked')){	selectedLocationTypes.push("caves_pirate");}else{nonSelectedLocationTypes.push("caves_pirate");}
			if($('#randomize_locations_caves_spidercave').is(':checked')){	selectedLocationTypes.push("caves_spider");}else{nonSelectedLocationTypes.push("caves_spider");}
			if($('#randomize_locations_caves_swampcave').is(':checked')){	selectedLocationTypes.push("caves_swamp");}else{nonSelectedLocationTypes.push("caves_swamp");}
		}
		else
		{
			selectedLocationTypes.push("caves");
		}
	}
	else
	{
		nonSelectedLocationTypes.push("caves");
	}
	return {
		selectedLocationTypes:selectedLocationTypes,
		nonSelectedLocationTypes:nonSelectedLocationTypes,
	};
}

function getDungeonLocationsSublists()
{
	var selectedLocationTypes = [];
	var nonSelectedLocationTypes = [];
	if ($('#randomize_locations_dungeons').is(':checked'))
	{
		if ($('#randomize_locations_advanced').is(':checked'))
		{
			var locationCount = 0;
			if($('#randomize_locations_dungeons_deceit').is(':checked')){	selectedLocationTypes.push("dungeons_deceit");}else{nonSelectedLocationTypes.push("dungeons_deceit");}
			if($('#randomize_locations_dungeons_despise').is(':checked')){	selectedLocationTypes.push("dungeons_despise");}else{nonSelectedLocationTypes.push("dungeons_despise");}
			if($('#randomize_locations_dungeons_destard').is(':checked')){	selectedLocationTypes.push("dungeons_destard");}else{nonSelectedLocationTypes.push("dungeons_destard");}
			if($('#randomize_locations_dungeons_hythloth').is(':checked')){	selectedLocationTypes.push("dungeons_hythloth");}else{nonSelectedLocationTypes.push("dungeons_hythloth");}
			if($('#randomize_locations_dungeons_shame').is(':checked')){	selectedLocationTypes.push("dungeons_shame");}else{nonSelectedLocationTypes.push("dungeons_shame");}
			if($('#randomize_locations_dungeons_wrongcovetous').is(':checked')){	selectedLocationTypes.push("dungeons_wrong");}else{nonSelectedLocationTypes.push("dungeons_wrong");}
		}
		else
		{
			selectedLocationTypes.push("dungeons");
		}
	}
	else
	{
		nonSelectedLocationTypes.push("dungeons");
	}
	return {
		selectedLocationTypes:selectedLocationTypes,
		nonSelectedLocationTypes:nonSelectedLocationTypes,
	};
}

function getJoinableLocationsSublists()
{
	var selectedLocationTypes = [];
	var nonSelectedLocationTypes = [];
	if ($('#randomize_locations_joinablepartymembers').is(':checked'))
	{
		if ($('#randomize_locations_advanced').is(':checked'))
		{
			var locationCount = 0;
			if($('#randomize_locations_joinable_behlem').is(':checked')){	selectedLocationTypes.push("joinable_behlem");}else{nonSelectedLocationTypes.push("joinable_behlem");}
			if($('#randomize_locations_joinable_blaine').is(':checked')){	selectedLocationTypes.push("joinable_blaine");}else{nonSelectedLocationTypes.push("joinable_blaine");}
			if($('#randomize_locations_joinable_dupre').is(':checked')){	selectedLocationTypes.push("joinable_dupre");}else{nonSelectedLocationTypes.push("joinable_dupre");}
			if($('#randomize_locations_joinable_gorn').is(':checked')){	selectedLocationTypes.push("joinable_gorn");}else{nonSelectedLocationTypes.push("joinable_gorn");}
			if($('#randomize_locations_joinable_gwenno').is(':checked')){	selectedLocationTypes.push("joinable_gwenno");}else{nonSelectedLocationTypes.push("joinable_gwenno");}
			if($('#randomize_locations_joinable_iolo').is(':checked')){	selectedLocationTypes.push("joinable_iolo");}else{nonSelectedLocationTypes.push("joinable_iolo");}
			if($('#randomize_locations_joinable_jaana').is(':checked')){	selectedLocationTypes.push("joinable_jaana");}else{nonSelectedLocationTypes.push("joinable_jaana");}
			if($('#randomize_locations_joinable_julia').is(':checked')){	selectedLocationTypes.push("joinable_julia");}else{nonSelectedLocationTypes.push("joinable_julia");}
			if($('#randomize_locations_joinable_katrina').is(':checked')){	selectedLocationTypes.push("joinable_katrina");}else{nonSelectedLocationTypes.push("joinable_katrina");}
			if($('#randomize_locations_joinable_leodon').is(':checked')){	selectedLocationTypes.push("joinable_leodon");}else{nonSelectedLocationTypes.push("joinable_leodon");}
			if($('#randomize_locations_joinable_leonna').is(':checked')){	selectedLocationTypes.push("joinable_leonna");}else{nonSelectedLocationTypes.push("joinable_leonna");}
			if($('#randomize_locations_joinable_seggal').is(':checked')){	selectedLocationTypes.push("joinable_seggal");}else{nonSelectedLocationTypes.push("joinable_seggal");}
			if($('#randomize_locations_joinable_sentri').is(':checked')){	selectedLocationTypes.push("joinable_sentri");}else{nonSelectedLocationTypes.push("joinable_sentri");}
			if($('#randomize_locations_joinable_shamino').is(':checked')){	selectedLocationTypes.push("joinable_shamino");}else{nonSelectedLocationTypes.push("joinable_shamino");}
		}
		else
		{
			selectedLocationTypes.push("joinablepartymembers");
		}
	}
	else
	{
		nonSelectedLocationTypes.push("joinablepartymembers");
	}
	return {
		selectedLocationTypes:selectedLocationTypes,
		nonSelectedLocationTypes:nonSelectedLocationTypes,
	};
}

function buildSelectedLocationsList(selectedLocationTypes)
{
	var locations = [];

	for(var iLocation = 0; iLocation < DATA_WORLD_LOCATIONS.length; ++iLocation)
	{
		typeSearch:
		for(var iSelectedType = 0; iSelectedType < selectedLocationTypes.length; ++iSelectedType)
		{
			for(var iDataTypes = 0; iDataTypes < DATA_WORLD_LOCATIONS[iLocation].location_types.length; ++iDataTypes)
			{
				if(selectedLocationTypes[iSelectedType] == DATA_WORLD_LOCATIONS[iLocation].location_types[iDataTypes])
				{
					if(locations.includes(DATA_WORLD_LOCATIONS[iLocation]) == false)
					{
						locations.push(DATA_WORLD_LOCATIONS[iLocation]);
						break typeSearch;
					}
				}
			}
		}
	}

	return locations;
}

function removePartyMemberLocations(locations, partyMembers)
{
	var prunedLocations = [];
	for(var i = 0; i < locations.length; ++i)
	{
		var shouldAdd = true;
		for(var j = 0; j < partyMembers.length; ++j)
		{
			if(locations[i].name == partyMembers[j].inventoryName)
			{
				shouldAdd = false;
				break;
			}
		}
		if(shouldAdd == true)
		{
			prunedLocations.push(locations[i]);
		}
	}
	return prunedLocations;
}

function getSelectedProgressionItemsList()
{
	var progressionItems = [];
	progressionItems = progressionItems.concat(PROGRESSION_CORE); //always add the core items
	if ($('#randomize_locations_overworld').is(':checked')){progressionItems = progressionItems.concat(PROGRESSION_OVERWORLD);}
	if ($('#randomize_locations_treasuremap').is(':checked')){progressionItems = progressionItems.concat(PROGRESSION_TREASUREMAP);}
	if ($('#randomize_locations_dialog').is(':checked')){progressionItems = progressionItems.concat(PROGRESSION_DIALOG);}
	if ($('#randomize_locations_shrines').is(':checked')){progressionItems = progressionItems.concat(PROGRESSION_SHRINES);}
	if ($('#randomize_moonorb').is(':checked'))
	{
		if ($('#remove_moonorb').is(':checked') == false)
		{
			progressionItems = progressionItems.concat(PROGRESSION_MOONORB);
		}
	}
	if ($('#randomize_spellbook').is(':checked')){progressionItems = progressionItems.concat(PROGRESSION_SPELLBOOK);}
	if ($('#randomize_unlockanddispel').is(':checked')){progressionItems = progressionItems.concat(PROGRESSION_SPELLS);}
	if ($('#add_sherry_item').is(':checked')){progressionItems = progressionItems.concat(PROGRESSION_ODD_CHEESE);}
	return progressionItems;
}

function getLocationsWithSpecificItems(locations, items)
{
	var withItemsList = [];
	var withoutItemsList = [];
	var foundItemsList = [];
	var missingItemsList = [];

	for(var iLocation = 0; iLocation < locations.length; ++iLocation)
	{
		for(var iItem = 0; iItem < items.length; ++iItem)
		{
			if(locations[iLocation].id == items[iItem])
			{
				foundItemsList.push(items[iItem]);
				withItemsList.push(locations[iLocation]); //we found a match - item
				break;
			}
			else if(locations[iLocation].id[0] == ITEM_SPELL || locations[iLocation].id[0] == ITEM_KEY)
			{
				if(locations[iLocation].flags[0] == items[iItem])
				{
					foundItemsList.push(items[iItem]);
					withItemsList.push(locations[iLocation]); //we found a match - spell
					break;
				}
			}
			if(iItem == items.length-1)
			{
				withoutItemsList.push(locations[iLocation]); //we did not find a match
			}
		}
	}

	for(var iItem = 0; iItem < items.length; ++iItem)
	{
		if(foundItemsList.contains(items[iItem]) == false)
		{
			missingItemsList.push(items[iItem]);
		}
	}

	return {
				withItems:withItemsList,
				withoutItems:withoutItemsList,
				foundItems:foundItemsList,
				missingItems:missingItemsList,
			};
}

function sortAndShuffleLocations(random, locations)
{
	//to help prevent failed placements when near the end of the item placement step we shuffle the restricted and unrestricted locations seperately
	//then attempt to place in restricted locations first
	var restrictedLocations = [];
	var requiresLocations = [];
	var unrestrictedLocations = [];

	restrictedLocations = $.grep(locations, function(x){ return x.restrictions.length != 0; });
	unrestrictedLocations = $.grep(locations, function(x){ return x.restrictions.length == 0; });

	//sort items that have requirements out from the list with restrictions
	for(var i = 0; i < restrictedLocations.length; ++i)
	{
		if(restrictedLocations[i].requires.length > 0)
		{
			var removedSingleItem = restrictedLocations.splice(i,1);
			requiresLocations.push(removedSingleItem[0]);
		}
	}

	requiresLocations.shuffle(random);
	restrictedLocations.shuffle(random);
	unrestrictedLocations.shuffle(random);

	restrictedLocations = requiresLocations.concat(restrictedLocations);
	locations = restrictedLocations.concat(unrestrictedLocations);

	return locations;
}

function sortAndShuffleItems(random, items)
{
	//we want to place a select set of non-key flagged progression items first to help ensure some of them end up in locked locations
	var numItemsToSortOut = 4;
	var removedItems = [];
	for(var i = 0; i < items.length; i++)
	{
		var isKeyItem = (items[i].progression_flags & 0x01);
		if(items[i].progression_flags > 0x00 && isKeyItem == 0)
		{
			var removedSingleItem = items.splice(i,1);
			removedItems.push(removedSingleItem[0]);
			if(removedItems.length == numItemsToSortOut)
			{
				break;
			}
		}
	}
	items.shuffle(random);
	items = removedItems.concat(items);

	return items;
}

function checkRestrictions(location, item, itemHex, itemFlags, isItemAllowed)
{
	var locationHasRestrictions = false;

	if(location.restrictions.length > 0)
	{
		locationHasRestrictions = true;
		
		if(location.type == "shrine" && item.type == "stack") //if we are attempting to place a stacked item at a shrine then set as not allowed to place here
		{
			isItemAllowed = 0;
		}
		else if(location.id == ITEM_RUNE_VALOR && item.type == "stack") //if we are attempting to place a stacked item at the rune of valor then set as not allowed to place here
		{
			isItemAllowed = 0;
		}
		else
		{
			if(location.offset == 0x04 || location.offset == 0x05 || location.offset == 0x0F || location.offset == 0x10) //Lord British, Phoenix, Papa, Manrel can not give items above 0x7F
			{
				if(itemHex > 0x7F)
				{
					isItemAllowed = 0;
				}
			}

			if(isItemAllowed)
			{
				var rArray = [];
				rArray = rArray.concat(location.restrictions);
				rArray = rArray.concat(location.requires);
				rArray = rArray.concat(location.addedRequires);
				for(var iRA = 0; iRA < rArray.length; ++iRA)
				{
					if((itemHex == ITEM_SPELL && itemFlags > 0xC0) || (itemHex == ITEM_KEY && itemFlags > 0xC0))
					{
						if(rArray[iRA] == itemFlags)
						{
							isItemAllowed = 0;
							break;
						}
					}
					else
					{
						if(rArray[iRA] == itemHex)
						{
							isItemAllowed = 0;
							break;
						}
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

function clearedAddedRequirements(locations)
{
	for(var iLocation = 0; iLocation < locations.length; ++iLocation)
	{
		locations[iLocation].addedRequires = [];
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
			else if( (inItem.id == ITEM_SPELL || inItem.id == ITEM_KEY) && locations[iLocation].requires[iRequires] == inItem.flags[0])
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
			else if( (inItem.id == ITEM_SPELL || inItem.id == ITEM_KEY) && locations[iLocation].addedRequires[iRequires] == inItem.flags[0])
			{
				//add the placed location requirements to this location
				locations[iLocation] = addLocationRequirements(locations[iLocation], inLocation);
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

function placeItemsInLocations(rom, random, items, locations, spoilers, hintLocations, hintsSpoiler)
{
	var iItem = 0;
	var safetyCounter = 0;
	var wasSuccessful = false;
	var hintsToAddList = [];
	var spoilersToAddList = [];
	
	clearedAddedRequirements(locations);

	while (safetyCounter < 1000)
	{
		var iLocation = 0;

		for(iLocation = 0; iLocation < locations.length; ++iLocation)
		{
			var itemHex = items[iItem].id;
			var isItemAllowed = 1;
			var locationHasRestrictions = false;

			//check restrictions on location 
			var restrictionResults = checkRestrictions(locations[iLocation], items[iItem], itemHex, items[iItem].flags[0], isItemAllowed);
			isItemAllowed = restrictionResults.isItemAllowed;
			locationHasRestrictions = restrictionResults.locationHasRestrictions;

			//we are allowed to be placed here by normal restrictions, now we check requirement restrictions
			if(locationHasRestrictions == true)
			{
				locations = updateLocationRequirements(locations, locations[iLocation], items[iItem]);
			}

			if(isItemAllowed == 1)
			{
				if(locations[iLocation].location_set == "Starting Inventory" || locations[iLocation].location_set == "Joinable Party Members")
				{
					placeInventoryItem(rom, locations[iLocation], items[iItem]);

					checkAddSpoilersAndHints(items[iItem], locations[iLocation], hintsToAddList, spoilersToAddList);
					items.splice(iItem, 1);
					locations.splice(iLocation, 1);
					break;
				}
				else if(locations[iLocation].offset < 0xFF) //dialog items
				{
					placeDialogItem(rom, random, locations[iLocation], items[iItem]);

					checkAddSpoilersAndHints(items[iItem], locations[iLocation], hintsToAddList, spoilersToAddList);
					items.splice(iItem, 1);
					locations.splice(iLocation, 1);
					break;
				}
				else
				{
					placeChestItem(rom, locations[iLocation], items[iItem]);

					checkAddSpoilersAndHints(items[iItem], locations[iLocation], hintsToAddList, spoilersToAddList);
					items.splice(iItem, 1);
					locations.splice(iLocation, 1);
					break;
				}
			}
			else //item is not allowed
			{
				if(items.length == 1 || locations.length == 1)
				{
					consoleWarn('WARNING - LAST ITEM WAS NOT ALLOWED IN LAST LOCATION - RANDOMIZING AGAIN');
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
				processHintsToAddList(rom, random, hintsToAddList, hintLocations, hintsSpoiler);
				spoilers = processSpoilersToAddList(spoilersToAddList, spoilers);
				wasSuccessful = true;
				return wasSuccessful;
			}
		}
	}

	if(wasSuccessful == false)
	{
		consoleError('=== ERROR - ITEM RANDOMIZATION FAILED - RANDOMIZING AGAIN ===');
	}

	if(wasSuccessful)
	{
		processHintsToAddList(rom, random, hintsToAddList, hintLocations, hintsSpoiler);
		processSpoilersToAddList(spoilersToAddList, spoilers);
	}

	return wasSuccessful;
}

function placeInventoryItem(rom, inLocation, inItem)
{
	var locHex = inLocation.offset;
	var itemHex = inItem.id;
	rom[locHex] = itemHex; //place item

	if( inLocation.offset == 0x0F923 )
	{
		rom[inLocation.offset+1] = inItem.flags[2]; //set an item quantity for the spellbook replacement
	}
	else if(inLocation.location_set == "Joinable Party Members" && inLocation.type != "partyring")
	{
		rom[inLocation.offset+1] = inItem.flags[2]; //set an item quantity for inventory replacement
	}
}

function placeDialogItem(rom, random, inLocation, inItem)
{
	var itemHex = inItem.id;
	var flagHex = inItem.flags[2];
	if(inLocation.offset == 0x01)
	{
		dialogItemAriana(rom, inItem.item_name[0], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x02) //pocket of antonio
	{
		dialogItemAntonio(rom, inItem.item_name[0], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x03) //pocket of selganor
	{
		dialogItemSelganor(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x04) //pocket of lord british
	{
		dialogItemLordBritish(rom, inItem.item_name[0], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x05) //pocket of phoenix
	{
		dialogItemPhoenix(rom, inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x06) //pocket of ybarra
	{
		dialogItemYbarra(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x07) //pocket of whitsaber
	{
		dialogItemWhitsaber(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x08) //pocket of arturos
	{
		dialogItemArturos(rom, inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x09) //pocket of morchella
	{
		dialogItemMorchella(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x0A) //pocket of homer
	{
		dialogItemHomer(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x0B) //pocket of captain john
	{
		dialogItemCaptainJohn(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x0C) //pocket of the lensmaker
	{
		dialogItemLensmaker(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x0D) //pocket of ephemerides
	{
		dialogItemEphemerides(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x0E) //pocket of dr. cat
	{
		dialogItemDrCat(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x0F) //pocket of cyclops
	{
		dialogItemCyclops(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x10) //pocket of manrel
	{
		dialogItemManrel(rom, inItem.item_name[0], inItem.item_name[1], itemHex, flagHex);
	}
	else if(inLocation.offset == 0x11) //shovel dig spot
	{
		setDigItem(rom,random,itemHex,flagHex);
	}
	else if(inLocation.offset == 0x12) //fishing spot
	{
		setFishingItem(rom,random,itemHex,flagHex);
	}
}

function placeChestItem(rom, inLocation, inItem)
{
	var itemHex = inItem.id;
	var locHex = inLocation.offset + 3;
	var flagLocHex = inLocation.offset + 2;
	var flagHex = 0xC0;

	if(inLocation.type == "shrine") //if we are attempting to place at a shrine, always use the location flags
	{
		flagHex = inLocation.flags[0];
	}
	else if(inItem.type == "main" || inItem.type == "shrine") //if we are placing a main/shrine item, always use the item flags to ensure that it will not count as stolen
	{
		flagHex = inItem.flags[1];
	}
	else if(inLocation.stolen == "yes") //next check if the location is flagged as stolen
	{
		flagHex = inItem.flags[0];
	}
	else //we are not a shrine, not a main item, and not being placed in a location that is set as stolen
	{
		flagHex = inItem.flags[1];
	}

	rom[locHex] = itemHex;
	rom[flagLocHex] = flagHex;
}

function randomizeReplacedLocations(rom, random, replacedLocations)
{
	var placedItems = [];
	for(var i = 0; i < replacedLocations.length; ++i)
	{
		var location = replacedLocations[i];

		if(location.location_set == "Starting Inventory" || location.location_set == "Joinable Party Members")
		{
			var item = selectReplacedLocationItem(random, "inventory");
			placeInventoryItem(rom, location, item);
			placedItems.push(item);
		}
		else if(location.offset < 0xFF) //dialog items
		{
			var item = selectReplacedLocationItem(random, "dialog");
			placeDialogItem(rom, random, location, item);
			placedItems.push(item);
		}
		else
		{
			var item = selectReplacedLocationItem(random, "chest");
			placeChestItem(rom, location, item);
			placedItems.push(item);
		}
	}

	return placedItems;
}

function selectReplacedLocationItem(random, inLocationType)
{
	if(inLocationType == "inventory")
	{
		return random.from(DATA_REPLACEMENT_ITEMS);
	}
	else if(inLocationType == "dialog")
	{
		return random.from(DATA_REPLACEMENT_ITEMS);
	}
	else
	{
		return random.from(DATA_REPLACEMENT_ITEMS);
	}
}

function processSpoilersToAddList(spoilersToAddList, spoilers)
{
	for(var i = 0; i < spoilersToAddList.length; i++)
	{
		var listItem = spoilersToAddList[i].item;
		var listLocation = spoilersToAddList[i].location;

		spoilers.push({item:listItem, location:listLocation});
	}
}

function addHintToHintsToAddList(itemNames, locationHints, hintsToAddList)
{
	var hintToAdd = {"itemNames":itemNames, "locationHints":locationHints}
	hintsToAddList.push(hintToAdd);
}

function processHintsToAddList(rom, random, hintsToAddList, hintLocations, hintsSpoiler)
{
	for(var i = 0; i < hintsToAddList.length; i++)
	{
		if(hintLocations.length > 0)
		{
			hintsSpoiler.push(addHint(rom, random, hintsToAddList[i].itemNames[0], hintsToAddList[i].locationHints, hintLocations));
		}
		else
		{
			break;
		}
	}

	if(hintLocations.length > 0 && hintsToAddList.length > 0) //we still have hints to add so use the shorter item names
	{
		for(var i = 0; i < hintsToAddList.length; i++)
		{
			if(hintLocations.length > 0)
			{
				hintsSpoiler.push(addHint(rom, random, hintsToAddList[i].itemNames[1], hintsToAddList[i].locationHints, hintLocations));
			}
			else
			{
				break;
			}
		}
	}
}

function checkAddSpoilersAndHints(inItem, inLocation, hintsToAddList, spoilersToAddList)
{
	if(inItem.item_name[0] != '' && inItem.location != '')
	{
		if ($('#display_hints').is(':checked'))
		{
			if(inItem.type == "main" || inItem.type == "shrine" || inItem.type == "spell" || inItem.progression_flags > 1)
			{
				addHintToHintsToAddList(inItem.item_name, inLocation.hints, hintsToAddList)
			}
		}
		spoilersToAddList.push({item:inItem, location:inLocation});
	}
}

function dialogItemAntonio(rom, itemText, itemHex, itemQuantity)
{
	//0E 01 49 02 11 10 21 02 11 3E 0E 80 87 0E 01 15 3F 0E
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
	//0E 01 49 02 2B 3E 0E 80 81 0E 01 15 12 1A 0E
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

function dialogItemSelganor(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x53900);
	lzwData[0x161F] = itemHex;
	lzwData[0x1621] = itemQuantity;
	lzwData.set([0x47, 0x49, 0x56, 0x45], 0x1B4A); //change HANDS to say GIVES
	writeTextToAddress(lzwData, 0x1B50, 29, itemTextLong);
	lzwData.set([0x0E], 0x1B50 + itemTextLong.length);
	writeTextToAddress(lzwData, 0x16BE, 0x1E, "You got " + itemTextShort);
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

	writeTextToAddress(lzwData, 0x734, 0x1E, itemTextShort + ", smuggly.");
	var gargoyleLenscrafterPostText = "to give " + itemTextShort + ".";
	writeTextToAddress(lzwData, 0x3B4, 0x1D, gargoyleLenscrafterPostText);
	lzwData.set([0x02], 0x3B4 + gargoyleLenscrafterPostText.length);
}

function dialogItemEphemerides(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	var lzwData = decompressDataFromLZW(rom, 0x4B900);
	lzwData[0x2037] = itemHex;
	lzwData[0x2039] = itemQuantity;

	writeTextToAddress(lzwData, 0x2831, 0x25, itemTextLong + ".");
	var ephemeridesPostText = itemTextLong + " proves suitable.";
	writeTextToAddress(lzwData, 0x2423, 0x2D, ephemeridesPostText);
	lzwData.set([0x02], 0x2423 + ephemeridesPostText.length);
}

function dialogItemDrCat(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	//we convert Dr Cat from only giving a gold reward to giving any item as a reward
	var lzwData = decompressDataFromLZW(rom, 0x5D480);
	lzwData.set([0x0E,0x11,0x3E,0x0E,0x80,0x81,0x0E,0x01,0x15,0x12,0x1A], 0x326); //default - 0E 02 24 12 1E 0E 80 C8 4A 0D 1E
	lzwData[0x32B] = itemHex;
	lzwData[0x32D] = itemQuantity;
	writeTextToAddress(lzwData, 0xF58, 0x10, itemTextShort + ".");
}

function dialogItemCyclops(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	//we convert Papa (Cyclops) key reward to an item reward
	var lzwData = decompressDataFromLZW(rom, 0x68000);
	lzwData[0x708] = itemHex;
	lzwData[0x70A] = itemQuantity;
	writeTextToAddress(lzwData, 0x99F, 0x0D, "He hands you ");
	writeTextToAddress(lzwData, 0x9AC, 0x16, itemTextShort + ".");
	writeTextToAddress(lzwData, 0x990, 0x06, "maybe");
}

function dialogItemManrel(rom, itemTextLong, itemTextShort, itemHex, itemQuantity)
{
	//we convert Manrel key reward to an item reward
	var lzwData = decompressDataFromLZW(rom, 0x50000);
	lzwData[0x69] = itemHex;
	lzwData[0x6B] = itemQuantity;
	writeTextToAddress(lzwData, 0x24A, 0x15, "Take " + itemTextShort + ".");

	var postText = "I gave you " + itemTextShort + ".";
	writeTextToAddress(lzwData, 0x178, 0x1D, postText);
	lzwData.set([0x02], 0x178 + postText.length);
}

function setDrCatGoldReward(rom, random)
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
	lzwData.set([0x0E,0x11,0x3E,0x0E,0x67,0x0E,0x14,0x15,0x12,0x1A,0x00], 0x326); //default - 0E 02 24 12 1E 0E 80 C8 4A 0D 1E
}

function setDigItem(rom, random, inItemHex, inItemQuantity)
{
	var randomCoords = random.from(DATA_DIG_LOCATIONS);
	var digPos = getRandomCoordinates(random, randomCoords.min, randomCoords.max);

	rom.set([0xE1,0x01,0xF6,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00],0xD572); //change "you find a gold nugget" to "you find X" where X is an item loaded in E5

	var branchOffset = 0x13FCF;
	rom.set([0x20,0x00,0xF1,0xD0,0x2C,0x60,
		0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,
	], branchOffset); //set code branch and remove old code

	var codeOffset = 0x17100;
	var itemHex = inItemHex;
	var itemQuantity = inItemQuantity;
	var dataCode = [
						0xA6,0x28,0xE0,0xC3,0x02,0xD0,0x10, //load and compare x coordinate and branch if not equal
						0xA6,0x2A,0xE0,0x43,0x03,0xD0,0x09, //load and compare y coordinate and branch if not equal
						0xA9,0xC7,0x22,0x0F,0x9A,0x00, //LDA #$C7 JSL
						0xA9,0x00,0x60, //RTS
						0xA6,0x28,0xE0,digPos[0],digPos[1],0xD0,0x35, //load and compare x coordinate and branch if not equal
						0xA6,0x2A,0xE0,digPos[2],digPos[3],0xD0,0x2E, //load and compare y coordinate and branch if not equal
						0xA9,itemHex, //LDA itemHex
						0x85,0xE5, //STA E5
						0x22,0xE9,0xBF,0x01, //JSL - Check the party member inventories for the item id
						0x7A, //PLY
						0xB0,0x06, //BCS - branch if the item was NOT found
						0xA9,0x01,0x20,0xD2,0xBF,0x60, //RTS if the item already exists in the inventory of any party member
						0xA9,itemQuantity,0xEB,0xA9,itemHex, //LDA itemQuantity XBA LDA itemHex
						0x22,0xBA,0xE9,0x02,0xB0,0x0C, //post code to give item to the player
						0xA9,0x5D,0x2C, //inventory was full message
						0xA9,0x53,0x2C,0xA9,0x4A,0x22,0xEF,0xBC,0x01, //success message
						0xA9,0x00,0x20,0xD2,0xBF,0x60, //RTS
						0xA9,0x01,0x60, //RTS
					];
	rom.set(dataCode, codeOffset);

	var convertedCoords = convertCoordinatesToSextantString(digPos);

	var textToWrite = "Dig at " + convertedCoords.textY + ", " + convertedCoords.textX + ".";
	writeTextToBook(rom, 0x2098C, 0xB4, textToWrite);
}

function setFishingItem(rom, random, inItemHex, inItemQuantity)
{
	var randomCoords = random.from(DATA_FISHING_LOCATIONS);
	var fishPos = getRandomCoordinates(random, randomCoords.min, randomCoords.max);

	var branchOffset = 0x140BD;
	rom.set([0x20,0x60,0xF1,0xD0,0x01,0x60], branchOffset); //set code branch and remove old code

	var codeOffset = 0x17160;
	var itemHex = inItemHex;
	var itemQuantity = inItemQuantity;
	var dataCode = [
						0xA9,0x5A,0x22,0xEC,0xBC,0x01, //restore overritten code - this code display the "NAME fishes" message
						0xA6,0x28,0xE0,fishPos[0],fishPos[1],0xD0,0x35, //load and compare x coordinate and branch if not equal
						0xA6,0x2A,0xE0,fishPos[2],fishPos[3],0xD0,0x2E, //load and compare y coordinate and branch if not equal
						0xA9,itemHex, //LDA itemHex
						0x85,0xE5, //STA E5
						0x22,0xE9,0xBF,0x01, //JSL - Check the party member inventories for the item id
						0x7A, //PLY
						0xB0,0x06, //BCS - branch if the item was NOT found
						0xA9,0x01,0x20,0xD2,0xBF,0x60, //RTS if the item already exists in the inventory of any party member
						0xA9,itemQuantity,0xEB,0xA9,itemHex, //LDA itemQuantity XBA LDA itemHex
						0x22,0xBA,0xE9,0x02,0xB0,0x0C, //post code to give item to the player
						0xA9,0x5D,0x2C, //inventory was full message
						0xA9,0x53,0x2C,0xA9,0x4A,0x22,0xEF,0xBC,0x01, //success message
						0xA9,0x00,0x20,0xD2,0xBF,0x60, //RTS
						0xA9,0x01,0x60, //RTS
					];
	rom.set(dataCode, codeOffset);

	var lzwData = decompressDataFromLZW(rom, 0x60000);
	var convertedCoords = convertCoordinatesToSextantString(fishPos);
	var textToWrite = "Recently I lost something while fishing near " + convertedCoords.textY + ", " + convertedCoords.textX + ".";
	writeTextToAddress(lzwData, 0x119C, 0x6D, textToWrite);
	lzwData.set([0x02], 0x119C + textToWrite.length);
}

function getRandomCoordinates(random, inMinPos, inMaxPos)
{
	var bytePairMinX = (inMinPos[1] << 8) | (inMinPos[0]);
    var bytePairMinY = (inMinPos[3] << 8) | (inMinPos[2]);
	var bytePairMaxX = (inMaxPos[1] << 8) | (inMaxPos[0]);
    var bytePairMaxY = (inMaxPos[3] << 8) | (inMaxPos[2]);
	var randomValueX = random.nextIntRange(bytePairMinX, bytePairMaxX);
	var randomValueY = random.nextIntRange(bytePairMinY, bytePairMaxY);
	
	var xTile = randomValueX & 0xFF;
    var xSuperChunk = randomValueX >> 8;
    var yTile = randomValueY & 0xFF;
    var ySuperChunk = randomValueY >> 8;
    var coords = [xTile, xSuperChunk, yTile, ySuperChunk];
	return coords;
}

function convertCoordinatesToSextantString(pos)
{
	var bytePair1 = (pos[1] << 8) | (pos[0]);
    bytePair1 = bytePair1 - 0x0130;

	var bytePair2 = (pos[3] << 8) | (pos[2]);
    bytePair2 = bytePair2 - 0x0168;

	var textX = "";
	var textY = "";

	if(bytePair1 & 0x8000)
	{
		bytePair1 = bytePair1*-1;
		textX += bytePair1 + " West";
	}
	else
	{
		textX += bytePair1 + " East";
	}
	
	if(bytePair2 & 0x8000)
	{
		bytePair2 = bytePair2*-1;
		textY += bytePair2 + " North";
	}
	else
	{
		textY += bytePair2 + " South";
	}
	return{
		bytePair1:bytePair1,
		bytePair2:bytePair2,
		textX:textX,
		textY:textY,
	};
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
	var randQuantity = 0x00;

	if(rom[address] > 0xBF)
	{
		randQuantity = random.nextIntRange(0x01,chosenPool.quantity[chosenItem]) + 0xC0;
	}
	else if(rom[address] > 0x7F)
	{
		randQuantity = random.nextIntRange(0x01,chosenPool.quantity[chosenItem]) + 0x80;
	}
	else if(rom[address] > 0x3F)
	{
		randQuantity = random.nextIntRange(0x01,chosenPool.quantity[chosenItem]) + 0x40;
	}
	else
	{
		randQuantity = random.nextIntRange(0x01,chosenPool.quantity[chosenItem]);
	}

	rom.set([randQuantity, chosenPool.items[chosenItem]], address);
}

function randomizeJunkContentsPool(rom, random, inItemPool, inLootLocations)
{
	var itemPool = [];
	itemPool = getItemsFromPool(inItemPool);

	for(var i = 0; i < inLootLocations.length; ++i)
    {
        setRandomWorldItem(rom, random, itemPool, inLootLocations[i]);;
    }
}

function randomizeJunkContents(rom, random)
{
	consoleLog("RANDOMIZING JUNK ITEMS");
	randomizeJunkContentsPool(rom, random, DATA_CASTLE_BRITANNIA_ITEMS, DATA_CASTLE_BRITANNIA_LOCATIONS);
	randomizeJunkContentsPool(rom, random, DATA_OVERWORLD_LOOT_ITEMS, DATA_OVERWORLD_LOOT_LOCATIONS);
	randomizeJunkContentsPool(rom, random, DATA_OVERWORLD_LOOT_ITEMS, DATA_OVERWORLD_LOOT_LOCATIONS_MAGIC);
	randomizeJunkContentsPool(rom, random, DATA_UNDERWORLD_LOOT_ITEMS, DATA_UNDERWORLD_LOOT_LOCATIONS);
	randomizeJunkContentsPool(rom, random, DATA_UNDERWORLD_LOOT_ITEMS, DATA_UNDERWORLD_LOOT_LOCATIONS_MAGIC);
}

function getJunkShuffleLocationPool(inLocationPool, inLootLocations)
{
	var locationsPool = [];
	for(var i = 0; i < inLootLocations.length; ++i)
    {
		locationsPool.push(inLootLocations[i]);
	}
	var outPool = inLocationPool.concat(locationsPool);
	return outPool;
}

function getJunkShuffleItemPool(rom, inItemPool, inLootLocations)
{
	var itemPool = [];
	for(var i = 0; i < inLootLocations.length; ++i)
    {
		var locationQuantity = rom[inLootLocations[i]];
		var strippedQuantity = 0x00;

		if(locationQuantity > 0xBF)
		{
			strippedQuantity = locationQuantity - 0xC0;
		}
		else if(locationQuantity > 0x7F)
		{
			strippedQuantity = locationQuantity - 0x80;
		}
		else if(locationQuantity > 0x3F)
		{
			strippedQuantity = locationQuantity - 0x40;
		}
		else
		{
			strippedQuantity = locationQuantity; 
		}
		
		var itemEntry = {	"quantity":strippedQuantity,
							"id":rom[inLootLocations[i]+1]
						};
		itemPool.push(itemEntry);
	}
	var outPool = itemPool.concat(inItemPool);
	return outPool;
}

function assignJunkShuffleItemQuantity(locationQuantity, itemQuantity)
{
	var returnQuantity = 0x00;
	if(locationQuantity > 0xBF)
	{
		returnQuantity = itemQuantity + 0xC0;
	}
	else if(locationQuantity > 0x7F)
	{
		returnQuantity = itemQuantity + 0x80;
	}
	else if(locationQuantity > 0x3F)
	{
		returnQuantity = itemQuantity + 0x40;
	}
	else
	{
		returnQuantity = itemQuantity; 
	}
	return returnQuantity;
}

function shuffleJunkContentsPool(rom, random, poolList)
{
	var locationsPool = [];
	var itemPool = [];

	for(var i = 0; i < poolList.length; ++i)
	{
		locationsPool = getJunkShuffleLocationPool(locationsPool, poolList[i]);	
		itemPool = getJunkShuffleItemPool(rom, itemPool, poolList[i]);
	}

	locationsPool.shuffle(random);
	itemPool.shuffle(random);

	for(var i = 0; i < locationsPool.length; ++i)
    {
		var locationQuantity = rom[locationsPool[i]];
		var canPlaceItem = false;
		var placeChance = 0.1;
		
		for(var j = 0; j < itemPool.length; ++j)
    	{
			canPlaceItem = checkJunkShufflePlacement(DATA_CASTLE_BRITANNIA_LOCATIONS, DATA_CASTLE_BRITANNIA_ITEMS[0], locationsPool[i], itemPool[j].id);
			if(canPlaceItem == true || j == itemPool.length-1 || random.flipCoin(placeChance))
			{
				rom[locationsPool[i]+1] = itemPool[j].id;
				rom[locationsPool[i]] = assignJunkShuffleItemQuantity(locationQuantity, itemPool[j].quantity);
				itemPool.splice(j,1);
				placeChance = 0.1;
				break;
			}
			else
			{
				placeChance = placeChance + 0.1;
			}
		}
	}
}

function checkJunkShufflePlacement(locationRestrictions, itemRestrictions, location, item)
{
	if(locationRestrictions.includes(location))
	{
		if(itemRestrictions.items.includes(item))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}

function shuffleJunkContents(rom, random)
{
	consoleLog("SHUFFLING JUNK ITEMS");
	shuffleJunkContentsPool(rom, random, [DATA_CASTLE_BRITANNIA_LOCATIONS, DATA_OVERWORLD_LOOT_LOCATIONS, DATA_OVERWORLD_LOOT_LOCATIONS_MAGIC, DATA_UNDERWORLD_LOOT_LOCATIONS, DATA_UNDERWORLD_LOOT_LOCATIONS_MAGIC]);
	//shuffleJunkContentsPool(rom, random, [DATA_CASTLE_BRITANNIA_LOCATIONS, DATA_OVERWORLD_LOOT_LOCATIONS, DATA_OVERWORLD_LOOT_LOCATIONS_MAGIC]);
	//shuffleJunkContentsPool(rom, random, [DATA_UNDERWORLD_LOOT_LOCATIONS, DATA_UNDERWORLD_LOOT_LOCATIONS_MAGIC]);
}

function getLocationTypeCount(inData, inType)
{
	var count = 0;
	for(var i = 0; i < inData.length; ++i)
	{
		for(var j = 0; j < inData[i].location_types.length; ++j)
		{
			if(inData[i].location_types[j] == inType)
			{
				count += 1;
			}
		}
	}
	return count;
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
