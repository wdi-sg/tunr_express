const makePlaceHolders = vals => vals.map((v, i) => `\$${i + 1}`)
const parseParam = param=>Array.isArray(param)?param.join():param
const parseWhereClause = ((fields, vals)=> {
  const placeHolders = makePlaceHolders(vals)
  let res = ""
  for (let i = 0; i < fields.length;i++ ) {
    res += fields[i] + '=' + `${placeHolders[i]}`
    if (i < fields.length - 1) {
      res+=' and '
    }
  }
  return res;
})

// @param where [{id:1}]
// @return [1,2]
// select * from table where x = $1 and y = $2

const insert = (tableName,columns,values) => {
  let text =`insert into ${tableName} (${parseParam(columns)}) `
  text += `values (${makePlaceHolders(values)}) `
  text+=`RETURNING id`
  return text;
}

//@param where
//{ id:1, name:'name'}
const select = (tableName, selections, where) => {
  const columns = Object.keys(where)
  const vals = Object.keys(where)
  let text = `select ${parseParam(selections)} from ${tableName} where `
  text+=`${parseWhereClause(columns,vals)}`
  return text

}

module.exports = {
  insert,
  select
}
