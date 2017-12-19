"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.clear();

var _React = React,
    PureComponent = _React.PureComponent;
var _ReactMotion = ReactMotion,
    Motion = _ReactMotion.Motion,
    spring = _ReactMotion.spring;
var update = React.addons.update;


var springConfig = { stiffness: 100, damping: 10 };

var Item = function (_PureComponent) {
    _inherits(Item, _PureComponent);

    function Item(props) {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

        _this.state = {
            height: 0
        };
        return _this;
    }

    _createClass(Item, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({
                height: this.refs.item.offsetHeight + 10
            });
        }
    }, {
        key: "render",
        value: function render() {
            var height = this.state.height;
            var _props = this.props,
                data = _props.data,
                style = _props.style;
            var id = data.id,
                name = data.name;


            var transform = "translateY(" + style.y * height + "px)";
            var animation = {
                zIndex: id,
                transform: transform,
                WebkitTransform: transform
            };

            return React.createElement(
                "div",
                { ref: "item", className: "Item", style: animation },
                name
            );
        }
    }]);

    return Item;
}(PureComponent);

var List = function (_PureComponent2) {
    _inherits(List, _PureComponent2);

    function List(props) {
        _classCallCheck(this, List);

        var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        _this2.state = {
            items: [{ id: 0, name: "A" }, { id: 1, name: "B" }, { id: 2, name: "C" }, { id: 3, name: "D" }, { id: 4, name: "E" }, { id: 5, name: "F" }]
        };
        return _this2;
    }

    _createClass(List, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this3 = this;

            this.play = setInterval(function () {
                var items = _this3.state.items;

                var rule = _.shuffle(_.range(_.size(items)));
                var context = {};

                _.each(rule, function (i, key) {
                    context[key] = {
                        id: { $set: i }
                    };
                });

                _this3.setState({
                    items: update(_this3.state.items, context)
                });
            }, 1000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.play);
        }
    }, {
        key: "render",
        value: function render() {
            var items = this.state.items;


            var Items = _.map(items, function (i, key) {
                var style = {
                    y: spring(i.id, springConfig)
                };

                return React.createElement(
                    Motion,
                    { key: key, style: style },
                    function (style) {
                        return React.createElement(Item, { data: i, style: style });
                    }
                );
            });

            return React.createElement(
                "div",
                { className: "List" },
                Items
            );
        }
    }]);

    return List;
}(PureComponent);

ReactDOM.render(React.createElement(List, null), document.getElementById("app"));
//# sourceMappingURL=maps/common.js.map
