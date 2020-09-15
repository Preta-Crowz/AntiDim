const RPC = require('discord-rpc');

const clientId = '755528057070026952';
const scopes = ['rpc', 'rpc.api'];

var rpcConfig = localStorage.getItem("discord");

if (rpcConfig === null){
    rpcConfig = {
        enabled: true
    };
    localStorage.setItem("discord", JSON.stringify(rpcConfig));
} else {
    rpcConfig = JSON.parse(rpcConfig);
}

global.discord = new RPC.Client({ transport: 'ipc' });

var startTimestamp = Date.now();

function getLevel(){
    return "Unknown";
};
function getMods(){
    return "Unknown";
};

function updateDiscord(){
    if(!rpcConfig.enabled) discord.destroy();
    discord.setActivity({
        details: 'Current level : ' + getLevel(),
        state: 'Playing with' + modCount + (getMods()==1 ? 'Mod' : 'Mods'),
        startTimestamp,
        largeImageKey: 'iron',
        largeImageText: 'Antimatter Dimensions',
        smallImageKey: 'electron',
        smallImageText: 'Running with Electron',
        instance: false
    });
    setTimeout(updateDiscord, 15000);
}

discord.on('ready', () => {
    console.log("asdf");
    if(!rpcConfig.enabled) discord.destroy();
    startTimestamp = Date.now();
    updateDiscord();
});

function discordErr(e){
    console.error(e);
    rpcConfig.enabled = false;
}

discord.on('error', discordErr);

discord.on('message', (m) =>{
    console.log(m);
});
function startDiscord(){
    if(!rpcConfig.enabled) return;
    discord.login({ clientId, scopes }).catch(discordErr);
};
startDiscord();