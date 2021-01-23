const TABLE_SPAWNER_START = 0x19804;
const TABLE_SPAWNER_END = 0x19A02;
const TABLE_SPAWNER_ENTRIES = 256;
const TABLE_STATS_ENTRIES = 58;

function randomizeEnemySpawners(rom, random, monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag)
{
    console.log("RANDOMIZING SPAWNERS");
    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        var spawned = false;

        if(monsterFlag == true) //randomizer monsters
        {
            var foundSpawner = getRandomMonster(rom, random, entryID);
            if(foundSpawner > 0)
            {
                rom[TABLE_SPAWNER_START+entryID+1] = foundSpawner;
                spawned = true;
            }
        }

        if(wildFlag == true) //randomizer wild animals
        {
            var foundSpawner = getRandomWild(rom, random, entryID, addEnemiesFlag);
            if(foundSpawner > 0)
            {
                rom[TABLE_SPAWNER_START+entryID+1] = foundSpawner;
                spawned = true;
            }
        }
        
        if(animalFlag == true && spawned == false) //randomizer animals
        {
            var foundSpawner = getRandomAnimal(rom, random, entryID);
            if(foundSpawner > 0)
            {
                rom[TABLE_SPAWNER_START+entryID+1] = foundSpawner;
                spawned = true;
            }
        }
        
        if(peopleFlag == true && spawned == false) //randomizer people
        {
            var foundSpawner = getRandomPerson(rom, random, entryID);
            if(foundSpawner > 0)
            {
                rom[TABLE_SPAWNER_START+entryID+1] = foundSpawner;
                spawned = true;
            }
        }
    }
}

function randomizeEnemySpawnersMix(rom, random, monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag)
{
    console.log("RANDOMIZING SPAWNERS MIXED");
    var spawnersSolo = getMixedSpawnerListSolo(random, monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag);
    var spawnersGroup = getMixedSpawnerListGroup(random, monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag);

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;

        //check for early out
        var earlyOut = checkMixEarlyOut(rom, random, entryID, monsterFlag, animalFlag);

        //get a mixed spawn
        if(earlyOut == false)
        {
            var foundSpawner = getMixedSpawner(rom, random, entryID, spawnersSolo, spawnersGroup); //check to see if the spawner we want to randomize is in the spawner list
            if(foundSpawner > 0)
            {
                rom[TABLE_SPAWNER_START+entryID+1] = foundSpawner;
            }
        }
    }
}

function getRandomMonster(rom, random, entryID)
{
    for( j = 0; j < DATA_SPAWNER_EVIL_SOLO.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_EVIL_SOLO[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_EVIL_SOLO);
        }
    }
    for( j = 0; j < DATA_SPAWNER_EVIL_GROUP.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_EVIL_GROUP[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_EVIL_GROUP);
        }
    }
    for( j = 0; j < DATA_SPAWNER_SEA_SOLO.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_SEA_SOLO[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_SEA_SOLO);
        }
    }
    for( j = 0; j < DATA_SPAWNER_SEA_GROUP.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_SEA_GROUP[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_SEA_GROUP);
        }
    }
    return 0x00; //failed to find a spawner
}

function getRandomWild(rom, random, entryID, addEnemiesFlag)
{
    if(addEnemiesFlag == true)
    {
        for( j = 0; j < DATA_SPAWNER_WILD_SOLO_ADDITIONAL.length; ++j)
        {
            if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_WILD_SOLO_ADDITIONAL[j])
            {
                return getRandomSpawnerFromList(random, DATA_SPAWNER_WILD_SOLO_ADDITIONAL);
            }
        }
        for( j = 0; j < DATA_SPAWNER_WILD_GROUP_ADDITIONAL.length; ++j)
        {
            if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_WILD_GROUP_ADDITIONAL[j])
            {
                return getRandomSpawnerFromList(random, DATA_SPAWNER_WILD_GROUP_ADDITIONAL);
            }
        }
    }
    else
    {
        for( j = 0; j < DATA_SPAWNER_WILD_SOLO.length; ++j)
        {
            if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_WILD_SOLO[j])
            {
                return getRandomSpawnerFromList(random, DATA_SPAWNER_WILD_SOLO);
            }
        }
        for( j = 0; j < DATA_SPAWNER_WILD_GROUP.length; ++j)
        {
            if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_WILD_GROUP[j])
            {
                return getRandomSpawnerFromList(random, DATA_SPAWNER_WILD_GROUP);
            }
        }
    }
    return 0x00; //failed to find a spawner
}

function getRandomAnimal(rom, random, entryID)
{
    for( j = 0; j < DATA_SPAWNER_ANIMAL_SOLO.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_ANIMAL_SOLO[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_ANIMAL_SOLO);
        }
    }
    for( j = 0; j < DATA_SPAWNER_ANIMAL_GROUP.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_ANIMAL_GROUP[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_ANIMAL_GROUP);
        }
    }
    for( j = 0; j < DATA_SPAWNER_REAGENT.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_REAGENT[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_REAGENT);
        }
    }
    return 0x00; //failed to find a spawner
}

function getRandomPerson(rom, random, entryID)
{
    for( j = 0; j < DATA_SPAWNER_PEOPLE_SOLO.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_PEOPLE_SOLO[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_PEOPLE_SOLO);
        }
    }
    for( j = 0; j < DATA_SPAWNER_PEOPLE_GROUP.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_PEOPLE_GROUP[j])
        {
            return getRandomSpawnerFromList(random, DATA_SPAWNER_PEOPLE_GROUP);
        }
    }
    return 0x00; //failed to find a spawner
}

function getMixedSpawnerListSolo(random, monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag)
{
    var spawnersSolo = [];

    if(monsterFlag == true) //randomizer monsters
    {
        spawnersSolo = addSpawnerDataToSpawnerDataPool(spawnersSolo, DATA_SPAWNER_EVIL_SOLO);
    }

    if(wildFlag == true) //randomizer wild
    {
        if(addEnemiesFlag == true)
        {
            spawnersSolo = addSpawnerDataToSpawnerDataPool(spawnersSolo, DATA_SPAWNER_WILD_SOLO_ADDITIONAL);
        }
        else
        {
            spawnersSolo = addSpawnerDataToSpawnerDataPool(spawnersSolo, DATA_SPAWNER_WILD_SOLO);
        }
    }
    
    if(animalFlag == true) //randomizer animals
    {
        spawnersSolo = addSpawnerDataToSpawnerDataPool(spawnersSolo, DATA_SPAWNER_ANIMAL_SOLO);
    }

    if(peopleFlag == true) //randomizer people
    {
        spawnersSolo = addSpawnerDataToSpawnerDataPool(spawnersSolo, DATA_SPAWNER_PEOPLE_SOLO);
    }

    spawnersSolo.shuffle(random);

    return spawnersSolo;
}

function getMixedSpawnerListGroup(random, monsterFlag, wildFlag, animalFlag, peopleFlag, addEnemiesFlag)
{
    var spawnersGroup = [];

    if(monsterFlag == true) //randomizer monsters
    {
        spawnersGroup = addSpawnerDataToSpawnerDataPool(spawnersGroup, DATA_SPAWNER_EVIL_GROUP);
    }

    if(wildFlag == true) //randomizer wild
    {
        if(addEnemiesFlag == true)
        {
            spawnersGroup = addSpawnerDataToSpawnerDataPool(spawnersGroup, DATA_SPAWNER_WILD_GROUP_ADDITIONAL);
        }
        else
        {
            spawnersGroup = addSpawnerDataToSpawnerDataPool(spawnersGroup, DATA_SPAWNER_WILD_GROUP);
        }
    }
    
    if(animalFlag == true) //randomizer animals
    {
        spawnersGroup = addSpawnerDataToSpawnerDataPool(spawnersGroup, DATA_SPAWNER_ANIMAL_GROUP);
    }

    if(peopleFlag == true) //randomizer people
    {
        spawnersGroup = addSpawnerDataToSpawnerDataPool(spawnersGroup, DATA_SPAWNER_PEOPLE_GROUP);
    }

    spawnersGroup.shuffle(random);

    return spawnersGroup;
}

function checkMixEarlyOut(rom, random, entryID, monsterFlag, animalFlag)
{
    for( j = 0; j < DATA_SPAWNER_NEVERCHANGE.length; ++j) //check for all spots we should always skip
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_NEVERCHANGE[j])
        {
            return true;
        }
    }
    if(monsterFlag == true) //check for sea creature spawns
    {
        for( j = 0; j < DATA_SPAWNER_SEA_SOLO.length; ++j)
        {
            if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_SEA_SOLO[j])
            {
                rom[TABLE_SPAWNER_START+entryID+1] = getRandomSpawnerFromList(random, DATA_SPAWNER_SEA_SOLO);
                return true;
            }
        }
        for( j = 0; j < DATA_SPAWNER_SEA_GROUP.length; ++j)
        {
            if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_SEA_GROUP[j])
            {
                rom[TABLE_SPAWNER_START+entryID+1] = getRandomSpawnerFromList(random, DATA_SPAWNER_SEA_GROUP);
                return true;
            }
        }
    }
    if(animalFlag == true) //check for reagent spawns
    {
        for( j = 0; j < DATA_SPAWNER_REAGENT.length; ++j)
        {
            if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_REAGENT[j])
            {
                rom[TABLE_SPAWNER_START+entryID+1] = getRandomSpawnerFromList(random, DATA_SPAWNER_REAGENT);
                return true;
            }
        }
    }
    return false;
}

function getMixedSpawner(rom, random, entryID, spawnerPoolSolo, spawnerPoolGroup)
{
    for( j = 0; j < spawnerPoolSolo.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == spawnerPoolSolo[j])
        {
            return getRandomSpawnerFromList(random, spawnerPoolSolo);
        }
    }

    for( j = 0; j < spawnerPoolGroup.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == spawnerPoolGroup[j])
        {
            return getRandomSpawnerFromList(random, spawnerPoolGroup);
        }
    }
}

function getRandomSpawnerFromList(random, inSpawnData)
{
    var randomSelection = random.nextIntRange(0, inSpawnData.length);
    return inSpawnData[randomSelection];
}

function addSpawnerDataToSpawnerDataPool(inPool, inDataPool)
{
	var outPool = inPool.concat(inDataPool);
	return outPool;
}

function getSpawnerFlags(rom, spawnerFlags)
{
    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        spawnerFlags.push(rom[TABLE_SPAWNER_START+entryID]);
    }
    return spawnerFlags;
}

//=================================================================================

//the high bits of a byte determine the aggression setting
// 0 nothing spawns
// 1 AI that does nothing and karma loss
// 2->6 aggressive (unsure what the difference is between these values)
// 7 non-aggressive and no karma loss. will never attack
// 8 aggressive but not mobile and only attacks when next to it
// 9 flee when far away
// A flee when close and non-aggressive and loose karma
// B non-aggressive and loose karma. herd behavior
// C aggressive. herd behavior
// D non-aggressive guard style behavior
// E non-aggressive left and right movement only and loose karma
// F non-aggressive up and down movement only and loose karma

function getAggressionValues(rom, aggressionValues)
{
    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        var spawnFlags = rom[TABLE_SPAWNER_START+entryID];
        var flagBits = hexToBits(spawnFlags.toString(16));
        var highBits = flagBits.slice(0,4)
        var highByte = bitsToHex(highBits);

        aggressionValues.push(highByte);
    }
    return aggressionValues;
}

function shuffleEnemyAggression(rom, random)
{
    console.log("SHUFFLING ENEMY AGGRESSION");
    var aggressionValues = [];
    aggressionValues = getAggressionValues(rom, aggressionValues);
    aggressionValues.shuffle(random);

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;

        var earlyOut = checkAggressionEarlyOut(rom, entryID);

        if(earlyOut == false)
        {
            var spawnFlags = rom[TABLE_SPAWNER_START+entryID];

            if(spawnFlags == 0)
            {
                i += 1;
            }
            else if(spawnFlags == 1)
            {
                spawnFlags = 0x0B;
            }

            var flagBits = hexToBits(spawnFlags.toString(16));
            var lowBits = flagBits.slice(4,8)
            var lowByte = bitsToHex(lowBits);

            spawnFlags = aggressionValues[i] + lowByte;
            rom[TABLE_SPAWNER_START+entryID] = "0x"+spawnFlags;
        }
    }
}

function checkAggressionEarlyOut(rom, entryID)
{
    for( j = 0; j < DATA_SPAWNER_NEVERCHANGE.length; ++j) //check for all spots we should always skip
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_NEVERCHANGE[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_REAGENT.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_REAGENT[j])
        {
            return true;
        }
    }

    return false;
}

function setAggressionToEvil(rom, random, entryID)
{
    //check for early out (avoid changing aggression on things like reagent spawns)
    var earlyOut = checkAggressionEarlyOut(rom, entryID);

    if(earlyOut == false)
    {
        var spawnerFlag = rom[TABLE_SPAWNER_START+entryID];

        var newFlags = spawnerFlag;

        //special case for the 2 cases where flags are 01
        if(newFlags == 0x01)
        {
            newFlags = 0xC1;
        }

        var flagBits = hexToBits(newFlags.toString(16));

        var highBits = flagBits.slice(0,4)
        var lowBits = flagBits.slice(4,8)
        var highByte = bitsToHex(highBits);
        var lowByte = bitsToHex(lowBits);
        
        //console.log(entryID + " has flags " + newFlags + " with high byte " + highByte + " at address " + (TABLE_SPAWNER_START+entryID).toHex(3));

        if(highByte == "d" || highByte == "e" || highByte == "f" || highByte == "9")
        {
            highByte = random.from(["2","3","4","5","6"]);
        }
        else if(highByte == "b" || highByte == "a")
        {
            highByte = "c";
        }

        newFlags = highByte + lowByte;
        rom[TABLE_SPAWNER_START+entryID] = "0x"+newFlags;
    }
}

function setAggressionToWild(rom, random, entryID)
{
    //check for early out (avoid changing aggression on things like reagent spawns)
    var earlyOut = checkAggressionEarlyOut(rom, entryID);

    if(earlyOut == false)
    {
        var spawnerFlag = rom[TABLE_SPAWNER_START+entryID];

        var newFlags = spawnerFlag;

        //special case for the 2 cases where flags are 01
        if(newFlags == 0x01)
        {
            newFlags = 0xC1;
        }

        var flagBits = hexToBits(newFlags.toString(16));

        var highBits = flagBits.slice(0,4)
        var lowBits = flagBits.slice(4,8)
        var highByte = bitsToHex(highBits);
        var lowByte = bitsToHex(lowBits);
        
        //console.log(entryID + " has flags " + newFlags + " with high byte " + highByte + " at address " + (TABLE_SPAWNER_START+entryID).toHex(3));

        highByte = random.from(["6","a","c","b","d"]);

        newFlags = highByte + lowByte;
        rom[TABLE_SPAWNER_START+entryID] = "0x"+newFlags;
    }
}

function setAggressionToFriendly(rom, random, entryID)
{
    //check for early out (avoid changing aggression on things like reagent spawns)
    var earlyOut = checkAggressionEarlyOut(rom, entryID);

    if(earlyOut == false)
    {
        var spawnerFlag = rom[TABLE_SPAWNER_START+entryID];

        var newFlags = spawnerFlag;

        //special case for the 2 cases where flags are 01
        if(newFlags == 0x01)
        {
            newFlags = 0xB1;
        }

        var flagBits = hexToBits(newFlags.toString(16));

        var highBits = flagBits.slice(0,4)
        var lowBits = flagBits.slice(4,8)
        var highByte = bitsToHex(highBits);
        var lowByte = bitsToHex(lowBits);
        
        //console.log(entryID + " has flags " + newFlags + " with high byte " + highByte + " at address " + (TABLE_SPAWNER_START+entryID).toHex(3));

        if(highByte == "2" || highByte == "3" || highByte == "4" || highByte == "5" || highByte == "6" || highByte == "8")
        {
            highByte = random.from(["d","a"]);
        }
        else if(highByte == "c")
        {
            highByte = random.from(["b","9"]);
        }

        newFlags = highByte + lowByte;
        rom[TABLE_SPAWNER_START+entryID] = "0x"+newFlags;
    }
}

function passiveEnemyAggression(rom, random)
{
    console.log("SETTING PASSIVE ENEMY AGGRESSION");

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        setAggressionToFriendly(rom, random, entryID);
    }
}

function intuitiveEnemyAggression(rom, random)
{
    console.log("SETTING INTUITIVE ENEMY AGGRESSION");

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        
        if( checkIfEvil(rom, entryID) )
        {
            setAggressionToEvil(rom, random, entryID);
        }
        else if( checkIfWild(rom, entryID) )
        {
            setAggressionToWild(rom, random, entryID);
        }
        else if( checkIfFriendly(rom, entryID) )
        {
            setAggressionToFriendly(rom, random, entryID);
        }
    }
}

function checkIfEvil(rom, entryID)
{
    for( j = 0; j < DATA_SPAWNER_EVIL_SOLO.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_EVIL_SOLO[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_EVIL_GROUP.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_EVIL_GROUP[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_SEA_SOLO.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_SEA_SOLO[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_SEA_GROUP.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_SEA_GROUP[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_PEOPLE_SOLO_NOGUARDS.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_PEOPLE_SOLO_NOGUARDS[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_PEOPLE_GROUP_NOGUARDS.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_PEOPLE_GROUP_NOGUARDS[j])
        {
            return true;
        }
    }
    return false;
}

function checkIfWild(rom, entryID)
{
    for( j = 0; j < DATA_SPAWNER_WILD_SOLO_ADDITIONAL.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_WILD_SOLO_ADDITIONAL[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_WILD_GROUP_ADDITIONAL.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_WILD_GROUP_ADDITIONAL[j])
        {
            return true;
        }
    }
    return false;
}

function checkIfFriendly(rom, entryID)
{
    for( j = 0; j < DATA_SPAWNER_ANIMAL_SOLO.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_ANIMAL_SOLO[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_ANIMAL_GROUP.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_ANIMAL_GROUP[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_TOWNANDMOONGATE.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_TOWNANDMOONGATE[j])
        {
            return true;
        }
    }
    return false;
}

//=================================================================================

function shuffleSpawnNumbers(rom, random)
{
    console.log("SHUFFLING SPAWN NUMBERS");

    var spawnNumbers = [];
    spawnNumbers = getSpawnNumbers(rom, spawnNumbers);
    spawnNumbers.shuffle(random);

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;

        var earlyOut = checkSpawnNumbersEarlyOut(rom, entryID);

        if(earlyOut == false)
        {
            var spawnFlags = rom[TABLE_SPAWNER_START+entryID];

            if(spawnFlags == 0)
            {
                i += 1;
            }
            else if(spawnFlags == 1)
            {
                spawnFlags = 0x0B;
            }

            var flagBits = hexToBits(spawnFlags.toString(16));
            var highBits = flagBits.slice(0,4)
            var highByte = bitsToHex(highBits);

            spawnFlags = highByte + spawnNumbers[i];
            rom[TABLE_SPAWNER_START+entryID] = "0x"+spawnFlags;
        }
    }
}

function getSpawnNumbers(rom, spawnNumbers)
{
    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        var spawnFlags = rom[TABLE_SPAWNER_START+entryID];
        var flagBits = hexToBits(spawnFlags.toString(16));
        var lowBits = flagBits.slice(4,8)
        var lowByte = bitsToHex(lowBits);

        spawnNumbers.push(lowByte);
    }
    return spawnNumbers;
}

function checkSpawnNumbersEarlyOut(rom, entryID)
{
    for( j = 0; j < DATA_SPAWNER_NEVERCHANGE.length; ++j) //check for all spots we should always skip
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_NEVERCHANGE[j])
        {
            return true;
        }
    }
    for( j = 0; j < DATA_SPAWNER_REAGENT.length; ++j)
    {
        if(rom[TABLE_SPAWNER_START+entryID+1] == DATA_SPAWNER_REAGENT[j])
        {
            return true;
        }
    }

    return false;
}

function randomSpawnNumbers(rom, random)
{
    console.log("RANDOMIZING SPAWN NUMBERS");

    var spawnNumbers = [];
    spawnNumbers = getSpawnNumbers(rom, spawnNumbers);
    spawnNumbers.shuffle(random);

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;

        var earlyOut = checkSpawnNumbersEarlyOut(rom, entryID);

        if(earlyOut == false)
        {
            var spawnFlags = rom[TABLE_SPAWNER_START+entryID];

            if(spawnFlags == 0)
            {
                i += 1;
            }
            else if(spawnFlags == 1)
            {
                spawnFlags = 0x0B;
            }

            var flagBits = hexToBits(spawnFlags.toString(16));
            var highBits = flagBits.slice(0,4)
            var highByte = bitsToHex(highBits);
            var lowByte = random.from(["0","1","2","3","4","5","6","7","8"]);
            
            spawnFlags = highByte + lowByte;
            rom[TABLE_SPAWNER_START+entryID] = "0x"+spawnFlags;
        }
    }
}

//=================================================================================

function getEnemyStatsDifficultyAdjusted(enemyStats, difficulty)
{
    if(difficulty == 1)
    {
        enemyStats = enemyStatAdjust(enemyStats, 0.5); //super squish those stats
    }
    else if(difficulty == 2)
    {
        enemyStats = enemyStatAdjust(enemyStats, 0.75); //squish those stats
    }
    else if(difficulty == 3)
    {
        enemyStats = enemyStatAdjust(enemyStats, 1.25); //expand those stats
    }
    else if(difficulty == 4)
    {
        enemyStats = enemyStatAdjust(enemyStats, 1.5); //super expand those stats
    }
    return enemyStats;
}

function changeEnemyStatDifficulty(rom, difficulty)
{
    //shuffle all stats / armor / dmg / health values
    console.log("ADJUSTING ENEMY STAT DIFFICULTY");

    //gather stats
    var enemyStats = gatherEnemyStats(rom);
    enemyStats = getEnemyStatsDifficultyAdjusted(enemyStats, difficulty);

    enemyStats.reverse(); //reverse the list so that the stats are in the correct order

    //reassign stats
    var numEntries = TABLE_STATS_ENTRIES+1; //add one for the extra zu flower
    for(var i = 0; i < numEntries; ++i)
    {
        var statAddress = 0x7A11+(i*6);

        //skip entries - Avatar, Lord British, Glitch
        if(statAddress != 0x7A5F && statAddress != 0x7A65 && statAddress != 0x7A71 )
        {
            var statEntry = enemyStats.pop();
            rom[statAddress]   = statEntry.str;
            rom[statAddress+1] = statEntry.dex;
            rom[statAddress+2] = statEntry.int;
            rom[statAddress+3] = statEntry.arm;
            rom[statAddress+4] = statEntry.dmg;
            rom[statAddress+5] = statEntry.hp;
        }
    }
}

function enemyStatAdjust(enemyStats, adjustMult)
{
    for(var i = 0; i < enemyStats.length; ++i)
    {
        //strength needs to be split out as it stores other flags in the upper bits
        var strStat = enemyStats[i].str;
        var strFlags = 0x00;
        var maxValue = 0xFF;
        if(strStat > 0xC0)
        {
            strStat = enemyStats[i].str - 0xC0;
            strFlags = 0xC0;
            maxValue = 0x3F;
        }
        else if(strStat > 0x80)
        {
            strStat = enemyStats[i].str - 0x80;
            strFlags = 0x80;
            maxValue = 0x7F;
        }
        else if(strStat > 0x40)
        {
            strStat = enemyStats[i].str - 0x40;
            strFlags = 0x40;
            maxValue = 0xBF;
        }

        strStat = adjustIndividualEnemyStat(strStat, adjustMult, 0x00, maxValue)
        enemyStats[i].str = strStat + strFlags;

        enemyStats[i].dex = adjustIndividualEnemyStat(enemyStats[i].dex, adjustMult, 0x00, 0xFF);
        enemyStats[i].int = adjustIndividualEnemyStat(enemyStats[i].int, adjustMult, 0x00, 0xFF);
        enemyStats[i].arm = adjustIndividualEnemyStat(enemyStats[i].arm, adjustMult, 0x00, 0xFF);
        enemyStats[i].dmg = adjustIndividualEnemyStat(enemyStats[i].dmg, adjustMult, 0x00, 0xFF);
        enemyStats[i].hp = adjustIndividualEnemyStat(enemyStats[i].hp, adjustMult, 0x00, 0xFF);
    }
    
    return enemyStats;
}

function adjustIndividualEnemyStat(stat, adjustMult, minValue, maxValue)
{
    stat = Math.ceil(stat*adjustMult);
    if(stat>maxValue) stat=maxValue;
    else if(stat<minValue) stat=minValue;
    return stat;
}

function shuffleEnemyStats(rom, random, difficulty)
{
    //shuffle all stats / armor / dmg / health values
    console.log("SHUFFLING ENEMY STATS");

    //gather stats
    var enemyStats = gatherEnemyStats(rom);
    enemyStats = getEnemyStatsDifficultyAdjusted(enemyStats, difficulty);

    //shuffle stats
    enemyStats.shuffle(random);

    //reassign stats
    var numEntries = TABLE_STATS_ENTRIES+1; //add one for the extra zu flower
    for(var i = 0; i < numEntries; ++i)
    {
        var statAddress = 0x7A11+(i*6);

        //skip entries - Avatar, Lord British, Glitch
        if(statAddress != 0x7A5F && statAddress != 0x7A65 && statAddress != 0x7A71 )
        {
            var statEntry = enemyStats.pop();
            rom[statAddress]   = statEntry.str;
            rom[statAddress+1] = statEntry.dex;
            rom[statAddress+2] = statEntry.int;
            rom[statAddress+3] = statEntry.arm;
            rom[statAddress+4] = statEntry.dmg;
            rom[statAddress+5] = statEntry.hp;
        }
    }
}

function randomizeEnemyStats()
{
    //percentage tough monsters like U4 has which also give more XP?
    //randomize all stats / armor / dmg / health values
}

function gatherEnemyStats(rom)
{
    //gather stats (first entry at 007A11, last entry at 007B57, each entry is 6 bytes long)
    var enemyStats = [];
    var numEntries = TABLE_STATS_ENTRIES+1; //add one for the extra zu flower

    for(var i = 0; i < numEntries; ++i)
    {
        var statAddress = 0x7A11+(i*6);

        //skip entries - Lord British, Avatar, Glitch
        if(statAddress != 0x7A5F && statAddress != 0x7A65 && statAddress != 0x7A71)
        {
            var statEntry = {   "str":rom[statAddress], "dex":rom[statAddress+1], "int":rom[statAddress+2],
                                "arm":rom[statAddress+3], "dmg":rom[statAddress+4], "hp":rom[statAddress+5]};
            enemyStats.push(statEntry);

            //console.log("ENTRY at " + statAddress + " - str:" + statEntry.str + ", dex:" + statEntry.dex + ", int:" + statEntry.int + ", arm:" + statEntry.arm + ", dmg:" + statEntry.dmg + ", hp:" + statSet.hp);
        }
    }
    return enemyStats;
}

function gatherEnemyData(rom)
{
    //gather data for spells/equipment/drops (first entry at 16440, last entry at 16608, each entry is 8 bytes long)
    var enemyData = [];
    var numEntries = TABLE_STATS_ENTRIES;

    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            var statEntry = {   "spells":[rom[dataAddress], rom[dataAddress+1]],
                                "weapons":[rom[dataAddress+2], rom[dataAddress+3]],
                                "armor":[rom[dataAddress+4], rom[dataAddress+5]],
                                "drops":[rom[dataAddress+6], rom[dataAddress+7]],
                                "entryNum":i
                            };
            enemyData.push(statEntry);
        }
    }
    return enemyData;
}

function shuffleEnemySpellCasters(rom, random)
{
    //shuffle which enemies can cast spells
    console.log("SHUFFLING ENEMY SPELLCASTERS");

    //gather spell casters
    var enemyData = gatherEnemyData(rom);
    
    //shuffle data
    enemyData.shuffle(random);

    var numEntries = TABLE_STATS_ENTRIES;

    //reassign spellcasters
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            var statEntry = enemyData.pop();
            rom[dataAddress]   = statEntry.spells[0];
            rom[dataAddress+1] = statEntry.spells[1];
        }
    }
}

function shuffleEnemySpellCastersBelievable(rom, random)
{
    //shuffle which enemies can cast spells
    console.log("SHUFFLING ENEMY SPELLCASTERS - BELIEVABLE");

    //gather spell casters
    var enemyData = gatherEnemyData(rom);
    
    //shuffle data
    enemyData.shuffle(random);

    var casterData = [];
    var nonCasterData = [];

    var dataLength = enemyData.length;
    for(var i = 0; i < dataLength; ++i)
    {
        var dataEntry = enemyData.pop();

        var dropClass = DATA_ENEMY_DROP_CLASSES[dataEntry.entryNum];

        if(dropClass < 3) //if not humanoid, check if this slot was already a spellcaster
        {
            if(dataEntry.spells[0] > 0x00 || dataEntry.spells[1] > 0x00)
            {
                casterData.push(dataEntry);
            }
            else
            {
                nonCasterData.push(dataEntry);
            }
        }
        else //all others can be spellcasters
        {
            casterData.push(dataEntry);
        }
    }

    var numEntries = TABLE_STATS_ENTRIES;

    //reassign spellcasters
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            var dropClass = DATA_ENEMY_DROP_CLASSES[i]; //get the current drop class
            
            if(dropClass < 3)
            {
                if(rom[dataAddress] > 0x00 || rom[dataAddress+1] > 0x00)
                {
                    var statEntry = casterData.pop();
                    rom[dataAddress]   = statEntry.spells[0];
                    rom[dataAddress+1] = statEntry.spells[1];
                }
                else
                {
                    var statEntry = nonCasterData.pop();
                    rom[dataAddress]   = statEntry.spells[0];
                    rom[dataAddress+1] = statEntry.spells[1];
                }
            }
            else
            {
                var statEntry = casterData.pop();
                rom[dataAddress]   = statEntry.spells[0];
                rom[dataAddress+1] = statEntry.spells[1];
            }
        }
    }
}

function gatherEnemySpells(rom)
{
    var spells = [];
    for(var i = 0; i < DATA_ENEMY_SPELL_LISTS.length; ++i)
    {
        var spellList = DATA_ENEMY_SPELL_LISTS[i].spells;

        for(var j = 0; j < spellList.length; j++)
        {
            var spellID = spellList[j];
            spells.push(spellID);
        }
    }
    return spells;
}

function shuffleEnemySpells(rom, random, difficulty)
{
    //shuffle spells enemies can cast (between spell casters or all)
    console.log("SHUFFLING ENEMY SPELLS");

    //gather the spell data
    var spells = gatherEnemySpells(rom);

    //shuffle data
    spells.shuffle(random);

    //if we are on different difficulties, we should randomly replace spells
    if(difficulty == 1)
    {
        //replace spells with easier spells
        for(var i = 0; i < spells.length; ++i)
        {
            for(var j = 0; j < DATA_ENEMY_SPELLS_MEDIUM.length; ++j)
            {
                if(spells[i] == DATA_ENEMY_SPELLS_MEDIUM[j])
                {
                    var replacement = random.from(DATA_ENEMY_SPELLS_EASY);
                    spells[i] = replacement;
                }
            }
            for(var j = 0; j < DATA_ENEMY_SPELLS_HARD.length; ++j)
            {
                if(spells[i] == DATA_ENEMY_SPELLS_HARD[j])
                {
                    var replacement = random.from(DATA_ENEMY_SPELLS_EASY);
                    spells[i] = replacement;
                }
            }
        }
    }

    //reassign spells
    for(var i = 0; i < DATA_ENEMY_SPELL_LISTS.length; ++i)
    {
        var dataAddress = DATA_ENEMY_SPELL_LISTS[i].address + 1;
        var numEntries = DATA_ENEMY_SPELL_LISTS[i].slots;

        for(var j = 0; j < numEntries; ++j)
        {
            var replacement = spells.pop();

            if(j == numEntries-1) //check if we are the last entry
            {
                if(difficulty == 2) //if this is hard spell mode then replace the last entry in each list
                {
                    var replacement = random.from(DATA_ENEMY_SPELLS_HARD);
                }
            }

            rom[dataAddress+j] = replacement;
        }
    }
}

function randomizeEnemySpells(rom, random, difficulty)
{
    //randomize spells enemies can cast
    console.log("RANDOMIZING ENEMY SPELLS");

    //gather the spell data
    var spells = [];
    spells = spells.concat(DATA_ENEMY_SPELLS_EASY);
    
    if(difficulty != 1)
    {
        spells = spells.concat(DATA_ENEMY_SPELLS_MEDIUM);
        if(difficulty == 2)
        {
            spells = spells.concat(DATA_ENEMY_SPELLS_HARD);
        }
    }

    //shuffle data
    spells.shuffle(random);

    //reassign spells
    for(var i = 0; i < DATA_ENEMY_SPELL_LISTS.length; ++i)
    {
        var dataAddress = DATA_ENEMY_SPELL_LISTS[i].address + 1;
        var numEntries = DATA_ENEMY_SPELL_LISTS[i].slots;

        for(var j = 0; j < numEntries; ++j)
        {
            var replacement = random.from(spells);
            rom[dataAddress+j] = replacement;
        }
    }
}

function shuffleEnemyDropPossessors(rom, random)
{
    //shuffle which enemies possess drops
    console.log("SHUFFLING ENEMY DROP POSSESSORS");

    //gather enemy data
    var enemyData = gatherEnemyData(rom);
    
    //shuffle data
    enemyData.shuffle(random);

    //spell drops must be dropped from casters as they pull from the casters spell pool on drop
    var casterData = [];
    var nonCasterData = [];
    var dataLength = enemyData.length;
    for(var i = 0; i < dataLength; ++i)
    {
        var dataEntry = enemyData.pop();

        if(dataEntry.spells[0] > 0x00 || dataEntry.spells[1] > 0x00)
        {
            casterData.push(dataEntry);
        }
        else
        {
            nonCasterData.push(dataEntry);
        }
    }

    var numEntries = TABLE_STATS_ENTRIES;

    //reassign drops
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            var dataEntry;
            if(rom[dataAddress] > 0x00 || rom[dataAddress+1] > 0x00) //assign from caster pool
            {
                dataEntry = casterData.pop();
            }
            else //assign from regular pool
            {
                dataEntry = nonCasterData.pop();
            }

            rom[dataAddress+6] = dataEntry.drops[0];
            rom[dataAddress+7] = dataEntry.drops[1];
        }
    }
}

function shuffleEnemyDropPossessorsBelievable(rom, random)
{
    //shuffle which enemies possess drops
    console.log("SHUFFLING ENEMY DROP POSSESSORS - BELIEVABLE");

    //gather enemy data
    var enemyData = gatherEnemyData(rom);
    
    //shuffle data
    enemyData.shuffle(random);

    //spell drops must be dropped from casters as they pull from the casters spell pool on drop
    var casterData = [];
    var nonCasterData = [];
    var noneData = [];
    var animalData = [];
    var creatureData = [];
    var dataLength = enemyData.length;
    for(var i = 0; i < dataLength; ++i)
    {
        var dataEntry = enemyData.pop();

        var dropClass = DATA_ENEMY_DROP_CLASSES[dataEntry.entryNum];
        if(dropClass == 0)
        {
            noneData.push(dataEntry);
        }
        else if(dropClass == 1)
        {
            animalData.push(dataEntry);
        }
        else if(dropClass == 2)
        {
            creatureData.push(dataEntry);
        }
        else if(dropClass == 3)
        {
            if(dataEntry.spells[0] > 0x00 || dataEntry.spells[1] > 0x00)
            {
                casterData.push(dataEntry);
            }
            else
            {
                nonCasterData.push(dataEntry);
            }
        }
    }

    var numEntries = TABLE_STATS_ENTRIES;

    //reassign drops
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            var dataEntry;
            var dropClass = DATA_ENEMY_DROP_CLASSES[i]; //get the current drop class
            if(dropClass == 0)
            {
                dataEntry = noneData.pop();
            }
            else if(dropClass == 1)
            {
                dataEntry = animalData.pop();
            }
            else if(dropClass == 2)
            {
                dataEntry = creatureData.pop();
            }
            else if(dropClass == 3)
            {
                if(rom[dataAddress] > 0x00 || rom[dataAddress+1] > 0x00)
                {
                    dataEntry = casterData.pop();
                }
                else
                {
                    dataEntry = nonCasterData.pop();
                }
            }

            rom[dataAddress+6] = dataEntry.drops[0];
            rom[dataAddress+7] = dataEntry.drops[1];
        }
    }
}

function randomizeEnemyDropsBelievable(rom, random)
{
    //randomize drops
    console.log("RANDOMIZING ENEMY DROPS - BELIEVABLE");

    var numEntries = TABLE_STATS_ENTRIES;

    //reassign drops
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            if(rom[dataAddress+6] > 0x00 || rom[dataAddress+7] > 0x00) //only randomize drops if this entry has drops
            {
                var dropClass = DATA_ENEMY_DROP_CLASSES[i];
                if(dropClass == 1)
                {
                    rom[dataAddress+6] = getRandomAIBelievableAnimalDrop(random);
                    rom[dataAddress+7] = getRandomAIBelievableAnimalDrop(random);
                }
                else if(dropClass == 2)
                {
                    rom[dataAddress+6] = getRandomAIBelievableCreatureDrop(random);
                    rom[dataAddress+7] = getRandomAIBelievableCreatureDrop(random);
                }
                else if(dropClass == 3)
                {
                    if(rom[dataAddress] > 0x00 || rom[dataAddress+1] > 0x00) //assign from caster pool
                    {
                        rom[dataAddress+6] = getRandomAICasterDrop(random);
                        rom[dataAddress+7] = getRandomAICasterDrop(random);
                    }
                    else //assign from regular pool
                    {
                        rom[dataAddress+6] = getRandomAINonCasterDrop(random);
                        rom[dataAddress+7] = getRandomAINonCasterDrop(random);
                    }
                }
            }
        }
    }
}

function randomizeEnemyDrops(rom, random)
{
    //randomize drops
    console.log("RANDOMIZING ENEMY DROPS");

    var numEntries = TABLE_STATS_ENTRIES;

    //reassign drops
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            if(rom[dataAddress+6] > 0x00 || rom[dataAddress+7] > 0x00) //only randomize drops if this entry has drops
            {
                if(rom[dataAddress] > 0x00 || rom[dataAddress+1] > 0x00) //assign from caster pool
                {
                    rom[dataAddress+6] = getRandomAICasterDrop(random);
                    rom[dataAddress+7] = getRandomAICasterDrop(random);
                }
                else //assign from regular pool
                {
                    rom[dataAddress+6] = getRandomAINonCasterDrop(random);
                    rom[dataAddress+7] = getRandomAINonCasterDrop(random);
                }
            }
        }
    }
}

function getRandomAICasterDrop(random)
{
    var dropList = [];
    dropList = dropList.concat(DATA_ENEMY_INVENTORY_DROPS_CASTERS);
    dropList.push(random.from(DATA_ENEMY_INVENTORY_DROPS_POTIONS));
    dropList.push(random.from(DATA_ENEMY_INVENTORY_DROPS_REAGENTS));
    var item = 0xB3; //gold
    if(random.flipCoin(0.5)) //50% of drops should be gold
    {
        item = random.from(dropList);
    }
    return item;
}

function getRandomAINonCasterDrop(random, dropList)
{
    var dropList = [];
    dropList = dropList.concat(DATA_ENEMY_INVENTORY_DROPS);
    dropList.push(random.from(DATA_ENEMY_INVENTORY_DROPS_FOOD));
    dropList.push(random.from(DATA_ENEMY_INVENTORY_DROPS_POTIONS));
    var item = 0xB3; //gold
    if(random.flipCoin(0.5)) //50% of drops should be gold
    {
        item = random.from(dropList);
    }
    return item;
}

function getRandomAIBelievableCreatureDrop(random, dropList)
{
    var dropList = [];
    dropList = dropList.concat(DATA_ENEMY_INVENTORY_DROPS_ANIMALS);
    var item = 0xB3; //gold
    if(random.flipCoin(0.5)) //50% of drops should be gold
    {
        item = random.from(dropList);
    }
    return item;
}

function getRandomAIBelievableAnimalDrop(random, dropList)
{
    var dropList = [];
    dropList = dropList.concat(DATA_ENEMY_INVENTORY_DROPS_ANIMALS);
    var item = random.from(dropList);
    return item;
}

function shuffleEnemyEquipmentUsers(rom, random)
{
    //shuffle which enemies use equipment
    console.log("SHUFFLING ENEMY EQUIPMENT USERS");

    //gather enemy data
    var enemyData = gatherEnemyData(rom);
    
    //shuffle data
    enemyData.shuffle(random);

    //reassign equipment
    var numEntries = TABLE_STATS_ENTRIES;
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            var dataEntry = enemyData.pop();
            rom[dataAddress+2] = dataEntry.weapons[0];
            rom[dataAddress+3] = dataEntry.weapons[1];

            rom[dataAddress+4] = dataEntry.armor[0];
            rom[dataAddress+5] = dataEntry.armor[1];
        }
    }
}

function shuffleEnemyEquipmentUsersBelievable(rom, random)
{
    //shuffle which enemies use equipment
    console.log("SHUFFLING ENEMY EQUIPMENT USERS - BELIEVABLE");

    //gather enemy data
    var enemyData = gatherEnemyData(rom);
    
    //shuffle data
    enemyData.shuffle(random);

    var userData = [];
    var nonUserData = [];
    var dataLength = enemyData.length;
    for(var i = 0; i < dataLength; ++i)
    {
        var dataEntry = enemyData.pop();

        var dropClass = DATA_ENEMY_DROP_CLASSES[dataEntry.entryNum];
        if(dropClass < 3)
        {
            if(dataEntry.armor[0] > 0x00 || dataEntry.armor[1] > 0x00 || dataEntry.weapons[0] > 0x00 || dataEntry.weapons[1] > 0x00)
            {
                userData.push(dataEntry);
            }
            else
            {
                nonUserData.push(dataEntry);
            }
        }
        else
        {
            userData.push(dataEntry);
        }
    }

    //reassign equipment
    var numEntries = TABLE_STATS_ENTRIES;
    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            var dataEntry;
            var dropClass = DATA_ENEMY_DROP_CLASSES[i];
            if(dropClass < 3)
            {
                if(rom[dataAddress+4] > 0x00 || rom[dataAddress+5] > 0x00 || rom[dataAddress+2] > 0x00 || rom[dataAddress+3] > 0x00)
                {
                    dataEntry = userData.pop();
                }
                else
                {
                    dataEntry = nonUserData.pop();
                }
            }
            else
            {
                dataEntry = userData.pop();
            }
            rom[dataAddress+2] = dataEntry.weapons[0];
            rom[dataAddress+3] = dataEntry.weapons[1];

            rom[dataAddress+4] = dataEntry.armor[0];
            rom[dataAddress+5] = dataEntry.armor[1];
        }
    }
}

function shuffleEnemyEquipment(rom, random)
{
    //shuffle enemy equipment
    console.log("SHUFFLING ENEMY EQUIPMENT");
    
    //gather enemy data
    var weaponData = getEnemyWeapons(rom);
    var armorData = getEnemyArmor(rom);

    //shuffle data
    weaponData.shuffle(random);
    armorData.shuffle(random);

    //reassign weapons
    var numWeapEntries = TABLE_STATS_ENTRIES;
    for(var i = 0; i < numWeapEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            if(rom[dataAddress+2] > 0x00 || rom[dataAddress+3] > 0x00) //if this entry should have weapons then we shuffle them
            {
                rom[dataAddress+2] = weaponData.pop();
                rom[dataAddress+3] = weaponData.pop();
            }
        }
    }

    //reassign armor
    var numArmorEntries = 30;
    for(var i = 0; i < numArmorEntries; ++i)
    {
        var dataAddress = 0x16610+i;
        rom[dataAddress] = armorData.pop();
    }
}

function randomizeEnemyEquipment(rom, random)
{
    //randomize enemy equipment 
    console.log("RANDOMIZING ENEMY EQUIPMENT");

    //reassign weapons
    randomizeEnemyWeapons(rom, random);

    //reassign armor
    randomizeEnemyArmor(rom, random);

    //set 6 armor values to 00 to match base game
    randomlyAddZerosToArmor(rom, random);
}

function randomizeEnemyWeapons(rom, random)
{
    var numWeapEntries = TABLE_STATS_ENTRIES;
    for(var i = 0; i < numWeapEntries; ++i)
    {
        var dataAddress = 0x16440+(i*8);

        //skip entries - Lord British, Avatar, Glitch
        if(dataAddress != 0x164A8 && dataAddress != 0x0164B0 && dataAddress != 0x164C0)
        {
            if(rom[dataAddress+2] > 0x00 || rom[dataAddress+3] > 0x00) //if this entry should have weapons then we randomize them
            {
                rom[dataAddress+2] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_WEAPONS);
                rom[dataAddress+3] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_WEAPONS);
            }
        }
    }
}

function randomizeEnemyArmor(rom, random)
{
    var numArmorEntries = 30;
    for(var i = 0; i < numArmorEntries; ++i)
    {
        var dataAddress = 0x16610+i;

        if(checkIfInList(rom[dataAddress], DATA_ENEMY_INVENTORY_ARMOR))
        {
            rom[dataAddress] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_ARMOR);
        }
        else if(checkIfInList(rom[dataAddress], DATA_ENEMY_INVENTORY_HELMS))
        {
            rom[dataAddress] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_HELMS);
        }
        else if(checkIfInList(rom[dataAddress], DATA_ENEMY_INVENTORY_SHIELDS))
        {
            rom[dataAddress] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_SHIELDS);
        }
        else
        {
            var randomInt = random.from([0,1,2]);
            if(randomInt == 0)
            {
                rom[dataAddress] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_ARMOR);
            }
            else if(randomInt == 1)
            {
                rom[dataAddress] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_HELMS);
            }
            else if(randomInt == 2)
            {
                rom[dataAddress] = getRandomAIEquipment(random, DATA_ENEMY_INVENTORY_SHIELDS);
            }
        }
    }
}

function randomlyAddZerosToArmor(rom, random)
{
    //set 6 armor values to 00 to match base game
    var numArmorEntries = 30;
    var randValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
    randValues.shuffle(random);
    var randZeros = [randValues.pop(),randValues.pop(),randValues.pop(),randValues.pop(),randValues.pop(),randValues.pop()];
    for(var i = 0; i < numArmorEntries; ++i)
    {
        for(var j = 0; j < randZeros.length; ++j)
        {
            if(randZeros[j] == i)
            {
                var dataAddress = 0x16610+i;
                rom[dataAddress] = 0x00;
            }
        }
    }
}

function getEnemyWeapons(rom)
{
    //enemies can have up to two weapons which are set as a pair of bytes in the base enemy data
    var weaponData = [];

    var enemyData = gatherEnemyData(rom);
    var numEntries = enemyData.length;

    for(var i = 0; i < numEntries; ++i)
    {
        var dataEntry = enemyData[i];
        if(dataEntry.weapons[0] > 0x00 || dataEntry.weapons[1] > 0x00)
        {
            weaponData.push(dataEntry.weapons[0]);
            weaponData.push(dataEntry.weapons[1]);
        }
    }
    return weaponData;
}

function getEnemyArmor(rom)
{
    //starts at 16610 and ends at 1662D
    var armorData = [];
    var numEntries = 30;

    for(var i = 0; i < numEntries; ++i)
    {
        var dataAddress = 0x16610+i;
        var dataEntry = rom[dataAddress];
        armorData.push(dataEntry);
    }
    return armorData;
}

function getRandomAIEquipment(random, equipList)
{
    var item = random.from(equipList);
    return item;
}

//=================================================================================

function addNewEnemySpawns(rom, random)
{
    console.log("ADDING NEW ENEMY SPAWNS");
    var serpentSpawners = [];
    var zuSpawners = [];

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        var entryRomData = rom[TABLE_SPAWNER_START+entryID+1];

        if(entryRomData == 0x29)
        {
            //if the entry is a daemon add it to the serpent list
            serpentSpawners.push(entryID);
        }
        else if(entryRomData == 0x17 || entryRomData == 0x97 || entryRomData == 0x1E || entryRomData == 0x9E)
        {
            //if the entry is a reaper or gazer add it to the zuflower list
            zuSpawners.push(entryID);
        }
    }

    serpentSpawners.shuffle(random);
    zuSpawners.shuffle(random);

    var serpentMaxSpawns = serpentSpawners.length / 2; // replace half the spawners with serpents
    var zuMaxSpawns = zuSpawners.length / 3; //replace a third of the spawners with zu flowers

    for(var i = 0; i < serpentMaxSpawns; i++)
    {
        rom[TABLE_SPAWNER_START+serpentSpawners[i]+1] = 0x34;
    }
    for(var i = 0; i < zuMaxSpawns; i++)
    {
        if(zuSpawners[i] == 0x17 || zuSpawners[i] == 0x1E)
        {
            rom[TABLE_SPAWNER_START+zuSpawners[i]+1] = 0x28;
        }
        else
        {
            rom[TABLE_SPAWNER_START+zuSpawners[i]+1] = 0xA8;
        }
    }

}

function addZuFlower(rom)
{
    //reaper graphics
    //rom[0x01675D] = 0x17; //assign new sprite id
    //rom[0x002697] = 0xAF; //assign new anims
    //rom[0x002698] = 0xA9; //assign new anims
    //rom[0x00F181] = 0x01; //assign new palette

    //squid graphics
    rom[0x01675D] = 0x28; //assign new sprite id
    rom[0x002697] = 0xBB; //assign new anims
    rom[0x002698] = 0xAB; //assign new anims
    rom[0x00F181] = 0x02; //assign new palette

    //change stats to PC stats
    rom.set([0xD4, 0x19, 0x01, 0x04, 0x0A, 0x1E],0x7AFB);
    rom.set([0xD4, 0x19, 0x01, 0x04, 0x0A, 0x1E],0x7B6D);
}

function addSilverSerpent(rom)
{
    //move giant ant to make room for silver serpent
    rom.set([0xBF, 0xC4, 0xEF, 0x02, 0x48, 0xC2, 0x20, 0xBF, 0xC2, 0xEF, 0x02],0x4497);
    rom[0x01676C] = 0x39;
    var antByteSize1 = 0x16845-0x1679B;
    for(var i = 0; i < antByteSize1+1; ++i)
    {
        rom[0x16FC2+i] = rom[0x1679B+i];
    }
    rom.set([0x00, 0xF4, 0x1F], 0x1706D);
    var antByteSize2 = 0xFEBFF-0xFE800;
    for(var i = 0; i < antByteSize2+1; ++i)
    {
        rom[0xFF400+i] = rom[0xFE800+i];
    }

    //update animation and render functions and fix palette
    rom.set([0x46, 0xC8],0x045F9);
    rom.set([0xD0, 0xFB],0x026AF);
    rom.set([0xA5, 0x04, 0x38, 0xE9, 0x00, 0x04, 0x85, 0x04, 0x4C, 0x47, 0xB1], 0x07BD0);

    //rearrange the serpent tiles into a dragon pattern as we are now using the dragon rendering code
    rom.set([0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x16, 0x06, 0x29, 0x0f, 0x20, 0x0f, 0x35, 0x0e, 0x30, 0x0b,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x09, 0x0f, 0x10, 0x19, 0x10, 0x10, 0x00, 0x04, 0x15, 0x04,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xb0, 0x00, 0x48, 0x00, 0xb4, 0xa0, 0x54, 0xd0, 0xb4, 0x60,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xb0, 0xb0, 0x78, 0xc8, 0x38, 0x68, 0x98, 0x38,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x05, 0x01, 0x0a, 0x03, 0x0c, 0x07,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x03, 0x04, 0x06, 0x00, 0x04,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x00, 0xa0, 0x80, 0xd0, 0xc0, 0x50, 0xc0,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0xc0, 0x20, 0xe0, 0x20, 0x60,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x0e, 0x03, 0x05, 0x01, 0x05, 0x01, 0x05, 0x01, 0x05, 0x01, 0x05, 0x01, 0x0e, 0x03, 0x0a, 0x03,
             0x04, 0x06, 0x02, 0x03, 0x02, 0x03, 0x02, 0x03, 0x02, 0x03, 0x02, 0x03, 0x04, 0x06, 0x04, 0x06,
             0x50, 0xc0, 0x38, 0xe0, 0x28, 0xe0, 0x28, 0xe0, 0x28, 0xe0, 0x38, 0xe0, 0x50, 0xc0, 0x50, 0xc0,
             0x20, 0x60, 0x10, 0x30, 0x10, 0x30, 0x10, 0x30, 0x10, 0x30, 0x10, 0x30, 0x20, 0x60, 0x20, 0x60,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x3c, 0x1c, 0x59, 0x03, 0x65, 0x01,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x1f, 0x24, 0x25, 0x02, 0x03,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x00, 0xfc, 0x00, 0x87, 0x87, 0x78, 0xff,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x07, 0x78, 0xff, 0x00, 0x78,
             0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x11, 0x00, 0xee, 0x0f, 0x11, 0x1f, 0xe0, 0xff, 0x00, 0xff,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0e, 0x0e, 0x10, 0x1e, 0xe0, 0xf1, 0x00, 0xe0, 0x00, 0x00,
             0x00, 0x00, 0x00, 0x00, 0xf0, 0x00, 0xc8, 0x00, 0x14, 0xf0, 0x4c, 0x78, 0x0c, 0xf8, 0x54, 0xb0,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xb0, 0x30, 0x08, 0x18, 0x80, 0xc8, 0x00, 0x08, 0x88, 0x18,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x34, 0x0f, 0x28, 0x0f, 0x28, 0x0f, 0x28, 0x0f, 0x14, 0x07, 0x0a, 0x03, 0x0a, 0x03, 0x0a, 0x03, 
             0x00, 0x04, 0x10, 0x18, 0x10, 0x18, 0x10, 0x18, 0x08, 0x0c, 0x04, 0x06, 0x04, 0x06, 0x04, 0x06, 
             0x9c, 0x30, 0x74, 0xf0, 0x14, 0xf0, 0x0c, 0xe0, 0x38, 0xe0, 0x50, 0xc0, 0x50, 0xc0, 0x50, 0xc0, 
             0x48, 0x58, 0x08, 0x78, 0x08, 0x18, 0x18, 0x18, 0x10, 0x30, 0x20, 0x60, 0x20, 0x60, 0x20, 0x60, 
             0x15, 0x03, 0x18, 0x06, 0x29, 0x07, 0x20, 0x07, 0x28, 0x0f, 0x28, 0x0f, 0x14, 0x07, 0x0a, 0x03, 
             0x08, 0x09, 0x0d, 0x01, 0x10, 0x11, 0x18, 0x18, 0x10, 0x18, 0x10, 0x18, 0x08, 0x0c, 0x04, 0x06, 
             0x68, 0xa0, 0x28, 0xc0, 0x34, 0xd0, 0x14, 0xd0, 0x14, 0xf0, 0x14, 0xf0, 0x28, 0xe0, 0x50, 0xc0, 
             0x10, 0x30, 0x70, 0x10, 0x08, 0x18, 0x28, 0x38, 0x08, 0x18, 0x08, 0x18, 0x10, 0x30, 0x20, 0x60, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x0a, 0x03, 0x0a, 0x03, 0x1c, 0x07, 0x14, 0x07, 0x14, 0x07, 0x1c, 0x07, 0x0a, 0x03, 0x0a, 0x03,
             0x04, 0x06, 0x04, 0x06, 0x08, 0x0c, 0x08, 0x0c, 0x08, 0x0c, 0x08, 0x0c, 0x04, 0x06, 0x04, 0x06,
             0x50, 0xc0, 0x70, 0xc0, 0xa0, 0x80, 0xa0, 0x80, 0xa0, 0x80, 0xa0, 0x80, 0x70, 0xc0, 0x50, 0xc0,
             0x20, 0x60, 0x20, 0x60, 0x40, 0xc0, 0x40, 0xc0, 0x40, 0xc0, 0x40, 0xc0, 0x20, 0x60, 0x20, 0x60, 
             0x03, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x40, 0x7f, 0xcf, 0x0f, 0x78, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x80, 0xc0, 0x70, 0x7f, 0x0f, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x01, 0xfe, 0xe2, 0xfe, 0x12, 0x1f, 0xf7, 0x07, 0x19, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x01, 0xe3, 0xe0, 0xf2, 0x18, 0x1f, 0x0f, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0xa8, 0x60, 0x50, 0xc0, 0xa8, 0xa0, 0xe8, 0x40, 0x10, 0x00, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x90, 0x30, 0x20, 0x60, 0x70, 0xd0, 0xf0, 0x90, 0xe0, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x0a, 0x03, 0x0a, 0x03, 0x0e, 0x03, 0x05, 0x01, 0x05, 0x01, 0x05, 0x01, 0x05, 0x01, 0x06, 0x03, 
             0x04, 0x06, 0x04, 0x06, 0x04, 0x06, 0x02, 0x03, 0x02, 0x03, 0x02, 0x03, 0x02, 0x03, 0x00, 0x02, 
             0x50, 0xc0, 0x50, 0xc0, 0x50, 0xc0, 0x70, 0xc0, 0x20, 0x80, 0x20, 0x80, 0xe0, 0x80, 0x40, 0x00, 
             0x20, 0x60, 0x20, 0x60, 0x20, 0x60, 0x20, 0x60, 0x40, 0x40, 0x40, 0x40, 0x40, 0xc0, 0x80, 0x80, 
             0x0a, 0x03, 0x0a, 0x03, 0x0a, 0x03, 0x0e, 0x03, 0x04, 0x01, 0x04, 0x01, 0x07, 0x01, 0x02, 0x00, 
             0x04, 0x06, 0x04, 0x06, 0x04, 0x06, 0x04, 0x06, 0x02, 0x02, 0x02, 0x02, 0x02, 0x03, 0x01, 0x01, 
             0x50, 0xc0, 0x50, 0xc0, 0x70, 0xc0, 0xa0, 0x80, 0xa0, 0x80, 0xa0, 0x80, 0xa0, 0x80, 0x60, 0xc0, 
             0x20, 0x60, 0x20, 0x60, 0x20, 0x60, 0x40, 0xc0, 0x40, 0xc0, 0x40, 0xc0, 0x40, 0xc0, 0x00, 0x40, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc3, 0x00, 0x7e, 0x00, 0xc3, 0xc3, 0x3c, 0xff, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc3, 0xc3, 0x3c, 0xff, 0x00, 0x3c, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7c, 0x00, 0xc7, 0x00, 0x7c, 0x7c, 0x83, 0xff, 0x00, 0xff, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7c, 0x7c, 0x83, 0xff, 0x00, 0x83, 0x00, 0x00,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x03, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x78, 0x00, 0xcf, 0x0f, 0x40, 0x7f, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x0f, 0x70, 0x7f, 0x80, 0xc0, 
             0x00, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x43, 0x00, 0xb6, 0x30, 0x41, 0x7e, 0x80, 0xff, 0x05, 0xfd, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3c, 0x3c, 0x4b, 0x79, 0x82, 0xc0, 0x00, 0x80, 0x02, 0x07, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x00, 0xa0, 0x80, 0x50, 0xc0, 0x30, 0xe0, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0xc0, 0x20, 0x60, 0x00, 0x20, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x0b, 0x03, 0x08, 0x02, 0x0d, 0x04, 0x0e, 0x04, 0x0e, 0x04, 0x05, 0x00, 0x03, 0x00, 0x00, 0x00, 
             0x04, 0x07, 0x05, 0x05, 0x02, 0x06, 0x00, 0x04, 0x00, 0x04, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 
             0xc0, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x80, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x03, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0xd0, 0xc0, 0x10, 0x40, 0xb0, 0x20, 0x70, 0x20, 0x70, 0x20, 0xa0, 0x00, 0xc0, 0x00, 0x00, 0x00, 
             0x20, 0xe0, 0xa0, 0xa0, 0x40, 0x60, 0x00, 0x20, 0x00, 0x20, 0x40, 0x40, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0xff, 0xc3, 0xff, 0x3c, 0x3c, 0xe7, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0xc3, 0xc3, 0xff, 0x3c, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x7c, 0xff, 0x83, 0x83, 0xfe, 0x00, 0x83, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x7c, 0x7c, 0xff, 0x83, 0x83, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
             0x65, 0x01, 0x59, 0x03, 0x3c, 0x1c, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x02, 0x03, 0x24, 0x25, 0x03, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x78, 0xff, 0x87, 0x87, 0xfc, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x78, 0x78, 0xff, 0x07, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0xff, 0x81, 0xfe, 0x47, 0x71, 0xbc, 0x3c, 0x43, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x02, 0x80, 0x8a, 0xc9, 0x43, 0x7f, 0x3c, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x70, 0xe0, 0xd0, 0xc0, 0x20, 0x00, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x60, 0x20, 0xe0, 0xc0, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
             0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
            ], 0xFE400);
}