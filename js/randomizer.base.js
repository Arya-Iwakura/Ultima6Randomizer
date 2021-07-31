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
const ITEM_RING_PROT = 0x31;
const ITEM_RING_REGEN = 0x32;
const ITEM_RING_INVIS = 0x33;
const ITEM_GUILD_BELT = 0x35;
const ITEM_SWAMP_BOOTS = 0x38;
const ITEM_KEY = 0x45;
const ITEM_SPIDERSILK = 0x53;
const ITEM_ARROW = 0x55;
const ITEM_BOLT = 0x56;
const ITEM_BOOK_BOARDGAMES = 0x5B;
const ITEM_BOOK_OZ = 0x5D;
const ITEM_GEMS = 0x67;
const ITEM_GOLD_NUGGET = 0x69;
const ITEM_TORCH = 0x6A;
const ITEM_SLEEPING_POWDER = 0x6B;
const ITEM_POWDER_KEG = 0x7C;
const ITEM_MAP_1 = 0x9D;
const ITEM_MAP_2 = 0x9E;
const ITEM_MAP_3 = 0x9F;
const ITEM_MAP_4 = 0xA0;
const ITEM_MAP_5 = 0xA1;
const ITEM_MAP_6 = 0xA2;
const ITEM_MAP_7 = 0xA3;
const ITEM_MAP_8 = 0xA4;
const ITEM_MAP_9 = 0xA5;
const ITEM_GOLD = 0xB3;
const ITEM_BOOK = 0xB7;
const ITEM_SPELL = 0xB8;
const ITEM_SCROLL = 0xB9;

const SPELL_UNLOCK = 0xCA; //CA B8 - unlock
const SPELL_DISPEL_FIELD = 0xCF; //CF B8 - dispel

var DATA_ITEM_MOONORB =
[
	{"count": 1, "bytes": 2, "offset": 0x0F91D, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_MOONORB], "restrictions": [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
		"requires":[], "name": "moonorb", "item": ["Moon Orb","Moon Orb"], "location": "Inventory", "type":"main", "stolen":"no", "hints":[]},
];

var DATA_ITEM_SPELLBOOK =
[
	{"count": 1, "bytes": 2, "offset": 0x0F923, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_SPELLBOOK], "restrictions": [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
		"requires":[], "name": "spellbook", "item": ["Spellbook","Spellbook"], "location": "Inventory", "type":"main", "stolen":"no", "hints":[]},
];

var DATA_ITEM_MOONORB_REPLACEMENTS =
[
	{"count": 1, "bytes": 2, "offset": 0x0F91D, "flags": [0xC0, 0xC0, 0x01], "id": [0x6D], "restrictions": [ITEM_GOLD, ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_SPELL],
		"requires":[], "name": "sextant", "item": ["Sextant","Sextant"], "location": "Inventory", "type":"solo", "stolen":"no", "hints":[]},
];

//name is the unique identifier for each of this and must be unique
//flags are [stolen, not stolen] and for shrine items(moonstones) are "on shrine / not on shrine"
//offset is 0x01, 02, 03... for all dialog items or other items that need LZW decompression or otherwise custom references
//item is [long name, short name]
var DATA_ITEMS_CORE =
[
	//items
	{"offset": 0x11D57, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_BALLOON_PLANS], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
	 	"requires":[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "name": "balloon-plans", "item": ["Balloon Plans","Balloon Plans"], "location": "Sutek Dungeon", "type":"main", "stolen":"no", "hints":[3,5,23,24,26,28,29,39,41,42]}, //we changed this to the first item
	{"offset": 0x11DC6, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_BROKEN_LENS], "restrictions": [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD],
		"requires":[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD], "name": "lens-broken", "item": ["Broken Lens","Broken Lens"], "location": "Gargoyle Museum", "type":"main", "stolen":"no", "hints":[15,18,24]},
	{"offset": 0x11E14, "flags": [0x41, 0xC0, 0x01], "id": [0x60], "restrictions": [ITEM_RUNE_COMPASSION, ITEM_LEATHER_HELM, ITEM_IRON_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		 "requires":[ITEM_RUNE_COMPASSION], "name": "moonstone-compassion", "item": ["Moonstone of Compassion","M. Compassion"], "location": "Shrine of Compassion", "type":"shrine", "stolen":"no", "hints":[1,4,6,18]},
	{"offset": 0x11E1E, "flags": [0x41, 0xC0, 0x01], "id": [0x5F], "restrictions": [ITEM_RUNE_HONESTY, ITEM_LEATHER_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "compassion":[0x00, 0xC3],
		 "requires":[ITEM_RUNE_HONESTY], "name": "moonstone-honesty", "item": ["Moonstone of Honesty","M. Honesty"], "location": "Shrine of Honesty", "type":"shrine", "stolen":"no", "hints":[1,4,7,18,25]},
	{"offset": 0x11E3C, "flags": [0x41, 0xC0, 0x01], "id": [0x64], "restrictions": [ITEM_RUNE_HONOR, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		 "requires":[ITEM_RUNE_HONOR], "name": "moonstone-honor", "item": ["Moonstone of Honor","M. Honor"], "location": "Shrine of Honor", "type":"shrine", "hints":[1,4,8,18]},
	{"offset": 0x11E46, "flags": [0x41, 0xC0, 0x01], "id": [0x66], "restrictions": [ITEM_RUNE_HUMILITY, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_SPARTAN_HELM, ITEM_MAGIC_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		 "requires":[ITEM_RUNE_HUMILITY], "name": "moonstone-humility", "item": ["Moonstone of Humility","M. Humility"], "location": "Shrine of Humility", "type":"shrine", "stolen":"no", "hints":[1,4,9,18,25]},
	{"offset": 0x11DE2, "flags": [0x41, 0xC0, 0x01], "id": [0x62], "restrictions": [ITEM_RUNE_JUSTICE, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		 "requires":[ITEM_RUNE_JUSTICE], "name": "moonstone-justice", "item": ["Moonstone of Justice","M. Justice"], "location": "Shrine of Justice", "type":"shrine", "hints":[1,4,10,18]},
	{"offset": 0x11DF1, "flags": [0x41, 0xC0, 0x01], "id": [0x63], "restrictions": [ITEM_RUNE_SACRIFICE, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		 "requires":[ITEM_RUNE_SACRIFICE], "name": "moonstone-sacrifice", "item": ["Moonstone of Sacrifice","M. Sacrifice"], "location": "Shrine of Sacrifice", "type":"shrine", "stolen":"no", "hints":[1,4,11,18]},
	{"offset": 0x11686, "flags": [0x41, 0xC0, 0x01], "id": [0x65], "restrictions": [ITEM_RUNE_SPIRITUALITY, ITEM_LEATHER_HELM, ITEM_CHAIN_COIF, ITEM_IRON_HELM, ITEM_SPIKED_HELM, ITEM_WINGED_HELM, ITEM_BRASS_HELM, ITEM_SPARTAN_HELM, ITEM_GOLD, ITEM_BALLOON_PLANS, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		 "requires":[ITEM_RUNE_SPIRITUALITY], "name": "moonstone-spirituality", "item": ["Moonstone of Spirituality","M. Spirituality"], "location": "Shrine of Spirituality", "type":"shrine", "stolen":"no", "hints":[1,12,18]},
	{"offset": 0x11E37, "flags": [0x41, 0xC0, 0x01], "id": [0x61], "restrictions": [ITEM_RUNE_VALOR, ITEM_MOONORB, ITEM_LEATHER_HELM, ITEM_IRON_HELM, ITEM_CHAIN_COIF, ITEM_GOLD, ITEM_SPELL, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		 "requires":[ITEM_RUNE_VALOR], "name": "moonstone-valor", "item": ["Moonstone of Valor","M. Valor"], "location": "Shrine of Valor", "type":"shrine", "stolen":"no", "hints":[1,4,13,18,25]},
	{"offset": 0x1192D, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_HONESTY], "restrictions": [],
		"requires":[], "name": "rune-honesty", "item": ["Rune of Honesty","R. Honesty"], "location": "Tomb of Beyvins", "type":"main", "stolen":"no", "hints":[1,3,7,17,18,23,26,32,37,40]}, //we changed this to the first item
	{"offset": 0x11E23, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_HONOR], "restrictions": [],
		"requires":[], "name": "rune-honor", "item": ["Rune of Honor","R. Honor"], "location": "Trinsic Town Center", "type":"main", "stolen":"no", "hints":[4,8,18,32,34]},
	{"offset": 0x10E56, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_JUSTICE], "restrictions": [],
		"requires":[], "name": "rune-justice", "item": ["Rune of Justice","R. Justice"], "location": "Potted Plant in Yew", "type":"main", "stolen":"no", "hints":[10,20,32,33]},
	{"offset": 0x10F14, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_SPIRITUALITY], "restrictions": [],
		"requires":[], "name": "rune-spirituality", "item": ["Rune of Spirituality","R. Spirituality"], "location": "Skara Brae North House", "type":"main", "stolen":"no", "hints":[12,16,32,33,34]},
	{"offset": 0x10F4F, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_VALOR], "restrictions": [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPELLBOOK, ITEM_SPIDERSILK, ITEM_SLEEPING_POWDER, ITEM_POWDER_KEG, ITEM_ENERGY_WAND, ITEM_SPELL, ITEM_ODD_CHEESE, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD],
		"requires":[], "name": "rune-valor", "item": ["Rune of Valor","R. Valor"], "location": "Jhelom Tavern", "type":"main", "stolen":"no", "hints":[13,20,25,34]},
	{"offset": 0x11C37, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_VORTEX_CUBE], "restrictions": [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK],
		"requires":[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD, SPELL_UNLOCK], "name": "vortexcube", "item": ["Vortex Cube","Vortex Cube"], "location": "Stonegate", "type":"main", "stolen":"no", "hints":[2,5,18,23,24,26,28,29,39,41,42]},

	//dialog items
	{"offset": 0x01, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_COMPASSION], "restrictions": [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPELLBOOK, ITEM_MOONORB, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[], "name": "rune-compassion", "item": ["Rune of Compassion","R. Compassion"], "location": "Pocket of Ariana", "type":"main", "stolen":"no", "hints":[5,6,19,33]}, //dialog special case - Ariana
	{"offset": 0x02, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_HUMILITY], "restrictions": [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[], "name": "rune-humility", "item": ["Rune of Humility","R. Humility"], "location": "Pocket of Antonio", "type":"main", "stolen":"no", "hints":[9,19,25]}, //dialog special case - Antonio
	{"offset": 0x03, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_RUNE_SACRIFICE], "restrictions": [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[], "name": "rune-sacrifice", "item": ["Rune of Sacrifice","R. Sacrifice"], "location": "Pocket of Selganor", "type":"main", "stolen":"no", "hints":[11,19,33,34]}, //dialog special case - Selganor
	{"offset": 0x0B, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_GARGISH_TEXT], "restrictions": [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[], "name": "pocket-captainjohn", "item": ["Gargish Text","Gargish Text"], "location": "Pocket of Captain John", "type":"main", "stolen":"no", "hints":[19,29,30,35,39]}, //dialog special case - Captain John
	{"offset": 0x0C, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_GARGOYLE_LENS], "restrictions": [ITEM_GARGISH_TEXT, ITEM_BROKEN_LENS, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[ITEM_GARGISH_TEXT, ITEM_BROKEN_LENS], "name": "pocket-lensmaker", "item": ["Gargoyle Lens","Gargoyle Lens"], "location": "Pocket of the Lensmaker", "type":"main", "stolen":"no", "hints":[15,16,19]}, //dialog special case - Gargoyle Lenscrafter
	{"offset": 0x0D, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_HUMAN_LENS], "restrictions": [ITEM_GARGISH_TEXT, ITEM_GARGOYLE_LENS, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_GLASS_SWORD],
		"requires":[ITEM_GARGISH_TEXT, ITEM_GARGOYLE_LENS, ITEM_GLASS_SWORD], "name": "pocket-ephemerides", "item": ["Human Lens","Human Lens"], "location": "Pocket of Ephemerides", "type":"main", "stolen":"no", "hints":[16,19,25,32]}, //dialog special case - Human Lenscrafter
];

var DATA_CHESTS_OVERWORLD =
[
	//standard chests
	{"offset": 0x10FA6, "flags": [0x8B, 0xCB, 0x0B], "id": [0xB3], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "britain-cowhouse-01", "item": ["Gold","Gold"], "location": "Britain Cow House", "type":"stack", "stolen" : "yes", "hints":[5,6,16,33]},
	{"offset": 0x110BE, "flags": [0x8D, 0xCD, 0x0D], "id": [0xB3], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "requires":[], "name": "britain-inn-01", "item": ["Gold","Gold"], "location": "Britain Inn", "type":"stack", "stolen" : "yes", "hints":[5,6,20,33]},
	{"offset": 0x10FF6, "flags": [0x83, 0xC3, 0x03], "id": [0x8E], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "requires":[], "name": "britain-bardhouse-01", "item": ["Blue Potion","Blue Potion"], "location": "Britain Bard House", "type":"stack", "stolen" : "yes", "hints":[5,6,16,33]},
	{"offset": 0x10FFA, "flags": [0x80, 0xC0, 0x01], "id": [0x76], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "requires":[], "name": "britain-bardhouse-02", "item": ["Lute","Lute"], "location": "Britain Bard House", "type":"solo", "stolen" : "yes", "hints":[5,6,16,33]},
	{"offset": 0x1164B, "flags": [0x80, 0xC0, 0x01], "id": [0x43], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK, ITEM_ODD_CHEESE], "requires":[], "name": "britain-guild-01", "item": ["Cheese","Cheese"], "location": "Britain Guild Shop", "type":"solo", "stolen" : "yes", "hints":[5,6,16,28,33]}, //added an item as it was empty
	{"offset": 0x11400, "flags": [0xBC, 0xFC, 0x3C], "id": [0xB3], "restrictions": [], "requires":[], "name": "bucsden-bottomlefthouse-01", "item": ["Gold","Gold"], "location": "Buccaneers Den Left House", "type":"stack", "stolen" : "yes", "hints":[16,22,25,29]}, //we changed this to the first item
	{"offset": 0x113B8, "flags": [0x80, 0xC0, 0x01], "id": [0x33], "restrictions": [], "requires":[], "name": "bucsden-budo-01", "item": ["Ring of Invisibility","Invis Ring"], "location": "Secret Budo House", "type":"solo", "stolen" : "yes", "hints":[16,22,23,25,29]},
	{"offset": 0x11032, "flags": [0x83, 0xC3, 0x03], "id": [0x8D], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "requires":[], "name": "castle-avatar-01", "item": ["Red Potion","Red Potion"], "location": "Avatar Room", "type":"stack", "stolen" : "no", "hints":[5,33,41]}, //we changed this to the first item
	{"offset": 0x10FBA, "flags": [0x80, 0xC0, 0x01], "id": [0x1B], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "requires":[], "name": "castle-lordbritish-01", "item": ["Main Gauche","Main Gauche"], "location": "Closet of Lord British", "type":"solo", "stolen" : "no", "hints":[5,33,41]},
	{"offset": 0x11062, "flags": [0x83, 0xC3, 0x03], "id": [0x2D], "restrictions": [ITEM_MOONORB, ITEM_SPELLBOOK], "requires":[], "name": "castle-nystful-01", "item": ["Energy Wand","Energy Wand"], "location": "Nystful Room", "type":"stack", "stolen" : "no", "hints":[5,33,41]}, //we changed this to the first item
	{"offset": 0x10F6F, "flags": [0x82, 0xC2, 0x02], "id": [0x7C], "restrictions": [], "requires":[], "name": "jhelom-easthouse-01", "item": ["Powder Keg","Powder Keg"], "location": "Jhelom East House", "type":"stack", "stolen" : "yes", "hints":[13,16,25,34]},
	{"offset": 0x11100, "flags": [0x8A, 0xCA, 0x0A], "id": [0x6A], "restrictions": [], "requires":[], "name": "minoc-basketweaver-01", "item": ["Torches","Torches"], "location": "Minoc Basket Weaver", "type":"stack", "stolen" : "yes", "hints":[11,33,34]},
	{"offset": 0x11110, "flags": [0x83, 0xC3, 0x03], "id": [0x67], "restrictions": [], "requires":[], "name": "minoc-gemcutter-01", "item": ["Gems","Gems"], "location": "Minoc Gem Cutter", "type":"stack", "stolen" : "yes", "hints":[11,16,33,34]},
	{"offset": 0x111A7, "flags": [0x8A, 0xCA, 0x0A], "id": [0x53], "restrictions": [], "requires":[], "name": "paws-spinner-01", "item": ["Spidersilk","Spidersilk"], "location": "House of Arbeth", "type":"stack", "stolen" : "yes", "hints":[14]}, //added an item as it was empty
	{"offset": 0x111BF, "flags": [0x8A, 0xCA, 0x0A], "id": [0xB3], "restrictions": [], "requires":[], "name": "paws-spinner-02", "item": ["Gold","Gold"], "location": "House of Arbeth", "type":"stack", "stolen" : "yes", "hints":[14]}, //added an item as it was empty
	{"offset": 0x11193, "flags": [0x80, 0xC0, 0x01], "id": [0x40], "restrictions": [], "requires":[], "name": "paws-upperrighthouse-01", "item": ["Mutton","Mutton"], "location": "Paws Tavern House", "type":"solo", "stolen" : "yes", "hints":[14,16]}, //added an item as it was empty
	{"offset": 0x1130D, "flags": [0x8C, 0xCC, 0x0C], "id": [0xB3], "restrictions": [], "requires":[], "name": "serpentshold-castle-01", "item": ["Gold","Gold"], "location": "Serpents Hold Castle", "type":"stack", "stolen" : "yes", "hints":[5,25,29,34,41]}, //we changed this to the first item
	{"offset": 0x113A5, "flags": [0x80, 0xC0, 0x01], "id": [0x3D], "restrictions": [], "requires":[], "name": "serpentshold-southhouse-01", "item": ["Grapes","Grapes"], "location": "Serpents Hold South House", "type":"solo", "stolen" : "yes", "hints":[5,16,25,29,34]}, //added an item to move the key down a slot
	{"offset": 0x11331, "flags": [0x80, 0xC0, 0x01], "id": [0x0A], "restrictions": [], "requires":[], "name": "serpentshold-upperlefthouse-01", "item": ["Curved Heater","Curved Heater"], "location": "Serpents Hold Left House", "type":"solo", "stolen" : "yes", "hints":[5,16,25,29,34]}, //we changed this to the first item
	{"offset": 0x1122A, "flags": [0x80, 0xC0, 0x01], "id": [0x1E], "restrictions": [], "requires":[], "name": "trinsic-mayorhouse-01", "item": ["Dagger","Dagger"], "location": "Trinsic Mayor House", "type":"solo", "stolen" : "yes", "hints":[8,16,22,26,32,34]},
	{"offset": 0x1129E, "flags": [0x83, 0xC3, 0x03], "id": [0x69], "restrictions": [], "requires":[], "name": "trinsic-southhouse-01", "item": ["Gold Nuggets","Gold Nuggets"], "location": "Trinsic South House", "type":"stack", "stolen" : "yes", "hints":[8,16,32,34]},

	//magic chests
	{"offset": 0x110A2, "flags": [0x8E, 0xCE, 0x0E], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "britain-bank-01", "item": ["Gold","Gold"], "location": "Britain Bank", "type":"stack", "stolen" : "yes", "hints":[5,6,26,33]},
	{"offset": 0x110A6, "flags": [0x88, 0xC8, 0x08], "id": [0x69], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "britain-bank-02", "item": ["Gold Nuggets","Gold Nuggets"], "location": "Britain Bank", "type":"stack", "stolen" : "yes", "hints":[5,6,26,33]},
	{"offset": 0x110AA, "flags": [0x91, 0xD1, 0x11], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "britain-bank-03", "item": ["Gold","Gold"], "location": "Britain Bank", "type":"stack", "stolen" : "yes", "hints":[5,6,26,33]},
	{"offset": 0x10F73, "flags": [0x80, 0xC0, 0x01], "id": [0x4A], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "jhelom-westhouse-03", "item": ["Spring Water","Spring Water"], "location": "Jhelom West House", "type":"solo", "stolen" : "yes", "hints":[13,16,25,34]}, //added an item to move the key down a slot
	{"offset": 0x11120, "flags": [0x8F, 0xCF, 0x0F], "id": [0x67], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "minoc-townhall-01", "item": ["Gems","Gems"], "location": "Minoc Town Hall", "type":"stack", "stolen" : "yes", "hints":[11,33,34]},
	{"offset": 0x11551, "flags": [0x80, 0xC0, 0x01], "id": [0x93], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "moonglow-musichall-01", "item": ["Black Potion","Black Potion"], "location": "Moonglow Music Hall", "type":"solo", "stolen" : "yes", "hints":[7,23,25,32]},
	{"offset": 0x1151D, "flags": [0x83, 0xC3, 0x03], "id": [0x6B], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "name": "moonglow-penumbra-01", "item": ["Sleeping Powder","Sleeping Powder"], "location": "House of Penumbra", "type":"stack", "stolen" : "yes", "hints":[7,24,25,32]}, //we changed this to the first item
	{"offset": 0x115B7, "flags": [0x80, 0xC0, 0x01], "id": [0x2C], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "name": "nicodemus-house-01", "item": ["Staff","Staff"], "location": "House of Nicodemus", "type":"solo", "stolen" : "yes", "hints":[23,24,42]},
	{"offset": 0x115BB, "flags": [0x85, 0xC5, 0x05], "id": [0x69], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "name": "nicodemus-house-02", "item": ["Gold Nuggets","Gold Nuggets"], "location": "House of Nicodemus", "type":"stack", "stolen" : "yes", "hints":[23,24,42]},
	{"offset": 0x1132D, "flags": [0x80, 0xC0, 0x01], "id": [0x2A], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "serpentshold-guardhouse-01", "item": ["3x Crossbow","3x Crossbow"], "location": "Serpents Hold Barracks", "type":"solo", "stolen" : "yes", "hints":[5,23,25,29,34]},

	//new standard chests
	{"offset": 0x115F0, "flags": [0x80, 0xC0, 0x01], "id": [0x7C], "restrictions": [], "requires":[], "name": "house-fighter-01", "item": ["Powder Keg","Powder Keg"], "location": "Fighter's House", "type":"solo", "stolen" : "yes", "hints":[16,42]},
	{"offset": 0x11D6A, "flags": [0x40, 0xC0, 0x01], "id": [0x07], "restrictions": [], "requires":[], "name": "gargoyle-nwhouse-01", "item": ["Spartan Helm","Spartan Helm"], "location": "Gargoyle North West House", "type":"solo", "stolen" : "no", "hints":[15,16]},
	{"offset": 0x10EF1, "flags": [0x98, 0xD8, 0x18], "id": [0x56], "restrictions": [], "requires":[], "name": "house-iolo-01", "item": ["Bolt","Bolt"], "location": "Iolo's House", "type":"stack", "stolen" : "no", "hints":[16,42]},
	{"offset": 0x115E1, "flags": [0x86, 0xC6, 0x06], "id": [0x2F], "restrictions": [], "requires":[], "name": "house-sinvraal-01", "item": ["Oil","Oil"], "location": "Sin'Vraal's House", "type":"stack", "stolen" : "yes", "hints":[15,16,42]},
	{"offset": 0x110CD, "flags": [0x80, 0xC0, 0x01], "id": [0x8D], "restrictions": [], "requires":[], "name": "cove-rudyom-01", "item": ["Red Potion","Red Potion"], "location": "Rudyom Shop", "type":"solo", "stolen" : "yes", "hints":[6,14,16,23,33]},
	{"offset": 0x11E19, "flags": [0x80, 0xC0, 0x01], "id": [0x3D], "restrictions": [], "requires":[], "name": "cove-pedestal-01", "item": ["Grapes","Grapes"], "location": "Cove Pedestal", "type":"solo", "stolen" : "yes", "hints":[4,6,14,18,33]},
	{"offset": 0x110C9, "flags": [0x80, 0xC0, 0x01], "id": [0x88], "restrictions": [], "requires":[], "name": "stonegate-upperfloor-01", "item": ["Fishing Rod","Fishing Rod"], "location": "Stonegate", "type":"solo", "stolen" : "no", "hints":[5,29,41,42]},
	
	//new magic chests
	{"offset": 0x10EA5, "flags": [0x80, 0xC0, 0x01], "id": [0x90], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "empathabbey-northhouse-01", "item": ["Green Potion","Green Potion"], "location": "Empath Abbey North House", "type":"stack", "stolen" : "yes", "hints":[5,16,33,40]},

	//quest items
	{"offset": 0x1175E, "flags": [0xC0, 0xC0, 0x01], "id": [0x5B], "restrictions": [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD], "name": "lycaeum-boardgamespot-01", "item": ["Book of Boardgames","Boardgames Book"], "location": "Lycaeum - Boardgame Spot", "type":"solo", "stolen" : "no", "hints":[2,5,18,24,32,36,41]},
	{"offset": 0x1174E, "flags": [0xC0, 0xC0, 0x01], "id": [0x5D], "restrictions": [ITEM_SPELLBOOK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_DISPEL_FIELD], "name": "lycaeum-ozspot-01", "item": ["Book of Oz","Book of Oz"], "location": "Lycaeum - Book of Oz Spot", "type":"main", "stolen" : "no", "hints":[2,5,18,24,32,36,41]},
	
	{"offset": 0x04, "flags": [0xC0, 0xC0, 0x01], "id": [0x3B], "restrictions": [ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_SPELL, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_BOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD, ITEM_BOOK_OZ],
		"requires":[], "name": "pocket-lord-british", "item": ["Snake Amulet","Snake Amulet"], "location": "Pocket of Lord British", "type":"solo", "stolen":"no", "hints":[5,19,33]}, //dialog special case - Lord British
];

var DATA_CHESTS_OVERWORLD_MAPPIECE =
[
	{"offset": 0x116D2, "flags": [0x80, 0xC0, 0x01], "id": [0x91], "restrictions": [], "requires":[], "name": "daggerisland-basement-01", "item": ["Orange Potion","Orange Potion"], "location": "Dagger Island Basement - Unlocked Chest", "type":"solo", "stolen" : "yes", "hints":[2,16,22,29,36,42]}, //added an item as it was empty
	{"offset": 0x116C2, "flags": [0x80, 0xC0, 0x01], "id": [0x28], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "daggerisland-basement-02", "item": ["Glass Sword","Glass Sword"], "location": "Dagger Island Basement - Locked Chest", "type":"solo", "stolen" : "yes", "hints":[2,16,22,29,36,42]},
	{"offset": 0x116C6, "flags": [0x80, 0xC0, 0x01], "id": [0x12], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "daggerisland-basement-03", "item": ["Leather Armor","Leather Armor"], "location": "Dagger Island Basement - Locked Chest", "type":"solo", "stolen" : "yes", "hints":[2,16,22,29,36,42]},
];

var DATA_CHESTS_DUNGEONS_MAPPIECE =
[
	{"offset": 0x116E6, "flags": [0xC0, 0xC0, 0x01], "id": [0xA0], "restrictions": [], "requires":[], "name": "daggerisland-basement-01", "item": ["Map Piece 4","Map Piece 4"], "location": "Dagger Island Basement - Unlocked Chest", "type":"solo", "stolen" : "yes", "hints":[2,16,22,29,36,42]}, //added an item as it was empty
	{"offset": 0x116C2, "flags": [0x80, 0xC0, 0x01], "id": [0x28], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "daggerisland-basement-02", "item": ["Glass Sword","Glass Sword"], "location": "Dagger Island Basement - Locked Chest", "type":"solo", "stolen" : "yes", "hints":[2,16,22,29,36,42]},
	{"offset": 0x116C6, "flags": [0x80, 0xC0, 0x01], "id": [0x12], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "daggerisland-basement-03", "item": ["Leather Armor","Leather Armor"], "location": "Dagger Island Basement - Locked Chest", "type":"solo", "stolen" : "yes", "hints":[2,16,22,29,36,42]},
];

var DATA_CHESTS_DUNGEON =
[
	//standard chests
	{"offset": 0x11D63, "flags": [0x80, 0xC0, 0x01], "id": [0x4C], "restrictions": [], "requires":[], "name": "dungeon-hythloth-captainjohn-01", "item": ["Juice","Juice"], "location": "House of Captain John", "type":"solo", "stolen" : "no", "hints":[16,22,30,35,39,42]}, //added an item as it was empty
	{"offset": 0x11742, "flags": [0x80, 0xC0, 0x01], "id": [0x38], "restrictions": [], "requires":[], "name": "dungeon-cyclops-F1-01", "item": ["Swamp Boots","Swamp Boots"], "location": "Cyclops Cave", "type":"solo", "stolen" : "no", "hints":[3,36]},
	{"offset": 0x11D23, "flags": [0x83, 0xC3, 0x03], "id": [0xB3], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "requires":[ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "name": "dungeon-piratecave-F4-01", "item": ["Gold","Gold"], "location": "Pirate Cave", "type":"stack", "stolen" : "no", "hints":[3,17,22,26,29,39]},
	{"offset": 0x11CCF, "flags": [0x87, 0xC7, 0x07], "id": [0xB3], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "requires":[ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "name": "dungeon-piratecave-F4-02", "item": ["Gold","Gold"], "location": "Pirate Cave", "type":"stack", "stolen" : "no", "hints":[3,17,22,26,29,39]},
	{"offset": 0x11C9F, "flags": [0x86, 0xC6, 0x06], "id": [0xB3], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "requires":[ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "name": "dungeon-piratecave-F4-03", "item": ["Gold","Gold"], "location": "Pirate Cave", "type":"stack", "stolen" : "no", "hints":[3,17,22,26,29,39]},
	{"offset": 0x11C93, "flags": [0x80, 0xC0, 0x01], "id": [0x08], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "requires":[ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "name": "dungeon-piratecave-F4-04", "item": ["Magic Helm","Magic Helm"], "location": "Pirate Cave", "type":"solo", "stolen" : "no", "hints":[3,17,22,26,29,39]}, //added an item as it was empty
	{"offset": 0x11CF7, "flags": [0x80, 0xC0, 0x01], "id": [0x31], "restrictions": [ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "requires":[ITEM_SHOVEL,ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "name": "dungeon-piratecave-F4-05", "item": ["Ring of Protection","Prot Ring"], "location": "Pirate Cave", "type":"solo", "stolen" : "no", "hints":[3,17,22,26,29,39]},
	{"offset": 0x119C0, "flags": [0xC0, 0xC0, 0x01], "id": [0xA3], "restrictions": [ITEM_SPELLBOOK,SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK,SPELL_UNLOCK], "name": "dungeon-wrong-mapchest-01", "item": ["Map Piece 7","Map Piece 7"], "location": "Wrong", "type":"solo", "stolen" : "no", "hints":[23,28,30,35,38]},

	{"offset": 0x11E41, "flags": [0xC0, 0xC0, 0x01], "id": [0xA4], "restrictions": [], "requires":[], "name": "overworld-shipwreck-01", "item": ["Map Piece 8","Map Piece 8"], "location": "Shipwreck", "type":"solo", "stolen" : "no", "hints":[4,22,25,29,40]},

	//magic chests
	{"offset": 0x11AAC, "flags": [0x80, 0xC0, 0x01], "id": [0x33], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "name": "britain-sewers-F3-01", "item": ["Ring of Invisibility","Invis Ring"], "location": "Phoenix Cave", "type":"solo", "stolen" : "no", "hints":[3,22,31,38,41]},
	{"offset": 0x11A9C, "flags": [0x80, 0xC0, 0x01], "id": [0x2E], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "name": "britain-sewers-F3-02", "item": ["Fire Wand","Fire Wand"], "location": "Phoenix Cave", "type":"solo", "stolen" : "no", "hints":[3,22,31,38,41]},
	{"offset": 0x11AA4, "flags": [0x88, 0xC8, 0x08], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK, SPELL_DISPEL_FIELD], "name": "britain-sewers-F3-03", "item": ["Gold","Gold"], "location": "Phoenix Cave", "type":"stack", "stolen" : "no", "hints":[3,22,31,38,41]},
	{"offset": 0x11911, "flags": [0x80, 0xC0, 0x01], "id": [0x28], "restrictions": [ITEM_SPELLBOOK,SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK,SPELL_UNLOCK], "name": "cave-bucsden-F2-01", "item": ["Glass Sword","Glass Sword"], "location": "Buccaneers Cave", "type":"solo", "stolen" : "no", "hints":[3,22,29,31,37]},
	{"offset": 0x11971, "flags": [0x98, 0xD8, 0x18], "id": [0xB3], "restrictions": [ITEM_SPELLBOOK,SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK,SPELL_UNLOCK], "name": "dungeon-destard-F2-01", "item": ["Gold","Gold"], "location": "Destard", "type":"stack", "stolen" : "no", "hints":[30,35,37]},
	{"offset": 0x11C4F, "flags": [0x80, 0xC0, 0x01], "id": [0x32], "restrictions": [ITEM_SPELLBOOK,SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK,SPELL_UNLOCK], "name": "crypts-moonglow-F4-01", "item": ["Ring of Regeneration","Regen Ring"], "location": "Moonglow Catacombs", "type":"solo", "stolen" : "no", "hints":[1,3,7,17,23,39,40]},

	//new standard chests
	{"offset": 0x11B47, "flags": [0x80, 0xC0, 0x01], "id": [0x29], "restrictions": [ITEM_SPELLBOOK,SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK,SPELL_UNLOCK], "name": "dungeon-kingstomb-01", "item": ["Boomerang","Boomerang"], "location": "Tomb of Kings", "type":"solo", "stolen" : "no", "hints":[1,3,15,21,28,36]},
	{"offset": 0x11BCB, "flags": [0xC0, 0xC0, 0x01], "id": [0x9D], "restrictions": [], "requires":[], "name": "dungeon-antmound-01", "item": ["Map Piece 1","Map Piece 1"], "location": "Ant Mound", "type":"solo", "stolen" : "no", "hints":[3,39]},
	{"offset": 0x118C9, "flags": [0x80, 0xC0, 0x01], "id": [0x18], "restrictions": [], "requires":[], "name": "dungeon-spider-01", "item": ["Spiked Collar","Spiked Collar"], "location": "Spider Cave", "type":"solo", "stolen" : "no", "hints":[3,37]},
	{"offset": 0x11736, "flags": [0x80, 0xC0, 0x01], "id": [0x15], "restrictions": [ITEM_SPELLBOOK,SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK,SPELL_UNLOCK], "name": "dungeon-shame-01", "item": ["Chain Mail","Chain Mail"], "location": "Shame", "type":"solo", "stolen" : "no", "hints":[21,29,30,35,36]},
	{"offset": 0x11815, "flags": [0x80, 0xC0, 0x01], "id": [0x1F], "restrictions": [], "requires":[], "name": "dungeon-swamp-01", "item": ["Mace","Mace"], "location": "Swamp Cave", "type":"solo", "stolen" : "no", "hints":[3,17,37]},
	{"offset": 0x11CAB, "flags": [0x80, 0xC0, 0x01], "id": [0x0D], "restrictions": [], "requires":[], "name": "dungeon-swamp-02", "item": ["Spike Shield","Spike Shield"], "location": "Swamp Cave", "type":"solo", "stolen" : "no", "hints":[3,17,39]},
	{"offset": 0x11B57, "flags": [0x80, 0xC0, 0x01], "id": [0x10], "restrictions": [ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "requires":[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "name": "dungeon-deceit-01", "item": ["Magic Shield","Magic Shield"], "location": "Deceit", "type":"solo", "stolen" : "no", "hints":[24,29,30,35,39]},
	{"offset": 0x11A68, "flags": [0x80, 0xC0, 0x01], "id": [0x17], "restrictions": [], "requires":[], "name": "dungeon-despise-01", "item": ["Magic Armor","Magic Armor"], "location": "Despise", "type":"solo", "stolen" : "no", "hints":[17,29,30,35,36]},
	{"offset": 0x1172E, "flags": [0x80, 0xC0, 0x01], "id": [0x8F], "restrictions": [], "requires":[], "name": "britain-sewers-F1-01", "item": ["Yellow Potion","Yellow Potion"], "location": "Britain Sewers", "type":"solo", "stolen" : "no", "hints":[2,5,31,38,41]},

	//dialog items
	//dialog special case - Phoenix
	{"offset": 0x05, "flags": [0xC0, 0xC0, 0x01], "id": [ITEM_GUILD_BELT], "restrictions": [ITEM_SPELLBOOK, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, SPELL_DISPEL_FIELD],
		"requires":[ITEM_SPELLBOOK,SPELL_DISPEL_FIELD], "name": "pocket-phoenix", "item": ["Guild Belt","Guild Belt"], "location": "Pocket of Phoenix", "type":"main", "stolen":"no", "hints":[3,19,22,24,38,41]},

	//dialog special case - Ybarra
	{"offset": 0x06, "flags": [0xC0, 0xC0, 0x01], "id": [0xA1], "restrictions": [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[ITEM_GUILD_BELT], "name": "pocket-ybarra", "item": ["Map Piece 5","Map Piece 5"], "location": "Pocket of Ybarra", "type":"solo", "stolen":"no", "hints":[17,19,22,27,29,30,35,39]},
	
	//dialog special case - Whitsaber
	{"offset": 0x07, "flags": [0xC0, 0xC0, 0x01], "id": [0x9E], "restrictions": [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[ITEM_GUILD_BELT], "name": "pocket-whitsaber", "item": ["Map Piece 2","Map Piece 2"], "location": "Pocket of Whitsaber", "type":"solo", "stolen":"no", "hints":[4,8,19,22,32,34]},

	//dialog special case - Arturos
	{"offset": 0x08, "flags": [0xC0, 0xC0, 0x01], "id": [0x9F], "restrictions": [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[ITEM_GUILD_BELT], "name": "pocket-arturos", "item": ["Map Piece 3","Map Piece 3"], "location": "Pocket of Arturos", "type":"solo", "stolen":"no", "hints":[4,19]},

	//dialog special case - Morchella
	{"offset": 0x09, "flags": [0xC0, 0xC0, 0x01], "id": [0xA2], "restrictions": [ITEM_GUILD_BELT, ITEM_MAGIC_SHIELD, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER],
		"requires":[ITEM_GUILD_BELT], "name": "pocket-morchella", "item": ["Map Piece 6","Map Piece 6"], "location": "Pocket of Morchella", "type":"solo", "stolen":"no", "hints":[5,19,22,25,29,34]},

	//dialog special case - Homer
	{"offset": 0x0A, "flags": [0xC0, 0xC0, 0x01], "id": [0xA5], "restrictions": [ITEM_GUILD_BELT, ITEM_GOLD, ITEM_GOLD_NUGGET, ITEM_GEMS, ITEM_TORCH, ITEM_SPIDERSILK, ITEM_OIL, ITEM_ARROW, ITEM_BOLT, ITEM_SLEEPING_POWDER, ITEM_MAP_1, ITEM_MAP_2, ITEM_MAP_3, ITEM_MAP_4, ITEM_MAP_5, ITEM_MAP_6, ITEM_MAP_7, ITEM_MAP_8],
		"requires":[ITEM_GUILD_BELT, ITEM_MAP_1, ITEM_MAP_2, ITEM_MAP_3, ITEM_MAP_4, ITEM_MAP_5, ITEM_MAP_6, ITEM_MAP_7, ITEM_MAP_8], "name": "pocket-homer", "item": ["Map Piece 9","Map Piece 9"], "location": "Pocket of Homer", "type":"solo", "stolen":"no", "hints":[19,20,22,25,29]},
];

var DATA_CHESTS_NO_SPELLS =
[
	//add black potion item to xiao shop chest
	{"offset": 0x1146A, "flags": [0x80, 0xC0, 0x01], "id": [0x93], "restrictions": [], "requires":[], "name": "moonglow-xiao-01", "item": ["Black Potion","Black Potion"], "location": "Xiao Shop", "type":"solo", "stolen" : "yes", "hints":[16,25,28,32]}, //added an item as it was empty
	//add red potion item to horance shop chest
	{"offset": 0x10F04, "flags": [0x80, 0xC0, 0x01], "id": [0x8D], "restrictions": [], "requires":[], "name": "skarabrae-horance-01", "item": ["Red Potion","Red Potion"], "location": "Horance Shop", "type":"solo", "stolen" : "yes", "hints":[12,16,25,29,32,33,34]},
];

var DATA_CHESTS_SPELLS =
[
	//add dispel spell item to xiao shop chest
	{"offset": 0x1146A, "flags": [0xCF, 0xCF, 0x0F], "id": [0xB8], "restrictions": [], "requires":[], "name": "moonglow-xiao-01", "item": ["Spell of Dispel Field","Dispel Field"], "location": "Xiao Shop", "type":"spell", "stolen" : "no", "hints":[16,25,28,32]}, //added an item as it was empty
	//add unlock spell item to horance shop chest
	{"offset": 0x10F04, "flags": [0xCA, 0xCA, 0x0A], "id": [0xB8], "restrictions": [], "requires":[], "name": "skarabrae-horance-01", "item": ["Spell of Unlock","Unlock"], "location": "Horance Shop", "type":"spell", "stolen" : "no", "hints":[12,16,25,29,32,33,34]},
];

var DATA_CHESTS_NO_SHERRY_ITEM =
[
	//add cheese to wine cellar in skara brae
	{"offset": 0x117CA, "flags": [0x80, 0xC0, 0x01], "id": [0x43], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "skarabrae-winecellar-01", "item": ["Cheese","Cheese"], "location": "Skara Brae Wine Cellar", "type":"solo", "stolen" : "yes", "hints":[2,12,26,32,33,34,36,40]},
];

var DATA_CHESTS_SHERRY_ITEM =
[
	//add odd cheese to wine cellar in skara brae
	{"offset": 0x117CA, "flags": [0xC0, 0xC0, 0x01], "id": [0x57], "restrictions": [ITEM_SPELLBOOK, SPELL_UNLOCK], "requires":[ITEM_SPELLBOOK, SPELL_UNLOCK], "name": "skarabrae-winecellar-01", "item": ["Odd Cheese","Odd Cheese"], "location": "Skara Brae Wine Cellar", "type":"main", "stolen" : "no", "hints":[2,12,26,32,33,34,36,40]},
];

var DATA_HINT_TEXT =
[
	" is somewhere.", //0 - locations with this cannot have hints
	" is in a sacred place.", //1
	" is in a basement or cellar.", //2
	" is in a cave or catacombs.", //3
	" may be enjoying the weather.", //4
	" is in or near a castle.", //5
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
	" may be in a house or shop.", //16
	" may require Swamp Boots.", //17
	" is on a pedestal.", //18
	" is in a pocket.", //19
	" may be in a tavern or inn.", //20
	" may require the spell Unlock.", //21
	" is among pirate possessions.", //22
	" may require finding a secret.", //23
	" may require the spell Dispel.", //24
	" is on an island.", //25
	" may require explosives.", //26
	" may require some cheese.", //27
	" may require using a switch.", //28
	" may require sailing or flying.", //29
	" is in a dungeon.", //30
	" is in or below the sewers.", //31
	" is in a place of Truth.", //32
	" is in a place of Love.", //33
	" is in a place of Courage.", //34
	" is in a place of anti-virtue.", //35
	" is one floor underground.", //36
	" is two floors underground.", //37
	" is three floors underground.", //38
	" is four floors underground.", //39
	" may be haunted.", //40
	" is in or under a castle.", //41
	" is in a secluded location." //42
];

var DATA_HINT_LOCATIONS =
[
	{"offset":0x204C1, "size":32,  "type":"scroll",  "name":"Scroll - Beyvins Tomb"}, //0x204C1 - scroll - With love from cousin Manrel - 0x20 (32)
	{"offset":0x2053D, "size":43,  "type":"scroll",  "name":"Scroll - Chuckles #2"}, //0x2053D - scroll - Chuckles scroll #2 - 0x2B (43)
	{"offset":0x203A6, "size":44,  "type":"scroll",  "name":"Sign - Tomb of Kings"}, //0x203A6 - tomb of kings - within this chamber rest the bones of kings - 0x2C (44)
	{"offset":0x205BE, "size":53,  "type":"scroll",  "name":"Scroll - Chuckles #4"}, //0x205BE - scroll - Chuckles scroll #4 - 0x35 (53)
	{"offset":0x01,    "size":60,  "type":"dialog",  "name":"Dialog - Smith the Horse"},
	{"offset":0x20670, "size":69,  "type":"scroll",  "name":"Scroll - Chuckles #6"}, //0x20670 - scroll - Chuckles scroll #6 - 0x45 (69)
	{"offset":0x2351A, "size":72,  "type":"scroll",  "name":"Grave - Husband Killer"}, //0x2351A - grave - though she outlanded husbands five - 0x48 (72)
	{"offset":0x24587, "size":73,  "type":"scroll",  "name":"Scroll - Yew Certificate"}, //0x2452C - yew permission scroll - 0xA4 (164) however we write the hint at 24587 - 49(73)
	{"offset":0x2046F, "size":81,  "type":"scroll",  "name":"Scroll - Lord British Notes"}, //0x2046F - scroll - Lord British's Notes - 0x51 (81)
	{"offset":0x20569, "size":84,  "type":"scroll",  "name":"Scroll - Chuckles #3"}, //0x20569 - scroll - Chuckles scroll #3 - 0x54 (84)
	{"offset":0x204E2, "size":90,  "type":"scroll",  "name":"Scroll - Chuckles #1"}, //0x204E2 - scroll - Chuckles scroll #1 - 0x5A (90)
	{"offset":0x230EF, "size":92,  "type":"scroll",  "name":"Grave - Birthday"}, //0x230EF - grave - on his wifes birthday - 0x5C (92)
	{"offset":0x206B6, "size":101, "type":"scroll",  "name":"Scroll - Chuckles #7"}, //0x206B6 - scroll - Chuckles scroll #7 - 0x65 (101)
	{"offset":0x205F4, "size":123, "type":"scroll",  "name":"Scroll - Chuckles #5"}, //0x205F4 - scroll - Chuckles scroll #5 - 0x7B (123)
	{"offset":0x2299E, "size":152, "type":"scroll",  "name":"Book - Good Advice"}, //0x2297E - book - dilzals almanac of good advice - 0xB8 (184) //0x2299E - book - dilzals almanac of good advice - 0x98 (152) (minus title)
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
	//0x2314C - grave - golden lads and lasses must - 0x3F (63)
	//0x2318C - grave - this great musician - 0x4A (74)
	//0x231D7 - grave - here lies johns body - 0x57 (87)
	//0x2322F - grave - hinges rusty - 0x53 (83)
	//0x23283 - grave - here lies a man named ed - 0x3C (60)
	//0x244AC - grave - here lies captain hawkins - 0x3E (62)
	//0x228A8 - book - crossbow marksman - 0xD5 (213)
	//0x20826 - book - huberts hair raising adventure - 0xEB (235)
	//0x20729 - book - baldwins big book of baking - 0xFC (251)
	//0x22A37 - book - plant lore - 0x114 (276)
	//0x2276D - book - of dreams and visions - 0x13A (314)

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
	0x12, 0x13, 0x14, 0x17, 0x1B, 0x1D, 0x20, 0x21, 0x23, 0x24, 0x27, 0x30, 0x31, 0x35, 0x37, 0x39,
];

var DATA_SPAWNER_WILD_GROUP =
[
	0x76, 0x77, 0x79, 0x92, 0x93, 0x97, 0x9B, 0xA4, 0xA7, 0xB1,
	0x94, 0x9D, 0xA0, 0xA1, 0xA3, 0xB0, 0xB5, 0xB9,
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
	0x4E, 0x4F
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
var DATA_ENEMY_SPELLS_HARD	 = [0x18,0x20,0x21,0x24,0x25,0x26,0x2A];
var DATA_ENEMY_SPELLS_ALL	 = [	0x03, //Harm
									0x07, //Magic Arrow
									0x08, //Poison
									0x09, //Sleep
									0x0B, //Curse
									0x0C, //Fireball
									//0x13, //Mass Sleep - not added as it has the potential to just insta-warp you to the castle on impact
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
									//0x2C, //Wing Strike - not added as it only hits non-player characters
									//0x2E, //Death Wind - Insta-kill
									//0x2F, //Mass Charm - not added as it has the potential to just insta-warp you to the castle on impact
									//0x30, //Mass Destroy - Insta-kill
									//0x33, //Tremor - not added as it only hits non-player characters
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

var DATA_CASTLE_BRITANNIA_LOCATIONS =
[
	0x10FBE+2, 0x10FC2+2, 0x10FC6+2, 0x10FB2+2, 0x10FB6+2, //Lord British's Closet
	0x11036+2, 0x1103A+2, 0x1103E+2, 0x11042+2, 0x11046+2, 0x1104A+2, 0x1104E+2, 0x11052+2, 0x11056+2, 0x1105A+2, 0x1105E+2, //Avatar Room
	0x1106A+2, //Nystful Room
	0x10FAA+2, //NW Tower
	0x11096+2, 0x1109A+2, 0x11092+2, 0x1109E+2, //SE Storage
	0x10FAE+2, //Kitchen

];

var DATA_OVERWORLD_LOOT_LOCATIONS =
[
	0x11627+2, //britain - clothier
	0x11E0A+2, 0x11E0F+2, 0x11DFB+2, 0x11E00+2, 0x11E05+2, //britain - graveyard
	0x115FF+2, //britain - healer
	0x110D5+2, 0x110D9+2, //cove
	0x10F6B+2, 0x10F7F+2, //jhelom
	0x10E2E+2, 0x10E4A+2, 0x10E42+2, 0x10E3E+2, 0x10E3A+2, //yew
	0x10EF9+2, 0x10EF5+2, //iolo house
	0x10EFD+2, 0x11DDD+2, 0x11DD3+2, 0x11DD8+2, //empath abbey
	0x10EB1+2, 0x10E71+2, 0x10E79+2, 0x10E7D+2, 0x10E81+2, 0x10E85+2, 0x10E89+2, 0x10E8D+2, 0x10E91+2, 0x10E95+2, 0x10E99+2, 0x10E9D+2, 0x10EA1+2, //empath abbey - mortician
	0x1112C+2, 0x110F0+2, 0x110F4+2, 0x110EC+2, 0x11144+2, 0x11154+2, 0x11160+2, 0x11164+2, 0x11168+2, 0x1116C+2, 0x11134+2, 0x11138+2, //minoc
	0x112A2+2, 0x11262+2, 0x11266+2, 0x1126A+2, 0x1125A+2, 0x1125E+2, 0x1122E+2, 0x11232+2, 0x11236+2, 0x1123A+2, 0x11202+2, 0x11206+2, 0x1120A+2, 0x11216+2, 0x1121A+2, //trinsic
	0x11447+2, 0x1144B+2, 0x1144F+2, 0x11453+2, 0x11457+2, 0x1142F+2, 0x1142B+2, 0x11427+2, 0x11E32+2, //new magincia
	0x11404+2, 0x113E0+2, 0x113C8+2, 0x113E4+2, 0x113E8+2, 0x113BC+2, 0x113C0+2, 0x113C4+2, //buccaneer's den
	0x11339+2, 0x1133D+2, 0x11341+2, 0x11311+2, 0x11315+2, 0x112E5+2, 0x112E9+2, 0x112ED+2, 0x112F1+2, 0x112F5+2, 0x112F9+2, 0x112FD+2, 0x11301+2, 0x11305+2, 0x11309+2, //serpent's hold
	0x1158D+2, 0x11591+2, 0x11595+2, 0x11561+2, 0x11599+2, 0x1159D+2, 0x115A1+2, 0x1156D+2, //moonglow - south
	0x114E2+2, 0x114E6+2, 0x11492+2, 0x11496+2, 0x1149A+2, 0x114BE+2, 0x114A2+2, 0x114A6+2, 0x114AA+2, 0x114EA+2, 0x114EE+2, //moonglow - north
	0x114FA+2, 0x114FE+2, 0x11502+2, 0x11506+2, 0x1150A+2, 0x1150E+2, 0x11512+2, //lycaeum
	0x11472+2, 0x11476+2, 0x1147A+2, 0x1147E+2, 0x11482+2, 0x11486+2, 0x1148A+2, 0x1148E+2, //moonglow - xiao
	0x115E5+2, 0x115E9+2, //sin vraal
	0x115C6+2, 0x115CA+2, 0x116EA+2, 0x116EE+2, 0x116D6+2, 0x116DA+2, 0x116DE+2, 0x116B2+2, 0x116B6+2, 0x116BA+2, 0x116BE+2,//bonn
];

var DATA_OVERWORLD_LOOT_LOCATIONS_MAGIC =
[
	0x10EA9+2, 0x10EAD+2, //empath abbey
	0x11555+2, 0x11559+2, 0x1155D+2, //moonglow - south
	0x11531+2, 0x11535+2, 0x11539+2, 0x1153D+2, 0x11541+2, 0x11545+2, 0x11549+2, 0x1154D+2, 0x11521+2, 0x11525+2, 0x11529+2, 0x1152D+2, //moonglow - penumbra
	0x116CA+2, 0x116CE+2, //bonn
];

var DATA_UNDERWORLD_LOOT_LOCATIONS =
[
	0x118DD+2, 0x118E1+2, 0x118E5+2, 0x118E9+2, 0x118ED+2, 0x118CD+2, 0x118D1+2, 0x118D5+2, 0x118D9+2, //spider cave - F2
	0x11756+2, //cyclops cave - F1
	0x1169A+2, 0x1169E+2, 0x116A2+2, 0x116A6+2, 0x116AA+2, 0x116AE+2, //despise - F2
	0x119D8+2, 0x119DC+2, 0x119E0+2, 0x119E4+2, 0x119E8+2, 0x119EC+2, //despise - F4
	0x11C6B+2, 0x11C6F+2, 0x11C73+2, 0x11C77+2, 0x11C7B+2, 0x11C7F+2, 0x11C83+2, 0x11C87+2, 0x11C8B+2, //swamp cave - F4
	0x11B5B+2, 0x11B5F+2, 0x11B73+2, 0x11B77+2, 0x11B7B+2, //deciet - F4
	0x118FD+2, 0x11901+2, 0x11905+2, 0x11AB0+2, 0x11AB8+2, //sewers - F2
	0x11B14+2, 0x11B18+2, 0x11B1C+2, 0x11B20+2, 0x11B30+2, 0x11B34+2, 0x11B38+2, 0x11B3C+2, //sewers - F3
	0x11945+2, //buccaneer's cave - F2
	0x1197D+2, 0x11981+2, 0x11985+2, 0x11989+2, 0x1198D+2, //destard - F2
	0x117DE+2, 0x117E2+2, 0x117E6+2, 0x117EA+2, 0x117EE+2, 0x117F2+2, 0x117F6+2, //pirate cave - F1
	0x11A00+2, 0x11A18+2, //ant mound - F3
	0x11BC3+2, 0x11BC7+2, //ant mound - F4
	0x11B8B+2, //tomb of kings
	0x11786+2, 0x11796+2, 0x1179E+2, 0x1177A+2, 0x1172A+2, 0x11722+2, 0x11716+2, 0x1171E+2, 0x1170A+2, 0x11706+2, 0x11702+2, //moonglow catacombs - F1
	0x116FA+2, 0x116F2+2, 0x116F6+2, 0x116FE+2, 0x11712+2, 0x1171A+2, 0x1174A+2, 0x1175A+2, 0x1176A+2, 0x1176E+2, 0x11772+2, //moonglow catacombs - F1
	0x1177E+2, 0x117A6+2, 0x117D2+2, 0x11792+2, 0x1178E+2, 0x1178A+2, 0x11776+2, 0x117B6+2, 0x1179A+2, //moonglow catacombs - F1
	0x1191D+2, 0x11925+2, 0x11939+2, 0x1193D+2, 0x11929+2, 0x11931+2, //moonglow catacombs - F2
	0x11AC8+2, //moonglow catacombs - F3

];

var DATA_UNDERWORLD_LOOT_LOCATIONS_MAGIC =
[
	0x1173E+2, 0x1173A+2, 0x11732+2, //shame - F1
	0x119C4+2, //wrong - F3
	0x11AA8+2, 0x11A38+2, //sewers - F3
	0x11915+2, //buccaneer's cave - F2
	0x11D5B+2, //sutek - F4
	0x11D2F+2, 0x11C8F+2, 0x11CFB+2, 0x11CFF+2, //pirate cave - F4
	0x11C53+2, 0x11C57+2, 0x11C5B+2, //moonglow catacombs - F4
];

var DATA_CASTLE_BRITANNIA_ITEMS = 
[
	{	name:			"all",
		weight:0,
		items:			[0x01,0x02,0x06,0x09,0x0C,0x11,0x12,0x13,0x15,0x37,0x1A,0x19,0x1B,0x1F,0x23,0x2C,0x2D,0x2F, 0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x6A, 0x3D,0x3E,0x3F,0x40,0x41,0x42,0x43,0x44,0x47,0x4A,0x4B,0x4C,0x8D,0x8F,0xB3],
		quantity:		[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x03,0x08, 0x0A,0x0A,0x0A,0x0A,0x0A,0x0A,0x0A,0x0A,0x1E,0x1E,0x0A, 0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x04,0x04,0x04]},

	{	name:			"combat",
		weight:2,
		items:			[0x01,0x02,0x06,0x09,0x0C,0x11,0x12,0x13,0x15,0x37,0x1A,0x19,0x1B,0x1F,0x23,0x2C,0x2D,0x2F],
		quantity:		[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x03,0x08]},

	{	name:			"reagents",
		weight:4,
		items:			[0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54],
		quantity:		[0x0A,0x0A,0x0A,0x0A,0x0A,0x0A,0x0A,0x0A]},

	{	name:			"misc",
		weight:6,
		items:			[0x55,0x56,0x6A,0x3D,0x3E,0x3F,0x40,0x41,0x42,0x43,0x44,0x47,0x4A,0x4B,0x4C,0x8D,0x8F,0xB3],
		quantity:		[0x1E,0x1E,0x0A,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x06,0x04,0x04,0x04]},
];

var DATA_OVERWORLD_LOOT_ITEMS = 
[
	{	name:			"food",
		weight:6,
		items:			[0x3D,0x3E,0x3F,0x40,0x41,0x42,0x43,0x44,0x47,0x4A,0x4B,0x4C,0x78,0x89],
		quantity:		[0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03]},

	{	name:			"potions",
		weight:8,
		items:			[0x8D,0x8E,0x8F,0x90,0x91,0x92,0x93,0x94],
		quantity:		[0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03]},

	{	name:			"gold_common",
		weight:3,
		items:			[0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3],
		quantity:		[0x04, 0x06, 0x08, 0x0A, 0x0C, 0x0E, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1A, 0x1C, 0x1E]},
	
	{	name:			"gold_rare",
		weight:1,
		items:			[0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3],
		quantity:		[0x20, 0x24, 0x26, 0x28, 0x2A, 0x2C, 0x2E, 0x30, 0x34, 0x36, 0x38, 0x3A, 0x3C, 0x3F]},

	{	name:			"consumables",
		weight:8,
		items:			[0x55,0x56,0x6A],
		quantity:		[0x0F,0x0F,0x08]},

	{	name:			"armor",
		weight:4,
		items:			[0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F,0x10,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x37,0x38,0x39],
		quantity:		[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01]},
		
	{	name:			"weapons",
		weight:4,
		items:			[0x19,0x1A,0x1B,0x1C,0x1D,0x1E,0x1F,0x20,0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2A,0x2B,0x2C,0x2D,0x2E,0x2F],
		quantity:		[0x01,0x01,0x01,0x03,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x03]},

	{	name:			"rings",
		weight:1,
		items:			[0x31,0x32,0x33],
		quantity:		[0x01,0x01,0x01]},

	{	name:			"reagents",
		weight:8,
		items:			[0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54],
		quantity:		[0x04,0x04,0x04,0x04,0x04,0x04,0x04,0x04]},

	{	name:			"misc",
		weight:6,
		items:			[0x67,0x6B,0x76,0x77,0x79,0x7C],
		quantity:		[0x05,0x03,0x01,0x01,0x01,0x02]},
];

var DATA_UNDERWORLD_LOOT_ITEMS = 
[
	{	name:			"food",
		weight:2,
		items:			[0x3D,0x3E,0x3F,0x40,0x41,0x42,0x43,0x44,0x47,0x4A,0x4B,0x4C,0x78,0x89],
		quantity:		[0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03]},

	{	name:			"potions",
		weight:8,
		items:			[0x8D,0x8E,0x8F,0x90,0x91,0x92,0x93,0x94],
		quantity:		[0x03,0x03,0x03,0x03,0x03,0x03,0x03,0x03]},

	{	name:			"gold_common",
		weight:4,
		items:			[0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3],
		quantity:		[0x04, 0x06, 0x08, 0x0A, 0x0C, 0x0E, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1A, 0x1C, 0x1E]},
	
	{	name:			"gold_rare",
		weight:2,
		items:			[0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3, 0xB3],
		quantity:		[0x20, 0x24, 0x26, 0x28, 0x2A, 0x2C, 0x2E, 0x30, 0x34, 0x36, 0x38, 0x3A, 0x3C, 0x3F]},

	{	name:			"consumables",
		weight:8,
		items:			[0x55,0x56,0x6A],
		quantity:		[0x0F,0x0F,0x08]},

	{	name:			"armor",
		weight:6,
		items:			[0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F,0x10,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x37,0x38,0x39],
		quantity:		[0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01]},
		
	{	name:			"weapons",
		weight:6,
		items:			[0x19,0x1A,0x1B,0x1C,0x1D,0x1E,0x1F,0x20,0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2A,0x2B,0x2C,0x2D,0x2E,0x2F],
		quantity:		[0x01,0x01,0x01,0x03,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x03]},

	{	name:			"rings",
		weight:1,
		items:			[0x31,0x32,0x33],
		quantity:		[0x01,0x01,0x01]},

	{	name:			"reagents",
		weight:8,
		items:			[0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54],
		quantity:		[0x04,0x04,0x04,0x04,0x04,0x04,0x04,0x04]},

	{	name:			"misc",
		weight:4,
		items:			[0x67,0x6B,0x76,0x77,0x79,0x7C],
		quantity:		[0x05,0x03,0x01,0x01,0x01,0x02]},
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
