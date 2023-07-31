


let navToggle = {

    sideNav : document.getElementById("sideNav"),
    page : document.getElementById("page"),

    add: function(){
        this.sideNav.classList.add("toggle");
        this.page.classList.add("toggle");
    },

    remove: function (){
        this.sideNav.classList.remove("toggle");
        this.page.classList.remove("toggle");
    },

    toggle: function (){

        if(sideNav.classList.contains("toggle"))  this.remove();
        else this.add();
    }
}
