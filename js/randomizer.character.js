function setCharacterSprite(buffer, seed, character_sprite, fire_flag)
{
	var rom = new Uint8Array(buffer);
	
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
		var spriteOptions = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
		spriteOptions.shuffle();
		character_sprite = spriteOptions[0];
    }
    else if(character_sprite == 1) //random realistic person sprite
	{
		var spriteOptions = [2,3,4,5,6,11,12,13,14,15,19,20,22,23,24,25,27,28,29,30,31,32];
		spriteOptions.shuffle();
		character_sprite = spriteOptions[0];
	}

	switch(character_sprite)
	{
		case 2:
			selectedCharacterHex = 0x0F; //Avatar
			selectedSpriteHex = 0x10; //Avatar
            selectedPaletteHex = 0x05; //Avatar
            selectedSleepingHex = 0x06;
            break;
        case 3:
            selectedCharacterHex = 0x0F; //Avatar (Dark)
            selectedSpriteHex = 0x10; //Avatar (Dark)
            selectedPaletteHex = 0x02; //Avatar (Dark)
            selectedSleepingHex = 0x06;
            break;
		case 4:
			selectedCharacterHex = 0x0B; //Bard
			selectedSpriteHex = 0x0C; //Bard
            selectedPaletteHex = 0x01; //Bard
            selectedSleepingHex = 0x06;
            break;
        case 5:
			selectedCharacterHex = 0x0B; //Bard (Blue)
			selectedSpriteHex = 0x0C; //Bard (Blue)
            selectedPaletteHex = 0x06; //Bard (Blue)
            selectedSleepingHex = 0x06;
			break;
		case 6:
			selectedCharacterHex = 0x06; //Child
			selectedSpriteHex = 0x07; //Child
            selectedPaletteHex = 0x03; //Child
            selectedSleepingHex = 0x05;
            break;
        case 7:
            selectedCharacterHex = 0x06; //Child (Completely Pink)
            selectedSpriteHex = 0x07; //Child (Completely Pink)
            selectedPaletteHex = 0x01; //Child (Completely Pink)
            selectedSleepingHex = 0x03;
            break;
        case 8:
            selectedCharacterHex = 0x29; //Daemon (Brown)
            selectedSpriteHex = 0x22; //Daemon (Brown)
            selectedPaletteHex = 0x00; //Daemon (Brown)
            selectedSleepingHex = 0x01;
            break;
        case 9:
            selectedCharacterHex = 0x29; //Daemon (Green)
            selectedSpriteHex = 0x22; //Daemon (Green)
            selectedPaletteHex = 0x04; //Daemon (Green)
            selectedSleepingHex = 0x01;
            break;
        case 10:
            selectedCharacterHex = 0x29; //Daemon (Red)
            selectedSpriteHex = 0x22; //Daemon (Red)
            selectedPaletteHex = 0x02; //Daemon (Red)
            selectedSleepingHex = 0x01;
            break;
		case 11:
			selectedCharacterHex = 0x0C; //Dress Wearer (Blue)
			selectedSpriteHex = 0x0D; //Dress Wearer (Blue)
            selectedPaletteHex = 0x06; //Dress Wearer (Blue)
            selectedSleepingHex = 0x02;
            break;
        case 12:
            selectedCharacterHex = 0x0C; //Dress Wearer (Red)
            selectedSpriteHex = 0x0D; //Dress Wearer (Red)
            selectedPaletteHex = 0x02; //Dress Wearer (Red)
            selectedSleepingHex = 0x02;
            break;
		case 13:
			selectedCharacterHex = 0x0A; //Farmer
			selectedSpriteHex = 0x0B; //Farmer
            selectedPaletteHex = 0x03; //Farmer
            selectedSleepingHex = 0x05;
			break;
		case 14:
			selectedCharacterHex = 0x01; //Fighter (Silver)
			selectedSpriteHex = 0x02; //Fighter (Silver)
            selectedPaletteHex = 0x05; //Fighter (Silver)
            selectedSleepingHex = 0x00;
            break;
        case 15:
            selectedCharacterHex = 0x01; //Fighter (Bronze)
            selectedSpriteHex = 0x02; //Fighter (Bronze)
            selectedPaletteHex = 0x00; //Fighter (Bronze)
            selectedSleepingHex = 0x00;
            break;
        case 16:
            selectedCharacterHex = 0x26; //Gargoyle (Green)
            selectedSpriteHex = 0x21; //Gargoyle (Green)
            selectedPaletteHex = 0x04; //Gargoyle (Green)
            selectedSleepingHex = 0x01;
            break;
		case 17:
			selectedCharacterHex = 0x26; //Gargoyle (Red)
			selectedSpriteHex = 0x21; //Gargoyle (Red)
            selectedPaletteHex = 0x02; //Gargoyle (Red)
            selectedSleepingHex = 0x01;
            break;
        case 18:
            selectedCharacterHex = 0x26; //Gargoyle (Tan)
            selectedSpriteHex = 0x21; //Gargoyle (Tan)
            selectedPaletteHex = 0x00; //Gargoyle (Tan)
            selectedSleepingHex = 0x01;
            break;
		case 19:
			selectedCharacterHex = 0x07; //Guard
			selectedSpriteHex = 0x08; //Guard
            selectedPaletteHex = 0x05; //Guard
            selectedSleepingHex = 0x00;
			break;
		case 20:
			selectedCharacterHex = 0x08; //Jester
			selectedSpriteHex = 0x09; //Jester
            selectedPaletteHex = 0x06; //Jester
            selectedSleepingHex = 0x04;
			break;
		case 21:
			selectedCharacterHex = 0x0E; //Lord British
			selectedSpriteHex = 0x0F; //Lord British
            selectedPaletteHex = 0x01; //Lord British
            selectedSleepingHex = 0x02;
			break;
		case 22:
			selectedCharacterHex = 0x03; //Mage (Blue)
			selectedSpriteHex = 0x04; //Mage (Blue)
            selectedPaletteHex = 0x06; //Mage (Blue)
            selectedSleepingHex = 0x02;
            break;
        case 23:
            selectedCharacterHex = 0x03; //Mage (Red)
            selectedSpriteHex = 0x04; //Mage (Red)
            selectedPaletteHex = 0x02; //Mage (Red)
            selectedSleepingHex = 0x02;
            break;
        case 24:
            selectedCharacterHex = 0x03; //Mage (Tan)
            selectedSpriteHex = 0x04; //Mage (Tan)
            selectedPaletteHex = 0x00; //Mage (Tan)
            selectedSleepingHex = 0x02;
            break;
		case 25:
			selectedCharacterHex = 0x05; //Merchant
			selectedSpriteHex = 0x06; //Merchant
            selectedPaletteHex = 0x03; //Merchant
            selectedSleepingHex = 0x05;
            break;
        case 26:
            selectedCharacterHex = 0x2E; //Mongbat
            selectedSpriteHex = 0x26; //Mongbat
            selectedPaletteHex = 0x03; //Mongbat
            selectedSleepingHex = 0x04;
            break;
		case 27:
			selectedCharacterHex = 0x04; //Noble
			selectedSpriteHex = 0x05; //Noble
            selectedPaletteHex = 0x01; //Noble
            selectedSleepingHex = 0x03;
			break;
		case 28:
			selectedCharacterHex = 0x09; //Peasant
			selectedSpriteHex = 0x0A; //Peasant
            selectedPaletteHex = 0x03; //Peasant
            selectedSleepingHex = 0x04;
            break;
        case 29:
            selectedCharacterHex = 0x09; //Peasant (Blue)
            selectedSpriteHex = 0x0A; //Peasant (Blue)
            selectedPaletteHex = 0x06; //Peasant (Blue)
            selectedSleepingHex = 0x04;
            break;
        case 30:
			selectedCharacterHex = 0x09; //Peasant (Tan)
			selectedSpriteHex = 0x0A; //Peasant (Tan)
            selectedPaletteHex = 0x00; //Peasant (Tan)
            selectedSleepingHex = 0x04;
			break;
		case 31:
			selectedCharacterHex = 0x02; //Ranger
			selectedSpriteHex = 0x03; //Ranger
            selectedPaletteHex = 0x05; //Ranger
            selectedSleepingHex = 0x01;
            break;
        case 32:
            selectedCharacterHex = 0x02; //Ranger (Dark)
            selectedSpriteHex = 0x03; //Ranger (Dark)
            selectedPaletteHex = 0x02; //Ranger (Dark)
            selectedSleepingHex = 0x01;
            break;
		case 33:
			selectedCharacterHex = 0x2A; //Skeleton
			selectedSpriteHex = 0x23; //Skeleton
            selectedPaletteHex = 0x02; //Skeleton
            selectedSleepingHex = 0x02; //Skeleton
            break;
        case 34:
            selectedCharacterHex = 0x2D; //Troll
            selectedSpriteHex = 0x25; //Troll
            selectedPaletteHex = 0x03; //Troll
            selectedSleepingHex = 0x05; //Troll
            break;
        case 35:
            selectedCharacterHex = 0x2D; //Troll (Pink)
            selectedSpriteHex = 0x25; //Troll (Pink)
            selectedPaletteHex = 0x01; //Troll (Pink)
            selectedSleepingHex = 0x03; //Troll (Pink)
            break;
		default:
			selectedCharacterHex = 0x0F; //Avatar
			selectedSpriteHex = 0x10; //Avatar
            selectedPaletteHex = 0x05; //Avatar
            selectedSleepingHex = 0x06; //Avatar
			break;
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