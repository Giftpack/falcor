var clone = require("../support/clone");
var cloneJSONValue = require("./cloneJSON");
module.exports = function(opts, set, depth, key, isKeySet) {
    
    var offset   = opts.offset;
    var values   = opts.values;
    var jsonRoot = values && values[0];
    
    // Only create an edge if:
    //  1. The caller supplied a JSON root seed.
    //  2. The path depth is past the bound path length.
    //  3. The current node is a branch or reference.
    if(jsonRoot != null && depth >= offset) {
        
        var node  = opts.node;
        var type  = opts.type;
        
        if(opts.materialized || (!!type && (type != "error" || opts.errorsAsValues))) {
            
            opts.requestedPaths.push(clone(opts.requestedPath));
            opts.optimizedPaths.push(clone(opts.optimizedPath));
            
            var value = !!type ? node.value : node;
            var keysets  = opts.keysets;
            var jsons = opts.jsons;
            var jsonKey = undefined;
            var jsonDepth = depth;
            var jsonParent, json;
            
            do {
                if (jsonKey == null) { jsonKey = keysets[jsonDepth]; }
                if ((jsonParent = jsons[--jsonDepth]) != null && (jsonKey != null)) {
                    opts.hasValue = true;
                    json = cloneJSONValue(opts, node, type, value);
                    jsonParent[jsonKey] = json;
                    break;
                }
            } while(jsonDepth >= offset - 2);
            
            return false;
        }
    }
    return true;
}