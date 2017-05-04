# metalsmith-prepack

[![npm](https://img.shields.io/npm/v/metalsmith-prepack.svg)](https://www.npmjs.com/package/metalsmith-prepack)
[![npm](https://img.shields.io/npm/dm/metalsmith-prepack.svg)](https://www.npmjs.com/package/metalsmith-prepack)
[![Dependency Status](https://david-dm.org/ElijahKaytor/metalsmith-prepack.svg)](https://david-dm.org/ElijahKaytor/metalsmith-prepack)


> metalsmith plugin for [prepack.io](https://prepack.io/)


## Installation

```
npm install metalsmith-prepack
```

## Example

```js
var Metalsmith = require('metalsmith');
var assets = require('metalsmith-assets');
var prepack = require('metalsmith-prepack');

var ms = Metalsmith(process.cwd());


ms.use(assets({
    source: './assets',
    destination: './assets',
}));


// no options are required, these are the defaults
//  i.e.  same as:  ms.use(prepack())  or  ms.use(prepack({}))
ms.use(prepack({
    
    // don't keep orignal file
    keep: false,
    
    // match javascript files
    // uses multimatch  https://www.npmjs.com/package/multimatch
    pattern: ['**/*.js'],
    
    // function for determining new filename
    // default function adds .min before the path.extname()
    outPath: function(filepath) {
        
        var ext = filepath.lastIndexOf(path.extname(filepath));
        
        return [
            filepath.substring(0, ext),
            '.min',
            filepath.substring(ext),
        ].join('');
        
    },
    
    // options to pass to prepack
    prepackOptions: {
        // https://prepack.io/getting-started.html#options
    },
    
}));


ms.build(function(error) {
    if (error) throw error;
    
    console.log('Built');
});

```

## Sourcemaps

Support for input and output sourcemaps needs to be added.
