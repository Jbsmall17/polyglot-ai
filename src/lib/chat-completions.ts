import axios from "axios";

export const generateText = async (text: string) => {
  let result;
  const messages = [
        {
          role: "system",
          content:
            "you are a Language translator. translate sentence to specified languages using simple words",
        },
        {
          role: "user",
          content: text,
        },
      ]
  try {
    const response = await axios.post('https://openai-api-worker.alaomiyaki17.workers.dev/',messages)
    console.log(response.data.content)
    result = response.data.content
  } catch (err) {
    console.log("err:", err);
    result = "";
  }
  return result;
};
