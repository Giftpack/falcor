var pathsets = require("../pathsets/json-sparse");
var options  = require("../support/json-options")(require("../support/options"));
var sequence = require("../walk/sequence");
var getNode  = require("../get/node");
var getLink  = require("../get/hard-link")(getNode);
var addReq   = require("../get/add-requested-key");
var onError  = require("../support/on-error");
var onEmpty  = require("../pathsets/on-empty");

var getJSONNode  = require("../json-sparse/node");
var getJSONEdge  = require("../json-sparse/edge");
var checkExpired = require("../support/check-expired");

var onNode   = sequence(getLink, getNode, addReq, getJSONNode);
var onEdge   = sequence(checkExpired, getJSONEdge, onError, onEmpty);

module.exports = pathsets(options, onNode, onEdge);