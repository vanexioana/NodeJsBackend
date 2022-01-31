General objective
Implementing an application on the specified subject, with a REST-ful backend which accesses data stored in a relational database through an ORM. The backend is used from a React SPA frontend.

Description
Implementing a REST service and a React interface for the following entities: - FavouriteList - Video

FavouriteList has many Video. 
FavouriteList has an id (integer, primary key), a description (string of at least 3 characters), a date/time (date, representing the moment the list was created).
Video are un has an id (integer, primary key), a description (string of at least 5 characters), a title (string of at least 5 characters) and an url (string validated as url).

Graded components and detailed points
REST service
Defining the first entity - 0.3
Defining the second entity - 0.3
Defining the relation between the two entities - 0.3
GET operation for the first entity - 0.3
POST operation for the first entity - 0.3
PUT operation for the first entity - 0.3
DELETE operation for the second entity as a child resource - 0.3
GET operation for the second entity as a child resource - 0.3
POST operation for the second entity as a child resource - 0.3
PUT operation for the second entity as a child resource - 0.3
DELETE operation for the second entity as a child resource - 0.3
Filtering on two fields for the first entity - 0.3
Sorting on a field for the first entity - 0.3
Paging for the first entity - 0.3
Import - 0.2
Export - 0.2