const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { deleteOne } = require('../../schemas/test');
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mutepaul')
    .setDescription('Use a timeout voucher')
    .addUserOption(option => option.setName('user').setDescription('Select a member to timeout for 5 minutes').setRequired(true)),
    async execute(interaction, client) {
        
        const { options, guildId, user } = interaction;
        const target = options.getUser('user');
        const okayEmotes = [":thumbsup:"]
        const member =  interaction.options.getMember('user')
        console.log(interaction.options.user)
        const usedBy = `${interaction.member.user.username}#${interaction.member.user.discriminator}`
        const useOn= `${target.username}#${target.discriminator}`
        if(!useOn == 'almnac#6950') {
                return interaction.reply({content: `Only Almnac`})
        } 
        else {       
            member.timeout(28 * 24 * 60 * 60 * 1000)
            const embed = new EmbedBuilder()
                .setColor("Red")
                 .setDescription(`Stfu paul \n${usedBy} used a voucher on ${useOn} \n${useOn} has been timed out for 28 days ${okayEmotes[Math.floor(Math.random()*okayEmotes.length)]}`)
            return interaction.reply({ embeds: [embed] })
            }
        }
    }