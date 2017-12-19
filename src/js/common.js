console.clear();

const { PureComponent } = React;
const { Motion, spring } = ReactMotion;
const { update } = React.addons;

const springConfig = { stiffness: 100, damping: 10 };

class Item extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        this.setState({
            height: this.refs.item.offsetHeight + 10,
        });
    }

    render() {
        const { height } = this.state;
        const { data, style } = this.props;
        const {
            id,
            name
        } = data;

        const transform = `translateY(${style.y * height}px)`;
        const animation = {
            zIndex: id,
            transform,
            WebkitTransform: transform
        };

        return (
            <div ref="item" className="Item" style={animation}>
                {name}
            </div>
        );
    }
}

class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { id: 0, name: "A" },
                { id: 1, name: "B" },
                { id: 2, name: "C" },
                { id: 3, name: "D" },
                { id: 4, name: "E" },
                { id: 5, name: "F" },
            ]
        }
    }

    componentWillMount() {
        this.play = setInterval(() => {
            const { items } = this.state;
            const rule = _.shuffle(_.range(_.size(items)));
            const context = {  };

            _.each(rule, (i, key) => {
                context[key] = {
                    id: { $set: i }
                }
            });

            this.setState({
                items: update(this.state.items, context)
            })
        }, 1000);
    }

	componentWillUnmount() {
		clearInterval(this.play);
	}

    render() {
        const { items } = this.state;

        const Items = _.map(items, (i, key) => {
            const style = {
                y: spring(i.id, springConfig)
            };

            return (
                <Motion key={key} style={style}>
                    {(style) => {
                        return (
                            <Item data={i} style={style} />
                        )
                    }}
                </Motion>
            )
        });

        return (
            <div className="List">
                {Items}
            </div>
        );
    }
}

ReactDOM.render(<List />, document.getElementById("app"));
