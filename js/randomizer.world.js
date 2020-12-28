const WORLD_OFFSET = 0x80000;
const WORLD_OFFSET_MIN = 0x80200; //ignore the boundary chunks that start at 0x80000
const WORLD_OFFSET_MAX = 0x87DFF; //ignore the boundary chunks that end at 0x87FFF
const WORLD_BYTE_SIZE = 31744; //32768 total bytes if all boundary chunks were included;
const WORLD_TOTAL_CHUNKS_SIZE = 15872; //16384 total chunks if all boundary chunks were included;
const WORLD_SIZE_MIN = 2;
const WORLD_SIZE_MAX = 126;

const BUFFER_WEST = 4;
const BUFFER_EAST = 5;
const BUFFER_NORTH = 3;
const BUFFER_SOUTH = 4;

//chunk grid is 128x128

//TODO : define chunk rectangular regions that are untouchable (use AABB collision checks for fast generation)

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

function randomizeWorld(rom, random)
{
    fillBottomBorder(rom);

    var debugConsoleMap = "";

    for(var y = BUFFER_NORTH; y < 128-BUFFER_SOUTH; ++y)
    {
        var debugConsoleMapRow = "";

        for(var x = BUFFER_WEST; x < 128-BUFFER_EAST; ++x)
        {
            var chunkID = (y*256) + (x*2);
            var chunkOffset = WORLD_OFFSET + chunkID;
            var newChunkNum = 0;

            var isStatic = false;
            
            isStatic = checkIfChunkIsStatic(x,y);

            if(isStatic == false)
            {
                //newChunkNum = random.nextIntRange(0,255);
                //rom[chunkOffset] = newChunkNum;

                newChunkNum = 255;
                rom[chunkOffset] = newChunkNum;
                rom[chunkOffset+1] = 3;
            }
            var chunkString = ".";
            if(newChunkNum < 128)
                chunkString = "#";
            debugConsoleMapRow += chunkString;
        }
        debugConsoleMap += debugConsoleMapRow;
        //console.log(debugConsoleMapRow);
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