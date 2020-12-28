//TODO : Add pascifist option to make all enemies not aggressive

const TABLE_SPAWNER_START = 0x19804;
const TABLE_SPAWNER_END = 0x19A02;
const TABLE_SPAWNER_ENTRIES = 256;

function randomizeEnemySpawners(rom, random, monsterFlag, wildFlag, animalFlag, peopleFlag)
{
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
            var foundSpawner = getRandomWild(rom, random, entryID);
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

function randomizeEnemySpawnersMix(rom, random, monsterFlag, wildFlag, animalFlag, peopleFlag)
{
    var spawnersSolo = getMixedSpawnerListSolo(random, monsterFlag, wildFlag, animalFlag, peopleFlag);
    var spawnersGroup = getMixedSpawnerListGroup(random, monsterFlag, wildFlag, animalFlag, peopleFlag);

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

function getRandomWild(rom, random, entryID)
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

function getMixedSpawnerListSolo(random, monsterFlag, wildFlag, animalFlag, peopleFlag)
{
    var spawnersSolo = [];

    if(monsterFlag == true) //randomizer monsters
    {
        spawnersSolo = addSpawnerDataToSpawnerDataPool(spawnersSolo, DATA_SPAWNER_EVIL_SOLO);
    }

    if(wildFlag == true) //randomizer monsters
    {
        spawnersSolo = addSpawnerDataToSpawnerDataPool(spawnersSolo, DATA_SPAWNER_WILD_SOLO);
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

function getMixedSpawnerListGroup(random, monsterFlag, wildFlag, animalFlag, peopleFlag)
{
    var spawnersGroup = [];

    if(monsterFlag == true) //randomizer monsters
    {
        spawnersGroup = addSpawnerDataToSpawnerDataPool(spawnersGroup, DATA_SPAWNER_EVIL_GROUP);
    }

    if(wildFlag == true) //randomizer monsters
    {
        spawnersGroup = addSpawnerDataToSpawnerDataPool(spawnersGroup, DATA_SPAWNER_WILD_GROUP);
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

function randomizeEnemyAggression(rom, random)
{
    var spawnerFlags = [];
    spawnerFlags = getSpawnerFlags(rom, spawnerFlags);
    spawnerFlags.shuffle(random);

    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;

        //check for early out
        var earlyOut = checkAggressionEarlyOut(rom, entryID);

        if(earlyOut == false) //randomizer aggression
        {
            if(spawnerFlags[i] == 0)
            {
                i += 1;
            }
            else if(spawnerFlags[i] == 1)
            {
                spawnerFlags[i] = 0x0B;
            }
            rom[TABLE_SPAWNER_START+entryID] = spawnerFlags[i];
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

function getSpawnerFlags(rom, spawnerFlags)
{
    for(var i = 0; i < TABLE_SPAWNER_ENTRIES; ++i )
    {
        var entryID = i*2;
        spawnerFlags.push(rom[TABLE_SPAWNER_START+entryID]);
    }
    return spawnerFlags;
}
