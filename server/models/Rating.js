const { bookshelf } = require('./../config/database');
const Event = require('./../models/Event');
const Room = require('./../models/Room');
const{ floor,sum } = require('lodash');
const constants = require('./../config/constants');

const Rating = bookshelf.Model.extend(
  {
    tableName: 'ratings',
    initialize() {
      this.on('created', this.recalcRating, this);
      this.on('updated', this.recalcRating, this);
    },
    async recalcRating() {
      const entity_type = await this.get('entity_type');
      const entity_id = await this.get('entity_id');
      if(entity_type === constants.rating.entity_types.room){
        const room = await Room.where({id: entity_id}).fetch({withRelated: ['creator','category','rating']});
        const rating = await this.where({entity_id, entity_type}).fetchAll();
        const roomRating = floor(sum(rating.serialize().map(i => i.rating))/rating.length,2);
        await room.save({roomRating}, { patch: true })
      }else{ 
        const event = await Event.where({id: entity_id}).fetch({withRelated: ['creator','category','rating']});
        const rating = await this.where({entity_id, entity_type}).fetchAll();
        const eventRating = floor(sum(rating.serialize().map(i => i.rating))/rating.length,2);
        await event.save({eventRating}, { patch: true })
      }
    }
  }
);

module.exports = bookshelf.model('Rating', Rating);