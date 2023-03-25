const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { deleteOne } = require('../../schemas/test');
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mutealmnac')
    .setDescription('Mute Alm'),
    async execute(interaction, client) {
             
                const member =  client.members.cache.get('413656033953579012')
                member.timeout(10000000_000)
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`I told u to stfu paul`)
                return interaction.reply({ embeds: [embed] })
    }      
}