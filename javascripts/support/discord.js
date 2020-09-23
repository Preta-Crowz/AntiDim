const discord = require('discord-rich-presence')('755528057070026952');
var rpcConfig = localStorage.getItem("discord");

if (rpcConfig === null){
    rpcConfig = {
        enabled: true
    };
    localStorage.setItem("discord", JSON.stringify(rpcConfig));
} else {
    rpcConfig = JSON.parse(rpcConfig);
}

var startTimestamp = Date.now();

function getMods(){
    if(!global.player) return {};
    return {
        ngm: player.aarexModifications.newGameMinusVersion !== undefined,
        ngp: player.aarexModifications.ngp4V !== undefined ? 2 : player.aarexModifications.newGamePlusVersion !== undefined ? 1 : 0,
        arrows: player.aarexModifications.newGameExpVersion !== undefined,
        ngpp: player.meta == undefined ? false : player.aarexModifications.ngp3lV ? 3 : tmp.ngp3 ? 2 : 1,
        ngmm: player.aarexModifications.ngmX ? player.aarexModifications.ngmX - 1 : player.galacticSacrifice !== undefined ? 1 : 0,
        rs: player.infinityUpgradesRespecced != undefined ? 2 : player.boughtDims !== undefined,
        ngud: player.aarexModifications.nguspV !== undefined ? 3 : player.aarexModifications.ngudpV !== undefined ? 2 : player.exdilation !== undefined ? 1 : 0,
        nguep: player.aarexModifications.nguepV !== undefined,
        ngmu: player.aarexModifications.newGameMult === 1,
        ngumu: player.aarexModifications.ngumuV !== undefined,
        ngex: player.aarexModifications.ngexV !== undefined,
        aau: player.aarexModifications.aau !== undefined
    }
}

function getModsArray(){
    var modsObj = getMods();
    var mods = [];
    for(var k in modsObj){
        if(modsObj[k] !== false && modsObj[k] !== undefined)
            mods.push(k);
    }
    return mods;
}

function isOnChallenge(){
    if(!global.player) return false;
    return (player.currentChallenge != "") || (player.currentEternityChall != "")
}

function getLevel(){
    if(!global.player) return "Unknown";
    if(getModsArray().indexOf("ngpp") + 1){
        switch(true){
            case player.ghostify.bl.watt > 0:
                return "Bosonic Lab"
            case player.ghostify.ghostlyPhotons.amount > 0:
                return "Ghostly Photons";
            case player.ghostify.reached:
                return "Ghostify";
            case player.quantum.breakEternity.unlocked:
                return "Break Eternity";
            case player.quantum.bigRip.times > 0:
                return "Big Rip";
            case player.quantum.tod.upgrades > 0:
                return "Tree of Decay";
            case player.quantum.nanofield.antienergy > 0:
                return "Nanofield";
            case player.quantum.emperorDimensions[1].workers > 0:
                return "Emperor Dimensions";
            case player.quantum.replicants.amount > 0:
                return "Replicants";
            // QC will be buggy because I didn't find other way to get list
            case Object.keys(player.quantum.challengeRecords).length > 1:
                return "Quantum Challenges";
            case player.quantum.electrons.sacGals > 0:
                return "Electrons"
            case player.quantum.reached:
                return "Quantum";
            case player.masterystudies.length > 0:
                return "Mastery Studies";
            case player.meta[1].amount > 0:
                return "Meta Dimensions";
        }
    }
    if(getModsArray().indexOf("ngud") + 1){
        switch(true){
            case player.blackhole.unl:
                return "Blackhole";
        }
    }
    switch(true){
        case player.dilation.studies.length > 0:
            return "Time Dilation";
        case player.eternities > 0:
            return "Eternity";
        case player.replicanti.amount > 0:
            return "Replicanti";
        case player.break:
            return "Break-Infinity";
        case player.infinitied > 0:
            return "Infinity";
        default:
            return "Pre-Infinity";
    }
    return "Unknown";
};

function getChall(){
    if(player.currentChallenge !== ""){
        switch(true){
            case player.currentEternityChall.substr(0,5) == "eterc":
                return "EC" + player.currentEternityChall.substr(5);
            case player.currentChallenge.substr(0,5) == "postc":
                return "IC" + player.currentChallenge.substr(5);
            case player.currentChallenge.substr(0,9) == "challenge":
                return "C" + player.currentChallenge.substr(9);
        }
    }
    return "Cat Challenge";
}

function updateDiscord(){
    if(!rpcConfig.enabled) return;

    if(!global.player) return setTimeout(updateDiscord, 500);

    var mods = getModsArray();
    if (mods.length > 1)
        var modStatus = 'Playing with ' + mods.length + ' mods';
    else if (mods.length == 1)
        var modStatus = 'Playing with ' + mods[0];
    else
        var modStatus = 'Playing vanilla';

    var nextRpc = {
        details: isOnChallenge() ? 'Current challenge : '+getChall() : 'Current level : '+getLevel(),
        state: modStatus,
        startTimestamp,
        largeImageKey: 'icon',
        largeImageText: 'Antimatter Dimensions',
        smallImageKey: 'electron',
        smallImageText: 'Running with Electron',
        instance: false
    }
    
    if (nextRpc.details == global.lastRpc.details && nextRpc.state == global.lastRpc.state)
        return setTimeout(updateDiscord, 500);

    discord.updatePresence(nextRpc);
    global.lastRpc = nextRpc;
    setTimeout(updateDiscord, 15000);
}

function startDiscord(){
    if(!rpcConfig.enabled) return;
    updateDiscord();
};
global.lastRpc = {};
startDiscord();