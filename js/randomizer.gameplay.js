function fixAISpellListBug(rom)
{
    //this fixes an off-by-one error in the code that prevents the SNES AI from being able to access all of their assigned spells
    rom[0x4D09] = 0xEA;
}

function fixSpiders(rom)
{
    //gives spiders paralyze instead of magic arrow to more closely match their original web spell that has been removed from the game
    rom[0x16647] = 0x1B;
}

function fixMoonPhaseBug(rom)
{
    rom.set([0x1D, 0x1E, 0x1D],0x131EE); //this fixes the the bug where the moon phase graphics are off by one in the base game and thus draw the wrong graphics
}

function fixDialogBugs(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x53900);
    lzwData.set([0x5F], 0x3A58); //was 0x00 - fixes Aaron NAME text
}

function setSpeedTextSelectionDefault(rom)
{
    rom[0x19C14] = 0x00;
}

function setIntroData(rom)
{
    if ($('#skip_intro_cinematic').is(':checked'))
	{
		skipIntroCinematic(rom);
	}
    else
    {
        modifyIntroCinematic(rom);
    }

    modifyJourneyOnward(rom);
}

function modifyIntroCinematic(rom)
{
    var dataOffset = [0x03,0xD6,0x90];
    rom.set([0xA9,0x01,0x85,0xA6,0x20,0xF4,0x9D,0x20,dataOffset[2]+0x1C,dataOffset[1],0x64,0xA6,0x60], 0x19C19); //originally 0xA9,0x01,0x85,0xA6,0x20,0xF4,0x9D,0x20,0x26,0x9C,0x64,0xA6,0x60
    injectChestSpriteData(rom, 0x1D690, dataOffset);
}

function skipIntroCinematic(rom)
{
    var dataOffset = [0x03,0xD6,0x90];
    rom.set([0x20,dataOffset[2]+0x26,dataOffset[1],0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0x60], 0x19C19); //originally 0xA9,0x01,0x85,0xA6,0x20,0xF4,0x9D,0x20,0x26,0x9C,0x64,0xA6,0x60
    injectChestSpriteData(rom, 0x1D690, dataOffset);
}

function modifyJourneyOnward(rom)
{
    var dataOffset = [0x03,0xD6,0x90];
    rom.set([0x20,dataOffset[2]+0x21,dataOffset[1]], 0x19BC9); //originally 0x20,0x14,0xA9
}

function injectChestSpriteData(rom, inCodeOffset, inDataOffset)
{
    //used to inject data into RAM for the new chests to appear and function which are normally loaded when you enter Castle Britannia
    var chestData = [0x70,0x11,0x71,0x11,0x80,0x11,0x81,0x11, 0x72,0x11,0x73,0x11,0x82,0x11,0x83,0x11, 0x74,0x11,0x75,0x11,0x84,0x11,0x85,0x11, 0x41,0x41,0x41,0x40];
    var dataCode = [
                    0xA0,0x02,0x00,                                             //LDY 02
                    0x80,0x08,                                                  //BRA
                    0xA0,0x01,0x00,                                             //LDY 01
                    0x80,0x03,                                                  //BRA
                    0xA0,0x00,0x00,                                             //LDY 00
                    0xC2,0x20,                                                  //REP 20
                    0xA2,0x00,0x00,                                             //LDX 0000
                    0xBF,inDataOffset[2],inDataOffset[1],inDataOffset[0],       //LDA,x
                    0x9D,0x80,0x4F,                                             //STA,x
                    0x9D,0x80,0x57,                                             //STA,x
                    0xE8,0xE8,                                                  //INX INX
                    0xE0,0x18,0x00,                                             //CPX
                    0x90,0xEF,                                                  //BCC F1
                    0xA2,0x00,0x00,                                             //LDX 0000
                    0xBF,inDataOffset[2]+0x18,inDataOffset[1],inDataOffset[0],  //LDA,x
                    0x9D,0xF0,0x58,                                             //STA,x
                    0x9D,0xF0,0x59,                                             //STA,x
                    0xE8,0xE8,                                                  //INX INX
                    0xE0,0x04,0x00,                                             //CPX
                    0x90,0xEF,                                                  //BCC F1
                    0xE2,0x20,                                                  //SEP 20
                    0xC0,0x02,0x00,                                             //CPY
                    0xF0,0x06,                                                  //BEQ
                    0xC0,0x01,0x00,                                             //CPY
                    0xF0,0x05,                                                  //BEQ
                    0x60,                                                       //RTS
                    0x20,0x26,0x9C,0x60,                                        //proceed with intro cinematic
                    0x20,0x14,0xA9,0x60,                                        //proceed with journey onward
                ];

    var injectedData = chestData.concat(dataCode);
    rom.set(injectedData, inCodeOffset);
}

function setMusic(buffer, random, music_flag)
{
    var rom = new Uint8Array(buffer);
    
    if(music_flag == 1)
    {
        shuffleMusic(rom, random);
    }
    else if(music_flag == 2)
    {
        randomizeMusic(rom, random);
    }
    else if(music_flag == 3)
    {
        removeMusic(rom);
    }
    
    recompressAllDecompressedData(rom);
    fixChecksum(rom);
	return rom;

}

function shuffleMusic(rom, random)
{
    var choices = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12];
    choices.shuffle(random);
    shuffleOverworldMusic(rom, [choices[0], choices[1], choices[2], choices[3]]); //oveworld themes
    rom[0x013C] = 0x01; //setting to check if other musics fail (defaults to 01 - set to 00 for no music)

    rom[0x19B9C] = choices[0]; //title music
    rom[0x1B25C] = choices[4]; //gem music
    rom[0x19C3F] = choices[5]; //intro cutscene
    rom[0x123A5] = choices[6]; //inventory
    rom[0x00FD] = choices[7]; //boat song
    rom[0x4895] = choices[8]; //battle theme
    rom[0x4A53] = choices[8]; //battle theme
    rom[0x0142] = choices[8]; //battle theme
    rom[0x0110] = choices[1]; //in building music theme
    rom[0x0120] = choices[9]; //dungeon theme
    rom[0x010C] = choices[2]; //castle britannia theme
    rom[0x011C] = choices[10]; //gargoyle theme
    rom[0x1AB81] = choices[11]; //end credits music

    shuffleSelganorMusic(rom, choices[12]);

    rom[0x147D5] = 0x00; //instruments base offset (0x0D is default)
    rom[0x18738] = choices[13]; //instruments - xylophone - this is an offset and (0x00) is default
    rom[0x1453B] = choices[14]; //instruments - lute - this is an offset and (0x01) is default
    rom[0x14537] = choices[15]; //instruments - panpipes - this is an offset and (0x02) is default
    rom[0x18735] = choices[16]; //instruments - harpsichord - this is an offset and (0x03) is default
    rom[0x1873B] = choices[17]; //instruments - harp - this is an offset and (0x04) is default
}

function shuffleSelganorMusic(rom, selectedMusic)
{
    var lzwData = decompressDataFromLZW(rom, 0x53900);
    lzwData[0x160F] = selectedMusic; //selganor stones song
    lzwData[0x231E] = selectedMusic; //gwenno stones song
}

function shuffleOverworldMusic(rom, choices)
{
    rom.set(choices, 0x0145); //oveworld themes
}

function randomizeMusic(rom, random)
{
    consoleLog("RANDOMIZE MUSIC");
    randomizeOverworldMusic(rom, random); //oveworld themes
    rom[0x013C] = 0x01; //setting to check if other musics fail (defaults to 01 - set to 00 for no music)
    rom[0x19B9C] = random.nextIntRange(1,18); //title music
    rom[0x1B25C] = random.nextIntRange(1,18); //gem music
    rom[0x19C3F] = random.nextIntRange(1,18); //intro cutscene
    rom[0x123A5] = random.nextIntRange(1,18); //inventory
    rom[0x00FD] = random.nextIntRange(1,18); //boat song

    rom[0x4895] = random.nextIntRange(1,18); //battle theme
    rom[0x4A53] = random.nextIntRange(1,18); //battle theme
    rom[0x0142] = random.nextIntRange(1,18); //battle theme
    rom[0x0110] = random.nextIntRange(1,18); //in building music theme
    rom[0x0120] = random.nextIntRange(1,18); //dungeon theme
    rom[0x010C] = random.nextIntRange(1,18); //castle britannia theme
    rom[0x011C] = random.nextIntRange(1,18); //gargoyle theme
    rom[0x1AB81] = random.nextIntRange(1,18); //end credits music

    rom[0x147D5] = 0x00; //instruments base offset
    rom[0x18738] = random.nextIntRange(1,18); //instruments - xylophone - this is an offset and (0x00) is default
    rom[0x1453B] = random.nextIntRange(1,18); //instruments - lute - this is an offset and (0x01) is default
    rom[0x14537] = random.nextIntRange(1,18); //instruments - panpipes - this is an offset and (0x02) is default
    rom[0x18735] = random.nextIntRange(1,18); //instruments - harpsichord - this is an offset and (0x03) is default
    rom[0x1873B] = random.nextIntRange(1,18); //instruments - harp - this is an offset and (0x04) is default
    randomizeSelganorMusic(rom, random);
}

function randomizeOverworldMusic(rom, random)
{
    var choices = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12];
    choices.shuffle(random);
    rom.set([choices.pop(), choices.pop(), choices.pop(), choices.pop()], 0x0145); //oveworld themes
}

function randomizeSelganorMusic(rom, random)
{
    var selection = random.nextIntRange(1,18);
    var lzwData = decompressDataFromLZW(rom, 0x53900);
    lzwData[0x160F] = selection; //selganor stones song
    lzwData[0x231E] = selection; //gwenno stones song
}

function removeMusic(rom)
{
    consoleLog("REMOVE MUSIC");
    rom.set([0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0x6B], 0x30003); //disable all calls to the music functions
    rom.set([0x00, 0x00, 0x00, 0x00], 0x0145); //oveworld themes
    rom[0x19B9C] = 0x00; //title music
    //rom[0x19BA5] = 0x00; //title music
    rom[0x1B25C] = 0x00; //gem music
    rom[0x19C3F] = 0x00; //intro cutscene
    rom[0x123A5] = 0x00; //inventory
    rom[0x00FD] = 0x00; //boat song
    rom[0x4895] = 0x00; //battle theme
    rom[0x4A53] = 0x00; //battle theme
    rom[0x0142] = 0x00; //battle theme
    rom[0x0110] = 0x00; //in building music theme
    rom[0x0120] = 0x00; //dungeon theme
    rom[0x010C] = 0x00; //castle britannia theme
    rom[0x011C] = 0x00; //gargoyle theme
    rom[0x1AB81] = 0x00; //end credits music
    rom[0x013C] = 0x00; //setting to check if other musics fail (defaults to 01 - set to 00 for no music)
    rom[0x147D5] = 0x00; //instruments base offset
    rom[0x18738] = 0x00; //instruments - xylophone - this is an offset and (0x00) is default
    rom[0x1453B] = 0x00; //instruments - lute - this is an offset and (0x01) is default
    rom[0x14537] = 0x00; //instruments - panpipes - this is an offset and (0x02) is default
    rom[0x18735] = 0x00; //instruments - harpsichord - this is an offset and (0x03) is default
    rom[0x1873B] = 0x00; //instruments - harp - this is an offset and (0x04) is default
    removeSelganorMusic(rom);
    writeTextToAddress(rom, 0xD753, 0x0D, "an instrument");
}

function removeSelganorMusic(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x53900);
    lzwData[0x160F] = 0x00; //selganor stones song
    lzwData[0x231E] = 0x00; //gwenno stones song
}

function randomizeMoonPhases(rom, random)
{
    //randomize the moon phase table by shifting the table or flipping the moon rotations or lengthening the phase lengths
    var moonPhaseTable = [            0x00, 0x00, 0x07, 0x00, 0x07, 0x07, 0x06, 0x06, 0x06, 0x05, 0x05,
        0x04, 0x05, 0x03, 0x04, 0x02, 0x03, 0x01, 0x03, 0x00, 0x02, 0x00, 0x02, 0x07, 0x01, 0x06, 0x01,
        0x05, 0x00, 0x04, 0x07, 0x03, 0x07, 0x02, 0x06, 0x01, 0x06, 0x00, 0x05, 0x00, 0x05, 0x07, 0x04,
        0x06, 0x03, 0x05, 0x03, 0x04, 0x02, 0x03, 0x02, 0x02, 0x01, 0x01, 0x01, 0x00];

    rotateArrayRight(moonPhaseTable,random.nextIntRange(0,27)*2);

    rom.set(moonPhaseTable, 0xBB35);
}

function addCustomSherryItem(rom, canPlaceItems)
{
    //adjust name of Cheese in dialog
    var lzwData = decompressDataFromLZW(rom, 0x48000);
    var oddCheeseHex = 0x57;
    lzwData[0x2BF5] = oddCheeseHex; //change the item Sherry wants
    lzwData[0x2C1D] = oddCheeseHex; //change the item Sherry wants
    lzwData[0x2C20] = oddCheeseHex; //change the item Sherry wants
    lzwData.set([0x2F, 0x44, 0x44, 0x5F, 0x23, 0x48, 0x45, 0x45, 0x53, 0x45],0x2DFD); //change text ANY CHEESE to ODD CHEESE
    lzwData.set([0x2F, 0x44, 0x44, 0x5F, 0x23, 0x48, 0x45, 0x45, 0x53, 0x45],0x2E2F); //change text ANY CHEESE to ODD CHEESE

    rom.set([0x2F, 0x44, 0x44, 0x5F, 0x23, 0x48, 0x45, 0x45, 0x53, 0x45],0xE369) //change text WIZARD EYE to ODD CHEESE
    rom[0xFA3B] = 0x02; //change data (setting to 02 sets the item to not be droppable)
    rom[0xFC0D] = 0x02; //change weight
    rom.set([0x88, 0x11, 0x89, 0x11, 0x98, 0x11, 0x9B, 0x11],0x13A57); //convert unused Wizard Eye Item sprite into Custom Sherry Item sprite(item 57)

    if (canPlaceItems == false)
    {
        var lzwData = decompressDataFromLZW(rom, 0x58000);
        writeTextToAddress(lzwData, 0x42B0, 58, "There was a peculiar Odd Cheese kept in the nearby cellar."); //change Dezana CHAT text to Cheese hint

        var lzwData = decompressDataFromLZW(rom, 0x9D000);
	    lzwData[0x27EB] = 0x42; //add sherry chest (magic lock)
    	rom.set([0x19, 0x8D, 0x80, oddCheeseHex], 0x117CA); //convert spring water to cheese for sherry chest
    }

}

function setPoisionFlash(buffer, flashSelection)
{
    var rom = new Uint8Array(buffer);

    if(flashSelection == 0) //default
    {
        rom.set([0xE0, 0x03],0x1B5A0);
        rom.set([0xE0, 0x03],0xB523);
        rom.set([0x1F, 0x00],0xB53B);
    }
    else if(flashSelection == 1)
    {
        rom.set([0x62, 0x00],0x1B5A0); //reduced per step poison flash
        rom.set([0x62, 0x00],0xB523); //reduced initial poison flash
        rom.set([0x05, 0x00],0xB53B); //reduced initial lava flash
    }
    else if(flashSelection == 2)
    {
        rom.set([0x00, 0x00],0x1B5A0); //reduced per step poison flash
        rom.set([0x00, 0x00],0xB523); //reduced initial poison flash
        rom.set([0x00, 0x00],0xB53B); //reduced initial lava flash
    }

    fixChecksum(rom);
	return rom;
}

function easyKarmaMode(rom)
{
    console.log("SETTING EASY KARMA MODE");
    rom[0x812A] = 0x64; //set starting karma to a higher number

    //branch from where karma is increased to multiple all rewards
    rom.set([   0x20, 0xB2, 0xFC, // branch to FCB2
            ], 0xAA87);

    rom.set([   0x0A, // multiple accumulator
                0x6D, 0x4A, 0x01, // add accumulator and current karma value together
                0x60, // return
            ], 0xFCB2);

    //branch from where karma is decremented to set all penalties to 01
    rom.set([   0x20, 0xE0, 0xFC, 0xEA, 0xEA, // branch to FCAA
            ], 0xAA94);

    rom.set([   0xA9, 0x01, // load value 01 into accumulator
                0x85, 0x00, // store A at 00
                0xAD, 0x4A, 0x01, // load 014A
                0x60, // return
            ], 0xFCE0);
}

function hardKarmaMode(rom)
{
    console.log("SETTING HARD KARMA MODE");
    rom[0x812A] = 0x3C; //set starting karma to a lower number

    //branch from where karma is decremented to double penalties
    rom.set([   0x20, 0xE0, 0xFC, 0xEA, 0xEA, // branch to FCAA
            ], 0xAA94);

    rom.set([   0x0A, 0xEA, // double accumulator then do nothing (keeps the code the same length as the easy karma mode)
                0x85, 0x00, // store A at 00
                0xAD, 0x4A, 0x01, 0x60, // load 014A
            ], 0xFCE0);
}

function easyItemMode(rom)
{
    console.log("SETTING EASY ITEM MODE");
    rom[0x1B68E] = 0x7F; //set invis and regen to break less often
}

function hardItemMode(rom)
{
    console.log("SETTING HARD ITEM MODE");
    rom[0x1B68E] = 0x0F; //set invis and regen effects to break more often
    rom.set([0xAD, 0x01], 0x1B6F9); //set invis rings to break more often
    rom.set([0xDE, 0x02], 0x1B72D); //set regen rings to break more often
}

function adjustDayLength(rom, desiredLength)
{
    console.log("ADJUSTING DAY NIGHT CYCLE");
    var timeMultiplier = 0x00; //0 and 1=default, 2=2x, 3=3x, 4=4x
    var dawnTime = 0x06;
    var duskTime = 0x13;

    //first we move the sleep timer byte to a new area in memory to prevent other code overrides
    rom[0xB67E] = 0xFF;
    rom[0xB6F0] = 0xFF;

    if(desiredLength == 1) //PC timing
    {
        timeMultiplier = 0x02;
        dawnTime = 0x00;
        duskTime = 0xFF;
    }
    else if(desiredLength == 2) //2x day
    {
        timeMultiplier = 0x02;
    }
    else if(desiredLength == 3) //3x day
    {
        timeMultiplier = 0x03;
    }

    //branch function at (BA30) to a new space in code (FC87)
    rom.set([0x20, 0x50, 0xFD, 0xEA, 0xEA, 0xEA],0xBA30); //jsr to FC87

    //load hour data, branch if <5 or >12
    rom.set([   0xA5, 0xFF, //load sleep timer (check if we are suppose to be asleep)
                0xC9, 0x00, 0xD0, 0x18, //compare and branch if greater than 0 (skip if we are sleeping)
                0xB5, 0x51, //load hour time
                0xC9, dawnTime, 0x90, 0x12, //compare and branch if less than 6 (skip if pre-dawn)
                0xC9, duskTime, 0xB0, 0x0E, //compare and branch if greater than 12 (skip if post dusk)
                0xB5, 0xFF, 0x1A, //load and increment multiplier timer
                0xC9, timeMultiplier, 0xB0, 0x07, //compare and branch if greater than timer value
                0x95, 0xFF, //store incremented value
                0xB5, 0x52, //load minute time
                0xC2, 0x21, //reset status bits
                0x60, //return
                0xA9, 0x00, //reset multiplier timer
                0x95, 0xFF, //store new value
                0xB5, 0x52, //load minute time
                0xC2, 0x21, //reset status bits
                0x65, 0x00, //add minute time
                0x60, //return
            ], 0xFD50);
}

function updateShrineText(rom)
{
	//this function updates the code that reads a byte checked for item pickups
	//E1 is the dialog command to check for item being inspected
	rom.set([0x20, 0x00, 0xFD],0xBD24); //inject new address

	rom.set([	0xC9, 0xE1, 0xD0, 0x05, //branch if accumulator is not E1
				0xA6, 0xE5, 0x8E, 0x38, 0xA7, //load E5(item id) into X then store X into A738
				0x38, 0xBE, 0x38, 0xA7, //add back code we injected over (LDX A738)
				0x60, //return
			],0xFD00);
}

function adjustCamping(rom)
{
    //adjustCampingRoomCheck(rom);
    //allowCampingAnywhere(rom);
    //allowCampingIndoors(rom);
    allowCampingInTown(rom);
    //allowCampingNearFoes(rom);
}

function allowCampingAnywhere(rom)
{
    rom.set([0x80, 0x1C],0xB651);
}

function adjustCampingRoomCheck(rom)
{
    rom.set([0xEA, 0xEA, 0xEA],0xB66F);
}

function allowCampingIndoors(rom)
{
    rom.set([0x80, 0x06],0xB659);
}

function allowCampingInTown(rom)
{
    rom.set([0xEA, 0xEA, 0xEA],0xB665);
}

function allowCampingNearFoes(rom)
{
    rom.set([0xEA, 0xEA, 0xEA],0xB66A);
}

function fastActionButtonBinding(rom)
{
	console.log("ADDING NEW BUTTON MAPPING");

    var BUTTON_A = 0x00;
    var BUTTON_X = 0x01;
    var BUTTON_L = 0x02;
    var BUTTON_R = 0x03;
    //var BUTTON_B = 0x04;
    var BUTTON_Y = 0x05;
    //var BUTTON_SELECT = 0x06;
    var BUTTON_START = 0x07;

    //override old A-Button handler    
    rom.set([0x4C, 0x73, 0xFB, 0xEA],0x09A0);
    
    //allow L and R to be used
    rom.set([0x29, 0xF0, 0xF0],0x08C2);
    rom.set([0xA5, 0x01, 0x4A, 0x4A, 0x4A, 0x4A, 0x05, 0x00, 0x0A, 0xB0, 0x0C, 0xE8, 0xE0, 0x00, 0x09, 0x90,
             0xF7, 0xEA, 0xEA, 0xEA],0x2572);

    rom.set([0x29, 0x0F,
                0xC9, BUTTON_Y, 0xD0, 0x06, 0x22, 0x76, 0x84, 0x03, 0x80, 0x2F, //LOOK
                0xC9, BUTTON_START, 0xD0, 0x03, 0x4C, 0x16, 0x8A, //INVENTORY
                0xC9, BUTTON_L, 0xD0, 0x06, 0x22, 0x32, 0x84, 0x03, 0x80, 0x1E, //CAST
                0xC9, BUTTON_R, 0xD0, 0x06, 0x22, 0xBB, 0x82, 0x03, 0x80, 0x14, //ATTACK
                0xC9, BUTTON_A, 0xD0, 0x03, 0x4C, 0xD8, 0x89,  //OPEN MENU
                0xC9, BUTTON_X, 0xD0, 0x06, 0x22, 0x00, 0x80, 0x03, 0x80, 0x03, //TALK
                0x4C, 0xA4, 0x89, 0x4C, 0xFA, 0x89],0x7B73);

}

function setStartingGold(rom, inGoldSetting, random)
{
    console.log("SETTING STARTING GOLD");

    if(inGoldSetting == 1)
    {
        rom.set([0x00, 0x00],0x805A); //set starting gold to none
    }
    else if(inGoldSetting == 2)
    {
        rom.set([0x90, 0x01],0x805A); //set starting gold 400 (2x base)
    }
    else if(inGoldSetting == 3)
    {
        rom.set([0x20, 0x03],0x805A); //set starting gold 800 (4x base)
    }
    else if(inGoldSetting == 4)
    {
        var randNum = random.nextIntRange(0,801);
        var hexRandNum = randNum.toHex(2);
        var hexArray = hexToHexArray(hexRandNum);
        if(hexArray.length < 2)
        {
            hexArray.push("0x00");
        }
        rom.set([hexArray[0], hexArray[1]],0x805A); //set starting gold a random value between 0 and 800
    }
}

function setStartingInventory(rom, random, inInventorySetting)
{
    console.log("SETTING STARTING INVENTORIES");
    //rom.set([0x00, 0x00, 0x00, 0x23, 0x00, 0x00, 0x00, 0x00, 0x04, 0x68, 0x01, 0x3A, 0x01, 0x7A, 0x01, 0x34, 0x00],0xF914); //default avatar inventory
    //rom.set([0x00, 0x03, 0x16, 0x23, 0x0C, 0x00, 0x37, 0x00, 0x03, 0x4C, 0x01, 0x40, 0x06, 0x7A, 0x01],0xF925); //default dupre inventory
    //rom.set([0x00, 0x02, 0x15, 0x23, 0x1B, 0x00, 0x37, 0x00, 0x04, 0x40, 0x06, 0x4A, 0x01, 0x2F, 0x0C, 0x7A, 0x01],0xF934); //default shamino inventory
    //rom.set([0x00, 0x01, 0x12, 0x22, 0xFF, 0x00, 0x38, 0x00, 0x06, 0x59, 0x01, 0x76, 0x01, 0x6A, 0x06, 0x19, 0x01, 0x56, 0x90, 0x7A, 0x01],0xF945); //default iolo inventory
    
    if(inInventorySetting == 1) //none
    {
        clearInventories(rom);

        //add food to empty inventory slots to prevent "selling hands" bug
        setRandomInventoryForEmptySetting(rom, random, 0xF914, 1, 0); //avatar inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF925, 2, 0); //dupre inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF934, 3, 0); //shamino inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF945, 3, 4); //iolo inventory

        setRandomInventoryForEmptySetting(rom, random, 0xF95A, 1, 0); //jaana inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF967, 0, 0); //gwenno inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF972, 0, 0); //julia inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF97D, 0, 0); //katrina inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF988, 4, 0); //leodon inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF99B, 0, 0); //leonna inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF9A6, 0, 0); //blaine inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF9B1, 2, 0); //seggal inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF9C0, 0, 0); //sentri inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF9CB, 2, 0); //gorn inventory
        setRandomInventoryForEmptySetting(rom, random, 0xF9DA, 0, 0); //beh lem inventory
    }
    if(inInventorySetting > 1) //random
    {
        //clear inventories first
        clearInventories(rom);

        var raritySetting = inInventorySetting-2;
        var rarityMin = 0;
        var rarityMax = 3;

        if(raritySetting == 1)
        {
            rarityMin = 1;
            rarityMax = 1;
        }
        else if(raritySetting == 2)
        {
            rarityMin = 1;
            rarityMax = 2;
        }
        else if(raritySetting == 3)
        {
            rarityMin = 2;
            rarityMax = 3;
        }

        //randomly select a weapon set
        setRandomWeaponSet(rom, random, 0xF914, 0, rarityMin, rarityMax); //avatar inventory
        setRandomWeaponSet(rom, random, 0xF925, 0, rarityMin, rarityMax); //dupre inventory
        setRandomWeaponSet(rom, random, 0xF934, 0, rarityMin, rarityMax); //shamino inventory
        setRandomWeaponSet(rom, random, 0xF945, 4, rarityMin, rarityMax); //iolo inventory

        setRandomWeaponSet(rom, random, 0xF95A, 0, rarityMin, rarityMax); //jaana inventory
        setRandomWeaponSet(rom, random, 0xF967, 0, rarityMin, rarityMax); //gwenno inventory
        setRandomWeaponSet(rom, random, 0xF972, 0, rarityMin, rarityMax); //julia inventory
        setRandomWeaponSet(rom, random, 0xF97D, 0, rarityMin, rarityMax); //katrina inventory
        setRandomWeaponSet(rom, random, 0xF988, 0, rarityMin, rarityMax); //leodon inventory
        setRandomWeaponSet(rom, random, 0xF99B, 0, rarityMin, rarityMax); //leonna inventory
        setRandomWeaponSet(rom, random, 0xF9A6, 0, rarityMin, rarityMax); //blaine inventory
        setRandomWeaponSet(rom, random, 0xF9B1, 0, rarityMin, rarityMax); //seggal inventory
        setRandomWeaponSet(rom, random, 0xF9C0, 0, rarityMin, rarityMax); //sentri inventory
        setRandomWeaponSet(rom, random, 0xF9CB, 0, rarityMin, rarityMax); //gorn inventory
        setRandomWeaponSet(rom, random, 0xF9DA, 0, rarityMin, rarityMax); //beh lem inventory

        //randomly select an armor set
        setRandomArmorSet(rom, random, 0xF914, rarityMin, rarityMax); //avatar inventory
        setRandomArmorSet(rom, random, 0xF925, rarityMin, rarityMax); //dupre inventory
        setRandomArmorSet(rom, random, 0xF934, rarityMin, rarityMax); //shamino inventory
        setRandomArmorSet(rom, random, 0xF945, rarityMin, rarityMax); //iolo inventory

        setRandomArmorSet(rom, random, 0xF95A, rarityMin, rarityMax); //jaana inventory
        setRandomArmorSet(rom, random, 0xF967, rarityMin, rarityMax); //gwenno inventory
        setRandomArmorSet(rom, random, 0xF972, rarityMin, rarityMax); //julia inventory
        setRandomArmorSet(rom, random, 0xF97D, rarityMin, rarityMax); //katrina inventory
        setRandomArmorSet(rom, random, 0xF988, rarityMin, rarityMax); //leodon inventory
        setRandomArmorSet(rom, random, 0xF99B, rarityMin, rarityMax); //leonna inventory
        setRandomArmorSet(rom, random, 0xF9A6, rarityMin, rarityMax); //blaine inventory
        setRandomArmorSet(rom, random, 0xF9B1, rarityMin, rarityMax); //seggal inventory
        setRandomArmorSet(rom, random, 0xF9C0, rarityMin, rarityMax); //sentri inventory
        setRandomArmorSet(rom, random, 0xF9CB, rarityMin, rarityMax); //gorn inventory
        setRandomArmorSet(rom, random, 0xF9DA, rarityMin, rarityMax); //beh lem inventory

        //randomly select inventory items
        setRandomInventorySet(rom, random, 0xF914, 1, 0, 1, rarityMax); //avatar inventory
        setRandomInventorySet(rom, random, 0xF925, 2, 0, 1, rarityMax); //dupre inventory
        setRandomInventorySet(rom, random, 0xF934, 3, 0, 1, rarityMax); //shamino inventory
        setRandomInventorySet(rom, random, 0xF945, 3, 4, 1, rarityMax); //iolo inventory

        setRandomInventorySet(rom, random, 0xF95A, 1, 0, 1, rarityMax); //jaana inventory
        setRandomInventorySet(rom, random, 0xF967, 0, 0, 1, rarityMax); //gwenno inventory
        setRandomInventorySet(rom, random, 0xF972, 0, 0, 1, rarityMax); //julia inventory
        setRandomInventorySet(rom, random, 0xF97D, 0, 0, 1, rarityMax); //katrina inventory
        setRandomInventorySet(rom, random, 0xF988, 4, 0, 1, rarityMax); //leodon inventory
        setRandomInventorySet(rom, random, 0xF99B, 0, 0, 1, rarityMax); //leonna inventory
        setRandomInventorySet(rom, random, 0xF9A6, 0, 0, 1, rarityMax); //blaine inventory
        setRandomInventorySet(rom, random, 0xF9B1, 2, 0, 1, rarityMax); //seggal inventory
        setRandomInventorySet(rom, random, 0xF9C0, 0, 0, 1, rarityMax); //sentri inventory
        setRandomInventorySet(rom, random, 0xF9CB, 2, 0, 1, rarityMax); //gorn inventory
        setRandomInventorySet(rom, random, 0xF9DA, 0, 0, 1, rarityMax); //beh lem inventory
    }

    moveAnkhNecklace(rom);
}

function moveAnkhNecklace(rom)
{
    //if we are the avatar, check if there is a blank space in our inventory at this point, if so, move the ankh necklace back into the inventory
    if(rom[0xF914+11] == 0x00)
    {
        rom[0xF914] = 0x00;
        rom[0xF914+11] = 0x3A;
        rom[0xF914+12] = 0x01;
    }
}

function clearInventories(rom)
{
    rom.set([0x3A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x68, 0x01, 0x00, 0x00, 0x7A, 0x01, 0x34, 0x00], 0xF914); //avatar inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x7A, 0x01, 0x00, 0x00, 0x00, 0x00], 0xF925); //dupre inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x7A, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], 0xF934); //shamino inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x7A, 0x01, 0x59, 0x01, 0x76, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], 0xF945); //iolo inventory

    //TODO - Bags for members being first causes issues when trying to place progression items and inventories are not-randomized
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x7A, 0x01, 0x00, 0x00], 0xF95A); //jaana inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x7A, 0x01], 0xF967); //gwenno inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x7A, 0x01], 0xF972); //julia inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x7A, 0x01], 0xF97D); //katrina inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05, 0x7A, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], 0xF988); //leodon inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x7A, 0x01], 0xF99B); //leonna inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x7A, 0x01], 0xF9A6); //blaine inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x7A, 0x01, 0x00, 0x00, 0x00, 0x00], 0xF9B1); //seggal inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x7A, 0x01], 0xF9C0); //sentri inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x7A, 0x01, 0x00, 0x00, 0x00, 0x00], 0xF9CB); //gorn inventory
    rom.set([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x7A, 0x01], 0xF9DA); //beh lem inventory
}

function getItemsOfRarity(itemPool, rarityMin, rarityMax)
{
    var items = [];

    for(var i = 0; i < itemPool.length; ++i)
    {
        if(itemPool[i].rarity >= rarityMin)
        {
            if(itemPool[i].rarity <= rarityMax)
            {
                items.push(itemPool[i]);
            }
        }
    }

    return items;
}

function setRandomWeaponSet(rom, random, address, inventoryOffset, rarityMin, rarityMax)
{
    var itemPool = getItemsOfRarity(DATA_PLAYER_WEAPON_SETS, rarityMin, rarityMax);
    var chosenSet = random.from(itemPool);
    rom[address+3] = random.from(chosenSet.hand_right); //right hand
    rom[address+4] = random.from(chosenSet.hand_left); //left hand
    
    var ammoItem = random.from(chosenSet.ammo);
    if(ammoItem > 0 && rom[address+11+inventoryOffset] == 0x00) //if we should have ammo and also the inventory slot is available
    {
        rom[address+11+inventoryOffset] = ammoItem; //ammo
        rom[address+12+inventoryOffset] = random.nextIntRange(chosenSet.ammoMinMax[0],chosenSet.ammoMinMax[1]); //quantity
    }
}

function setRandomArmorSet(rom, random, address, rarityMin, rarityMax)
{
    var itemPool = getItemsOfRarity(DATA_PLAYER_ARMOR_SETS, rarityMin, rarityMax);
    var chosenSet = random.from(itemPool);

    if(rom[address] == 0x00)
    {
        rom[address] = random.from(chosenSet.necklace); //necklace
    }
    rom[address+1] = random.from(chosenSet.helm); //helm
    rom[address+2] = random.from(chosenSet.armor); //armor
    
    if(rom[address+4] == 0x00) //only set a shield if we are not already duel wielding
    {
        rom[address+4] = random.from(chosenSet.shield); //shield
    }
    
    rom[address+6] = random.from(chosenSet.boots); //boots
}

function setRandomInventorySet(rom, random, address, inventoryCount, inventoryOffset, rarityMin, rarityMax)
{
    //ensure that this slot is not already being used (such as by added ammo or non-removed items)
    var itemPool = getItemsOfRarity(DATA_PLAYER_INVENTORY_SETS, rarityMin, rarityMax);
    var chosenItems = [];

    for(var i = 0; i < inventoryCount; ++i)
    {
        var chosenSet = random.from(itemPool); //choose a new rarity set for each item
        var inventoryAddress = address+11+inventoryOffset+(i*2);

        if(rom[inventoryAddress] == 0x00) //only add this item if there is an open space here
        {
            //choose and set an item
            var selectedItem = random.from(chosenSet.item);
            if(chosenItems.length > 0)
            {
                var bUniqueItem = false;
                var safetyCounter = 0;
                while(!bUniqueItem)
                {
                    var noDuplicateFound = true;
                    for(var j = 0; j < chosenItems.length; ++j)
                    {
                        if(chosenItems[j] == selectedItem)
                        {
                            chosenSet = random.from(itemPool);
                            selectedItem = random.from(chosenSet.item);
                            noDuplicateFound = false;
                        }
                    }

                    if(safetyCounter > 9 || noDuplicateFound == true)
                    {
                        break;
                    }
                    safetyCounter += 1;
                }
            }
            chosenItems.push(selectedItem);
            rom[inventoryAddress] = selectedItem;

            //set the quantity for this item
            for(var j = 0; j < chosenSet.item.length; ++j)
            {
                if(chosenSet.item[j] == selectedItem)
                {
                    rom[inventoryAddress+1] = random.nextIntRange(1, chosenSet.quantity[j]);
                    break;
                }
            }
        }
    }
}

function setRandomInventoryForEmptySetting(rom, random, address, inventoryCount, inventoryOffset)
{
    var inventoryPool = getEmptyItemPoolForInventory();
    for(var i = 0; i < inventoryCount; ++i)
    {
        var inventoryAddress = address+11+inventoryOffset+(i*2);

        if(rom[inventoryAddress] == 0x00) //only add this item if there is an open space here
        {
            //choose and set an item
            var selectedNum = random.nextIntRange(0, inventoryPool.itemPool.length);
            var selectedItem = inventoryPool.itemPool[selectedNum];
            rom[inventoryAddress] = selectedItem;
            rom[inventoryAddress+1] = random.nextIntRange(1, inventoryPool.quantityPool[selectedNum]);
        }
    }
}

function getEmptyItemPoolForInventory()
{
    var itemPool = [];
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_ITEMS_FOOD.items);

    var quantityPool = [];
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_ITEMS_FOOD.quantity);

    return {    itemPool : itemPool,
                quantityPool : quantityPool,
            };
}

function setStartingInventoryChaotic(rom, random)
{
    console.log("SETTING STARTING INVENTORIES - CHAOTIC");

    clearInventories(rom);

    setStartingInventoryChaoticPerCharacter(rom, random, 0xF914, 1, 0); //avatar inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF925, 2, 0); //dupre inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF934, 3, 0); //shamino inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF945, 3, 4); //iolo inventory

    setStartingInventoryChaoticPerCharacter(rom, random, 0xF95A, 1, 0); //jaana inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF967, 0, 0); //gwenno inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF972, 0, 0); //julia inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF97D, 0, 0); //katrina inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF988, 4, 0); //leodon inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF99B, 0, 0); //leonna inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF9A6, 0, 0); //blaine inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF9B1, 0, 0); //seggal inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF9C0, 0, 0); //sentri inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF9CB, 2, 0); //gorn inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF9DA, 0, 0); //beh lem inventory

    moveAnkhNecklace(rom);
}

function setStartingInventoryChaoticPerCharacter(rom, random, address, inventoryCount, inventoryOffset)
{
    var chosenItem;

    if(rom[address] == 0x00) //ensure this slot is empty
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            var itemPool = [];
            itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_NECKLACE.items);
            chosenItem = random.from(itemPool);
            rom[address] = chosenItem; //necklace
        }
    }

    if(rom[address+1] == 0x00) //ensure this slot is empty
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            var itemPool = [];
            itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_HELMS.items);
            chosenItem = random.from(itemPool);
            rom[address+1] = chosenItem; //helm
        }
    }

    if(rom[address+2] == 0x00) //ensure this slot is empty
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            var itemPool = [];
            itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_ARMOR.items);
            chosenItem = random.from(itemPool);
            rom[address+2] = chosenItem; //armor
        }
    }

    if(rom[address+3] == 0x00) //ensure this slot is empty
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            var itemPool = [];
            itemPool = itemPool.concat(itemPool = DATA_PLAYER_INVENTORY_WEAPONS_1H.items);
            itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_WEAPONS_2H.items);
            chosenItem = random.from(itemPool);
            rom[address+3] = chosenItem; //weapon
            
            for(var searchItr = 0; searchItr < DATA_PLAYER_INVENTORY_WEAPONS_2H.items.length; ++searchItr)
            {
                if(chosenItem == DATA_PLAYER_INVENTORY_WEAPONS_2H.items[searchItr])
                {
                    rom[address+4] = 0xFF; //set the second hand to full if a 2H weapon was selected
                    break;
                }
            }
        }
    }

    if(rom[address+4] == 0x00) //ensure this slot is empty
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            if(random.flipCoin(0.5)) //some percentage of items should be "none"
            {
                var itemPool = [];
                itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_SHIELDS.items);
                chosenItem = random.from(itemPool);
                rom[address+4] = chosenItem; //shield
            }
            else
            {
                var itemPool = [];
                itemPool = itemPool.concat(itemPool = DATA_PLAYER_INVENTORY_WEAPONS_1H.items);
                chosenItem = random.from(itemPool);
                rom[address+4] = chosenItem; //weapon
            }
        }
    }

    if(rom[address+5] == 0x00)
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            var itemPool = [];
            itemPool = itemPool.concat(itemPool = DATA_PLAYER_INVENTORY_RINGS.items);
            chosenItem = random.from(itemPool);
            rom[address+5] = chosenItem; //ring
        }
    }
  
    if(rom[address+6] == 0x00) //only set a shield if we are not already duel wielding
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            var itemPool = [];
            itemPool = itemPool.concat(itemPool = DATA_PLAYER_INVENTORY_BOOTS.items);
            chosenItem = random.from(itemPool);
            rom[address+6] = chosenItem; //boots
        }
    }

    if(rom[address+7] == 0x00)
    {
        if(random.flipCoin(0.5)) //some percentage of items should be "none"
        {
            var itemPool = [];
            itemPool = itemPool.concat(itemPool = DATA_PLAYER_INVENTORY_RINGS.items);
            chosenItem = random.from(itemPool);
            rom[address+7] = chosenItem; //ring
        }
    }

    var inventoryPool = getChaoticItemPoolForInventory(rom, random);
    for(var i = 0; i < inventoryCount; ++i)
    {
        var inventoryAddress = address+11+inventoryOffset+(i*2);

        if(rom[inventoryAddress] == 0x00) //only add this item if there is an open space here
        {
            //choose and set an item
            var selectedNum = random.nextIntRange(0, inventoryPool.itemPool.length);
            var selectedItem = inventoryPool.itemPool[selectedNum];
            rom[inventoryAddress] = selectedItem;
            rom[inventoryAddress+1] = random.nextIntRange(1, inventoryPool.quantityPool[selectedNum]);
        }
    }
}

function getChaoticItemPoolForInventory()
{
    var itemPool = [];
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_ARMOR.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_HELMS.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_SHIELDS.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_WEAPONS_1H.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_WEAPONS_2H.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_NECKLACE.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_BOOTS.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_RINGS.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_ITEMS.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_ITEMS_FOOD.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_ITEMS_POTIONS.items);
    itemPool = itemPool.concat(DATA_PLAYER_INVENTORY_ITEMS_REAGENTS.items);

    var quantityPool = [];
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_ARMOR.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_HELMS.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_SHIELDS.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_WEAPONS_1H.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_WEAPONS_2H.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_NECKLACE.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_BOOTS.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_RINGS.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_ITEMS.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_ITEMS_FOOD.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_ITEMS_POTIONS.quantity);
    quantityPool = quantityPool.concat(DATA_PLAYER_INVENTORY_ITEMS_REAGENTS.quantity);

    return {    itemPool : itemPool,
                quantityPool : quantityPool,
            };
}

function overrideMoongateShrineCheck(rom)
{
    rom.set([0xEA, 0xA9, 0xFF],0x678); //overwrite shrines cleared byte load and force it to always think the shrines are active
    
    //remove the code that removes moongates when clearing shrines
    rom.set([0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA],0x14164);
    rom.set([0xEA, 0xEA, 0xEA, 0xEA],0x14182);
}

function removeRafts(rom)
{
    //move the rafts somewhere that traps them behind bridges and prevents them from accessing the ocean
    //x,y - 7E7BD4, 7E7C26 - move empath raft to 5D 00, D5 00 (river west of empath) - 0x16726 - 88 B8 82 
    setRaftPosition(rom, 0x16726, 0x5D, 0x00, 0xD5, 0x00);

    //x,y - 7E7BD6, 7E7C28 - move long haul raft to 25 01, 94 00 (river east of yew) - 0x16729 - ED 3D 82
    setRaftPosition(rom, 0x16729, 0x25, 0x01, 0x94, 0x00);

    //x,y - 7E7BDA, 7E7C2C - move cove raft to 13 02, 56 01 (trapped near cove) - 0x1672F - 4A FA 84
    setRaftPosition(rom, 0x1672F, 0x13, 0x02, 0x56, 0x01);

    //x,y - 7E7BD8, 7E7C2A - move swamp raft to 96 03, 13 02 (trapped in moonglow) - 0x1672C - F3 D5 83
    //setRaftPosition(rom, 0x1672C, 0x96, 0x03, 0x13, 0x02);

    //x,y - 7E7BDC, 7E7C2E - move skara raft to E0 00, AC 01 (shame entrance) - 0x16732 - 42 A8 87
    setRaftPosition(rom, 0x16732, 0xE0, 0x00, 0xAC, 0x01);
}

function addRafts(rom)
{
    //---------rafts
    //x,y - 7E7BAA, 7E7BFC - minoc ship
    //x,y - 7E7BCC, 7E7C1E - jhelom ship
    //x,y - 7E7BCE, 7E7C20 - jhelom ship

    if ($('#select-spiritshrine').val() > 0 )
	{
        //x,y - 7E7BA8, 7E7BFA - minoc ship - 0x166E4 - 52 DE 61
        //add - shrine of spirituality 5F 00, 73 00 = 5F CC 81
        setRaftPosition(rom, 0x166E4, 0x5F, 0x00, 0x73, 0x00);
    }

    //x,y - 7E7BB8, 7E7C0A - britain ship - 0x166FC - 37 F5 66
    //add - shrine of honesty B3 03, 0F 01
    setRaftPosition(rom, 0x166FC, 0xB3, 0x03, 0x0F, 0x01);

    //x,y - 7E7BC2, 7E7C14 - den ship - 0x1670B - 4E DA 69
    //add - shrine of humility A2 03, AF 03
    setRaftPosition(rom, 0x1670B, 0xA2, 0x03, 0xAF, 0x03);

    //x,y - 7E7BCA, 7E7C1C - jhelom ship
    //add - shrine of valor 82 00, AF 03 - 0x16717 - 9D B8 6D
    setRaftPosition(rom, 0x16717, 0x8B, 0x00, 0xAE, 0x03);

    //add - bonn
    //add - skara brae mage
    //add - stonegate
    //add - new maginica
    //add - serpents hold
    //add - sutek

    //---------moongates
    //var lzwData = decompressDataFromLZW(rom, 0x9D000);
	//lzwData.set([0x56,0x57], 0x54D); //lycaeum - blue moongate (not necessary as to reach this point requires a spellbook which means you are able to cast help)
}

function setRaftPosition(rom, inAddress, inX, inSuperChunkX, inY, inSuperChunkY)
{
    var raftPos = encode3BytePosition([inX, inSuperChunkX, inY, inSuperChunkY]);
    raftPos[2] += 0x80;
    rom.set(raftPos, inAddress);
}

function increaseSpellbookPrices(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x4B900);
	//lzwData.set([0x88, 0x12], 0x2A72); //increase xiao spellbook price
    lzwData.set([0x2D, 0x0E, 0x7F, 0x12], 0x2A70); //replace xiao spellbook with energy wand

    var lzwData = decompressDataFromLZW(rom, 0x58000);
	//lzwData.set([0x88, 0x12], 0x4C3A); //increase horance spellbook price
    lzwData.set([0x2E, 0x0E, 0x7F, 0x12], 0x4C38); //replace horance spellbook with fire wand

    var lzwData = decompressDataFromLZW(rom, 0x51B00);
	//lzwData.set([0x88], 0x2484); //increase nicodemus spellbook price

    var lzwData = decompressDataFromLZW(rom, 0x61A00);
	//lzwData.set([0x4E, 0x0E, 0x03, 0x0E, 0x4F,
    //    0x0E, 0x01, 0x0E, 0x50, 0x0E, 0x02, 0x0E, 0x52, 0x0E, 0x02, 0x0E, 0x53, 0x0E, 0x02, 0x0E, 0x54,
    //    0x0E, 0x01, 0x0E, 0x34, 0x0E, 0x88, 0x05], 0x17EB); //increase rudyom spellbook price and shift to the end of the list
    lzwData.set([0x32, 0x0E, 0x7F], 0x17EB); //replace rudyom spellbook with regen ring
}

function removeUnlockAndDispelSpellsFromShops(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x4B900);
    //lzwData.set([0x0F, 0x0E, 0x86, 0x12], 0x2A82); //change xiao dispel field spell price
    lzwData.set([0x11, 0x0E, 0x80, 0x8C], 0x2A82); //change xiao dispel field spell to protection spell


    var lzwData = decompressDataFromLZW(rom, 0x58000);
	//lzwData.set([0x14, 0x0E, 0x7F], 0x4C49); //swap horance disable and unlock spells and then increase unlock spell price
	//lzwData.set([0x0A, 0x0E, 0x86, 0x12], 0x4C55); //swap horance disable and unlock spells and then increase unlock spell price
    lzwData.set([0x09, 0x0E, 0x3C], 0x4C49); //change horance unlock spell to sleep spell
}

function alwaysAllowLensPlacement(rom)
{
    console.log("ALWAYS ALLOW LENS PLACEMENT");
    //remove the need for the lenscrafters to be spoken to in order to complete the game
    rom.set([0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA], 0x13E28); //remove checks for the Human Lens
    rom.set([0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA], 0x13E42); //remove checks for the Gargoyle Lens
    rom.set([0xEA, 0xEA, 0xEA, 0xEA], 0x13E6E); //remove removing the two lens from your inventory when placed

    //unlockLensKeywordFromStart(rom);
}

function openAvatarShrine(rom)
{
    console.log("OPEN AVATAR SHRINE");
    //remove the need to talk to the shrine of singularity to complete the game
    rom.set([0x80], 0x133D); //remove need to talk to the singularity shrine
}

function insertEndGameCall(rom, inAddress)
{
    rom.set([0x22, 0x62, 0x96, 0x01, 0x5C, 0x2B, 0xAA, 0x03], inAddress); //insert end game function at target address - requires 8 bytes of space
}

function unlockLensKeywordFromStart(rom)
{
    rom.set([0x20, 0xA0, 0xFD], 0x8089); //override STA function
    rom.set([0x8D, 0x00, 0xA1], 0xFDA0); //add back overridden STA function

    //add the lens keyword as already known
    rom.set([
                0xA9, 0x20, //LDA 20 - load 0x20 into the accumulator
                0x8D, 0x11, 0xA1, //STA A111 - unlock keyword lens in RAM
                0x60 //RTS - return
            ], 0xFDA3);
}

function randomizeMoonOrbDestinations(rom, random, inStartPositionName)
{
    var moonOrbSpoilerList = [];

    if ($('#randomize_moonorb_destinations').is(':checked'))
	{
        console.log("RANDOMIZING MOON ORB DESTINATIONS");
        var initialChoices = [];
        var startPosition = [];

        //grab all the destinations for the types we are wanting to randomize
        var startPositionFound = false;
        for(var i = 0; i < DATA_MOONORB_DESTINATIONS.length; i++)
        {
            if(startPositionFound == false && DATA_MOONORB_DESTINATIONS[i].name == inStartPositionName) //ensure the start position is always included
            {
                startPosition.push(DATA_MOONORB_DESTINATIONS[i]);
                startPositionFound = true;
            }
            else if(DATA_MOONORB_DESTINATIONS[i].types.includes("useful"))
            {
                
                initialChoices.push(DATA_MOONORB_DESTINATIONS[i]);
            }
        }

        initialChoices.shuffle(random);
        var destinations = getMoonOrbRequiredDestinationList(initialChoices); //get required locations
        initialChoices = destinations[0];
        var required = destinations[1];
        var choices = createMoonOrbDestinationList(random, initialChoices, required, startPosition); //create the final choices list

        //set the coordinates
        for(var i = 0; i < 25; i++)
        {
            setMoonOrbDestination(rom, i*2, choices[i].coordinates, choices[i].floor);
            moonOrbSpoilerList.push(createMoonOrbSpoilerEntry(i, choices[i]));
        }
    }
    else
    {
        //change Moon Orb 1U to start point even if moon orb is not selected to be randomized
        var startPosition = [];
        for(var i = 0; i < DATA_MOONORB_DESTINATIONS.length; i++)
        {
            if(DATA_MOONORB_DESTINATIONS[i].name == inStartPositionName)
            {
                startPosition.push(DATA_MOONORB_DESTINATIONS[i]);
                break;
            }
        }
        setMoonOrbDestination(rom, 7*2, startPosition[0].coordinates, startPosition[0].floor);
    }
    return moonOrbSpoilerList;
}

function getMoonOrbRequiredDestinationList(initialChoices)
{
    var required = [];

    //ensure that if the spiritshrine is on the list, it is always included
    for(var i = 0; i < initialChoices.length; i++)
    {
        if(initialChoices[i].types.includes("spiritshrine"))
        {
            required.push(initialChoices[i]);
            initialChoices.splice(i,1); //remove the entry from the choices list to ensure no duplicates
            break;
        }
    }

    //ensure that if gargoyle locations are on the list, at least one is always included
    for(var i = 0; i < initialChoices.length; i++)
    {
        if(initialChoices[i].types.includes("gargoyle"))
        {
            required.push(initialChoices[i]);
            initialChoices.splice(i,1); //remove the entry from the choices list to ensure no duplicates
            break;
        }
    }
    return [initialChoices, required];
}

function createMoonOrbDestinationList(random, initialChoices, required, startPosition)
{
    //after shuffling adjust the list to ensure different locations based on their super chunk coordinates
    //the goal of this is to attempt to have no more than two per same super chunk
    var choices = [];
    
    for(var i = 0; i < initialChoices.length; i++)
    {
        var count = 0;
        for(var j = 0; j < choices.length; j++)
        {
            if(initialChoices[i].coordinates[1] == choices[j].coordinates[1] && initialChoices[i].coordinates[3] == choices[j].coordinates[3])
            {
                count += 1;
            }
        }
        if(count > 2 )
        {
            choices.push(initialChoices[i]); //add to the end of the list to de-favor this location
        }
        else
        {
            choices.unshift(initialChoices[i]); //add to the beginning of the list to favor this location
        }
    }

    choices.splice(24-required.length);
    choices = required.concat(choices);
    choices.shuffle(random);
    choices.splice(7,0,startPosition[0]);

    return choices;
}

function setMoonOrbDestination(rom, offset, coordinates, floor)
{
    rom.set([coordinates[0], coordinates[1]], 0x79D+offset);
    rom.set([coordinates[2], coordinates[3]], 0x7CF+offset);
    rom.set([floor], 0x801+offset);
}

function createMoonOrbSpoilerEntry(offset, choice)
{
    var positionString = "";
    if(offset < 5){positionString += "2U";}
    else if(offset < 10){positionString += "1U";}
    else if(offset < 15){positionString += "--";}
    else if(offset < 20){positionString += "1D";}
    else if(offset < 25){positionString += "2D";}

    if(offset % 5 == 0){positionString += " 2L";}
    else if(offset % 5 == 1){positionString += " 1L";}
    else if(offset % 5 == 2){positionString += " --";}
    else if(offset % 5 == 3){positionString += " 1R";}
    else if(offset % 5 == 4){positionString += " 2R";}
    return (positionString + " = " + choice.name);
}

function removeSpellLevelRequirements(rom)
{
    rom.set([0xC9,0x01],0xB072); //remove all level requirements for spells
}

function randomizeSpellLevelRequirements(rom, random)
{
    var randomSpellLevels = [];
    for(var address = 0xE8F4; address < 0xE927; ++address)
    {
        if(address != 0xE8F8 && address != 0xE8FD && address != 0xE902)
        {
            randomSpellLevels.push(rom[address] & 0x07);
            randomSpellLevels.shuffle(random);
        }
    }
    for(var address = 0xE8F4; address < 0xE927; ++address)
    {
        if(address != 0xE8F8 && address != 0xE8FD && address != 0xE902)
        {
            rom[address] = (rom[address] & 0xF0) + randomSpellLevels.pop();
        }
    }
}

function encode3BytePositionToAddress(rom, startAddress, inTileX, inSuperChunkX, inTileY, inSuperChunkY)
{
    rom.set(encode3BytePosition([inTileX, inSuperChunkX, inTileY, inSuperChunkY]), startAddress);
}

function encode3BytePosition(coordinates)
{
    //convert world x,y coordinates to an encoded 3 byte position
    //first byte is the X tile position
    //bytes 2 and 3 encode the Y super chunk and Y tile shifted twice left then the final right 2 bytes added as the X super chunk
    var byte0 = coordinates[0];
    var bytePair = ((coordinates[3] & 0xFF) << 8) | (coordinates[2] & 0xFF);
    var finalBytePair = (bytePair << 2) + coordinates[1];
    var byte1 = finalBytePair & 0xFF;
    var byte2 = finalBytePair >> 8;

    return [byte0, byte1, byte2];
}

function decode3BytePosition(inBytes)
{
    //convert an encoded 3 byte position to world x,y coordinates
    //3FF the first two bytes to get the first pair of coordinates
    //LSR twice then AND with 03FF the second pair of bytes to get the second pair of cooridinates
    var bytePair1 = (inBytes[1] << 8) | (inBytes[0]);
    bytePair1 = bytePair1 & 0x03FF;

    var bytePair2 = (inBytes[2] << 8) | (inBytes[1]);
    bytePair2 = (bytePair2 >> 2) & 0x03FF;

    var xTile = bytePair1 & 0xFF;
    var xSuperChunk = bytePair1 >> 8;
    var yTile = bytePair2 & 0xFF;
    var ySuperChunk = bytePair2 >> 8;
    var finalBytes = [xTile, xSuperChunk, yTile, ySuperChunk];

    return finalBytes;
}

function encode3ByteSpawnEggPositionToAddress(rom, startAddress, inTileX, inSuperChunkX, inTileY, inSuperChunkY)
{
    rom.set(encode3ByteSpawnEggPosition([inTileX, inSuperChunkX, inTileY, inSuperChunkY], startAddress+2), startAddress);
}

function encode3ByteSpawnEggPosition(coordinates, finalByte)
{
    //convert world x,y coordinates to an encoded 3 byte position
    //first byte is the Y tile position
    //bytes 2 and 3 encode the X super chunk and X tile shifted twice left then the final right 2 bytes added as the Y super chunk
    var bytePair = ((coordinates[1] & 0xFF) << 8) | (coordinates[0] & 0xFF);
    var finalBytePair = (bytePair << 2) + coordinates[3];
    var byte1 = finalBytePair & 0xFF;
    var byte2 = finalBytePair >> 8;

    //take the finalByte and perform an AND 0xF0 to get the high byte and an AND 0x0F to get the low byte - low byte is used for coordinates
    //we add the high byte back to whatever is generated from the coordinate encoding above
    byte2 = (byte2 & 0x0F) + (finalByte & 0xF0);
    return [coordinates[2], byte1, byte2];
}

function decode3ByteSpawnEggPosition(inBytes)
{
    //convert an encoded 3 byte position to world x,y coordinates
    //3FF the first two bytes to get the second pair of coordinates
    //LSR twice then AND with 03FF the first pair of bytes to get the first pair of cooridinates
    var bytePair1 = (inBytes[1] << 8) | (inBytes[0]);
    bytePair1 = bytePair1 & 0x03FF;

    var bytePair2 = (inBytes[2] << 8) | (inBytes[1]);
    bytePair2 = (bytePair2 >> 2) & 0x03FF;

    var xTile = bytePair2 & 0xFF;
    var xSuperChunk = bytePair2 >> 8;
    var yTile = bytePair1 & 0xFF;
    var ySuperChunk = bytePair1 >> 8;
    var finalBytes = [xTile, xSuperChunk, yTile, ySuperChunk];

    return finalBytes;
}

function modifySextant(rom)
{
    var sextantMessage = [0xE3, 0xE4, 0x5F, 0xE3, 0xE4, 0xF0, 0x3B, 0xE3, 0xE4, 0x5F, 0xE3, 0xE4, 0x3D, 0xF6, 0x00, 0x00, 0x00];
    rom.set(sextantMessage, 0xD735);

    for(var i = 0; i < 0x58; ++i)
    {
        rom[0x14768+i] = 0xEA;
    }

    var branchOffset = 0x14768;
    var branchCode = [
        0xA9, 0x57, //LDA #$57
        0x8D, 0x3A, 0xA7, //STA A73A
        0x8D, 0x42, 0xA7, //STA A742
        0xA9, 0x54, //LDA #$54
        0x8D, 0x3E, 0xA7, //STA A73E
        0x8D, 0x46, 0xA7, //STA A746
        0xA6, 0x7C, //LDX 7C
        0x86, 0x14, //STX 14
        0xA6, 0x7E, //LDX 7E
        0x86, 0x16, //STX 16
        0xA5, 0x75, //LDA 75
        0xC2, 0x20, //REP 20
        0xF0, 0x08, //BEQ
        0x06, 0x14, 0x06, 0x14, 0x06, 0x16, 0x06, 0x16, //ASL 14 ASL 14 ASL 16 ASL 16 (we are not on the overworld)
        0x4C, 0xB0, 0xF1, //JMP F1B0

    ];
    rom.set(branchCode, branchOffset);

    var codeOffset = 0x171B0; //02F1B0
    var dataCode = [
        0xA5, 0x14, //LDA 14 (x coord)
        0x38, //SEC (set carry bit)
        0xE9, 0x30, 0x01, //SBC #$0130
        0x10, 0x0D, //BPL
        0xA2, 0x55, 0x00, //LDX #$0055
        0x8E, 0x3E, 0xA7, //STX A73E
        0x8E, 0x46, 0xA7, //STX A746
        0x49, 0xFF, 0xFF, //EOR #$FFFF
        0x1A,  //INC A
        0x8D, 0x44, 0xA7, //STA A744
        0x4A, 0x4A, 0x4A, //LSR x3
        0x8D, 0x3C, 0xA7, //STA A73C
        0xA5, 0x16, //LDA 16 (y coord)
        0x38, //SEC (set carry bit)
        0xE9, 0x68, 0x01, //SBC #$0168
        0x10, 0x0D, //BPL
        0xA2, 0x56, 0x00, //LDX #$0056
        0x8E, 0x3A, 0xA7, //STX A73A
        0x8E, 0x42, 0xA7, //STX A742
        0x49, 0xFF, 0xFF, //EOR #$FFFF
        0x1A, //INC A
        0x8D, 0x40, 0xA7, //STA A740
        0x4A, 0x4A, 0x4A, //LSR x3
        0x8D, 0x38, 0xA7, //STA A738
        0xE2, 0x20, //SEP 20
        0xA9, 0x66, //LDA 66 (sextant message)
        0x5C, 0xEF, 0xBC, 0x01, //JML 01BCEF
    ];
    rom.set(dataCode, codeOffset);
}

function randomizeAllCharacterSprites(rom, random)
{
    //16736 = 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 0D 15 00 14 13 15 28 16 17 18 19 1A 19 1B 14 1D 18 1E 15 1B 1E 14 A0 21 17 28 22 23 1D 24 25 26 33 67 28 29 6A 6B AC 2D 39 29 16 2F
    var dataCode = [];

    rom.set(dataCode, 0x16736);
}

var DATA_CHARACTERS_SPRITES = 
[
    {name:"figher",         sprite:0x02, sets:["humanoid"],             palettes:[0x05,0x00]},
    {name:"ranger",         sprite:0x03, sets:["humanoid"],             palettes:[0x05,0x02]},
    {name:"mage",           sprite:0x04, sets:["humanoid"],             palettes:[0x06,0x00,0x02]},
    {name:"noble",          sprite:0x05, sets:["humanoid"],             palettes:[0x01]},
    {name:"merchant",       sprite:0x06, sets:["humanoid"],             palettes:[0x03]},
    {name:"child",          sprite:0x07, sets:["humanoid"],             palettes:[0x03,0x01]},
    {name:"guard",          sprite:0x08, sets:["humanoid"],             palettes:[0x05]},
    {name:"jester",         sprite:0x09, sets:["humanoid"],             palettes:[0x06]},
    {name:"peasant",        sprite:0x0A, sets:["humanoid"],             palettes:[0x03,0x00,0x06]},
    {name:"farmer",         sprite:0x0B, sets:["humanoid"],             palettes:[0x03]},
    {name:"bard",           sprite:0x0C, sets:["humanoid"],             palettes:[0x01,0x06]},
    {name:"woman",          sprite:0x0D, sets:["humanoid"],             palettes:[0x06,0x02]},
    {name:"luteplayer",     sprite:0x0E, sets:["humanoid"],             palettes:[0x01]},
    {name:"lordbritish",    sprite:0x0F, sets:["humanoid", "special"],  palettes:[0x01]},
    {name:"avatar",         sprite:0x10, sets:["humanoid"],             palettes:[0x05,0x02]},
    {name:"mouse",          sprite:0x15, sets:["monster", "small"],     palettes:[0x03]},
    {name:"giantrat",       sprite:0x14, sets:["monster", "small"],     palettes:[0x02]},
    {name:"insect",         sprite:0x13, sets:["monster", "small"],     palettes:[0x02]},
    {name:"giantbat",       sprite:0x16, sets:["monster", "small"],     palettes:[0x04]},
    {name:"giantsquid",     sprite:0x28, sets:["monster", "small"],     palettes:[0x04]},
    {name:"seaserpent",     sprite:0x16, sets:["monster", "small"],     palettes:[0x04]},
    {name:"reaper",         sprite:0x17, sets:["monster", "small"],     palettes:[0x02]},
    {name:"sheep",          sprite:0x18, sets:["animal", "small"],      palettes:[0x02]},
    {name:"dog",            sprite:0x19, sets:["animal", "small"],      palettes:[0x00]},
    {name:"deer",           sprite:0x1A, sets:["animal", "small"],      palettes:[0x03]},
    {name:"wolf",           sprite:0x19, sets:["animal", "small"],      palettes:[0x02]},
    {name:"ghost",          sprite:0x1B, sets:["monster", "small"],     palettes:[0x02]},
    {name:"gazer",          sprite:0x1D, sets:["monster", "small"],     palettes:[0x04]},
    {name:"bird",           sprite:0x18, sets:["animal", "small"],      palettes:[0x02]},
    {name:"corpser",        sprite:0x1E, sets:["animal", "small"],      palettes:[0x04]},
    {name:"snake",          sprite:0x15, sets:["animal", "small"],      palettes:[0x04]},
    {name:"rabbit",         sprite:0x1B, sets:["animal", "small"],      palettes:[0x02]},
    {name:"rotworm",        sprite:0x1E, sets:["animal", "small"],      palettes:[0x06]},
    {name:"giantspider",    sprite:0x14, sets:["animal", "small"],      palettes:[0x03]},
    {name:"gargoyleleader", sprite:0xA0, sets:["monster", "large"],     palettes:[0x02]},
    {name:"gargfolk",       sprite:0x21, sets:["monster"],              palettes:[0x02,0x00,0x04]},
];

/*
27	acid slug	01	17	
28	zu flower	81F181 - 01	82E75D - 1C	unfinished tangle vine
29	daemon	02	22	p00-brown, p04-green, p06-gold
2A	skeleton	81F183 - 02	23	
2B	drake	04	1D	
2C	headless	00	24	
2D	troll	03	25	p00 - brown, p01 - pink, p-03 default, 
2E	mongbat	03	26	
2F	wisp	06	33	
30	hydra	04	67	
31	slime	04	28	
32	cat	03	29	
33	dragon	04	6A	
34	silver serpent	02	82E769 - 6B	unfinished silver serpent
35	cyclops	00	AC	
36	giant scorpion	03	2D	
37	giant ant	03	2E	
38	cow	00	29	
39	alligator	04	16	
3A	horse	82F193 - 03	2F	
*/