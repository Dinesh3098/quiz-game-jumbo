const Question = require("./index");

exports.questionInsert = async (data) => {
    try {
        const question = await Question.insertMany(data);
        return question;
    } catch (error) {
        throw error;
    }
};

exports.questionAggregate = async (data) => {
    try {
        const question = await Question.aggregate(data)
        return question;
    } catch (error) {
        throw error;
    }
};