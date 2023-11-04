const responseObj = (status = false, statusCode = "500", message = messages.SomethingWentWromg, isTokenExpired = false, data = {}) => {
    return { status, statusCode, message, isTokenExpired, data }
}
const messages={
    userDataAdded:"User Data Added Successfully",
    somethingWentWrong:"Something went Wrong",
    wheelsFetched:"wheels Fetched successfully",
    noDataFound:"No Data Found",
    carsDataFound:"cars Data Found",
    bikeDataFound:"Vehicle Data Found",
    ModelsFound:"Models Found Successfully",
    bookedSuccesfully:"Booking Successfully",
    userNotFound:"user Not Found",
    noUpdate:"Not Updated Successfully! check your data properly!",
}
const validations = (requestData, schema, cb) => {
    let keys = Object.keys(requestData);
    console.log("---validations");
    let temp_array = [];
    for (var i in schema) {
      if (
        !keys.includes(schema[i]) ||
        requestData[schema[i]] == null ||
        requestData[schema[i]] == undefined
      ) {
        temp_array.push(schema[i].toUpperCase().replace(/_/g, " "));
      }
    }
    if (temp_array.length > 0) {
      let adverb = temp_array.length > 1 ? " are" : " is";
      let message = temp_array + adverb + " missing";
      cb(message);
    } else cb(null, true);
  };
 const validateHeaders = (requestData, schema, cb) => {
    let keys = Object.keys(requestData)
    let objValues = Object.values(requestData)
    let temp_array = [];
    let temp_array1 = [];
    for (var i in schema) {
        if (!keys.includes(schema[i]) || requestData[schema[i]] == null || requestData[schema[i]] == undefined ||requestData[schema[i]]==""){
          temp_array.push(schema[i].toUpperCase().replace(/_/g, " "))
        }else if(requestData[schema[i]] == null || requestData[schema[i]] == undefined ||requestData[schema[i]]==""){
          temp_array1.push(schema[i].toUpperCase().replace(/_/g, " "))
        }
    }
    if (temp_array.length > 0) {
        let adverb = temp_array.length > 1 ? " are" : " is"
        let message = temp_array + adverb + " missing"
        cb(message)
    } else if (temp_array1.length > 0) {
      let message = temp_array1 + " can't be empty "
      cb(message)
    }else{
        cb(null, true)
    }
}
  const response = (status, statusCode, is_token_expired, message) => {
    return { result: { status, statusCode, is_token_expired, message } };
  };
const _copy = e => JSON.parse(JSON.stringify(e))
module.exports={responseObj,messages,_copy,response,validations,validateHeaders}