const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mmmri')
    .setDescription('The truth about MMMRI'),
    async execute(interaction, client) {
    
        return interaction.reply({ content: "We are all sitting in the waiting room called life, waiting. Waiting for our appointment with death. So, you pick up the metaphoric magazine and pass the time. Whether it's digital media, drugs, sex, religion, career, whatever floats your boat, we all need something to occupy ourselves with while we wait. We all know how this ends." })
    }
}