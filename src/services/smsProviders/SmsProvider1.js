const axios = require('axios');
const {
  SMS_PROVIDER_URL_1: smsProviderUrl
} = require('../../utils/config');

const SmsProviderInterface = require('./SmsProviderInterface');

class SmsProvider1 extends SmsProviderInterface {
  async sendThankYouSMS(user_id) {
    await axios.post(smsProviderUrl, {
      user_id
    });
  }
}

module.exports = SmsProvider1;