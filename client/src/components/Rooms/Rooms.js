import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import RoomCard from "./RoomCard/RoomCard";
import Spinner from "./../UI/Spinner/Spinner";

class Rooms extends Component {
  state = {
    roomsMongo: [],
    roomsMySQL: [],
    isLoading: true
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        roomsMySQL: [
          {
            id: 123,
            title: "test title",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            category: "Sport",
            members_limit: 25,
            rating: 3,
            background: "https://picsum.photos/300/300/?random",
            members: 3,
          },
          {
            id: 124,
            title: "test title2",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            category: "Education",
            members_limit: 50,
            rating: 4,
            background: "https://picsum.photos/300/300/?random",
            members: 7
          },
          {
            id: 125,
            title: "test title3",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            category: "Music",
            members_limit: 40,
            rating: 4,
            background: "https://picsum.photos/300/300/?random",
            members: 10
          },
          {
            id: 123,
            title: "test title",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            category: "Sport",
            members_limit: 25,
            rating: 3,
            background: "https://picsum.photos/300/300/?random",
            members: 3,
          },
          {
            id: 124,
            title: "test title2",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            category: "Education",
            members_limit: 50,
            rating: 4,
            background: "https://picsum.photos/300/300/?random",
            members: 7
          },
          {
            id: 125,
            title: "test title3",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            category: "Music",
            members_limit: 40,
            rating: 4,
            background: "https://picsum.photos/300/300/?random",
            members: 10
          },
          {
            id: 123,
            title: "test title",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            category: "Sport",
            members_limit: 25,
            rating: 3,
            background: "https://picsum.photos/300/300/?random",
            members: 3,
          },
          {
            id: 124,
            title: "test title2",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            category: "Education",
            members_limit: 50,
            rating: 4,
            background: "https://picsum.photos/300/300/?random",
            members: 7
          },
          {
            id: 125,
            title: "test title3",
            creator_avatar: "https://picsum.photos/300/300",
            description:
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            category: "Music",
            members_limit: 40,
            rating: 4,
            background: "https://picsum.photos/300/300/?random",
            members: 10
          }
        ],
        isLoading: false
      });
    }, 3000);
    // axios.get('/api/rooms')
    //     .then(res=> console.log(res))
    //     .then(res => this.setState({roomsData: res.data.roomsData, roomsMySQL: res.data.roomsMySQL}))
    //     .catch(err=> {
                // console.log(err);
                // this.setState({isLoading:false});
            // })
  }
  render() {
    const { roomsMongo, roomsMySQL, isLoading } = this.state;
    const roomList = isLoading ? 
        <Spinner /> :
        roomsMySQL.map(room => {
            return (
            <RoomCard
                key={room.id}
                title={room.title}
                category={room.category}
                avatar={room.creator_avatar}
                description={room.description}
                limit={room.members_limit}
                rating={room.rating}
                members={room.members}
                background={room.background}
            />
            );
        });
    return (
      <>
        <div>Toolbar</div>
        <Grid container>
          {roomList}
        </Grid>
      </>
    );
  }
}

export default Rooms;
