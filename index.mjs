import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export const buildBasepath = (botToken) => `https://api.telegram.org/bot${botToken}`;

const sendMessage = async (message) => {
  const response = await fetch(`${buildBasepath(process.env.TELEGRAM_BOT_TOKEN)}/sendMessage`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
          link_preview_options:{
              is_disabled: true,
          }
      }),
  });
  const responseData = (await response.json());
  if (!responseData.ok) {
      throw new Error(`Failed to send message to Telegram: ${JSON.stringify(responseData.result, null, 2)}`);
  }
  return responseData;
};

while (true) {
  //Helius
  const apikey = uuidv4();
  const data = await (await fetch(`https://rpc.helius.xyz/?api-key=${apikey}`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({"jsonrpc":"2.0","id":"1", "method":"getHealth"})
  })).json();
  if(!data.error && data.result && data.result === "ok") {
    console.log(`${apikey}`);
    sendMessage(`helius: ${apikey}`)
  } else if (data.error.message != 'api key not found') {
    console.log(data);
  }
//   console.log(data);
//   await new Promise(resolve => setTimeout(resolve, 1));

  // https://rpc.hellomoon.io/${apikey}
  try{
  data = await (await fetch(`https://rpc.hellomoon.io/${apikey}`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({"jsonrpc":"2.0","id":"1", "method":"getHealth"})
    })).json();
    if(!data.error && data.result && data.result === "ok") {
      console.log(`${apikey}`);
      sendMessage(`hellomoon: ${apikey}`)
    } else if (data.error.message != 'api key not found') {
      console.log(data);
    }
    console.log(data);
  } catch(e){
      // console.log(e);
  }
  console.log('.');
//   await new Promise(resolve => setTimeout(resolve, 1));
};



