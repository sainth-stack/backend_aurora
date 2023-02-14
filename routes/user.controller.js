const express = require('express')
const router = express.Router();
const userModel = require('../models/user.models')
const msgModel = require('../models/messages.model')
const successResponse = ({ message, data }) => ({ success: true, data: data ? data : null, message });
const failResponse = ({ message, data }) => ({ success: false, data: data ? data : null, message });

router.get('/', (req, res) => {
  res.send('server is running')
})
router.post('/create', async (req, res) => {
  const user = await userModel.find({ email: req.body.email });
  if (user.length < 1) {
    try {
      let requestBody = {
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        socketid: req.body.socketid,
      }
      const newCompany = new userModel(requestBody);
      await newCompany.save();
      res.status(200).send(
        successResponse({
          message: 'User Created Successfully!',
        })
      );
    } catch (err) {
      res.status(500).send(
        failResponse({
          message: err ? err.message : "User Not Created!"
        })
      );
    }
  }
  else {
    try {
      if (user.length > 0) {
        userModel.updateOne(
          { email: req.body.email },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              type: req.body.type,
              socketid: req.body.socketid
            }
          },
          function (err, result) {
            if (err) throw err;
            else {
              res.send(result)
            }
          }
        );
      }
    } catch (err) {
      res.status(500).send(
        "Failed"
      );
    }

  }
})
router.get('/getusers', async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ _id: -1 });
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
router.get('/getuserbyid/:id/:pagesize/:page', async (req, res) => {
  try {
    const msgs = await msgModel.find({ msgid: req.params.id }).limit(req.params.pagesize).sort({ createdAt: -1 }).skip(req.params.page * req.params.pagesize);
    res.status(200).send(
      successResponse({
        message: 'msg Retrieved Successfully!',
        data: msgs.reverse()

      })
    )
  } catch (err) {
    res.status(500).send(
      failResponse({
        message: err ? err.message : "msg Not Fetched!"
      })
    );
  }
})
router.post('/createmsg/:id', async (req, res) => {
  try {
    const messages = require('../models/messages.model')
    const group = await messages.find({to:req.params.id});
    const body={message:req.body.message,from:req.body.from,time:req.body.time,seen:req.body.seenBy}
    const messagesq={...group[0]._doc,messages:[...group[0]._doc.messages,body]}
    // messagesq.push(body)
    // userModel.updateOne(
    //   { email: req.body.email },
    //   {
    //     $set: {
    //       messages: requestBody
    //     }
    //   },
    //   function (err, result) {
    //     if (err) {
    //       res.send(err)
    //       console.log(err)
    //     }
    //     else {
    //       res.send(result)
    //     }
    //   }
    // );
    res.status(200).send(
      successResponse({
        message: 'msg Created Successfully!',
        data:messagesq
      })
    );
  } catch (err) {
    res.status(500).send(
      failResponse({
        message: err ? err.message : "msg Not Created!"
      })
    );
  }
})

router.put('/updateStatus', async (req, res) => {
  try {
    userModel.updateOne(
      { email: req.body.email },
      {
        $set: {
          status: req.body.status
        }
      },
      function (err, result) {
        if (err) {
          res.send(err)
          console.log(err)
        }
        else {
          res.send(result)
          console.log('update')
        }
      }
    );

  } catch (err) {
    res.status(500).send(
      "Failed"
    );
  }


})

router.put('/updateSeen', async (req, res) => {
  const user = await userModel.find({ email: req.body.email });
  const final = user[0].unseenMessage.map((item) => {
    if (item.seen === false && item.msgid === req.body.msgId ? req.body.msgId : req.body.email) {
      return {
        ...item, seen: true
      }
    }
    else {
      return item
    }
  })
  try {
    userModel.updateOne(
      { email: req.body.email },
      {
        $set: {
          unseenMessage: final
        }
      },
      function (err, result) {
        if (err) {
          res.send(err)
          console.log(err)
        }
        else {
          res.send(result)
        }
      }
    );
  } catch (err) {
    res.status(500).send(
      "Failed"
    );
  }


})

module.exports = router
