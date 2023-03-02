const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('usevoucher')
    .setDescription('Use a timeout voucher')
    .addUserOption(option => option.setName('user').setDescription('Select a member to timeout for 5 minutes').setRequired(true)),
    async execute(interaction, client) {
        
        const { options, guildId, user } = interaction;
        const target = options.getUser('user');
        console.log(interaction.member)
        const okayEmotes = [":thumbsup:"]
        const member =  interaction.options.getMember('user')
        const usedBy = `${interaction.member.username}#${interaction.member.discriminator}`
        const userTag = `${target.username}#${target.discriminator}`
        vouchersModel.findOne({ UserId: interaction.member.id}, async (err, data) => {
            if(!data) {
                return interaction.reply({content: `You have no vouchers lil bro`})
            } else {       
                data.Vouchers.shift()
                data.save()
                member.timeout(300_000)
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`${usedBy} used a voucher on ${userTag} \n${userTag} has been timed out for 5 minutes \n${userTag} has ${data.Vouchers.length} remaining vouchers ${okayEmotes[Math.floor(Math.random()*okayEmotes.length)]}`)
                return interaction.reply({ embeds: [embed] })
            }
        });
    }
}