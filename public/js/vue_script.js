/*
function MenuItem(bn, cal, gluten, lact, ing, image){
    this.burgername = bn
    this.calories = cal + " kCal"
    this.gluten = gluten
    this.lactose = lact
    this.ingredients = ing
    this.image = image
}


/*
burgare.push(new MenuItem("The First Burger", "700", false, true, ["Peppar", "Peppar", "Salt"],"img/burger1.jpg"));
burgare.push(new MenuItem("No Bun Hun", "700", true, true, ["Peppar", "Peppar", "Peppar"],"img/burger2.jpg" ));
burgare.push(new MenuItem("Another Burger", "700", true, false, ["Salt", "Peppar", "Peppar"],"img/burger3.jpg" ));
burgare.push(new MenuItem("One more please", "700",  true, true, ["Peppar", "Salt", "Peppar"],"img/burger4.jpg"));
burgare.push(new MenuItem("Just another burger", "700", false, false, ["Peppar", "Peppar", "Peppar"], "img/burger5.jpg"));

*/

var socket = io();
var vm = new Vue({
    el: '#MyVue',
    data: {
        burgers: burgare,
        chosenburgers: [],
        fullName: "",
        mail: "",
        //street: "",
        //house: "",
        payment: "Natura",
        sex: "male",
        orderlist: " ",
        orders: {}
    },
    created: function () {
        socket.on('initialize', function (data) {
            this.orders = data.orders;
        }.bind(this));

        socket.on('currentQueue', function (data) {
            this.orders = data.orders;
        }.bind(this));
    },
    methods: {
        markDone: function () {
            this.orderlist = this.chosenburgers + this.fullName + this.mail + this.payment + +this.sex
        },
        getNext: function () {
            var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addOrder: function (event) {
            var offset = {
                x: event.currentTarget.getBoundingClientRect().left,
                y: event.currentTarget.getBoundingClientRect().top};
            socket.emit("addOrder", { orderId: this.getNext(),
                details: { x: event.clientX - 10 - offset.x,
                    y: event.clientY - 10 - offset.y },
                orderItems: ["Beans", "Curry"]
            });
        },

       // displayOrder: function () {}
    }
});


