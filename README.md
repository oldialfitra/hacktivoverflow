# hacktivoverflow

# e-commerce

## Questions Route
**Note:**  *  *is required*
 HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/questions</span> | token | *title, *description, *userId | new Question -> Object{id, title, description, upvote, downvote, comment, createdAt, userId} | Object { message: `Internal Server Error`, err } | Create a Question
 GET | <span style="color:red">/questions</span> |  |  | Object{id, title, description, upvote, downvote, comment, createdAt, userId} | Object { message: `Internal Server Error`, err } | All Question
 DELETE | <span style="color:red">/questions/:id</span> | token |  | Deleted Question -> Object{id, title, description, upvote, downvote, comment, createdAt, userId} | Object { message: `Internal Server Error`, err } | Delete a Question
 PUT | <span style="color:red">/questions/:id</span> | token | title, description | Updated Question -> Object{id, title, description, upvote, downvote, comment, createdAt, userId} | Object { message: `Internal Server Error`, err } | Update a Question
 GET | <span style="color:red">/questions/:id</span> | token |  | Object{id, title, description, upvote, downvote, comment, createdAt, userId} | Object { message: `Internal Server Error`, err } | Get a Question
 PUT | <span style="color:red">/questions/upvote/:id</span> | token | userId | Updated Question -> Object{id, title, description, upvote, downvote, comment, createdAt, userId} | Object { message: `Internal Server Error`, err } | Upvote a Question
 PUT | <span style="color:red">/questions/downvote/:id</span> | token | userId | Updated Question -> Object{id, title, description, upvote, downvote, comment, createdAt, userId} | Object { message: `Internal Server Error`, err } | Downvote a Question

<br>

## Users Route
**Note:**  *  *is required*
 HTTP | Router | Body | Success | Error | Description
------|--------|------|---------|-------|------------
 POST | <span style="color:red">/users/login</span> |  *email, *password | Object{token} | Object { message: `Internal Server Error`, err } | Login User  
 POST | <span style="color:red">/users/register</span> |  *email, *password | Object{email, password, role} | Object { message: `Internal Server Error`, err } | Register User  

<br>

## Answers Route
**Note:**  *  *is required*
  HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/answers</span> | token | *title, *description, *userId | new Answer -> Object{id, title, description, upvote, downvote, createdAt, userId} | Object { message: `Internal Server Error`, err } | Create a Answer
 GET | <span style="color:red">/answers</span> | token |  | Object{id, title, description, upvote, downvote, createdAt, userId} | Object { message: `Internal Server Error`, err } | All Answer
 DELETE | <span style="color:red">/answers/:id</span> | token |  | Deleted Answer -> Object{id, title, description, upvote, downvote, createdAt, userId} | Object { message: `Internal Server Error`, err } | Delete a Answer
 PUT | <span style="color:red">/answers/:id</span> | token | title, description | Updated Answer -> Object{id, title, description, upvote, downvote, createdAt, userId} | Object { message: `Internal Server Error`, err } | Update a Answer
 GET | <span style="color:red">/answers/:id</span> | token |  | Object{id, title, description, upvote, downvote, createdAt, userId} | Object { message: `Internal Server Error`, err } | Get a Answer
 PUT | <span style="color:red">/answers/upvote/:id</span> | token | userId | Updated Answer -> Object{id, title, description, upvote, downvote, createdAt, userId} | Object { message: `Internal Server Error`, err } | Upvote a Answer
 PUT | <span style="color:red">/answers/downvote/:id</span> | token | userId | Updated Answer -> Object{id, title, description, upvote, downvote, createdAt, userId} | Object { message: `Internal Server Error`, err } | Downvote a Answer

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:<br>
$npm install<br>
$nodemon app.js<br>
$npm run serve<br>

Access the Server side via http://localhost:5000/.

Access the Client side via http://localhost:8080/.