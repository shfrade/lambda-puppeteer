// "use strict";
const chromium = require("chrome-aws-lambda");
var qs = require("querystring");
// module.exports.hello = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Go Serverless v1.0! Your function executed successfully!"
//       // input: event
//     })
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
module.exports.hello = async (event, context) => {
  let result = null;
  let browser = null;
  let post_data = qs.parse(event.body);
  if (post_data.url == undefined) {
    return {
      statusCode: 422,
      body: "give me a url"
    };
  }
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    });

    let page = await browser.newPage();

    await page.goto(post_data.url);

    result = await page.title();
    return {
      statusCode: 200,
      body: JSON.stringify({
        result
      })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: "shit happens"
    };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  return {
    statusCode: 200,
    body: "its a mess here"
  };
};
