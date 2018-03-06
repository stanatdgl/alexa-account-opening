const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');
awsSDK.config.update({
  region: "us-east-1"
});

const promisify = require('es6-promisify');

const appId = 'amzn1.ask.skill.acb69831-dfac-46d5-9a9b-fcb100f22fb9'; // fill before deploying 

const instructions = `Welcome to RBL Bank. <break strength="medium" /> 
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

  'PersonalDetailsIntent'(){
    console.log('inside personal details intent');
    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;

    if (!slots.FirstName.value) {
      const slotToElicit = 'FirstName';
      const speechOutput = 'What is your first name?';
      const repromptSpeech = 'Can you say your first name please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.LastName.value) {
      const slotToElicit = 'LastName';
      const speechOutput = 'What is your last name?';
      const repromptSpeech = 'Can you say your last name please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.DOB.value) {
      const slotToElicit = 'DOB';
      const speechOutput = 'What is your date of birth?';
      const repromptSpeech = 'Can you say your date of birth please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }


  },

  'AddressDetailsIntent'(){
    console.log('inside address details intent');
    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;

    if (!slots.PostCode.value) {
      const slotToElicit = 'PostCode';
      const speechOutput = 'What is your postcode?';
      const repromptSpeech = 'Can you say your postcode please?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

  },

  'IdentificationDetailsIntent'(){
    console.log('inside identification details intent');
    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;

    if (!slots.DrivingLincense.value) {
      const slotToElicit = 'DrivingLincense';
      const speechOutput = 'What is your driving license number?';
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