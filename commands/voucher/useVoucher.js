const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('usevoucher')
    .setDescription('Use a voucher')
    .addUserOption(option => option.setName('user').setDescription('Select a member to use a voucher').setRequired(true)),
    async execute(interaction, client) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You don't have the privileges to use a voucher peasant"})
        
        const { options, guildId, user } = interaction;
        const target = options.getUser('user');
        console.log(target)
        const okayEmotes = [":thumbsup:"]
        const userTag = `${target.username}#${target.discriminator}`
        vouchersModel.findOne({ UserId: target.id}, async (err, data) => {
            if(!data) {
                return interaction.reply({content: `You have no vouchers lil bro`})
            } else {       
                
                data.Vouchers.shift()
                data.save()
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`${userTag} used a voucher \n \n ${userTag} has ${data.Vouchers.length} remaining vouchers ${okayEmotes[Math.floor(Math.random()*okayEmotes.length)]}`)
                return interaction.reply({ embeds: [embed] })
            }
        });
    }
}