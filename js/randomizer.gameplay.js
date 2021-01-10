function fixAISpellListBug(rom)
{
    //this fixes an off-by-one error in the code that prevents the SNES AI from being able to access all of their assigned spells
    rom[0x4D09] = 0xEA;
}

function fixSpiders(rom)
{
    //gives spiders paralyze instead of magic arrow (this offends me that they gave them magic arrow when they originally had web)
    rom[0x16647] = 0x1B;
}

function setPoisionFlash(buffer, flashSelection)
{
    var rom = new Uint8Array(buffer);

    if(flashSelection == 1)
    {
        rom.set([0x62, 0x00],0x1B5A0);
    }
    else if(flashSelection == 2)
    {
        rom.set([0x00, 0x00],0x1B5A0);
    }

    fixChecksum(rom);
	return rom;
}

function easyKarmaMode(rom)
{
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
    var timeMultiplier = 0x00; //0 and 1=default, 2=2x, 3=3x, 4=4x
    var dawnTime = 0x06;
    var duskTime = 0x13;

    if(desiredLength == 1)
    {
        timeMultiplier = 0x02;
        dawnTime = 0x00;
        duskTime = 0xFF;
    }
    else if(desiredLength == 2)
    {
        timeMultiplier = 0x02;
    }
    else if(desiredLength == 3)
    {
        timeMultiplier = 0x03;
    }

    //branch function at (BA30) to a new space in code (FC87)
    rom.set([0x20, 0x87, 0xFC, 0xEA, 0xEA, 0xEA],0xBA30); //jsr to FC87

    //load hour data, branch if <5 or >12
    rom.set([   0xB5, 0x51, //load hour time
                0xC9, dawnTime, 0x90, 0x12, //compare and branch if less than 6
                0xC9, duskTime, 0xB0, 0x0E, //compare and branch if greater than 12
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
}

function adjustCampingRoomCheck(rom)
{
    rom.set([0x80, 0x1C],0xB651);
    rom.set([0x20, 0x39, 0xB8],0xB66F);
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