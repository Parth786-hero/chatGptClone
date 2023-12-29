// const {Configuration , OpenAIApi} = require("openai");
import {Configuration , OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

async function sendMessage(question){
    const res = await openai.createCompletion(
        {
            model : "text-davinci-003",
            prompt : question,
            temperature : 0.7,
            max_tokens :256,
            top_p : 1,
            frequency_penalty : 0,
            presence_penalty : 0 
        }
    );
    // alert("hello");
    return res.data.choices[0].text;
}
export default sendMessage;
