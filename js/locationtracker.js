const TEXT_COLOR_OFF = "rgb(224, 192, 192)";
const TEXT_COLOR_ON = "rgb(51, 51, 51)";

function pageInit()
{
    setItemStatusSingle(    ".tracker_item_bookofoz", ".tracker_requiresbook:checkbox", "tracker_requiresbook", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_bookofboardgames", ".tracker_requiresboardgames:checkbox", "tracker_requiresboardgames", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_sherry", ".tracker_requires_sherry:checkbox", "tracker_requires_sherry", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_gargoylelens", ".tracker_requires_gargoylelens:checkbox", "tracker_requires_gargoylelens", TEXT_COLOR_ON, TEXT_COLOR_OFF);

    setItemStatusSingle(    ".tracker_item_runecompassion", ".tracker_requires_runecompassion:checkbox", "tracker_requires_runecompassion", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_runehonor", ".tracker_requires_runehonesty:checkbox", "tracker_requires_runehonesty", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_runehonesty", ".tracker_requires_runehonor:checkbox", "tracker_requires_runehonor", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_runehumility", ".tracker_requires_runehumilty:checkbox", "tracker_requires_runehumilty", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_runejustice", ".tracker_requires_runejustice:checkbox", "tracker_requires_runejustice", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_runesacrifice", ".tracker_requires_runesacrifice:checkbox", "tracker_requires_runesacrifice", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_runespirituality", ".tracker_requires_runespirituality:checkbox", "tracker_requires_runespirituality", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingle(    ".tracker_item_runevalor", ".tracker_requires_runevalor:checkbox", "tracker_requires_runevalor", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    
    setItemStatusDouble(    ".tracker_spell_dispelfield", ".tracker_blockedbyfield:checkbox", "tracker_blockedbyfield",
                            ".tracker_spell_unlock", ".tracker_requires_unlockandfield:checkbox", "tracker_requires_unlockandfield", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    
    setItemStatusDouble(    ".tracker_spell_unlock", ".tracker_locked:checkbox", "tracker_locked",
                            ".tracker_spell_dispelfield", ".tracker_requires_unlockandfield:checkbox", "tracker_requires_unlockandfield", TEXT_COLOR_ON, TEXT_COLOR_OFF);

    setItemStatusDouble(    ".tracker_item_brokenlens", ".tracker_requires_brokenlens:checkbox", "tracker_requires_brokenlens",
                            ".tracker_item_gargishtext", ".tracker_requires_brokenlensandgargishtext:checkbox", "tracker_requires_brokenlensandgargishtext", TEXT_COLOR_ON, TEXT_COLOR_OFF);

    setItemStatusDouble(    ".tracker_item_gargishtext", ".tracker_requires_gargishtext:checkbox", "tracker_requires_gargishtext",
                            ".tracker_item_brokenlens", ".tracker_requires_brokenlensandgargishtext:checkbox", "tracker_requires_brokenlensandgargishtext", TEXT_COLOR_ON, TEXT_COLOR_OFF);
}

$( window ).on( "load", pageInit );

$(document).ready(function()
{
    toggleClassDisplayPropOnClick(".tracker_locations_main", "main_item");
    toggleClassDisplayPropOnClick(".tracker_locations_overworld", "overworld_item");
    toggleClassDisplayPropOnClick(".tracker_locations_underworld", "underworld_item");
    
    setItemStatusSingleOnClick( ".tracker_item_bookofoz", ".tracker_requiresbook:checkbox", "tracker_requiresbook", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_bookofboardgames", ".tracker_requiresboardgames:checkbox", "tracker_requiresboardgames", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_sherry", ".tracker_requires_sherry:checkbox", "tracker_requires_sherry", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_gargoylelens", ".tracker_requires_gargoylelens:checkbox", "tracker_requires_gargoylelens", TEXT_COLOR_ON, TEXT_COLOR_OFF);

    setItemStatusSingleOnClick( ".tracker_item_runecompassion", ".tracker_requires_runecompassion:checkbox", "tracker_requires_runecompassion", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_runehonor", ".tracker_requires_runehonesty:checkbox", "tracker_requires_runehonesty", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_runehonesty", ".tracker_requires_runehonor:checkbox", "tracker_requires_runehonor", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_runehumility", ".tracker_requires_runehumilty:checkbox", "tracker_requires_runehumilty", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_runejustice", ".tracker_requires_runejustice:checkbox", "tracker_requires_runejustice", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_runesacrifice", ".tracker_requires_runesacrifice:checkbox", "tracker_requires_runesacrifice", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_runespirituality", ".tracker_requires_runespirituality:checkbox", "tracker_requires_runespirituality", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    setItemStatusSingleOnClick( ".tracker_item_runevalor", ".tracker_requires_runevalor:checkbox", "tracker_requires_runevalor", TEXT_COLOR_ON, TEXT_COLOR_OFF);   
    
    setItemStatusDoubleOnClick( ".tracker_spell_dispelfield", ".tracker_blockedbyfield:checkbox", "tracker_blockedbyfield",
                                ".tracker_spell_unlock", ".tracker_requires_unlockandfield:checkbox", "tracker_requires_unlockandfield", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    
    setItemStatusDoubleOnClick( ".tracker_spell_unlock", ".tracker_locked:checkbox", "tracker_locked",
                                ".tracker_spell_dispelfield", ".tracker_requires_unlockandfield:checkbox", "tracker_requires_unlockandfield", TEXT_COLOR_ON, TEXT_COLOR_OFF);

    setItemStatusDoubleOnClick( ".tracker_item_brokenlens", ".tracker_requires_brokenlens:checkbox", "tracker_requires_brokenlens",
                                ".tracker_item_gargishtext", ".tracker_requires_brokenlensandgargishtext:checkbox", "tracker_requires_brokenlensandgargishtext", TEXT_COLOR_ON, TEXT_COLOR_OFF);
    
    setItemStatusDoubleOnClick( ".tracker_item_gargishtext", ".tracker_requires_gargishtext:checkbox", "tracker_requires_gargishtext",
                                ".tracker_item_brokenlens", ".tracker_requires_brokenlensandgargishtext:checkbox", "tracker_requires_brokenlensandgargishtext", TEXT_COLOR_ON, TEXT_COLOR_OFF);
});

function setItemStatusSingleOnClick(itemName, requireCheckbox, requireLabel, colorOn, colorOff)
{
    $(itemName).click(function()
    {
        setItemStatusSingle(itemName, requireCheckbox, requireLabel, colorOn, colorOff);
    });    
}

function setItemStatusSingle(itemName, requireCheckbox, requireLabel, colorOn, colorOff)
{
    if($(itemName).is(':checked'))
    {
        $(requireCheckbox).prop('disabled', false);
        setClassToColor(requireLabel, colorOn);
    }
    else
    {
        $(requireCheckbox).prop('disabled', true);
        setClassToColor(requireLabel, colorOff);
    }
}

function setItemStatusDoubleOnClick(itemName1, requireCheckbox1, requireLabel1, itemName2, requireCheckbox2, requireLabel2, colorOn, colorOff)
{
    $(itemName1).click(function()
    {
        setItemStatusDouble(itemName1, requireCheckbox1, requireLabel1, itemName2, requireCheckbox2, requireLabel2, colorOn, colorOff);
    });    
}

function setItemStatusDouble(itemName1, requireCheckbox1, requireLabel1, itemName2, requireCheckbox2, requireLabel2, colorOn, colorOff)
{
    if($(itemName1).is(':checked'))
    {
        $(requireCheckbox1).prop('disabled', false);
        setClassToColor(requireLabel1, colorOn);

        if($(itemName2).is(':checked'))
        {
            $(requireCheckbox2).prop('disabled', false);
            setClassToColor(requireLabel2, colorOn);
        }
    }
    else
    {
        $(requireCheckbox1).prop('disabled', true);
        setClassToColor(requireLabel1, colorOff);

        $(requireCheckbox2).prop('disabled', true);
        setClassToColor(requireLabel2, colorOff);
    }
}

function setClassToColor(inClass, inColor)
{
    var all = document.getElementsByClassName(inClass);
    for (var i = 0; i < all.length; i++)
    {
        all[i].style.color = inColor;
    }
}

function setClassDisplayProp(inClass, inProp)
{
    var all = document.getElementsByClassName(inClass);
    for (var i = 0; i < all.length; i++)
    {
        all[i].style.display = inProp;
    }
}

function toggleClassDisplayPropOnClick(inClickTarget, inClass)
{
    $(inClickTarget).click(function()
    {
        toggleClassDisplayProp(inClass);
    });    
}

function toggleClassDisplayProp(inClass)
{
    var all = document.getElementsByClassName(inClass);
    for (var i = 0; i < all.length; i++)
    {
        if(all[i].style.display == "none")
        {
            all[i].style.display = "";
            console.log("test");
        }
        else
        {
            console.log("test2");
            all[i].style.display = "none";
        }
    }
}