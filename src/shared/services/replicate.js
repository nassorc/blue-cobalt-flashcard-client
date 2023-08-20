var MockReplicate = /** @class */ (function () {
    function MockReplicate(auth) {
        this.auth = auth;
    }
    MockReplicate.prototype.run = function (model, input) {
        console.log("running model");
        return {
            output: "https://images.unsplash.com/photo-1692290997682-cfd9aadd0fd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=900&q=60",
            status: "succeeded"
        };
    };
    return MockReplicate;
}());
var replicate = new MockReplicate("auth");
var output = replicate.run("model1", {
    input: {
        image: 'image'
    }
});
console.log(output);
