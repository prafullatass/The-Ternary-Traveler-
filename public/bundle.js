(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataManager = _interopRequireDefault(require("../utilities/dataManager"));

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const interestForm = () => {
  return _dataManager.default.Get("places").then(places => {
    let html = `<label for="placeId"><strong>Select Location : </strong> </label>
            <select id="placeId"> `;
    places.forEach(place => {
      html += `<option value = ${place.id}> ${place.name}</option>`;
    });
    html += `</select> </br>
            <label for="intName"><strong> Name : </strong> </label>
            <input type="text" name="intName" id="intName"></input></br>
            <label for="intDesc"><strong> Description : </strong> </label>
            <textarea name="intDesc" id="intDesc" cols="30" rows="5"></textarea>
            `;
    (0, _printToDOM.default)(html, "#int_list");
  });
};

var _default = interestForm;
exports.default = _default;

},{"../utilities/dataManager":7,"../utilities/printToDOM":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const interestHtml = obj => {
  return `<section class = "card">
    <div class = "placeName"><strong> Place : ${obj.place.name} </strong> </div>
    <div><strong>  Name : </strong> ${obj.name} </div>
    <div><strong>  Description : </strong> ${obj.description}</div>
    <button id = "edit--${obj.id}" type="submit">EDIT</button>
    <button id = "delete--${obj.id}" type="submit">DELETE</button>
    </section> <hr/>
    `;
};

var _default = interestHtml;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataManager = _interopRequireDefault(require("../utilities/dataManager"));

var _interestsList = _interopRequireDefault(require("./interestsList"));

var _interestForm = _interopRequireDefault(require("./interestForm"));

var _validation = _interopRequireDefault(require("../utilities/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = document.querySelector.bind(document);

const makeObject = () => {
  return {
    "placeId": $("#placeId").value,
    "name": $("#intName").value,
    "description": $("#intDesc").value
  };
};

const submitButtonStatus = () => {
  //submit button
  if ($("#AddNewInterest").textContent === "Submit") {
    let obj = makeObject();

    if ((0, _validation.default)(obj.taskName, obj.completionDate)) {
      _dataManager.default.Post("interests", makeObject()).then(_interestsList.default);
    }
  } else {
    //update -- after edit
    if ($("#AddNewInterest").textContent === "Update") {
      let obj = makeObject();
      obj.id = $("#AddNewInterest").classList.value;

      _dataManager.default.Put(`interests/${obj.id}`, obj).then(_interestsList.default);
    } else {
      //adding new form
      $("#int_list").innerHTML = "";
      (0, _interestForm.default)();
    }
  }
};

const interestManager = {
  clickEL() {
    $("#int_list").addEventListener("click", event => {
      if (event.target.id.startsWith("delete--")) this.Delete(event.target.id.split("--")[1]);else if (event.target.id.startsWith("edit--")) this.Edit(event.target.id.split("--")[1]);
    });
  },

  Add() {
    $("#AddNewInterest").addEventListener("click", () => {
      submitButtonStatus();
    });
  },

  Delete(id) {
    if (window.confirm("DELETE interest ?")) _dataManager.default.Delete(`interests/${id}`).then(_interestsList.default);
  },

  Edit(id) {
    _dataManager.default.Get(`interests/${id}`).then(obj => {
      $("#int_list").innerHTML = "";
      (0, _interestForm.default)().then(() => {
        $("#intName").value = obj.name;
        $("#intDesc").value = obj.description;
        $("#AddNewInterest").textContent = "Update";
        $("#placeId").value = obj.placeId;
        $("#placeId").enabled = false;
        $("#AddNewInterest").classList = obj.id;
      });
    });
  }

};
var _default = interestManager;
exports.default = _default;

},{"../utilities/dataManager":7,"../utilities/validation":9,"./interestForm":1,"./interestsList":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataManager = _interopRequireDefault(require("../utilities/dataManager"));

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

var _interestHtml = _interopRequireDefault(require("./interestHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const interestList = () => {
  document.querySelector("#int_list").innerHTML = "";
  document.querySelector("#heading").innerHTML = "";
  (0, _printToDOM.default)("Interests - All", "#heading");

  _dataManager.default.Get("interests?_expand=place").then(interestArray => {
    interestArray.forEach(interest => {
      (0, _printToDOM.default)((0, _interestHtml.default)(interest), "#int_list");
    }); //printToDOM(`<button id="AddNewInterest">Add New Interest</button>`, "#int_list")

    document.querySelector("#AddNewInterest").innerHTML = "Add New Interest";
  });
};

var _default = interestList;
exports.default = _default;

},{"../utilities/dataManager":7,"../utilities/printToDOM":8,"./interestHtml":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataManager = _interopRequireDefault(require("../utilities/dataManager"));

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const placesList = () => {
  _dataManager.default.Get("places").then(placesArray => {
    placesArray.forEach(place => {
      (0, _printToDOM.default)(`${place.name} </br>`, "#places_list");
    });
  });
};

var _default = placesList;
exports.default = _default;

},{"../utilities/dataManager":7,"../utilities/printToDOM":8}],6:[function(require,module,exports){
"use strict";

var _interestsList = _interopRequireDefault(require("./interests/interestsList"));

var _interestManager = _interopRequireDefault(require("./interests/interestManager"));

var _places = _interopRequireDefault(require("./interests/places"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _places.default)();
(0, _interestsList.default)();

_interestManager.default.clickEL();

_interestManager.default.Add();

},{"./interests/interestManager":3,"./interests/interestsList":4,"./interests/places":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const DataManager = {
  Get(dbString) {
    return fetch(`http://localhost:8088/${dbString}`).then(res => res.json());
  },

  Post(dbString, obj) {
    return fetch(`http://localhost:8088/${dbString}`, {
      method: "POST",
      headers: {
        "content-type": "application/JSON"
      },
      body: JSON.stringify(obj)
    }).then(res => res.json());
  },

  Put(dbString, obj) {
    return fetch(`http://localhost:8088/${dbString}`, {
      method: "PUT",
      headers: {
        "content-type": "application/JSON"
      },
      body: JSON.stringify(obj)
    }).then(res => res.json());
  },

  Delete(dbString) {
    return fetch(`http://localhost:8088/${dbString}`, {
      method: "DELETE"
    }).then(res => res.json());
  }

};
var _default = DataManager;
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const printToDOM = (Htmlstring, element) => {
  return document.querySelector(element).innerHTML += Htmlstring;
};

var _default = printToDOM;
exports.default = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let profanityRegexArray = ["^[a@][s\$][s\$]$", "[a@][s\$][s\$]h[o0][l1][e3][s\$]?", "b[a@][s\$][t\+][a@]rd", "b[e3][a@][s\$][t\+][i1][a@]?[l1]([i1][t\+]y)?", "b[e3][a@][s\$][t\+][i1][l1][i1][t\+]y", "b[e3][s\$][t\+][i1][a@][l1]([i1][t\+]y)?", "b[i1][t\+]ch[s\$]?", "b[i1][t\+]ch[e3]r[s\$]?", "b[i1][t\+]ch[e3][s\$]", "b[i1][t\+]ch[i1]ng?", "b[l1][o0]wj[o0]b[s\$]?", "c[l1][i1][t\+]", "^(c|k|ck|q)[o0](c|k|ck|q)[s\$]?$", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]d", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]r", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[i1]ng", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[s\$]", "^cum[s\$]?$", "cumm??[e3]r", "cumm?[i1]ngcock", "(c|k|ck|q)um[s\$]h[o0][t\+]", "(c|k|ck|q)un[i1][l1][i1]ngu[s\$]", "(c|k|ck|q)un[i1][l1][l1][i1]ngu[s\$]", "(c|k|ck|q)unn[i1][l1][i1]ngu[s\$]", "(c|k|ck|q)un[t\+][s\$]?", "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)", "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[e3]r", "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[i1]ng", "cyb[e3]r(ph|f)u(c|k|ck|q)", "d[a@]mn", "d[i1]ck", "d[i1][l1]d[o0]", "d[i1][l1]d[o0][s\$]", "d[i1]n(c|k|ck|q)", "d[i1]n(c|k|ck|q)[s\$]", "[e3]j[a@]cu[l1]", "(ph|f)[a@]g[s\$]?", "(ph|f)[a@]gg[i1]ng", "(ph|f)[a@]gg?[o0][t\+][s\$]?", "(ph|f)[a@]gg[s\$]", "(ph|f)[e3][l1][l1]?[a@][t\+][i1][o0]", "(ph|f)u(c|k|ck|q)", "(ph|f)u(c|k|ck|q)[s\$]?", "g[a@]ngb[a@]ng[s\$]?", "g[a@]ngb[a@]ng[e3]d", "g[a@]y", "h[o0]m?m[o0]", "h[o0]rny", "j[a@](c|k|ck|q)\-?[o0](ph|f)(ph|f)?", "j[e3]rk\-?[o0](ph|f)(ph|f)?", "j[i1][s\$z][s\$z]?m?", "[ck][o0]ndum[s\$]?", "mast(e|ur)b(8|ait|ate)", "n[i1]gg?[e3]r[s\$]?", "[o0]rg[a@][s\$][i1]m[s\$]?", "[o0]rg[a@][s\$]m[s\$]?", "p[e3]nn?[i1][s\$]", "p[i1][s\$][s\$]", "p[i1][s\$][s\$][o0](ph|f)(ph|f)", "p[o0]rn", "p[o0]rn[o0][s\$]?", "p[o0]rn[o0]gr[a@]phy", "pr[i1]ck[s\$]?", "pu[s\$][s\$][i1][e3][s\$]", "pu[s\$][s\$]y[s\$]?", "[s\$][e3]x", "[s\$]h[i1][t\+][s\$]?", "[s\$][l1]u[t\+][s\$]?", "[s\$]mu[t\+][s\$]?", "[s\$]punk[s\$]?", "[t\+]w[a@][t\+][s\$]?"];

const isEmpty = stringToCheck => {
  if (stringToCheck === "") {
    return true;
  }

  return false;
};

const isProfanity = stringToCheck => {
  let flag = false;
  profanityRegexArray.forEach(regex => {
    let matcher = new RegExp(regex);

    if (matcher.test(stringToCheck)) {
      flag = true;
      return true;
    }
  });
  return flag;
};

const validate = (...arg) => {
  for (let i = 0; i < arg.length; i++) {
    let el = arg[i];

    if (isEmpty(el)) {
      alert("One or more fields are empty");
      return false;
    } else if (isProfanity(el)) {
      alert("One or more fields contain profanity");
      return false;
    }
  }

  return true;
};

var _default = validate;
exports.default = _default;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdEZvcm0uanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdEh0bWwuanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdE1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdHNMaXN0LmpzIiwiLi4vc2NyaXB0cy9pbnRlcmVzdHMvcGxhY2VzLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvZGF0YU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9wcmludFRvRE9NLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvdmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUVBLE1BQU0sWUFBWSxHQUFHLE1BQU07QUFDdkIsU0FBTyxxQkFBWSxHQUFaLENBQWdCLFFBQWhCLEVBQ0YsSUFERSxDQUNHLE1BQU0sSUFBSTtBQUNaLFFBQUksSUFBSSxHQUFJO21DQUFaO0FBRUEsSUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLEtBQUssSUFBSTtBQUNwQixNQUFBLElBQUksSUFBSyxtQkFBa0IsS0FBSyxDQUFDLEVBQUcsS0FBSSxLQUFLLENBQUMsSUFBSyxXQUFuRDtBQUNILEtBRkQ7QUFHQSxJQUFBLElBQUksSUFBSzs7Ozs7YUFBVDtBQU1BLDZCQUFXLElBQVgsRUFBZ0IsV0FBaEI7QUFDRixHQWRDLENBQVA7QUFlSCxDQWhCRDs7ZUFrQmUsWTs7Ozs7Ozs7Ozs7QUNyQmYsTUFBTSxZQUFZLEdBQUksR0FBRCxJQUFTO0FBQzFCLFNBQVE7Z0RBQ29DLEdBQUcsQ0FBQyxLQUFKLENBQVUsSUFBSztzQ0FDekIsR0FBRyxDQUFDLElBQUs7NkNBQ0YsR0FBRyxDQUFDLFdBQVk7MEJBQ25DLEdBQUcs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SSxNQUFKLENBQVcsS0FBWCxDQUFkOztBQUVBLFFBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxhQUFiLENBQUosRUFBaUM7QUFDN0IsTUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNBLGFBQU8sSUFBUDtBQUNIO0FBQ0osR0FQRDtBQVFBLFNBQU8sSUFBUDtBQUNILENBWEQ7O0FBYUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEdBQUosS0FBWTtBQUN6QixPQUFLLElBQUksQ0FBQyxHQUFHLENBQWIsRUFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUF4QixFQUFnQyxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFFBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFELENBQVo7O0FBQ0EsUUFBSSxPQUFPLENBQUMsRUFBRCxDQUFYLEVBQWlCO0FBQ2IsTUFBQSxLQUFLLENBQUMsOEJBQUQsQ0FBTDtBQUNBLGFBQU8sS0FBUDtBQUNILEtBSEQsTUFJSyxJQUFJLFdBQVcsQ0FBQyxFQUFELENBQWYsRUFBcUI7QUFDdEIsTUFBQSxLQUFLLENBQUMsc0NBQUQsQ0FBTDtBQUNBLGFBQU8sS0FBUDtBQUNIO0FBQ0w7O0FBQ0EsU0FBTyxJQUFQO0FBQ0gsQ0FiRDs7ZUFjZSxRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IERhdGFNYW5hZ2VyIGZyb20gXCIuLi91dGlsaXRpZXMvZGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XHJcblxyXG5jb25zdCBpbnRlcmVzdEZvcm0gPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gRGF0YU1hbmFnZXIuR2V0KFwicGxhY2VzXCIpXHJcbiAgICAgICAgLnRoZW4ocGxhY2VzID0+IHtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSBgPGxhYmVsIGZvcj1cInBsYWNlSWRcIj48c3Ryb25nPlNlbGVjdCBMb2NhdGlvbiA6IDwvc3Ryb25nPiA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8c2VsZWN0IGlkPVwicGxhY2VJZFwiPiBgXHJcbiAgICAgICAgICAgIHBsYWNlcy5mb3JFYWNoKHBsYWNlID0+IHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxvcHRpb24gdmFsdWUgPSAke3BsYWNlLmlkfT4gJHtwbGFjZS5uYW1lfTwvb3B0aW9uPmBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDwvc2VsZWN0PiA8L2JyPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiaW50TmFtZVwiPjxzdHJvbmc+IE5hbWUgOiA8L3N0cm9uZz4gPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImludE5hbWVcIiBpZD1cImludE5hbWVcIj48L2lucHV0PjwvYnI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJpbnREZXNjXCI+PHN0cm9uZz4gRGVzY3JpcHRpb24gOiA8L3N0cm9uZz4gPC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJpbnREZXNjXCIgaWQ9XCJpbnREZXNjXCIgY29scz1cIjMwXCIgcm93cz1cIjVcIj48L3RleHRhcmVhPlxyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIHByaW50VG9ET00oaHRtbCxcIiNpbnRfbGlzdFwiKVxyXG4gICAgICAgICB9IClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJlc3RGb3JtIiwiY29uc3QgaW50ZXJlc3RIdG1sID0gKG9iaikgPT4ge1xyXG4gICAgcmV0dXJuIGA8c2VjdGlvbiBjbGFzcyA9IFwiY2FyZFwiPlxyXG4gICAgPGRpdiBjbGFzcyA9IFwicGxhY2VOYW1lXCI+PHN0cm9uZz4gUGxhY2UgOiAke29iai5wbGFjZS5uYW1lfSA8L3N0cm9uZz4gPC9kaXY+XHJcbiAgICA8ZGl2PjxzdHJvbmc+ICBOYW1lIDogPC9zdHJvbmc+ICR7b2JqLm5hbWV9IDwvZGl2PlxyXG4gICAgPGRpdj48c3Ryb25nPiAgRGVzY3JpcHRpb24gOiA8L3N0cm9uZz4gJHtvYmouZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICA8YnV0dG9uIGlkID0gXCJlZGl0LS0ke29iai5pZH1cIiB0eXBlPVwic3VibWl0XCI+RURJVDwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBpZCA9IFwiZGVsZXRlLS0ke29iai5pZH1cIiB0eXBlPVwic3VibWl0XCI+REVMRVRFPC9idXR0b24+XHJcbiAgICA8L3NlY3Rpb24+IDxoci8+XHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGludGVyZXN0SHRtbCIsImltcG9ydCBEYXRhTWFuYWdlciBmcm9tIFwiLi4vdXRpbGl0aWVzL2RhdGFNYW5hZ2VyXCI7XHJcbmltcG9ydCBpbnRlcmVzdExpc3QgZnJvbSBcIi4vaW50ZXJlc3RzTGlzdFwiO1xyXG5pbXBvcnQgaW50ZXJlc3RGb3JtIGZyb20gXCIuL2ludGVyZXN0Rm9ybVwiO1xyXG5pbXBvcnQgdmFsaWRhdGUgZnJvbSBcIi4uL3V0aWxpdGllcy92YWxpZGF0aW9uXCI7XHJcblxyXG5jb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuY29uc3QgbWFrZU9iamVjdCA9ICgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgXCJwbGFjZUlkXCI6ICQoXCIjcGxhY2VJZFwiKS52YWx1ZSxcclxuICAgICAgICBcIm5hbWVcIjogJChcIiNpbnROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogJChcIiNpbnREZXNjXCIpLnZhbHVlXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCBzdWJtaXRCdXR0b25TdGF0dXMgPSAoKSA9PiB7XHJcbiAgICAvL3N1Ym1pdCBidXR0b25cclxuICAgIGlmICgkKFwiI0FkZE5ld0ludGVyZXN0XCIpLnRleHRDb250ZW50ID09PSBcIlN1Ym1pdFwiKSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IG1ha2VPYmplY3QoKVxyXG4gICAgICAgIGlmICh2YWxpZGF0ZShvYmoudGFza05hbWUsIG9iai5jb21wbGV0aW9uRGF0ZSkpIHtcclxuICAgICAgICAgICAgRGF0YU1hbmFnZXIuUG9zdChcImludGVyZXN0c1wiLCBtYWtlT2JqZWN0KCkpLnRoZW4oaW50ZXJlc3RMaXN0KVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy91cGRhdGUgLS0gYWZ0ZXIgZWRpdFxyXG4gICAgICAgIGlmICgkKFwiI0FkZE5ld0ludGVyZXN0XCIpLnRleHRDb250ZW50ID09PSBcIlVwZGF0ZVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBtYWtlT2JqZWN0KClcclxuICAgICAgICAgICAgb2JqLmlkID0gJChcIiNBZGROZXdJbnRlcmVzdFwiKS5jbGFzc0xpc3QudmFsdWVcclxuICAgICAgICAgICAgRGF0YU1hbmFnZXIuUHV0KGBpbnRlcmVzdHMvJHtvYmouaWR9YCwgb2JqKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oaW50ZXJlc3RMaXN0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9hZGRpbmcgbmV3IGZvcm1cclxuICAgICAgICAgICAgJChcIiNpbnRfbGlzdFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgIGludGVyZXN0Rm9ybSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgaW50ZXJlc3RNYW5hZ2VyID0ge1xyXG4gICAgY2xpY2tFTCgpIHtcclxuICAgICAgICAkKFwiI2ludF9saXN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLFxyXG4gICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJkZWxldGUtLVwiKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRlbGV0ZShldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiZWRpdC0tXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRWRpdChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBBZGQoKSB7XHJcbiAgICAgICAgJChcIiNBZGROZXdJbnRlcmVzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uU3RhdHVzKClcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBEZWxldGUoaWQpIHtcclxuICAgICAgICBpZiAod2luZG93LmNvbmZpcm0oXCJERUxFVEUgaW50ZXJlc3QgP1wiKSlcclxuICAgICAgICAgICAgRGF0YU1hbmFnZXIuRGVsZXRlKGBpbnRlcmVzdHMvJHtpZH1gKS50aGVuKGludGVyZXN0TGlzdClcclxuICAgIH0sXHJcbiAgICBFZGl0KGlkKSB7XHJcbiAgICAgICAgRGF0YU1hbmFnZXIuR2V0KGBpbnRlcmVzdHMvJHtpZH1gKS50aGVuKFxyXG4gICAgICAgICAgICAob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2ludF9saXN0XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgIGludGVyZXN0Rm9ybSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW50TmFtZVwiKS52YWx1ZSA9IG9iai5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbnREZXNjXCIpLnZhbHVlID0gb2JqLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNBZGROZXdJbnRlcmVzdFwiKS50ZXh0Q29udGVudCA9IFwiVXBkYXRlXCJcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3BsYWNlSWRcIikudmFsdWUgPSBvYmoucGxhY2VJZFxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjcGxhY2VJZFwiKS5lbmFibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0FkZE5ld0ludGVyZXN0XCIpLmNsYXNzTGlzdCA9IG9iai5pZFxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbnRlcmVzdE1hbmFnZXIiLCJpbXBvcnQgRGF0YU1hbmFnZXIgZnJvbSBcIi4uL3V0aWxpdGllcy9kYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIjtcclxuaW1wb3J0IGludGVyZXN0SHRtbCBmcm9tIFwiLi9pbnRlcmVzdEh0bWxcIjtcclxuXHJcblxyXG5jb25zdCBpbnRlcmVzdExpc3QgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ludF9saXN0XCIpLmlubmVySFRNTCA9XCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkaW5nXCIpLmlubmVySFRNTCA9XCJcIlxyXG4gICAgcHJpbnRUb0RPTShcIkludGVyZXN0cyAtIEFsbFwiLCBcIiNoZWFkaW5nXCIpXHJcbiAgICBEYXRhTWFuYWdlci5HZXQoXCJpbnRlcmVzdHM/X2V4cGFuZD1wbGFjZVwiKVxyXG4gICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICBpbnRlcmVzdEFycmF5ID0+IHtcclxuICAgICAgICAgICAgICAgIGludGVyZXN0QXJyYXkuZm9yRWFjaChpbnRlcmVzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRUb0RPTShpbnRlcmVzdEh0bWwoaW50ZXJlc3QpLCBcIiNpbnRfbGlzdFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL3ByaW50VG9ET00oYDxidXR0b24gaWQ9XCJBZGROZXdJbnRlcmVzdFwiPkFkZCBOZXcgSW50ZXJlc3Q8L2J1dHRvbj5gLCBcIiNpbnRfbGlzdFwiKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNBZGROZXdJbnRlcmVzdFwiKS5pbm5lckhUTUwgPSBcIkFkZCBOZXcgSW50ZXJlc3RcIlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJlc3RMaXN0IiwiaW1wb3J0IERhdGFNYW5hZ2VyIGZyb20gXCIuLi91dGlsaXRpZXMvZGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XHJcblxyXG5cclxuY29uc3QgcGxhY2VzTGlzdCA9ICgpID0+IHtcclxuICAgIERhdGFNYW5hZ2VyLkdldChcInBsYWNlc1wiKVxyXG4gICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICBwbGFjZXNBcnJheSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZXNBcnJheS5mb3JFYWNoKHBsYWNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmludFRvRE9NKGAke3BsYWNlLm5hbWV9IDwvYnI+YCwgXCIjcGxhY2VzX2xpc3RcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxhY2VzTGlzdCIsImltcG9ydCBpbnRlcmVzdExpc3QgZnJvbSBcIi4vaW50ZXJlc3RzL2ludGVyZXN0c0xpc3RcIjtcclxuaW1wb3J0IGludGVyZXN0TWFuYWdlciBmcm9tIFwiLi9pbnRlcmVzdHMvaW50ZXJlc3RNYW5hZ2VyXCI7XHJcbmltcG9ydCBwbGFjZXNMaXN0IGZyb20gXCIuL2ludGVyZXN0cy9wbGFjZXNcIjtcclxuXHJcbnBsYWNlc0xpc3QoKVxyXG5pbnRlcmVzdExpc3QoKVxyXG5pbnRlcmVzdE1hbmFnZXIuY2xpY2tFTCgpXHJcbmludGVyZXN0TWFuYWdlci5BZGQoKVxyXG5cclxuIiwiY29uc3QgRGF0YU1hbmFnZXIgPSB7XHJcbiAgICBHZXQgKGRiU3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYlN0cmluZ31gKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBQb3N0IChkYlN0cmluZywgb2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYlN0cmluZ31gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vSlNPTlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHkgOiBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBQdXQgKGRiU3RyaW5nLCBvYmopIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiU3RyaW5nfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL0pTT05cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5IDogSlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgRGVsZXRlIChkYlN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJTdHJpbmd9YCx7XHJcbiAgICAgICAgICAgIG1ldGhvZCA6IFwiREVMRVRFXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGF0YU1hbmFnZXIiLCJjb25zdCBwcmludFRvRE9NID0gKEh0bWxzdHJpbmcsIGVsZW1lbnQpID0+IHtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLmlubmVySFRNTCArPSBIdG1sc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50VG9ET00iLCJsZXQgcHJvZmFuaXR5UmVnZXhBcnJheSA9IFtcclxuICAgIFwiXlthQF1bc1xcJF1bc1xcJF0kXCIsXHJcbiAgICBcIlthQF1bc1xcJF1bc1xcJF1oW28wXVtsMV1bZTNdW3NcXCRdP1wiLFxyXG4gICAgXCJiW2FAXVtzXFwkXVt0XFwrXVthQF1yZFwiLFxyXG4gICAgXCJiW2UzXVthQF1bc1xcJF1bdFxcK11baTFdW2FAXT9bbDFdKFtpMV1bdFxcK115KT9cIixcclxuICAgIFwiYltlM11bYUBdW3NcXCRdW3RcXCtdW2kxXVtsMV1baTFdW3RcXCtdeVwiLFxyXG4gICAgXCJiW2UzXVtzXFwkXVt0XFwrXVtpMV1bYUBdW2wxXShbaTFdW3RcXCtdeSk/XCIsXHJcbiAgICBcImJbaTFdW3RcXCtdY2hbc1xcJF0/XCIsXHJcbiAgICBcImJbaTFdW3RcXCtdY2hbZTNdcltzXFwkXT9cIixcclxuICAgIFwiYltpMV1bdFxcK11jaFtlM11bc1xcJF1cIixcclxuICAgIFwiYltpMV1bdFxcK11jaFtpMV1uZz9cIixcclxuICAgIFwiYltsMV1bbzBdd2pbbzBdYltzXFwkXT9cIixcclxuICAgIFwiY1tsMV1baTFdW3RcXCtdXCIsXHJcbiAgICBcIl4oY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF0/JFwiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11XCIsXHJcbiAgICBcIihjfGt8Y2t8cSlbbzBdKGN8a3xja3xxKVtzXFwkXXUoY3xrfGNrfHEpW2UzXWRcIixcclxuICAgIFwiKGN8a3xja3xxKVtvMF0oY3xrfGNrfHEpW3NcXCRddShjfGt8Y2t8cSlbZTNdclwiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11KGN8a3xja3xxKVtpMV1uZ1wiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11KGN8a3xja3xxKVtzXFwkXVwiLFxyXG4gICAgXCJeY3VtW3NcXCRdPyRcIixcclxuICAgIFwiY3VtbT8/W2UzXXJcIixcclxuICAgIFwiY3VtbT9baTFdbmdjb2NrXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1bVtzXFwkXWhbbzBdW3RcXCtdXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1bltpMV1bbDFdW2kxXW5ndVtzXFwkXVwiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5baTFdW2wxXVtsMV1baTFdbmd1W3NcXCRdXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1bm5baTFdW2wxXVtpMV1uZ3Vbc1xcJF1cIixcclxuICAgIFwiKGN8a3xja3xxKXVuW3RcXCtdW3NcXCRdP1wiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5bdFxcK11bbDFdW2kxXShjfGt8Y2t8cSlcIixcclxuICAgIFwiKGN8a3xja3xxKXVuW3RcXCtdW2wxXVtpMV0oY3xrfGNrfHEpW2UzXXJcIixcclxuICAgIFwiKGN8a3xja3xxKXVuW3RcXCtdW2wxXVtpMV0oY3xrfGNrfHEpW2kxXW5nXCIsXHJcbiAgICBcImN5YltlM11yKHBofGYpdShjfGt8Y2t8cSlcIixcclxuICAgIFwiZFthQF1tblwiLFxyXG4gICAgXCJkW2kxXWNrXCIsXHJcbiAgICBcImRbaTFdW2wxXWRbbzBdXCIsXHJcbiAgICBcImRbaTFdW2wxXWRbbzBdW3NcXCRdXCIsXHJcbiAgICBcImRbaTFdbihjfGt8Y2t8cSlcIixcclxuICAgIFwiZFtpMV1uKGN8a3xja3xxKVtzXFwkXVwiLFxyXG4gICAgXCJbZTNdalthQF1jdVtsMV1cIixcclxuICAgIFwiKHBofGYpW2FAXWdbc1xcJF0/XCIsXHJcbiAgICBcIihwaHxmKVthQF1nZ1tpMV1uZ1wiLFxyXG4gICAgXCIocGh8ZilbYUBdZ2c/W28wXVt0XFwrXVtzXFwkXT9cIixcclxuICAgIFwiKHBofGYpW2FAXWdnW3NcXCRdXCIsXHJcbiAgICBcIihwaHxmKVtlM11bbDFdW2wxXT9bYUBdW3RcXCtdW2kxXVtvMF1cIixcclxuICAgIFwiKHBofGYpdShjfGt8Y2t8cSlcIixcclxuICAgIFwiKHBofGYpdShjfGt8Y2t8cSlbc1xcJF0/XCIsXHJcbiAgICBcImdbYUBdbmdiW2FAXW5nW3NcXCRdP1wiLFxyXG4gICAgXCJnW2FAXW5nYlthQF1uZ1tlM11kXCIsXHJcbiAgICBcImdbYUBdeVwiLFxyXG4gICAgXCJoW28wXW0/bVtvMF1cIixcclxuICAgIFwiaFtvMF1ybnlcIixcclxuICAgIFwialthQF0oY3xrfGNrfHEpXFwtP1tvMF0ocGh8ZikocGh8Zik/XCIsXHJcbiAgICBcImpbZTNdcmtcXC0/W28wXShwaHxmKShwaHxmKT9cIixcclxuICAgIFwialtpMV1bc1xcJHpdW3NcXCR6XT9tP1wiLFxyXG4gICAgXCJbY2tdW28wXW5kdW1bc1xcJF0/XCIsXHJcbiAgICBcIm1hc3QoZXx1ciliKDh8YWl0fGF0ZSlcIixcclxuICAgIFwibltpMV1nZz9bZTNdcltzXFwkXT9cIixcclxuICAgIFwiW28wXXJnW2FAXVtzXFwkXVtpMV1tW3NcXCRdP1wiLFxyXG4gICAgXCJbbzBdcmdbYUBdW3NcXCRdbVtzXFwkXT9cIixcclxuICAgIFwicFtlM11ubj9baTFdW3NcXCRdXCIsXHJcbiAgICBcInBbaTFdW3NcXCRdW3NcXCRdXCIsXHJcbiAgICBcInBbaTFdW3NcXCRdW3NcXCRdW28wXShwaHxmKShwaHxmKVwiLFxyXG4gICAgXCJwW28wXXJuXCIsXHJcbiAgICBcInBbbzBdcm5bbzBdW3NcXCRdP1wiLFxyXG4gICAgXCJwW28wXXJuW28wXWdyW2FAXXBoeVwiLFxyXG4gICAgXCJwcltpMV1ja1tzXFwkXT9cIixcclxuICAgIFwicHVbc1xcJF1bc1xcJF1baTFdW2UzXVtzXFwkXVwiLFxyXG4gICAgXCJwdVtzXFwkXVtzXFwkXXlbc1xcJF0/XCIsXHJcbiAgICBcIltzXFwkXVtlM114XCIsXHJcbiAgICBcIltzXFwkXWhbaTFdW3RcXCtdW3NcXCRdP1wiLFxyXG4gICAgXCJbc1xcJF1bbDFddVt0XFwrXVtzXFwkXT9cIixcclxuICAgIFwiW3NcXCRdbXVbdFxcK11bc1xcJF0/XCIsXHJcbiAgICBcIltzXFwkXXB1bmtbc1xcJF0/XCIsXHJcbiAgICBcIlt0XFwrXXdbYUBdW3RcXCtdW3NcXCRdP1wiXHJcbl1cclxuXHJcbmNvbnN0IGlzRW1wdHkgPSAoc3RyaW5nVG9DaGVjaykgPT4ge1xyXG4gICAgaWYgKHN0cmluZ1RvQ2hlY2sgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbmNvbnN0IGlzUHJvZmFuaXR5ID0gKHN0cmluZ1RvQ2hlY2spID0+IHtcclxuICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICBwcm9mYW5pdHlSZWdleEFycmF5LmZvckVhY2gocmVnZXggPT4ge1xyXG4gICAgICAgIGxldCBtYXRjaGVyID0gbmV3IFJlZ0V4cChyZWdleCk7XHJcblxyXG4gICAgICAgIGlmIChtYXRjaGVyLnRlc3Qoc3RyaW5nVG9DaGVjaykpIHtcclxuICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZsYWc7XHJcbn1cclxuXHJcbmNvbnN0IHZhbGlkYXRlID0gKC4uLmFyZykgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgZWwgPSBhcmdbaV07XHJcbiAgICAgICAgaWYgKGlzRW1wdHkoZWwpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiT25lIG9yIG1vcmUgZmllbGRzIGFyZSBlbXB0eVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzUHJvZmFuaXR5KGVsKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIk9uZSBvciBtb3JlIGZpZWxkcyBjb250YWluIHByb2Zhbml0eVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlIl19
