***solve:***
BE: express, graphql
DB: postql -> mongodb, redis
FE: apolo client, next.js
many request to srver
graphql cache, graphql ql

Formik
Antd
using express-session in nodejs instead of jwt, so in BE: we will create session contain cokie information and save to db or redis, after that when client request to server with this cookie, server will decrypt and check with db to make sure who is it. 

why need cookie: because it help to set time, with expired time even in db

==> test save mongodb with cookie time -> to see it auto deleted or not.


return type of function  to make sure code return with right format

***Feat: Admin page update and ***
create post page 
login
show/edit/create post
show more post
votes
roles

***Step:***
- setup project
- connect db
- create model user, post
- create session cookie and save to mongodb ( or use redis) -> which is alternative way of jwt
- middleware to check valid user
- update / read data from cache in grahpql with readQuery and writeQuery

*** when we don't set policy for graphql query -> default: check cache fist then fetch server later if cache not exist


- logout: BE: clear cookies of client, destroy session

- middleware check: if user alreay login -> prevent go to login and register page

- use apollo with nextjs which we need to modify some code to fit it

- send mail with nodemailer & ejs template for change password, reset password
test with: https://ethereal.email/ 
https://yopmail.com/en/

- pagination: hasNext, hasPrevious

- using onError to catch log of apollo client, make a middleware to checkeck error and rewrite it, so user can't no see error in console.log , and we can continue handle nex project in FE

- using dataload to solve issue: query post and user related, so when we get 20 post but only 1 user -> then we must make 2 query : 1 request 20 post, 1 request user id -> not 20 * 2 ( 20 for post, 20 for user)


*** Using only graphql ***

graphql-request ( gpl, grahqlClient)

### Start Code


*** Install ***

```
yarn add -D @types/node typescript
```
dev
```
yarn add -D nodemon
```

set rule for typescript
  ```
   npx tsc --init
   ```
   in tsconfig.json
3. For Dev we need to run to script below

```
yarn watch : => to tracking and compile ts to js
yarn dev : => to run node server after being compled in js
```

4. setup prettier

- .prettierrc file : content in pretter play ground

* ctrl shift p: to set up format type in vscode

  win: shift alt f

  ubuntu: ctrl shift i

-
6. setup engine to only run yarn
- create file .nvmrc
```
node -v > .nvmrc
```
- create file .npmrc
- setup engine in package.json\

7. Alias typescript

    - Adding **baseUrl** and **paths** in compilesOption in tsconfig.json
    - Adding script in package.json
    - Install module-alias
    - Import module-alias in start up file: 'index.ts'

    8. Start code
1. Conect db
Singleton pattern, like axios setup

2. Logger

3. Note write diagram with markdow + vscode extenstion
https://www.youtube.com/watch?v=wBISkGjwVyo&list=LL&index=1 

4. structure
- model: function interact directly with data from input data
- service: handle logic interact with model
- controller, resolver: call some service to handle one logic
- schema: schema for db with typescript if we don't use grapql
- utils: pure function and constants
- helps: support function like db, log
- library: thirt library like axios,...

5. Setup apollo server to using graphql
install package and setup in src/server.ts

// continue with 5, 7, 8 for user
6. UserResolver
-> register: username, password, email
type return register:
validate input with joi: 
validate user exist email
encrypt agon2 with crypto salt: ok
feat:
  verify email:
  reset password:
  change password:

-> login:

7. session with mongodb
docs: https://github.com/jdesboeufs/connect-mongo 
```
yarn add express-session
yarn add connect-mongo
```
save session with expired time in mongodb ( store to support multiple user ), when run server will auto generate collection 'sessions'
in typescript need to create new type for add new paramter to session
session: encrypt data with secret key, more capacity than cookie

```
type requestMe = Request & { session: Session & Partial<SessionData> & {userid?: String}};
```

Flow:
when user login -> create session in db and save to client
when client request to server, server will decrypt cookie with secret key and find in db to check user exist or not

handle expire session with refresh cookie jwt if necessary

8. Logout
clear cookie specific name not all ( COOKIE_NAME)
destroy session: server will auto get curent session id and deleted in mongodb

9. Post
 - Create post
 - query post
 - query all post with pagination
 - update post
 - delete post

 - write middleware: check userid va role khi can trong middle, vì dùng session-express nen khi het hạn thì session trong db tự động xóa, lúc này thông tin mà ta gắn vào trong session lúc trước sẽ mất đi, mặt dù người dùng vẫn gửi cookie lên
 nên mới renew session


10. add product to cart
- already login
- no login -> login -> comeback to add to card ( redux store ) -> checkout again

11. Why session not jwt
https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens



jwt just in case: server to server, mobile to server, involve many third party to authentication, single sign on

12. rescroll back in nextjs to change position of screen view to previous positon 


encrypt page: https://supertokens.com/blog/password-hashing-salting 

cover callback function to promise: https://zellwk.com/blog/converting-callbacks-to-promises/ 
use in query db mongodb
