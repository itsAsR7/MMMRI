const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addvoucher')
    .setDescription('Van is a fag')
    
    .addUserOption(option => option.setName('user').setDescription('Select a member to give a voucher to mute anyone (literally).').setRequired(true)),
    async execute(interaction, client) {

        console.log(interaction.options.user)
        
        const { options, guildId, user } = interaction;
        
        const target = options.getUser('user');
        console.log(target)
        console.log(user)
        const targetId = target.id
        console.log(targetId)
        const givenByUser = `${user.username}#${user.discriminator}`
        const userTag = `${target.username}#${target.discriminator}`
        
        vouchersModel.findOne({ UserId: targetId }, async (err, data) => {
            if (err) throw err

            console.log(targetId)
            if (!data) {
                console.log(targetId)
                data = vouchersModel.create({
                    
                    GuildId: guildId,
                    UserId: targetId,
                    Username: userTag,
                    Vouchers: [
                        {
                            GivenBy: givenByUser
                        }
                    ]
                })
            } else {
                const user = data.UserID;
                const username = data.Username;
                console.log("i'm trying")
                const newVoucher = {
                    GivenBy: givenByUser
                }
                data.Vouchers.push(newVoucher);
                data.save()
                }
            })

            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`Voucher added for :${userTag}`)
            const member = interaction.options.getMember('user');
            return interaction.reply({ embeds: [embed] });
    }
}