const { bookshelf } = require('./../config/database');
const Member = bookshelf.Model.extend(
  {
    tableName: 'members',
    initialize() {
      this.on('creating', this.setCreatedAt, this);
    },
    async setCreatedAt() {
      this.set('created_at', new Date());
    },
    users() {
      return this.hasMany('User','id','user_id');
  },
  }
);

module.exports = bookshelf.model('Member', Member);