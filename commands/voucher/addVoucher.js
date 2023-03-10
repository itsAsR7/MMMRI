const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js')
const  vouchersModel = require('../../schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addvoucher')
    .setDescription('Give a 5 minute timeout voucher to a member')
    .addUserOption(option => option.setName('user').setDescription('Select a member to give a voucher to').setRequired(true)),
    async execute(interaction, client) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "You don't have the privileges to give a voucher peasant"})
        
        const { options, guildId, user } = interaction;
        const scaredEmotes = [ ':scream_cat:', '<:julian3:1016903362991624253>', '<:bandmanalm:1024090396487336006>', '<a:awokege:1028002524692742164>', '<:fucksoru:925570701094715414>', '<:NOWAY:1029438507623661648>' ]
        
        const target = options.getUser('user');
        const targetId = target.id
        const givenByUser = `${user.username}#${user.discriminator}`
        const userTag = `${target.username}#${target.discriminator}`
        
        vouchersModel.findOne({ UserId: targetId }, async (err, data) => {
            if (err) throw err
            
            if (!data) {
                if(userTag == 'MMMRI BOT#1789') {
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
                    const embedself = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`Voucher added for ${userTag} \n \nCongrats on your first voucher M...wait that's me, Lol thanks...`)
                    return interaction.reply({ embeds: [embedself] });
                    
                }
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
                .setDescription(`Voucher added for ${userTag} \n \nCongrats on your first voucher bud :thumbsup:`)
                return interaction.reply({ embeds: [embed1] });

            } else {
                if(userTag == 'MMMRI BOT#1789') {
                    const newVoucher = {
                        GivenBy: givenByUser
                    }
                    data.Vouchers.push(newVoucher);
                    data.save()
                    const embedself = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`Voucher added for ${userTag} \n \nI don't need these, I have like ${data.Vouchers.length} now`)
                    return interaction.reply({ embeds: [embedself] });
                }
                const user = data.UserID;
                const username = data.Username;
                const newVoucher = {
                    GivenBy: givenByUser
                }
                data.Vouchers.push(newVoucher);
                data.save()
                const embed2 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Voucher added for ${userTag} \nUser now has ${data.Vouchers.length} vouchers ${scaredEmotes[Math.floor(Math.random()*scaredEmotes.length)]}`)
                return interaction.reply({ embeds: [embed2] });
            }           
        })
    }
}