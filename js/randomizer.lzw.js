//usage:
//- var dialogData = decompressDataFromLZW(rom, 0x48000);
//- make changes to dialogData
//- rom.set(compressDataToLZW(dialog1data), 0x48000);

//This produces slightly different compressed results to the Python version, but resolves many of the discrepancies between the ROM version and the re-compressed version.
//Compared to the Python version's many discrepancies, this version only has discrepancies in the re-compressed versions of these files:
//0x9f500	Differs from ROM. Exactly matches Python version
//0xd6600	Differs from ROM. Exactly matches Python version
//0xdc100	Differs from ROM. Exactly matches Python version
//0xe1000	Differs from ROM & Python version

var BASE_CW = 0x102;

function concatByteArrays(arrays)
{
    var totalLength = arrays.reduce(function(len, arr)
    {
        return len + arr.length;
    }, 0);
    var mergedArray = new Uint8Array(totalLength);
    var offset = 0;
    try
    {
        arrays.forEach(function(arr)
        {
            mergedArray.set(arr, offset);
            offset += arr.length;
        });
    } catch(ex)
    {
        console.log(arrays, totalLength, offset);
        throw ex;
    }
    return mergedArray;
}

function readCodewords(rom, startAddr)
{
    var currentAddr = startAddr;
    var cwSize = 9;
    var cwNext = BASE_CW;
    var buf = 0; // Buf holds a variable number of bits from the input stream so non-byte-aligned reads can be made
    var bufLen = 0;

    var codewords = [];
    for(var i = 0; i < 0x4000; i++)
    {
        // Read enough bits into `buf` that at least one codeword can be read
        while(bufLen < cwSize)
        {
            buf = buf | rom[currentAddr] << bufLen;
            bufLen += 8;
            currentAddr++;
        }
        // Take one codeword out of buf
        cw = buf & (Math.pow(2, cwSize) - 1);
        buf = buf >> cwSize;
        bufLen -= cwSize;

        if(cw === 0x100)
        {
            // 0x100 - reinit dictionary
            codewords.push(cw);
            cwSize = 9;
            // This is one less than 0x102 because the next cw is never a dictionary item and doesn't increment the counter
            cwNext = BASE_CW - 1;
        }
        else if(cw === 0x101)
        {
            // 0x101 - end of stream
            codewords.push(cw);
            return {codewords: codewords, bytesRead: currentAddr - startAddr};
        }
        else if(cw > cwNext)
        {
            codewords.push(cw);
            throw new Error('Codeword not in dictionary: ' + cw + ' should be <= ' + cwNext);
        }
        else
        {
            codewords.push(cw);
            cwNext += 1;
            if(cwNext >= (1 << cwSize))
            {
                if(cwSize + 1 <= 12)
                {
                    cwSize += 1;
                }
                else
                {
                    // Codeword can't grow beyond 12 bits. Next command should be a reinit or else U6's dictionary
                    // will overflow and cause memory corruption.
                }
            }
        }
    }
    throw new Error('Input was longer than expected (>16kB)');
}

function decompressLZW(codewords)
{
    function getDictEntry(cw)
    {
        var chars = [];
        while(cw > 0xFF)
        {
            var entry = dictionary[cw - BASE_CW];
            chars.unshift(entry[0]);
            cw = entry[1];
        }
        chars.unshift([cw]);
        return concatByteArrays(chars);
    }

    var dictionary = []; // Array of [decompressed string, next codeword]
    var prevCw = 0;
    var output = [];

    codewords.forEach(function(cw)
    {
        if(cw === 0x100)
        {
            // 0x100 - reinit dictionary
            dictionary = [];
        }
        else if(cw === 0x101)
        {
            // 0x101 - end stream
        }
        else if(prevCw === 0x100)
        {
            // Last codeword was a reset - this codeword skips the dictionary completely
            output.push([cw]);
        }
        else
        {
            var string;
            if(cw < BASE_CW + dictionary.length)
            {
                // Normal case - cw is either a dictionary entry (>0x102) or a literal value
                string = getDictEntry(cw);
                output.push(string);
            }
            else
            {
                // Special case - use last cw's string, then repeat its first byte.
                // I'm not sure what the rationale is for this transformation, but it saves bytes.
                // This codepath isn't used in most files, but it's used by the title screen data.
                string = getDictEntry(prevCw);
                output.push(string);
                output.push(string.subarray(0, 1));
            }
            dictionary.push([string.subarray(0, 1), prevCw]);
        }
        prevCw = cw;
    });

    return concatByteArrays(output);
}

function decompressRLE(inputBytes)
{
    var rleOn = false;
    var lastDatum = 0;
    var result = [];

    inputBytes.forEach(function(datum)
    {
        if(rleOn)
        {
            rleOn = false;
            if(datum === 0)
            {
                result.push(0x81);
            }
            else
            {
                for(var i = 0; i < datum - 1; i++)
                {
                    result.push(lastDatum);
                }
            }
        }
        else if(datum === 0x81)
        {
            rleOn = true;
        }
        else
        {
            result.push(datum);
            lastDatum = datum;
        }
    });

    return new Uint8Array(result);
}

function decompressDataFromLZW(rom, startAddress)
{
    return checkIfDecompressed(rom, startAddress);
}

function compressRLE(data)
{
    function outputChar(char)
    {
        if(char === 0x81)
        {
            // Escape a literal 0x81 byte, as it would otherwise start an RLE command
            output.push([0x81, 0x00]);
        }
        else if(char != null)
        {
            output.push([char]);
        }
    }

    function outputCharSequence(char, count)
    {
        if(count > 2 && char !== 0x81)
        {
            outputChar(char);
            output.push([0x81, count]);
        }
        else
        {
            for(var i = 0; i < count; i++)
            {
                outputChar(char);
            }
        }
    }

    var lastChar = null;
    var count = 0;
    var output = [];
    data.forEach(function(char)
    {
        if(char !== lastChar || count === 255)
        {
            // Character has changed - write to output
            outputCharSequence(lastChar, count);
            lastChar = char;
            count = 1;
        }
        else
        {
            // Counting how many times this character occurs before emitting an RLE command
            count++;
        }
    });

    // Finish up encoding the last char sequence
    outputCharSequence(lastChar, count);

    return concatByteArrays(output);
}

function compressLZW(data)
{
    function dataStartsWith(prefix)
    {
        if(data.length < prefix.length)
        {
            return false;
        }
        for(var i = 0; i < prefix.length; i++)
        {
            if(prefix[i] !== data[i])
            {
                return false;
            }
        }
        return true;
    }

    var dictionary = []; // Array of Uint8Arrays
    var prev = data.subarray(0, 1);
    var prevCw = 0;
    var output = [];
    // Initialize stream with a reinit command followed by a dictionary-oblivious char
    output.push(0x100, data[0]);

    data = data.subarray(1); // Advance by 1 byte
    while(data.length > 0)
    {
        var longestIdx = 0;
        var longestLen = 0;
        // Brute-force search for the longest dictionary entry that prefixes data
        dictionary.forEach(function(entry, i)
        {
            if(entry.length > longestLen && dataStartsWith(entry))
            {
                longestIdx = i;
                longestLen = entry.length;
            }
        });

        // The decompressor supports a special case when cw == cw_next it repeats the
        // last cw's string, then repeats the first byte of that string.
        var special = concatByteArrays([prev, prev.subarray(0,1)]);

        var string;
        var cw;
        if(special.length >= longestLen && dataStartsWith(special))
        {
            // The special case was better than a dictionary match, use it
            string = special;
            cw = BASE_CW + dictionary.length;
        }
        else if(longestLen > 0)
        {
            // Found a good dictionary match
            string = dictionary[longestIdx];
            cw = BASE_CW + longestIdx;
        }
        else
        {
            // No dictionary match - emit the raw value
            string = data.subarray(0, 1);
            cw = string[0];
        }
        output.push(cw);
        dictionary.push(concatByteArrays([prev, string.subarray(0, 1)]));
        prev = string;
        prevCw = cw;
        data = data.subarray(string.length);


        if(dictionary.length + BASE_CW >= 0x1000 && data.length > 0)
        {
            // Exceeded maximum dictionary size. Reinit the stream.
            prev = data.subarray(0, 1);
            prevCw = 0;
            output.push(0x100, data[0]);
            dictionary = [];
            data = data.subarray(1);
        }
    }
    output.push(0x101); // End stream

    return output;
}

function packCodewords(codewords)
{
    var outputBytes = [];
    var residual = 0; // Residual is the buffer of unwritten bits that aren't enough to make a full byte
    var residualBits = 0;
    var cwNext = BASE_CW - 1;

    codewords.forEach(function(cw)
    {
        var cwBits;
        if(cwNext < 0x200)
        {
            cwBits = 9;
        }
        else if(cwNext < 0x400)
        {
            cwBits = 10;
        }
        else if(cwNext < 0x800)
        {
            cwBits = 11;
        }
        else
        {
            cwBits = 12;
        }

        residual |= cw << residualBits;
        residualBits += cwBits;
        // Output as many full bytes as possible, leaving the rest in residual
        while(residualBits >= 8)
        {
            outputBytes.push(residual & 0xFF);
            residual >>= 8;
            residualBits -= 8;
        }

        // Update codeword size in case stream has been reset
        if(cw === 0x100)
        {
            cwNext = BASE_CW - 1;
        }
        else
        {
            cwNext++;
        }
    });

    while(residualBits > 0)
    {
        outputBytes.push(residual & 0xFF);
        residual >>= 8;
        residualBits -= 8;
    }

    return new Uint8Array(outputBytes);
}

function compressDataToLZW(data)
{
    return packCodewords(compressLZW(compressRLE(data)));
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

//Decompressing and recompressing is slow so we ensure that each chunk of compressed data is only decompressed and compressed once

var decompressedDataList = [];

function checkIfDecompressed(rom, startAddress)
{
    for(var i = 0; i < decompressedDataList.length; ++i)
    {
        if(decompressedDataList[i].address == startAddress)
        {
            //data already decompressed
            return decompressedDataList[i].data;
        }
    }
    
    //no decompressed data match was found
    var data = new DecompressedData(startAddress, decompressRLE(decompressLZW(readCodewords(rom, startAddress).codewords)))
    decompressedDataList.push(data);
    return data.data;
}

function recompressAllDecompressedData(rom)
{
    console.log("RECOMPRESSING LZW DATA");
    while(decompressedDataList.length)
    {
        var data = decompressedDataList.pop();
        rom.set(compressDataToLZW(data.data), data.address);
    }
}

class DecompressedData {
    constructor(address, data) {
        this.address = address;
        this.data = data;
    }
}