var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var a0={maxHeight:'calc(100vh * 0)', transition: 'all 0.5s',overflow: 'hidden'}
var a1={maxHeight:'calc(100vh * 1)', transition: 'all 1s',overflow: 'hidden'}
var Menu = React.createClass({displayName: "Menu",
    getInitialState: function() {
        return {open: this.props.open || false,items:this.props.items || []};
    },
    onClick: function(e) {
        this.setState({open: !this.state.open});
    },
    onAddClick:function(e){
        var data = prompt('輸入一些文字');
        if(data!=null){
            if(data.length!=0){                
                var newItems = this.state.items.concat([data]);
                this.setState({items: newItems,open: true});
            }else{
                alert('不能空白');
            }
        }
        e.stopPropagation();
    },
    onRemoveClick:function(index,e){
        console.log(e.target.parentElement);
        var newItems = this.state.items;
        newItems.splice(index, 1);
        this.setState({items: newItems});
        e.stopPropagation();
    },
    render: function() {
        var Nodes = null;
        var ButtonStyle = "Title "  + (this.state.open ? "active" : "");
        var NodesStyle = (this.state.open ? a1 : a0);
        if(this.state.open){
            Nodes = this.state.items.map(function (comment,index) {
                return (
                    React.createElement("div", {key: comment, className: "Item"}, 
                        comment, 
                        React.createElement("div", {className: "Remove", onClick: this.onRemoveClick.bind(this,index), title: "移除"}, "-")
                    )
                );
            }.bind(this));
        }
        var title = "點擊" + (this.state.open ? "關閉" : "展開");
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "Menu"}, 
                    React.createElement("div", {className: ButtonStyle, onClick: this.onClick, title: title}, this.props.title || "選單", React.createElement("div", {className: "Add", onClick: this.onAddClick, title: "添加"}, "+")), 
                    React.createElement("div", {style: NodesStyle}, 
                        React.createElement(ReactCSSTransitionGroup, {className: "animateExample", transitionEnterTimeout: 500, transitionLeaveTimeout: 500, transitionName: "example"}, 
                            Nodes
                        )
                    )
                )
            )
        );
    }
});
ReactDOM.render(
    React.createElement(Menu, {open: true, title: "項目選單01", items: ["項目01","項目02","項目03","項目04","項目05","項目06"]}),
    document.getElementById('example01')
);
ReactDOM.render(
    React.createElement(Menu, {open: false, title: "項目選單02", items: ["項目01","項目02","項目03"]}),
    document.getElementById('example02')
);
ReactDOM.render(
    React.createElement(Menu, {open: false, title: "項目選單03", items: ["項目01"]}),
    document.getElementById('example03')
);


