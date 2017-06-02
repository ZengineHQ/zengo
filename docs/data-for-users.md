

### getId

Retrieves the user Id using the current access token. In short it does
a request to `/users/me` endpoint.

!> ***Important*** to note that if the request to the backend service is made without an access token
and the service has offline permissions the access token used in this case is for the workspace user.
This is a common scenario when the backend service is triggered by a webhook.

Returns a `Promise` resolved with the user id or rejects within one of
the following errors:

Unauthorized

```json
{
  "name": "Unauthorized",
  "message": "User is not authorized",
  "status": 401
}
```

ApiError

```
{
	name: 'ApiError',
	message: 'API error',
	status: 500
}
```

Example

```js
var users = require('zengo').data.forUsers;

users.getId().then(
  function(userId) {
    // `userId` is a number e.g. 123
  },
  function(error) {
    // catch an error
  }
);
```

### isAuthorizedInWorkspace

Retrieves the current user membership.

Returns a `Promise` resolved with the membership object or rejects within one of
the following errors:

Unauthorized

```json
{
  "name": "Unauthorized",
  "message": "User is not authorized",
  "status": 401
}
```

ApiError

```
{
	name: 'ApiError',
	message: 'API error',
	status: 500
}
```

Arguments

Name          | Type            | Required    | Description
--------------|-----------------|-------------|----------------------
workspaceId   | Number, String  | &check;     | Workspace Id to check
userId        | Number, String  | *Optional*  | User Id to check



Example

```js
var users = require('zengo').data.forUsers;

users.isAuthorizedInWorkspace(123).then(
  function(membership) {
    // `membership` is an `Object`
  },
  function(error) {
    // catch an error
  }
);
```
