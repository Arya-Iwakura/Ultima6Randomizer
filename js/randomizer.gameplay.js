function fixAISpellListBug(rom)
{
    //this fixes an off-by-one error in the code that prevents the SNES AI from being able to access all of their assigned spells
    rom[0x4D09] = 0xEA;
}

function fixSpiders(rom)
{
    //gives spiders paralyze instead of magic arrow (it offends me that they gave them magic arrow when they originally had web)
    rom[0x16647] = 0x1B;
}

function setPoisionFlash(buffer, flashSelection)
{
    var rom = new Uint8Array(buffer);

    if(flashSelection == 0) //default
    {
        rom.set([0xE0, 0x03],0x1B5A0);
        rom.set([0xE0, 0x03],0xB523);
        rom.set([0x1F, 0x00],0xB53B);
        rom.set([0x22, 0xBF, 0xB5, 0x01],0xB590);
        rom.set([0x22, 0x20, 0xB6, 0x01],0xB5C1);
    }
    else if(flashSelection == 1)
    {
        rom.set([0x62, 0x00],0x1B5A0); //reduced per step poison flash
        rom.set([0x62, 0x00],0xB523); //reduced initial poison flash
        rom.set([0x05, 0x00],0xB53B); //reduced initial lava flash
        rom.set([0xEA, 0xEA, 0xEA, 0xEA],0xB5C1); //remove big poison flash
    }
    else if(flashSelection == 2)
    {
        rom.set([0x00, 0x00],0x1B5A0); //removed constant poison flash
        rom.set([0xEA, 0xEA, 0xEA, 0xEA],0xB590); //remove big lava and fire flash
        rom.set([0xEA, 0xEA, 0xEA, 0xEA],0xB5C1); //remove big poison flash
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
    rom.set([   0x20, 0xAA, 0xFC, 0xEA, 0xEA, // branch to FCAA
            ], 0xAA94);

    rom.set([   0xA9, 0x01, // load value 01 into accumulator
                0x85, 0x00, // store A at 00
                0xAD, 0x4A, 0x01, // load 014A
                0x60, // return
            ], 0xFCAA);
}

function hardKarmaMode(rom)
{
    console.log("SETTING HARD KARMA MODE");
    rom[0x812A] = 0x3C; //set starting karma to a lower number

    //branch from where karma is decremented to double penalties
    rom.set([   0x20, 0xAA, 0xFC, 0xEA, 0xEA, // branch to FCAA
            ], 0xAA94);

    rom.set([   0x0A, 0xEA, // double accumulator then do nothing (keeps the code the same length as the easy karma mode)
                0x85, 0x00, // store A at 00
                0xAD, 0x4A, 0x01, 0x60, // load 014A
            ], 0xFCAA);
}

function adjustDayLength(rom, desiredLength)
{
    console.log("ADJUSTING DAY NIGHT CYCLE");
    var timeMultiplier = 0x00; //0 and 1=default, 2=2x, 3=3x, 4=4x
    var dawnTime = 0x06;
    var duskTime = 0x13;

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
    rom.set([0x20, 0x87, 0xFC, 0xEA, 0xEA, 0xEA],0xBA30); //jsr to FC87

    //load hour data, branch if <5 or >12
    rom.set([   0xA5, 0xDF, //load sleep timer (check if we are suppose to be asleep)
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
            ], 0xFC87);
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

        //randomly select an armor set
        setRandomArmorSet(rom, random, 0xF914, rarityMin, rarityMax); //avatar inventory
        setRandomArmorSet(rom, random, 0xF925, rarityMin, rarityMax); //dupre inventory
        setRandomArmorSet(rom, random, 0xF934, rarityMin, rarityMax); //shamino inventory
        setRandomArmorSet(rom, random, 0xF945, rarityMin, rarityMax); //iolo inventory

        //randomly select inventory items
        setRandomInventorySet(rom, random, 0xF914, 1, 0, 1, rarityMax); //avatar inventory
        setRandomInventorySet(rom, random, 0xF925, 2, 0, 1, rarityMax); //dupre inventory
        setRandomInventorySet(rom, random, 0xF934, 3, 0, 1, rarityMax); //shamino inventory
        setRandomInventorySet(rom, random, 0xF945, 3, 4, 1, rarityMax); //iolo inventory
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
                            console.log("duplicate " + selectedItem);
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

function setStartingInventoryChaotic(rom, random)
{
    console.log("SETTING STARTING INVENTORIES - CHAOTIC");

    clearInventories(rom);

    setStartingInventoryChaoticPerCharacter(rom, random, 0xF914, 1, 0); //avatar inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF925, 2, 0); //dupre inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF934, 3, 0); //shamino inventory
    setStartingInventoryChaoticPerCharacter(rom, random, 0xF945, 3, 4); //iolo inventory

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
