import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <>
        <h2 key={user.id}>{user.name}</h2>
        <p>Email : {user.email}</p>
        <p>username : {user.username}</p>
        <p>address : {user.address.street}, {user.address.suite} , {user.address.city}, {user.address.zipcode}</p>
        <p>Geo location :  {user.address.geo.lat}, {user.address.geo.lng}</p>
        </>
      ))}

    </div>
  );
}

export default App;