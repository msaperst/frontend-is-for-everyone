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

// Get latest Amazon Linux 2 AMI ID
exports.queryEc2Instance = async function getLatestAl2AmiId({ owner }) {
    const params = {
        Filters: [
            {
                Name: "tag:owner",
                Values: [owner],
            },
        ],
    };

    return await ec2.describeInstances(params).promise();
};

// Launch instance
exports.launchEc2Instance = async function launchEc2Instance({ owner }) {
    // Get latest Amazon Linux 2 AMI ID
    const amiData = await this.getLatestAl2AmiId({});
    const latestAl2AmiId = amiData.Images?.sort((a, b) => {
        return (
            new Date(a.CreationDate).getTime() -
            new Date(b.CreationDate).getTime()
        );
    })?.reverse()[0]?.ImageId;

    const params = {
        ImageId: latestAl2AmiId,
        InstanceType: "t2.nano",
        MaxCount: 1,
        MinCount: 1,
        TagSpecifications: [
            {
                ResourceType: "instance",
                Tags: [
                    {
                        Key: "owner",
                        Value: owner,
                    },
                ],
            },
        ],
    };

    return await ec2.runInstances(params).promise();
};

// Terminate instance
exports.terminateEc2Instance = async function terminateEc2Instance({
    instanceId,
}) {
    const params = {
        InstanceIds: [instanceId],
    };

    return await ec2.terminateInstances(params).promise();
};
