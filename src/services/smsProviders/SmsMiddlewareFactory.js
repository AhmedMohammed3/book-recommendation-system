const SmsProvider1 = require('./SmsProvider1');
const SmsProvider2 = require('./SmsProvider2');
const {
  USING_SMS_PROVIDER
} = require('../../utils/config');

class SmsMiddlewareFactory {
  /**
   * @type SmsProviderInterface
   */
  static smsProvider;
  static createSmsProvider() {
    switch (USING_SMS_PROVIDER) {
      case 'provider1':
        SmsMiddlewareFactory.smsProvider = new SmsProvider1();
        break;
      case 'provider2':
        SmsMiddlewareFactory.smsProvider = new SmsProvider2();
        break;
      default:
        throw new Error('Invalid SMS provider configuration');
    }
  }

  static getSmsProvider() {
    if (!SmsMiddlewareFactory.smsProvider) {
      SmsMiddlewareFactory.createSmsProvider();
    }
    return SmsMiddlewareFactory.smsProvider;
  }
}

module.exports = SmsMiddlewareFactory;