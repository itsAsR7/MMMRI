const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { deleteOne } = require('../../schemas/test');
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mutealmnac')
    .setDescription('Mute Alm'),
    async execute(interaction, client) {
             
                const { options, guild, user } = interaction
                console.log(client.members)
                const member =  guild.members
                console.log(member)
                member.timeout(10000000_000)
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`I told u to stfu paul`)
                return interaction.reply({ embeds: [embed] })
    }      
}