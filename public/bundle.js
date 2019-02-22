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

},{"../utilities/dataManager":6,"../utilities/printToDOM":7}],2:[function(require,module,exports){
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
      (0, _interestForm.default)().then(() => {
        interestManager.Add();
      });
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
        this.Add();
      });
    });
  }

};
var _default = interestManager;
exports.default = _default;

},{"../utilities/dataManager":6,"../utilities/validation":8,"./interestForm":1,"./interestsList":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dataManager = _interopRequireDefault(require("../utilities/dataManager"));

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

var _interestHtml = _interopRequireDefault(require("./interestHtml"));

var _interestManager = _interopRequireDefault(require("./interestManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const interestList = () => {
  document.querySelector("#int_list").innerHTML = "";
  (0, _printToDOM.default)("Interests - All", "#heading");

  _dataManager.default.Get("interests?_expand=place").then(interestArray => {
    interestArray.forEach(interest => {
      (0, _printToDOM.default)((0, _interestHtml.default)(interest), "#int_list");
    }); //printToDOM(`<button id="AddNewInterest">Add New Interest</button>`, "#int_list")

    document.querySelector("AddNewInterest").textContent = "Add New Interest";

    _interestManager.default.clickEL();

    _interestManager.default.Add();
  });
};

var _default = interestList;
exports.default = _default;

},{"../utilities/dataManager":6,"../utilities/printToDOM":7,"./interestHtml":2,"./interestManager":3}],5:[function(require,module,exports){
"use strict";

var _interestsList = _interopRequireDefault(require("./interests/interestsList"));

var _interestForm = _interopRequireDefault(require("./interests/interestForm"));

var _interestManager = _interopRequireDefault(require("./interests/interestManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _interestsList.default)();

},{"./interests/interestForm":1,"./interests/interestManager":3,"./interests/interestsList":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdEZvcm0uanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdEh0bWwuanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdE1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2ludGVyZXN0cy9pbnRlcmVzdHNMaXN0LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvZGF0YU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9wcmludFRvRE9NLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvdmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUVBLE1BQU0sWUFBWSxHQUFHLE1BQU07QUFDdkIsU0FBTyxxQkFBWSxHQUFaLENBQWdCLFFBQWhCLEVBQ0YsSUFERSxDQUNHLE1BQU0sSUFBSTtBQUNaLFFBQUksSUFBSSxHQUFJO21DQUFaO0FBRUEsSUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLEtBQUssSUFBSTtBQUNwQixNQUFBLElBQUksSUFBSyxtQkFBa0IsS0FBSyxDQUFDLEVBQUcsS0FBSSxLQUFLLENBQUMsSUFBSyxXQUFuRDtBQUNILEtBRkQ7QUFHQSxJQUFBLElBQUksSUFBSzs7Ozs7YUFBVDtBQU1BLDZCQUFXLElBQVgsRUFBZ0IsV0FBaEI7QUFDRixHQWRDLENBQVA7QUFlSCxDQWhCRDs7ZUFrQmUsWTs7Ozs7Ozs7Ozs7QUNyQmYsTUFBTSxZQUFZLEdBQUksR0FBRCxJQUFTO0FBQzFCLFNBQVE7Z0RBQ29DLEdBQUcsQ0FBQyxLQUFKLENBQVUsSUFBSztzQ0FDekIsR0FBRyxDQUFDLElBQUs7NkNBQ0YsR0FBRyxDQUFDLFdBQVk7MEJBQ25DLEdBQUcsQ0FBQyxFQUFHOzRCQUNMLEdBQUcsQ0FBQyxFQUFHOztLQUwvQjtBQVFILENBVEQ7O2VBV2UsWTs7Ozs7Ozs7Ozs7QUNYZjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7O0FBRUEsTUFBTSxVQUFVLEdBQUcsTUFBTTtBQUNyQixTQUFPO0FBQ0gsZUFBVyxDQUFDLENBQUMsVUFBRCxDQUFELENBQWMsS0FEdEI7QUFFSCxZQUFRLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUZuQjtBQUdILG1CQUFlLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYztBQUgxQixHQUFQO0FBS0gsQ0FORDs7QUFTQSxNQUFNLGtCQUFrQixHQUFHLE1BQU07QUFDN0I7QUFDQSxNQUFJLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCLFdBQXJCLEtBQXFDLFFBQXpDLEVBQW1EO0FBQy9DLFFBQUksR0FBRyxHQUFHLFVBQVUsRUFBcEI7O0FBQ0EsUUFBSSx5QkFBUyxHQUFHLENBQUMsUUFBYixFQUF1QixHQUFHLENBQUMsY0FBM0IsQ0FBSixFQUFnRDtBQUM1QywyQkFBWSxJQUFaLENBQWlCLFdBQWpCLEVBQThCLFVBQVUsRUFBeEMsRUFBNEMsSUFBNUMsQ0FBaUQsc0JBQWpEO0FBQ0g7QUFDSixHQUxELE1BS087QUFDSDtBQUNBLFFBQUksQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUIsV0FBckIsS0FBcUMsUUFBekMsRUFBbUQ7QUFDL0MsVUFBSSxHQUFHLEdBQUcsVUFBVSxFQUFwQjtBQUNBLE1BQUEsR0FBRyxDQUFDLEVBQUosR0FBUyxDQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQixTQUFyQixDQUErQixLQUF4Qzs7QUFDQSwyQkFBWSxHQUFaLENBQWlCLGFBQVksR0FBRyxDQUFDLEVBQUcsRUFBcEMsRUFBdUMsR0FBdkMsRUFDSyxJQURMLENBQ1Usc0JBRFY7QUFFSCxLQUxELE1BTUs7QUFDRDtBQUNBLE1BQUEsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLFNBQWYsR0FBMkIsRUFBM0I7QUFDQSxtQ0FBZSxJQUFmLENBQW9CLE1BQU07QUFDdEIsUUFBQSxlQUFlLENBQUMsR0FBaEI7QUFDSCxPQUZEO0FBR0g7QUFFSjtBQUNKLENBeEJEOztBQTBCQSxNQUFNLGVBQWUsR0FBRztBQUNwQixFQUFBLE9BQU8sR0FBRztBQUNOLElBQUEsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQ0ksS0FBSyxJQUFJO0FBQ0wsVUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsVUFBaEIsQ0FBMkIsVUFBM0IsQ0FBSixFQUNJLEtBQUssTUFBTCxDQUFZLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUFaLEVBREosS0FFSyxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixVQUFoQixDQUEyQixRQUEzQixDQUFKLEVBQ0QsS0FBSyxJQUFMLENBQVUsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQVY7QUFDUCxLQU5MO0FBT0gsR0FUbUI7O0FBVXBCLEVBQUEsR0FBRyxHQUFHO0FBQ0YsSUFBQSxDQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQixnQkFBckIsQ0FBc0MsT0FBdEMsRUFDSSxNQUFNO0FBQ0YsTUFBQSxrQkFBa0I7QUFDckIsS0FITDtBQUlILEdBZm1COztBQWdCcEIsRUFBQSxNQUFNLENBQUMsRUFBRCxFQUFLO0FBQ1AsUUFBSSxNQUFNLENBQUMsT0FBUCxDQUFlLG1CQUFmLENBQUosRUFDSSxxQkFBWSxNQUFaLENBQW9CLGFBQVksRUFBRyxFQUFuQyxFQUFzQyxJQUF0QyxDQUEyQyxzQkFBM0M7QUFDUCxHQW5CbUI7O0FBb0JwQixFQUFBLElBQUksQ0FBQyxFQUFELEVBQUs7QUFDTCx5QkFBWSxHQUFaLENBQWlCLGFBQVksRUFBRyxFQUFoQyxFQUFtQyxJQUFuQyxDQUNLLEdBQUQsSUFBUztBQUNMLE1BQUEsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLFNBQWYsR0FBMkIsRUFBM0I7QUFDQSxtQ0FBZSxJQUFmLENBQW9CLE1BQU07QUFDdEIsUUFBQSxDQUFDLENBQUMsVUFBRCxDQUFELENBQWMsS0FBZCxHQUFzQixHQUFHLENBQUMsSUFBMUI7QUFDQSxRQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUFkLEdBQXNCLEdBQUcsQ0FBQyxXQUExQjtBQUNBLFFBQUEsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUIsV0FBckIsR0FBbUMsUUFBbkM7QUFDQSxRQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUFkLEdBQXNCLEdBQUcsQ0FBQyxPQUExQjtBQUNBLFFBQUEsQ0FBQyxDQUFDLFVBQUQsQ0FBRCxDQUFjLE9BQWQsR0FBd0IsS0FBeEI7QUFDQSxRQUFBLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCLFNBQXJCLEdBQWlDLEdBQUcsQ0FBQyxFQUFyQztBQUNBLGFBQUssR0FBTDtBQUNILE9BUkQ7QUFVSCxLQWJMO0FBZUg7O0FBcENtQixDQUF4QjtlQXVDZSxlOzs7Ozs7Ozs7OztBQ2pGZjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sWUFBWSxHQUFHLE1BQU07QUFDdkIsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxTQUFwQyxHQUErQyxFQUEvQztBQUNBLDJCQUFXLGlCQUFYLEVBQThCLFVBQTlCOztBQUNBLHVCQUFZLEdBQVosQ0FBZ0IseUJBQWhCLEVBQ0ssSUFETCxDQUVRLGFBQWEsSUFBSTtBQUNiLElBQUEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsUUFBUSxJQUFJO0FBQzlCLCtCQUFXLDJCQUFhLFFBQWIsQ0FBWCxFQUFtQyxXQUFuQztBQUNILEtBRkQsRUFEYSxDQUliOztBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLFdBQXpDLEdBQXVELGtCQUF2RDs7QUFDQSw2QkFBZ0IsT0FBaEI7O0FBQ0EsNkJBQWdCLEdBQWhCO0FBQ0gsR0FWVDtBQWFILENBaEJEOztlQWtCZSxZOzs7Ozs7QUN2QmY7O0FBQ0E7O0FBQ0E7Ozs7QUFHQTs7Ozs7Ozs7O0FDTEEsTUFBTSxXQUFXLEdBQUc7QUFDaEIsRUFBQSxHQUFHLENBQUUsUUFBRixFQUFZO0FBQ1gsV0FBTyxLQUFLLENBQUUseUJBQXdCLFFBQVMsRUFBbkMsQ0FBTCxDQUNGLElBREUsQ0FDRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosRUFEVixDQUFQO0FBRUgsR0FKZTs7QUFLaEIsRUFBQSxJQUFJLENBQUUsUUFBRixFQUFZLEdBQVosRUFBaUI7QUFDakIsV0FBTyxLQUFLLENBQUUseUJBQXdCLFFBQVMsRUFBbkMsRUFBc0M7QUFDOUMsTUFBQSxNQUFNLEVBQUUsTUFEc0M7QUFFOUMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZxQztBQUs5QyxNQUFBLElBQUksRUFBRyxJQUFJLENBQUMsU0FBTCxDQUFlLEdBQWY7QUFMdUMsS0FBdEMsQ0FBTCxDQU9OLElBUE0sQ0FPRCxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosRUFQTixDQUFQO0FBUUgsR0FkZTs7QUFlaEIsRUFBQSxHQUFHLENBQUUsUUFBRixFQUFZLEdBQVosRUFBaUI7QUFDaEIsV0FBTyxLQUFLLENBQUUseUJBQXdCLFFBQVMsRUFBbkMsRUFBc0M7QUFDOUMsTUFBQSxNQUFNLEVBQUUsS0FEc0M7QUFFOUMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZxQztBQUs5QyxNQUFBLElBQUksRUFBRyxJQUFJLENBQUMsU0FBTCxDQUFlLEdBQWY7QUFMdUMsS0FBdEMsQ0FBTCxDQU9OLElBUE0sQ0FPRCxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosRUFQTixDQUFQO0FBUUgsR0F4QmU7O0FBeUJoQixFQUFBLE1BQU0sQ0FBRSxRQUFGLEVBQVk7QUFDZCxXQUFPLEtBQUssQ0FBRSx5QkFBd0IsUUFBUyxFQUFuQyxFQUFxQztBQUM3QyxNQUFBLE1BQU0sRUFBRztBQURvQyxLQUFyQyxDQUFMLENBR04sSUFITSxDQUdELEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQUhOLENBQVA7QUFJSDs7QUE5QmUsQ0FBcEI7ZUFrQ2UsVzs7Ozs7Ozs7Ozs7QUNsQ2YsTUFBTSxVQUFVLEdBQUcsQ0FBQyxVQUFELEVBQWEsT0FBYixLQUF5QjtBQUN4QyxTQUFPLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLElBQTZDLFVBQXBEO0FBQ0gsQ0FGRDs7ZUFJZSxVOzs7Ozs7Ozs7O0FDSmYsSUFBSSxtQkFBbUIsR0FBRyxDQUN0QixrQkFEc0IsRUFFdEIsbUNBRnNCLEVBR3RCLHVCQUhzQixFQUl0QiwrQ0FKc0IsRUFLdEIsdUNBTHNCLEVBTXRCLDBDQU5zQixFQU90QixvQkFQc0IsRUFRdEIseUJBUnNCLEVBU3RCLHVCQVRzQixFQVV0QixxQkFWc0IsRUFXdEIsd0JBWHNCLEVBWXRCLGdCQVpzQixFQWF0QixrQ0Fic0IsRUFjdEIsZ0NBZHNCLEVBZXRCLCtDQWZzQixFQWdCdEIsK0NBaEJzQixFQWlCdEIsZ0RBakJzQixFQWtCdEIsK0NBbEJzQixFQW1CdEIsYUFuQnNCLEVBb0J0QixhQXBCc0IsRUFxQnRCLGlCQXJCc0IsRUFzQnRCLDZCQXRCc0IsRUF1QnRCLGtDQXZCc0IsRUF3QnRCLHNDQXhCc0IsRUF5QnRCLG1DQXpCc0IsRUEwQnRCLHlCQTFCc0IsRUEyQnRCLHFDQTNCc0IsRUE0QnRCLDBDQTVCc0IsRUE2QnRCLDJDQTdCc0IsRUE4QnRCLDJCQTlCc0IsRUErQnRCLFNBL0JzQixFQWdDdEIsU0FoQ3NCLEVBaUN0QixnQkFqQ3NCLEVBa0N0QixxQkFsQ3NCLEVBbUN0QixrQkFuQ3NCLEVBb0N0Qix1QkFwQ3NCLEVBcUN0QixpQkFyQ3NCLEVBc0N0QixtQkF0Q3NCLEVBdUN0QixvQkF2Q3NCLEVBd0N0Qiw4QkF4Q3NCLEVBeUN0QixtQkF6Q3NCLEVBMEN0QixzQ0ExQ3NCLEVBMkN0QixtQkEzQ3NCLEVBNEN0Qix5QkE1Q3NCLEVBNkN0QixzQkE3Q3NCLEVBOEN0QixxQkE5Q3NCLEVBK0N0QixRQS9Dc0IsRUFnRHRCLGNBaERzQixFQWlEdEIsVUFqRHNCLEVBa0R0QixxQ0FsRHNCLEVBbUR0Qiw2QkFuRHNCLEVBb0R0QixzQkFwRHNCLEVBcUR0QixvQkFyRHNCLEVBc0R0Qix3QkF0RHNCLEVBdUR0QixxQkF2RHNCLEVBd0R0Qiw0QkF4RHNCLEVBeUR0Qix3QkF6RHNCLEVBMER0QixtQkExRHNCLEVBMkR0QixpQkEzRHNCLEVBNER0QixpQ0E1RHNCLEVBNkR0QixTQTdEc0IsRUE4RHRCLG1CQTlEc0IsRUErRHRCLHNCQS9Ec0IsRUFnRXRCLGdCQWhFc0IsRUFpRXRCLDJCQWpFc0IsRUFrRXRCLHFCQWxFc0IsRUFtRXRCLFlBbkVzQixFQW9FdEIsdUJBcEVzQixFQXFFdEIsdUJBckVzQixFQXNFdEIsb0JBdEVzQixFQXVFdEIsaUJBdkVzQixFQXdFdEIsdUJBeEVzQixDQUExQjs7QUEyRUEsTUFBTSxPQUFPLEdBQUksYUFBRCxJQUFtQjtBQUMvQixNQUFJLGFBQWEsS0FBSyxFQUF0QixFQUEwQjtBQUN0QixXQUFPLElBQVA7QUFDSDs7QUFDRCxTQUFPLEtBQVA7QUFDSCxDQUxEOztBQU9BLE1BQU0sV0FBVyxHQUFJLGFBQUQsSUFBbUI7QUFDbkMsTUFBSSxJQUFJLEdBQUcsS0FBWDtBQUNBLEVBQUEsbUJBQW1CLENBQUMsT0FBcEIsQ0FBNEIsS0FBSyxJQUFJO0FBQ2pDLFFBQUksT0FBTyxHQUFHLElBQUksTUFBSixDQUFXLEtBQVgsQ0FBZDs7QUFFQSxRQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsYUFBYixDQUFKLEVBQWlDO0FBQzdCLE1BQUEsSUFBSSxHQUFHLElBQVA7QUFDQSxhQUFPLElBQVA7QUFDSDtBQUNKLEdBUEQ7QUFRQSxTQUFPLElBQVA7QUFDSCxDQVhEOztBQWFBLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFKLEtBQVk7QUFDekIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBeEIsRUFBZ0MsQ0FBQyxFQUFqQyxFQUFxQztBQUNqQyxRQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRCxDQUFaOztBQUNBLFFBQUksT0FBTyxDQUFDLEVBQUQsQ0FBWCxFQUFpQjtBQUNiLE1BQUEsS0FBSyxDQUFDLDhCQUFELENBQUw7QUFDQSxhQUFPLEtBQVA7QUFDSCxLQUhELE1BSUssSUFBSSxXQUFXLENBQUMsRUFBRCxDQUFmLEVBQXFCO0FBQ3RCLE1BQUEsS0FBSyxDQUFDLHNDQUFELENBQUw7QUFDQSxhQUFPLEtBQVA7QUFDSDtBQUNMOztBQUNBLFNBQU8sSUFBUDtBQUNILENBYkQ7O2VBY2UsUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBEYXRhTWFuYWdlciBmcm9tIFwiLi4vdXRpbGl0aWVzL2RhdGFNYW5hZ2VyXCI7XHJcbmltcG9ydCBwcmludFRvRE9NIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiO1xyXG5cclxuY29uc3QgaW50ZXJlc3RGb3JtID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIERhdGFNYW5hZ2VyLkdldChcInBsYWNlc1wiKVxyXG4gICAgICAgIC50aGVuKHBsYWNlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gYDxsYWJlbCBmb3I9XCJwbGFjZUlkXCI+PHN0cm9uZz5TZWxlY3QgTG9jYXRpb24gOiA8L3N0cm9uZz4gPC9sYWJlbD5cclxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cInBsYWNlSWRcIj4gYFxyXG4gICAgICAgICAgICBwbGFjZXMuZm9yRWFjaChwbGFjZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8b3B0aW9uIHZhbHVlID0gJHtwbGFjZS5pZH0+ICR7cGxhY2UubmFtZX08L29wdGlvbj5gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBodG1sICs9IGA8L3NlbGVjdD4gPC9icj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImludE5hbWVcIj48c3Ryb25nPiBOYW1lIDogPC9zdHJvbmc+IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpbnROYW1lXCIgaWQ9XCJpbnROYW1lXCI+PC9pbnB1dD48L2JyPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiaW50RGVzY1wiPjxzdHJvbmc+IERlc2NyaXB0aW9uIDogPC9zdHJvbmc+IDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBuYW1lPVwiaW50RGVzY1wiIGlkPVwiaW50RGVzY1wiIGNvbHM9XCIzMFwiIHJvd3M9XCI1XCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICBwcmludFRvRE9NKGh0bWwsXCIjaW50X2xpc3RcIilcclxuICAgICAgICAgfSApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGludGVyZXN0Rm9ybSIsImNvbnN0IGludGVyZXN0SHRtbCA9IChvYmopID0+IHtcclxuICAgIHJldHVybiBgPHNlY3Rpb24gY2xhc3MgPSBcImNhcmRcIj5cclxuICAgIDxkaXYgY2xhc3MgPSBcInBsYWNlTmFtZVwiPjxzdHJvbmc+IFBsYWNlIDogJHtvYmoucGxhY2UubmFtZX0gPC9zdHJvbmc+IDwvZGl2PlxyXG4gICAgPGRpdj48c3Ryb25nPiAgTmFtZSA6IDwvc3Ryb25nPiAke29iai5uYW1lfSA8L2Rpdj5cclxuICAgIDxkaXY+PHN0cm9uZz4gIERlc2NyaXB0aW9uIDogPC9zdHJvbmc+ICR7b2JqLmRlc2NyaXB0aW9ufTwvZGl2PlxyXG4gICAgPGJ1dHRvbiBpZCA9IFwiZWRpdC0tJHtvYmouaWR9XCIgdHlwZT1cInN1Ym1pdFwiPkVESVQ8L2J1dHRvbj5cclxuICAgIDxidXR0b24gaWQgPSBcImRlbGV0ZS0tJHtvYmouaWR9XCIgdHlwZT1cInN1Ym1pdFwiPkRFTEVURTwvYnV0dG9uPlxyXG4gICAgPC9zZWN0aW9uPiA8aHIvPlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbnRlcmVzdEh0bWwiLCJpbXBvcnQgRGF0YU1hbmFnZXIgZnJvbSBcIi4uL3V0aWxpdGllcy9kYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgaW50ZXJlc3RMaXN0IGZyb20gXCIuL2ludGVyZXN0c0xpc3RcIjtcclxuaW1wb3J0IGludGVyZXN0Rm9ybSBmcm9tIFwiLi9pbnRlcmVzdEZvcm1cIjtcclxuaW1wb3J0IHZhbGlkYXRlIGZyb20gXCIuLi91dGlsaXRpZXMvdmFsaWRhdGlvblwiO1xyXG5cclxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcclxuXHJcbmNvbnN0IG1ha2VPYmplY3QgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFwicGxhY2VJZFwiOiAkKFwiI3BsYWNlSWRcIikudmFsdWUsXHJcbiAgICAgICAgXCJuYW1lXCI6ICQoXCIjaW50TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6ICQoXCIjaW50RGVzY1wiKS52YWx1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY29uc3Qgc3VibWl0QnV0dG9uU3RhdHVzID0gKCkgPT4ge1xyXG4gICAgLy9zdWJtaXQgYnV0dG9uXHJcbiAgICBpZiAoJChcIiNBZGROZXdJbnRlcmVzdFwiKS50ZXh0Q29udGVudCA9PT0gXCJTdWJtaXRcIikge1xyXG4gICAgICAgIGxldCBvYmogPSBtYWtlT2JqZWN0KClcclxuICAgICAgICBpZiAodmFsaWRhdGUob2JqLnRhc2tOYW1lLCBvYmouY29tcGxldGlvbkRhdGUpKSB7XHJcbiAgICAgICAgICAgIERhdGFNYW5hZ2VyLlBvc3QoXCJpbnRlcmVzdHNcIiwgbWFrZU9iamVjdCgpKS50aGVuKGludGVyZXN0TGlzdClcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vdXBkYXRlIC0tIGFmdGVyIGVkaXRcclxuICAgICAgICBpZiAoJChcIiNBZGROZXdJbnRlcmVzdFwiKS50ZXh0Q29udGVudCA9PT0gXCJVcGRhdGVcIikge1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbWFrZU9iamVjdCgpXHJcbiAgICAgICAgICAgIG9iai5pZCA9ICQoXCIjQWRkTmV3SW50ZXJlc3RcIikuY2xhc3NMaXN0LnZhbHVlXHJcbiAgICAgICAgICAgIERhdGFNYW5hZ2VyLlB1dChgaW50ZXJlc3RzLyR7b2JqLmlkfWAsIG9iailcclxuICAgICAgICAgICAgICAgIC50aGVuKGludGVyZXN0TGlzdClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vYWRkaW5nIG5ldyBmb3JtXHJcbiAgICAgICAgICAgICQoXCIjaW50X2xpc3RcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICBpbnRlcmVzdEZvcm0oKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGludGVyZXN0TWFuYWdlci5BZGQoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGludGVyZXN0TWFuYWdlciA9IHtcclxuICAgIGNsaWNrRUwoKSB7XHJcbiAgICAgICAgJChcIiNpbnRfbGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixcclxuICAgICAgICAgICAgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiZGVsZXRlLS1cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5EZWxldGUoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aChcImVkaXQtLVwiKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkVkaXQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgQWRkKCkge1xyXG4gICAgICAgICQoXCIjQWRkTmV3SW50ZXJlc3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvblN0YXR1cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgRGVsZXRlKGlkKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5jb25maXJtKFwiREVMRVRFIGludGVyZXN0ID9cIikpXHJcbiAgICAgICAgICAgIERhdGFNYW5hZ2VyLkRlbGV0ZShgaW50ZXJlc3RzLyR7aWR9YCkudGhlbihpbnRlcmVzdExpc3QpXHJcbiAgICB9LFxyXG4gICAgRWRpdChpZCkge1xyXG4gICAgICAgIERhdGFNYW5hZ2VyLkdldChgaW50ZXJlc3RzLyR7aWR9YCkudGhlbihcclxuICAgICAgICAgICAgKG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChcIiNpbnRfbGlzdFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBpbnRlcmVzdEZvcm0oKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2ludE5hbWVcIikudmFsdWUgPSBvYmoubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW50RGVzY1wiKS52YWx1ZSA9IG9iai5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjQWRkTmV3SW50ZXJlc3RcIikudGV4dENvbnRlbnQgPSBcIlVwZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwbGFjZUlkXCIpLnZhbHVlID0gb2JqLnBsYWNlSWRcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3BsYWNlSWRcIikuZW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNBZGROZXdJbnRlcmVzdFwiKS5jbGFzc0xpc3QgPSBvYmouaWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFkZCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJlc3RNYW5hZ2VyIiwiaW1wb3J0IERhdGFNYW5hZ2VyIGZyb20gXCIuLi91dGlsaXRpZXMvZGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XHJcbmltcG9ydCBpbnRlcmVzdEh0bWwgZnJvbSBcIi4vaW50ZXJlc3RIdG1sXCI7XHJcbmltcG9ydCBpbnRlcmVzdE1hbmFnZXIgZnJvbSBcIi4vaW50ZXJlc3RNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCBpbnRlcmVzdExpc3QgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ludF9saXN0XCIpLmlubmVySFRNTCA9XCJcIlxyXG4gICAgcHJpbnRUb0RPTShcIkludGVyZXN0cyAtIEFsbFwiLCBcIiNoZWFkaW5nXCIpXHJcbiAgICBEYXRhTWFuYWdlci5HZXQoXCJpbnRlcmVzdHM/X2V4cGFuZD1wbGFjZVwiKVxyXG4gICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICBpbnRlcmVzdEFycmF5ID0+IHtcclxuICAgICAgICAgICAgICAgIGludGVyZXN0QXJyYXkuZm9yRWFjaChpbnRlcmVzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRUb0RPTShpbnRlcmVzdEh0bWwoaW50ZXJlc3QpLCBcIiNpbnRfbGlzdFwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL3ByaW50VG9ET00oYDxidXR0b24gaWQ9XCJBZGROZXdJbnRlcmVzdFwiPkFkZCBOZXcgSW50ZXJlc3Q8L2J1dHRvbj5gLCBcIiNpbnRfbGlzdFwiKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIkFkZE5ld0ludGVyZXN0XCIpLnRleHRDb250ZW50ID0gXCJBZGQgTmV3IEludGVyZXN0XCJcclxuICAgICAgICAgICAgICAgIGludGVyZXN0TWFuYWdlci5jbGlja0VMKClcclxuICAgICAgICAgICAgICAgIGludGVyZXN0TWFuYWdlci5BZGQoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJlc3RMaXN0IiwiaW1wb3J0IGludGVyZXN0TGlzdCBmcm9tIFwiLi9pbnRlcmVzdHMvaW50ZXJlc3RzTGlzdFwiO1xyXG5pbXBvcnQgaW50ZXJlc3RGb3JtIGZyb20gXCIuL2ludGVyZXN0cy9pbnRlcmVzdEZvcm1cIjtcclxuaW1wb3J0IGludGVyZXN0TWFuYWdlciBmcm9tIFwiLi9pbnRlcmVzdHMvaW50ZXJlc3RNYW5hZ2VyXCI7XHJcblxyXG5cclxuaW50ZXJlc3RMaXN0KClcclxuXHJcbiIsImNvbnN0IERhdGFNYW5hZ2VyID0ge1xyXG4gICAgR2V0IChkYlN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJTdHJpbmd9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgUG9zdCAoZGJTdHJpbmcsIG9iaikge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJTdHJpbmd9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL0pTT05cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5IDogSlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgUHV0IChkYlN0cmluZywgb2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYlN0cmluZ31gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9KU09OXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keSA6IEpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIERlbGV0ZSAoZGJTdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiU3RyaW5nfWAse1xyXG4gICAgICAgICAgICBtZXRob2QgOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGFNYW5hZ2VyIiwiY29uc3QgcHJpbnRUb0RPTSA9IChIdG1sc3RyaW5nLCBlbGVtZW50KSA9PiB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KS5pbm5lckhUTUwgKz0gSHRtbHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRE9NIiwibGV0IHByb2Zhbml0eVJlZ2V4QXJyYXkgPSBbXHJcbiAgICBcIl5bYUBdW3NcXCRdW3NcXCRdJFwiLFxyXG4gICAgXCJbYUBdW3NcXCRdW3NcXCRdaFtvMF1bbDFdW2UzXVtzXFwkXT9cIixcclxuICAgIFwiYlthQF1bc1xcJF1bdFxcK11bYUBdcmRcIixcclxuICAgIFwiYltlM11bYUBdW3NcXCRdW3RcXCtdW2kxXVthQF0/W2wxXShbaTFdW3RcXCtdeSk/XCIsXHJcbiAgICBcImJbZTNdW2FAXVtzXFwkXVt0XFwrXVtpMV1bbDFdW2kxXVt0XFwrXXlcIixcclxuICAgIFwiYltlM11bc1xcJF1bdFxcK11baTFdW2FAXVtsMV0oW2kxXVt0XFwrXXkpP1wiLFxyXG4gICAgXCJiW2kxXVt0XFwrXWNoW3NcXCRdP1wiLFxyXG4gICAgXCJiW2kxXVt0XFwrXWNoW2UzXXJbc1xcJF0/XCIsXHJcbiAgICBcImJbaTFdW3RcXCtdY2hbZTNdW3NcXCRdXCIsXHJcbiAgICBcImJbaTFdW3RcXCtdY2hbaTFdbmc/XCIsXHJcbiAgICBcImJbbDFdW28wXXdqW28wXWJbc1xcJF0/XCIsXHJcbiAgICBcImNbbDFdW2kxXVt0XFwrXVwiLFxyXG4gICAgXCJeKGN8a3xja3xxKVtvMF0oY3xrfGNrfHEpW3NcXCRdPyRcIixcclxuICAgIFwiKGN8a3xja3xxKVtvMF0oY3xrfGNrfHEpW3NcXCRddVwiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11KGN8a3xja3xxKVtlM11kXCIsXHJcbiAgICBcIihjfGt8Y2t8cSlbbzBdKGN8a3xja3xxKVtzXFwkXXUoY3xrfGNrfHEpW2UzXXJcIixcclxuICAgIFwiKGN8a3xja3xxKVtvMF0oY3xrfGNrfHEpW3NcXCRddShjfGt8Y2t8cSlbaTFdbmdcIixcclxuICAgIFwiKGN8a3xja3xxKVtvMF0oY3xrfGNrfHEpW3NcXCRddShjfGt8Y2t8cSlbc1xcJF1cIixcclxuICAgIFwiXmN1bVtzXFwkXT8kXCIsXHJcbiAgICBcImN1bW0/P1tlM11yXCIsXHJcbiAgICBcImN1bW0/W2kxXW5nY29ja1wiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW1bc1xcJF1oW28wXVt0XFwrXVwiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5baTFdW2wxXVtpMV1uZ3Vbc1xcJF1cIixcclxuICAgIFwiKGN8a3xja3xxKXVuW2kxXVtsMV1bbDFdW2kxXW5ndVtzXFwkXVwiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5uW2kxXVtsMV1baTFdbmd1W3NcXCRdXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1blt0XFwrXVtzXFwkXT9cIixcclxuICAgIFwiKGN8a3xja3xxKXVuW3RcXCtdW2wxXVtpMV0oY3xrfGNrfHEpXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1blt0XFwrXVtsMV1baTFdKGN8a3xja3xxKVtlM11yXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1blt0XFwrXVtsMV1baTFdKGN8a3xja3xxKVtpMV1uZ1wiLFxyXG4gICAgXCJjeWJbZTNdcihwaHxmKXUoY3xrfGNrfHEpXCIsXHJcbiAgICBcImRbYUBdbW5cIixcclxuICAgIFwiZFtpMV1ja1wiLFxyXG4gICAgXCJkW2kxXVtsMV1kW28wXVwiLFxyXG4gICAgXCJkW2kxXVtsMV1kW28wXVtzXFwkXVwiLFxyXG4gICAgXCJkW2kxXW4oY3xrfGNrfHEpXCIsXHJcbiAgICBcImRbaTFdbihjfGt8Y2t8cSlbc1xcJF1cIixcclxuICAgIFwiW2UzXWpbYUBdY3VbbDFdXCIsXHJcbiAgICBcIihwaHxmKVthQF1nW3NcXCRdP1wiLFxyXG4gICAgXCIocGh8ZilbYUBdZ2dbaTFdbmdcIixcclxuICAgIFwiKHBofGYpW2FAXWdnP1tvMF1bdFxcK11bc1xcJF0/XCIsXHJcbiAgICBcIihwaHxmKVthQF1nZ1tzXFwkXVwiLFxyXG4gICAgXCIocGh8ZilbZTNdW2wxXVtsMV0/W2FAXVt0XFwrXVtpMV1bbzBdXCIsXHJcbiAgICBcIihwaHxmKXUoY3xrfGNrfHEpXCIsXHJcbiAgICBcIihwaHxmKXUoY3xrfGNrfHEpW3NcXCRdP1wiLFxyXG4gICAgXCJnW2FAXW5nYlthQF1uZ1tzXFwkXT9cIixcclxuICAgIFwiZ1thQF1uZ2JbYUBdbmdbZTNdZFwiLFxyXG4gICAgXCJnW2FAXXlcIixcclxuICAgIFwiaFtvMF1tP21bbzBdXCIsXHJcbiAgICBcImhbbzBdcm55XCIsXHJcbiAgICBcImpbYUBdKGN8a3xja3xxKVxcLT9bbzBdKHBofGYpKHBofGYpP1wiLFxyXG4gICAgXCJqW2UzXXJrXFwtP1tvMF0ocGh8ZikocGh8Zik/XCIsXHJcbiAgICBcImpbaTFdW3NcXCR6XVtzXFwkel0/bT9cIixcclxuICAgIFwiW2NrXVtvMF1uZHVtW3NcXCRdP1wiLFxyXG4gICAgXCJtYXN0KGV8dXIpYig4fGFpdHxhdGUpXCIsXHJcbiAgICBcIm5baTFdZ2c/W2UzXXJbc1xcJF0/XCIsXHJcbiAgICBcIltvMF1yZ1thQF1bc1xcJF1baTFdbVtzXFwkXT9cIixcclxuICAgIFwiW28wXXJnW2FAXVtzXFwkXW1bc1xcJF0/XCIsXHJcbiAgICBcInBbZTNdbm4/W2kxXVtzXFwkXVwiLFxyXG4gICAgXCJwW2kxXVtzXFwkXVtzXFwkXVwiLFxyXG4gICAgXCJwW2kxXVtzXFwkXVtzXFwkXVtvMF0ocGh8ZikocGh8ZilcIixcclxuICAgIFwicFtvMF1yblwiLFxyXG4gICAgXCJwW28wXXJuW28wXVtzXFwkXT9cIixcclxuICAgIFwicFtvMF1ybltvMF1nclthQF1waHlcIixcclxuICAgIFwicHJbaTFdY2tbc1xcJF0/XCIsXHJcbiAgICBcInB1W3NcXCRdW3NcXCRdW2kxXVtlM11bc1xcJF1cIixcclxuICAgIFwicHVbc1xcJF1bc1xcJF15W3NcXCRdP1wiLFxyXG4gICAgXCJbc1xcJF1bZTNdeFwiLFxyXG4gICAgXCJbc1xcJF1oW2kxXVt0XFwrXVtzXFwkXT9cIixcclxuICAgIFwiW3NcXCRdW2wxXXVbdFxcK11bc1xcJF0/XCIsXHJcbiAgICBcIltzXFwkXW11W3RcXCtdW3NcXCRdP1wiLFxyXG4gICAgXCJbc1xcJF1wdW5rW3NcXCRdP1wiLFxyXG4gICAgXCJbdFxcK113W2FAXVt0XFwrXVtzXFwkXT9cIlxyXG5dXHJcblxyXG5jb25zdCBpc0VtcHR5ID0gKHN0cmluZ1RvQ2hlY2spID0+IHtcclxuICAgIGlmIChzdHJpbmdUb0NoZWNrID09PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5jb25zdCBpc1Byb2Zhbml0eSA9IChzdHJpbmdUb0NoZWNrKSA9PiB7XHJcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgcHJvZmFuaXR5UmVnZXhBcnJheS5mb3JFYWNoKHJlZ2V4ID0+IHtcclxuICAgICAgICBsZXQgbWF0Y2hlciA9IG5ldyBSZWdFeHAocmVnZXgpO1xyXG5cclxuICAgICAgICBpZiAobWF0Y2hlci50ZXN0KHN0cmluZ1RvQ2hlY2spKSB7XHJcbiAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmbGFnO1xyXG59XHJcblxyXG5jb25zdCB2YWxpZGF0ZSA9ICguLi5hcmcpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGVsID0gYXJnW2ldO1xyXG4gICAgICAgIGlmIChpc0VtcHR5KGVsKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIk9uZSBvciBtb3JlIGZpZWxkcyBhcmUgZW1wdHlcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpc1Byb2Zhbml0eShlbCkpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJPbmUgb3IgbW9yZSBmaWVsZHMgY29udGFpbiBwcm9mYW5pdHlcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZSJdfQ==
