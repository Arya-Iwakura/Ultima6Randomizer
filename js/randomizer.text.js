const TEXT_FLAGS_LOC = 0x03781;
const TEXT_SEED_LOC = 0x03770;
const TEXT_SPEED_LOC = 0x19AE9;

var TEXT_MAPPING =
{
	//"": 0x00, //new line?
	"!": 0x01,
	"\uE022": 0x02, //quotation
	"#": 0x03,
	"$": 0x04,
	"%": 0x05,
	"&": 0x06,
	"'": 0x07,
	"(": 0x08,
	")": 0x09,
	"*": 0x0A,
	"+": 0x0B,
	",": 0x0C,
	"-": 0x0D,
	".": 0x0E,
	"/": 0x0F,
	"0": 0x10,
	"1": 0x11,
	"2": 0x12,
	"3": 0x13,
	"4": 0x14,
	"5": 0x15,
	"6": 0x16,
	"7": 0x17,
	"8": 0x18,
	"9": 0x19,
	":": 0x1A,
	";": 0x1B,
	"<": 0x1C,
	"=": 0x1D,
	">": 0x1E,
	"?": 0x1F,
	"@": 0x20,
	"A": 0x21,
	"B": 0x22,
	"C": 0x23,
	"D": 0x24,
	"E": 0x25,
	"F": 0x26,
	"G": 0x27,
	"H": 0x28,
	"I": 0x29,
	"J": 0x2A,
	"K": 0x2B,
	"L": 0x2C,
	"M": 0x2D,
	"N": 0x2E,
	"O": 0x2F,
	"P": 0x30,
	"Q": 0x31,
	"R": 0x32,
	"S": 0x33,
	"T": 0x34,
	"U": 0x35,
	"V": 0x36,
	"W": 0x37,
	"X": 0x38,
	"Y": 0x39,
	"Z": 0x3A,
	"(": 0x3B,
	"¥": 0x3C,
	")": 0x3D,
	"^": 0x3E,
	"_": 0x3F,
	"a": 0x41,
	"b": 0x42,
	"c": 0x43,
	"d": 0x44,
	"e": 0x45,
	"f": 0x46,
	"g": 0x47,
	"h": 0x48,
	"i": 0x49,
	"j": 0x4A,
	"k": 0x4B,
	"l": 0x4C,
	"m": 0x4D,
	"n": 0x4E,
	"o": 0x4F,
	"p": 0x50,
	"q": 0x51,
	"r": 0x52,
	"s": 0x53,
	"t": 0x54,
	"u": 0x55,
	"v": 0x56,
	"w": 0x57,
	"x": 0x58,
	"y": 0x59,
	"z": 0x5A,
	"{": 0x5B,
	"°": 0x5C,
	"}": 0x5D,
	"~": 0x5E,
	" ": 0x5F,
	//"ð": 0xF0, //new line in scroll text
	//"ó": 0xF3, //denotes the end of a book title and also new pages in books

	//" ": 0x60, ?? unsure what difference this has with 5F
	//"symbol_avatar": 0x61, //symbol_avatar
	//"symbol_book": 0x62, //symbol_book
	//"symbol_sword": 0x63, //symbol_sword
	//"symbol_shield": 0x64, //symbol_shield
	//"symbol_potion": 0x65, //symbol_potion
	//"symbol_envelope": 0x66, //symbol_envelope
	//"symbol_flower": 0x67, //symbol_flower
	//"symbol_boots": 0x68, //symbol_boots
	//"symbol_staff": 0x69, //symbol_staff
	//incomplete japanese hiragana start at 0x6A (seems to be partially overwritten)
	//"border_01": 0x7F, //some form of edge to a box
	//0x80-0x9F is another slightly different font of the base character set ? unmapped
	//0xB0+ border icons ? corruption?
	//0xBA-BF stone border knot icon follwoed by fade icons for main screen ? corruption?
	//0xCA-CF stone border knot icons for main screen ? corruption?

	"\uE034": 0x02,
};

function writeTextToAddress(rom, inAddress, inLength, inText)
{
	//console.log('writing ' + inText);

	if( inLength > 0 ) //clear room for the text
	{
		for (var i = 0; i < inLength; ++i)
		{
			rom[inAddress + i] = TEXT_MAPPING[" "];
		}
	}

	for (var i = 0; i < inText.length; ++i)
	{
		rom[inAddress + i] = TEXT_MAPPING[inText[i]];
	}
}

function writeSymbolHash(rom, random)
{
	var hash01 = random.from([0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69]);
	var hash02 = random.from([0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69]);
	var hash03 = random.from([0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69]);
	var hash04 = random.from([0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69]);
	var hash05 = random.from([0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69]);
	rom.set([hash01,0x5F,hash02,0x5F,hash03,0x5F,hash04,0x5F,hash05],TEXT_SEED_LOC+5);
}

function writeToLicenseText(rom, random)
{
	// random title screen game number
	rom[0x19A5C] = random.from([0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39]);

	// change the game subtitle to a new subtitle
	rom.set([0x52, 0x61, 0x6E, 0x64, 0x6F, 0x6D, 0x69, 0x7A, 0x65, 0x72, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20], 0x19A60);
}

function writeCredits(rom, random)
{
	console.log("WRITING CREDITS");
	//move text on final screen down to add room for any final screen text
	//rom.set([0x11],0x01D45F); //move 1990 origin systems text
	//rom.set([0x14],0x01D47A); //move 1993 pony canyon text
	//rom.set([0x17],0x01D495); //move 1993 FCI text

	//old layout
	//PAGE1, PAGE2, PAGE3, PAGE4, PAGE5, PAGE6, PAGE7, PAGE8, PAGE9, PAGE0, PAGE1
	//A4 D2, E2 D2, F1 D2, 0F D3, 32 D3, 5D D3, 8D D3, A6 D3, BA D3, FE D3, 5F D4
	//new layout
	//A4 D2, E2 D2, 32 D3, 8D D3, BA D3, FE D3, B1 D4, D0 D4, 00 D5, 40 D5, 5F D4
	rom.set(
		[
			0xA4, 0xD2,
			0xE2, 0xD2,
			0x32, 0xD3,
			0x8D, 0xD3,
			0xBA, 0xD3,
			0xFE, 0xD3,
			0xD1, 0xD4,
			0xF0, 0xD4,
			0x40, 0xD5,
			0x60, 0xD5,
			0x5F, 0xD4
		],
		0x01D28E);

	//free up space for new page 1 and page 2
	//compress SNES VERSION, PRODUCER, and PROJECT MANAGER to one page
	rom[0x01D2E2] = 0x05; //01D2E2 - 0x05 - move SNES VERSION text
	rom.set([0x20,0x56,0x45,0x52,0x53,0x49,0x4F,0x4E],0x01D2E8); //add a space to SNES VERSION to prevent ending the screen
	rom[0x01D2F1] = 0x0B; //01D2F1 - 0x0B - move PRODUCER text
	rom[0x01D2FB] = 0x0E; //01D2FB - 0x0E - move KATSUNORI UNAKAMI text
	rom.set([0x20,0x55,0x4E,0x41,0x4B,0x41,0x4D,0x41],0x01D306); //add a space to KATSUNORI UNAKAMI to prevent ending the screen
	rom[0x01D30F] = 0x14; //01D30F - 0x14 - move PROJECT MANAGER text
	rom[0x01D320] = 0x17; //01D320 - 0x17 - move KUNIHIKO KAGAWA text

	//free up space for new page 3
	//compress COORDINATOR and PROGRAMMER to one page
	rom[0x01D332] = 0x05; //01D332 - 0x05 - move COORDINATOR text
	rom[0x01D33F] = 0x08; //01D33F - 0x08 - move TAKAAKI USHIKI text
	rom[0x01D34F] = 0x0B; //01D34F - 0x0B - move EIKO NAGATA text
	rom.set([0x20,0x4E,0x41,0x47,0x41,0x54,0x41],0x01D355); //add a space to EIKO NAGATA to prevent ending the screen
	rom[0x01D35D] = 0x11; //01D35D - 0x11 - move PROGRAMMER text
	rom[0x01D369] = 0x14; //01D369 - 0x14 - move TSUYOSHI WAKIMOTO text
	rom[0x01D37C] = 0x17; //01D37C - 0x17 - move YUKIO HORIMOTO text

	//free up space for new page 4
	//compress GRAPHICS and SOUND to one page
	rom[0x01D38D] = 0x05; //01D38D - 0x05 - move GRAPHICS text
	rom[0x01D397] = 0x08; //01D397 - 0x08 - move REIKO OSHIDA text
	rom.set([0x20,0x4F,0x53,0x48,0x49,0x44,0x41],0x01D39E); //add a space to REIKO OSHIDA to prevent ending the screen
	rom[0x01D3A6] = 0x11; //01D3A6 - 0x0E - move SOUND text
	rom[0x01D3AD] = 0x14; //01D3AD - 0x11 - move KAZUO SAWA text

	//RANDOMIZER BY
	//SQUIBBONS
	rom.set(
		[
			0x00, 0x08, 0x52, 0x41, 0x4E, 0x44, 0x4F, 0x4D, 0x49, 0x5A, 0x45, 0x52, 0x20, 0x42, 0x59, 0x00,
			0x0E, 0x53, 0x51, 0x55, 0x49, 0x42, 0x42, 0x4F, 0x4E, 0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
			//0x0E, 0x53, 0x51, 0x55, 0x49, 0x42, 0x42, 0x4F, 0x4E, 0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 //SQUIBBONS
			//0x0E, 0x41, 0x52, 0x59, 0x41, 0x20, 0x49, 0x57, 0x41, 0x4B, 0x55, 0x52, 0x41, 0x00, 0x00, 0x00 //ARYA IWAKURA
		],
		0x01D4D0);

	//ADDITIONAL DEV
	//BY BINARYSPLIT
	//BASED ON THE
	//SMW RANDOMIZER
	//BY AUTHORBLUES
	rom.set(
		[
			0x06, 0x41, 0x44, 0x44, 0x49, 0x54, 0x49, 0x4F, 0x4E, 0x41, 0x4C, 0x20, 0x44, 0x45, 0x56, 0x00,
			0x09, 0x42, 0x49, 0x4E, 0x41, 0x52, 0x59, 0x53, 0x50, 0x4C, 0x49, 0x54, 0x00, 0x0F, 0x42, 0x41,
			0x53, 0x45, 0x44, 0x20, 0x4F, 0x4E, 0x20, 0x54, 0x48, 0x45, 0x00, 0x12, 0x53, 0x4D, 0x57, 0x20,
			0x52, 0x41, 0x4E, 0x44, 0x4F, 0x4D, 0x49, 0x5A, 0x45, 0x52, 0x00, 0x15, 0x42, 0x59, 0x20, 0x41,
			0x55, 0x54, 0x48, 0x4F, 0x52, 0x42, 0x4C, 0x55, 0x45, 0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
		],
		0x01D4F0);

	//TESTERS
	//SYNTHPOPISBACK
	rom.set(
		[
			0x08, 0x54, 0x45, 0x53, 0x54, 0x45, 0x52, 0x53, 0x00, 0x0E, 0x53, 0x59, 0x4E, 0x54, 0x48, 0x50,
			0x4F, 0x50, 0x49, 0x53, 0x42, 0x41, 0x43, 0x4B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
		],
		0x01D540);

	//SPECIAL THANKS
	//STEPHANIE RANCOURT
	//THE ULTIMA COMMUNITY
	rom.set(
		[
			0x08, 0x53, 0x50, 0x45, 0x43, 0x49, 0x41, 0x4C, 0x20, 0x54, 0x48, 0x41, 0x4E, 0x4B, 0x53, 0x00,
			0x0E, 0x53, 0x54, 0x45, 0x50, 0x48, 0x41, 0x4E, 0x49, 0x45, 0x20, 0x52, 0x41, 0x4E, 0x43, 0x4F,
			0x55, 0x52, 0x54, 0x00, 0x14, 0x54, 0x48, 0x45, 0x20, 0x55, 0x4C, 0x54, 0x49, 0x4D, 0x41, 0x20,
			0x43, 0x4F, 0x4D, 0x4D, 0x55, 0x4E, 0x49, 0x54, 0x59, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
		],
		0x01D560);

	//ULTIMA VI THE FALSE PROPHET AND COPYRIGHT TEXT
	rom.set(
		[
			0x00, 0x08, //start of screen
	
			//ultima 6 the false prophet
			0x55, 0x4C, 0x54, 0x49, 0x4D, 0x41, 0x20, 0x56, 0x49, 0x00, 0x0B, 0x54, 0x48, 0x45, 0x20, 0x46,
			0x41, 0x4C, 0x53, 0x45, 0x20, 0x50, 0x52, 0x4F, 0x50, 0x48, 0x45, 0x54, 0x00, 0x11, 0x40, 0x31,

			//copyright text
			0x39, 0x39, 0x30, 0x20, 0x4F, 0x52, 0x49, 0x47, 0x49, 0x4E, 0x20, 0x53, 0x59, 0x53, 0x54, 0x45,
			0x4D, 0x53, 0x20, 0x49, 0x4E, 0x43, 0x2E, 0x00, 0x14, 0x40, 0x31, 0x39, 0x39, 0x33, 0x20, 0x50,
			0x4F, 0x4E, 0x59, 0x43, 0x41, 0x4E, 0x59, 0x4F, 0x4E, 0x20, 0x49, 0x4E, 0x43, 0x2E, 0x20, 0x20,
			0x20, 0x20, 0x00, 0x17, 0x40, 0x31, 0x39, 0x39, 0x33, 0x20, 0x46, 0x43, 0x49, 0x20, 0x49, 0x4E,
			0x43, 0x2E, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00, 0x00, 0x00,
		],
		0x01D45E);
}

function fixText(rom)
{
	rom.set([0x52], 0x0E115); //Leather Armor

	writeTextToAddress(rom, 0x0E225, 6, "R.Prot"); //Ring of Protection
	writeTextToAddress(rom, 0x0E22C, 6, "R.Regn"); //Ring of Regeneration
	writeTextToAddress(rom, 0x0E233, 6, "R.Invs"); //Ring of Invisibility
	writeTextToAddress(rom, 0x0CFD0, 17, "find an item!"); //find a moonstone
	writeTextToAddress(rom, 0x0D5DF, 17, "took an item!"); //took a moonstone
}

function prepareHintText(rom, random)
{
	console.log("PREPARING HINTS");

	rom.set([0x28, 0x31, 0x47, 0xB7], 0x11066); //change scroll to chuckles hint book in Nystful chest
	rom.set([0x32, 0x46, 0xF0, 0xB9], 0x10F20); //change juice to scroll and move it from Skara Brae town hall to basket in Inn (this replaces the scroll we lost in Nystfuls Chest)
	
	prepareCertificateHint(rom); //requires special adjustment to keep the certificate and add a hint
	bookChucklesHintBook(rom); //add chuckles hint book to replace all the scrolls

	//change the text of the scrolls in case some of them do not get written to (we added the hint book so the original text on these are redundant)
	writeTextToBook(rom, 0x2053D, 43, "What's a paladin?"); //0x2053D - scroll - Chuckles scroll #2 - 0x2B (43)
	writeTextToBook(rom, 0x205BE, 53, "Ho eyo he hum! Bounce, bounce, bounce!"); //0x205BE - scroll - Chuckles scroll #4 - 0x35 (53)
	writeTextToBook(rom, 0x20670, 69, "101 Avatar Jokes by Chuckles the Jester! How does that sound?"); //0x20670 - scroll - Chuckles scroll #6 - 0x45 (69)
	writeTextToBook(rom, 0x20569, 84, "If hints were mints and mints were hints, think what a world it would be!"); //0x20569 - scroll - Chuckles scroll #3 - 0x54 (84)
	writeTextToBook(rom, 0x204E2, 90, "Have you heard the one about the nun, the dragon, and the drunken penguin? Neither have I!"); //0x204E2 - scroll - Chuckles scroll #1 - 0x5A (90)
	writeTextToBook(rom, 0x206B6, 101, "Why is Dupre like a horseshoe? It's because they both have the letter 'r' in them!"); //0x206B6 - scroll - Chuckles scroll #7 - 0x65 (101)
	writeTextToBook(rom, 0x205F4, 123, "Riddle me this: Do you know what the goose said to the avatar? It said 'ankh ankh!"); //0x205F4 - scroll - Chuckles scroll #5 - 0x7B (123)
}
//
function prepareCertificateHint(rom) //override the Yew City Jail Permission Certificiate with chuckles hint space
{
	var bookContents = 
	[
		"Certificate of Permission for the Yew city jail. - Lenora.", "0xF3",
		"A note from Chuckles falls out: Why do Jesters sing Ho ho? You'll never know!"
	]; //91 - we break after the "falls out" part and replace it with hint text

	var length = 164; //length of the book we are clearing
	var bookOffset = 0x2452C; //address of the book we are clearing
	//this sets us up to write the hint at 24587 - 49(73)

	writeTextToBook(rom, bookOffset, length, bookContents);
}

function bookChucklesHintBook(rom) //override the book Of Dreams and Visions with chuckles hint book
{
	var bookContents = 
	[
		"Chunkle's Hint Book", "0xF3",
		"There's something for you under a plant in Serpent's Hold.", "0xF3",
		"Check the beehives in Minoc.", "0xF3",
		"Search the harpsichord in the Blue Bottle Tavern.", "0xF3",
		"Search the beds in the Yew jail.", "0xF3",
		"Look under a cauldron in New Magincia.", "0xF3",
		"Check the baskets in Skara Brae.", "0xF3",
		"Search the stone lions in Lord British's castle."
		//A desk in Cove.
		//A cask in Empath Abbey.
	]; //311

	var length = 314; //length of the book we are clearing
	var bookOffset = 0x2276D; //address of the book we are clearing

	writeTextToBook(rom, bookOffset, length, bookContents);
}

function bookLordBritishRandomizerBook(rom) //override the book Huberts Hair Raising Adventure with some text from lord british about the randomizer
{
	var bookContents = 
	[
		"A Note on recent Random Events", "0xF3",
		"A form of ethereal distortion has struck Britannia!", "0xF3",
		//"Items, monsters, and even people are swapping places!", "0xF3",
		"Items and living creatures are swapping places!", "0xF3",
		//"The contents of chests across the realm seem to have randomly mixed between themselves.", "0xF3",
		//"Living creatures are appearing in places they never have and even behaving differently than before.", "0xF3",
		//"Most of the populace is oblivous to these recent events and continue to act as if all is in order.", "0xF3",
		"The citizens strangely act as if all is in order.", "0xF3",
		"Hopefully the Avatar can assist in this matter. - LB"
	]; //229

	var length = 235;
	var bookOffset = 0x20826;

	writeTextToBook(rom, bookOffset, length, bookContents);
}

function writeTextToBook(rom, inAddress, inLength, inText)
{
	//console.log('writing ' + inText);

	var currentOffset = inAddress;

	if( inLength > 0 ) //clear room for the text
	{
		for (var i = 0; i < inLength; ++i)
		{
			rom[inAddress + i] = 0x00;
		}
	}

	for(var i = 0; i < inText.length; ++i)
	{
		if(inText[i] == "0xF3")
		{
			rom[currentOffset] = 0xF3;
			currentOffset += 1;
		}
		else
		{
			for (var j = 0; j < inText[i].length; ++j)
			{
				var subText = inText[i];
				rom[currentOffset + j] = TEXT_MAPPING[subText[j]];
			}
			currentOffset += inText[i].length;
		}
	}
}

function getHintLocations()
{
	return $.grep(DATA_HINT_LOCATIONS, function(x){ return x; });
}

function addHint(rom, random, inItemName, inHints, inHintLocations)
{
	if(inHintLocations.length > 0 && inHints.length > 0)
	{
		//generate the hint text
		var randomSelection = random.nextIntRange(0, inHints.length);
		var hintText = inItemName + DATA_HINT_TEXT[inHints[randomSelection]];

		//Hint list is sorted shortest to longest and we attempt to fill shortest first
		for(var i = 0; i < inHintLocations.length; ++i)
		{
			if(hintText.length < inHintLocations[i].size)
			{
				//console.log("writing hint text " + hintText + " to location " + inHintLocations[i].name)
				writeTextToBook(rom, inHintLocations[i].offset, inHintLocations[i].size, hintText);
				inHintLocations.splice(i, 1);
				break;
			}
		}

	}
}
