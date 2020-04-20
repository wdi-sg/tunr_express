const makePlaceHolders = vals =>
  vals.map((v, i) => `\$${i + 1}`)

const parseParam = param=>Array.isArray(param)?param.join():param

// @param where [{id:1}, {name:2}]
// @return [1,2]
// select * from table where x =

const insert = (tableName,columns,values) => {
  let text =`insert into ${tableName} (${parseParam(columns)}) `
  text += `values (${makePlaceHolders(values)}) `
  text+=`RETURNING id`
  return text;
}

//@param where
//{ id:1, name:'name'}
const select = (tableName, columns, where) => {
  let text = `select ${parseParam(columns)} from ${tableName} where `

}

module.exports = {
  insert,
  select
}
