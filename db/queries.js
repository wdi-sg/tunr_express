const makePlaceHolders = vals =>
  vals.map((v, i) => `\$${i + 1}`)

const parseParam = param=>Array.isArray(param)?param.join():param
// input [{col,val},{col,val}]

const insert = (tableName,columns,values) => {
  let text =`insert into ${tableName} (${parseParam(columns)}) `
  text += `values (${makePlaceHolders(values)}) `
  text+=`RETURNING id`
  return text;
}

//@param where
//{ id:1, name:'name'}
const select = (tableName, columns, where) => {

  return `select ${columns.join()} from ${tableName} where ${where}`
}

module.exports = {
  insert,
  select
}
