<p margin-left="24px" align=center>
<a href="https://player-seeking-player.herokuapp.com">
<img width="40%;" src='./wiki/player-seeking-player-logo-black.png'>
</a>
</p>
<h2 align="center">The social media / networking site for musicians</h2>
<div align="center">
<img src="https://img.shields.io/badge/Status-Live-brightgreen">
<img src="https://img.shields.io/badge/Front End-React / Redux-blueviolet">
<img src="https://img.shields.io/badge/Back End-Flask / Python-blue">
</div>
<hr></hr>

## Table of Contents

- ### [About](#about)
- ### [Features & Demo](#featuresanddemo)
- ### [Code Snippets](#codesnippets)
- ### [Future Features](#futurefeatures)
- ### [Credits](#credits)

<h2 id="about">About</h2>
<hr></hr>
<a class="logoLink" href="https://player-seeking-player.herokuapp.com"><strong>Player Seeking Player</strong></a> is a full-stack application built in <strong>React / Redux, Flask, Python, and PostgreSQL</strong> that aims to <em><strong>ease the difficulty of networking with local musicians</strong></em> in the COVID-19 era. This project was built completely in <strong>Vanilla CSS</strong> to cultivate the skill of building a fluid UI from the ground up
<br/><br/>

Player Seeking Player is a social media application which allows users to <em><strong>post recordings</strong></em>, <em><strong>search for other users by instrument and preferred styles</em></strong>, and <em><strong>create bands</strong></em> all in the interest of managing the networking and collaboration of local musicians. It is my hope that it will help hobbyist and professional musicians alike manage their musical endeavors.

<h2 id="featuresanddemo">Features And Demo</h2>
<hr></hr>

### Auth:

Users can...

- Sign in as a demo user if they don't have an account
- Create an account
- Sign into an existing account

<br/>

### Profiles / Recordings:

Users can...

- Create a profile on new account creation
- Edit the content of their profile information like location, instruments, styles, etc.
- Add / update their profile picture
- Manage recordings on their profile:
  - Add a recording
  - Rename a recording
  - Edit a recording's details

<br/>

### Search:

Users can search for other musicians based on...

- Name
- Mile Radius
- Instrument
- Style

<br/>

### Bands:

Users can...

- Create a band of a specific style
- Edit a band's name / style
- Manage the membership of a band they have created

<br/>

### Invitations:

Users can...

- Invite other users to bands they have created
- Accept or decline pending invitations to other bands
- Delete invitations they have sent to other users

<br/>

### Demo:

For a look at what using <a href="https://player-seeking-player.herokuapp.com"><strong>Player Seeking Player</strong></a> is normally like, check out this video demonstration by its developer, Panayiotis Dimopoulos!

<div align="center">
<a href="https://www.youtube.com/watch?v=0M5tq9K65D8">
<img src="https://img.youtube.com/vi/0M5tq9K65D8/0.jpg" alt="Player Seeking Player Demo" />
</a>
</div>

<h2 id="codesnippets">Code Snippets</h2>
<hr></hr>

**Search**

On Player Seeking Player, a user can search for other musicians based on their name, mile radius, instrument(s), and preferred style(s). Here's an example:

<div align="center">
<img src="./wiki/search.gif" alt="Search" />
</div>
<br/>

The **SearchDropdown** component, which houses all of the information about a user's search query, uses a **useReducer** React hook to manage its complex state of what name is entered, what mile radius the user has chosen, and which instruments and styles the user is searching for as well.

The **searchReducer** function is responsible for handling all of the logic for how the component's state is altered based on user interaction with the dropdown.

<div align="center">
<img width="720px" src="./wiki/SearchDropdown-component.png" />
<img src="./wiki/searchReducer.PNG" />
</div>

When the user selects instruments and styles they want in their search query, they do so with the help of the custom **Checkbox** component. The component renders a label and a checkbox. Then, based on the changing state of the checkbox it calls functions from the context it is consuming which dispatch actions to the **searchReducer**. The **searchReducer** function then handles the adequate changes to the search query's state.

<div align="center">
<img src="./wiki/Checkbox-component.PNG" />
</div>

Next, when the user submits their search all of the **SearchDropdown's state data** the is passed into a **Redux thunk**. The thunk makes an AJAX request to the Flask backend and if the response is okay, dispatches an action to the store that updates the searchResults slice of the session state.

<div align="center">
<img width="732px" src="./wiki/search-thunk.PNG" />
<img src="./wiki/searchResults-redux.png" />
</div>

On the back end, once the route is hit, the Flask server handles the interaction of searching the database. If the body of the request provided a **name**, add that to the database query. Otherwise, just search for musicians **within the mile radius** provided that are **not the user that sent the request** and play the **instruments** and **styles** that the user requested. The server returns the response of that query to the client.

<div align="center">
<img src="./wiki/search-route.png" />
</div>

The **reverse_haversine** function handles the complexity of determining the **minimum and maximum latitudes and longitudes** of a given mile radius. The reason for using this function was to reduce the number of calls to the Google Maps API, as they can be quite expensive if used extensively enough. For more info on the application of this formula, visit the following link: [http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates](http://janmatuschek.de/latitudelongitudeboundingcoordinates)

<div align="center">
<img src="./wiki/reverse_haversine.PNG" />
</div>

**Updating a Profile Picture**

On Player Seeking Player, a user can update their profile picture at any time once they have an account. Here's an example:

<div align="center">
<img src="./wiki/profile-picture.gif" />
</div>
<br/>

The **ProfilePicFormModal** component houses all of the state necessary to accomplish updating the profile picture. It tracks the picture file currently being used, a ref for the image passed into the **Cropper** component (more on that to come), the actual crop itself with a default aspect ratio of 1:1, and the current fileName. It passes these values and functions that set these values into **a context** so nested components can access them.

<div align="center">
<img src="./wiki/ProfilePicFormModal-component.PNG" />
</div>
<br/>

The **ProfilePicForm** component renders what is being shown to the user. If there is no picture selected, it renders a label which when clicked on brings up file input selector. If there is a picture selected it renders the custom **Cropper** component, which houses all of the logic for the **ReactCrop** component from the **react-image-crop** library.

<div align='center'>
<img src='./wiki/ProfilePicForm-component.PNG' />
<img src='./wiki/Cropper-component.PNG' />
</div>

When the form in the **ProfilePicForm** is submitted, it first gets the picture rended within the crop before sending an AJAX request via Redux thunk. The **getCroppedImage** function uses a **canvas DOM node with** a **2d context** to asynchronously redraw the image between the crop and convert it into a Data URL for a **png with a base64 encoded string**. That string is then sent as part of the Redux thunk's AJAX request to the backend to update the user's profile picture.

<div align='center'>
<img src='./wiki/getCroppedImage.PNG' />
<img src='./wiki/ProfilePicForm-submit.png' />
</div>

Once the route has been hit on the Flask back end, the sever takes just the relevant string data from the **base64 encoded image**, decodes the string, and **uploads it to an AWS S3 bucket**. On successful upload, the server queries the database for the corresponsing profile and updates the profile picture link to the newly uploaded image. The new profile data is then returned to the client.

<div align='center'>
<img src='./wiki/profile-picture-aws-upload.png' />
</div>

Finally, once the Redux thunk receives an okay response, it dispatches an action to update the user's profile picture which is handled by the **usersReducer**.

<div align='center'>
<img src='./wiki/profile-picture-redux-thunk.png' />
<img src='./wiki/update-profile-picture.png' />
</div>

<h2 id="futurefeatures">Future Features</h2>
<hr></hr>

- Scheduling rehearsals for your band
- Rehearsal spaces being able to list their venue on the site
- Booking rehearsal spaces for rehearsals
- Messaging

<h2 id="credits">Credits</h2>

- The **reverse_haversine** formula used in calculating minimum and maximum latitudes and longitudes for a mile radius is based off of this article: [http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates](http://janmatuschek.de/latitudelongitudeboundingcoordinates)
- The **react-image-crop** library can be found here: [https://github.com/DominicTobias/react-image-crop](https://github.com/DominicTobias/react-image-crop)
