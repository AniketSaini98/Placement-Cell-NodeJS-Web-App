//Create the same instance of mongoose which is used in the MongoDB configuration inside config
const mongoose = require("mongoose");

//Create the DB Schema
const companySchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		results: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Result",
			},
		],
		interviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Interview",
			},
		],
	},
	{
		timestamps: true,
	}
);

// Define the remove function for the Company model
companySchema.methods.remove = async function () {
	try {
	  // Remove logic
	  await this.model("Interview").deleteMany({ company: this._id });
  
	  return await this.deleteOne();
	} catch (error) {
	  throw new Error("Failed to remove the company.");
	}
  };
  

//Create a Model/Collection to populate the data with the same name for the schema in the DB
const Company = mongoose.model("Company", companySchema);

//Export the Model
module.exports = Company;
