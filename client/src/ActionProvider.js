// client/src/ActionProvider.js
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleHello() {
      const message = this.createChatBotMessage('Hello! How can I assist you today?');
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  
    handleTeaQuestion() {
      const message = this.createChatBotMessage(
        'During pregnancy, it’s best to limit caffeine intake. A small cup of tea (less than 200 mg of caffeine per day) is generally safe, but consult your doctor for personalized advice.'
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  
    handleMaternalHealth() {
      const message = this.createChatBotMessage(
        'I can help with maternal health! Would you like to know about nutrition, exercise, or prenatal care?'
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  
    handleIVF() {
      const message = this.createChatBotMessage(
        'For IVF support, you can track your medication and appointments in the IVF Tracker section. Would you like to go there?',
        {
          widget: 'ivfLink',
        }
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  
    handlePeriod() {
      const message = this.createChatBotMessage(
        'You can track your periods in the Period Tracker section. Would you like to go there?',
        {
          widget: 'periodLink',
        }
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  
    handleDefault() {
      const message = this.createChatBotMessage(
        "I'm sorry, I don't have an answer for that. Please select an option from the menu or try asking about maternal health, IVF tracking, or period tracking."
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  }
  
  export default ActionProvider;