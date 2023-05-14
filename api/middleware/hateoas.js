function hateoas(req,res){ 
    res.json({
    message: "Hello World!",
    links: [
        {      
            rel: "self",
            href: "/",
            action: "GET",
            types: ["application/json"],
        },
        {
            rel: "users",
            href: "/users",
            action: "GET",
            types: ["application/json"],
        },
        {
            rel: "users",
            href: "/users",
            action: "POST",
            types: ["application/json"],
        },
    ],
});
}

module.exports = hateoas;