class SmsProviderInterface {
    constructor() {
      if (new.target === SmsProviderInterface) {
        throw new Error("Cannot instantiate abstract class");
      }
    }
  
    async sendThankYouSMS(user_id) {
      throw new Error("Method not implemented");
    }
  }
  
  module.exports = SmsProviderInterface;
  