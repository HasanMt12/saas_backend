const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// Helper function to generate 6-digit unique code
function generateResellerId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const shopInfoSchema = new Schema({
  shopName: String,
  // shopAddress: String,
  contactNumber: String
}, { _id: false }); // Set _id to false if you don't need individual _id for shopInfo

const resellerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email validation
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    default: 'reseller'
  },
  status: {
    type: String,
    default: 'active'
  },
  payment: {
    type: String,
    default: 'inactive'
  },
  method: {
    type: String,
    // required: true,
    default: "menualy"
  },
  image: {
    type: String,
    default: ''
  },
  shopInfo: {
    type: shopInfoSchema, // Use a schema for shopInfo
    default: {}
  },
  resellerId: {
    type: String,
    unique: true,
    default: generateResellerId
  }
}, { timestamps: true });
resellerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
resellerSchema.index({
  name: 'text',
  email: 'text'
}, {
  weights: {
    name: 5,
    email: 4
  }
});

module.exports = model('resellers', resellerSchema);
