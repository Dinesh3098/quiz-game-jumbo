exports.createResponse = (res, statuscode, status, msg, data) => {
    let responseObj = {
        status: status,
        msg: msg,
    }
    if (data) {
        responseObj.data = data
    }
    return res.status(statuscode).json(responseObj);
}