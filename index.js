const alexaSDK = require('alexa-sdk');
const appId = 'amzn1.ask.skill.24ce7bd1-8bba-4044-be9c-52f689022022'; 
const instructions = 'Welcome to RBS Bank. <break strength="medium" /> my name is lucy, a voice assistant. I can help you to create Foundation and Rewards Account';

exports.handler = function(event, context, callback) {
    console.log("inside handler function");
    var alexa = alexaSDK.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
   
  'LaunchRequest'(){
    console.log("inside launch request");
    this.emit(':ask', instructions);
  },

  'CollectDetailsIntent'() {

    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;

    console.log("slot value ::" + slots);

    if (!slots.FirstName.value) {
      const slotToElicit = 'FirstName';
      const speechOutput = 'Please share your first name';
      const repromptSpeech = 'Can you say your first name please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.LastName.value) {
      const slotToElicit = 'LastName';
      const speechOutput = 'Please share your last name';
      const repromptSpeech = 'Can you say your last name please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.DOB.value) {
      const slotToElicit = 'DOB';
      const speechOutput = 'Please share your date of birth';
      const repromptSpeech = 'Can you say your date of birth please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.ContactNumber.value) {
      const slotToElicit = 'ContactNumber';
      const speechOutput = 'Please share your contact number';
      const repromptSpeech = 'Can you say your contact number please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.PostCode.value) {
      const slotToElicit = 'PostCode';
      const speechOutput = 'Please share your postcode number';
      const repromptSpeech = 'Can you say your postcode please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.DrivingLincense.value) {
      const slotToElicit = 'DrivingLincense';
      const speechOutput = 'Please share your driving license number';
      const repromptSpeech = 'Can you say your driving license number please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    this.emit(':tell', 'Thanks for sharing your personal details, <break strength="medium" /> please give me a moment..we are processing your application..');

  },

  'ReplayDetailsIntent' (){
    const speechOutput = `Your first name is {this.slots.FirstName.value} 
                         <break strength="medium" /> Your last name is {this.slots.LastName.value}, can you confirm your details please? `;
    this.emit(':tell', speechOutput);
  },

  'ProvideAccountIntent' (){
    const speechOutput = 'Fantastic New, We have offered a rewards platinum account and your sort code is 56-00-36 <break strength="medium" /> and your account number is 612323 <break strength="medium" />';
    this.emit(':tell', speechOutput);
  },

  'Unhandled'() {
    console.error('problem', this.event);
    this.emit(':ask', 'I am not currently trained to answer that!');
  },
  
  'AMAZON.HelpIntent'() {
    this.emit(':tell', 'These are your personal details that are mandatory to open an account with RBS.');
  },

  'AMAZON.CancelIntent'() {
    this.emit(':tell', 'Thanks for using voice assistance, hopefully you found it very useful. <break strength="medium" /> Goodbye!');
  },

  'AMAZON.StopIntent'() {
    this.emit(':tell', 'Stopping and exiting the application, hopefully you found it very useful.. <break strength="medium" /> Goodbye!');
  }
};