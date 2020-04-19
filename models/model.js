class Model {

  constructor (id = -1) {
    // new object have id -1
    this._data = {}
    this._data.id = id
  }

  get data () {
    return this._data
  }

  set data (data) {
    this._data = data
  }

  getResourceName() {
    if (this.tableName) return this.tableName;
    return this.constructor.name.toLowerCase()
  }

  getPrimaryKey() {
    for (let [key,value] of Object.entries(this.fields)) {
      if (value.primary) return key
    }
  }


}

module.exports = Model