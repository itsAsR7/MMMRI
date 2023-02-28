const { model, Schema } = require('mongoose');

let voucherSchema = new Schema({
    GuildId: String,
    UserId: String,
    Username: String,
    Vouchers: Array
})

module.exports = model('Vouchers', voucherSchema)