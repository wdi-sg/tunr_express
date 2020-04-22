const Model = require('./model')

class User extends Model{
 constructor (id, user_name, password) {
  super(id);
  this.user_name =  user_name;
  this.password = password
 }

}