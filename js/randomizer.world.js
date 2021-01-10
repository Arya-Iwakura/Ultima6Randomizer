const WORLD_OFFSET = 0x80000;
const WORLD_OFFSET_MIN = 0x80200; //ignore the boundary chunks that start at 0x80000
const WORLD_OFFSET_MAX = 0x87DFF; //ignore the boundary chunks that end at 0x87FFF
const WORLD_BYTE_SIZE = 31744; //32768 total bytes if all boundary chunks were included;
const WORLD_TOTAL_CHUNKS_SIZE = 15872; //16384 total chunks if all boundary chunks were included;
const WORLD_SIZE_MIN = 0;
const WORLD_SIZE_MAX = 128;

const BUFFER_WEST = 4;
const BUFFER_EAST = 5;
const BUFFER_NORTH = 3;
const BUFFER_SOUTH = 4;

//chunk grid is 128x128

//Notes
//Need to fix spawners that are in bad spots afterwards. How do we handle unreachable spawners?
//How do we handle coasts? Pre-existing coasts and docks?
//How do we handle mountains and deserts that must be at least 2 wide?
//How do we handle static tiles blending into non-static tiles?
//Do we do heat and humidity maps for biomes or do we seed and grow them across the map on land areas?
//How do we handle road connection points and the relation to the road graph?
//How do we generate rivers? Bridges over rivers and narrow bodies of water?

//Biomes - Plains, Shrubland, Forest, Swamp, Mountains, Desert, Ocean
//Features - Lakes, Volcanos, Empty islands, Crops, Orchards, Individual Hills
//Roads and Rivers

//to make a rectangle coordinate we take the address hex and convert it to x and y then half the x value
var DATA_STATIC_RECTS = //minX, maxX, minY, maxY 
[
    //[35,41,42,48], //LB Castle
    [32,45,39,55], [30,31,46,46], [34,37,38,38], [35,37,56,57], [46,54,42,53],//Britain
    [28,29,16,16], [28,32,17,24], [27,27,20,21], //Yew
    [06,12,58,67], //Skara Brae
    [49,57,90,100], //Trinsic
    [15,20,105,113], [14,14,112,112], //Jhelom
    [71,80,09,12], [70,70,10,10], [71,75,13,15], [73,75,08,08], [75,75,07,07], [78,78,08,08], [84,85,11,13], //Minoc
    [111,118,62,69], //Moonglow
    [91,96,80,89], //New Magincia
    
    [67,67,44,44], [68,71,43,44], [69,71,45,45], [71,72,42,42], [72,72,43,43], //Cove
    [09,19,21,28], [08,08,22,22], [20,20,27,27], //Empath Abbey
    [43,52,69,80], //Paws
    [65,77,115,121], //Serpents Hold
    [106,108,43,44], [107,107,45,45], [118,119,49,51], [109,109,50,53], [110,113,52,55], [111,113,50,51], [112,113,49,49], [114,114,51,52], //Lycaeum
    [68,74,74,80], //Bucs Den

    [75,77,34,37], //Stonegate
    [97,99,117,119], [98,98,120,121], //Suteks Castle

    [48,48,98,98], //Trinsic Moongate
    [83,83,08,08], //Minoc Moongate

    [21,22,18,18], //Big Ben
    [40,41,25,25], [40,40,26,26], //Nicodemus
    [24,25,28,29], //Iolo House
    [19,19,32,32], //Sign to Iolo House
    [25,26,57,58], //Fighter Cabin
    [50,50,86,86], //Nomad Camp
    [65,65,41,41], //Sign NE of Cove
    [68,68,40,40], //Sign N of Cove
    [101,101,29,30], //Sin'Vraal
    [116,117,26,26], [117,117,27,27],//Bonn House

    [112,118,101,109], //Shrine of the Avatar

    [47,51,11,11], //The Long Haul Channel
    [53,53,116,116], //crashed ship with map piece
    [49,50,66,66], //crashed ship north of paws

    [62,63,44,45], //Shrine of Compassion
    [116,117,32,33], //Shrine of Honesty
    [40,41,102,103], //Shrine of Honor
    [114,115,116,117], //Shrine of Humility
    [36,37,04,05], //Shrine of Justice
    [103,104,20,21], //Shrine of Sacrifice
    [19,20,117,118], //Shrine of Valor

    [35,35,82,82], //Destard Entrance
    [118,118,116,116], //Hythloth Entrance
    [43,43,101,101], //Hero Cave Entrance near Trinsic
    [28,29,51,52], //Shame Entrance
    [21,23,54,55], //Cyclops Cave Entrance
    [11,11,31,31], //Spider Cave Entrance
    [76,76,45,45], //Swamp Cave Entrance
    [62,62,10,10], //Wrong Entrance
    [78,78,13,14], //Covetous Entrance
    [104,104,24,24], [108,108,23,23],//Ant Mound Entrances
    [120,120,38,38], //Deceit Entrance
    [45,45,33,34], //Despise Entrance
    [84,91,100,107], //Pirate Cave Island
    //[70,70,74,74], //Buc Cave Entrance
];

//TODO : Add a data structure to define all spots that are egg spawns that we can change as long as they remain flat open spaces
//TODO : Add a data structure to define all spots that are cave entrances so that we can randomize their entrance visuals
//TODO : Choose if we randomize the tiles with rafts or if we include them in the static tiles

//biomeTypes - 0-null, 1-water, 2-grass, 3-shrub, 4-forest, 5-mountain, 6-swamp, 7-desert
const BIOME_NONE = 0;
const BIOME_WATER = 1;
const BIOME_GRASS = 2;
const BIOME_SHRUB = 3;
const BIOME_FOREST = 4;
const BIOME_MOUNTAIN = 5;
const BIOME_SWAMP = 6;
const BIOME_DESERT = 7;

var worldMapArray = [];
var worldMapRandom;

function MapTile() { this.x = 0; this.y = 0; this.tile = 0x00; this.modifier = 0x00; this.cell = 0; this.isStatic = false; this.chunkID = 0; this.chunkOffset = 0x00; this.biomeType = 0;}

function randomizeWorld(rom, random)
{
    console.log("RANDOMIZING WORLD");
    fillBottomBorder(rom);

    worldMapRandom = random;
    //var debugConsoleMap = "";

    for(var y = 0; y < WORLD_SIZE_MAX; ++y)
    {
        //var debugConsoleMapRow = "";
        worldMapArray[y] = [];

        for(var x = 0; x < WORLD_SIZE_MAX; ++x)
        {
            if(x >= BUFFER_WEST && x < WORLD_SIZE_MAX-BUFFER_EAST && y >= BUFFER_NORTH && y < WORLD_SIZE_MAX-BUFFER_SOUTH)
            {
                var chunkID = (y*256) + (x*2);
                var chunkOffset = WORLD_OFFSET + chunkID;
                var newChunkNum = 0;

                var isStatic = false;
                
                isStatic = checkIfChunkIsStatic(x,y);

                if(isStatic == false) //non-static tile
                {
                    newChunkNum = 255;
                    rom[chunkOffset] = newChunkNum;
                    rom[chunkOffset+1] = 3;

                    worldMapArray[y][x] = new MapTile();
                    worldMapArray[y][x].x = x;
                    worldMapArray[y][x].y = y;
                    worldMapArray[y][x].isStatic = false;
                    worldMapArray[y][x].chunkID = chunkID;
                    worldMapArray[y][x].chunkOffset = chunkOffset;
                }
                else //static tile
                {
                    newChunkNum = 0;

                    worldMapArray[y][x] = new MapTile();
                    worldMapArray[y][x].x = x;
                    worldMapArray[y][x].y = y;
                    worldMapArray[y][x].isStatic = true;
                    worldMapArray[y][x].chunkID = chunkID;
                    worldMapArray[y][x].chunkOffset = chunkOffset;
                }
            }
            else //outside of static tile area
            {
                //debugConsoleMapRow += ".";
                worldMapArray[y][x] = new MapTile();
                worldMapArray[y][x].x = x;
                worldMapArray[y][x].y = y;
                worldMapArray[y][x].isStatic = false;
                worldMapArray[y][x].chunkID = chunkID;
                worldMapArray[y][x].chunkOffset = chunkOffset;
            }
            
        }
        //debugConsoleMap += debugConsoleMapRow + '\n';
        //console.log(debugConsoleMapRow);
    }
    //console.log(debugConsoleMap);

    VoronoiMap.init();
    
    //do these passes a couple of times to clean up all edges and floating single tiles
    eliminateSingleTiles();
    createCoasts();
    createDeserts();
    createMountains();
    
    eliminateSingleTiles();
    createCoasts();
    createDeserts();
    createMountains();
    
    assignChunksToRom(rom);
}

//there are no tiles for any set that can be surrounded on at least 2 cardinal directions by water so we need to fix any of these single tiles
function eliminateSingleTiles()
{
    for(var y = 3; y < WORLD_SIZE_MAX-3; ++y)
    {
        for(var x = 3; x < WORLD_SIZE_MAX-3; ++x)
        {
            if(worldMapArray[y][x].isStatic == false)
            {
                singleTileCoastEliminationCheck(x, y, 2);

                if(worldMapArray[y][x].biomeType == BIOME_DESERT)
                {
                    singleTileDesertEliminationCheck(x, y, 2);
                }
            }
        }
    }
}

//for water we check any tile for edges touching water tiles
function singleTileCoastEliminationCheck(x, y, depth)
{
    var surroundingTiles = getCardinalTiles(x,y);
    var nTile = surroundingTiles[0];
    var eTile = surroundingTiles[1];
    var sTile = surroundingTiles[2];
    var wTile = surroundingTiles[3];

    //check if we are a single coast tile (no chunks can match a 1 tile coast)
    var isSingle = false;
    if(nTile.biomeType != BIOME_WATER && eTile.biomeType == BIOME_WATER  && sTile.biomeType == BIOME_WATER  && wTile.biomeType == BIOME_WATER){isSingle=true;}
    else if(nTile.biomeType == BIOME_WATER && eTile.biomeType != BIOME_WATER  && sTile.biomeType == BIOME_WATER  && wTile.biomeType == BIOME_WATER){isSingle=true;}
    else if(nTile.biomeType == BIOME_WATER && eTile.biomeType == BIOME_WATER  && sTile.biomeType != BIOME_WATER  && wTile.biomeType == BIOME_WATER){isSingle=true;}
    else if(nTile.biomeType == BIOME_WATER && eTile.biomeType == BIOME_WATER  && sTile.biomeType == BIOME_WATER  && wTile.biomeType != BIOME_WATER){isSingle=true;}
    else if(nTile.biomeType == BIOME_WATER && eTile.biomeType != BIOME_WATER  && sTile.biomeType == BIOME_WATER  && wTile.biomeType != BIOME_WATER){isSingle=true;}
    else if(nTile.biomeType != BIOME_WATER && eTile.biomeType == BIOME_WATER  && sTile.biomeType != BIOME_WATER  && wTile.biomeType == BIOME_WATER){isSingle=true;}

    if(isSingle == true)
    {
        //to eliminate any tiles we transform them into water
        worldMapArray[y][x].biomeType = BIOME_WATER;
        worldMapArray[y][x].tile = 0x00;
        worldMapArray[y][x].modifier = 0x00;

        if(depth > 0)
        {
            depth -= 1;
            singleTileCoastEliminationCheck(x-1,y,depth);
            singleTileCoastEliminationCheck(x+1,y,depth);
            singleTileCoastEliminationCheck(x,y-1,depth);
            singleTileCoastEliminationCheck(x,y+1,depth);
        }
    }
}

//for deserts we check for any edges that are NOT desert tiles
function singleTileDesertEliminationCheck(x, y, depth)
{
    var surroundingTiles = getCardinalTiles(x,y);
    var nTile = surroundingTiles[0];
    var eTile = surroundingTiles[1];
    var sTile = surroundingTiles[2];
    var wTile = surroundingTiles[3];

    //check if we are a single coast tile (no chunks can match a 1 tile coast)
    var isSingle = false;
    if(nTile.biomeType == BIOME_DESERT && eTile.biomeType != BIOME_DESERT  && sTile.biomeType != BIOME_DESERT  && wTile.biomeType != BIOME_DESERT){isSingle=true;}
    else if(nTile.biomeType != BIOME_DESERT && eTile.biomeType == BIOME_DESERT  && sTile.biomeType != BIOME_DESERT  && wTile.biomeType != BIOME_DESERT){isSingle=true;}
    else if(nTile.biomeType != BIOME_DESERT && eTile.biomeType != BIOME_DESERT  && sTile.biomeType == BIOME_DESERT  && wTile.biomeType != BIOME_DESERT){isSingle=true;}
    else if(nTile.biomeType != BIOME_DESERT && eTile.biomeType != BIOME_DESERT  && sTile.biomeType != BIOME_DESERT  && wTile.biomeType == BIOME_DESERT){isSingle=true;}
    else if(nTile.biomeType == BIOME_DESERT && eTile.biomeType != BIOME_DESERT  && sTile.biomeType == BIOME_DESERT  && wTile.biomeType != BIOME_DESERT){isSingle=true;}
    else if(nTile.biomeType != BIOME_DESERT && eTile.biomeType == BIOME_DESERT  && sTile.biomeType != BIOME_DESERT  && wTile.biomeType == BIOME_DESERT){isSingle=true;}

    if(isSingle == true)
    {
        worldMapArray[y][x].biomeType = BIOME_GRASS; //to eliminate single tiles we transform them into grass
        worldMapArray[y][x].tile = 0xF3;
        worldMapArray[y][x].modifier = 0x00;

        if(depth > 0)
        {
            depth -= 1;
            singleTileDesertEliminationCheck(x-1,y,depth);
            singleTileDesertEliminationCheck(x+1,y,depth);
            singleTileDesertEliminationCheck(x,y-1,depth);
            singleTileDesertEliminationCheck(x,y+1,depth);
        }
    }
}

//deserts, forests, and shrublands can never be next to water
//mountains and swamps can only have inside corners touching water
function createCoasts()
{
    for(var y = 3; y < WORLD_SIZE_MAX-3; ++y)
    {
        for(var x = 3; x < WORLD_SIZE_MAX-3; ++x)
        {
            if(worldMapArray[y][x].isStatic == false)
            {
                //if we are not water, check for coasts
                if(worldMapArray[y][x].biomeType != BIOME_WATER)
                {
                    //get ordinals and cardinal chunks
                    var surroundingTiles = getDirectionalTiles(x,y);
                    var nTile = surroundingTiles[0];
                    var neTile = surroundingTiles[1];
                    var eTile = surroundingTiles[2];
                    var seTile = surroundingTiles[3];
                    var sTile = surroundingTiles[4];
                    var swTile = surroundingTiles[5];
                    var wTile = surroundingTiles[6];
                    var nwTile = surroundingTiles[7];

                    //only grass can be next to water so we convert coastal tiles to grass (exception for mountain and swamp inner corners)
                    if(nTile.biomeType == BIOME_WATER && eTile.biomeType != BIOME_WATER  && sTile.biomeType != BIOME_WATER  && wTile.biomeType != BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x3C,0x4C]); //north edge
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(nTile.biomeType == BIOME_WATER && eTile.biomeType == BIOME_WATER  && sTile.biomeType != BIOME_WATER  && wTile.biomeType != BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x3D,0x4D]); //north east outer corner
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(nTile.biomeType != BIOME_WATER && eTile.biomeType == BIOME_WATER  && sTile.biomeType != BIOME_WATER  && wTile.biomeType != BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x3E,0x4E]); //east edge
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(nTile.biomeType != BIOME_WATER && eTile.biomeType == BIOME_WATER  && sTile.biomeType == BIOME_WATER  && wTile.biomeType != BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x3F,0x4F]); //south east outer corner
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(nTile.biomeType != BIOME_WATER && eTile.biomeType != BIOME_WATER  && sTile.biomeType == BIOME_WATER  && wTile.biomeType != BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x40,0x50]); //south edge
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(nTile.biomeType != BIOME_WATER && eTile.biomeType != BIOME_WATER  && sTile.biomeType == BIOME_WATER  && wTile.biomeType == BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x41,0x51]); //south west outer corner
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(nTile.biomeType != BIOME_WATER && eTile.biomeType != BIOME_WATER  && sTile.biomeType != BIOME_WATER  && wTile.biomeType == BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x42,0x52]); //west edge
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(nTile.biomeType == BIOME_WATER && eTile.biomeType != BIOME_WATER  && sTile.biomeType != BIOME_WATER  && wTile.biomeType == BIOME_WATER)
                    {
                        worldMapArray[y][x].biomeType = BIOME_GRASS;
                        worldMapArray[y][x].tile = worldMapRandom.from([0x43,0x53]); //north west outer corner
                        worldMapArray[y][x].modifier = 0x00;
                    }
                    else if(neTile.biomeType == BIOME_WATER && seTile.biomeType != BIOME_WATER  && swTile.biomeType != BIOME_WATER  && nwTile.biomeType != BIOME_WATER)
                    {
                        if(worldMapArray[y][x].biomeType == BIOME_MOUNTAIN)
                        {
                            worldMapArray[y][x].tile = 0x26; //north east inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else if(worldMapArray[y][x].biomeType == BIOME_SWAMP)
                        {
                            worldMapArray[y][x].tile = 0x43; //north east inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else
                        {
                            worldMapArray[y][x].biomeType = BIOME_GRASS;
                            worldMapArray[y][x].tile = worldMapRandom.from([0x46,0x56]); //north east inner corner
                            worldMapArray[y][x].modifier = 0x00;
                        }
                    }
                    else if(neTile.biomeType != BIOME_WATER && seTile.biomeType == BIOME_WATER  && swTile.biomeType != BIOME_WATER  && nwTile.biomeType != BIOME_WATER)
                    {
                        if(worldMapArray[y][x].biomeType == BIOME_MOUNTAIN)
                        {
                            worldMapArray[y][x].tile = 0x17; //south east inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else if(worldMapArray[y][x].biomeType == BIOME_SWAMP)
                        {
                            worldMapArray[y][x].tile = 0x34; //south east inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else
                        {
                            worldMapArray[y][x].biomeType = BIOME_GRASS;
                            worldMapArray[y][x].tile = worldMapRandom.from([0x44,0x54]); //south east inner corner
                            worldMapArray[y][x].modifier = 0x00;
                        }
                    }
                    else if(neTile.biomeType != BIOME_WATER && seTile.biomeType != BIOME_WATER  && swTile.biomeType == BIOME_WATER  && nwTile.biomeType != BIOME_WATER)
                    {
                        if(worldMapArray[y][x].biomeType == BIOME_MOUNTAIN)
                        {
                            worldMapArray[y][x].tile = 0x18; //south west inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else if(worldMapArray[y][x].biomeType == BIOME_SWAMP)
                        {
                            worldMapArray[y][x].tile = 0x35; //south west inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else
                        {
                            worldMapArray[y][x].biomeType = BIOME_GRASS;
                            worldMapArray[y][x].tile = worldMapRandom.from([0x45,0x55]); //south west inner corner
                            worldMapArray[y][x].modifier = 0x00;
                        }
                    }
                    else if(neTile.biomeType != BIOME_WATER && seTile.biomeType != BIOME_WATER  && swTile.biomeType != BIOME_WATER  && nwTile.biomeType == BIOME_WATER)
                    {
                        if(worldMapArray[y][x].biomeType == BIOME_MOUNTAIN)
                        {
                            worldMapArray[y][x].tile = 0x27; //north west inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else if(worldMapArray[y][x].biomeType == BIOME_SWAMP)
                        {
                            worldMapArray[y][x].tile = 0x44; //north west inner corner
                            worldMapArray[y][x].modifier = 0x01;
                        }
                        else
                        {
                            worldMapArray[y][x].biomeType = BIOME_GRASS;
                            worldMapArray[y][x].tile = worldMapRandom.from([0x47,0x57]); //north west inner corner
                            worldMapArray[y][x].modifier = 0x00;
                        }
                    }
                }
            }
        }
    }
}

function createDeserts()
{
    for(var y = 3; y < WORLD_SIZE_MAX-3; ++y)
    {
        for(var x = 3; x < WORLD_SIZE_MAX-3; ++x)
        {
            if(worldMapArray[y][x].isStatic == false)
            {
                //only proceed if we are desert
                if(worldMapArray[y][x].biomeType == BIOME_DESERT)
                {
                    //get ordinals and cardinal chunks
                    var surroundingTiles = getDirectionalTiles(x,y);
                    var nTile = surroundingTiles[0];
                    var neTile = surroundingTiles[1];
                    var eTile = surroundingTiles[2];
                    var seTile = surroundingTiles[3];
                    var sTile = surroundingTiles[4];
                    var swTile = surroundingTiles[5];
                    var wTile = surroundingTiles[6];
                    var nwTile = surroundingTiles[7];

                    //we already removed desert and mountains from coastlines, so no need to worry about being next to water
                    //for deserts we check around the edges for non-desert tiles (and for mountains we do the same but for non-mountain tiles)
                    //if the edge tile is not desert then make this a desert edge tile (which all have grass) (again this is the same with mountains)
                    if(nTile.biomeType != BIOME_DESERT && eTile.biomeType == BIOME_DESERT  && sTile.biomeType == BIOME_DESERT  && wTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x04; //north edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_DESERT && eTile.biomeType != BIOME_DESERT  && sTile.biomeType == BIOME_DESERT  && wTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x05; //north east edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_DESERT && eTile.biomeType != BIOME_DESERT  && sTile.biomeType == BIOME_DESERT  && wTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x0A; //east edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_DESERT && eTile.biomeType != BIOME_DESERT  && sTile.biomeType != BIOME_DESERT  && wTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x08; //south east edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_DESERT && eTile.biomeType == BIOME_DESERT  && sTile.biomeType != BIOME_DESERT  && wTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x07; //south edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_DESERT && eTile.biomeType == BIOME_DESERT  && sTile.biomeType != BIOME_DESERT  && wTile.biomeType != BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x06; //south west edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_DESERT && eTile.biomeType == BIOME_DESERT  && sTile.biomeType == BIOME_DESERT  && wTile.biomeType != BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x09; //west edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_DESERT && eTile.biomeType == BIOME_DESERT  && sTile.biomeType == BIOME_DESERT  && wTile.biomeType != BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x03; //north west edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType != BIOME_DESERT && seTile.biomeType == BIOME_DESERT  && swTile.biomeType == BIOME_DESERT  && nwTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x0D; //north east inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType == BIOME_DESERT && seTile.biomeType != BIOME_DESERT  && swTile.biomeType == BIOME_DESERT  && nwTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x0B; //south east inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType == BIOME_DESERT && seTile.biomeType == BIOME_DESERT  && swTile.biomeType != BIOME_DESERT  && nwTile.biomeType == BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x0C; //south west inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType == BIOME_DESERT && seTile.biomeType == BIOME_DESERT  && swTile.biomeType == BIOME_DESERT  && nwTile.biomeType != BIOME_DESERT)
                    {
                        worldMapArray[y][x].tile = 0x0E; //north west inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                }
            }
        }
    }
}


function createMountains()
{
    for(var y = 3; y < WORLD_SIZE_MAX-3; ++y)
    {
        for(var x = 3; x < WORLD_SIZE_MAX-3; ++x)
        {
            if(worldMapArray[y][x].isStatic == false)
            {
                //only proceed if we are mountain
                if(worldMapArray[y][x].biomeType == BIOME_MOUNTAIN)
                {
                    //get ordinals and cardinal chunks
                    var surroundingTiles = getDirectionalTiles(x,y);
                    var nTile = surroundingTiles[0];
                    var neTile = surroundingTiles[1];
                    var eTile = surroundingTiles[2];
                    var seTile = surroundingTiles[3];
                    var sTile = surroundingTiles[4];
                    var swTile = surroundingTiles[5];
                    var wTile = surroundingTiles[6];
                    var nwTile = surroundingTiles[7];

                    //TODO : Add lava, volcano, and other variants

                    //we already removed desert and mountains from coastlines, so no need to worry about being next to water
                    //for deserts we check around the edges for non-desert tiles (and for mountains we do the same but for non-mountain tiles)
                    //if the edge tile is not desert then make this a desert edge tile (which all have grass) (again this is the same with mountains)
                    //mountains have a special case because like swamps they can be single tiles so we can not assume they are not single
                    if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType == BIOME_MOUNTAIN  && sTile.biomeType == BIOME_MOUNTAIN  && wTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x10; //north edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType == BIOME_MOUNTAIN  && wTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x11; //north east edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType == BIOME_MOUNTAIN  && wTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x12; //east edge 
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x20; //south east edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_MOUNTAIN && eTile.biomeType == BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x1F; //south edge - with lava variant(0xE7 and modifer 0x02)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_MOUNTAIN && eTile.biomeType == BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x1E; //south west edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_MOUNTAIN && eTile.biomeType == BIOME_MOUNTAIN  && sTile.biomeType == BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x21; //west edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType == BIOME_MOUNTAIN  && sTile.biomeType == BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x0F; //north west edge
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType != BIOME_MOUNTAIN && seTile.biomeType == BIOME_MOUNTAIN  && swTile.biomeType == BIOME_MOUNTAIN  && nwTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x22; //north east inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType == BIOME_MOUNTAIN && seTile.biomeType != BIOME_MOUNTAIN  && swTile.biomeType == BIOME_MOUNTAIN  && nwTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x13; //south east inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType == BIOME_MOUNTAIN && seTile.biomeType == BIOME_MOUNTAIN  && swTile.biomeType != BIOME_MOUNTAIN  && nwTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x14; //south west inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(neTile.biomeType == BIOME_MOUNTAIN && seTile.biomeType == BIOME_MOUNTAIN  && swTile.biomeType == BIOME_MOUNTAIN  && nwTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = 0x23; //north west inner corner
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = worldMapRandom.from([0x15,0x16]); //single rock variations (0xF4 02 is isolated with volcano)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = worldMapRandom.from([0x15,0x16]); //single rock variations (0xF4 02 is isolated with volcano)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType == BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = worldMapRandom.from([0x15,0x16]); //single rock variations (0xF4 02 is isolated with volcano)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType == BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = worldMapRandom.from([0x15,0x16]); //single rock variations (0xF4 02 is isolated with volcano)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = worldMapRandom.from([0x15,0x16]); //single rock variations (0xF4 02 is isolated with volcano)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType == BIOME_MOUNTAIN && eTile.biomeType != BIOME_MOUNTAIN  && sTile.biomeType == BIOME_MOUNTAIN  && wTile.biomeType != BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = worldMapRandom.from([0x15,0x16]); //single rock variations (0xF4 02 is isolated with volcano)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                    else if(nTile.biomeType != BIOME_MOUNTAIN && eTile.biomeType == BIOME_MOUNTAIN  && sTile.biomeType != BIOME_MOUNTAIN  && wTile.biomeType == BIOME_MOUNTAIN)
                    {
                        worldMapArray[y][x].tile = worldMapRandom.from([0x15,0x16]); //single rock variations (0xF4 02 is isolated with volcano)
                        worldMapArray[y][x].modifier = 0x01;
                    }
                }
            }
        }
    }
}

function getDirectionalTiles(x,y)
{
    var surroundingTiles = [];

    surroundingTiles[0] = worldMapArray[y-1][x];
    surroundingTiles[1] = worldMapArray[y-1][x+1];
    surroundingTiles[2] = worldMapArray[y][x+1];
    surroundingTiles[3] = worldMapArray[y+1][x+1];
    surroundingTiles[4] = worldMapArray[y+1][x];
    surroundingTiles[5] = worldMapArray[y+1][x-1];
    surroundingTiles[6] = worldMapArray[y][x-1];
    surroundingTiles[7] = worldMapArray[y-1][x-1];

    return surroundingTiles;
}

function getCardinalTiles(x,y)
{
    var surroundingTiles = [];

    surroundingTiles[0] = worldMapArray[y-1][x];
    surroundingTiles[1] = worldMapArray[y][x+1];
    surroundingTiles[2] = worldMapArray[y+1][x];
    surroundingTiles[3] = worldMapArray[y][x-1];

    return surroundingTiles;
}

function assignChunksToRom(rom)
{
    for(var y = 0; y < WORLD_SIZE_MAX; ++y)
    {
        for(var x = 0; x < WORLD_SIZE_MAX; ++x)
        {
            if(worldMapArray[y][x].isStatic == false)
            {
                rom[worldMapArray[y][x].chunkOffset] = worldMapArray[y][x].tile;
                rom[worldMapArray[y][x].chunkOffset+1] = worldMapArray[y][x].modifier;
            }
        }
    }
}

function checkIfChunkIsStatic(x,y)
{
    for(var i = 0; i < DATA_STATIC_RECTS.length; ++i)
    {
        isStatic = checkWorldAABBCollision(DATA_STATIC_RECTS[i],x,y);
        if(isStatic == true)
        {
            return true;
        }
    }

    return false;
}

function checkWorldAABBCollision(aabb,x,y)
{
    if(x>=aabb[0] && x<=aabb[1])
    {
        if(y>=aabb[2] && y<=aabb[3])
        {
            return true;
        }
    }
    return false;
}

function fillBottomBorder(rom)
{
    for(var i = 7; i < 122; ++i)
    {
        var chunkID = i*2;
        rom[0x87E00+chunkID] = 0x91;
        rom[0x87E00+chunkID+1] = 0x01;
    }

    for(var i = 0; i < 128; ++i)
    {
        var chunkID = i*2;
        rom[0x87F00+chunkID] = 0x88;
        rom[0x87F00+chunkID+1] = 0x01;
    }
}


//=================================================================================
//=================================================================================
//=================================================================================

Voronoi.prototype.Cell.prototype.biomeType = 0;
//0-null, 1-water, 2-grass, 3-shrub, 4-forest, 5-mountain, 6-swamp, 7-desert

var VoronoiMap = {
	voronoi: new Voronoi(),
	diagram: null,
	margin: 0.025,
	canvas: null,
	bbox: {xl:0,xr:1024,yt:0,yb:1024}, //bbox size needs to be 2x the canvas and lookup points size
    sites: [],
    treemap: null,
    relaxCount : 2,
    numberOfCells : 1000,
    cellsUsed: [],

	init: function() {
		this.canvas = document.getElementById('worldMapCanvas');
		this.randomSites(this.numberOfCells,true);
		},

	clearSites: function() {
		this.compute([]);
		},

	randomSites: function(n, clear) {
        var sites = [];
		if (!clear) {
			sites = this.sites.slice(0);
			}
		// create vertices
		var xmargin = this.canvas.width*this.margin,
			ymargin = this.canvas.height*this.margin,
			xo = xmargin,
			dx = this.canvas.width-xmargin*2,
			yo = ymargin,
			dy = this.canvas.height-ymargin*2;
		for (var i=0; i<n; i++) {
			sites.push({x:self.Math.round((xo+self.Math.random()*dx)*10)/10,y:self.Math.round((yo+self.Math.random()*dy)*10)/10});
			}
		this.compute(sites);
        // relax sites

        for( var relaxCounter = 0; relaxCounter < this.relaxCount; ++ relaxCounter)
        {
            var me = this;
            me.relaxSites();
        }
        this.colorCellsFromMapData();
		},

	relaxSites: function() {
		if (!this.diagram) {return;}
		var cells = this.diagram.cells,
			iCell = cells.length,
			cell,
			site, sites = [],
			again = false,
			rn, dist;
        var p = 1 / iCell * 0.1;
		while (iCell--) {
			cell = cells[iCell];
			rn = Math.random();
			// probability of apoptosis
			if (rn < p) {
				continue;
				}
			site = this.cellCentroid(cell);
			dist = this.distance(site, cell.site);
			again = again || dist > 1;
			// probability of mytosis
			if (rn > (1-p)) {
				dist /= 2;
				sites.push({
					x: site.x+(site.x-cell.site.x)/dist,
					y: site.y+(site.y-cell.site.y)/dist,
					});
				}
            sites.push(site);
            }
            this.relaxCounter += 1;
		this.compute(sites);
		},

	distance: function(a, b) {
		var dx = a.x-b.x,
			dy = a.y-b.y;
		return Math.sqrt(dx*dx+dy*dy);
		},

	cellArea: function(cell) {
		var area = 0,
			halfedges = cell.halfedges,
			iHalfedge = halfedges.length,
			halfedge,
			p1, p2;
		while (iHalfedge--) {
			halfedge = halfedges[iHalfedge];
			p1 = halfedge.getStartpoint();
			p2 = halfedge.getEndpoint();
			area += p1.x * p2.y;
			area -= p1.y * p2.x;
			}
		area /= 2;
		return area;
		},

	cellCentroid: function(cell) {
		var x = 0, y = 0,
			halfedges = cell.halfedges,
			iHalfedge = halfedges.length,
			halfedge,
			v, p1, p2;
		while (iHalfedge--) {
			halfedge = halfedges[iHalfedge];
			p1 = halfedge.getStartpoint();
			p2 = halfedge.getEndpoint();
			v = p1.x*p2.y - p2.x*p1.y;
			x += (p1.x+p2.x) * v;
			y += (p1.y+p2.y) * v;
			}
		v = this.cellArea(cell) * 6;
		return {x:x/v,y:y/v};
		},

	compute: function(sites) {
        this.treemap = null;
        this.sites = sites;
		this.voronoi.recycle(this.diagram);
        this.diagram = this.voronoi.compute(sites, this.bbox);
        //this.render();
		},

    buildTreemap: function() {
        var treemap = new QuadTree({
            x: this.bbox.xl,
            y: this.bbox.yt,
            width: this.bbox.xr-this.bbox.xl,
            height: this.bbox.yb-this.bbox.yt
            });
        var cells = this.diagram.cells,
            iCell = cells.length;
        while (iCell--) {
            bbox = cells[iCell].getBbox();
            bbox.cellid = iCell;
            treemap.insert(bbox);
            }
        return treemap;
        },

    chooseRandomCell: function()
    {
        var cellChosen = false;
        var chosenID = 0;
        var cellFree = true;
        var safetyCounter = 0;

        while(cellChosen == false)
        {
            chosenID = Math.floor(Math.random()*this.diagram.cells.length);
            cellFree = true;

            for(var i = 0; i < this.cellsUsed.length; ++i)
            {
                if(this.cellsUsed[i] == chosenID)
                {
                    cellFree = false;
                    break;
                }
            }
            if(cellFree == true)
            {
                cellChosen = true;
            }

            safetyCounter++;
            if(safetyCounter > 10)
            {
                cellChosen = true;
            }
        }
        return chosenID;
    },
    
    colorCellsFromMapData: function() 
    {
        if(worldMapArray.length > 0)
        {
            if (!this.diagram) {return;}
            var canvas = document.getElementById('worldMapCanvas');
            if (!canvas)
            {
                return;
            }
            
            //mark cells that are static first
            this.cellsUsed = [];
            for(var y = 0; y < WORLD_SIZE_MAX; ++y)
            {
                for(var x = 0; x < WORLD_SIZE_MAX; ++x)
                {
                    var isStatic = worldMapArray[y][x].isStatic;
                    var cellNum = this.cellIdFromPoint(x*4,y*4);

                    worldMapArray[y][x].cell = cellNum;

                    var cellFree = true;

                    for(var i = 0; i < this.cellsUsed.length; ++i)
                    {
                        if(cellNum == this.cellsUsed[i])
                        {
                            cellFree = false;
                            break;
                        }
                    }

                    if(cellFree == true)
                    {
                        if( isStatic == true )
                        {
                            this.renderCell(cellNum, '#2f2', '#2f2'); //static land
                            this.diagram.cells[cellNum].biomeType = 2;
                            this.cellsUsed.push(cellNum);
                        }
                    }
                }
            }

            //generate the non-static map
            //noise.seed(Math.random());
            noise.seed(worldMapRandom.seed);

            cells = this.diagram.cells;
            for(var i = 0; i < cells.length; ++i)
            {
                var cellFree = true;

                for(var j = 0; j < this.cellsUsed.length; ++j)
                {
                    if(i == this.cellsUsed[j])
                    {
                        cellFree = false;
                        break;
                    }
                }

                if(cellFree == true)
                {
                    var waterNoiseX = 0.0025 + worldMapRandom.nextFloat()*0.0005;
                    var waterNoiseY = 0.0025 + worldMapRandom.nextFloat()*0.0005;

                    var cellX = cells[i].site.x;
                    var cellY = cells[i].site.y;

                    var waterValue = 1;
                    if(cellX < 64 || cellX > 512-64 || cellY < 64 || cellY > 512-64)
                    {
                        waterValue = 1;
                    }
                    else
                    {
                        waterValue = noise.perlin2((128-cellX) * waterNoiseX, (128-cellY) * waterNoiseY)*4;
                        //waterValue = noise.perlin2(cellX * waterNoiseX, cellY * waterNoiseY)*4;
                    }

                    var landLevel = 1; //raise this for more land
                    if( Math.abs(waterValue) < landLevel) //we are on land (flip this check to a greater than check to get all land maps)
                    {
                        var heatValue = 1;
                        var heatNoiseX = 0.0025 + worldMapRandom.nextFloat()*0.0005;
                        var heatNoiseY = 0.0025 + worldMapRandom.nextFloat()*0.0005;

                        var humidityValue = 1;
                        var humidityNoiseX = 0.0025 + worldMapRandom.nextFloat()*0.0005;
                        var humidityNoiseY = 0.0025 + worldMapRandom.nextFloat()*0.0005;

                        //heatValue = noise.perlin2(cellX * heatNoiseX, cellY * heatNoiseY)*4;
                        //humidityValue = noise.perlin2(cellX * humidityNoiseX, cellY * humidityNoiseY)*4;

                        heatValue = noise.perlin2((128-cellX) * heatNoiseX, (128-cellY) * heatNoiseY)*4 + (0.1-(worldMapRandom.nextFloat()*0.2)); //add some turbulence to break pure lines
                        humidityValue = noise.perlin2((128-cellX) * humidityNoiseX, (128-cellY) * humidityNoiseY)*4 + (0.1-(worldMapRandom.nextFloat()*0.2)); //add some turbulence to break pure lines

                        //this.renderCell(i, '#0b0', '#0b0'); //land

                        //0-null, 1-water, 2-grass, 3-shrub, 4-forest, 5-mountain, 6-swamp, 7-desert
                        if( Math.abs(heatValue) > 0.75)
                        {
                            if( Math.abs(humidityValue) > 0.85)
                            {
                                this.renderCell(i, '#0bb', '#0bb'); //swamp
                                cells[i].biomeType = 6;
                            }
                            else if( Math.abs(humidityValue) > 0.65)
                            {
                                this.renderCell(i, '#0a0', '#0a0'); //shrubland
                                cells[i].biomeType = 3;
                            }
                            else
                            {
                                this.renderCell(i, '#6b0', '#6b0'); //grassland
                                cells[i].biomeType = 2;
                                //this.renderCell(i, '#b40', '#b40'); //desert
                            }
                        }
                        else
                        {
                            if( Math.abs(humidityValue) > 0.5)
                            {
                                this.renderCell(i, '#6b0', '#6b0'); //grassland
                                cells[i].biomeType = 2;
                            }
                            else if( Math.abs(humidityValue) > 0.4)
                            {
                                this.renderCell(i, '#0a0', '#0a0'); //shrubland
                                cells[i].biomeType = 3;
                            }
                            else if( Math.abs(humidityValue) > 0.15)
                            {
                                this.renderCell(i, '#082', '#082'); //forest
                                cells[i].biomeType = 4;
                            }
                            else
                            {
                                this.renderCell(i, '#888', '#888'); //mountain
                                cells[i].biomeType = 5;
                            }
                        }
                    }
                    else //we are in water
                    {
                        this.renderCell(i, '#00f', '#00f'); //water
                        cells[i].biomeType = 1;
                    }
                }
            }
            this.placeDesertFeature();
            this.assignChunksFromCellData();
        }
    },

    placeDesertFeature: function()
    {
        var x = 104;
        var y = 24;
        var cellNum = this.cellIdFromPoint(x*4,y*4);
        this.renderCell(cellNum, '#b40', '#b40');
        this.diagram.cells[cellNum].biomeType = 7;
        var neighbors = this.diagram.cells[cellNum].getNeighborIds();
        for(var i = 0; i < neighbors.length; ++i)
        {
            this.renderCell(neighbors[i], '#b40', '#b40');
            this.diagram.cells[neighbors[i]].biomeType = 7;
        }
    },

    assignChunksFromCellData: function()
    {
        for(var y = 0; y < WORLD_SIZE_MAX; ++y)
        {
            for(var x = 0; x < WORLD_SIZE_MAX; ++x)
            {
                if(worldMapArray[y][x].cell) //we have a cell
                {
                    //0-null, 1-water, 2-grass, 3-shrub, 4-forest, 5-mountain, 6-swamp, 7-desert
                    var biomeType = this.diagram.cells[worldMapArray[y][x].cell].biomeType;
                    worldMapArray[y][x].biomeType = biomeType;
                    switch(biomeType)
                    {
                        case 1: //water
                            worldMapArray[y][x].tile = 0x00;
                            worldMapArray[y][x].modifier = 0x00;
                            break;
                        case 2: //grass
                            worldMapArray[y][x].tile = 0xF3;
                            worldMapArray[y][x].modifier = 0x00;
                            break;
                        case 3: //shrub
                            worldMapArray[y][x].tile = 0xF4;
                            worldMapArray[y][x].modifier = 0x00;
                            break;
                        case 4: //forest
                            worldMapArray[y][x].tile = 0x51;
                            worldMapArray[y][x].modifier = 0x01;
                            break;
                        case 5: //mountain
                            worldMapArray[y][x].tile = 0x25;
                            worldMapArray[y][x].modifier = 0x01;
                            break;
                        case 6: //swamp
                            worldMapArray[y][x].tile = 0xF2;
                            worldMapArray[y][x].modifier = 0;
                            break;
                        case 7: //desert
                            worldMapArray[y][x].tile = 0xFE;
                            worldMapArray[y][x].modifier = 0x00;
                            break;
                        default: //null
                            worldMapArray[y][x].tile = 0x00;
                            worldMapArray[y][x].modifier = 0x00;
                            worldMapArray[y][x].biomeType = 0;
                            break;
                    }
                }
                else //no cell could be assigned
                {
                    worldMapArray[y][x].cell = 0;
                    worldMapArray[y][x].tile = 0x00;
                    worldMapArray[y][x].modifier = 0x00;
                    worldMapArray[y][x].biomeType = 0;
                }
            }
        }
    },

    cellIdFromPoint: function(x, y) {
        // We build the treemap on-demand
        if (this.treemap === null) {
            this.treemap = this.buildTreemap();
            }
        // Get the Voronoi cells from the tree map given x,y
        var items = this.treemap.retrieve({x:x,y:y}),
            iItem = items.length,
            cells = this.diagram.cells,
            cell, cellid;
        while (iItem--) {
            cellid = items[iItem].cellid;
            cell = cells[cellid];
            if (cell.pointIntersection(x,y) > 0) {
                return cellid;
                }
            }
        return undefined;
        },

    renderCell: function(id, fillStyle, strokeStyle) {
        if (id === undefined) {return;}
        if (!this.diagram) {return;}
        var cell = this.diagram.cells[id];
        if (!cell) {return;}
        var ctx = this.canvas.getContext('2d');
        ctx.globalAlpha = 1;

        // edges
        ctx.beginPath();
        var halfedges = cell.halfedges,
            nHalfedges = halfedges.length,
            v = halfedges[0].getStartpoint();
        ctx.moveTo(v.x,v.y);
        for (var iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
            v = halfedges[iHalfedge].getEndpoint();
            ctx.lineTo(v.x,v.y);
            }
        ctx.fillStyle = fillStyle;
        ctx.fill();

        ctx.strokeStyle = strokeStyle;
        ctx.stroke();

        // site
        //v = cell.site;
        //ctx.fillStyle = '#44f';
        //ctx.beginPath();
        //ctx.rect(v.x-2/3,v.y-2/3,2,2);
        //ctx.fill();
        },

	render: function() {
		var ctx = this.canvas.getContext('2d');
        // background
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.rect(0,0,this.canvas.width,this.canvas.height);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.strokeStyle = '#888';
		ctx.stroke();
		// voronoi
		if (!this.diagram) {return;}
        
        // edges
		ctx.beginPath();
		ctx.strokeStyle = '#000';
		var edges = this.diagram.edges,
			iEdge = edges.length,
			edge, v;
		while (iEdge--) {
			edge = edges[iEdge];
			v = edge.va;
			ctx.moveTo(v.x,v.y);
			v = edge.vb;
			ctx.lineTo(v.x,v.y);
			}
        ctx.stroke();
        
		// sites
		ctx.beginPath();
		ctx.fillStyle = '#44f';
		var sites = this.sites,
			iSite = sites.length;
		while (iSite--) {
			v = sites[iSite];
			ctx.rect(v.x-2/3,v.y-2/3,2,2);
			}
        ctx.fill();
        
		},
	};