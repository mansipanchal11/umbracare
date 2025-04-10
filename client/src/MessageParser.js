// client/src/MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        this.actionProvider.handleHello();
      } else if (lowerCaseMessage.includes('chai') || lowerCaseMessage.includes('tea')) {
        this.actionProvider.handleTeaQuestion();
      } else if (lowerCaseMessage.includes('maternal health')) {
        this.actionProvider.handleMaternalHealth();
      } else if (lowerCaseMessage.includes('ivf')) {
        this.actionProvider.handleIVF();
      } else if (lowerCaseMessage.includes('period')) {
        this.actionProvider.handlePeriod();
      } else {
        this.actionProvider.handleDefault();
      }
    }
  }
  
  export default MessageParser;