User Stories

- OAuth Login using Yelp API
- Produce a JSON API of queried results for User to look over
- CRUD Authorization 
- Deployed Online ( Heroku )


User Perspective

1. Sign in using Yelp 
2. Enter zipcode/address (OR) allow to use user's Location
3. Choice of filters
  - Price Range ($ or $$ or $$$ ...)
  - Distance (Closest, 5miles, 30miles ...)
  - Takeout/Pickup/Delivery
  - Happy Hour(Yes/No/Only at _:__am/pm)
  - Store Hours(Open Now?)
  - Reservations
  - Available limited Deals
4. Given 20 choices of Restaurants
  - Search results (20 restaurants)
    - Thumbs Up
        Save to (Likes) Database & Results Page
    - Super Thumbs Up
        Save to (SuperLikes) Database
        Redirect to Business on Yelp
    - Thumbs Down
        Save to Dislike Database
    - Super Thumbs Down
        Saves to (SuperDislikes) Database
5. Redirected to Results Page
  - Clicking Selection redirects to Business on Yelp
6. Super Like Page
7. Past Dislike Page


Pages

1. Front Page
  - Standard template
  - Login through Yelp
2. Search Page
  - Search by Parameter(name/restaurant)
  - Search by Empty Parameter(Top 20 in that area)
  - 20 Restaurants( Presented one at a time )
  - Like/Dislike/Super Like/Super Dislike
      - Saves to Likes(Database)
          If already exists, Like Counter++
          If Counter=3, add to Reccomend List
      - Saves to Dislikes(Database)
          If already exists, Dislike Counter++
          If Counter=3, add to NeverShow List
      - Saves to SuperLike(Database)
          ends search & redirects to Business on Yelp
      - Saves to SuperDislike(Database)
          removes from Search results(reoccuring)
3. Results/Session/Temporary Page
  - After going through 20 ... 
      - Display Liked choices(Name/Location/Genre/Price)
          Clicking will redirect to Yelp 
          Bookmark will save to (Bookmark)Database for future use
  - If User Thumbs Up'd 0/20 ... 
      "It looks like you didn't like any of our results"
      redirect to Search Page (Display Advanced Search Parameters)
4. Bookmarks/Persisting Page
    - Grabs saved bookmarks from Database
5. Suggestions based on Bookmarks Page
