# azure-storage-extension
NodeJS Azure Storage Extensions

Helpers to the azure-storage npm module.

Queries to Azure tables may occasionally return a continuation token for a variety of reasons (see http://blog.smarx.com/posts/windows-azure-tables-expect-continuation-tokens-seriously). The following is an example of how to use the queryEntitiesContinuation extension method to automatically retrieve data when a continuation token is present.

//create azure table service
var tableService = azure.createTableService("AZURE_STORAGE_ACCOUNT","AZURE_STORAGE_ACCESS_KEY").withFilter(retryOperations);

//query
var myQuery = new azure.TableQuery()
              .where(whereClause);

//get data automatically retrieving data where there is a continuation token
tableService.queryEntitiesContinuation('Table', myQuery, null, function (error, result) {
    var allResults  = result.entries;
});
