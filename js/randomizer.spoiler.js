function createModalSpoilerList(inSpoilers)
{
    $('#modal-spoiler-win #modal-spoiler-list').text("");
    inSpoilers.sort(spoilerSortCompareItems);
    for (var i = 0; i < inSpoilers.length; ++i)
    {
        $('#modal-spoiler-win #modal-spoiler-list').append($('<li>').text(getSpoilerLogLineString(inSpoilers[i])).addClass('mono'));
    }
}

$('#download-spoiler-log').click(function(e)
{
	downloadSpoilerLog(e);
});

$('#download-spoiler-log-from-view').click(function(e)
{
	downloadSpoilerLog(e);
});

function downloadSpoilerLog(e)
{
	var fileName = "";
	fileName = prefix + '-' + result.seed + '-' + result.preset + "-spoiler" + ".txt";
	if ($('#hide_filename_spoiler').is(':checked'))
	{
		fileName = prefix + '-' + Date.now() + "-spoiler" + ".txt";
	}

	var outputText = formatSpoilerLog(result.spoilers, result.seed, result.preset);
	saveAs(new Blob([outputText], {type: "otext/plain;charset=utf-8"}), fileName);
}

function getSpoilerLogLineString(inSpoiler)
{
    var lineString = inSpoiler.item.item[0] + ' located in ' + inSpoiler.location.location_set + " - " + inSpoiler.location.location;
    return lineString;
}

function formatOptionAvatarSprite()
{
    var optionAvatarSprite = getCharacterNameByOptionID($('#select-avatar-sprite').val());
    if($('#avatar-sprite-fire-flag').is(':checked'))
    {
        optionAvatarSprite += " on fire!";
    }
    return optionAvatarSprite;
}

function formatOptionPoison()
{
    if($('#poison_flash_options').val() == 1){return "Reduced";}
    if($('#poison_flash_options').val() == 2){return "Removed";}
    return "Default";
}

function formatSpoilerLog(inSpoilers, inSeed, inPreset)
{
    var outputText = [];

    outputText += "Ultima 6 Randomizer (SNES) " + VERSION_STRING + '\r\n';
    outputText += "Seed: " + inSeed + '\r\n';
    outputText += "Preset: " + inPreset + '\r\n';
    outputText += "Player Sprite: " + formatOptionAvatarSprite() + '\r\n';
    outputText += "Poison Flash: " + formatOptionPoison() + '\r\n';

    outputText += '\r\n';
    outputText += "######### Progression List" + '\r\n';
    outputText += formatSpoilerLogProgressionList(inSpoilers);

    outputText += '\r\n';
    outputText += "######### Spoiler List" + '\r\n';
    outputText += formatSpoilerLogItemList(inSpoilers);

    return outputText;
}

function formatSpoilerLogProgressionList(inSpoilers)
{
    var outputText = "";
    var progressionList = buildProgressionList(inSpoilers);

    progressionList.sort(spoilerSortCompareItems);
    var tierList = buildProgressionTiers(progressionList);

    outputText += '\r\n';
    for(var iTier = 0; iTier < tierList.length; ++iTier)
	{
        var tierLine = "TIER " + iTier;
        outputText += tierLine + '\r\n';
        for(var iNode = 0; iNode < tierList[iTier].length; ++iNode)
	    {
            var node = tierList[iTier][iNode];
            if(node.location.location_set == "shrines")
            {
                var itemLine = "    " + node.item.item[0] + ' located in ' + node.location.location_set + " - " + node.location.location;    
            }
            else
            {
                var itemLine = "    " + node.item.item[0] + ' located in ' + node.location.location_set + " - " + node.location.location;
            }
            outputText += itemLine + '\r\n';
        }
    }

    return outputText;
}

function buildProgressionList(inSpoilers)
{
    var progressionList = [];
    var potentialList = [];

    //get the initial list based on game mode required progression items
    for(var i = 0; i < inSpoilers.length; ++i)
    {
        if(inSpoilers[i].item.progression_set > 0)
        {
            if(potentialList.includes(i) == false)
            {
                potentialList.push(i);
            }
            
            //get a list of requirements this added location has then recursively add requirements
            var requiresList = inSpoilers[i].location.requires.concat(inSpoilers[i].location.addedRequires);
            addSubRequirements(inSpoilers, potentialList, requiresList);
        }
    }

    //build the progression list from the potential list
    for(var i = 0; i < potentialList.length; ++i)
    {
        var entryNum = potentialList[i];
        progressionList.push(inSpoilers[entryNum]);
    }

    return progressionList;
}

function addSubRequirements(inSpoilers, potentialList, requiresList)
{
    if(requiresList.length > 0)
    {
        for(var iRequires = 0; iRequires < requiresList.length; ++iRequires)
        {
            for(var iSpoiler = 0; iSpoiler < inSpoilers.length; ++iSpoiler)
            {
                var shouldAdd = false;
                if(inSpoilers[iSpoiler].item.id[0] == requiresList[iRequires])
                {
                    shouldAdd = true;
                }
                else if(inSpoilers[iSpoiler].item.id[0] == ITEM_SPELL)
                {
                    if(inSpoilers[iSpoiler].item.flags[0] == requiresList[iRequires])
                    {
                        shouldAdd = true;
                    }
                }
                if(shouldAdd == true)
                {
                    if(potentialList.includes(iSpoiler) == false)
                    {
                        potentialList.push(iSpoiler);
                        var subRequiresList = inSpoilers[iSpoiler].location.requires.concat(inSpoilers[iSpoiler].location.addedRequires);
                        addSubRequirements(inSpoilers, potentialList, subRequiresList);
                    }
                }
            }
        }
    }
}

function buildProgressionTiers(progressionList)
{
    //go through progression item list and add items to tiers
    //to add an item to a tier all of its requirements must be met by items in the previous tiers
    //remove items from the list if they are added to a tier
    //continue until all items are removed from the list
    
    var tiers = [];
    var currentTier = 0;

    while(progressionList.length > 0 && currentTier < 50)
    {
        tiers[currentTier] = [];
        var startLength = progressionList.length;

        for(var iCounter = 0; iCounter < startLength; ++iCounter)
        {
            node = progressionList.shift(); //remove a node from the progression list
            var shouldAdd = false;

            if(node.location.requires.length + node.location.addedRequires.length > 0)
            {
                if(currentTier > 0)
                {
                    //this node has requirements and we are not on tier 0
                    var requiresList = node.location.requires.concat(node.location.addedRequires);
                    var requirementsMet = 0;

                    //count how many requirements are met by previous tiers
                    for(var iRequire = 0; iRequire < requiresList.length; ++iRequire)
                    {
                        for(var iTier = 0; iTier < tiers.length-1; ++iTier)
                        {
                            for(var iNode = 0; iNode < tiers[iTier].length; ++iNode)
                            {
                                var tierNode = tiers[iTier][iNode];
                                if(tierNode.item.id[0] == requiresList[iRequire] || (tierNode.item.id[0] == ITEM_SPELL && tierNode.item.flags[0] == requiresList[iRequire]))
                                {
                                    requirementsMet +=1;
                                }
                            }
                        }
                    }
                    if(requirementsMet == requiresList.length)
                    {
                        //all requirements met so add the node to a tier
                        shouldAdd = true;
                    }
                }
            }
            else
            {
                //this node has no requirements so add the node to tier 0
                shouldAdd = true;
            }
            if(shouldAdd == true)
            {
                tiers[currentTier].push(node);
            }
            else
            {
                progressionList.push(node);
            }
        }
        if(startLength == progressionList.length)
        {
            //we may reach this point if some items are not randomized, such as the spells
            tiers[currentTier] = progressionList;
            break;
        }

        currentTier += 1;
    }
    return tiers;
}

function formatSpoilerLogItemList(inSpoilers)
{
    var outputText = "";
    for(var i = 0; i < inSpoilers.length; ++i)
	{
        if(inSpoilers[i].location.location_set == null){inSpoilers[i].location.location_set = "Other";}
    }

    inSpoilers.sort(spoilerSortCompareLocations);
    inSpoilers.sort(spoilerSortCompareLocationSets);

    var lastLocationSet = "";
    for(var i = 0; i < inSpoilers.length; ++i)
	{
        if(inSpoilers[i].location.location_set != lastLocationSet)
        {
            outputText += '\r\n';
            lastLocationSet = inSpoilers[i].location.location_set;
            outputText += inSpoilers[i].location.location_set + '\r\n';
        }
        var itemLine = "    " + inSpoilers[i].location.location + ' contains ' + inSpoilers[i].item.item[0];
        outputText += itemLine + '\r\n';
	}

    return outputText;
}

function spoilerSortCompareItems(a,b)
{
    if( a.item.item[0] < b.item.item[0] ){return -1;}
    if( a.item.item[0] > b.item.item[0] ){return 1;}
    return 0;
}

function spoilerSortCompareLocationSets(a,b)
{
    if( a.location.location_set < b.location.location_set ){return -1;}
    if( a.location.location_set > b.location.location_set ){return 1;}
    return 0;
}

function spoilerSortCompareLocations(a,b)
{
    if( a.location.location < b.location.location ){return -1;}
    if( a.location.location > b.location.location ){return 1;}
    return 0;
}
