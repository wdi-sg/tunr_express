const makePlaceHolders = (vals, initial = 0) =>
  vals.map((v, i) => `\$${i + initial + 1}`)

const parseParam = param => Array.isArray(param) ? param.join() : param

const parseWhereClause = ((fields, vals, startIdx = 0) => {
  const placeHolders = makePlaceHolders(vals, startIdx)
  let res = ''
  for (let i = 0; i < fields.length; i++) {
    res += fields[i] + '=' + `${placeHolders[i]}`
    if (i < fields.length - 1) {res += ' and '}
  }
  return res
})

// @param columns {Array} [id, name]
// @param values {Array} ['dfd','dfd','dfd']
const prepareInsertStmt = (tableName, columns, values) => {
  let stmt = `insert into ${tableName} (${parseParam(columns)}) `
  stmt += `values (${makePlaceHolders(values)}) `
  stmt += `RETURNING id`
  return stmt
}

// @param  where {id:1}
// @returns update table (name1,name2) = ($1,S2) where column1 = $4
const prepareUpdateStmt = (tableName, columns, values, where) => {
  const whereCols = Object.keys(where)
  const whereVals = Object.keys(where)
  const wherePlaceHolderStartIdx = columns.length
  let stmt = `update ${tableName} \set (${parseParam(columns)})=`
  stmt += `(${makePlaceHolders(values)}) where `
  stmt += `${parseWhereClause(whereCols, whereVals, wherePlaceHolderStartIdx)}`
  return stmt
}

// @param where { id:1, name:'name'}
// @returns select column1, column2 column3 from table
// where column1=$1 and column2 = $2
const prepareSelectStmt = (tableName, selections, where) => {
  let stmt = `select ${parseParam(selections)} from ${tableName}`
  if (where) {
    const whereCols = Object.keys(where)
    const whereVals = Object.keys(where)
    stmt += ` where ${parseWhereClause(whereCols, whereVals)}`
  }
  return stmt
}

const prepareDeleteStmt = (tableName, where) => {
  const whereCols = Object.keys(where)
  const whereVals = Object.keys(where)
  let stmt = `delete from ${tableName} `
  stmt += `where ${parseWhereClause(whereCols, whereVals)} `
  stmt += `returning id`
  return stmt
}

module.exports = {
  prepareInsertStmt,
  prepareSelectStmt,
  prepareUpdateStmt,
  prepareDeleteStmt,
}
