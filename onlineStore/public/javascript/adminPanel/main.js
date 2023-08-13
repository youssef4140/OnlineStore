
adminEmail = document.getElementById("adminEmail");
adminEmail.innerHTML = localStorage.getItem("email");

const navToggle = {

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


async function route(page){

    const result = await fetch(`/views/adminPanelPages/${page}.html`);

    const pageHtml = await result.text()

    const router = document.getElementById("router");
    router.innerHTML = pageHtml;

    navToggle.remove();


    const pageJs = await import(`/javascript/adminPanel/${page}.js`);

    pageJs.default();

}

route("dashboard");
