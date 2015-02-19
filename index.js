var azure = require('azure-storage');

azure.TableService.prototype.queryEntitiesContinuation = function (tableName, query, maxContinuationCount, callback) {

    var tableService = this;
    var data = new Array();
    var countinuationCount = 0;
    var operation = function (tableName, query, continuationToken) {
        tableService.queryEntities(tableName, query, continuationToken, function (error, result) {

            if (!error) {
                if (result.continuationToken) {

                    result.entries.forEach(function (entry) {
                        data.push(entry);
                    });

                    if (maxContinuationCount === null || countinuationCount < maxContinuationCount) {
                        ++countinuationCount;
                        operation(tableName, query, result.continuationToken);
                    } else {
                        callback(error, result);
                    }

                    
                } else {

                    data.forEach(function (entry) {
                        result.entries.push(entry)
                    });

                    callback(error, result);
                }
            } else {

                result.entries.push(data);
                callback(error, result.entries);
            }
        });
    };

    operation(tableName, query, null);
};

module.exports = azure;
