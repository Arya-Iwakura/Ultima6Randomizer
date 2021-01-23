var BASE_CHECKSUM = 0x9277C9F7;

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

const ITEM_SHOVEL = 0x6E;

const ITEM_LEATHER_HELM = 0x01;
const ITEM_CHAIN_COIF = 0x02;
const ITEM_IRON_HELM = 0x03;
const ITEM_SPIKED_HELM = 0x04;
const ITEM_WINGED_HELM = 0x05;
const ITEM_BRASS_HELM = 0x06;
const ITEM_SPARTAN_HELM = 0x07;
const ITEM_MAGIC_HELM = 0x08;
const ITEM_ENERGY_WAND = 0x2D;
const ITEM_FIRE_WAND = 0x2E;
const ITEM_SWAMP_BOOTS = 0x38;
const ITEM_KEY = 0x45;
const ITEM_SPIDERSILK = 0x53;
const ITEM_GEMS = 0x67;
const ITEM_GOLD_NUGGET = 0x69;
const ITEM_TORCH = 0x6A;
const ITEM_SLEEPING_POWDER = 0x6B;
const ITEM_POWDER_KEG = 0x7C;
const ITEM_GOLD = 0xB3;
const ITEM_BOOK = 0xB7;
const ITEM_SPELL = 0xB8;
const ITEM_SCROLL = 0xB9;


var DATA_ITEM_MOONORB =
[
	{"count": 1, "bytes": 2, "offset": 0x0F91D, "flags": [0xC0, 0xC0], "id": [ITEM_MOONORB], "restrictions": [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK], "name": "moonorb", "item": "Moon Orb", "location": "Inventory", "type":"main", "stolen":"no", "hints":[]},
];

var DATA_ITEM_SPELLBOOK =
[
	{"count": 1, "bytes": 2, "offset": 0x0F923, "flags": [0xC0, 0xC0], "id": [ITEM_SPELLBOOK], "restrictions": [ITEM_GOLD, ITEM_SPELLBOOK, ITEM_MOONORB], "name": "spellbook", "item": "Spellbook", "location": "Inventory", "type":"main", "stolen":"no", "hints":[]},
];

//name is the unique identifier for each of this and must be unique
//flags are [stolen, not stolen] and for shrine items(moonstones) are "on shrine / not on shrine"
var DATA_ITEMS_CORE =
[
	//items
	{"offset": 0x11D57, "flags": [0xC0, 0xC0], "id": [ITEM_BALLOON_PLANS], "restrictions": [ITEM_SPELLBOOK], "name": "balloon-plans", "item": "Balloon Plans", "location": "Sutek Dungeon", "type":"main", "stolen":"no", "hints":[2,5,23,24]}, //we changed this to the first item
	{"offset": 0x11DC6, "flags": [0xC0, 0xC0], "id": [ITEM_BROKEN_LENS], "restrictions": [ITEM_SPELLBOOK], "name": "lens-broken", "item": "Broken Lens", "location": "Gargoyle Museum", "type":"main", "stolen":"no", "hints":[15,18,24]},
	{"offset": 0x11E14, "flags": [0x41, 0xC0], "id": [0x60], "restrictions": [ITEM_RUNE_COMPASSION, ITEM_LEATHER_HELM, ITEM_IRON_HELM, ITEM_GOLD],
		 "name": "moonstone-compassion", "item": "Moonstone of Compassion", "location": "Shrine of Compassion", "type":"shrine", "stolen":"no", "hints":[1,6,18]},
	{"offset": 0x11E1E, "flags": [0x41, 0xC0], "id": [0x5F], "restrictions": [ITEM_RUNE_HONESTY, ITEM_LEATHER_HELM, ITEM_GOLD],
		 "name": "moonstone-honesty", "item": "Moonstone of Honesty", "location": "Shrine of Honesty", "type":"shrine", "stolen":"no", "hints":[1,7,18]},
	{"offset": 0x11E3C, "flags": [0x41, 0xC0], "id": [0x64], "restrictions": [ITEM_RUNE_HONOR, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_GOLD],
		 "name": "moonstone-honor", "item": "Moonstone of Honor", "location": "Shrine of Honor", "type":"shrine", "hints":[1,8,18]},
	{"offset": 0x11E46, "flags": [0x41, 0xC0], "id": [0x66], "restrictions": [ITEM_RUNE_HUMILITY, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_SPARTAN_HELM, ITEM_MAGIC_HELM, ITEM_GOLD],
		 "name": "moonstone-humility", "item": "Moonstone of Humility", "location": "Shrine of Humility", "type":"shrine", "stolen":"no", "hints":[1,9,18]},
	{"offset": 0x11DE2, "flags": [0x41, 0xC0], "id": [0x62], "restrictions": [ITEM_RUNE_JUSTICE, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_GOLD],
		 "name": "moonstone-justice", "item": "Moonstone of Justice", "location": "Shrine of Justice", "type":"shrine", "hints":[1,10,18]},
	{"offset": 0x11DF1, "flags": [0x41, 0xC0], "id": [0x63], "restrictions": [ITEM_RUNE_SACRIFICE, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_GOLD],
		 "name": "moonstone-sacrifice", "item": "Moonstone of Sacrifice", "location": "Shrine of Sacrifice", "type":"shrine", "stolen":"no", "hints":[1,11,18]},
	{"offset": 0x11686, "flags": [0x41, 0xC0], "id": [0x65], "restrictions": [ITEM_RUNE_SPIRITUALITY, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_SPARTAN_HELM, ITEM_GOLD],
		 "name": "moonstone-spirituality", "item": "Moonstone of Spirituality", "location": "Shrine of Spirituality", "type":"shrine", "stolen":"no", "hints":[1,12,18]},
	{"offset": 0x11E37, "flags": [0x41, 0xC0], "id": [0x61], "restrictions": [ITEM_RUNE_VALOR, ITEM_MOONORB, ITEM_LEATHER_HELM, ITEM_IRON_HELM, ITEM_CHAIN_COIF, ITEM_GOLD],
		 "name": "moonstone-valor", "item": "Moonstone of Valor", "location": "Shrine of Valor", "type":"shrine", "stolen":"no", "hints":[1,13,18]},
	{"offset": 0x1192D, "flags": [0xC0, 0xC0], "id": [ITEM_RUNE_HONESTY], "restrictions": [], "name": "rune-honesty", "item": "Rune of Honesty", "location": "Tomb of Beyvins", "type":"main", "stolen":"no", "hints":[1,2,7,18,21,23]}, //we changed this to the first item
	{"offset": 0x11E23, "flags": [0xC0, 0xC0], "id": [ITEM_RUNE_HONOR], "restrictions": [], "name": "rune-honor", "item": "Rune of Honor", "location": "Trinsic Town Center", "type":"main", "stolen":"no", "hints":[8,18]},
	{"offset": 0x10E56, "flags": [0xC0, 0xC0], "id": [ITEM_RUNE_JUSTICE], "restrictions": [], "name": "rune-justice", "item": "Rune of Justice", "location": "Potted Plant in Yew", "type":"main", "stolen":"no", "hints":[10,20]},
	{"offset": 0x10F14, "flags": [0xC0, 0xC0], "id": [ITEM_RUNE_SPIRITUALITY], "restrictions": [], "name": "rune-spirituality", "item": "Rune of Spirituality", "location": "Skara Brae North House", "type":"main", "stolen":"no", "hints":[12,16]},
	{"offset": 0x10F4F, "flags": [0xC0, 0xC0], "id": [ITEM_RUNE_VALOR], "restrictions": [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPELLBOOK, ITEM_SPIDERSILK, ITEM_SLEEPING_POWDER, ITEM_POWDER_KEG, ITEM_ENERGY_WAND], "name": "rune-valor", "item": "Rune of Valor", "location": "Jhelom Tavern", "type":"main", "stolen":"no", "hints":[13,20]},
	{"offset": 0x11C37, "flags": [0xC0, 0xC0], "id": [ITEM_VORTEX_CUBE], "restrictions": [ITEM_SPELLBOOK], "name": "vortexcube", "item": "Vortex Cube", "location": "Stonegate", "type":"main", "stolen":"no", "hints":[2,5,18,23,24]},

	//dialog items
	//changing the rune of compassion seems to also somehow corrupt the main menu graphics?
	//{"offset": 0x09E3F, "flags": [0xC0, 0xC0], "id": [ITEM_RUNE_COMPASSION], "restrictions": [ITEM_GOLD], "name": "rune-compassion", "item": "Rune of Compassion", "location": "Pocket of Ariana", "type":"main", "stolen":"no", "hints":[6,19]}, //dialog special case
	//{"offset": 0x6064C, "flags": [0xC0], "id": [ITEM_RUNE_HUMILITY], "restrictions": [ITEM_GOLD], "name": "rune-humility", "item": "Rune of Humility", "location": "Pocket of Antonio", "type":"main", "stolen":"no", "hints":[19]}, //dialog special case needs to be done here to rotate values
	//{"offset": 0x54758, "flags": [0xC0], "id": [ITEM_RUNE_SACRIFICE], "restrictions": [ITEM_GOLD], "name": "rune-sacrifice", "item": "Rune of Sacrifice", "location": "Pocket of Selganor", "type":"main", "stolen":"no", "hints":[19]}, //dialog special case
];

var DATA_CHESTS_OVERWORLD =
[
	//standard chests
	{"offset": 0x110BE, "flags": [0x8D, 0xCD], "id": [0xB3], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "britain-inn-01", "item": "Gold", "location": "Britain Inn", "type":"stack", "stolen" : "yes", "hints":[6,21]},
	{"offset": 0x10FF6, "flags": [0x80, 0xC0], "id": [0x8E], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "britain-bardhouse-01", "item": "Blue Potion", "location": "Britain Bard House", "type":"solo", "stolen" : "yes", "hints":[6,16]},
	{"offset": 0x10FFA, "flags": [0x80, 0xC0], "id": [0x76], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "britain-bardhouse-02", "item": "Lute", "location": "Britain Bard House", "type":"solo", "stolen" : "yes", "hints":[6,16]},
	{"offset": 0x1164B, "flags": [0x80, 0xC0], "id": [0x43], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "britain-guild-01", "item": "Cheese", "location": "Britain Guild Shop", "type":"solo", "stolen" : "yes", "hints":[6,17]}, //added an item as it was empty
	{"offset": 0x11400, "flags": [0xBC, 0xF0], "id": [0xB3], "restrictions": [], "name": "bucsden-bottomlefthouse-01", "item": "Gold", "location": "Buccaneers Den Left House", "type":"stack", "stolen" : "yes", "hints":[16,22]}, //we changed this to the first item
	{"offset": 0x113B8, "flags": [0x80, 0xC0], "id": [0x33], "restrictions": [], "name": "bucsden-budo-01", "item": "Ring of Invisibility", "location": "Secret Budo House", "type":"solo", "stolen" : "yes", "hints":[16,22,23]},
	{"offset": 0x11032, "flags": [0x80, 0xC0], "id": [0x8D], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "castle-avatar-01", "item": "Red Potion", "location": "Avatar Room", "type":"solo", "stolen" : "no", "hints":[5]}, //we changed this to the first item
	{"offset": 0x10FBA, "flags": [0x80, 0xC0], "id": [0x1B], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "castle-lordbritish-01", "item": "Main Gauche", "location": "Closet of Lord British", "type":"solo", "stolen" : "no", "hints":[5]},
	{"offset": 0x11062, "flags": [0x83, 0xC3], "id": [0x2D], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "castle-nystful-01", "item": "Energy Wand", "location": "Nystful Room", "type":"stack", "stolen" : "no", "hints":[5]}, //we changed this to the first item
	{"offset": 0x116D2, "flags": [0x80, 0xC0], "id": [0x91], "restrictions": [], "name": "daggerisland-basement-01", "item": "Orange Potion", "location": "Dagger Island Basement", "type":"solo", "stolen" : "yes", "hints":[2,16,22]}, //added an item as it was empty
	{"offset": 0x10F6F, "flags": [0x82, 0xC2], "id": [0x7C], "restrictions": [], "name": "jhelom-easthouse-01", "item": "Powder Keg", "location": "Jhelom East House", "type":"stack", "stolen" : "yes", "hints":[13,16]},
	{"offset": 0x11100, "flags": [0x8A, 0xCA], "id": [0x6A], "restrictions": [], "name": "minoc-basketweaver-01", "item": "Torches", "location": "Minoc Basket Weaver", "type":"stack", "stolen" : "yes", "hints":[11]},
	{"offset": 0x11110, "flags": [0x83, 0xC3], "id": [0x67], "restrictions": [], "name": "minoc-gemcutter-01", "item": "Gems", "location": "Minoc Gem Cutter", "type":"stack", "stolen" : "yes", "hints":[11,17]},
	{"offset": 0x111A7, "flags": [0x8A, 0xCA], "id": [0x53], "restrictions": [], "name": "paws-spinner-01", "item": "Spidersilk", "location": "House of Arbeth", "type":"stack", "stolen" : "yes", "hints":[14]}, //added an item as it was empty
	{"offset": 0x111BF, "flags": [0x8A, 0xCA], "id": [0xB3], "restrictions": [], "name": "paws-spinner-02", "item": "Gold", "location": "House of Arbeth", "type":"stack", "stolen" : "yes", "hints":[14]}, //added an item as it was empty
	{"offset": 0x11193, "flags": [0x80, 0xC0], "id": [0x40], "restrictions": [], "name": "paws-upperrighthouse-01", "item": "Mutton", "location": "Paws Tavern House", "type":"solo", "stolen" : "yes", "hints":[14,16]}, //added an item as it was empty
	{"offset": 0x1130D, "flags": [0x8C, 0xCC], "id": [0xB3], "restrictions": [], "name": "serpentshold-castle-01", "item": "Gold", "location": "Serpents Hold Castle", "type":"stack", "stolen" : "yes", "hints":[5]}, //we changed this to the first item
	{"offset": 0x113A5, "flags": [0x80, 0xC0], "id": [0x3D], "restrictions": [], "name": "serpentshold-southhouse-01", "item": "Grapes", "location": "Serpents Hold South House", "type":"solo", "stolen" : "yes", "hints":[16]}, //added an item to move the key down a slot
	{"offset": 0x11331, "flags": [0x80, 0xC0], "id": [0x0A], "restrictions": [], "name": "serpentshold-upperlefthouse-01", "item": "Curved Heater", "location": "Serpents Hold Left House", "type":"solo", "stolen" : "yes", "hints":[16]}, //we changed this to the first item
	{"offset": 0x1122A, "flags": [0x80, 0xC0], "id": [0x1E], "restrictions": [], "name": "trinsic-mayorhouse-01", "item": "Dagger", "location": "Trinsic Mayor House", "type":"solo", "stolen" : "yes", "hints":[8,16]},
	{"offset": 0x1129E, "flags": [0x83, 0xC3], "id": [0x69], "restrictions": [], "name": "trinsic-southhouse-01", "item": "Gold Nuggets", "location": "Trinsic South House", "type":"stack", "stolen" : "yes", "hints":[8,16]},

	//magic chests
	{"offset": 0x10FA6, "flags": [0x8B, 0xCB], "id": [0xB3], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "name": "britain-cowhouse-01", "item": "Gold", "location": "Britain Cow House", "type":"stack", "stolen" : "yes", "hints":[6,16]},
	{"offset": 0x110A2, "flags": [0x8E, 0xCE], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK], "name": "britain-bank-01", "item": "Gold", "location": "Britain Bank", "type":"stack", "stolen" : "yes", "hints":[6]},
	{"offset": 0x110A6, "flags": [0x88, 0xC8], "id": [0x69], "restrictions": [ITEM_SPELLBOOK], "name": "britain-bank-02", "item": "Gold Nuggets", "location": "Britain Bank", "type":"stack", "stolen" : "yes", "hints":[6]},
	{"offset": 0x110AA, "flags": [0x91, 0xD1], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK], "name": "britain-bank-03", "item": "Gold", "location": "Britain Bank", "type":"stack", "stolen" : "yes", "hints":[6]},
	{"offset": 0x116C2, "flags": [0x80, 0xC0], "id": [0x28], "restrictions": [ITEM_SPELLBOOK], "name": "daggerisland-basement-02", "item": "Glass Sword", "location": "Dagger Island Basement", "type":"solo", "stolen" : "yes", "hints":[2,16,22]},
	{"offset": 0x116C6, "flags": [0x80, 0xC0], "id": [0x12], "restrictions": [ITEM_SPELLBOOK], "name": "daggerisland-basement-03", "item": "Leather Arms", "location": "Dagger Island Basement", "type":"solo", "stolen" : "yes", "hints":[2,16,22]},
	{"offset": 0x10F73, "flags": [0x80, 0xC0], "id": [0x4A], "restrictions": [ITEM_SPELLBOOK], "name": "jhelom-westhouse-03", "item": "Spring Water", "location": "Jhelom West House", "type":"solo", "stolen" : "yes", "hints":[13,16]}, //added an item to move the key down a slot
	{"offset": 0x11120, "flags": [0x8F, 0xCF], "id": [0x67], "restrictions": [ITEM_SPELLBOOK], "name": "minoc-townhall-01", "item": "Gems", "location": "Minoc Town Hall", "type":"stack", "stolen" : "yes", "hints":[11]},
	{"offset": 0x11551, "flags": [0x80, 0xC0], "id": [0x93], "restrictions": [ITEM_SPELLBOOK], "name": "moonglow-musichall-01", "item": "Black Potion", "location": "Moonglow Music Hall", "type":"solo", "stolen" : "yes", "hints":[7,23]},
	{"offset": 0x1151D, "flags": [0x83, 0xC3], "id": [0x6B], "restrictions": [ITEM_SPELLBOOK], "name": "moonglow-pneumbra-01", "item": "Sleeping Powder", "location": "House of Pneumbras", "type":"stack", "stolen" : "yes", "hints":[7,24]}, //we changed this to the first item
	{"offset": 0x115B7, "flags": [0x80, 0xC0], "id": [0x2C], "restrictions": [ITEM_SPELLBOOK], "name": "nicodemus-house-01", "item": "Staff", "location": "House of Nicodemus", "type":"solo", "stolen" : "yes", "hints":[23,24]},
	{"offset": 0x115BB, "flags": [0x85, 0xC5], "id": [0x69], "restrictions": [ITEM_SPELLBOOK], "name": "nicodemus-house-02", "item": "Gold Nuggets", "location": "House of Nicodemus", "type":"stack", "stolen" : "yes", "hints":[23,24]},
	{"offset": 0x1132D, "flags": [0x80, 0xC0], "id": [0x2A], "restrictions": [ITEM_SPELLBOOK], "name": "serpentshold-guardhouse-01", "item": "3x Crossbow", "location": "Serpents Hold Barracks", "type":"solo", "stolen" : "yes", "hints":[23]},
];

var DATA_CHESTS_DUNGEON =
[
	//standard chests
	{"offset": 0x11742, "flags": [0x80, 0xC0], "id": [0x38], "restrictions": [], "name": "dungeon-cyclops-F1-01", "item": "Swamp Boots", "location": "Cyclops Cave", "type":"solo", "stolen" : "no", "hints":[2,3]},
	{"offset": 0x11D63, "flags": [0x80, 0xC0], "id": [0x4C], "restrictions": [], "name": "dungeon-hythloth-captainjohn-01", "item": "Juice", "location": "House of Captain John", "type":"solo", "stolen" : "no", "hints":[2,4,16,22]}, //added an item as it was empty
	{"offset": 0x11D23, "flags": [0x83, 0xC3], "id": [0xB3], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK], "name": "dungeon-piratecave-F4-01", "item": "Gold", "location": "Pirate Cave", "type":"stack", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x11CCF, "flags": [0x87, 0xC7], "id": [0xB3], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK], "name": "dungeon-piratecave-F4-02", "item": "Gold", "location": "Pirate Cave", "type":"stack", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x11C9F, "flags": [0x86, 0xC6], "id": [0xB3], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK], "name": "dungeon-piratecave-F4-03", "item": "Gold", "location": "Pirate Cave", "type":"stack", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x11C93, "flags": [0x80, 0xC0], "id": [0x08], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK], "name": "dungeon-piratecave-F4-04", "item": "Magic Helm", "location": "Pirate Cave", "type":"solo", "stolen" : "no", "hints":[2,3,22]}, //added an item as it was empty
	{"offset": 0x11CF7, "flags": [0x80, 0xC0], "id": [0x31], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK], "name": "dungeon-piratecave-F4-05", "item": "Ring of Protection", "location": "Pirate Cave", "type":"solo", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x119C0, "flags": [0x85, 0xC5], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK], "name": "dungeon-wrong-mapchest-01", "item": "Gold", "location": "Wrong", "type":"stack", "stolen" : "no", "hints":[2,4,23]},

	//magic chests
	{"offset": 0x11AAC, "flags": [0x80, 0xC0], "id": [0x33], "restrictions": [ITEM_SPELLBOOK], "name": "britain-sewers-F3-01", "item": "Ring of Invisibility", "location": "Phoenix Cave", "type":"solo", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x11A9C, "flags": [0x80, 0xC0], "id": [0x2E], "restrictions": [ITEM_SPELLBOOK], "name": "britain-sewers-F3-02", "item": "Fire Wand", "location": "Phoenix Cave", "type":"solo", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x11AA4, "flags": [0x88, 0xC8], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK], "name": "britain-sewers-F3-03", "item": "Gold", "location": "Phoenix Cave", "type":"stack", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x11911, "flags": [0x80, 0xC0], "id": [0x28], "restrictions": [ITEM_SPELLBOOK], "name": "cave-bucsden-F2-01", "item": "Glass Sword", "location": "Buccaneers Cave", "type":"solo", "stolen" : "no", "hints":[2,3,22]},
	{"offset": 0x11971, "flags": [0x98, 0xD8], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK], "name": "dungeon-destard-F2-01", "item": "Gold", "location": "Destard", "type":"stack", "stolen" : "no", "hints":[2,4]},
	{"offset": 0x11C4F, "flags": [0x80, 0xC0], "id": [0x32], "restrictions": [ITEM_SPELLBOOK], "name": "crypts-moonglow-F4-01", "item": "Ring of Regeneration", "location": "Moonglow Catacombs", "type":"solo", "stolen" : "no", "hints":[1,2,7,21,23]},
];

var DATA_SPAWNER_ANIMAL_SOLO =
[
	0x10, 0x18, 0x19, 0x1A, 0x1F, 0x22, 0x2F, 0x32, 0x38, 0x3A
];

var DATA_SPAWNER_ANIMAL_GROUP =
[
	0x78, 0x99,
	0x50, 0x58, 0x59, 0x5A, 0x5F, 0x62, 0x6F, 0x72, 0x7A
];

var DATA_SPAWNER_EVIL_SOLO =
[
	0x1C, 0x1E, 0x25, 0x26, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x33, 0x35
];

var DATA_SPAWNER_EVIL_GROUP =
[
	0x9C, 0x9E, 0xA5, 0xA6, 0xAA, 0xAB, 0xAC, 0xAD, 0xAE, 0xB3, 0xB5,
	0xA9,
];

var DATA_SPAWNER_WILD_SOLO =
[
	0x12, 0x13, 0x14, 0x17, 0x1B, 0x1D, 0x20, 0x21, 0x23, 0x24, 0x27, 0x30, 0x31, 0x35, 0x37, 0x39
];

var DATA_SPAWNER_WILD_GROUP =
[
	0x76, 0x77, 0x79, 0x92, 0x93, 0x97, 0x9B, 0xA4, 0xA7, 0xB1,
	0x94, 0x9D, 0xA0, 0xA1, 0xA3, 0xB0, 0xB5, 0xB9
];

var DATA_SPAWNER_WILD_SOLO_ADDITIONAL =
[
	0x12, 0x13, 0x14, 0x17, 0x1B, 0x1D, 0x20, 0x21, 0x23, 0x24, 0x27, 0x30, 0x31, 0x35, 0x37, 0x39,
	0x28, 0x34, //zu flower, silver serpent
];

var DATA_SPAWNER_WILD_GROUP_ADDITIONAL =
[
	0x76, 0x77, 0x79, 0x92, 0x93, 0x97, 0x9B, 0xA4, 0xA7, 0xB1,
	0x94, 0x9D, 0xA0, 0xA1, 0xA3, 0xB0, 0xB5, 0xB9,
	0xA8, 0xB4, //zu flower, silver serpent
];

var DATA_SPAWNER_PEOPLE_SOLO =
[
	0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C
];

var DATA_SPAWNER_PEOPLE_GROUP =
[
	0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x8B, 0x8C
];

var DATA_SPAWNER_PEOPLE_SOLO_NOGUARDS =
[
	0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x08, 0x09, 0x0A, 0x0B, 0x0C
];

var DATA_SPAWNER_PEOPLE_GROUP_NOGUARDS =
[
	0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x88, 0x89, 0x8A, 0x8B, 0x8C
];

var DATA_SPAWNER_REAGENT =
[
	0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0xBC
];

var DATA_SPAWNER_SEA_SOLO =
[
	0x15, 0x16
];

var DATA_SPAWNER_SEA_GROUP =
[
	0x95, 0x96
];

var DATA_SPAWNER_NEVERCHANGE =
[
	0x4E
];

var DATA_SPAWNER_TOWNANDMOONGATE =
[
	0x07, 0x18, 0x1F, 0x87
];

var DATA_ENEMY_SPELL_LISTS =
[
    {"address":0x1662E, "slots":7, "spells":[0x07, 0x0c, 0x09, 0x1a, 0x1e, 0x1b, 0x20]},
    {"address":0x16636, "slots":2, "spells":[0x07, 0x1a]},
    {"address":0x16639, "slots":2, "spells":[0x0c, 0x20]},
    {"address":0x1663C, "slots":3, "spells":[0x07, 0x1e, 0x1a]},
    {"address":0x16640, "slots":1, "spells":[0x27]},
    {"address":0x16642, "slots":3, "spells":[0x09, 0x1a, 0x1e]},
    {"address":0x16646, "slots":1, "spells":[0x07]},
    {"address":0x16648, "slots":3, "spells":[0x1a, 0x18, 0x1b]},
    {"address":0x1664C, "slots":1, "spells":[0x09]},
    {"address":0x1664E, "slots":5, "spells":[0x0c, 0x1e, 0x0c, 0x09, 0x0b]},
    {"address":0x16654, "slots":2, "spells":[0x0c, 0x1a]},
    {"address":0x16657, "slots":2, "spells":[0x09, 0x1b]},
    {"address":0x1665A, "slots":4, "spells":[0x1b, 0x25, 0x26, 0x1a]},
    {"address":0x1665F, "slots":4, "spells":[0x0c, 0x20, 0x1a, 0x25]},
];

var DATA_ENEMY_SPELLS_EASY	 = [0x03,0x07,0x08,0x09,0x0B,0x0C];
var DATA_ENEMY_SPELLS_MEDIUM = [0x14,0x1A,0x1B,0x1E,0x23,0x27];
var DATA_ENEMY_SPELLS_HARD	 = [0x18,0x20,0x21,0x24,0x25,0x26,0x2A,0x2C,0x33];
var DATA_ENEMY_SPELLS_ALL	 = [	0x03, //Harm
									0x07, //Magic Arrow
									0x08, //Poison
									0x09, //Sleep
									0x0B, //Curse
									0x0C, //Fireball
									//0x13, //Mass Sleep
									0x14, //Disable
									0x18, //Explosion
									0x1A, //Lightning
									0x1B, //Paralyze
									0x1E, //Charm
									0x20, //Flame Wind
									0x21, //Hail Storm
									0x23, //Negate Magic
									0x24, //Poison Wind
									0x25, //Chain Bolt
									0x26, //Energy Wind
									0x27, //Fear
									//0x29, //Destroy - Insta-kill
									0x2A, //Mass Curse
									0x2C, //Wing Strike - Insta-kill
									//0x2E, //Death Wind
									//0x2F, //Mass Charm
									//0x30, //Mass Destroy - Insta-kill
									0x33, //Tremor
								];

var DATA_ENEMY_INVENTORY_ARMOR 				= [0x11,0x12,0x13,0x14,0x15,0x16];
var DATA_ENEMY_INVENTORY_HELMS 				= [0x01,0x02,0x03,0x04,0x05,0x06,0x07];
var DATA_ENEMY_INVENTORY_SHIELDS 			= [0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F];
var DATA_ENEMY_INVENTORY_WEAPONS 			= [0x19,0x1A,0x1B,0x1C,0x1D,0x1E,0x1F,0x20,0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x29,0x2C,0x2F];
var DATA_ENEMY_INVENTORY_DROPS 				= [0x31,0x67,0x6B];
var DATA_ENEMY_INVENTORY_DROPS_CASTERS		= [0x32,0x67,0xB8];
var DATA_ENEMY_INVENTORY_DROPS_FOOD			= [0x3D,0x3E,0x3F,0x40,0x41,0x42,0x43,0x44,0x47,0x48,0x49,0x4A,0x4B,0x4C];
var DATA_ENEMY_INVENTORY_DROPS_POTIONS		= [0x8D,0x8E,0x8F,0x90,0x91,0x92,0x93,0x94];
var DATA_ENEMY_INVENTORY_DROPS_REAGENTS		= [0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54];
var DATA_ENEMY_INVENTORY_DROPS_ANIMALS		= [0x40,0x44,0x47];

//enemy drop classes - none, animal, creature, humanoid (used when believable flags are set)
var DATA_ENEMY_DROP_CLASSES =
[
	03, 03, 03, 03, 03, 03, 03 ,03 ,03 ,03 ,03, 03, 03, 00, 00,
	01, 00, 01, 00, 01, 02, 02, 02, 01, 01, 01, 01, 03, 03, 03, 01,
	01, 01, 01, 01, 01, 03, 03, 02, 02, 03, 03, 02, 03, 03, 03, 03,
	02, 02, 01, 03, 02, 03, 01, 01, 01, 01, 01
];

//these are used for chaotic randomization mode
var DATA_PLAYER_INVENTORY_ARMOR 			= {"items":	[0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x39],
												"quantity":	[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01]};
var DATA_PLAYER_INVENTORY_HELMS 			= {"items":	[0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08],
												"quantity":	[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01]};
var DATA_PLAYER_INVENTORY_SHIELDS 			= {"items":	[0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F,0x10],
												"quantity":	[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01]};
var DATA_PLAYER_INVENTORY_WEAPONS_1H		= {"items":	[0x19,0x1A,0x1B,0x1C,0x1D,0x1E,0x1F,0x20,0x23,0x28,0x29,0x2C,0x2D,0x2E,0x2F],
												"quantity":	[0x01,0x01,0x01,0x0A,0x0A,0x0A,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x0F]};
var DATA_PLAYER_INVENTORY_WEAPONS_2H		= {"items":	[0x21,0x22,0x24,0x25,0x26,0x27,0x2A,0x2B],
												"quantity":	[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01]};
var DATA_PLAYER_INVENTORY_NECKLACE 			= {"items":	[0x36,0x3A,0x18],
												"quantity":	[0x01,0x01,0x01]};
var DATA_PLAYER_INVENTORY_BOOTS 			= {"items":	[0x37,0x38],
												"quantity":	[0x01,0x01]};
var DATA_PLAYER_INVENTORY_RINGS 			= {"items":	[0x30,0x31,0x32,0x33],
												"quantity":	[0x01,0x01,0x01,0x01]};
var DATA_PLAYER_INVENTORY_ITEMS 			= {"items":	[0x2F,0x30,0x31,0x32,0x33,0x39,0x55,0x56,0x67,0x69,0x6A,0x6B,0x6D,0x6E,0x71,0x74,0x76,0x77,0x7C,0x88],
												"quantity":	[0x0F,0x04,0x04,0x04,0x04,0x01,0xFF,0xFF,0x0A,0x0A,0x0A,0x0A,0x01,0x01,0x01,0x01,0x01,0x01,0x0F,0x01]};
var DATA_PLAYER_INVENTORY_ITEMS_FOOD		= {"items":	[0x3D,0x3E,0x3F,0x40,0x41,0x42,0x43,0x44,0x47,0x48,0x49,0x4A,0x4B,0x4C],
												"quantity":	[0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F]};
var DATA_PLAYER_INVENTORY_ITEMS_POTIONS		= {"items":	[0x8D,0x8E,0x8F,0x90,0x91,0x92,0x93,0x94],
												"quantity":	[0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F]};
var DATA_PLAYER_INVENTORY_ITEMS_REAGENTS	= {"items":	[0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54],
												"quantity":	[0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F,0x0F]};
												
//these are used for tier randomization mode
var DATA_PLAYER_INVENTORY_SETS = 
[
	{"rarity": 1, 	"item":		[0x6A,0x3D,0x3E,0x3F,0x40,0x41,0x42,0x43,0x44,0x47,0x48,0x49,0x4A,0x4B,0x4C],
					"quantity":	[0x0A,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x03,0x03,0x06,0x06,0x06]},
	{"rarity": 2, 	"item":		[0x8D,0x8E,0x8F,0x90,0x91,0x92,0x94,0x2F], 
					"quantity":	[0x05,0x03,0x05,0x03,0x05,0x03,0x03,0x07]},
	{"rarity": 3, 	"item":		[0x31,0x32,0x33,0x6B,0x7C,0x93], 
					"quantity":	[0x01,0x01,0x01,0x05,0x02,0x04]},
];

var DATA_PLAYER_ARMOR_SETS = 
[
	{"rarity": 1,	"helm":[0x00, 0x00, 0x01],	"armor":[0x00, 0x11], 				"shield":[0x00, 0x09], 							"boots":[0x00, 0x37], 				"necklace":[0x00]}, //none - very light
	{"rarity": 1,	"helm":[0x01, 0x01, 0x00],	"armor":[0x12, 0x11], 				"shield":[0x09, 0x0C, 0x0D, 0x00],				"boots":[0x00, 0x37], 				"necklace":[0x00, 0x00, 0x18]}, //leather
	{"rarity": 1,	"helm":[0x06, 0x01], 		"armor":[0x13, 0x12], 				"shield":[0x0E, 0x09, 0x0B, 0x0F, 0x0D, 0x00], 	"boots":[0x00, 0x37],				"necklace":[0x00, 0x00, 0x18]}, //brass

	{"rarity": 2,	"helm":[0x05, 0x02], 		"armor":[0x14, 0x15], 				"shield":[0x0C, 0x0A, 0x09, 0x00],				"boots":[0x37],						"necklace":[0x00, 0x18]}, //scale
	{"rarity": 2,	"helm":[0x02, 0x05], 		"armor":[0x15, 0x14, 0x13], 		"shield":[0x0A, 0x0C, 0x0E, 0x09], 				"boots":[0x37], 					"necklace":[0x00, 0x18]}, //chain
	{"rarity": 2,	"helm":[0x04, 0x07, 0x05], 	"armor":[0x11, 0x12, 0x14, 0x15], 	"shield":[0x0D, 0x0E, 0x00],					"boots":[0x37], 					"necklace":[0x00, 0x18]}, //beserker
	{"rarity": 2,	"helm":[0x07, 0x04, 0x05], 	"armor":[0x13, 0x12, 0x14, 0x15], 	"shield":[0x0B, 0x0A, 0x0C, 0x00],				"boots":[0x37], 					"necklace":[0x00, 0x18]}, //gladiator

	{"rarity": 3,	"helm":[0x03, 0x07], 		"armor":[0x16, 0x15, 0x14], 		"shield":[0x0F, 0x0C, 0x0A, 0x0E], 				"boots":[0x37], 					"necklace":[0x00, 0x18]}, //plate
	{"rarity": 3,	"helm":[0x08, 0x03], 		"armor":[0x17, 0x16], 				"shield":[0x10, 0x0B, 0x0A], 					"boots":[0x37, 0x37, 0x37, 0x38],	"necklace":[0x00]}, //heavy (magic armor)
	{"rarity": 3,	"helm":[0x08], 				"armor":[0x11], 					"shield":[0x09, 0x10], 							"boots":[0x37, 0x37, 0x37, 0x38],	"necklace":[0x00]}, //battle mage
];

var DATA_PLAYER_WEAPON_SETS =
[
	{"rarity": 1,	"hand_right":[0x19, 0x29],								"hand_left":[0x00], 					"ammo":[0x00], 						"ammoMinMax":[0x00,0x00]}, //ranged - light
	{"rarity": 2,	"hand_right":[0x21], 									"hand_left":[0xFF], 					"ammo":[0x55], 						"ammoMinMax":[0x20,0xA0]}, //ranged - bow
	{"rarity": 2,	"hand_right":[0x22], 									"hand_left":[0xFF], 					"ammo":[0x56], 						"ammoMinMax":[0x20,0xA0]}, //ranged - crossbow

	{"rarity": 1,	"hand_right":[0x1A, 0x1B, 0x2C],						"hand_left":[0x00], 					"ammo":[0x00], 						"ammoMinMax":[0x00,0x00]}, //melee - light
	{"rarity": 2,	"hand_right":[0x1F, 0x23, 0x20],						"hand_left":[0x00], 					"ammo":[0x00], 						"ammoMinMax":[0x00,0x00]}, //melee - average
	{"rarity": 2,	"hand_right":[0x1A, 0x1B, 0x2C, 0x1F, 0x23, 0x20],		"hand_left":[0x00], 					"ammo":[0x00], 						"ammoMinMax":[0x00,0x00]}, //melee - mixed
	{"rarity": 1,	"hand_right":[0x1A, 0x1B, 0x2C],						"hand_left":[0x1A, 0x1B, 0x2C],			"ammo":[0x00], 						"ammoMinMax":[0x00,0x00]}, //melee - duel wield light
	{"rarity": 2,	"hand_right":[0x1F, 0x23, 0x20],						"hand_left":[0x1F, 0x23, 0x20],			"ammo":[0x00], 						"ammoMinMax":[0x00,0x00]}, //melee - duel wield average

	{"rarity": 1,	"hand_right":[0x1A, 0x1B, 0x2C],						"hand_left":[0x1B, 0x23],				"ammo":[0x00],						"ammoMinMax":[0x00,0x00]}, //light melee + light ranged
	{"rarity": 1,	"hand_right":[0x1A, 0x1B, 0x2C],						"hand_left":[0x1C, 0x1D, 0x1E, 0x2F],	"ammo":[0x1C, 0x1D, 0x1E, 0x2F],	"ammoMinMax":[0x01,0x05]}, //light melee + thrown
	{"rarity": 2,	"hand_right":[0x1F, 0x23, 0x20],						"hand_left":[0x1B, 0x23],				"ammo":[0x00],						"ammoMinMax":[0x00,0x00]}, //average melee + light ranged
	{"rarity": 2,	"hand_right":[0x1F, 0x23, 0x20],						"hand_left":[0x1C, 0x1D, 0x1E, 0x2F],	"ammo":[0x1C, 0x1D, 0x1E, 0x2F],	"ammoMinMax":[0x01,0x05]}, //average melee + thrown

	{"rarity": 3,	"hand_right":[0x24, 0x25, 0x26, 0x27],					"hand_left":[0xFF], 					"ammo":[0x00], 						"ammoMinMax":[0x00,0x00]}, //melee - 2-handed

	{"rarity": 2,	"hand_right":[0x2C],									"hand_left":[0x2D, 0x2E, 0x00],			"ammo":[0x6B],						"ammoMinMax":[0x01,0x06]}, //mage
	{"rarity": 3,	"hand_right":[0x1F, 0x20, 0x2D, 0x2E],					"hand_left":[0x00],						"ammo":[0x00],						"ammoMinMax":[0x00,0x00]}, //battle mage
	{"rarity": 3,	"hand_right":[0x2E],									"hand_left":[0x00],						"ammo":[0x2F, 0x7C],				"ammoMinMax":[0x01,0x05]}, //fire
];

var DATA_HINT_TEXT =
[
	" is somewhere.", //0 - locations with this cannot have hints
	" is in a sacred place.", //1
	" is underground.", //2
	" is in a cave.", //3
	" is in a dungeon.", //4
	" is in a castle.", //5
	" is in a place of Compassion.", //6
	" is in a place of Honesty.", //7
	" is in a place of Honor.", //8
	" is in a place of Humility.", //9
	" is in a place of Justice.", //10
	" is in a place of Sacrifice.", //11
	" is in a place of Spirituality.", //12
	" is in a place of Valor.", //13
	" is in a village.", //14
	" is in a place with Gargoyles.", //15
	" is in a house.", //16
	" is in a shop.", //17
	" is on a pedastal.", //18
	" is in a pocket.", //19
	" is in a tavern.", //20
	" is in a place of rest.", //21
	" is among pirate possessions.", //22
	" may require finding a secret.", //23
	" may require the spell Dispel.", //24
];

var DATA_HINT_LOCATIONS =
[
	{"offset":0x204C1, "size":32,  "name":"Scroll - Beyvins Tomb"}, //0x204C1 - scroll - With love from cousin Manrel - 0x20 (32)
	{"offset":0x2053D, "size":43,  "name":"Scroll - Chuckles #2"}, //0x2053D - scroll - Chuckles scroll #2 - 0x2B (43)
	{"offset":0x205BE, "size":53,  "name":"Scroll - Chuckles #4"}, //0x205BE - scroll - Chuckles scroll #4 - 0x35 (53)
	{"offset":0x20670, "size":69,  "name":"Scroll - Chuckles #6"}, //0x20670 - scroll - Chuckles scroll #6 - 0x45 (69)
	{"offset":0x24587, "size":73,  "name":"Scroll - Yew Certificate"}, //0x2452C - yew permission scroll - 0xA4 (164) however we write the hint at 24587 - 49(73)
	{"offset":0x2046F, "size":81,  "name":"Scroll - Lord British Notes"}, //0x2046F - scroll - Lord British's Notes - 0x51 (81)
	{"offset":0x20569, "size":84,  "name":"Scroll - Chuckles #3"}, //0x20569 - scroll - Chuckles scroll #3 - 0x54 (84)
	{"offset":0x204E2, "size":90,  "name":"Scroll - Chuckles #1"}, //0x204E2 - scroll - Chuckles scroll #1 - 0x5A (90)
	{"offset":0x206B6, "size":101, "name":"Scroll - Chuckles #7"}, //0x206B6 - scroll - Chuckles scroll #7 - 0x65 (101)
	{"offset":0x205F4, "size":123, "name":"Scroll - Chuckles #5"}, //0x205F4 - scroll - Chuckles scroll #5 - 0x7B (123)
	//{"offset":0x2297E, "size":184}, //0x2297E - book - dilzals almanac of good advice - 0xB8 (184)
	//{"offset":0x228A8, "size":213}, //0x228A8 - book - crossbow marksman - 0xD5 (213)
	//{"offset":0x20826, "size":235}, //0x20826 - book - huberts hair raising adventure - 0xEB (235)
	//{"offset":0x20729, "size":251}, //0x20729 - book - baldwins big book of baking - 0xFC (251)
	//{"offset":0x22A37, "size":276}, //0x22A37 - book - plant lore - 0x114 (276)
	//{"offset":0x2276D, "size":314}, //0x2276D - book - of dreams and visions - 0x13A (314)
];

	//0x20203 - crypt #1 - 0x8
	//0x20219 - crypt #2 - 0x7
	//0x2022E - crypt #3 - 0x6
	//0x20242 - crypt #4 - 0xB (11)
	//0x2026F - crypt #5 - 0x7
	//0x20284 - crypt #6 - 0x6
	//0x20298 - crypt #7 - 0x5
	//0x202AB - crypt #8 - 0x9
	//0x23047 - grave - seeking a present - 0x11 (17)
	//0x23059 - grave - to give a druid - 0xF (15)
	//0x23069 - grave - try a bottle of our - 0x13 (19)
	//0x2307D - grave - embalming fluid - 0xF (15)
	//0x2308D - grave - as you are now so once was i - 0x61 (97)
	//0x230EF - grave - on his wifes birthday - 0x5C (92)
	//0x2314C - grave - golden lads and lasses must - 0x3F (63)
	//0x2318C - grave - this great musician - 0x4A (74)
	//0x231D7 - grave - here lies johns body - 0x57 (87)
	//0x2322F - grave - hinges rusty - 0x53 (83)
	//0x23283 - grave - here lies a man named ed - 0x3C (60)
	//0x244AC - grave - here lies captain hawkins - 0x3E (62)
