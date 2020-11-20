# Codehub backend
<h3>Responses format</h3>
  The responses from server side are generally formatted in the same format as follows:
```
  {
    "success": [ true/false ],
    "message": ...
  }
```
  In case the requests from users are correctly handled, `success` field will be set to `true`, and the result will be stored in `message`. Otherwise, `success` will be set to `false` and the `message` field will return the error if any.
  
<h3>Url API</h3>
Here is the list of server api url that has been finished, they might be changed in the future:
<h2>Users</h2>
* POST `/api/v1/login`
  Logging in to the server, user need to provide their username and password in the post request. 
* GET `api/v1/users/name/{name}`
  Getting a user by name. Replace the `{name}` by the user's name to be retrieved in the actual calls.
* GET `api/v1/users/id`
  Getting a user by id, this call need to be called after the users login to the server, this login requirement is for now just for testing purpose.
* POST `api/v1/users/new`
  Creating a new account, there are some fields that users need to specify in the request body:
  * `username`
  * `password`, password will be encrypted before being saved by server.
  * `fullname`
  * `roleId`, for `1` meaning a Student account and `2` meaning an admin account. Currently, there is no difference between a student account and an admin acount.
<h2>Courses</h2>
* GET `api/v1/courses/code/{code}`
  Getting a course by its code.
* GET `api/v1/courses/id/{id}`
  Getting a course by its id.
* POST `api/v1/courses/new`
  Creating a course.
<h2>Quizzes</h2>
* GET `api/v1/quizzes/id/{id}`
* GET `api/v1/quizzes/delete/id/{id}`
* POST `api/v1/quizzes/new`
<h2>Summissions</h2>
* GET `api/v1/submissions/delete/id/{id}`
* POST `api/v1/submissions/new`
<h2>Tags</h2>
* GET `api/v1/tags/id/{id}`
* GET `api/v1/tags/delete/id/{id}`
* POST `api/v1/tags/new/`
---
# Some feature notes
* password of users are hashed 
* cookie and session are used to save the login status of users
