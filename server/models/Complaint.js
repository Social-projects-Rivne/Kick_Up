const { bookshelf } = require('../config/database');
const Complaint = bookshelf.Model.extend({
    tableName: 'complains',
    initialize() {
      this.on('creating', this.setCreatedAt, this);
      this.on('saving', this.setUpdatedAt, this);
    },
    creator() {
      return this.belongsTo('User', 'user_id');
    },
    setCreatedAt: model => {
      model.set('created_at', new Date());
    },
    setUpdatedAt: model => {
      model.set('updated_at', new Date());
    }
  });

module.exports = bookshelf.model('Complaint', Complaint);