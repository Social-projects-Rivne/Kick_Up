const express = require("express");
const router = express.Router();

const Room = require("./../mongoDB/models/modelRoom");

router.post("/save-room", (req, res) => {
  const {
    room_id,
    moderators_list,
    gallery,
    tags,
    room_information
  } = req.body;
  let newRoom = new Room();
  if (
    !room_id ||
    !moderators_list ||
    !gallery ||
    !tags ||
    !weight ||
    !room_information
  ) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  newRoom.room_id = room_id;
  newRoom.comments = [];
  newRoom.moderators_list = moderators;
  newRoom.gallery = photos;
  newRoom.tags = tags;
  newRoom.members = [];
  newRoom.room_information = information;
  newRoom.ratings = [];
  newRoom.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  const { hello } = req.body;
  res.send(hello);
});

router.get("/", (req, res) => {
  Room.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, roomData: data });
  });
  res.send("hello world");
});

module.exports = router;
