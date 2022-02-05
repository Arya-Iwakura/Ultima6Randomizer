const TEXT_COLOR_OFF = "rgb(224, 192, 192)";
const TEXT_COLOR_ON = "rgb(51, 51, 51)";

function pageInit()
{
    
}

$( window ).on( "load", pageInit );

$(document).ready(function()
{
    toggleClassDisplayPropOnClick(".npctracker_dialogrewards", "dialogrewards_npc", "npc_location_dialogrewards");
    toggleClassDisplayPropOnClick(".npctracker_treasuremap", "treasuremap_npc", "npc_location_treasuremap");
    toggleClassDisplayPropOnClick(".npctracker_party", "joinablepartymembers_npc", "npc_location_joinablepartymembers");
    toggleClassDisplayPropOnClick(".npctracker_healers", "healers_npc", "npc_location_healers");
    toggleClassDisplayPropOnClick(".npctracker_inns", "inns_npc", "npc_location_inns");
    toggleClassDisplayPropOnClick(".npctracker_other", "other_npc", "npc_location_other");
});

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

function toggleClassDisplayPropOnClick(inClickTarget, inClass, inLocationSet)
{
    $(inClickTarget).click(function()
    {
        toggleClassDisplayProp(inClass, inLocationSet);
    });
}

function toggleClassDisplayProp(inClass, inLocationSet)
{
    var all = document.getElementsByClassName(inClass);
    for (var i = 0; i < all.length; i++)
    {
        if(all[i].style.display == "none")
        {
            all[i].style.display = "";
        }
        else
        {
            all[i].style.display = "none";
        }
    }
    checkHiddenElements(inClass, inLocationSet);
}

function checkHiddenElements(inItemClass, inLocationSet)
{
    var all = document.getElementsByClassName(inLocationSet);
    for (var i = 0; i < all.length; i++)
    {
        var inputElements = all[i].getElementsByTagName('div');
        var totalInputElements = inputElements.length;
        var totalHiddenElements = 0;
        
        for (var j = 0; j < inputElements.length; j++)
        {
            if(inputElements[j].style.display == "none")
            {
                totalHiddenElements += 1;
            }
        }

        if(totalInputElements == totalHiddenElements)
        {
            all[i].style.display = "none";
        }
        else
        {
            all[i].style.display = "";
        }
    }
}
