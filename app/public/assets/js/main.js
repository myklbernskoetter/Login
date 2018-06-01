/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** ./_src/js/main.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _bundleUtility = __webpack_require__(/*! ./lib/bundle-utility */ 1);

	var loaded = (0, _bundleUtility.loadActions)((0, _bundleUtility.filterActions)([{
	  selector: '.site-main',
	  load: [__webpack_require__(/*! ./modules/sign-in-out */ 3)]
	}, {
	  selector: '.signed-in-list',
	  load: [__webpack_require__(/*! ./modules/results */ 5)]
	}])); // import 'babel-polyfill';

/***/ }),
/* 1 */
/*!***************************************!*\
  !*** ./_src/js/lib/bundle-utility.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.filterActions = filterActions;
	exports.loadActions = loadActions;

	var _jquery = __webpack_require__(/*! jquery */ 2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Invokes the functions of a set of config objects if their criteria pass on load
	 * @param  {Array} actionItems A set of configs.
	 *                             { selector (String), route (String), load (Function|Array) }
	 * @return {Array}             The results of what was initialized
	 */
	function filterActions(actionItems) {
	  var results = actionItems.reduce(function (_results, actionItem) {
	    var matchesActionItem = handleFilter(actionItem);

	    return !matchesActionItem ? _results : [].concat(_toConsumableArray(_results), [matchesActionItem]);
	  }, []);

	  return results;
	}

	/**
	 * Returns whether the given route matches the current window location
	 * @param  {String} route A route to check
	 * @return {Boolean}       Whether or not the route matches the current window location
	 */
	function getRouteResults(route) {
	  var regularExpression = new RegExp(route);
	  return regularExpression.test(window.location);
	}

	/**
	 * Returns the matched DOM nodes for a given selector, if they exist
	 * @param  {String} selector   A typical DOM selector
	 * @return {NodeList|Boolean}  If results: NodeList. If not: false.
	 */
	function getSelectorResults(selector) {
	  var $nodes = (0, _jquery2.default)(selector);

	  return !$nodes.length ? false : $nodes;
	}

	/**
	 * Fires the load actions of an filter and returns results if the criteria pass
	 * @param  {Object} filter { selector (String), route (String), load (Function|Array) }
	 * @return {Boolen|Object}      False if the not initialized.
	 *                              filter object if initialized.
	 *                              selectorResults added if selector is in the filter.
	 */
	function handleFilter(filter) {
	  var selector = filter.selector,
	      route = filter.route;

	  var selectorResults = selector ? getSelectorResults(selector) : true;
	  var routeResults = route ? getRouteResults(route) : true;

	  if (!selectorResults || !routeResults) {
	    return false;
	  }

	  if (selector) {
	    return Object.assign({}, filter, { selectorResults: selectorResults });
	  }

	  return filter;
	}

	/**
	 * Loops through a set of actionItem objects and calls
	 * the functions/modules in their "load" arrays
	 * @param  {Array} actionItems A list of objects. { load (Function|Array) }
	 */
	function loadActions(actionItems) {
	  actionItems.forEach(function (_ref) {
	    var selectorResults = _ref.selectorResults,
	        selector = _ref.selector,
	        load = _ref.load;

	    var actions = Array.isArray(load) ? load : [load];

	    actions.forEach(function (action) {
	      if (typeof toLoad === 'function') {
	        action(selectorResults, selector);
	      } else {
	        action.default(selectorResults, selector);
	      }
	    });
	  });

	  return actionItems;
	}

/***/ }),
/* 2 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 3 */
/*!****************************************!*\
  !*** ./_src/js/modules/sign-in-out.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = signInDefault;

	var _elements = __webpack_require__(/*! constants/elements */ 4);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var $dialog = $('dialog');
	var enter = 13;
	var esq = 27;
	var items = JSON.parse(localStorage.getItem('items')) || [];
	var message = '';

	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getYear() - 100 + 2000;

	var idList = populateList();
	var studentList = [].concat(_toConsumableArray(getStudents()));

	function populateList() {
	  var idList = [];
	  if (window.localStorage.length) {
	    var oldList = localStorage.getItem("items");
	    var oldIdList = JSON.parse(oldList); //var is now re-loaded!
	    var _idList = [].concat(_toConsumableArray(oldIdList));
	    return _idList;
	  }
	  return idList;
	}

	function getStudents() {
	  var xmlhttp = new XMLHttpRequest();
	  var object = [];

	  xmlhttp.onreadystatechange = function () {
	    if (this.readyState === 4 && this.status === 200) {
	      object = this.responseText;
	    }
	  };

	  xmlhttp.open('GET', '/assets/js/data/students.json', false);
	  xmlhttp.send();
	  var students = JSON.parse(object);
	  var studentList = [].concat(_toConsumableArray(students));

	  return studentList;
	}

	function signInOut() {
	  message = 'Welcome to the Library!';
	  $dialog.html(message);
	  var time = new Date();
	  var hour = time.getHours();
	  var minutes = time.getMinutes();
	  var seconds = time.getSeconds();

	  var $studentID = $('.sign-in-input').val();
	  var $signInIDS = $('.tr .id-number');

	  if ($studentID.length) {
	    var $student = [month + '-' + day + '-' + year, $studentID, (hour > 12 ? hour - 12 : hour) + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds, '-'];

	    for (var $i = 0; $i < studentList.length; $i++) {
	      if (studentList[$i].id == $studentID) {
	        message = 'Welcome to the Library, ' + studentList[$i].fname + '!';
	        $student.push('' + studentList[$i].fname, '' + studentList[$i].lname);
	        $dialog.html(message);
	      }
	    }

	    $dialog.addClass('active');
	    setTimeout(function () {
	      $dialog.removeClass('active');
	    }, 2500);

	    for (var _$i = 0; _$i < idList.length; _$i++) {
	      if ($studentID === idList[_$i][1]) {
	        message = 'Come Back Soon!';

	        if (idList[_$i][3] === '-') {
	          $dialog.html(message);
	          $dialog.addClass('active');
	          setTimeout(function () {
	            $dialog.removeClass('active');
	            message = 'Welcome to the Library';
	          }, 2500);
	          idList[_$i][3] = (hour > 12 ? hour - 12 : hour) + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	          localStorage.setItem('items', JSON.stringify(idList));
	          return;
	        } else {
	          idList.unshift.apply(idList, [$student]);
	          localStorage.setItem('items', JSON.stringify(idList));
	          return;
	        }
	      }
	    }
	    idList.unshift.apply(idList, [$student]);
	    localStorage.setItem('items', JSON.stringify(idList));

	    $('.sign-in-input').val('');
	  } else {
	    alert('Please enter your student ID');
	  }
	}

	function keySignInOut(event) {
	  if (event.keyCode === enter) {
	    signInOut();
	    $('.sign-in-input').val('');
	  }

	  if (event.keyCode === esq) {
	    $('.sign-in-input').val('');
	  }
	}

	function signInDefault() {
	  _elements.$body.on('click', '.sign-in-button', signInOut);
	  _elements.$win.on('keyup', keySignInOut);
	}

/***/ }),
/* 4 */
/*!***************************************!*\
  !*** ./_src/js/constants/elements.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$body = exports.$doc = exports.$win = undefined;

	var _jquery = __webpack_require__(/*! jquery */ 2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $win = exports.$win = (0, _jquery2.default)(window); /**
	                                                          * Elements
	                                                          *
	                                                          * Used to share common elements across all modules,
	                                                          * in order to avoid multiple DOM queries.
	                                                          *
	                                                          * import { $body } from 'constants/elements';
	                                                          * $body.addClass('something');
	                                                          */

	var $doc = exports.$doc = (0, _jquery2.default)(document);
	var $body = exports.$body = (0, _jquery2.default)('body');

/***/ }),
/* 5 */
/*!************************************!*\
  !*** ./_src/js/modules/results.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = resultsDefault;

	var _elements = __webpack_require__(/*! constants/elements */ 4);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var idList = populateList();

	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getYear() - 100 + 2000;

	function populateList() {
	  var idList = [];
	  if (window.localStorage.length) {
	    var oldList = localStorage.getItem("items");
	    var oldIdList = JSON.parse(oldList); //var is now re-loaded!
	    var _idList = [].concat(_toConsumableArray(oldIdList));
	    output(_idList);
	    return _idList;
	  }
	  return idList;
	}

	function output(students) {
	  $('.lists').empty();
	  students.forEach(function (student) {
	    $('.lists').append('<div class="tr">\n        <div class="date-list">\n          <span class="td date">' + student[0] + '</span>\n        </div>\n        <div class="time-in-list">\n          <span class="td time-in">' + student[2] + '</span>\n        </div>\n        <div class="time-out-list">\n          <span class="td time-out">' + (student[3] === undefined ? ' - ' : student[3]) + '</span>\n        </div>\n        <div class="student-name">\n          <span class="td name">' + (student[4] === undefined ? ' - ' : student[4]) + ' ' + (student[5] === undefined ? '' : student[5]) + ' </span>\n        </div>\n        <div class="id-list">\n          <span class="td id-number">' + student[1] + '</span>\n        </div>\n      </div>');
	  });
	}

	function writeToFile(e) {
	  e.preventDefault();

	  var csvContent = "data:text/csv;charset=utf-8,";
	  idList.forEach(function (rowArray) {
	    var row = rowArray.join(",");
	    csvContent += row + "\r\n";
	  });

	  var encodedUri = encodeURI(csvContent);
	  var link = document.createElement('a');

	  link.setAttribute("href", encodedUri);
	  link.setAttribute("download", month + '-' + day + '-' + year + '.csv');
	  document.body.appendChild(link); // Required for FF

	  link.click(); // This will download the data file named "my_data.csv".
	}

	function clearData(e) {
	  e.preventDefault();
	  idList = [];
	  $('.lists').empty();
	  localStorage.clear();
	}

	function resultsDefault() {
	  _elements.$body.on('click', '.clear-button', clearData);
	  _elements.$body.on('click', '.generate-button', writeToFile);
	}

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map
