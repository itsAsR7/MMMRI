const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vouchers')
    .setDescription('Van is a fag')
    .addUserOption(option => option.setName('user').setDescription('Hey').setRequired(true)),
    async execute(interaction, client) {
        const { options, guildId, user } = interaction;
        const target = options.getUser('user');
        console.log(target)
        const scaredEmotes = [ '\:scream_cat:', '<:julian3:1080347785745932360>', '\:bandmanalm:', '\:awokege:', '<:fucksoru:1080366216394313800>', '<:NOWAY:1080371769220808764>' ]
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