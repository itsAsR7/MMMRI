const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vouchers')
    .setDescription('Check vouchers for this user')
    .addUserOption(option => option.setName('user').setDescription('Hey').setRequired(true)),
    async execute(interaction, client) {
        const { options, guildId, user } = interaction;
        const target = options.getUser('user');
        console.log(target)
        const scaredEmotes = [ ':scream_cat:', '<:julian3:1016903362991624253>', '<:bandmanalm:1024090396487336006>', '<a:awokege:1028002524692742164>', '<:fucksoru:925570701094715414>', '<:NOWAY:1029438507623661648>' ]
        const userTag = `${target.username}#${target.discriminator}`
        vouchersModel.findOne({ UserId: target.id}, async (err, data) => {
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