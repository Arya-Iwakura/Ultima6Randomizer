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