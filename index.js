const alexaSDK = require('alexa-sdk');
const appId = 'amzn1.ask.skill.24ce7bd1-8bba-4044-be9c-52f689022022'; 
const instructions = 'Welcome to RBS Bank. <break strength="medium" /> my name is lucy, a voice assistant '
+ 'I can help you to create Foundation and Rewards Account, <break strength="medium" />' 
+ 'Can I use your amazon account details for this process <break strength="medium" /> or you can share your details';

const accountOpenOutput = '<say-as interpret-as="interjection">Fantastic News </say-as>,'
+ '<break time="1s"/> We have offered you a rewards platinum account'
+ 'and your sort code is 56-00-36 <break strength="medium" /> and your account number is 612323'
+ '<break strength="medium" /> Thank you for banking with us. You can start using our other digital services. Thank you';

const processingOutput = 'Thanks for sharing your details, <break strength="medium"/>'
+ 'please give me a moment. I am processing your application. <break strength="strong" />';

exports.handler = function(event, context, callback) {
    var alexa = alexaSDK.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
   
  'LaunchRequest'(){
    this.emit(':ask', instructions);
  },

  'UseAmazonDetailsIntent'(){
    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;
    const intentObj = this.event.request.intent;

   if (intentObj.confirmationStatus == 'NONE') {
       const speechOutput = 'Please wait, I am retriving your details <break time="2s"/> Here are your details <break time="1s"/> '
        + 'your first name is Stan and last name is prabu, <break time="1s"/> '
        + 'your post code number is S6 7JH <break time="2s"/> and '
        + 'your contact number is 071234567890, <break time="2s"/> are these details correct?';      
      const repromptSpeech = speechOutput;
      return this.emit(':confirmIntent', speechOutput, repromptSpeech, intentObj);
   }else if(intentObj.confirmationStatus == 'DENIED'){
      const speechOutput = 'No problem at all I will take you through the standard account opening process';
      return this.emit(':tell', speechOutput);
   }else if(intentObj.confirmationStatus == 'CONFIRMED'){
      if (!slots.AccountType.value) {
        const slotToElicit = 'AccountType';
        const speechOutput = 'What type of account do you want to open today?';
        const repromptSpeech = 'Can you please tell me what type of account, do you want to open today?';
        return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }else if (!slots.DrivingLincense.value) {
        const slotToElicit = 'DrivingLincense';
        const speechOutput = 'We also require your driving license number as well to process your application';
        const repromptSpeech = 'Sorry, I didnt catch quiet correctly, can you please repeat once again?';
        return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }else {
      const speechOutput = 'Here are your details, your first name is Stan and last name is prabu, <break strength="medium"/> ' 
      + 'your post code number is S6 7JH, your contact number is 071234567890, ' 
      + 'Your driving lincense number is ' + slots.DrivingLincense.value;
      const overallouput = speechOutput + ' <break time="3s"/> '+ processingOutput + ' <break time="5s"/> ' +accountOpenOutput;
      return this.emit(':tell', overallouput);
    }
   }
  
  },

  'CollectDetailsIntent'() {
    const intentObj = this.event.request.intent;
    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;

    if (!slots.AccountType.value) {
      const slotToElicit = 'AccountType';
      const speechOutput = 'What type of account do you want to open today?';
      const repromptSpeech = 'Can you please tell me what type of account, do you want to open today?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
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
      const repromptSpeech = 'Sorry, I didnt get that, Could you please share your contact number?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.PostCode.value) {
      const slotToElicit = 'PostCode';
      const speechOutput = 'Please share your postcode number';
      const repromptSpeech = 'Sorry, I didnt get that, Could you please share your postcode?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    if (!slots.DrivingLincense.value) {
      const slotToElicit = 'DrivingLincense';
      const speechOutput = 'Please share your driving license number';
      const repromptSpeech = 'Sorry, I didnt get that, Could you please share your driving license number ';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
  
    if (intentObj.confirmationStatus == 'NONE') {
      const speechOutput = 'Please verify your details before I proceed to process your inputs <break strength="medium" /> '
        + 'Your first name is ' + slots.FirstName.value + ' Your last name is ' + slots.LastName.value
        + 'Your contact number is ' + slots.ContactNumber.value + ' Your post code number is ' + slots.PostCode.value 
        + 'Your driving lincense number is ' + slots.DrivingLincense.value +' are these details correct?';
      const repromptSpeech = speechOutput;
      return this.emit(':confirmIntent', speechOutput, repromptSpeech, intentObj);
    }else if(intentObj.confirmationStatus == 'CONFIRMED'){
      const overallouput = processingOutput + ' <break time="5s"/> ' +accountOpenOutput;
      return this.emit(':tell', overallouput);
    }else if (intentObj.confirmationStatus == 'DENIED'){
      const speechOutput = 'No problem at all, will take through the process once again';
      return this.emit(':tell', speechOutput);
    }  
  },

  'Unhandled'() {
    console.error('problem', this.event);
    this.emit(':ask', 'I am not currently trained to answer that!');
  },
  
  'AMAZON.HelpIntent'() {
    this.emit(':tell', 'These are your personal details that are mandatory to open an account with RBS.');
  },

  'AMAZON.CancelIntent'() {
    this.emit(':tell', 'Thanks for using voice assistant, hopefully you found it very helpful. <break strength="medium" /> Goodbye!');
  },

  'AMAZON.StopIntent'() {
    this.emit(':tell', 'Stopping and exiting the application, hopefully you found it very useful.. <break strength="medium" /> Goodbye!');
  }
};