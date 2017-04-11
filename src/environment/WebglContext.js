// create a unique, global symbol name
// -----------------------------------

const CONTEXT_KEY = Symbol.for("WebglContext");

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------

var globalSymbols = Object.getOwnPropertySymbols(global);
var hasContext = (globalSymbols.indexOf(CONTEXT_KEY) > -1);

if (!hasContext){
  global[CONTEXT_KEY] = null;
}

// define the singleton API
// ------------------------

var singleton = {};

Object.defineProperty(singleton, "instance", {
  get: function(){
    return global[CONTEXT_KEY];
  },
  set: function(context) {
    global[CONTEXT_KEY] = context;
    Object.freeze(this);
  }
});

// ensure the API is never changed
// -------------------------------


// export the singleton API only
// -----------------------------

export default singleton;