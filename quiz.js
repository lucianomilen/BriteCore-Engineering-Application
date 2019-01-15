
// Assuming you have already done "npm install fernet"
let fernet = require('../britecore/node_modules/fernet/fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let massage = 'gAAAAABcDwruM01sFJXISHrMqPzFNPg1FCoHjafZahp0yst1VG31A9Cf1bHA36NIpQ2IdRdGg2Hjg1_3z851zYIhd3xjWhjxXVYkOFhQEd20SSgo4zOEUDXw50hZ_QHxJnUKxMseZLsp4cy021Ag8O0OsbqaFtwQ7agUc3Daee2ZDW8llBB4iOXlP5U-NZi_4djuox--4V-K'
let token = new fernet.Token({secret: secret, token: massage, ttl:0})
token.decode()
console.log(token)
