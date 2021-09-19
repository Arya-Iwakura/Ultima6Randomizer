//TODO : Add characters with less sprites, such as the boat and mouse

var DATA_PLAYER_CHARACTERS =
[
    {"characterID":0x0F, "spriteID":0x10, "paletteID":0x05, "sleepingID":0x06, "id":2, "name":"Avatar", "tags":["base", "realistic"]},
    {"characterID":0x0F, "spriteID":0x10, "paletteID":0x02, "sleepingID":0x06, "id":3, "name":"Avatar Dark", "tags":["realistic"]},
    {"characterID":0x0B, "spriteID":0x0C, "paletteID":0x01, "sleepingID":0x06, "id":4, "name":"Bard", "tags":["base", "realistic"]},
    {"characterID":0x0B, "spriteID":0x0C, "paletteID":0x06, "sleepingID":0x06, "id":5, "name":"Bard (Blue)", "tags":["realistic"]},
    {"characterID":0x06, "spriteID":0x07, "paletteID":0x03, "sleepingID":0x05, "id":6, "name":"Child", "tags":["base", "realistic"]},
    {"characterID":0x06, "spriteID":0x07, "paletteID":0x01, "sleepingID":0x03, "id":7, "name":"Child (Pink)", "tags":["wild"]},
    {"characterID":0x29, "spriteID":0x22, "paletteID":0x00, "sleepingID":0x01, "id":8, "name":"Daemon (Brown)", "tags":["monster"]},
    {"characterID":0x29, "spriteID":0x22, "paletteID":0x04, "sleepingID":0x01, "id":9, "name":"Daemon (Green)", "tags":["monster"]},
    {"characterID":0x29, "spriteID":0x22, "paletteID":0x02, "sleepingID":0x01, "id":10, "name":"Daemon (Red)", "tags":["base", "monster"]},
    {"characterID":0x0C, "spriteID":0x0D, "paletteID":0x06, "sleepingID":0x02, "id":11, "name":"Dress Wearer (Blue)", "tags":["base", "realistic"]},
    {"characterID":0x0C, "spriteID":0x0D, "paletteID":0x02, "sleepingID":0x02, "id":12, "name":"Dress Wearer (Red)", "tags":["realistic"]},
    {"characterID":0x0A, "spriteID":0x0B, "paletteID":0x03, "sleepingID":0x05, "id":13, "name":"Farmer", "tags":["base", "realistic"]},
    {"characterID":0x01, "spriteID":0x02, "paletteID":0x05, "sleepingID":0x00, "id":14, "name":"Fighter (Silver)", "tags":["base", "realistic"]},
    {"characterID":0x01, "spriteID":0x02, "paletteID":0x00, "sleepingID":0x00, "id":15, "name":"Fighter (Bronze)", "tags":["realistic"]},
    {"characterID":0x26, "spriteID":0x21, "paletteID":0x04, "sleepingID":0x01, "id":16, "name":"Gargoyle (Green)", "tags":["wild"]},
    {"characterID":0x26, "spriteID":0x21, "paletteID":0x02, "sleepingID":0x01, "id":17, "name":"Gargoyle (Red)", "tags":["base"]},
    {"characterID":0x26, "spriteID":0x21, "paletteID":0x00, "sleepingID":0x01, "id":18, "name":"Gargoyle (Tan)", "tags":["wild"]},
    {"characterID":0x07, "spriteID":0x08, "paletteID":0x05, "sleepingID":0x00, "id":19, "name":"Guard", "tags":["base", "realistic"]},
    {"characterID":0x08, "spriteID":0x09, "paletteID":0x06, "sleepingID":0x04, "id":20, "name":"Jester", "tags":["base", "realistic"]},
    {"characterID":0x0E, "spriteID":0x0F, "paletteID":0x01, "sleepingID":0x02, "id":21, "name":"Lord British", "tags":["base"]},
    {"characterID":0x03, "spriteID":0x04, "paletteID":0x06, "sleepingID":0x02, "id":22, "name":"Mage (Blue)", "tags":["base", "realistic"]},
    {"characterID":0x03, "spriteID":0x04, "paletteID":0x02, "sleepingID":0x02, "id":23, "name":"Mage (Red)", "tags":["realistic"]},
    {"characterID":0x03, "spriteID":0x04, "paletteID":0x00, "sleepingID":0x02, "id":24, "name":"Mage (Tan)", "tags":["realistic"]},
    {"characterID":0x05, "spriteID":0x06, "paletteID":0x03, "sleepingID":0x05, "id":25, "name":"Merchant", "tags":["base", "realistic"]},
    {"characterID":0x2E, "spriteID":0x26, "paletteID":0x03, "sleepingID":0x04, "id":26, "name":"Mongbat", "tags":["base", "monster"]},
    {"characterID":0x04, "spriteID":0x05, "paletteID":0x01, "sleepingID":0x03, "id":27, "name":"Noble", "tags":["base", "realistic"]},
    {"characterID":0x09, "spriteID":0x0A, "paletteID":0x03, "sleepingID":0x04, "id":28, "name":"Peasant", "tags":["base", "realistic"]},
    {"characterID":0x09, "spriteID":0x0A, "paletteID":0x06, "sleepingID":0x04, "id":29, "name":"Peasant (Blue)", "tags":["realistic"]},
    {"characterID":0x09, "spriteID":0x0A, "paletteID":0x00, "sleepingID":0x04, "id":30, "name":"Peasant (Tan)", "tags":["realistic"]},
    {"characterID":0x02, "spriteID":0x03, "paletteID":0x05, "sleepingID":0x01, "id":31, "name":"Ranger", "tags":["base", "realistic"]},
    {"characterID":0x02, "spriteID":0x03, "paletteID":0x02, "sleepingID":0x01, "id":32, "name":"Ranger (Dark)", "tags":["realistic"]},
    {"characterID":0x2A, "spriteID":0x23, "paletteID":0x02, "sleepingID":0x02, "id":33, "name":"Skeleton", "tags":["base", "monster"]},
    {"characterID":0x2D, "spriteID":0x25, "paletteID":0x03, "sleepingID":0x05, "id":34, "name":"Troll", "tags":["base", "monster"]},
    {"characterID":0x2D, "spriteID":0x25, "paletteID":0x01, "sleepingID":0x03, "id":35, "name":"Troll (Pink)", "tags":["wild", "monster"]},
];

function getCharacterNameByOptionID(inID)
{
    for(var i = 0; i < DATA_PLAYER_CHARACTERS.length; ++i)
    {
        if(inID == DATA_PLAYER_CHARACTERS[i].id)
        {
            return DATA_PLAYER_CHARACTERS[i].name;
        }
    }
    if(inID == 0){ return "Random (All)";}
    if(inID == 1){ return "Random (Realistic People Only)";}
    return DATA_PLAYER_CHARACTERS[0].name; //return avatar if no character found
}

function getCharacterIDByOptionID(inID)
{
    for(var i = 0; i < DATA_PLAYER_CHARACTERS.length; ++i)
    {
        if(inID == DATA_PLAYER_CHARACTERS[i].id)
        {
            return DATA_PLAYER_CHARACTERS[i];
        }
    }
    console.log("SELECTED CHARACTER NOT FOUND - DEFAULTING TO AVATAR");
    return DATA_PLAYER_CHARACTERS[0]; //return avatar if no character found
}

function getRandomCharacterWithTag(inTag)
{
    var characterList = [];
    for(var i = 0; i < DATA_PLAYER_CHARACTERS.length; ++i)
    {
        if(inTag != "")
        {
            if(DATA_PLAYER_CHARACTERS[i].tags.length > 0)
            {
                for(var j = 0; j < DATA_PLAYER_CHARACTERS[i].tags.length; ++j)
                {
                    if(inTag == DATA_PLAYER_CHARACTERS[i].tags[j])
                    {
                        characterList.push(DATA_PLAYER_CHARACTERS[i]);
                        break;
                    }
                }
            }
        }
        else
        {
            characterList.push(DATA_PLAYER_CHARACTERS[i])
        }
    }
    return characterList;
}

function setCharacterSprite(buffer, seed, character_sprite, fire_flag)
{
	var rom = new Uint8Array(buffer);
    
    //default values = avatar
	var selectedCharacterHex = 0x0F;
	var selectedSpriteHex = 0x10;
    var selectedPaletteHex = 0x05;
    var selectedSleepingHex = 0x06;

	var spriteAddress = 0x016744; //0x016744 is Avatar
    var paletteAddress = 0x00F168; //0x00F168 is Avatar
    var sleepingSpriteAddress = 0x00F122; //0x00F122 is Avatar

    //random sprites
	if(character_sprite == 0) //random any sprite
	{
        var characterOptions = getRandomCharacterWithTag("");
        characterOptions.shuffle();
        selectedCharacterHex = characterOptions[0].characterID;
        selectedSpriteHex = characterOptions[0].spriteID;
        selectedPaletteHex = characterOptions[0].paletteID;
        selectedSleepingHex = characterOptions[0].sleepingID;
    }
    else if(character_sprite == 1) //random realistic person sprite
	{
        var characterOptions = getRandomCharacterWithTag("realistic");
        characterOptions.shuffle();
        selectedCharacterHex = characterOptions[0].characterID;
        selectedSpriteHex = characterOptions[0].spriteID;
        selectedPaletteHex = characterOptions[0].paletteID;
        selectedSleepingHex = characterOptions[0].sleepingID;
    }
    else
    {
        var selectedData = getCharacterIDByOptionID(character_sprite);
        selectedCharacterHex = selectedData.characterID;
        selectedSpriteHex = selectedData.spriteID;
        selectedPaletteHex = selectedData.paletteID;
        selectedSleepingHex = selectedData.sleepingID;
    }

    rom[spriteAddress] = selectedSpriteHex;
    rom[sleepingSpriteAddress] = selectedSleepingHex;
    
    if(fire_flag > 0x00)
    {
        rom[paletteAddress] = 0x07;
    }
    else
    {
        rom[paletteAddress] = selectedPaletteHex;
    }

    fixChecksum(rom);
	return rom;
}


function randomizePlayerStart(rom, random, partyMembers)
{
    var choice = DATA_PLAYER_SPAWN_LOCATIONS[0]; //"Castle Britannia"
    if ($('#randomize_player_start').is(':checked'))
	{
        consoleLog("RANDOMIZING PLAYER START DESTINATIONS");
        choice = random.from(DATA_PLAYER_SPAWN_LOCATIONS);
    }
    
    setStartSpawnPosition(rom, choice.coordinates, partyMembers);

    //move the egg spawn from a selected moongate chunk in the case of spawning at a gate location to a field in Britain
    if(choice.spawnegg.length > 0)
    {
        rom.set(encode3BytePosition([0x4C,0x01,0x67,0x01]), choice.spawnegg[0]); //spawn eggs require Y first then X so this is Y, Super Chunk Y, X, Super Chunk X
    }

    if(choice.name != "Castle Britannia")
    {
        //move the gargoyle castle spawn to wherever you start
        rom.set([choice.coordinates[0], choice.coordinates[1]], 0x15EFA); //default 0x33, 0x01 - x coordinate for middle gargoyle
        rom.set([choice.coordinates[2]-2, choice.coordinates[3]], 0x15EFF); //default 0x5E, 0x01 - y coordinate for all gargoyles
        rom.set([choice.coordinates[0]-2, choice.coordinates[1]], 0x15F14); //default 0x32, 0x01 - x coordinate for left gargoyle
        rom.set([choice.coordinates[0]+2, choice.coordinates[1]], 0x15F1A); //default 0x34, 0x01 - x coordinate for right gargoyle
    }

    if(choice.raft.length > 0)
    {
        setRaftPosition(rom, 0x1672C, choice.raft[0], choice.raft[1], choice.raft[2], choice.raft[3]); //move swamp raft to this position
    }

    return choice.name;
}

function fixScheduleBugs(rom)
{
    rom.set([0xEA, 0xEA], 0x188EB); //this fixes the multi-day AI schedule bug where they are off by one when they attempt to loop and begin to read non-coordinate data as coordinates
    rom.set([0xFE, 0x9C, 0x02], 0x19507); //this fixes the Zoltan schedule bug where the first defined Zoltan spawn spot was in the void west of empath abbey
    //bonn
}

function adjustSchedules(rom)
{
    //either fix schedules for these NPCS or allow you to engage in their dialog stuff during any schedule point
    rom.set([0x0A], 0x18FE5); //big ben - lower time to leave house from noon to 10am
    rom.set([0x0C], 0x18EA6); //ephemerides - lower time when they awaken from 3pm to noon
    rom.set([0x57], 0x19587); //bonn - adjust behaviour to not be walking back and forth to the water edge (42 for wander - 57 for beggar)
}

function setDeathRespawnPosition(rom, inTileX, inSuperChunkX, inTileY, inSuperChunkY)
{
    rom.set([inTileX, inSuperChunkX], 0x627); //death respawn X
    rom.set([inTileY, inSuperChunkY], 0x62C); //death respawn Y
}

function setSpawnPositionAvatar(rom, inTileX, inSuperChunkX, inTileY, inSuperChunkY)
{
    rom.set([inTileX, inSuperChunkX], 0x8238); //avatar X
    rom.set([inTileY, inSuperChunkY], 0x823E); //avatar Y
    setDeathRespawnPosition(rom, inTileX, inSuperChunkX, inTileY, inSuperChunkY);
}

function setStartSpawnPosition(rom, coordinates, partyMembers)
{
    setSpawnPositionAvatar(rom, coordinates[0], coordinates[1], coordinates[2], coordinates[3]); //avatar

    //set spawn positions for when they are not in your party
    encode3BytePositionToAddress(rom, 0x18C41,   0xA3, 0x01, 0xDC, 0x02); //dupre not in party (spawn at Trinsic pub)
    encode3BytePositionToAddress(rom, 0x18C45,   0x51, 0x00, 0x03, 0x02); //shamino not in party (spawn at Skara Brae well)
    encode3BytePositionToAddress(rom, 0x18C49,   0xC3, 0x00, 0xEA, 0x00); //iolo not in party (spawn at Iolo Hut)

    rom.set([coordinates[0],coordinates[1]], 0x58E); //set the hardcoded Moon Orb 1U x position check to this x position

    setPartyMemberSpawnsAtNewGame(rom, coordinates, partyMembers);
}

function isPartyMemberFound(inName, inList)
{
    var found = false;

    for(var i = 0; i < inList.length; ++i)
    {
        if(inList[i].name == inName)
        {
            found = true;
            break;
        }
    }

    return found;
}

function setPartyMemberSpawnsAtNewGame(rom, coordinates, partyMembers)
{
    //8233 - 22 3F 88 03
    //var branchData = [0x22, 0xD0, 0xFD, 0x01];
    var branchData = [0x4C, 0xD0, 0xFD, 0xEA];
    rom.set(branchData, 0x8233);
    
    var codeData = [
                        0x22, 0x3F, 0x88, 0x03, //JSL to 03883F - this is the code we overwrote

                        0xC2, 0x21, //REP #$21
                        
                        0xA9, partyMembers[0].idoffset[0], partyMembers[0].idoffset[1], //LDA party member 0
                        0xAA, //TAX
                        0xA9, coordinates[0]-1, coordinates[1], //party member 1 X coordinates
                        0x9D, 0x00, 0x8E, //STA to 7E8E00 + x
                        0x9D, 0x00, 0x96, //STA to 7E9600 + x
                        0xA9, coordinates[2]+1, coordinates[3], //party member 1 Y coordinates
                        0x9D, 0x00, 0x90, //STA to 7E9000 + x
                        0x9D, 0x00, 0x98, //STA to 7E9800 + x

                        0xA9, partyMembers[1].idoffset[0], partyMembers[1].idoffset[1], //LDA party member 1
                        0xAA, //TAX
                        0xA9, coordinates[0]+1, coordinates[1], //party member 2 X coordinates
                        0x9D, 0x00, 0x8E, //STA to 7E8E00 + x
                        0x9D, 0x00, 0x96, //STA to 7E9600 + x
                        0xA9, coordinates[2]+1, coordinates[3], //party member 2 Y coordinates
                        0x9D, 0x00, 0x90, //STA to 7E9000 + x
                        0x9D, 0x00, 0x98, //STA to 7E9800 + x

                        0xA9, partyMembers[2].idoffset[0], partyMembers[2].idoffset[1], //LDA party member 2
                        0xAA, //TAX                        
                        0xA9, coordinates[0], coordinates[1], //party member 3 X coordinates
                        0x9D, 0x00, 0x8E, //STA to 7E8E00 + x
                        0x9D, 0x00, 0x96, //STA to 7E9600 + x
                        0xA9, coordinates[2]+2, coordinates[3], //party member 3 Y coordinates
                        0x9D, 0x00, 0x90, //STA to 7E9000 + x
                        0x9D, 0x00, 0x98, //STA to 7E9800 + x

                        0xE2, 0x20, //SEP #$20

                        0x4C,0x36,0x82, //JMP
                    ];
    rom.set(codeData, 0xFDD0);
}

function randomizePartyMembers(rom, random)
{
    var partyMembers = [];

    if ($('#select-starting-party').val() > 0)
	{
        adjustDupreLZWScript(rom);
        adjustShaminoLZWScript(rom);
        adjustIoloLZWScript(rom);
        adjustBehLemLZWScript(rom);
    
        if ($('#select-starting-party').val() == 1) //NONE
        {
            consoleLog("REMOVING PARTY MEMBERS");
            partyMembers.push(DATA_PARTY_MEMBERS[0]);
            partyMembers.push(DATA_PARTY_MEMBERS[0]);
            partyMembers.push(DATA_PARTY_MEMBERS[0]);
        }
        else if ($('#select-starting-party').val() == 2) //DEFAULT WITH REMOVE
        {
            partyMembers.push(DATA_PARTY_MEMBERS[1]);
            partyMembers.push(DATA_PARTY_MEMBERS[2]);
            partyMembers.push(DATA_PARTY_MEMBERS[3]);
        }
        else if ($('#select-starting-party').val() == 3) //RANDOM
        {
            consoleLog("RANDOMIZING PARTY MEMBERS");
            partyMembers = getRandomPartyMembers(random);
        }
	}
    else
    {
        partyMembers.push(DATA_PARTY_MEMBERS[1]);
        partyMembers.push(DATA_PARTY_MEMBERS[2]);
        partyMembers.push(DATA_PARTY_MEMBERS[3]);
    }

    setStartingPartyMemberStatusFlags(rom, partyMembers);

    return partyMembers;
}
function setStartingPartyMemberStatusFlags(rom, partyMembers)
{
    rom[0x8090] = countTotalPartyMembers(partyMembers);

    //809A - 8A C2 21 69 02 00 9D 29 01 E2 20 A9 80 9D 03 80 E8 E8 E0 08 00 90 E9
    //override function to set party member ids and in party status values
    var branchData = [   0x4C,0x80,0xFD,
        0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA,0xEA];

    var codeData = [
        0xA9, 0x80, //LDA #$80
        0x8D, 0x03, 0x80, //STA to 7E8003 - status of Avatar
        0xC2, 0x21, //REP #$21
        0xA9, 0x02, 0x00, //LDA 0002
        0xAA, //TAX
        0x8D, 0x29, 0x01, //STA to 7E0129 - inventory of Avatar
        0xE2, 0x20, //SEP #$20

        0xC2, 0x21, //REP #$21
        0xA9, partyMembers[0].idoffset[0], partyMembers[0].idoffset[1], //LDA party member 0
        0xAA, //TAX
        0x8D, 0x2B, 0x01, //STA to 7E012B - inventory of Party Member 1
        0xE2, 0x20, //SEP #$20
        0xA9, 0x80, //LDA #$80
        0xE8,
        0x9D, 0x00, 0x80, //STA to 7E8000 +x - status of Party Member 1

        0xC2, 0x21, //REP #$21
        0xA9, partyMembers[1].idoffset[0], partyMembers[1].idoffset[1], //LDA party member 0
        0xAA, //TAX
        0x8D, 0x2D, 0x01, //STA to 7E012D - inventory of Party Member 2
        0xE2, 0x20, //SEP #$20
        0xA9, 0x80, //LDA #$80
        0xE8,
        0x9D, 0x00, 0x80, //STA to 7E8000 +x- status of Party Member 2

        0xC2, 0x21, //REP #$21
        0xA9, partyMembers[2].idoffset[0], partyMembers[2].idoffset[1], //LDA party member 0
        0xAA, //TAX
        0x8D, 0x2F, 0x01, //STA to 7E012F - inventory of Party Member 3
        0xE2, 0x20, //SEP #$20
        0xA9, 0x80, //LDA #$80
        0xE8,
        0x9D, 0x00, 0x80, //STA to 7E8000 +x - status of Party Member 3

        0x4C, 0x9D, 0x80, //JMP back to the original function
    ];
    rom.set(branchData, 0x809A);
    rom.set(codeData, 0xFD80);
}

function getRandomPartyMembers(random)
{
    var members = [];
    var choices = [];

    for(var i = 1; i < DATA_PARTY_MEMBERS.length; ++i)
    {
        choices.push(i);
    }

    choices.shuffle(random);

    members.push(DATA_PARTY_MEMBERS[choices[0]]);
    members.push(DATA_PARTY_MEMBERS[choices[1]]);
    members.push(DATA_PARTY_MEMBERS[choices[2]]);

    return members;
}

function countTotalPartyMembers(inList)
{
    var count = 1;

    for(var i = 0; i < inList.length; ++i)
    {
        if(inList[i].name != "None")
        {
            count += 1;
        }
    }

    return count;
}

function adjustDupreLZWScript(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x48000);
    
    //add option for Dupre to leave and join with dialog
    //3F 38 02 0C 10 A8 01 11 3F 2B 0D 00 12 00 0A 10 8D 00 11 3F 3A 0A
    var codeData = [    0x3F,0x38, 0x02,0x0C, //check if in party and branch
                        0x10, 0xA8,0x01 ,0x11,0x3F,0x2B,0x0D,0x00,0x12,0x00,0x0A, //dialog if in party - remove Dupre from party
                        0x10, 0x8D,0x00, 0x11,0x3F,0x3A,0x0A]; //dialog if not in party - add Dupre to party
    lzwData.set(codeData, 0x17);

    lzwData.set([0x38], 0x2FE); //point QUEST dialog pointer to the BYE dialog
}

function adjustShaminoLZWScript(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x48000);
    
    //add option for Shamino to leave and join with dialog
    var codeData = [    0x3F,0x38, 0x02,0x0C, //check if in party and branch
        0x10, 0xAB,0x01, 0x11,0x3F,0x2B,0x0D,0x00,0x12,0x00,0x0A, //dialog if in party - remove Shamino from party
        0x10, 0xC8,0x00, 0x11,0x3F,0x3A,0x0A]; //dialog if not in party - add Shamino to party
    lzwData.set(codeData, 0x32D);

    lzwData.set([0x11, 0x02], 0x347); //change HOME dialog function to DEEP FOREST dialog function
    lzwData.set([0x2E], 0x8A0); //point FOREST dialog pointer to the DEEP FOREST dialog
    writeTextToAddress(lzwData, 0x52A, 0x0F, "It is my home."); //change FOREST text to remove HOME text reference
}

function adjustIoloLZWScript(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x48000);

    //add option for Iolo to leave and join with dialog
    var codeData = [    0x3F,0x38, 0x02,0x0C, //check if in party and branch
        0x10, 0x3E,0x01, 0x11,0x3F,0x2B,0x0D,0x00,0x12,0x00,0x0A, //dialog if in party - remove Iolo from party
        0x10, 0xD9,0x03, 0x11,0x3F,0x3A,0x0A]; //dialog if not in party - add Iolo to party
    lzwData.set(codeData, 0x8E7);

    lzwData.set([0xE3, 0x02], 0x903); //change NO response to BARD dialog function to YES response to BARD dialog function
    lzwData.set([0x35], 0xFBC); //point BARD dialog pointer to the NO response to BARD dialog which allows unlocking GWENNO and the rest of the text
}

function adjustBehLemLZWScript(rom)
{
    var lzwData = decompressDataFromLZW(rom, 0x1D700);
    var codeData = [0x3F,0x2B,0x0D,0x00,0x12,0x00,0x00]; //add option for Beh Lem to leave
    lzwData.set(codeData, 0x15CC);
    lzwData.set([0x8C,0x01], 0x15D4);
}
