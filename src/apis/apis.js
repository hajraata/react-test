export const getusers = (setUsers) => {
  fetch(
    "https://randomuser.me/api/?results=10&inc=id,name,dob,phone,email,location,gender,picture",
    {
      method: "GET",
    }
  )
    .then(async (response) => {
      if (response.status !== 200) {
        throw new Error("An error has occured. Please try later.");
      } else {
        const users = await response.json();
        console.log(users.results);
        setUsers(users.results);
      }
    })
    .catch((err) => {
      alert(err);
    });
};
