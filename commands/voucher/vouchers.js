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
        const userTag = `${target.username}#${target.discriminator}`
        vouchersModel.findOne({ UserId: target.id}, async (err, data) => {
            if(!data) {
                return interaction.reply({content: `Lol this corny ass has no vouchers`})
            } else {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`${userTag} has ${data.Vouchers.length} vouchers`)

                return interaction.reply({ embeds: [embed] })
            }
        });
    }
}