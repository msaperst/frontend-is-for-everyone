const AWS = require("aws-sdk");
const ec2 = new AWS.EC2();

// Get latest Amazon Linux 2 AMI ID
exports.getLatestAl2AmiId = async function getLatestAl2AmiId({
    amiArch = "x86_64",
}) {
    const params = {
        Owners: ["amazon"],
        Filters: [
            {
                Name: "name",
                Values: ["amzn2-ami-kernel*gp*"],
            },
            {
                Name: "architecture",
                Values: [amiArch],
            },
            {
                Name: "block-device-mapping.volume-type",
                Values: ["gp2", "gp3"],
            },
        ],
    };

    return await ec2.describeImages(params).promise();
};