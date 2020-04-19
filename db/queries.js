const insert = (tableName,columns,values) => {
  let text =`insert into ${tableName} (${columns.join()}) `
  text += `values (${this._makePlaceHolders(values)}) `
  text+=`RETURNING id`
  return text;
}

module.exports = {
  insert

}
