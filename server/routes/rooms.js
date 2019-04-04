const express = require("express");
const router = express.Router();

const Room = require("../mongoDB/models/modelRoom");
const mySQLRooms = [
  {
    id: 123,
    title: "test title",
    creator_avatar: "https://picsum.photos/200/200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Sport",
    members_limit: 25
  },
  {
    id: 124,
    title: "test title2",
    creator_avatar: "https://picsum.photos/200/200",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Education",
    members_limit: 50
  },
  {
    id: 125,
    title: "test title3",
    creator_avatar: "https://picsum.photos/200/200",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    category: "Music",
    members_limit: 40
  }
];

router.get("/", (req, res) => {
  //Take rooms from mongoDB
  Room.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
  
  // TODO: Take rooms from mySQL
  
    return res.json({ success: true, roomsMongo: data, roomsMySQL: mySQLRooms});
  });
});

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

module.exports = router;
