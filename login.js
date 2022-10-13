const User = require("./user.schema");
const bcrypt = require("bcrypt");


function getUser(email)
{
    return new Promise((resolve, reject) => {
         User.findOne({email:email}, (err,res)=>{
            err ? reject(err) : resolve(res);
         });
    })
}

async function loginUser(userData) {
  let checkUser = await getUser(userData.email);
  console.log("Check User: " + checkUser);
  if (checkUser !== null) {
    console.log("User already exists");
    if (userData.password === null) {
      return { email: userData.email, login: true };
    } else {
      const result = await bcrypt.compare(
        userData.password,
        checkUser.password
      );

      if (result == true) {
        console.log("Check User: " + checkUser);
        return { email: userData.email, login: true };
      } else {
        throw new Error("Invalid password");
      }
    }
  } else {
    if (userData.password !== null) {
      return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(userData.password, salt).then((password) => {
          userData.password = password;
          userData.foods = [];
          return new Promise((resolve, reject) => {
            const newUser = new User(userData);
            newUser.save((err, res) => {
              if (err) {
                reject(err);
              } else {
                console.log("User does not exist, creating user");
                resolve({ email: userData.email, login: false });
              }
            });
          });
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        User.insertOne(userData, (err, res) => {
          if (err) {
            reject(err);
          } else {
            console.log("User does not exist, creating user");
            resolve({ email: userData.email, login: false });
          }
        });
      });
    }
  }
}

module.exports = { loginUser,getUser };