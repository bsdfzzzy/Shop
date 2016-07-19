var _ = require('underscore');
var utils;

utils.prototype.arrayOperate = (array) => {
    var newArray = [];
    array.map((item, index) => {
        var parseItem = item.match(/(ITEM[0-9]+)-(\d+)/);
        var parseWithoutNumItem = item.match(/ITEM[0-9]+/);
        if (parseItem) {
            var targetNode = _.find(newArray, (node) => {
                return node.barcode == parseItem[1];
            });
            if (targetNode) {
                targetNode.num += parseItem[2];
            } else {
                newArray.push({barcode: parseItem[1], num: parseItem[2]});
            }
        } else if (parseWithoutNumItem) {
            targetNode = _.find(newArray, (node) => {
                return node.barcode == parseWithoutNumItem[0];
            });
            if (targetNode) {
                targetNode.num += 1;
            } else {
                newArray.push({barcode: parseWithoutNumItem[0], num: 1});
            }
        } else {
            return new Error("there is some of the item not like ITEM[0-9]+");
        }
    });
    return newArray;
}

module.exports = utils;