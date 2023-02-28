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
        const scaredEmotes = [ ':scream_cat:', ':julian3:', ':ummm:', ':bandmanalm:', ':awokege:', ':fucksoru:', ':NOWAY:' ]
        
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
                const embed1 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Voucher added for ${userTag} \n Congrats on your first voucher`)
                

            } else {
                const user = data.UserID;
                const username = data.Username;
                console.log("i'm trying")
                const newVoucher = {
                    GivenBy: givenByUser
                }
                data.Vouchers.push(newVoucher);
                data.save()
                const embed2 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Voucher added for ${userTag} \n User now has: ${data.Vouchers.length} vouchers ${scaredEmotes[Math.floor(Math.random()*scaredEmotes.length)]}`)
                }
                
            })

            if(embed1){
                return interaction.reply({ embeds: [embed1] });
            } else {
                return interaction.reply({ embeds: [embed2] });
            }
            
            
    }
}