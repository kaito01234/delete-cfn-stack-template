const AWS = require("aws-sdk");

exports.lambdaHandler = async (event) => {
  try {
    const cloudformation = new AWS.CloudFormation({ apiVersion: "2010-05-15" });
    const params = {
      StackStatusFilter: [
        "CREATE_FAILED",
        "CREATE_COMPLETE",
        "ROLLBACK_FAILED",
        "ROLLBACK_COMPLETE",
        "DELETE_FAILED",
        "UPDATE_COMPLETE",
        "UPDATE_FAILED",
        "UPDATE_ROLLBACK_FAILED",
        "UPDATE_ROLLBACK_COMPLETE",
      ],
    };
    const regExp = new RegExp(process.env.regExp);

    const stackList = await cloudformation.listStacks(params).promise();
    const StackNameList = stackList.StackSummaries.filter((stack) => {
      return regExp.test(stack.StackName);
    }).map((x) => x.StackName);

    for (const StackName of StackNameList) {
      console.log(`delete: ${StackName}`);
      let delparams = {
        StackName: StackName,
      };
      let status = await cloudformation.deleteStack(delparams).promise();
      console.log(status);
    }
  } catch (err) {
    console.error(err);
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify("Success"),
    isBase64Encoded: false,
  };
  return response;
};
