module.exports = (poolInstance) => {

    /*
    export functions to enable crud in database
    callbacks are given by controller
    as model must not interact with views
     */
    let create = (userInput, callback) => {
        let query =
        `insert into students (name)
        values ($1)
        returning *`;
        poolInstance.query(query, [userInput], (err, result)=> {
            if (err) {
                callback(err, null);
            } else {
                if (result.rows.length > 0){
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let read = (callback) => {
        let query = 'select * from students';
        poolInstance.query(query, (err, result)=>{
            if (err) {
                callback(err, null);
            } else {
                if (result.rows.length > 0){
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let update = (userInput, callback) => {
        // do smth
    }

    let destroy = (userInput, callback) => {
        // do smth
    }

    return {
        create: create,
        read: read,
        update: update,
        destroy: destroy,
    };
}