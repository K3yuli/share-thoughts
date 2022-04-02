<h1 align="center">Share Thoughts</h1>

## Table of Contents
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Demo](#demo)
- [Technologies](#technologies)

## <a name="user-story">User Story</a>
```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## <a name="acceptance-criteria">Acceptance Criteria</a>
```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## <a name="demo">Demo</a>

## <a name="technologies">Technologies</a>
- [Express](https://expressjs.com/)
- [Moment](https://momentjs.com/)
- [Mongoose](https://mongoosejs.com/)