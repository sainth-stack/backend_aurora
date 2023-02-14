const express = require('express')
const router = express.Router();
const groupModel = require('../models/group.model')
const successResponse = ({ message, data }) => ({ success: true, data: data ? data : null, message });
const failResponse = ({ message, data }) => ({ success: false, data: data ? data : null, message });

router.get('/getgroups', async (req, res) => {
    try {
      const users = await groupModel.find({}).sort({ _id: -1 });
      res.status(200).send(
        successResponse({
          message: 'Users Retrieved Successfully!',
          data: users
        })
      )
    } catch (err) {
      res.status(500).send(
        failResponse({
          message: err ? err.message : "Users Not Fetched!"
        })
      );
    }
  })
  module.exports = router