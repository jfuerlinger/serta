// // const Discord = require('discord.js');
// // const client = new Discord.Client();

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });

// onTest = async message => {
//     message.guild.roles.forEach(role => console.debug(role.name, role.id));
//     logger.info('test');
// }

// onPing = async message => {
//     // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
//     // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
//     const m = await message.channel.send("Ping?");
//     m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
// }

// onSay = async message => {
//     // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
//     // To get the "message" itself we join the `args` back into a string with spaces: 
//     const sayMessage = args.join(" ");
//     // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
//     message.delete().catch(O_o => { });
//     // And we get the bot to say the thing: 
//     message.channel.send(sayMessage);
// }

// onKick = async message => {
//     // This command must be limited to mods and admins. In this example we just hardcode the role names.
//     // Please read on Array.some() to understand this bit: 
//     // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?

//     if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name)))
//         return message.reply("Sorry, you don't have permissions to use this!");

//     // Let's first check if we have a member and if we can kick them!
//     // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
//     // We can also support getting the member by ID, which would be args[0]
//     let member = message.mentions.members.first() || message.guild.members.get(args[0]);
//     if (!member)
//         return message.reply("Please mention a valid member of this server");
//     if (!member.kickable)
//         return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

//     // slice(1) removes the first part, which here should be the user mention or ID
//     // join(' ') takes all the various parts to make it a single string.
//     let reason = args.slice(1).join(' ');
//     if (!reason) reason = "No reason provided";

//     // Now, time for a swift kick in the nuts!
//     await member.kick(reason)
//         .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
//     message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

// }

// onBan = async message => {
//     // Most of this command is identical to kick, except that here we'll only let admins do it.
//     // In the real world mods could ban too, but this is just an example, right? ;)
//     if (!message.member.roles.some(r => ["Administrator"].includes(r.name)))
//         return message.reply("Sorry, you don't have permissions to use this!");

//     let member = message.mentions.members.first();
//     if (!member)
//         return message.reply("Please mention a valid member of this server");
//     if (!member.bannable)
//         return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

//     let reason = args.slice(1).join(' ');
//     if (!reason) reason = "No reason provided";

//     await member.ban(reason)
//         .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
//     message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
// }

// onPurge = async message => {
//     // This command removes all messages from all users in the channel, up to 100.

//     // get the delete count, as an actual number.
//     const deleteCount = parseInt(args[0], 10);

//     // Ooooh nice, combined conditions. <3
//     if (!deleteCount || deleteCount < 2 || deleteCount > 100)
//         return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

//     // So we get our messages, and delete them. Simple enough, right?
//     const fetched = await message.channel.fetchMessages({ limit: deleteCount });
//     message.channel.bulkDelete(fetched)
//         .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
// }

// client.on("message", async message => {
//     // This event will run on every single message received, from any channel or DM.

//     // It's good practice to ignore other bots. This also makes your bot ignore itself
//     // and not get into a spam loop (we call that "botception").
//     if (message.author.bot) return;

//     // Also good practice to ignore any message that does not start with our prefix, 
//     // which is set in the configuration file.
//     if (message.content.indexOf(config.prefix) !== 0) return;

//     // Here we separate our "command" name, and our "arguments" for the command. 
//     // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
//     // command = say
//     // args = ["Is", "this", "the", "real", "life?"]
//     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//     const command = args.shift().toLowerCase();

//     // Let's go with a few common example commands! Feel free to delete or change those.

//     if (command === "#") {
//         await onTest(message);
//     }


//     if (command === "ping") {
//         await onPing(message);
//     }

//     if (command === "say") {
//         await onSay(message);
//     }

//     if (command === "kick") {
//         await onKick(message);
//     }

//     if (command === "ban") {
//         await onBan(message);
//     }

//     if (command === "purge") {
//         +
//             await onPurge(message);
//     }
// });//.catch(error => console.log(error));


const echoCommand = bot.registerCommand("echo", (msg, args) => { // Make an echo command
    if (args.length === 0) { // If the user just typed "!echo", say "Invalid input"
        return "Invalid input";
    }
    const text = args.join(" "); // Make a string of the text after the command label
    return text; // Return the generated string
}, {
    description: "Make the bot say something",
    fullDescription: "The bot will echo whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommand("reverse", (msg, args) => { // Make a reverse subcommand under echo
    if (args.length === 0) { // If the user just typed "!echo reverse", say "Invalid input"
        return "Invalid input";
    }
    let text = args.join(" "); // Make a string of the text after the command label
    text = text.split("").reverse().join(""); // Reverse the string
    return text; // Return the generated string
}, {
    description: "Make the bot say something in reverse",
    fullDescription: "The bot will echo, in reverse, whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommandAlias("backwards", "reverse"); // Alias "!echo backwards" to "!echo reverse"


bot.registerCommand("ping", "Pong!", { // Make a ping command
    // Responds with "Pong!" when someone says "!ping"
    description: "Pong!",
    fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.",
    reactionButtons: [ // Add reaction buttons to the command
        {
            emoji: "⬅",
            type: "edit",
            response: (msg) => { // Reverse the message content
                return msg.content.split().reverse().join();
            }
        },
        {
            emoji: "🔁",
            type: "edit", // Pick a new pong variation
            response: ["Pang!", "Peng!", "Ping!", "Pong!", "Pung!"]
        },
        {
            emoji: "⏹",
            type: "cancel" // Stop listening for reactions
        }
    ],
    reactionButtonTimeout: 30000 // After 30 seconds, the buttons won't work anymore
});


bot.on("messageCreate", (msg) => { // When a message is created
    if (msg.content === "!embed") { // If the message content is "!embed"
        bot.createMessage(msg.channel.id, {
            embed: {
                title: "I'm an embed!", // Title of the embed
                description: "Wuuh you are a great fighter against **Corona**.\nKeep fighting!!",
                author: { // Author property
                    name: msg.author.username,
                    icon_url: msg.author.avatarURL
                },
                color: 0x008000, // Color, either in hex (show), or a base-10 integer
                fields: [ // Array of field objects
                    {
                        name: "Some extra info.", // Field title
                        value: "Some extra value.", // Field
                        inline: true // Whether you want multiple fields in same line
                    },
                    {
                        name: "Some more extra info.",
                        value: "Another extra value.",
                        inline: true
                    }
                ],
                footer: { // Footer text
                    text: "Created with Eris."
                }
            }
        });
    }
});


// // // client.on("ready", () => {
// // //     // This event will run if the bot starts, and logs in, successfully.
// // //     console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
// // //     // Example of changing the bot's playing game to something useful. `client.user` is what the
// // //     // docs refer to as the "ClientUser".
// // //     client.user.setActivity(`Serving ${client.guilds.size} servers`);
// // // });

// client.login(process.env.DISCORD_TOKEN);