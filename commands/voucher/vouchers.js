const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vouchers')
    .setDescription('Check vouchers for a user')
    .addUserOption(option => option.setName('user').setDescription('Check how many vouchers this user has').setRequired(true)),
    async execute(interaction, client) {
        const { options, guildId, user } = interaction;
        const target = options.getUser('user');
        const scaredEmotes = [ ':scream_cat:', '<a:WePaid:1073356326727585842>', '<:julian3:1016903362991624253>', '<:bandmanalm:1024090396487336006>', '<a:awokege:1028002524692742164>', '<:fucksoru:925570701094715414>', '<:NOWAY:1029438507623661648>' ]
        const userTag = `${target.username}#${target.discriminator}`
        vouchersModel.findOne({ UserId: target.id}, async (err, data) => {
            if (err) throw err
            
            if(!data) {
                return interaction.reply({content: `Lol ${userTag}'s corny ass has no vouchers `})
            } else {              
                const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`${userTag} has ${data.Vouchers.length} vouchers ${scaredEmotes[Math.floor(Math.random()*scaredEmotes.length)]}`)
                return interaction.reply({ embeds: [embed] })
            }
        });
    }
}