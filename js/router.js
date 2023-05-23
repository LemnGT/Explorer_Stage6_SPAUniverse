export class Router {
  routes = {};

  add(routeName, url) {
    this.routes[routeName] = url;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    if (pathname == "/universo") {
      document.querySelector("#un").classList.add("nav-focus");
      document.querySelector("#hm").classList.remove("nav-focus");
      document.querySelector("#exp").classList.remove("nav-focus");

      document.body.classList.add("bg-universo");
      document.body.classList.remove("bg-home");
      document.body.classList.remove("bg-exploracao");
    } else if (pathname == "/exploracao") {
      document.querySelector("#exp").classList.add("nav-focus");
      document.querySelector("#hm").classList.remove("nav-focus");
      document.querySelector("#un").classList.remove("nav-focus");

      document.body.classList.add("bg-exploracao");
      document.body.classList.remove("bg-universo");
      document.body.classList.remove("bg-home");
    } else {
      document.querySelector("#hm").classList.add("nav-focus");
      document.querySelector("#un").classList.remove("nav-focus");
      document.querySelector("#exp").classList.remove("nav-focus");

      document.body.classList.add("bg-home");
      document.body.classList.remove("bg-universo");
      document.body.classList.remove("bg-exploracao");
    }
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
