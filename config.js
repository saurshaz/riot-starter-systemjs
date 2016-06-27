// //MIT License ----------- Copyright (C) 2013-2016 Guy Bedford Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// /*
//  * SystemJS v0.19.29
//  */

var ESNoBuildConfig = {
    transpiler: 'plugin-babel',
    typescriptOptions: {
        target: 'es6',
        module: 'es6'
    },
    meta: {
        '*.tag': {
            loader: 'tag-loader'
        }
    },
    packages: {
        tag: {
            main: 'tag-loader.js'
        }
    },
    map: {
        'riot': '/src/lib/vendor/riot.js',
        'plugin-babel': '/node_modules/systemjs-plugin-babel/plugin-babel.js',
        'riot-router': '/src/lib/vendor/riot-router.js',
        'tag-loader': '/tag/tag-loader.js',
        'systemjs-babel-build': '/node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
    }
};

// load from an absolute URL directly
System.config(ESNoBuildConfig);
