const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { deleteOne } = require('../../schemas/test');
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
        const usedBy = `${interaction.member.user.username}#${interaction.member.user.discriminator}`
        const useOn= `${target.username}#${target.discriminator}`
        vouchersModel.findOne({ UserId: interaction.member.id}, async (err, data) => {
            if(!data) {
                return interaction.reply({content: `Go beg a mod for a voucher first`})
            } 
            else {       
                data.Vouchers.shift()
                member.timeout(300_000)
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`${usedBy} used a voucher on ${useOn} \n${useOn} has been timed out for 5 minutes \n${usedBy} has ${data.Vouchers.length} remaining vouchers ${okayEmotes[Math.floor(Math.random()*okayEmotes.length)]}`)

                if (data.Vouchers.length===0) {
                    await deleteOne({ UserId: interaction.member.id })
                }
                data.save()
                return interaction.reply({ embeds: [embed] })
            }
        });
    }
}