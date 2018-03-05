const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');
awsSDK.config.update({
  region: "us-east-1"
});

const promisify = require('es6-promisify');

const appId = 'amzn1.ask.skill.acb69831-dfac-46d5-9a9b-fcb100f22fb9'; // fill before deploying 
//const recipesTable = 'Recipes';


const instructions = `Welcome to R B S <break strength="medium" /> 
                      I am CORA, your personal assistant. How can I help you ?`;
const reqMessage = `Sorry, The page is under construction`;
const reqMessage2 = `Hi, Welcome to Alexa`;

const capableOfMessage = 'I am CORA, I can help you to create a new account with RBS, you can say <break strength="medium"/> Create a new account'
exports.handler = function(event, context, callback) {
    var alexa = alexaSDK.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {

  /**
   * Triggered when the user says "Alexa, open Recipe Organizer.
   */
  'LaunchRequest'(){
    this.emit(':ask', instructions);
  },
  'capableOfIntent'(){
    console.log(capableOfMessage);
    this.emit('ask', capableOfMessage);
  },
  'getFirstName'(){
    let output="Please tell me your first name";
    this.emit(':ask', output);
  },
  'createAccount'(){
    const { slots } = this.event.request.intent;
    // RecipeName
    if (!slots.FirstName.value) {
      const slotToElicit = 'FirstName';
      const speechOutput = 'Sure, Please tell me your first name';
      const repromptSpeech = 'Please tell me your first name';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    if (!slots.LastName.value) {
      const slotToElicit = 'LastName';
      const speechOutput = 'What is your last name?';
      const repromptSpeech = 'Please tell me your last name';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    if (slots.LastName.value && slots.FirstName.value){
      let output=`Congratulations Mr. ${slots.LastName.value} ${slots.FirstName.value}. Your account has been successfully created`;
      this.emit(':ask', output);
    }

  },
  'createAccounts'(){
    let output="Sure, I can help you in creating a new account";
    this.emit(':ask', output);
    // const { slots } = this.event.request.intent;
    // console.log('%j', slots);
    //intialize dynamo param
    // const dynamoParams = {
    //     TableName: shipmentDetailsTable
    // };

    // //if there are not 
    // if (!slots.product.value)  {
    //   let output="";
    //   console.log('value not present in speech')


    //   dbScan(dynamoParams)
    //   .then(data => {
    //     console.log('Read table succeeded!', data);

    //     if (data.Items && data.Items.length) {
    //       output = `There are totoally ${data.Count} shipments for your account <break strength="medium"/>`
    //       data.Items.forEach(item => {

    //        output += `${item.product}<break strength="x-strong" /> which one do you want to know about?`; 
    //      });
    //     }
    //     else {
    //       output = 'No shipment found for your account!';
    //     }
    //   const slotToElicit = 'product';
    //   const speechOutput = output;
    //   const repromptSpeech = 'Please tell me the name of the product';
    //   return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    // }else if(slots.product.value){
    //   console.log('value present in speech')
    //    let output="";
      
    //   dynamoParams.FilterExpression = 'product = :product';
    //   dynamoParams.ExpressionAttributeValues = { ':product': slots.product.value};
    //   console.log('start query')
    //   // query DynamoDB
    // dbScan(dynamoParams)
    //   .then(data => { 
    //     console.log('Read table succeeded!', data);
    //     if (data.Items && data.Items.length) {
    //         if(data.Items.length == 1){
    //             let product = data.Items[0];
    //             console.log('order status %j', product.orderStatus)
    //             if(product && product.orderStatus == "delivered"){
    //               console.log('delivered');
    //               output = `According to our data, your ${product.product} has been delivered to you on ${product.currentETA}<break strength="medium"/> If you have not recieved the order, i can help you to contact customer support.`
    //             }else if(product && product.orderStatus == "in transit"){
    //               console.log('in transit');
    //               output = `According to our data, your ${product.product} is in transit<break strength="medium"/> It will reach you on ${product.currentETA} between  ${product.deliveryWindow}`
    //             }
    //         }else if(data.Items.length == 0 ){
    //           output = `I couldn't see any such product been ordered`;

    //         }
    //     }
    //     else {
    //       output = 'No shipment found for your account!';
    //     }

    //     console.log('output', output);

    //     this.emit(':ask', output);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    // }
   
  },

  // 'getAllShipmentIntent'(){
  //   let output="";
  //     const dynamoParams = {
  //       TableName: shipmentDetailsTable
  //     };
  //     console.log('start query')
  //     // query DynamoDB
  //   dbScan(dynamoParams)
  //     .then(data => {
  //       console.log('Read table succeeded!', data);

  //       if (data.Items && data.Items.length) {
  //         output = `There are totally ${data.Count} shipments for your account <break strength="medium"/> `
  //         let count = 0;
  //         data.Items.forEach(item => {
  //           count = count+1;
  //          output += `${item.product}<break strength="x-strong" />`; 
  //           if(count < data.Items.length){
  //             output += ' and '
  //           }
  //        });
  //       }
  //       else {
  //         output = 'No shipment found for your account!';
  //       }

  //       console.log('output', output);

  //       this.emit(':ask', output);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // },

//   'addNewShipmentIntent'(){
//     const { userId } = this.event.session.user;
//     const { slots } = this.event.request.intent;

//     console.log('event : ' + this.event);
//     console.log('req :' + this.request);
//     console.log('confirmation : '+ slots.Shipper.confirmationStatus)
//     // RecipeName
//     if (!slots.Shipper.value) {
//       const slotToElicit = 'Shipper';
//       const speechOutput = 'What is the name of the shipper?';
//       const repromptSpeech = 'Please tell me the name of the shipper';
//       return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
//     }
//     console.log('after :' + slots);
//   },


//   'trySaveDataIntent'() {
//   const dynamoParams = {
//       TableName: shipmentDetailsTable,
//       Item: {
//         Customer : 'DHL',
//         UserId: 'Prasad',
//         Origin: 'London',
//         Destination: 'New York'
//       }
//     };

// const checkIfShipmentFound = {
//       TableName: shipmentDetailsTable,
//       Key: {
//         UserId : 'Prasad'
//       }
//     };
  
//   dbGet(checkIfShipmentFound)
//       .then(data => {
//         console.log('Get item succeeded', data);

//         const recipe = data.Item;

//         if (recipe) {
//           const errorMsg = `Customer DHL already exists!`;
//           this.emit(':tell', errorMsg);
//           throw new Error(errorMsg);
//         }
//         else {
//           // no match, add the recipe
//           return dbPut(dynamoParams);
//         }
//       })
//       .then(data => {
//         console.log('Add item succeeded', data);

//         this.emit(':tell', `Shipment DHL added!`);
//       })
//       .catch(err => {
//         console.error(err);
//       });
    
    
//   },

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