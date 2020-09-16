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

function getModsArray(){
    var modsObj = getMods();
    var mods = [];
    for(var k in modsObj){
        if(modsObj[k] !== false && modsObj[k] !== undefined)
            mods.push(k);
    }
    return mods;
}

function getLevel(){
    if(getModsArray("ngpp")){
        switch(true){
            case player.ghostify.bl.watt > 0:
                return "Bosonic Lab"
            case player.ghostify.ghostlyPhotons.amount > 0:
                return "Ghostly Photons";
            case player.ghostify.reached:
                return "Ghostify";
            case tmp.qu.breakEternity.break:
                return "Break Eternity";
            case tmp.qu.bigRip.times > 0:
                return "Big Rip";
            case tmp.qu.tod.upgrades.length > 0:
                return "Tree of Decay";
            case tmp.qu.nanofield.antienergy > 0:
                return "Nanofield";
            case tmp.qu.replicants.amount > 0:
                return "Replicants";
            case tmp.qu.reached:
                return "Quantum";
            case player.masterystudies.length > 0:
                return "Mastery Studies";
            case player.meta[1].amount > 0:
                return "Meta Dimensions";
        }
    }
    if(getModsArray("ngud")){
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

function updateDiscord(){
    if(!rpcConfig.enabled) return;
    var mods = getModsArray();
    if (mods.length > 1)
        var modStatus = 'Playing with ' + mods.length + ' mods';
    else if (mods.length == 1)
        var modStatus = 'Playing with ' + mods[0];
    else
        var modStatus = 'Playing vanilla';

    discord.updatePresence({
        details: 'Current level : ' + getLevel(),
        state: modStatus,
        startTimestamp,
        largeImageKey: 'icon',
        largeImageText: 'Antimatter Dimensions',
        smallImageKey: 'electron',
        smallImageText: 'Running with Electron',
        instance: false
    });
    setTimeout(updateDiscord, 15000);
}

function startDiscord(){
    if(!rpcConfig.enabled) return;
    updateDiscord();
};
startDiscord();