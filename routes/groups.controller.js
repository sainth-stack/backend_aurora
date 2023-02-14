const express = require('express')
const router = express.Router();
const groupModel = require('../models/group.model')
const grouptoUserModel = require('../models/user-to-group.model')
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
  router.get('/getgroupsbyid/:id', async (req, res) => {
    try {
      const usertogrp = await grouptoUserModel.find({});
      const finalData = usertogrp.filter((item)=>{
        return item.userid === req.params.id
      })
      res.status(200).send(
        successResponse({
          message: 'groups Retrieved Successfully!',
          data: finalData
  
        })
      )
    } catch (err) {
      res.status(500).send(
        failResponse({
          message: err ? err.message : "groups Not Fetched!"
        })
      );
    }
  })
  module.exports = router