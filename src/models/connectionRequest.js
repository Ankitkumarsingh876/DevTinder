const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        formUserId : {
            type:mongoose.Schema.Types.ObjectId,
            require: true,

        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        status: {
            type: String,
            enum: {
                values: ["interest","ingnored","accedpted","rejected"],
                message: `{value} is incorrect`,
            },
        }
    }, {timestamps: true,}
);

connectionRequestSchema.index({formUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save",function(next) {
    const connectionRequest= this;
    if(connectionRequest.formUserId.equals(connectionRequest.toUserId)){
        throw new Error("can not send connection request to yourself!");
    }
    next();
})

const connectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = connectionRequestModel;