const environments = {
  local: { NEXT_PUBLIC_API_URL: "http://localhost:5000" },
  docker: { NEXT_PUBLIC_API_URL: "http://localhost:5000" },
  render: { NEXT_PUBLIC_API_URL: "https://your-backend.onrender.com" }
};

let env;

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  env = environments.docker;
} else {
  env = environments.render;
}

window.env = env;
console.log("Using API:", window.env.API_URL);
