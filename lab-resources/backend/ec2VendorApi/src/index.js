const ec2 = require('./ec2');

exports.handler = async (event) => {
    // console.log(`EVENT: ${JSON.stringify(event)}`);

    let returnData = '';

    if (event.httpMethod === 'GET') {
        if (event.path === '/vendor/ami') {
            returnData = await ec2.getLatestAl2AmiId(
                event.queryStringParameters || {}
            );
        } else if (event.path === '/vendor/instance') {
            returnData = await ec2.queryEc2Instance(
                event.queryStringParameters || {}
            );
        }
    } else if (event.httpMethod === 'POST') {
        if (event.path === '/vendor/instance/launch') {
            returnData = await ec2.launchEc2Instance(
                JSON.parse(event.body || {})
            );
        } else if (event.path === '/vendor/instance/terminate') {
            returnData = await ec2.terminateEc2Instance(
                JSON.parse(event.body || {})
            );
        }
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(returnData),
    };
};
