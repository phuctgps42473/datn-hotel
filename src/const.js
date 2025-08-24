const isProd = typeof window !== 'undefined' && /vercel\.app$/.test(window.location.hostname);
export const BASE_URL = isProd
  ? 'https://datn-bug-six.onrender.com/api'
  : 'http://localhost:8080/api'

console.log("type of windows", typeof window)
console.log(BASE_URL)