/**
 * test
 */

var query = require('../lib/queryBuilder').query;

var myQuery = new query('View');
myQuery.eq('viewCateId', 1).eq('cityId', 1).like('viewName', '大夫山');

console.log(myQuery);