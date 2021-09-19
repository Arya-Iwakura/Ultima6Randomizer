const ITEM_MOONORB = 0x68;
const ITEM_SPELLBOOK = 0x34;
const ITEM_RUNE_COMPASSION = 0x81;
const ITEM_RUNE_HONESTY = 0x80;
const ITEM_RUNE_HONOR = 0x85;
const ITEM_RUNE_HUMILITY = 0x87;
const ITEM_RUNE_JUSTICE = 0x83;
const ITEM_RUNE_SACRIFICE = 0x84;
const ITEM_RUNE_SPIRITUALITY = 0x86;
const ITEM_RUNE_VALOR = 0x82;
const ITEM_BALLOON_PLANS = 0x8A;
const ITEM_BROKEN_LENS = 0x9B;
const ITEM_VORTEX_CUBE = 0x5E;
const ITEM_HUMAN_LENS = 0x9A;
const ITEM_GARGOYLE_LENS = 0x9C;
const ITEM_GARGISH_TEXT = 0xAD;
const ITEM_MOONSTONE_COMPASSION = 0x60;
const ITEM_MOONSTONE_HONESTY = 0x5F;
const ITEM_MOONSTONE_HONOR = 0x64;
const ITEM_MOONSTONE_HUMILITY = 0x66;
const ITEM_MOONSTONE_JUSTICE = 0x62;
const ITEM_MOONSTONE_SACRIFICE = 0x63;
const ITEM_MOONSTONE_SPIRITUALITY = 0x65;
const ITEM_MOONSTONE_VALOR = 0x61;

const ITEM_ODD_CHEESE = 0x57;

const ITEM_SHOVEL = 0x6E;

const ITEM_LEATHER_HELM = 0x01;
const ITEM_CHAIN_COIF = 0x02;
const ITEM_IRON_HELM = 0x03;
const ITEM_SPIKED_HELM = 0x04;
const ITEM_WINGED_HELM = 0x05;
const ITEM_BRASS_HELM = 0x06;
const ITEM_SPARTAN_HELM = 0x07;
const ITEM_MAGIC_HELM = 0x08;
const ITEM_MAGIC_SHIELD = 0x10;
const ITEM_GLASS_SWORD = 0x28;
const ITEM_ENERGY_WAND = 0x2D;
const ITEM_FIRE_WAND = 0x2E;
const ITEM_OIL = 0x2F;
const ITEM_RING_NORMAL = 0x30;
const ITEM_RING_PROT = 0x31;
const ITEM_RING_REGEN = 0x32;
const ITEM_RING_INVIS = 0x33;
const ITEM_GUILD_BELT = 0x35;
const ITEM_SWAMP_BOOTS = 0x38;

const ITEM_GRAPES = 0x3D;
const ITEM_BUTTER = 0x3E;
const ITEM_BREAD = 0x3F;
const ITEM_MUTTON = 0x40;
const ITEM_ROLLS = 0x41;
const ITEM_CAKE = 0x42;
const ITEM_CHEESE = 0x43;
const ITEM_HAM = 0x44;
const ITEM_KEY = 0x45;
const ITEM_CHOPS = 0x47;
const ITEM_BUCKET_MILK = 0x48;
const ITEM_JAR_HONEY = 0x49;
const ITEM_SPRINGWATER = 0x4A;
const ITEM_MILK = 0x4B;
const ITEM_JUICE = 0x4C;
const ITEM_SPIDERSILK = 0x53;
const ITEM_ARROW = 0x55;
const ITEM_BOLT = 0x56;
const ITEM_BOOK_BOARDGAMES = 0x5B;
const ITEM_BOOK_OZ = 0x5D;
const ITEM_GEMS = 0x67;
const ITEM_GOLD_NUGGET = 0x69;
const ITEM_TORCH = 0x6A;
const ITEM_SLEEPING_POWDER = 0x6B;
const ITEM_SEXTANT = 0x6D;
const ITEM_POWDER_KEG = 0x7C;
const ITEM_FISHING_ROD = 0x88;
const ITEM_FISH = 0x89;
const ITEM_POTION_RED = 0x8D;
const ITEM_POTION_YELLOW = 0x8F;
const ITEM_POTION_BLACK = 0x93;
const ITEM_MAP_1 = 0x9D;
const ITEM_MAP_2 = 0x9E;
const ITEM_MAP_3 = 0x9F;
const ITEM_MAP_4 = 0xA0;
const ITEM_MAP_5 = 0xA1;
const ITEM_MAP_6 = 0xA2;
const ITEM_MAP_7 = 0xA3;
const ITEM_MAP_8 = 0xA4;
const ITEM_MAP_9 = 0xA5;
const ITEM_DRAGON_EGG = 0xA6;
const ITEM_GOLD = 0xB3;
const ITEM_BOOK = 0xB7;
const ITEM_SPELL = 0xB8;
const ITEM_SCROLL = 0xB9;

const SPELL_UNLOCK = 0xCA; //CA B8 - unlock
const SPELL_DISPEL_FIELD = 0xCF; //CF B8 - dispel

const ITEM_KEY_N = 0x0D; //Key N - Stonegate Key
const ITEM_KEY_M = 0x0C; //Key M - Beyvin Key

//=========PROGRESSION ITEMS LIST
var PROGRESSION_CORE =
[
    ITEM_MOONSTONE_COMPASSION, ITEM_MOONSTONE_HONESTY, ITEM_MOONSTONE_HONOR, ITEM_MOONSTONE_HUMILITY, ITEM_MOONSTONE_JUSTICE, ITEM_MOONSTONE_SACRIFICE, ITEM_MOONSTONE_SPIRITUALITY, ITEM_MOONSTONE_VALOR,
    ITEM_BALLOON_PLANS, ITEM_BROKEN_LENS, ITEM_VORTEX_CUBE, ITEM_HUMAN_LENS, ITEM_GARGOYLE_LENS, ITEM_GARGISH_TEXT,
];

var PROGRESSION_OVERWORLD =
[
    ITEM_SHOVEL, ITEM_FISHING_ROD,
];

var PROGRESSION_TREASUREMAP =
[
    ITEM_GUILD_BELT, ITEM_MAP_1, ITEM_MAP_2, ITEM_MAP_3, ITEM_MAP_4, ITEM_MAP_5, ITEM_MAP_6, ITEM_MAP_7, ITEM_MAP_8, ITEM_DRAGON_EGG
];

var PROGRESSION_DIALOG =
[
    ITEM_BOOK_OZ, ITEM_BOOK_BOARDGAMES, ITEM_FISHING_ROD, ITEM_KEY_N, ITEM_KEY_M
];

var PROGRESSION_SHRINES =
[
    ITEM_RUNE_COMPASSION, ITEM_RUNE_HONESTY, ITEM_RUNE_HONOR, ITEM_RUNE_HUMILITY, ITEM_RUNE_JUSTICE, ITEM_RUNE_SACRIFICE, ITEM_RUNE_SPIRITUALITY, ITEM_RUNE_VALOR,
];

var PROGRESSION_SPELLBOOK =
[
    ITEM_SPELLBOOK,
];

var PROGRESSION_MOONORB =
[
    ITEM_MOONORB,
];

var PROGRESSION_ODD_CHEESE =
[
    ITEM_ODD_CHEESE,
];

var PROGRESSION_SPELLS =
[
    SPELL_UNLOCK, SPELL_DISPEL_FIELD,
];

//name is the unique identifier for each of this and must be unique
//offest is the ROM address for the data or is 0x01, 0x02, 0x03... for all dialog items or other items that need LZW decompression or otherwise custom references
//flags are [stolen, not stolen, quantity] and for shrine items(moonstones) are "on shrine / not on shrine". These apply to the item, and if the item is not marked as stolen, it will override the location flags
//flags for spells are C0 +  the spell hex value and the quantity is the spell hex value
//item is [long name, short name] which is used for text box updates requiring different name lengths (short has a max of 15 characters)
//id is hex value of item in ROM
//name is simply a unique code identifier and is not seen by the player
//location is a descriptor of the location used in the spoiler log
//type is main, solo, stack, spell
//stolen defines if this location is considered a stolen location or not
//hints define the hint descriptors assigned to this location
//location set defines the location set that this should belong to in the spoiler log
//progression flags defines the game-mode progression sets this should belong to (0 - none, 1 - key item, 2 - default mode, 4 - open mode)
//restrictions limit what items can be placed in this location
//requirements list what items are required to access the location

//========= WORLD ITEM LOCATIONS
var DATA_WORLD_LOCATIONS =
[
	//MOON ORB
    {
        location_set:"Starting Inventory",
        location:"Slot #1",
        name: "moonorb", item_name: ["Moon Orb","Moon Orb"], id: [ITEM_MOONORB],
        offset: 0x0F91D, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
		requires:[], addedRequires:[],
        type:"main", stolen:"no", hints:[], progression_flags:0x06,
        location_types:["playerinventory_slot1"]
    },
    {   //used for the moonorb removed option
        location_set:"Starting Inventory",
        location: "Slot #1",
        name: "sextant", item_name: ["Sextant", "Sextant"], id: [ITEM_SEXTANT],
        offset: 0x0F91D, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
        requires:[], addedRequires:[],
        type:"solo", stolen:"no", hints:[], progression_flags:0x06,
        location_types:["playerinventory_slot1_no_moonorb"]
    },

    //SPELLBOOK
	{
        location_set:"Starting Inventory",
        location: "Slot #2",
        name: "spellbook", item_name: ["Spellbook","Spellbook"], id: [ITEM_SPELLBOOK],
        offset: 0x0F923, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
		requires:[], addedRequires:[],
        type:"main", stolen:"no", hints:[], progression_flags:0x07,
        location_types:["playerinventory_slot2"]
    },

    //---------OVERWORLD
	//standard chests
	{  
        location_set:"Overworld",
        location: "Fighter House Chest",
        name: "house-fighter-01", item_name: ["Powder Keg","Powder Keg"], id: [0x7C],
        offset: 0x115F0, flags: [0x80, 0xC0, 0x01],
        restrictions: [], requires:[],
        type:"solo", stolen : "yes", hints:[16,42], progression_flags:0,
        location_types:["overworld"]
    },
	{
        location_set:"Empath Abbey",
        location: "Iolo's Hut Chest",
        name: "house-iolo-01", item_name: ["Bolt","Bolt"], id: [0x56],
        offset: 0x10EF1, flags: [0x98, 0xD8, 0x18],
        restrictions: [], requires:[],
        type:"stack", stolen : "no", hints:[16,42], progression_flags:0,
        location_types:["overworld"]
    },
	{
        location_set:"Overworld",
        location: "Sin'Vraal's House Chest",
        name: "house-sinvraal-01", item_name: ["Oil","Oil"], id: [ITEM_OIL],
        offset: 0x115E1, flags: [0x86, 0xC6, 0x06],
        restrictions: [], requires:[],
        type:"stack", stolen : "yes", hints:[15,16,42], progression_flags:0,
        location_types:["overworld"]
    },
	{
        location_set:"Overworld",
        location: "Shipwreck",
        name: "overworld-shipwreck-01", item_name: ["Map Piece 8","Map Piece 8"], id: [0xA4],
        offset: 0x11E41, flags: [0xC0, 0xC0, 0x01], 
        restrictions: [], requires:[],
        type:"solo", stolen : "no", hints:[4,22,25,29,40], progression_flags:0x01,
        location_types:["overworld"]
    },
	{
        location_set:"Dagger Island",
        location: "Bonn's Basement Unlocked Chest",
        name: "daggerisland-basement-01", item_name: ["Map Piece 4","Map Piece 4"], id: [0xA0],
        offset: 0x116E6, flags: [0xC0, 0xC0, 0x01],
        restrictions: [], requires:[],
        type:"solo", stolen:"yes", hints:[2,16,22,29,36,42], progression_flags:0x01,
        location_types:["overworld"]
    }, //added an item as it was empty
    {
        location_set:"Overworld",
        location: "Dig Spot",
        name: "overworld-digspot-01", item_name: ["Sextant","Sextant"], id: [ITEM_SEXTANT],
        offset: 0x11, flags: [0xC0, 0xC0, 0x01], 
        restrictions: [ITEM_SHOVEL,ITEM_SEXTANT,ITEM_GOLD], requires:[ITEM_SHOVEL],
        type:"solo", stolen : "no", hints:[4,43], progression_flags:0x00,
        location_types:["overworld"]
    },
    {
        location_set:"Overworld",
        location: "Fishing Spot",
        name: "overworld-fishingspot-01", item_name: ["Swamp Boots","Swamp Boots"], id: [ITEM_SWAMP_BOOTS],
        offset: 0x12, flags: [0x80, 0xC0, 0x01], 
        restrictions: [ITEM_FISHING_ROD,ITEM_FISH,ITEM_GOLD], requires:[ITEM_FISHING_ROD],
        type:"solo", stolen : "no", hints:[4,43], progression_flags:0x00,
        location_types:["overworld"]
    },

	//magic chests
	{
        location_set:"Deep Forest",
        location: "Nicodemus Secret Chest #1",
        name: "nicodemus-house-01", item_name: ["Staff","Staff"], id: [0x2C],
        offset: 0x115B7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"solo", stolen : "yes", hints:[23,24,35,42], progression_flags:0,
        location_types:["overworld"]
    },
	{
        location_set:"Deep Forest",
        location: "Nicodemus Secret Chest #2",
        name: "nicodemus-house-02", item_name: ["Gold Nuggets","Gold Nuggets"], id: [0x69],
        offset: 0x115BB, flags: [0x85, 0xC5, 0x05],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"stack", stolen : "yes", hints:[23,24,35,42], progression_flags:0,
        location_types:["overworld"]
    },
	{
        location_set:"Dagger Island",
        location: "Bonn's Basement Locked Chest #1",
        name: "daggerisland-basement-02", item_name: ["Glass Sword","Glass Sword"], id: [ITEM_GLASS_SWORD],
        offset: 0x116C2, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"solo", stolen : "yes", hints:[2,16,22,29,36,42], progression_flags:0x00,
        location_types:["overworld"]
    },
	{
        location_set:"Dagger Island",
        location: "Bonn's Basement Locked Chest #2", 
        name: "daggerisland-basement-03", item_name: ["Shovel","Shovel"], id: [ITEM_SHOVEL],
        offset: 0x116C6, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"solo", stolen : "yes", hints:[2,16,22,29,36,42], progression_flags:0x01,
        location_types:["overworld"]
    },

    //---------TOWNS
	//standard chests
	{   
        location_set:"Trinsic",
        location: "Town Center Chest",
        name: "rune-honor", item_name: ["Rune of Honor","R. Honor"], id: [ITEM_RUNE_HONOR],
        offset: 0x11E23, flags: [0xC0, 0xC0, 0x01], 
        restrictions: [],
		requires:[], 
        type:"main", stolen:"no", hints:[4,8,18], progression_flags:0x01,
        location_types:["towns", "towns_virtue"]
    },
	{   
        location_set:"Yew",
        location: "Tavern Potted Plant",
        name: "rune-justice", item_name: ["Rune of Justice","R. Justice"], id: [ITEM_RUNE_JUSTICE],
        offset: 0x10E56, flags: [0xC0, 0xC0, 0x01], 
        restrictions: [],
		requires:[],
        type:"main", stolen:"no", hints:[10,20], progression_flags:0x01,
        location_types:["towns", "towns_virtue"]
    },
	{   
        location_set:"Skara Brae",
        location: "North House Chest",
        name: "rune-spirituality", item_name: ["Rune of Spirituality","R. Spirituality"], id: [ITEM_RUNE_SPIRITUALITY],
        offset: 0x10F14, flags: [0xC0, 0xC0, 0x01],
        restrictions: [],
		requires:[], 
        type:"main", stolen:"no", hints:[12,16], progression_flags:0x01,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Britain",
        location: "Farm House Chest",
        name: "britain-farmhouse-01", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x10FA6, flags: [0x8B, 0xCB, 0x0B], 
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"stack", stolen : "yes", hints:[5,6,16], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Britain",
        location: "Inn Chest",
        name: "britain-inn-01", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x110BE, flags: [0x8D, 0xCD, 0x0D],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[5,6,20], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Britain",
        location: "Bard House Chest #1",
        name: "britain-bardhouse-01", item_name: ["Blue Potion","Blue Potion"], id: [0x8E],
        offset: 0x10FF6, flags: [0x83, 0xC3, 0x03],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[5,6,16], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Britain",
        location: "Bard House Chest #2",
        name: "britain-bardhouse-02", item_name: ["Lute","Lute"], id: [0x76],
        offset: 0x10FFA, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], 
        type:"solo", stolen : "yes", hints:[5,6,16], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Britain",
        location: "Provisions Shop Chest",
        name: "britain-guild-01", item_name: ["Cheese","Cheese"], id: [ITEM_CHEESE],
        offset: 0x1164B, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[5,6,16,28], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    }, //added an item as it was empty
	{
        location_set:"Jhelom",
        location: "East House Chest",
        name: "jhelom-easthouse-01", item_name: ["Powder Keg","Powder Keg"], id: [0x7C],
        offset: 0x10F6F, flags: [0x82, 0xC2, 0x02],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[13,16,25], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Minoc",
        location: "Basket Weaver Chest",
        name: "minoc-basketweaver-01", item_name: ["Torches","Torches"], id: [0x6A],
        offset: 0x11100, flags: [0x8A, 0xCA, 0x0A],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[11,16], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Minoc",
        location: "Gem Cutter Chest",
        name: "minoc-gemcutter-01", item_name: ["Gems","Gems"], id: [0x67],
        offset: 0x11110, flags: [0x83, 0xC3, 0x03],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[11,16], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Trinsic",
        location: "Mayor House Chest",
        name: "trinsic-mayorhouse-01", item_name: ["Dagger","Dagger"], id: [0x1E],
        offset: 0x1122A, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], 
        type:"solo", stolen : "yes", hints:[8,16,22,26], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Trinsic",
        location: "South House Chest",
        name: "trinsic-southhouse-01", item_name: ["Gold Nuggets","Gold Nuggets"], id: [0x69],
        offset: 0x1129E, flags: [0x83, 0xC3, 0x03],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[8,16], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	
	//magic chests
	{
        location_set:"Britain",
        location: "Bank Chest #1",
        name: "britain-bank-01", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x110A2, flags: [0x8E, 0xCE, 0x0E],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"stack", stolen : "yes", hints:[5,6,26], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Britain",
        location: "Bank Chest #2",
        name: "britain-bank-02", item_name: ["Gold Nuggets","Gold Nuggets"], id: [0x69],
        offset: 0x110A6, flags: [0x88, 0xC8, 0x08],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"stack", stolen : "yes", hints:[5,6,26], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Britain",
        location: "Bank Chest #3",
        name: "britain-bank-03", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x110AA, flags: [0x91, 0xD1, 0x11],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK], 
        type:"stack", stolen : "yes", hints:[5,6,26], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Jhelom",
        location: "West House Chest",
        name: "jhelom-westhouse-03", item_name: ["Spring Water","Spring Water"], id: [0x4A],
        offset: 0x10F73, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK], 
        type:"solo", stolen : "yes", hints:[13,16,25], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    }, //added an item to move the key down a slot
	{
        location_set:"Minoc",
        location: "Town Hall Chest",
        name: "minoc-townhall-01", item_name: ["Gems","Gems"], id: [0x67],
        offset: 0x11120, flags: [0x8F, 0xCF, 0x0F],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"stack", stolen : "yes", hints:[11,21], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Moonglow / Lycaeum",
        location: "Music Hall Chest",
        name: "moonglow-musichall-01", item_name: ["Black Potion","Black Potion"], id: [ITEM_POTION_BLACK],
        offset: 0x11551, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"solo", stolen : "yes", hints:[7,23,25], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    },
	{
        location_set:"Moonglow / Lycaeum",
        location: "House of Penumbra", 
        name: "moonglow-penumbra-01", item_name: ["Sleeping Powder","Sleeping Powder"], id: [0x6B],
        offset: 0x1151D, flags: [0x83, 0xC3, 0x03],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"stack", stolen : "yes", hints:[7,21,24,25,35], progression_flags:0,
        location_types:["towns", "towns_virtue"]
    }, //we changed this to the first item

	//magic spell chests
	
    //DISPEL FIELD SPELL CHESTS
	{ //xiao shop chest with dispel field item - added an item as it was empty
        location_set:"Moonglow / Lycaeum",
        location: "Xiao Shop Chest",
        name: "moonglow-xiao-01", item_name: ["Spell of Dispel Field","Dispel Field"],
        id: [ITEM_SPELL],
        offset: 0x1146A, flags: [0xCF, 0xCF, 0x0F],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"spell", stolen : "no", hints:[16,25,28,35], progression_flags:0x01,
        location_types:["towns_unlockdispel", "towns_virtue_unlockdispel"]
    },
    { //xiao shop chest with black potion - added an item as it was empty
        location_set:"Moonglow / Lycaeum",
        location: "Xiao Shop Chest",
        name: "moonglow-xiao-01", item_name: ["Black Potion","Black Potion"],
        id: [ITEM_POTION_BLACK],
        offset: 0x1146A, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[16,25,28,35], progression_flags:0,
        location_types:["towns_no_unlockdispel", "towns_virtue_no_unlockdispel"]
    },
    
    //UNLOCK SPELL CHESTS
	{ //horance shop chest with unlock spell
        location_set:"Skara Brae",
        location: "Horance Shop Chest",
        name: "skarabrae-horance-01", item_name: ["Spell of Unlock","Unlock"],
        id: [ITEM_SPELL],
        offset: 0x10F04, flags: [0xCA, 0xCA, 0x0A],
        restrictions: [],
        requires:[],
        type:"spell", stolen : "no", hints:[12,16,25,29,35], progression_flags:0x01,
        location_types:["towns_unlockdispel", "towns_virtue_unlockdispel"]
    },
    { //horance shop chest with red potion
        location_set:"Skara Brae",
        location: "Horance Shop Chest",
        name: "skarabrae-horance-01", item_name: ["Red Potion","Red Potion"],
        id: [ITEM_POTION_RED],
        offset: 0x10F04, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[12,16,25,29,35], progression_flags:0,
        location_types:["towns_no_unlockdispel", "towns_virtue_no_unlockdispel"]
    },

     //ODD CHEESE Chest
	{ //sherry odd cheese chest with odd cheese
        location_set:"Skara Brae",
        location: "Wine Cellar Chest",
        name: "skarabrae-winecellar-01", item_name: ["Odd Cheese","Odd Cheese"],
        id: [ITEM_ODD_CHEESE],
        offset: 0x117CA, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"main", stolen : "no", hints:[2,12,26,36,40], progression_flags:0x01,
        location_types:["towns_oddcheese", "towns_virtue_oddcheese"]
    },
    {   
        location_set:"Jhelom",
        location: "Tavern Mouse Hole Chest",
        name: "rune-valor", item_name: ["Rune of Valor","R. Valor"], id: [ITEM_RUNE_VALOR],
        offset: 0x10F4F, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPELLBOOK, ITEM_SPIDERSILK, ITEM_SLEEPING_POWDER, ITEM_POWDER_KEG, ITEM_ENERGY_WAND, ITEM_SPELL, ITEM_ODD_CHEESE, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_DRAGON_EGG],
		requires:[ITEM_ODD_CHEESE],
        type:"main", stolen:"no", hints:[13,20,25], progression_flags:0x01,
        location_types:["towns_oddcheese", "towns_virtue_oddcheese"]
    },
	{ //sherry odd cheese chest with regular cheese
        location_set:"Skara Brae",
        location: "Wine Cellar Chest",
        name: "skarabrae-winecellar-01", item_name: ["Cheese","Cheese"],
        id: [ITEM_CHEESE],
        offset: 0x117CA, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"solo", stolen : "yes", hints:[2,12,26,36,40], progression_flags:0,
        location_types:["towns_no_oddcheese", "towns_virtue_no_oddcheese"]
    },
    {   
        location_set:"Jhelom",
        location: "Tavern Mouse Hole Chest",
        name: "rune-valor", item_name: ["Rune of Valor","R. Valor"], id: [ITEM_RUNE_VALOR],
        offset: 0x10F4F, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPELLBOOK, ITEM_SPIDERSILK, ITEM_SLEEPING_POWDER, ITEM_POWDER_KEG, ITEM_ENERGY_WAND, ITEM_SPELL, ITEM_ODD_CHEESE, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_DRAGON_EGG],
		requires:[],
        type:"main", stolen:"no", hints:[13,20,25], progression_flags:0x01,
        location_types:["towns_no_oddcheese", "towns_virtue_no_oddcheese"]
    },


    //---------TOWNS - NON VIRTUE
	//standard chests
	{
        location_set:"Buccaneer's Den",
        location: "South West House Chest",
        name: "bucsden-bottomlefthouse-01", item_name: ["Gold","Gold"],
        id: [0xB3], 
        offset: 0x11400, flags: [0xBC, 0xFC, 0x3C],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[16,22,25,29], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    }, //we changed this to the first item
	{
        location_set:"Buccaneer's Den",
        location: "Budo Secret House Chest",
        name: "bucsden-budo-01", item_name: ["Ring of Invisibility","Invis Ring"], id: [ITEM_RING_INVIS],
        offset: 0x113B8, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[16,22,23,25,29], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    },
	{
        location_set:"Cove",
        location: "Rudyom Shop Secret Chest", 
        name: "cove-rudyom-01", item_name: ["Red Potion","Red Potion"], id: [ITEM_POTION_RED],
        offset: 0x110CD, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[6,14,16,23,35], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    },
	{
        location_set:"Cove",
        location: "Town Center Pedestal Chest",
        name: "cove-pedestal-01", item_name: ["Grapes","Grapes"],
        id: [0x3D],
        offset: 0x11E19, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[4,6,14,18], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    },
	{
        location_set:"Paws",
        location: "House of Arbeth Chest #1",
        name: "paws-spinner-01", item_name: ["Spidersilk","Spidersilk"], id: [0x53],
        offset: 0x111A7, flags: [0x8A, 0xCA, 0x0A],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[14], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    }, //added an item as it was empty
	{
        location_set:"Paws",
        location: "House of Arbeth Chest #2",
        name: "paws-spinner-02", item_name: ["Gold","Gold"], id: [0xB3], 
        offset: 0x111BF, flags: [0x8A, 0xCA, 0x0A],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[14], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    }, //added an item as it was empty
	{
        location_set:"Paws",
        location: "Tavern House Chest", 
        name: "paws-upperrighthouse-01", item_name: ["Mutton","Mutton"], id: [0x40],
        offset: 0x11193, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[14,16], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    }, //added an item as it was empty
	{
        location_set:"Serpent's Hold",
        location: "South House Chest", 
        name: "serpentshold-southhouse-01", item_name: ["Grapes","Grapes"], id: [0x3D],
        offset: 0x113A5, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[5,16,25,29], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    }, //added an item to move the key down a slot
	{
        location_set:"Serpent's Hold",
        location: "West House Chest",
        name: "serpentshold-upperlefthouse-01", item_name: ["Curved Heater","Curved Heater"], id: [0x0A], 
        offset: 0x11331, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "yes", hints:[5,16,25,29], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    }, //we changed this to the first item

	//magic chests
	{
        location_set:"Empath Abbey",
        location: "North House Chest",
        name: "empathabbey-northhouse-01", item_name: ["Green Potion","Green Potion"], id: [0x90],
        offset: 0x10EA5, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK], 
        type:"stack", stolen : "yes", hints:[5,16,40], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    },
	{
        location_set:"Serpent's Hold",
        location: "West Barracks Secret Chest",
        name: "serpentshold-guardhouse-01", item_name: ["3x Crossbow","3x Crossbow"], id: [0x2A], 
        offset: 0x1132D, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"solo", stolen : "yes", hints:[5,23,25,29], progression_flags:0,
        location_types:["towns", "towns_nonvirtue"]
    },

    //--------- CASTLES
	//standard chests
	{   
        location_set:"Sutek's Castle",
        location: "Body on Lowest Floor",
        name: "balloon-plans", item_name: ["Balloon Plans","Balloon Plans"], id: [ITEM_BALLOON_PLANS],
        offset: 0x11D57, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"main", stolen:"no", hints:[5,21,23,24,26,28,29,35,39,41,42], progression_flags:0x04,
        location_types:["castles"]
    }, //we changed this to the first item
	{   
        location_set:"Stonegate",
        location: "Bottom Floor Chest", 
        name: "vortexcube", item_name: ["Vortex Cube","Vortex Cube"], id: [ITEM_VORTEX_CUBE],
        offset: 0x11C37, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        type:"main", stolen:"no", hints:[2,5,18,23,24,26,28,29,39,41,42], progression_flags:0x06,
        location_types:["castles"]
    },
	{
        location_set:"Castle Britannia",
        location: "Avatar Room Chest",
        name: "castle-avatar-01", item_name: ["Red Potion","Red Potion"], id: [ITEM_POTION_RED],
        offset: 0x11032, flags: [0x83, 0xC3, 0x03],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "no", hints:[5,41], progression_flags:0,
        location_types:["castles"]
    }, //we changed this to the first item
	{
        location_set:"Castle Britannia",
        location: "Lord British Room Chest", 
        name: "castle-lordbritish-01", item_name: ["Main Gauche","Main Gauche"],  id: [0x1B], 
        offset: 0x10FBA, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[5,41], progression_flags:0,
        location_types:["castles"]
    },
	{
        location_set:"Castle Britannia",
        location: "Nystful Room Chest",
        name: "castle-nystful-01", item_name: ["Energy Wand","Energy Wand"], id: [0x2D],
        offset: 0x11062, flags: [0x83, 0xC3, 0x03],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "no", hints:[5,41], progression_flags:0,
        location_types:["castles"]
    }, //we changed this to the first item
	{
        location_set:"Serpent's Hold",
        location: "Castle Bedroom Chest", 
        name: "serpentshold-castle-01", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x1130D, flags: [0x8C, 0xCC, 0x0C],
        restrictions: [],
        requires:[],
        type:"stack", stolen : "yes", hints:[5,25,29,41], progression_flags:0,
        location_types:["castles"]
    }, //we changed this to the first item
	{
        location_set:"Stonegate",
        location: "Entrance Floor Chest",
        name: "stonegate-upperfloor-01", item_name: ["Fishing Rod","Fishing Rod"], id: [ITEM_FISHING_ROD],
        offset: 0x110C9, flags: [0xC0, 0xC0, 0x01],
        restrictions: [],
        requires:[], 
        type:"solo", stolen : "no", hints:[5,29,41,42], progression_flags:0x01,
        location_types:["castles"]
    },
	{
        location_set:"Moonglow / Lycaeum",
        location: "Library F1 East Chest", 
        name: "lycaeum-boardgamespot-01", item_name: ["Book of Boardgames","Boardgames Book"], id: [ITEM_BOOK_BOARDGAMES],
        offset: 0x1175E, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        type:"main", stolen : "no", hints:[2,5,18,24,35,36,41], progression_flags:0x01,
        location_types:["castles"]
    },
	{
        location_set:"Moonglow / Lycaeum",
        location: "Library F1 North East Chest", 
        name: "lycaeum-ozspot-01", item_name: ["Book of Oz","Book of Oz"], id: [ITEM_BOOK_OZ],
        offset: 0x1174E, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        type:"main", stolen : "no", hints:[2,5,18,24,35,36,41], progression_flags:0x01,
        location_types:["castles"]
    },
	{
        location_set:"Britain Sewers / Buccaneer's Cave",
        location: "F1 Daros Room Chest",
        name: "britain-sewers-F1-01", item_name: ["Yellow Potion","Yellow Potion"], id: [ITEM_POTION_YELLOW],
        offset: 0x1172E, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[2,5,31,38,41], progression_flags:0,
        location_types:["castles"]
    },

    {   
        location_set:"Moonglow / Lycaeum",
        location: "Library Entrance Switch Chest",
        name: "lycaeum-f0-01", item_name: ["Red Potion","Red Potion"], id: [ITEM_POTION_YELLOW],
        offset: 0x1150A, flags: [0xC0, 0xC0, 0x01],
        restrictions: [],
		requires:[],
        type:"solo", stolen:"no", hints:[5,7,25,28,35,41], progression_flags:0,
        location_types:["castles"]
    },

    {   
        location_set:"Sutek's Castle",
        location: "F1 Switch Chest",
        name: "sutek-f1-01", item_name: ["Red Potion","Red Potion"], id: [ITEM_POTION_RED],
        offset: 0x11806, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"solo", stolen:"no", hints:[5,21,23,24,26,28,29,35,36,41,42], progression_flags:0,
        location_types:["castles"]
    },

    //magic chests
    {   
        location_set:"Empath Abbey",
        location: "Castle Chest", 
        name: "empathabbey-castle-01", item_name: ["Yellow Potion","Yellow Potion"], id: [ITEM_POTION_YELLOW],
        offset: 0x10EFD, flags: [0x83, 0xC3, 0x03],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK],
        type:"stack", stolen:"yes", hints:[5,21,40,41], progression_flags:0,
        location_types:["castles"]
    },

    //--------- DIALOG
	{   
        location_set:"Britain",
        location: "Pocket of Ariana",
        name: "rune-compassion", item_name: ["Rune of Compassion","R. Compassion"], id: [ITEM_RUNE_COMPASSION],
        offset: 0x01, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPELLBOOK, ITEM_MOONORB, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[],
        type:"main", stolen:"no", hints:[5,6,19], progression_flags:0x01,
        location_types:["dialog"]
    },
	{   
        location_set:"New Magincia",
        location: "Pocket of Antonio",
        name: "rune-humility", item_name: ["Rune of Humility","R. Humility"], id: [ITEM_RUNE_HUMILITY],
        offset: 0x02, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[],
        type:"main", stolen:"no", hints:[9,19,25], progression_flags:0x01,
        location_types:["dialog"]
    },
	{   
        location_set:"Minoc",
        location: "Pocket of Selganor",
        name: "rune-sacrifice", item_name: ["Rune of Sacrifice","R. Sacrifice"], id: [ITEM_RUNE_SACRIFICE],
        offset: 0x03, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[],
        type:"main", stolen:"no", hints:[11,19], progression_flags:0x01,
        location_types:["dialog"]
    },
	{   
        location_set:"Hythloth",
        location: "Pocket of Captain John",
        name: "pocket-captainjohn", item_name: ["Gargish Text","Gargish Text"],id: [ITEM_GARGISH_TEXT],
        offset: 0x0B, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[],
        type:"main", stolen:"no", hints:[19,29,30,33,39], progression_flags:0x01,
        location_types:["dialog"]
    },
	{   
        location_set:"Gargoyle City",
        location: "Pocket of the Gargoyle Lenscrafter",
        name: "pocket-lensmaker", item_name: ["Gargoyle Lens","Gargoyle Lens"], id: [ITEM_GARGOYLE_LENS],
        offset: 0x0C, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GARGISH_TEXT, ITEM_BROKEN_LENS, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[ITEM_GARGISH_TEXT, ITEM_BROKEN_LENS],
        type:"main", stolen:"no", hints:[15,16,19], progression_flags:0x07,
        location_types:["dialog"]
    },
	{   
        location_set:"Moonglow / Lycaeum",
        location: "Pocket of Ephemerides",
        name: "pocket-ephemerides", item_name: ["Human Lens","Human Lens"], id: [ITEM_HUMAN_LENS],
        offset: 0x0D, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GARGISH_TEXT, ITEM_GARGOYLE_LENS, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_GLASS_SWORD],
		requires:[ITEM_GARGISH_TEXT, ITEM_GARGOYLE_LENS],
        type:"main", stolen:"no", hints:[16,19,25], progression_flags:0x06,
        location_types:["dialog"]
    }, 
	{
        location_set:"Castle Britannia",
        location: "Pocket of Lord British",
        name: "pocket-lord-british", item_name: ["Snake Amulet","Snake Amulet"], id: [0x3B],
        offset: 0x04, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_SPELL, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_BOOK_OZ],
		requires:[ITEM_BOOK_OZ],
        type:"solo", stolen:"no", hints:[5,19], progression_flags:0,
        location_types:["dialog"]
    },
    {
        location_set:"Paws",
        location: "Pocket of Dr. Cat",
        name: "pocket-dr-cat", item_name: ["Mutton","Mutton"], id: [ITEM_MUTTON],
        offset: 0x0E, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_BOOK_BOARDGAMES],
		requires:[ITEM_BOOK_BOARDGAMES],
        type:"solo", stolen:"no", hints:[14,19,20], progression_flags:0,
        location_types:["dialog"]
    },
    {
        location_set:"Stonegate",
        location: "Pocket of Papa", //cyclops
        name: "pocket-papa", item_name: ["KeyN","KeyN"], id: [ITEM_KEY],
        offset: 0x0F, flags: [ITEM_KEY_N, ITEM_KEY_N, 0x0D],
        restrictions: [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_SPELL, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_BOOK, ITEM_FISHING_ROD],
		requires:[ITEM_FISHING_ROD],
        type:"solo", stolen:"no", hints:[5,4,19,29,42,43], progression_flags:0,
        location_types:["dialog"]
    },
    {
        location_set:"Moonglow / Lycaeum",
        location: "Pocket of Manrel", 
        name: "moonglow-manrel-01", item_name: ["KeyM","KeyM"], id: [ITEM_KEY],
        offset: 0x10, flags: [ITEM_KEY_M, ITEM_KEY_M, 0x0C],
        restrictions: [ITEM_SPELLBOOK, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_SPELL, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_BOOK],
        requires:[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        type:"solo", stolen : "no", hints:[7,19,24,25], progression_flags:0,
        location_types:["dialog"]
    }, 

    //--------- TREASURE MAP
	//dialog items
	{   
        location_set:"Britain Sewers / Buccaneer's Cave",
        location: "Pocket of Phoenix", 
        name: "pocket-phoenix", item_name: ["Guild Belt","Guild Belt"], id: [ITEM_GUILD_BELT],
        offset: 0x05, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, SPELL_DISPEL_FIELD],
		requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"main", stolen:"no", hints:[3,19,22,24,31,32,38,41], progression_flags:0x01,
        location_types:["treasuremap"]
    },
	{
        location_set:"Shame",
        location: "Pocket of Ybarra",
        name: "pocket-ybarra", item_name: ["Map Piece 5","Map Piece 5"], id: [0xA1],
        offset: 0x06, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[ITEM_GUILD_BELT],
        type:"solo", stolen:"no", hints:[17,19,22,27,29,30,34,39], progression_flags:0x01,
        location_types:["treasuremap"]
    },
	{
        location_set:"Trinsic",
        location: "Pocket of Whitsaber", 
        name: "pocket-whitsaber", item_name: ["Map Piece 2","Map Piece 2"], id: [0x9E],
        offset: 0x07, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_DRAGON_EGG],
		requires:[ITEM_GUILD_BELT, ITEM_DRAGON_EGG],
        type:"solo", stolen:"no", hints:[4,8,19,22,34], progression_flags:0x01,
        location_types:["treasuremap"]
    },
	{
        location_set:"Trinsic",
        location: "Pocket of Arturos", 
        name: "pocket-arturos", item_name: ["Map Piece 3","Map Piece 3"], id: [0x9F],
        offset: 0x08, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[ITEM_GUILD_BELT],
        type:"solo", stolen:"no", hints:[4,19,34], progression_flags:0x01,
        location_types:["treasuremap"]
    },
	{
        location_set:"Serpent's Hold",
        location: "Pocket of Morchella", 
        name: "pocket-morchella", item_name: ["Map Piece 6","Map Piece 6"], id: [0xA2],
        offset: 0x09, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GUILD_BELT, ITEM_MAGIC_SHIELD, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		requires:[ITEM_GUILD_BELT],
        type:"solo", stolen:"no", hints:[5,19,22,25,29,34], progression_flags:0x01,
        location_types:["treasuremap"]
    },
	{
        location_set:"Buccaneer's Den",
        location: "Pocket of Homer",
        name: "pocket-homer", item_name: ["Map Piece 9","Map Piece 9"], id: [0xA5],
        offset: 0x0A, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_MAP_1, ITEM_MAP_2, ITEM_MAP_3, ITEM_MAP_4, ITEM_MAP_5, ITEM_MAP_6, ITEM_MAP_7, ITEM_MAP_8, ITEM_DRAGON_EGG],
		requires:[ITEM_GUILD_BELT, ITEM_MAP_1, ITEM_MAP_2, ITEM_MAP_3, ITEM_MAP_4, ITEM_MAP_5, ITEM_MAP_6, ITEM_MAP_7, ITEM_MAP_8, ITEM_DRAGON_EGG],
        type:"solo", stolen:"no", hints:[19,20,22,25,29,34], progression_flags:0,
        location_types:["treasuremap"]
    },

    //--------- CAVES
    //TODO - Add new cave chests to give more underground checks (heftimus)
	//standard chests
	{
        location_set:"Cyclops Cave",
        location: "F1 West Chest", 
        name: "dungeon-cyclops-F1-01", item_name: ["Swamp Boots","Swamp Boots"], id: [ITEM_SWAMP_BOOTS],
        offset: 0x11742, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[3,36], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Pirate Cave",
        location: "F4 Treasure Room Chest #1",
        name: "dungeon-piratecave-F4-01", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x11D23, flags: [0x83, 0xC3, 0x03],
        restrictions: [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"stack", stolen : "no", hints:[3,17,22,26,29,32,39], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Pirate Cave",
        location: "F4 Treasure Room Chest #2",
        name: "dungeon-piratecave-F4-02", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x11CCF, flags: [0x87, 0xC7, 0x07],
        restrictions: [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"stack", stolen : "no", hints:[3,17,22,26,29,32,39], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Pirate Cave",
        location: "F4 Treasure Room Chest #3",
        name: "dungeon-piratecave-F4-03", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x11C9F, flags: [0x86, 0xC6, 0x06],
        restrictions: [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"stack", stolen : "no", hints:[3,17,22,26,29,32,39], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Pirate Cave",
        location: "F4 Treasure Room Chest #4", 
        name: "dungeon-piratecave-F4-04", item_name: ["Magic Helm","Magic Helm"], id: [0x08],
        offset: 0x11C93, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"solo", stolen : "no", hints:[3,17,22,26,29,32,39], progression_flags:0,
        location_types:["caves"]
    }, //added an item as it was empty
	{
        location_set:"Pirate Cave",
        location: "F4 Treasure Room Chest #5", 
        name: "dungeon-piratecave-F4-05", item_name: ["Ring of Protection","Prot Ring"], id: [0x31],
        offset: 0x11CF7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], 
        requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"solo", stolen : "no", hints:[3,17,22,26,29,32,39], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Ant Mound",
        location: "F4 Body Chest",
        name: "dungeon-antmound-01", item_name: ["Map Piece 1","Map Piece 1"], id: [0x9D],
        offset: 0x11BCB, flags: [0xC0, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[3,39], progression_flags:0x01,
        location_types:["caves"]
    },
	{
        location_set:"Spider Cave",
        location: "F2 Chest",
        name: "dungeon-spider-01", item_name: ["Spiked Collar","Spiked Collar"], id: [0x18],
        offset: 0x118C9, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], 
        type:"solo", stolen : "no", hints:[3,37], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Swamp Cave",
        location: "F2 Treasure Room Chest", 
        name: "dungeon-swamp-01", item_name: ["Mace","Mace"], id: [0x1F],
        offset: 0x11815, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[3,17,37], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Swamp Cave",
        location: "F4 Camp Body Chest",
        name: "dungeon-swamp-02", item_name: ["Spike Shield","Spike Shield"], id: [0x0D],
        offset: 0x11CAB, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[3,17,39], progression_flags:0,
        location_types:["caves"]
    },

	//magic chests
	{
        location_set:"Britain Sewers / Buccaneer's Cave",
        location: "F2 Den Entrance Chest", 
        name: "cave-bucsden-F2-01", item_name: ["Glass Sword","Glass Sword"], id: [ITEM_GLASS_SWORD],
        offset: 0x11911, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"solo", stolen : "no", hints:[3,22,29,31,37], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Britain Sewers / Buccaneer's Cave",
        location: "F3 Phoenix Chest #1", 
        name: "britain-sewers-F3-01", item_name: ["Ring of Invisibility","Invis Ring"], id: [ITEM_RING_INVIS],
        offset: 0x11AAC, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"solo", stolen : "no", hints:[3,22,31,32,38,41], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Britain Sewers / Buccaneer's Cave",
        location: "F3 Phoenix Chest #2", 
        name: "britain-sewers-F3-02", item_name: ["Fire Wand","Fire Wand"], id: [0x2E],
        offset: 0x11A9C, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"solo", stolen : "no", hints:[3,22,31,32,38,41], progression_flags:0,
        location_types:["caves"]
    },
	{
        location_set:"Britain Sewers / Buccaneer's Cave",
        location: "F3 Phoenix Chest #3",
        name: "britain-sewers-F3-03", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x11AA4, flags: [0x88, 0xC8, 0x08],
        restrictions: [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
        type:"stack", stolen : "no", hints:[3,22,31,32,38,41], progression_flags:0,
        location_types:["caves"]
    },

    //--------- TOMBS
	//standard chests
	{
        location_set:"Moonglow Catacombs",
        location: "Tomb of Beyvin Bone Pile",
        name: "rune-honesty", item_name: ["Rune of Honesty","R. Honesty"], id: [ITEM_RUNE_HONESTY], 
        offset: 0x1192D, flags: [0xC0, 0xC0, 0x01],
        restrictions: [],
		requires:[],
        type:"main", stolen:"no", hints:[1,3,7,17,18,23,26,37,40], progression_flags:0x01,
        location_types:["tombs"]
    }, //we changed this to the first item
	{
        location_set:"Tomb of Kings",
        location: "F1 North Chamber Chest", 
        name: "dungeon-kingstomb-01", item_name: ["Boomerang","Boomerang"], id: [0x29], 
        offset: 0x11B47, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"solo", stolen : "no", hints:[1,3,15,21,28,36], progression_flags:0,
        location_types:["tombs"]
    },

	//magic chests
	{
        location_set:"Moonglow Catacombs",
        location: "F4 West Room Chest", 
        name: "crypts-moonglow-F4-01", item_name: ["Ring of Regeneration","Regen Ring"], id: [0x32],
        offset: 0x11C4F, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"solo", stolen : "no", hints:[1,3,7,17,23,39,40], progression_flags:0,
        location_types:["tombs"]
    },

    //--------- DUNGEONS
	//standard chests
	{
        location_set:"Hythloth",
        location: "House of Captain John",
        name: "dungeon-hythloth-captainjohn-01", item_name: ["Juice","Juice"], id: [0x4C],
        offset: 0x11D63, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[16,22,30,33,39,42], progression_flags:0,
        location_types:["dungeons"]
    }, //added an item as it was empty
    {
        location_set:"Hythloth",
        location: "F3 Lava Ladder Room",
        name: "dungeon-hythloth-F3-01", item_name: ["Magic Helm","Magic Helm"], id: [ITEM_MAGIC_HELM],
        offset: 0x11AF0, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[30,33,38], progression_flags:0,
        location_types:["dungeons"]
    },
	{
        location_set:"Wrong / Covetous",
        location: "F3 Secret Area Chest", 
        name: "dungeon-wrong-mapchest-01", item_name: ["Map Piece 7","Map Piece 7"], id: [0xA3],
        offset: 0x119C0, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"solo", stolen : "no", hints:[23,28,30,38], progression_flags:0x01,
        location_types:["dungeons"]
    },
	{
        location_set:"Shame",
        location: "F1 Locked House Chest", 
        name: "dungeon-shame-F1-01", item_name: ["Chain Mail","Chain Mail"], id: [0x15],
        offset: 0x11736, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"solo", stolen : "no", hints:[21,29,30,36], progression_flags:0,
        location_types:["dungeons"]
    },
    {
        location_set:"Shame",
        location: "F3 Web Chest", 
        name: "dungeon-shame-F3-02", item_name: ["Magic Bow","Magic Bow"], id: [0x2B],
        offset: 0x119CC, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[17,29,30,38], progression_flags:0,
        location_types:["dungeons"]
    },
	{
        location_set:"Deceit",
        location: "F4 Energy Field Chest", 
        name: "dungeon-deceit-F4-01", item_name: ["Magic Shield","Magic Shield"], id: [0x10],
        offset: 0x11B57, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"solo", stolen : "no", hints:[24,29,30,32,39], progression_flags:0,
        location_types:["dungeons"]
    },
    {
        location_set:"Deceit",
        location: "F4 Dead Body Chest", 
        name: "dungeon-deceit-02", item_name: ["Ring of Regeneration","Regen Ring"], id: [0x32],
        offset: 0x11B77, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        requires:[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD],
        type:"solo", stolen : "no", hints:[24,29,30,32,39], progression_flags:0,
        location_types:["dungeons"]
    },
    {
        location_set:"Despise",
        location: "F1 Dead Body Chest", 
        name: "dungeon-despise-F1-01", item_name: ["Milk","Milk"],  id: [ITEM_MILK], 
        offset: 0x11696, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[30,36], progression_flags:0,
        location_types:["dungeons"]
    },
    {
        location_set:"Despise",
        location: "F2 Ring Chest", 
        name: "dungeon-despise-F2-01", item_name: ["Ring of Protection","Prot Ring"],  id: [0x31], 
        offset: 0x1188D, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[29,30,37], progression_flags:0,
        location_types:["dungeons"]
    },
	{
        location_set:"Despise",
        location: "F3 Potion Room Chest", 
        name: "dungeon-despise-F3-01", item_name: ["Magic Armor","Magic Armor"],  id: [0x17], 
        offset: 0x11A68, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[17,29,30,32,33,38], progression_flags:0,
        location_types:["dungeons"]
    },
    {
        location_set:"Wrong / Covetous",
        location: "F2 Cell Chest", 
        name: "dungeon-wrong-F2-01", item_name: ["Powder Keg","Powder Keg"],  id: [0x7C], 
        offset: 0x1180D, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"solo", stolen : "no", hints:[23,28,30,37], progression_flags:0,
        location_types:["dungeons"]
    },
    {
        location_set:"Destard",
        location: "F4 Dragon Egg Chest", 
        name: "dungeon-destard-F4-01", item_name: ["Dragon Egg","Dragon Egg"], id: [ITEM_DRAGON_EGG],
        offset: 0x11BAF, flags: [0xC0, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[30,33,39], progression_flags:0,
        location_types:["dungeons"]
    },

	//magic chests
	{
        location_set:"Destard",
        location: "F2 West Side Chest #1", 
        name: "dungeon-destard-F2-01", item_name: ["Gold","Gold"], id: [0xB3],
        offset: 0x11971, flags: [0x98, 0xD8, 0x18],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"stack", stolen : "no", hints:[21,30,33,37], progression_flags:0,
        location_types:["dungeons"]
    },
    {
        location_set:"Destard",
        location: "F2 West Side Chest #2", 
        name: "dungeon-destard-F2-02", item_name: ["Glass Sword","Glass Sword"], id: [ITEM_GLASS_SWORD],
        offset: 0x11955, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK,SPELL_UNLOCK],
        requires:[ITEM_SPELLBOOK,SPELL_UNLOCK],
        type:"solo", stolen : "no", hints:[21,30,33,37], progression_flags:0,
        location_types:["dungeons"]
    },

    //--------- SHRINES
	{
        location_set:"Shrines",
        location: "Shrine of Compassion", 
        name: "moonstone-compassion", item_name: ["Moonstone of Compassion","M. Compassion"], id: [0x60], 
        offset: 0x11E14, flags: [0x41, 0xC0, 0x01],
        restrictions: [ITEM_RUNE_COMPASSION, ITEM_LEATHER_HELM, ITEM_IRON_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_COMPASSION],
        type:"shrine", stolen:"no", hints:[1,4,6,18], progression_flags:0x06,
        location_types:["shrines"]
    },
	{
        location_set:"Shrines",
        location: "Shrine of Honesty", 
        name: "moonstone-honesty", item_name: ["Moonstone of Honesty","M. Honesty"], id: [0x5F],
        offset: 0x11E1E, flags: [0x41, 0xC0, 0x01],
        restrictions: [ITEM_RUNE_HONESTY, ITEM_LEATHER_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_HONESTY],
        type:"shrine", stolen:"no", hints:[1,4,7,18,25], progression_flags:0x06,
        location_types:["shrines"]
    },
	{
        location_set:"Shrines",
        location: "Shrine of Honor", 
        name: "moonstone-honor", item_name: ["Moonstone of Honor","M. Honor"], id: [0x64], 
        offset: 0x11E3C, flags: [0x41, 0xC0, 0x01],
        restrictions: [ITEM_RUNE_HONOR, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_HONOR],
        type:"shrine", stolen:"no", hints:[1,4,8,18], progression_flags:0x06,
        location_types:["shrines"]
    },
	{
        location_set:"Shrines",
        location: "Shrine of Humility",
        name: "moonstone-humility", item_name: ["Moonstone of Humility","M. Humility"], id: [0x66],
        offset: 0x11E46, flags: [0x41, 0xC0, 0x01],
        restrictions: [ITEM_RUNE_HUMILITY, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_SPARTAN_HELM, ITEM_MAGIC_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_HUMILITY],
        type:"shrine", stolen:"no", hints:[1,4,9,18,25,33], progression_flags:0x06,
        location_types:["shrines"]
    },
	{
        location_set:"Shrines",
        location: "Shrine of Justice", 
        name: "moonstone-justice", item_name: ["Moonstone of Justice","M. Justice"],  id: [0x62],
        offset: 0x11DE2, flags: [0x41, 0xC0, 0x01],
        restrictions: [ITEM_RUNE_JUSTICE, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_JUSTICE],
        type:"shrine", stolen:"no", hints:[1,4,10,18], progression_flags:0x06,
        location_types:["shrines"]
    },
	{
        location_set:"Shrines",
        location: "Shrine of Sacrifice", 
        name: "moonstone-sacrifice", item_name: ["Moonstone of Sacrifice","M. Sacrifice"], id: [0x63],
        offset: 0x11DF1, flags: [0x41, 0xC0, 0x01],
        restrictions: [ITEM_RUNE_SACRIFICE, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_SACRIFICE],
        type:"shrine", stolen:"no", hints:[1,4,11,18], progression_flags:0x06,
        location_types:["shrines"]
    },
	{
        location_set:"Shrines",
        location: "Shrine of Spirituality", 
        name: "moonstone-spirituality", item_name: ["Moonstone of Spirituality","M. Spirituality"], id: [0x65],
        offset: 0x11686, flags: [0x41, 0xC0, 0x01], 
        restrictions: [ITEM_RUNE_SPIRITUALITY, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_SPARTAN_HELM, ITEM_GOLD, ITEM_BALLOON_PLANS, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_SPIRITUALITY],
        type:"shrine", stolen:"no", hints:[1,12,18], progression_flags:0x06,
        location_types:["shrines"]
    },
	{
        location_set:"Shrines",
        location: "Shrine of Valor", 
        name: "moonstone-valor", item_name: ["Moonstone of Valor","M. Valor"], id: [0x61],
        offset: 0x11E37, flags: [0x41, 0xC0, 0x01],
        restrictions: [ITEM_RUNE_VALOR, ITEM_MOONORB, ITEM_LEATHER_HELM, ITEM_IRON_HELM, ITEM_CHAIN_COIF, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		requires:[ITEM_RUNE_VALOR],
        type:"shrine", stolen:"no", hints:[1,4,13,18,25], progression_flags:0x06,
        location_types:["shrines"]
    },

    //--------- GARGOYLE CITY
	//standard chests
	{
        location_set:"Gargoyle City",
        location: "Museum Chest", 
        name: "lens-broken", item_name: ["Broken Lens","Broken Lens"], id: [ITEM_BROKEN_LENS],
        offset: 0x11DC6, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
		requires:[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
        type:"main", stolen:"no", hints:[15,18,24], progression_flags:0x01,
        location_types:["gargoylecity"]
    },
	{
        location_set:"Gargoyle City",
        location: "North West Building Chest",
        name: "gargoyle-nwhouse-01", item_name: ["Spartan Helm","Spartan Helm"], id: [0x07], 
        offset: 0x11D6A, flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[],
        type:"solo", stolen : "no", hints:[15,16], progression_flags:0,
        location_types:["gargoylecity"]
    },

    //--------- PARTY MEMBERS
    //party member inventories
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Dupre",
        name: "inventory-dupre", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F925+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[8,20,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Shamino",
        name: "inventory-shamino", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F934+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[4,12,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Iolo",
        name: "inventory-iolo", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F945+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[4,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Jaana",
        name: "inventory-jaana", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F95A+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[10,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Leodon",
        name: "inventory-leodon", item_name: ["Ring of Regeneration","Regen Ring"], id: [ITEM_RING_REGEN],
        offset: 0x0F988+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[25,29,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Gorn",
        name: "inventory-gorn", item_name: ["Ring of Protection","Prot Ring"], id: [ITEM_RING_PROT],
        offset: 0x0F9CB+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK], addedRequires:[],
        type:"partyring", stolen:"no", hints:[5,15,21,23,24,26,28,29,39,41,42,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Seggal",
        name: "inventory-seggal", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F9B1+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[5,25,29,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Gweeno",
        name: "inventory-gweeno", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F967+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[11,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Julia",
        name: "inventory-julia", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F972+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[11,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Katrina",
        name: "inventory-katrina", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F97D+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[9,25,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Leonna",
        name: "inventory-leonna", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F99B+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[25,29,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Blaine",
        name: "inventory-blaine", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F9A6+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[4,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Sentri",
        name: "inventory-sentri", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F9C0+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_KEY],
		requires:[], addedRequires:[],
        type:"partyring", stolen:"no", hints:[5,25,29,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
    {
        location_set:"Joinable Party Members",
        location:"Inventory of Beh Lem",
        name: "inventory-behlem", item_name: ["Ring","Ring"], id: [ITEM_RING_NORMAL],
        offset: 0x0F9DA+7, flags: [0x80, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_SPELL, ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK, ITEM_GARGISH_TEXT, ITEM_KEY],
		requires:[ITEM_GARGISH_TEXT], addedRequires:[],
        type:"partyring", stolen:"no", hints:[15,33,44], progression_flags:0,
        location_types:["joinablepartymembers"]
    },
];

//========= OTHER ITEMS
var DATA_ITEM_MOONORB_DEFAULT =
[
    //used for the spoiler log generation
	{
        location_set:"Starting Inventory",
        location:"Slot #1",
        name: "moonorb", item_name: ["Moon Orb","Moon Orb"], id: [ITEM_MOONORB],
        offset: 0x0F91D, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
		requires:[], addedRequires:[],
        type:"main", stolen:"no", hints:[], progression_flags:0x06,
        location_types:["playerinventory_slot1"]
    },
];

var DATA_ITEM_SPELLBOOK_DEFAULT =
[
    //used for the spoiler log generation
	{
        location_set:"Starting Inventory",
        location: "Slot #2",
        name: "spellbook", item_name: ["Spellbook","Spellbook"], id: [ITEM_SPELLBOOK],
        offset: 0x0F923, flags: [0xC0, 0xC0, 0x01],
        restrictions: [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
		requires:[], addedRequires:[],
        type:"main", stolen:"no", hints:[], progression_flags:0x07,
        location_types:["playerinventory_slot2"]
    },
];

var DATA_ITEM_SPELLS_IN_SHOPS =
[
    //used for the spoiler log generation
	{   
        location: "Xiao Shop Purchasables",
        location_set:"Shop Inventory",
        name: "non-random-spell-dispelfield", item_name: ["Spell of Dispel Field","Dispel Field"],
        id: [ITEM_SPELL],
        flags: [SPELL_DISPEL_FIELD, SPELL_DISPEL_FIELD, 0x0F],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0x07,
        location_types:["purchaseable"]
    },
	{   
        location: "Horance Shop Purchasables",
        location_set:"Shop Inventory",
        name: "non-random-spell-unlock", item_name: ["Spell of Unlock","Unlock"],
        id: [ITEM_SPELL], 
        flags: [SPELL_UNLOCK, SPELL_UNLOCK, 0x0A],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0x07,
        location_types:["purchaseable"]
    },
];

var DATA_REPLACEMENT_ITEMS =
[
    //used to replace duplicate progression items
	{   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-grapes", item_name: ["Grapes","Grapes"],
        id: [ITEM_GRAPES],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
    {   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-butter", item_name: ["Butter","Butter"],
        id: [ITEM_BUTTER],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
    {   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-bread", item_name: ["Bread","Bread"],
        id: [ITEM_BREAD],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
    {   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-mutton", item_name: ["Mutton","Mutton"],
        id: [ITEM_MUTTON],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
    {   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-rolls", item_name: ["Rolls","Rolls"],
        id: [ITEM_ROLLS],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
    {   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-cake", item_name: ["Cake","Cake"],
        id: [ITEM_CAKE],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
    {   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-cheese", item_name: ["Cheese","Cheese"],
        id: [ITEM_CHEESE],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
    {   
        location: "Replacements",
        location_set:"Replacements",
        name: "replacement-ham", item_name: ["Ham","Ham"],
        id: [ITEM_HAM],
        flags: [0x80, 0xC0, 0x01],
        restrictions: [],
        requires:[], addedRequires:[],
        progression_flags:0,
        location_types:["replacement"]
    },
];
