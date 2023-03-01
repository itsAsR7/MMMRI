const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('usevoucher')
    .setDescription('Use a voucher')
    .addUserOption(option => option.setName('user').setDescription('Select a member to use a voucher').setRequired(true)),
    async execute(interaction, client) {
        const { options, guildId, user } = interaction;
        const target = options.getUser('user');
        console.log(target)
        const okayEmotes = [":thumbs_up:"]
        const userTag = `${target.username}#${target.discriminator}`
        vouchersModel.findOne({ UserId: target.id}, async (err, data) => {
            if(!data) {
                return interaction.reply({content: `Lol ${userTag}'s corny ass has no vouchers `})
            } else {       
                
                data.Vouchers.shift()
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`${userTag} used a voucher \n \n ${userTag} has ${data.Vouchers.length} remaining vouchers ${okayEmotes[Math.floor(Math.random()*okayEmotes.length)]}`)
                return interaction.reply({ embeds: [embed] })
            }
        });
    }
}