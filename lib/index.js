
var Prepack = require('prepack');
var multimatch = require('multimatch');
var path = require('path');


module.exports = plugin;


function plugin(options) {
    
    // default options
    options = options || {};
    if (typeof options.keep !== 'boolean') options.keep = false;
    options.pattern = options.pattern || ['**/*.js'];
    options.prepackOptions = options.prepackOptions || {};
    options.outPath = options.outPath || function(filepath) {
        
        var ext = filepath.lastIndexOf(path.extname(filepath));
        
        return [
            filepath.substring(0, ext),
            '.min',
            filepath.substring(ext),
        ].join('');
        
    };
    
    return function(files, ms, done) {
        
        var relevantFiles = multimatch(Object.keys(files), options.pattern);
        console.log(relevantFiles);
        relevantFiles.forEach(function(filepath) {
            
            var destination = options.outPath(filepath);
            
            var result = Prepack.prepack(
                files[filepath].contents.toString(),
                options.prepackOptions
            );
            
            files[destination] = { contents: result.code };
            
            if (!options.keep) delete files[filepath];
            
        });
        
        return process.nextTick(done);
        
    };
    
}

