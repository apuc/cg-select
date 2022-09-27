//ToDo: paste the desired url;
const url = '';

fetch('http://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => console.log(json));
