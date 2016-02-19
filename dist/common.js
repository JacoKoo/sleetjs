require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars/base":2,"./handlebars/exception":5,"./handlebars/no-conflict":15,"./handlebars/runtime":16,"./handlebars/safe-string":17,"./handlebars/utils":18}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.5';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];


},{"./decorators":3,"./exception":5,"./helpers":6,"./logger":14,"./utils":18}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":4}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];


},{"../utils":18}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  if (loc) {
    this.lineNumber = line;
    this.column = column;
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}


},{"./helpers/block-helper-missing":7,"./helpers/each":8,"./helpers/helper-missing":9,"./helpers/if":10,"./helpers/log":11,"./helpers/lookup":12,"./helpers/with":13}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];


},{"../exception":5,"../utils":18}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];


},{"../exception":5}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];


},{"../utils":18}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];


},{}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];


},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];


},{"./utils":18}],15:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context !== depths[0]) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    options.data = _base.createFrame(options.data);
    partialBlock = options.data['partial-block'] = options.fn;

    if (partialBlock.partials) {
      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
    }
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}


},{"./base":2,"./exception":5,"./utils":18}],17:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}


},{}],"drizzlejs":[function(require,module,exports){
/*!
 * DrizzleJS v0.4.6
 * -------------------------------------
 * Copyright (c) 2016 Jaco Koo <jaco.koo@guyong.in>
 * Distributed under MIT license
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Drizzle = factory();
  }
}(this, function() {
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drizzle = {},
    D = Drizzle,
    slice = [].slice,
    map = function map(arr, fn) {
    var result = [];
    if (!arr) return result;
    if (arr.map) return arr.map(fn);

    for (var i = 0; i < arr.length; i++) {
        result.push(fn(arr[i], i, arr));
    }
    return result;
},
    mapObj = function mapObj(obj, fn) {
    var result = [];
    var key = undefined;
    if (!obj) return result;

    for (key in obj) {
        if (D.hasOwnProperty.call(obj, key)) result.push(fn(obj[key], key, obj));
    }

    return result;
},
    clone = function clone(target) {
    if (D.isObject(target)) {
        var _ret = function () {
            var result = {};
            mapObj(target, function (value, key) {
                return result[key] = clone(value);
            });
            return {
                v: result
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    if (D.isArray(target)) {
        return map(target, function (value) {
            return clone(value);
        });
    }

    return target;
},
    assign = function assign(target) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    var t = target;
    t && map(args, function (arg) {
        return arg && mapObj(arg, function (value, key) {
            return t[key] = value;
        });
    });
    return t;
},
    typeCache = {
    View: {}, Region: {}, Module: {}, Model: {}, Store: {},

    register: function register(type, name, clazz) {
        this[type][name] = clazz;
    },
    create: function create(type, name) {
        var Clazz = this[type][name] || D[type];

        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
        }

        return new (Function.prototype.bind.apply(Clazz, [null].concat(args)))();
    }
};

var counter = 0,
    root = null;

if (typeof window !== 'undefined') {
    root = window;
}

map(['Function', 'Array', 'String', 'Object'], function (item) {
    var name = '[object ' + item + ']';
    D['is' + item] = function (obj) {
        return D.toString.call(obj) === name;
    };
});

map(['Module', 'View', 'Region', 'Model', 'Store'], function (item) {
    D['register' + item] = function (name, clazz) {
        return typeCache.register(item, name, clazz);
    };
    typeCache['create' + item] = function (name) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
        }

        return typeCache.create.apply(typeCache, [item, name].concat(args));
    };
});

assign(D, {
    assign: assign,

    uniqueId: function uniqueId() {
        var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        return '' + prefix + ++counter;
    },
    adapt: function adapt(obj) {
        assign(D.Adapter, obj);
    },
    extend: function extend(theChild, theParent, obj) {
        var child = theChild;
        assign(child, theParent);
        child.prototype = Object.create(theParent.prototype, { constructor: child });
        assign(child.prototype, obj);
        child.__super__ = theParent.prototype;

        return child;
    }
});

D.Adapter = {
    Promise: Promise,

    ajax: function ajax(params) {
        var xhr = new XMLHttpRequest();
        var data = '';
        if (params.data) data = mapObj(params.data, function (v, k) {
            return k + '=' + encodeURIComponent(v);
        }).join('&');
        xhr.open(params.type, data && params.type === 'GET' ? params.url + '?' + data : params.url, true);
        var promise = new Promise(function (resolve, reject) {
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    resolve(JSON.parse(this.response));
                    return;
                }
                reject(xhr);
            };

            xhr.onerror = function () {
                reject(xhr);
            };
        });
        if (data) xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        params.beforeRequest && params.beforeRequest(xhr);
        xhr.send(data);
        return promise;
    },
    ajaxResult: function ajaxResult(args) {
        return args[0];
    },
    getFormData: function getFormData(el) {
        throw new Error('getFormData is not implemented', el);
    },
    addEventListener: function addEventListener(el, name, handler, useCapture) {
        el.addEventListener(name, handler, useCapture);
    },
    removeEventListener: function removeEventListener(el, name, handler) {
        el.removeEventListener(name, handler);
    },
    hasClass: function hasClass(el, clazz) {
        return el.classList.contains(clazz);
    },
    addClass: function addClass(el, clazz) {
        el.classList.add(clazz);
    },
    removeClass: function removeClass(el, clazz) {
        el.classList.remove(clazz);
    }
};

D.Promise = function () {
    function Promiser(context) {
        _classCallCheck(this, Promiser);

        this.context = context;
    }

    _createClass(Promiser, [{
        key: 'create',
        value: function create(fn) {
            var _this = this;

            return new D.Adapter.Promise(function (resolve, reject) {
                fn.call(_this.context, resolve, reject);
            });
        }
    }, {
        key: 'resolve',
        value: function resolve(data) {
            return D.Adapter.Promise.resolve(data);
        }
    }, {
        key: 'reject',
        value: function reject(data) {
            return D.Adapter.Promise.reject(data);
        }
    }, {
        key: 'parallel',
        value: function parallel(items) {
            var _this2 = this;

            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            return this.create(function (resolve, reject) {
                var result = [],
                    thenables = [],
                    indexMap = {};
                map(items, function (item, i) {
                    var value = undefined;
                    try {
                        value = D.isFunction(item) ? item.apply(_this2.context, args) : item;
                    } catch (e) {
                        reject(e);
                        return;
                    }
                    if (value && value.then) {
                        indexMap[thenables.length] = i;
                        thenables.push(value);
                    } else {
                        result[i] = value;
                    }
                });

                if (thenables.length === 0) return resolve(result);

                D.Adapter.Promise.all(thenables).then(function (as) {
                    mapObj(indexMap, function (key, value) {
                        return result[value] = as[key];
                    });
                    resolve(result);
                }, function (as) {
                    reject(as);
                });
            });
        }
    }, {
        key: 'chain',
        value: function chain() {
            var _this3 = this;

            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            var prev = null;
            var doRing = function doRing(rings, ring, resolve, reject) {
                var nextRing = function nextRing(data) {
                    prev = data;
                    rings.length === 0 ? resolve(prev) : doRing(rings, rings.shift(), resolve, reject);
                };

                if (D.isArray(ring)) {
                    ring.length === 0 ? nextRing([]) : _this3.parallel.apply(_this3, [ring].concat(_toConsumableArray(prev != null ? [prev] : []))).then(nextRing, reject);
                } else {
                    var value = undefined;
                    try {
                        value = D.isFunction(ring) ? ring.apply(_this3.context, prev != null ? [prev] : []) : ring;
                    } catch (e) {
                        reject(e);
                        return;
                    }

                    value && value.then ? value.then(nextRing, reject) : nextRing(value);
                }
            };

            if (args.length === 0) return this.resolve();

            return this.create(function (resolve, reject) {
                doRing(args, args.shift(), resolve, reject);
            });
        }
    }]);

    return Promiser;
}();

D.Event = {
    on: function on(name, fn, ctx) {
        this._events || (this._events = {});
        (this._events[name] || (this._events[name] = [])).push({ fn: fn, ctx: ctx });
    },
    off: function off(name, fn) {
        if (!this._events || !name || !this._events[name]) return;
        if (!fn) {
            delete this._events[name];
            return;
        }

        var result = [];
        map(this._events[name], function (item) {
            if (item.fn !== fn) result.push(item);
        });

        if (result.length === 0) {
            delete this._events[name];
            return;
        }
        this._events[name] = result;
    },
    trigger: function trigger(name) {
        for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            args[_key6 - 1] = arguments[_key6];
        }

        if (!name || !this._events || !this._events[name]) return this;
        map(this._events[name], function (item) {
            return item.fn.apply(item.ctx, args);
        });
    },
    delegateEvent: function delegateEvent(to) {
        var me = this,
            id = '--' + to.id,
            target = to;

        assign(target, {
            _listeners: {},

            listenTo: function listenTo(obj, name, fn, ctx) {
                (target._listeners[name] || (target._listeners[name] = [])).push({ fn: fn, obj: obj });
                obj.on(name, fn, ctx || target);
            },
            stopListening: function stopListening(obj, name, fn) {
                mapObj(target._listeners, function (value, key) {
                    var result = [];
                    map(value, function (item) {
                        var offIt = fn && item.fn === fn && name === key && obj === item.obj;
                        offIt = offIt || !fn && name && name === key && obj === item.obj;
                        offIt = offIt || !fn && !name && obj && obj === item.obj;
                        offIt = offIt || !fn && !name && !obj;
                        if (offIt) {
                            item.obj.off(key, item.fn);
                            return;
                        }
                        result.push(item);
                    });

                    target._listeners[key] = result;
                    if (result.length === 0) {
                        delete target._listeners[key];
                    }
                });
            },
            on: function on(name, fn, ctx) {
                target.listenTo(me, name + id, fn, ctx);
            },
            off: function off(name, fn) {
                target.stopListening(me, name && name + id, fn);
            },
            trigger: function trigger(name) {
                if (!name) return target;

                for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                    args[_key7 - 1] = arguments[_key7];
                }

                args.unshift(name + id) && me.trigger.apply(me, args);
            }
        });
        return this;
    }
};

D.Request = {
    get: function get(model, options) {
        return this._ajax('GET', model, model.params, options);
    },
    post: function post(model, options) {
        return this._ajax('POST', model, model.data, options);
    },
    put: function put(model, options) {
        return this._ajax('PUT', model, model.data, options);
    },
    del: function del(model, options) {
        return this._ajax('DELETE', model, model.data, options);
    },
    save: function save(model, options) {
        return model.data && model.data[model._idKey] ? this.put(model, options) : this.post(model, options);
    },
    _url: function _url(model) {
        var parts = [],
            prefix = model.module._option('urlPrefix', model) || '',
            urlRoot = model.app._option('urlRoot', model) || '',
            urlSuffix = model.app._option('urlSuffix', model) || '';
        var base = model._url() || '';

        urlRoot && parts.push(urlRoot);
        prefix && parts.push(prefix);
        parts.push(model.module.name);

        while (base.indexOf('../') === 0) {
            parts.pop();
            base = base.slice(3);
        }

        base && parts.push(base);
        model.data && model.data[model._idKey] && parts.push(model.data[model._idKey]);
        urlSuffix && parts.push(parts.pop() + urlSuffix);

        return parts.join('/');
    },
    _ajax: function _ajax(method, model, data, options) {
        var params = assign({ type: method }, options);

        params.data = assign({}, data, params.data);
        params.url = this._url(model);

        return model.Promise.create(function (resolve, reject) {
            D.Adapter.ajax(params, model).then(function () {
                for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                    args[_key8] = arguments[_key8];
                }

                model.set(D.Adapter.ajaxResult(args), !params.slient);
                resolve(args);
            }, function () {
                for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                    args[_key9] = arguments[_key9];
                }

                return reject(args);
            });
        });
    }
};

D.ComponentManager = {
    _handlers: {},
    _componentCache: {},

    setDefaultHandler: function setDefaultHandler(creator) {
        var destructor = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

        this._defaultHandler = { creator: creator, destructor: destructor };
    },
    register: function register(name, creator) {
        var destructor = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

        this._handlers[name] = { creator: creator, destructor: destructor };
    },
    _create: function _create(renderable, options) {
        var _this4 = this;

        var name = options.name;
        var id = options.id;
        var selector = options.selector;
        var opt = options.options;

        if (!name) renderable._error('Component name can not be null');

        var handler = this._handlers[name] || this._defaultHandler;
        if (!handler) renderable._error('No handler for component:', name);

        var dom = selector ? renderable.$$(selector) : renderable.$(id);
        var uid = id ? id : D.uniqueId('comp');

        return renderable.chain(handler.creator(renderable, dom, opt), function (component) {
            var cid = renderable.id + uid,
                cache = _this4._componentCache[cid],
                obj = { id: cid, handler: handler, index: D.uniqueId(cid), options: opt };

            D.isArray(cache) ? cache.push(obj) : _this4._componentCache[cid] = cache ? [cache, obj] : obj;
            return { id: id, component: component, index: obj.index };
        });
    },
    _destroy: function _destroy(renderable, obj) {
        var _this5 = this;

        var id = renderable.id + obj.id,
            cache = this._componentCache[id];
        var current = cache;

        if (D.isArray(cache)) {
            this._componentCache[id] = [];
            map(cache, function (item) {
                item.index !== obj.index ? _this5._componentCache[id].push(item) : current = item;
            });
            this._componentCache[id].length === 0 && delete this._componentCache[id];
        } else {
            delete this._componentCache[id];
        }

        current.handler.destructor(renderable, obj.component, current.options);
    }
};

D.Base = function () {
    function Base(name) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var defaults = arguments[2];

        _classCallCheck(this, Base);

        this.options = options;
        this.id = D.uniqueId('D');
        this.name = name;
        this.Promise = new D.Promise(this);

        assign(this, defaults);
        if (options.mixin) this._mixin(options.mixin);
        this._loadedPromise = this._initialize();
    }

    _createClass(Base, [{
        key: '_initialize',
        value: function _initialize() {}
    }, {
        key: '_option',
        value: function _option(key) {
            var value = this.options[key];

            for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
                args[_key10 - 1] = arguments[_key10];
            }

            return D.isFunction(value) ? value.apply(this, args) : value;
        }
    }, {
        key: '_error',
        value: function _error(message) {
            if (!D.isString(message)) throw message;

            for (var _len11 = arguments.length, rest = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
                rest[_key11 - 1] = arguments[_key11];
            }

            throw new Error('[' + (this.module ? this.module.name + ':' : '') + this.name + '] ' + message + ' ' + rest.join(' '));
        }
    }, {
        key: '_mixin',
        value: function _mixin(obj) {
            var _this6 = this;

            mapObj(obj, function (value, key) {
                var old = _this6[key];
                if (!old) {
                    _this6[key] = value;
                    return;
                }

                if (D.isFunction(old)) {
                    _this6[key] = function () {
                        for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                            args[_key12] = arguments[_key12];
                        }

                        args.unshift(old);
                        return value.apply(_this6, args);
                    };
                }
            });
        }
    }, {
        key: 'chain',
        value: function chain() {
            var _Promise;

            return (_Promise = this.Promise).chain.apply(_Promise, arguments);
        }
    }]);

    return Base;
}();

D.Renderable = function (_D$Base) {
    _inherits(Renderable, _D$Base);

    function Renderable(name, app, mod, loader, options) {
        _classCallCheck(this, Renderable);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Renderable).call(this, name, options, {
            app: app,
            module: mod,
            components: {},
            _loader: loader,
            _componentMap: {},
            _events: {}
        }));

        _this7._eventHandlers = _this7._option('handlers');
        app.delegateEvent(_this7);
        return _this7;
    }

    _createClass(Renderable, [{
        key: '_initialize',
        value: function _initialize() {
            var _this8 = this;

            this._templateEngine = this._option('templateEngine') || this.module && this.module._templateEngine || this.app._templateEngine;
            return this.chain([this._templateEngine._load(this), this._initializeEvents()], function (_ref) {
                var _ref2 = _slicedToArray(_ref, 1);

                var template = _ref2[0];
                return _this8._template = template;
            });
        }
    }, {
        key: 'render',
        value: function render(options) {
            return this._render(options == null ? this.renderOptions : options, true);
        }
    }, {
        key: '$',
        value: function $(id) {
            return this.$$('#' + this._wrapDomId(id))[0];
        }
    }, {
        key: '$$',
        value: function $$(selector) {
            return this._element.querySelectorAll(selector);
        }
    }, {
        key: '_render',
        value: function _render(options, update) {
            var _this9 = this;

            if (!this._region) this._error('Region is null');

            this.renderOptions = options == null ? this.renderOptions || {} : options;
            return this.chain(this._loadedPromise, this._destroyComponents, function () {
                return _this9.trigger('beforeRender');
            }, function () {
                return _this9._option('beforeRender');
            }, this._beforeRender, this._serializeData, function (data) {
                return _this9._renderTemplate(data, update);
            }, this._renderComponents, this._afterRender, function () {
                return _this9._option('afterRender');
            }, function () {
                return _this9.trigger('afterRender');
            }, this);
        }
    }, {
        key: '_setRegion',
        value: function _setRegion(region) {
            this._region = region;
            this._bindEvents();
        }
    }, {
        key: '_close',
        value: function _close() {
            var _this10 = this;

            if (!this._region) return this.Promise.resolve(this);

            return this.chain(function () {
                return _this10.trigger('beforeClose');
            }, function () {
                return _this10._option('beforeClose');
            }, this._beforeClose, [this._unbindEvents, this._destroyComponents, function () {
                return _this10._region._empty(_this10);
            }], this._afterClose, function () {
                return _this10._option('afterClose');
            }, function () {
                return _this10.trigger('afterClose');
            }, function () {
                return delete _this10._region;
            }, this);
        }
    }, {
        key: '_serializeData',
        value: function _serializeData() {
            return {
                Global: this.app.global,
                Self: this
            };
        }
    }, {
        key: '_renderTemplate',
        value: function _renderTemplate(data, update) {
            this._templateEngine._execute(this, data, this._template, update);
        }
    }, {
        key: '_initializeEvents',
        value: function _initializeEvents(events) {
            var _this11 = this;

            mapObj(events || this._option('events'), function (value, key) {
                var items = key.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/),
                    result = { key: key };

                if (items.length !== 2) _this11._error('Invalid event key');
                result.eventType = items[0];
                if (items[1].slice(-1) === '*') {
                    result.id = _this11._wrapDomId(items[1].slice(0, -1));
                    result.haveStar = true;
                    result.selector = '[id^=' + result.id + ']';
                } else {
                    result.id = _this11._wrapDomId(items[1]);
                    result.selector = '#' + result.id;
                }
                result.handler = _this11._createEventHandler(value, result);
                _this11._events[key] = result;
            });
        }
    }, {
        key: '_getEventTarget',
        value: function _getEventTarget(target, id) {
            var el = this._element;
            var current = target;
            while (current !== el) {
                var cid = current.getAttribute('id');
                if (cid && cid.slice(0, id.length) === id) return current;
                current = current.parentNode;
            }
        }
    }, {
        key: '_createEventHandler',
        value: function _createEventHandler(handlerName, _ref3) {
            var _this12 = this;

            var haveStar = _ref3.haveStar;
            var id = _ref3.id;
            var disabledClass = this.app.options.disabledClass;

            return function (e) {
                if (!_this12._eventHandlers[handlerName]) _this12._error('No event handler for name:', handlerName);

                var target = _this12._getEventTarget(e.target, id),
                    args = [e];
                if (D.Adapter.hasClass(target, disabledClass)) return;
                if (haveStar) args.unshift(target.getAttribute('id').slice(id.length));
                _this12._eventHandlers[handlerName].apply(_this12, args);
            };
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            var _this13 = this;

            mapObj(this._events, function (value) {
                _this13._region._delegateDomEvent(_this13, value.eventType, value.selector, value.handler);
            });
        }
    }, {
        key: '_unbindEvents',
        value: function _unbindEvents() {
            this._region._undelegateDomEvents(this);
        }
    }, {
        key: '_renderComponents',
        value: function _renderComponents() {
            var _this14 = this;

            return this.chain(map(this._option('components'), function (item) {
                var i = D.isFunction(item) ? item.call(_this14) : item;
                return i ? D.ComponentManager._create(_this14, i) : null;
            }), function (components) {
                return map(components, function (item) {
                    if (!item) return;
                    var id = item.id;
                    var component = item.component;
                    var index = item.index;var value = _this14.components[id];
                    D.isArray(value) ? value.push(component) : _this14.components[id] = value ? [value, component] : component;
                    _this14._componentMap[index] = item;
                });
            });
        }
    }, {
        key: '_destroyComponents',
        value: function _destroyComponents() {
            var _this15 = this;

            this.components = {};
            mapObj(this._componentMap, function (value) {
                return D.ComponentManager._destroy(_this15, value);
            });
            this._componentMap = {};
        }
    }, {
        key: '_wrapDomId',
        value: function _wrapDomId(id) {
            return this.id + id;
        }
    }, {
        key: '_beforeRender',
        value: function _beforeRender() {}
    }, {
        key: '_afterRender',
        value: function _afterRender() {}
    }, {
        key: '_beforeClose',
        value: function _beforeClose() {}
    }, {
        key: '_afterClose',
        value: function _afterClose() {}
    }, {
        key: '_element',
        get: function get() {
            return this._region ? this._region._getElement(this) : null;
        }
    }]);

    return Renderable;
}(D.Base);

D.RenderableContainer = function (_D$Renderable) {
    _inherits(RenderableContainer, _D$Renderable);

    function RenderableContainer() {
        _classCallCheck(this, RenderableContainer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RenderableContainer).apply(this, arguments));
    }

    _createClass(RenderableContainer, [{
        key: '_initialize',
        value: function _initialize() {
            var promise = _get(Object.getPrototypeOf(RenderableContainer.prototype), '_initialize', this).call(this);

            this._items = {};
            return this.chain(promise, this._initializeItems);
        }
    }, {
        key: '_afterRender',
        value: function _afterRender() {
            return this.chain(this._initializeRegions, this._renderItems);
        }
    }, {
        key: '_afterClose',
        value: function _afterClose() {
            return this._closeRegions();
        }
    }, {
        key: '_initializeItems',
        value: function _initializeItems() {
            var _this17 = this;

            this.chain(mapObj(this._option('items'), function () {
                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var name = arguments[1];

                var opt = D.isFunction(options) ? options.call(_this17) : options;
                if (D.isString(opt)) opt = { region: opt };

                return _this17.app[options.isModule ? '_createModule' : '_createView'](name, _this17).then(function (item) {
                    var i = item;
                    i.moduleOptions = opt;
                    _this17._items[name] = item;
                    return item;
                });
            }));
        }
    }, {
        key: '_initializeRegions',
        value: function _initializeRegions() {
            var _this18 = this;

            this._regions = {};
            return this.chain(this.closeRegions, map(this.$$('[data-region]'), function (el) {
                var region = _this18._createRegion(el);
                _this18._regions[region.name] = region;
            }));
        }
    }, {
        key: '_renderItems',
        value: function _renderItems() {
            var _this19 = this;

            return this.chain(mapObj(this.items, function (item) {
                var region = item.moduleOptions.region;

                if (!region) return null;
                if (!_this19.regions[region]) _this19._error('Region: ' + region + ' is not defined');
                return _this19.regions[region].show(item);
            }), this);
        }
    }, {
        key: '_createRegion',
        value: function _createRegion(el) {
            var name = el.getAttribute('data-region');
            return this.app._createRegion(el, name, this);
        }
    }, {
        key: '_closeRegions',
        value: function _closeRegions() {
            var regions = this._regions;
            if (!regions) return this;
            delete this._regions;
            return this.chain(mapObj(regions, function (region) {
                return region.close();
            }), this);
        }
    }, {
        key: 'items',
        get: function get() {
            return this._items || {};
        }
    }, {
        key: 'regions',
        get: function get() {
            return this._regions || {};
        }
    }]);

    return RenderableContainer;
}(D.Renderable);

D.ActionCreator = function (_D$Renderable2) {
    _inherits(ActionCreator, _D$Renderable2);

    function ActionCreator() {
        _classCallCheck(this, ActionCreator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ActionCreator).apply(this, arguments));
    }

    _createClass(ActionCreator, [{
        key: '_initializeEvents',
        value: function _initializeEvents() {
            _get(Object.getPrototypeOf(ActionCreator.prototype), '_initializeEvents', this).call(this);
            _get(Object.getPrototypeOf(ActionCreator.prototype), '_initializeEvents', this).call(this, this._option('actions'));
        }
    }, {
        key: '_createEventHandler',
        value: function _createEventHandler(name, obj) {
            var isAction = !!(this._option('actions') || {})[obj.key];
            return isAction ? this._createAction(name, obj) : _get(Object.getPrototypeOf(ActionCreator.prototype), '_createEventHandler', this).call(this, name, obj);
        }
    }, {
        key: '_createAction',
        value: function _createAction(name, _ref4) {
            var _this21 = this;

            var id = _ref4.id;
            var disabledClass = this.app.options.disabledClass;

            var _ref5 = this._option('dataForActions') || {};

            var dataForAction = _ref5[name];

            var _ref6 = this._option('actionCallbacks') || {};

            var actionCallback = _ref6[name];

            return function (e) {
                var target = _this21._getEventTarget(e.target, id);
                if (D.Adapter.hasClass(target, disabledClass)) return;
                D.Adapter.addClass(target, disabledClass);

                var data = _this21._getActionPayload(target);
                _this21.chain(D.isFunction(dataForAction) ? dataForAction.call(_this21, data, e) : data, function (payload) {
                    return payload !== false ? _this21.module.dispatch(name, payload) : false;
                }, function (result) {
                    return result !== false ? actionCallback && actionCallback.call(_this21, result) : false;
                }).then(function () {
                    return D.Adapter.removeClass(target, disabledClass);
                }, function () {
                    return D.Adapter.removeClass(target, disabledClass);
                });
            };
        }
    }, {
        key: '_getActionPayload',
        value: function _getActionPayload(target) {
            var rootEl = this._element;
            var current = target,
                targetName = false;
            while (current && current !== rootEl && current.tagName !== 'FORM') {
                current = current.parentNode;
            }current || (current = rootEl);
            var data = current.tagName === 'FORM' ? D.Adapter.getFormData(current) : {};
            map(current.querySelectorAll('[data-name][data-value]'), function (item) {
                if (item === target) {
                    targetName = target.getAttribute('data-name');
                    data[targetName] = target.getAttribute('data-value');
                    return;
                }

                var name = item.getAttribute('data-name');
                if (targetName && targetName === name) return;

                var value = item.getAttribute('data-value'),
                    v = data[name];
                D.isArray(v) ? v.push(value) : data[name] = v == null ? value : [v, value];
            });
            return data;
        }
    }]);

    return ActionCreator;
}(D.Renderable);

D.View = function (_D$ActionCreator) {
    _inherits(View, _D$ActionCreator);

    function View() {
        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(View).apply(this, arguments));
    }

    _createClass(View, [{
        key: '_initialize',
        value: function _initialize() {
            this.bindings = {};
            return this.chain(_get(Object.getPrototypeOf(View.prototype), '_initialize', this).call(this), this._initializeDataBinding);
        }
    }, {
        key: '_initializeDataBinding',
        value: function _initializeDataBinding() {
            var _this23 = this;

            this._dataBinding = {};
            mapObj(this._option('bindings'), function (value, key) {
                var model = _this23.bindings[key] = _this23.module.store.models[key];
                if (!model) _this23._error('No model:', key);

                if (!value) return;
                _this23._dataBinding[key] = { model: model, value: value, fn: function fn() {
                        if (value === true && _this23._region) _this23.render(_this23.renderOptions);
                        if (D.isString(value)) _this23._option(value);
                    } };
            });
        }
    }, {
        key: '_bindData',
        value: function _bindData() {
            var _this24 = this;

            mapObj(this._dataBinding, function (value) {
                return _this24.listenTo(value.model, 'changed', value.fn);
            });
        }
    }, {
        key: '_unbindData',
        value: function _unbindData() {
            this.stopListening();
        }
    }, {
        key: '_setRegion',
        value: function _setRegion() {
            var _get2;

            for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                args[_key13] = arguments[_key13];
            }

            (_get2 = _get(Object.getPrototypeOf(View.prototype), '_setRegion', this)).call.apply(_get2, [this].concat(args));
            this._bindData();
        }
    }, {
        key: '_close',
        value: function _close() {
            var _get3;

            for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                args[_key14] = arguments[_key14];
            }

            this.chain((_get3 = _get(Object.getPrototypeOf(View.prototype), '_close', this)).call.apply(_get3, [this].concat(args)), this._unbindData, this);
        }
    }, {
        key: '_serializeData',
        value: function _serializeData() {
            var _this25 = this;

            var data = _get(Object.getPrototypeOf(View.prototype), '_serializeData', this).call(this);
            mapObj(this.bindings, function (value, key) {
                return data[key] = value.get(true);
            });
            mapObj(this._option('dataForTemplate'), function (value, key) {
                return data[key] = value.call(_this25, data);
            });
            return data;
        }
    }]);

    return View;
}(D.ActionCreator);

D.Module = function (_D$RenderableContaine) {
    _inherits(Module, _D$RenderableContaine);

    function Module() {
        _classCallCheck(this, Module);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Module).apply(this, arguments));
    }

    _createClass(Module, [{
        key: '_initialize',
        value: function _initialize() {
            this.app._modules[this.name + '--' + this.id] = this;
            this._initializeStore();
            return _get(Object.getPrototypeOf(Module.prototype), '_initialize', this).call(this);
        }
    }, {
        key: 'dispatch',
        value: function dispatch(name, payload) {
            return this._store.dispatch(name, payload);
        }
    }, {
        key: '_initializeStore',
        value: function _initializeStore() {
            this._store = this.app._createStore(this, this._option('store'));
        }
    }, {
        key: '_afterClose',
        value: function _afterClose() {
            delete this.app._modules[this.name + '--' + this.id];
            this._store._destory();
            return _get(Object.getPrototypeOf(Module.prototype), '_afterClose', this).call(this);
        }
    }, {
        key: '_beforeRender',
        value: function _beforeRender() {
            var _this27 = this;

            return this.chain(_get(Object.getPrototypeOf(Module.prototype), '_beforeRender', this).call(this), function () {
                return _this27._store._loadEagerModels();
            }).then(null, function () {
                return _this27.Promise.resolve();
            });
        }
    }, {
        key: '_afterRender',
        value: function _afterRender() {
            var _this28 = this;

            return this.chain(_get(Object.getPrototypeOf(Module.prototype), '_afterRender', this).call(this), function () {
                return _this28._store._loadLazyModels();
            }).then(null, function () {
                return _this28.Promise.resolve();
            });
        }
    }, {
        key: 'store',
        get: function get() {
            return this._store;
        }
    }]);

    return Module;
}(D.RenderableContainer);

var CAPTURES = ['blur', 'focus', 'scroll', 'resize'];

D.Region = function (_D$Base2) {
    _inherits(Region, _D$Base2);

    function Region(app, mod, el, name) {
        _classCallCheck(this, Region);

        var _this29 = _possibleConstructorReturn(this, Object.getPrototypeOf(Region).call(this, name || 'Region', {}, {
            app: app,
            module: mod,
            _el: el,
            _delegated: {}
        }));

        if (!_this29._el) _this29._error('The DOM element for region is required');
        app.delegateEvent(_this29);
        return _this29;
    }

    _createClass(Region, [{
        key: 'show',
        value: function show(renderable, options) {
            var _this30 = this;

            if (this._isCurrent(renderable)) {
                if (options && options.forceRender === false) return this.Promise.resolve(this._current);
                return this._current._render(options, true);
            }

            return this.chain(D.isString(renderable) ? this.app._createModule(renderable) : renderable, function (item) {
                if (!(item instanceof D.Renderable)) {
                    _this30._error('The item is expected to be an instance of Renderable');
                }
                return item;
            }, [function (item) {
                return _this30.chain(item._region && item._region.close(), item);
            }, function () {
                return _this30._current && _this30.close();
            }], function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 1);

                var item = _ref8[0];

                _this30._current = item;
                var attr = item.module ? item.module.name + ':' + item.name : item.name;
                _this30._getElement().setAttribute('data-current', attr);
                item._setRegion(_this30);
                return item;
            }, function (item) {
                return item._render(options, false);
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var _this31 = this;

            return this.chain(this._current && this._current._close(), function () {
                return delete _this31._current;
            }, this);
        }
    }, {
        key: '$$',
        value: function $$(selector) {
            return this._getElement().querySelectorAll(selector);
        }
    }, {
        key: '_isCurrent',
        value: function _isCurrent(renderable) {
            if (!this._current) return false;
            if (this._current.name === renderable) return true;
            if (renderable && renderable.id === this._current.id) return true;
            return false;
        }
    }, {
        key: '_getElement',
        value: function _getElement() {
            return this._el;
        }
    }, {
        key: '_empty',
        value: function _empty() {
            this._getElement().innerHTML = '';
        }
    }, {
        key: '_createDelegateListener',
        value: function _createDelegateListener(name) {
            var _this32 = this;

            return function (e) {
                if (!_this32._delegated[name]) return;
                var target = e.target;

                map(_this32._delegated[name].items, function (item) {
                    var els = _this32._getElement().querySelectorAll(item.selector);
                    var matched = false;
                    for (var i = 0; i < els.length; i++) {
                        var el = els[i];
                        if (el === target || el.contains(target)) {
                            matched = el;
                            break;
                        }
                    }
                    matched && item.fn.call(item.renderable, e);
                });
            };
        }
    }, {
        key: '_delegateDomEvent',
        value: function _delegateDomEvent(renderable, name, selector, fn) {
            var obj = this._delegated[name];
            if (!obj) {
                obj = this._delegated[name] = { listener: this._createDelegateListener(name), items: [] };
                D.Adapter.addEventListener(this._getElement(), name, obj.listener, CAPTURES.indexOf(name) !== -1);
            }
            obj.items.push({ selector: selector, fn: fn, renderable: renderable });
        }
    }, {
        key: '_undelegateDomEvents',
        value: function _undelegateDomEvents(renderable) {
            var _this33 = this;

            mapObj(this._delegated, function (value, key) {
                var items = [],
                    obj = value;
                map(obj.items, function (item) {
                    if (item.renderable !== renderable) items.push(item);
                });
                obj.items = items;
                if (items.length === 0) {
                    delete _this33._delegated[key];
                    D.Adapter.removeEventListener(_this33._getElement(), key, obj.listener);
                }
            });
        }
    }]);

    return Region;
}(D.Base);

D.TemplateEngine = function (_D$Base3) {
    _inherits(TemplateEngine, _D$Base3);

    function TemplateEngine(options) {
        _classCallCheck(this, TemplateEngine);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TemplateEngine).call(this, 'Template Engine', options, { _templateCache: {} }));
    }

    _createClass(TemplateEngine, [{
        key: 'executeIdReplacement',
        value: function executeIdReplacement(el, renderable) {
            var _this35 = this;

            var used = {};
            map(el.querySelectorAll('[id]'), function (item) {
                var id = item.getAttribute('id');
                if (used[id]) _this35._error('Dom ID: ' + id + ' is already used');
                used[id] = true;
                item.setAttribute('id', renderable._wrapDomId(id));
            });

            var attrs = this._option('attributesReferToId') || ['for', 'data-target', 'data-parent'];

            map(attrs, function (attr) {
                return map(el.querySelectorAll('[' + attr + ']'), function (item) {
                    var value = item.getAttribute(attr),
                        withHash = value.charAt(0) === '#',
                        wrapped = withHash ? '#' + renderable._wrapDomId(value.slice(1)) : renderable._wrapDomId(value);
                    item.setAttribute(attr, wrapped);
                });
            });
        }
    }, {
        key: '_load',
        value: function _load(renderable) {
            var id = renderable.id;
            if (this._templateCache[id]) return this._templateCache[id];
            return this._templateCache[id] = this._loadIt(renderable);
        }
    }, {
        key: '_loadIt',
        value: function _loadIt(renderable) {
            if (renderable instanceof Drizzle.Module) {
                return renderable._loader.loadModuleResource(renderable, 'templates');
            }

            return function () {
                return renderable.module._template;
            };
        }
    }, {
        key: '_execute',
        value: function _execute(renderable, data, template /* , update */) {
            var el = renderable._element;
            el.innerHTML = template(data);
            this.executeIdReplacement(el, renderable);
        }
    }]);

    return TemplateEngine;
}(D.Base);

D.Store = function (_D$Base4) {
    _inherits(Store, _D$Base4);

    function Store(mod, options) {
        _classCallCheck(this, Store);

        var _this36 = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this, 'Store', options, {
            app: mod.app,
            module: mod,
            _models: {}
        }));

        _this36.app.delegateEvent(_this36);

        _this36._callbacks = _this36._option('callbacks');
        mapObj(_this36._callbacks, function (value, key) {
            if (key.slice(0, 4) === 'app.') {
                _this36.listenTo(_this36.app, key, function (payload) {
                    return value.call(_this36._callbackContext, payload);
                });
                return;
            }

            if (key.slice(0, 7) === 'shared.') {
                var name = key.slice(7),
                    model = _this36._models[name];
                if (!model || model.store === _this36) _this36._error('Can not bind to model: ' + key);
                _this36.listenTo(model, 'changed', function () {
                    return value.call(_this36._callbackContext);
                });
            }
        });
        return _this36;
    }

    _createClass(Store, [{
        key: 'dispatch',
        value: function dispatch(name, payload) {
            var callback = undefined,
                n = name,
                p = payload;
            if (D.isObject(n)) {
                p = n.payload;
                n = n.name;
            }

            callback = this._callbacks[n];
            if (!callback) this._error('No action callback for name: ' + name);
            return this.chain(callback.call(this._callbackContext, p));
        }
    }, {
        key: '_initialize',
        value: function _initialize() {
            this._initializeModels();
            this._callbackContext = assign({
                app: this.app,
                models: this.models,
                module: this.module,
                chain: this.chain
            }, D.Request);

            this._callbackContext.Promise = new D.Promise(this._callbackContext);
        }
    }, {
        key: '_initializeModels',
        value: function _initializeModels() {
            var _this37 = this;

            mapObj(this._option('models'), function (value, key) {
                var v = (D.isFunction(value) ? value.call(_this37) : value) || {};
                if (v.shared === true) {
                    if (_this37.app.viewport) {
                        _this37._models[key] = _this37.app.viewport.store.models[key];
                        return;
                    }
                    if (_this37.module.name === _this37.app._option('viewport')) {
                        _this37._error('Can not define shared model in viewport');
                    }
                    if (_this37.module.module && _this37.module.module.name === _this37.app._option('viewport')) {
                        _this37._models[key] = _this37.module.module.store.models[key];
                    }
                    return;
                }
                _this37._models[key] = _this37.app._createModel(_this37, v);
            });
        }
    }, {
        key: '_loadEagerModels',
        value: function _loadEagerModels() {
            var _this38 = this;

            return this.chain(mapObj(this._models, function (model) {
                if (model.store !== _this38) return null;
                return model.options.autoLoad === true ? D.Request.get(model) : null;
            }));
        }
    }, {
        key: '_loadLazyModels',
        value: function _loadLazyModels() {
            var _this39 = this;

            return this.chain(mapObj(this._models, function (model) {
                if (model.store !== _this39) return null;
                var autoLoad = model.options.autoLoad;

                return autoLoad && autoLoad !== true ? D.Request.get(model) : null;
            }));
        }
    }, {
        key: '_destory',
        value: function _destory() {
            this.stopListening();
        }
    }, {
        key: 'models',
        get: function get() {
            return this._models;
        }
    }]);

    return Store;
}(D.Base);

D.Model = function (_D$Base5) {
    _inherits(Model, _D$Base5);

    function Model(store, options) {
        _classCallCheck(this, Model);

        var _this40 = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this, 'Model', options, {
            app: store.module.app,
            module: store.module,
            store: store
        }));

        _this40._data = _this40._option('data') || {};
        _this40._idKey = _this40._option('idKey') || _this40.app.options.idKey;
        _this40._params = assign({}, _this40._option('params'));
        _this40.app.delegateEvent(_this40);
        return _this40;
    }

    _createClass(Model, [{
        key: 'set',
        value: function set(data, trigger) {
            var d = this.options.parse ? this._option('parse', data) : data;
            this._data = this.options.root ? d[this.options.root] : d;
            if (trigger) this.changed();
        }
    }, {
        key: 'get',
        value: function get(cloneIt) {
            return cloneIt ? clone(this._data) : this._data;
        }
    }, {
        key: 'clear',
        value: function clear(trigger) {
            this._data = D.isArray(this._data) ? [] : {};
            if (trigger) this.changed();
        }
    }, {
        key: 'changed',
        value: function changed() {
            this.trigger('changed');
        }
    }, {
        key: '_url',
        value: function _url() {
            return this._option('url') || '';
        }
    }, {
        key: 'fullUrl',
        get: function get() {
            return D.Request._url(this);
        }
    }, {
        key: 'params',
        get: function get() {
            return this._params;
        },
        set: function set(value) {
            this._params = value;
        }
    }, {
        key: 'data',
        get: function get() {
            return this._data;
        }
    }]);

    return Model;
}(D.Base);

D.Loader = function (_D$Base6) {
    _inherits(Loader, _D$Base6);

    _createClass(Loader, null, [{
        key: '_analyse',
        value: function _analyse(name) {
            if (!D.isString(name)) {
                return { loader: null, name: name };
            }

            var args = name.split(':'),
                loader = args.length > 1 ? args.shift() : null;

            return { loader: loader, name: args.shift(), args: args };
        }
    }]);

    function Loader(app, options) {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Loader).call(this, 'Loader', options, { app: app }));
    }

    _createClass(Loader, [{
        key: 'loadResource',
        value: function loadResource(path) {
            var _this42 = this;

            var _app$options = this.app.options;
            var scriptRoot = _app$options.scriptRoot;
            var getResource = _app$options.getResource;
            var amd = _app$options.amd;
            var fullPath = scriptRoot + '/' + path;

            return this.Promise.create(function (resolve, reject) {
                if (amd) {
                    require([fullPath], resolve, reject);
                } else if (getResource) {
                    resolve(getResource.call(_this42.app, fullPath));
                } else {
                    resolve(require('./' + fullPath));
                }
            });
        }
    }, {
        key: 'loadModuleResource',
        value: function loadModuleResource(mod, path) {
            return this.loadResource(mod.name + '/' + path);
        }
    }, {
        key: 'loadModule',
        value: function loadModule(name) {
            return this.loadResource(name + '/index');
        }
    }, {
        key: 'loadView',
        value: function loadView(name, mod) {
            return this.loadModuleResource(mod, 'view-' + name);
        }
    }, {
        key: 'loadRouter',
        value: function loadRouter(path) {
            var name = 'router';
            return this.loadResource(path ? path + '/' + name : name);
        }
    }]);

    return Loader;
}(D.Base);

D.Application = function (_D$Base7) {
    _inherits(Application, _D$Base7);

    function Application(options) {
        _classCallCheck(this, Application);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Application).call(this, options && options.name || 'Application', assign({
            scriptRoot: 'app',
            urlRoot: '',
            urlSuffix: '',
            caseSensitiveHash: false,
            container: root && root.document.body,
            disabledClass: 'disabled',
            getResource: null,
            idKey: 'id',
            viewport: 'viewport'
        }, options), {
            global: {},
            _modules: {},
            _loaders: {}
        }));
    }

    _createClass(Application, [{
        key: '_initialize',
        value: function _initialize() {
            this._templateEngine = this._option('templateEngine') || new D.TemplateEngine();
            this.registerLoader('default', new D.Loader(this), true);
            this._region = this._createRegion(this._option('container'), 'Region');
        }
    }, {
        key: 'registerLoader',
        value: function registerLoader(name, loader, isDefault) {
            this._loaders[name] = loader;
            if (isDefault) this._defaultLoader = loader;
            return this;
        }
    }, {
        key: 'start',
        value: function start(defaultHash) {
            var _router,
                _this44 = this;

            if (defaultHash) this._router = new D.Router(this);

            return this.chain(defaultHash ? (_router = this._router)._mountRoutes.apply(_router, _toConsumableArray(this._option('routers'))) : false, this._region.show(this._option('viewport')), function (viewport) {
                return _this44.viewport = viewport;
            }, function () {
                return defaultHash && _this44._router._start(defaultHash);
            }, this);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.off();
            this._region.close();
            if (this._router) this._router._stop();
        }
    }, {
        key: 'navigate',
        value: function navigate(hash, trigger) {
            if (!this._router) return;
            this._router.navigate(hash, trigger);
        }
    }, {
        key: 'dispatch',
        value: function dispatch(name, payload) {
            var n = D.isObject(name) ? name.name : name,
                p = D.isObject(name) ? name.payload : payload;
            this.trigger('app.' + n, p);
        }
    }, {
        key: 'show',
        value: function show(region, moduleName, options) {
            return this.viewport.regions[region].show(moduleName, options);
        }
    }, {
        key: '_getLoader',
        value: function _getLoader(name, mod) {
            return name && this._loaders[name] || mod && mod._loader || this._defaultLoader;
        }
    }, {
        key: '_createModule',
        value: function _createModule(name, parentModule) {
            var _this45 = this;

            var _D$Loader$_analyse = D.Loader._analyse(name);

            var moduleName = _D$Loader$_analyse.name;
            var loaderName = _D$Loader$_analyse.loader;
            var loader = this._getLoader(loaderName, parent);

            return this.chain(loader.loadModule(moduleName), function () {
                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                return typeCache.createModule(options.type, moduleName, _this45, parentModule, loader, options);
            });
        }
    }, {
        key: '_createView',
        value: function _createView(name, mod) {
            var _this46 = this;

            var _D$Loader$_analyse2 = D.Loader._analyse(name);

            var viewName = _D$Loader$_analyse2.name;
            var loaderName = _D$Loader$_analyse2.loader;
            var loader = this._getLoader(loaderName, mod);

            return this.chain(loader.loadView(viewName, mod), function () {
                var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                return typeCache.createView(options.type, viewName, _this46, mod, loader, options);
            });
        }
    }, {
        key: '_createRegion',
        value: function _createRegion(el, name, mod) {
            var _D$Loader$_analyse3 = D.Loader._analyse(name);

            var regionName = _D$Loader$_analyse3.name;
            var type = _D$Loader$_analyse3.loader;

            return typeCache.createRegion(type, this, mod, el, regionName);
        }
    }, {
        key: '_createStore',
        value: function _createStore(mod) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return typeCache.createStore(options.type, mod, options);
        }
    }, {
        key: '_createModel',
        value: function _createModel(store) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return typeCache.createModel(options.type, store, options);
        }
    }]);

    return Application;
}(D.Base);

assign(D.Application.prototype, D.Event);

var PUSH_STATE_SUPPORTED = root && root.history && 'pushState' in root.history;
var ROUTER_REGEXPS = [/:([\w\d]+)/g, '([^\/]+)', /\*([\w\d]+)/g, '(.*)'];

var Route = function () {
    function Route(app, router, path, fn) {
        _classCallCheck(this, Route);

        var pattern = path.replace(ROUTER_REGEXPS[0], ROUTER_REGEXPS[1]).replace(ROUTER_REGEXPS[2], ROUTER_REGEXPS[3]);

        this.pattern = new RegExp('^' + pattern + '$', app.options.caseSensitiveHash ? 'g' : 'gi');

        this.app = app;
        this.router = router;
        this.path = path;
        this.fn = fn;
    }

    _createClass(Route, [{
        key: 'match',
        value: function match(hash) {
            this.pattern.lastIndex = 0;
            return this.pattern.test(hash);
        }
    }, {
        key: 'handle',
        value: function handle(hash) {
            var _router2,
                _this47 = this;

            this.pattern.lastIndex = 0;
            var args = this.pattern.exec(hash).slice(1),
                handlers = this.router._getInterceptors(this.path);

            handlers.push(this.fn);
            return (_router2 = this.router).chain.apply(_router2, _toConsumableArray(map(handlers, function (fn, i) {
                return function (prev) {
                    return fn.apply(_this47.router, i > 0 ? [prev].concat(args) : args);
                };
            })));
        }
    }]);

    return Route;
}();

D.Router = function (_D$Base8) {
    _inherits(Router, _D$Base8);

    function Router(app) {
        _classCallCheck(this, Router);

        var _this48 = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, 'Router', {}, {
            app: app,
            _routes: [],
            _interceptors: {},
            _started: false
        }));

        _this48._EVENT_HANDLER = function () {
            return _this48._dispath(_this48._getHash());
        };
        return _this48;
    }

    _createClass(Router, [{
        key: 'navigate',
        value: function navigate(path, trigger) {
            if (!this._started) return;
            if (PUSH_STATE_SUPPORTED) {
                root.history.pushState({}, root.document.title, '#' + path);
            } else {
                root.location.replace('#' + path);
            }

            if (trigger !== false) this._dispath(path);
        }
    }, {
        key: '_start',
        value: function _start(defaultPath) {
            if (this._started || !root) return;
            D.Adapter.addEventListener(root, 'hashchange', this._EVENT_HANDLER, false);

            var hash = this._getHash() || defaultPath;
            this._started = true;
            if (hash) this.navigate(hash);
        }
    }, {
        key: '_stop',
        value: function _stop() {
            if (!this._started) return;
            D.Adapter.removeEventListener(root, 'hashchange', this._EVENT_HANDLER);
            this._started = false;
        }
    }, {
        key: '_dispath',
        value: function _dispath(path) {
            if (path === this._previousHash) return;
            this._previousHash = path;

            for (var i = 0; i < this._routes.length; i++) {
                var route = this._routes[i];
                if (route.match(path)) {
                    route.handle(path);
                    return;
                }
            }
        }
    }, {
        key: '_mountRoutes',
        value: function _mountRoutes() {
            var _this49 = this;

            var paths = slice.call(arguments);
            return this.chain(map(paths, function (path) {
                return _this49.app._getLoader(path).loadRouter(path);
            }), function (options) {
                return map(options, function (option, i) {
                    return _this49._addRoute(paths[i], option);
                });
            });
        }
    }, {
        key: '_addRoute',
        value: function _addRoute(path, options) {
            var _this50 = this;

            var routes = options.routes;
            var interceptors = options.interceptors;

            mapObj(D.isFunction(routes) ? routes.apply(this) : routes, function (value, key) {
                var p = (path + '/' + key).replace(/^\/|\/$/g, '');
                _this50._routes.unshift(new Route(_this50.app, _this50, p, options[value]));
            });

            mapObj(D.isFunction(interceptors) ? interceptors.apply(this) : interceptors, function (value, key) {
                var p = (path + '/' + key).replace(/^\/|\/$/g, '');
                _this50._interceptors[p] = options[value];
            });
        }
    }, {
        key: '_getInterceptors',
        value: function _getInterceptors(path) {
            var result = [],
                items = path.split('/');

            items.pop();
            while (items.length > 0) {
                var key = items.join('/');
                if (this._interceptors[key]) result.unshift(this._interceptors[key]);
                items.pop();
            }

            if (this._interceptors['']) result.unshift(this._interceptors['']);
            return result;
        }
    }, {
        key: '_getHash',
        value: function _getHash() {
            return root.location.hash.slice(1);
        }
    }]);

    return Router;
}(D.Base);

var PAGE_DEFAULT_OPTIONS = {
    pageSize: 10,
    pageKey: '_page',
    pageSizeKey: 'pageSize',
    recordCountKey: 'recordCount',
    params: function params(item) {
        return item;
    }
};

D.PageableModel = function (_D$Model) {
    _inherits(PageableModel, _D$Model);

    _createClass(PageableModel, null, [{
        key: 'setDefault',
        value: function setDefault(defaults) {
            assign(PAGE_DEFAULT_OPTIONS, defaults);
        }
    }]);

    function PageableModel(store, options) {
        _classCallCheck(this, PageableModel);

        var _this51 = _possibleConstructorReturn(this, Object.getPrototypeOf(PageableModel).call(this, store, options));

        _this51._data = _this51._option('data') || [];
        _this51._p = {
            page: _this51._option('page') || 1,
            pageCount: 0,
            pageSize: _this51._option('pageSize') || PAGE_DEFAULT_OPTIONS.pageSize,
            pageKey: _this51._option('pageKey') || PAGE_DEFAULT_OPTIONS.pageKey,
            pageSizeKey: _this51._option('pageSizeKey') || PAGE_DEFAULT_OPTIONS.pageSizeKey,
            recordCountKey: _this51._option('recordCountKey') || PAGE_DEFAULT_OPTIONS.recordCountKey
        };
        return _this51;
    }

    _createClass(PageableModel, [{
        key: 'set',
        value: function set() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var trigger = arguments[1];

            this._p.recordCount = data[this._p.recordCountKey] || 0;
            this._p.pageCount = Math.ceil(this._p.recordCount / this._p.pageSize);
            _get(Object.getPrototypeOf(PageableModel.prototype), 'set', this).call(this, data, trigger);
        }
    }, {
        key: 'clear',
        value: function clear(trigger) {
            this._p.page = 1;
            this._p.recordCount = 0;
            this._p.pageCount = 0;
            _get(Object.getPrototypeOf(PageableModel.prototype), 'clear', this).call(this, trigger);
        }
    }, {
        key: 'turnToPage',
        value: function turnToPage(page) {
            if (page <= this._p.pageCount && page >= 1) this._p.page = page;
            return this;
        }
    }, {
        key: 'firstPage',
        value: function firstPage() {
            return this.turnToPage(1);
        }
    }, {
        key: 'lastPage',
        value: function lastPage() {
            return this.turnToPage(this._p.pageCount);
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            return this.turnToPage(this._p.page + 1);
        }
    }, {
        key: 'prevPage',
        value: function prevPage() {
            return this.turnToPage(this._p.page - 1);
        }
    }, {
        key: 'params',
        get: function get() {
            var _p = this._p;
            var page = _p.page;
            var pageKey = _p.pageKey;
            var pageSizeKey = _p.pageSizeKey;
            var pageSize = _p.pageSize;

            var params = _get(Object.getPrototypeOf(PageableModel.prototype), 'params', this);
            params[pageKey] = page;
            params[pageSizeKey] = pageSize;
            return PAGE_DEFAULT_OPTIONS.params(params);
        }
    }, {
        key: 'pageInfo',
        get: function get() {
            var _p2 = this._p;
            var page = _p2.page;
            var pageSize = _p2.pageSize;
            var recordCount = _p2.recordCount;

            var result = undefined;
            if (this.data && this.data.length > 0) {
                result = { page: page, start: (page - 1) * pageSize + 1, end: page * pageSize, total: recordCount };
            } else {
                result = { page: page, start: 0, end: 0, total: 0 };
            }

            if (result.end > result.total) result.end = result.total;
            return result;
        }
    }]);

    return PageableModel;
}(D.Model);

D.registerModel('pageable', D.PageableModel);

D.MultiRegion = function (_D$Region) {
    _inherits(MultiRegion, _D$Region);

    function MultiRegion() {
        _classCallCheck(this, MultiRegion);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MultiRegion).apply(this, arguments));
    }

    _createClass(MultiRegion, [{
        key: '_initialize',
        value: function _initialize() {
            this._items = {};
            this._elements = {};
        }
    }, {
        key: 'activate',
        value: function activate() {}
    }, {
        key: 'show',
        value: function show(renderable) {
            var _this53 = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var opt = renderable.moduleOptions,
                str = D.isString(renderable);
            var key = options.key;
            if (!str && !(renderable instanceof D.Renderable)) {
                this._error('The item is expected to be an instance of Renderable');
            }

            if (!key && opt && opt.key) key = opt.key;
            if (!key) this._error('Region key is required');
            var item = this._items[key];

            if (this._isCurrent(key, item, renderable)) {
                if (options.forceRender === false) return this.Promise.resolve(item);
                return item.render(options);
            }

            return this.chain(str ? this.app._createModule(renderable) : renderable, [function (obj) {
                return _this53.chain(obj._region && obj._region.close(), obj);
            }, function () {
                return _this53.chain(item && item._close(), function () {
                    delete _this53._items[key];
                    delete _this53._elements[key];
                });
            }], function (_ref9) {
                var _ref10 = _slicedToArray(_ref9, 1);

                var obj = _ref10[0];

                var attr = obj.module ? obj.module.name + ':' + obj.name : obj.name,
                    el = _this53._getElement(obj, key);

                _this53._items[key] = obj;
                el.setAttribute('data-current', attr);
                obj._setRegion(_this53);
                return obj._render(options, false);
            });
        }
    }, {
        key: '_createElement',
        value: function _createElement() {
            var el = root.document.createElement('div');
            this._el.appendChild(el);
            return el;
        }
    }, {
        key: '_getElement',
        value: function _getElement(item, key) {
            if (!item) return this._el;
            var k = key || item.renderOptions.key || item.moduleOptions.key;
            if (!this._elements[k]) this._elements[k] = this._createElement(k, item);
            return this._elements[k];
        }
    }, {
        key: '_isCurrent',
        value: function _isCurrent(key, item, renderable) {
            if (!item) return false;
            return item.name === renderable || renderable && renderable.id === item.id;
        }
    }, {
        key: '_empty',
        value: function _empty(item) {
            if (!item) {
                _get(Object.getPrototypeOf(MultiRegion.prototype), '_empty', this).call(this);
                return;
            }

            var el = this._getElement(item);
            el.parentNode.removeChild(el);
        }
    }, {
        key: 'close',
        value: function close() {
            var _this54 = this;

            return this.chain(mapObj(this._items, function (item) {
                return item._close();
            }), function () {
                _this54._elements = {};
                _this54._items = {};
                delete _this54._current;
            }, this);
        }
    }]);

    return MultiRegion;
}(D.Region);
return Drizzle;
}));

},{}],"handlebars/runtime":[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":1}]},{},[]);

//# sourceMappingURL=common.js.map
