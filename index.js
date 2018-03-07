const alexaSDK = require('alexa-sdk');
const appId = 'amzn1.ask.skill.24ce7bd1-8bba-4044-be9c-52f689022022'; 
const instructions = `Welcome to RBS Bank. <break strength="medium" /> 
                      my name is lucy, a voice assitant, I can help you to create Foundation and Rewards Account`;

exports.handler = function(event, context, callback) {
    var alexa = alexaSDK.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {

  /**
   * Triggered when the user says "Alexa, open RBS account opening.
   */
  'LaunchRequest'(){
    this.emit(':ask', instructions);
  },

  'CollectDetailsIntent'(){

    console.log('colloct details intent');
    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;

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
  },

  'Unhandled'() {
    console.error('problem', this.event);
    this.emit(':ask', 'I am not currently trained to answer that!');
  },
  
  'AMAZON.HelpIntent'() {
    const speechOutput = instructions;
    const reprompt = instructions;
    this.emit(':ask', speechOutput, reprompt);
  },

  'AMAZON.CancelIntent'() {
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.StopIntent'() {
    this.emit(':tell', 'Goodbye!');
  }
};