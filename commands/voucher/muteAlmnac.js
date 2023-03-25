// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { PermissionsBitField, EmbedBuilder } = require('discord.js');
// const { deleteOne } = require('../../schemas/test');
// const  vouchersModel = require('../../schemas/test');

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('mutealmnac')
//     .setDescription('Mute Alm')
//     .addUserOption(option => option.setName('user').setDescription('Select a member to timeout for 5 minutes').setRequired(true)),
//     async execute(interaction, client) {
             
//                 const { options, guild, user } = interaction
//                 console.log(client.members)
//                 const member =  interaction.options.getMember('user')
//                 member.timeout(10000000_000)
//                 const embed = new EmbedBuilder()
//                     .setColor("Red")
//                     .setDescription(`I told u to stfu paul`)
//                 return interaction.reply({ embeds: [embed] })
//     }      
// }