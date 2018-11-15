# Guess Vu!

Engineering project two for Makers Apprencticeships (Weeks 11 & 12). A small  anonymous messaging app/chatroom where you try and figure out the identities of others in the chatroom

## Prerequisites

[NodeJs & npm](https://nodejs.org/en/download/), which can be installed using [Homebrew](https://brew.sh/) on macOS:
```sh
brew install npm
```

## Installing

Clone this repo then `cd` into the directory:
```sh
git clone git@github.com:IvyMic/guessVu.git
cd guessVu
```

Install packages in the backend/main folder:
```sh
npm install
```

Then install packages in the frontend folder:
```sh
cd frontend
npm install
```

## Running The Server
If changes have been made rebuild the `frontend` package:
```sh
npm run build
```

Then run the server in the `root`:
```sh
npm start
```

Visit [localhost:3001](localhost:3001) to chat and play with the application locally

## Running Tests

With the server running in `root` (see above):
```
npm test
```

<!-- ### Break down tests

Explain what these tests test and why

```
Give an example
```

### And feature tests

Explain what these tests test and why

```
Give an example
``` -->

<!-- ## Deployment

Add additional notes about how to deploy this on a live system -->

## Process
* Two day sprints
* Group planning session at the start of a sprint
* Daily standups
* Retros at the end of each sprint with Demos

### Planning
* Plan and estimate work for sprint (plus extra just in case)
* Estimations used are relating to either morning (9.30am-12.30pm) or afternoon (1.30pm-5.30pm) sessions:
  * *Quick and Easy* - Multiple tickets completable in single session
  * *Medium* - Ticket expected to take whole session
  * *SuperHard* - Ticket expected to take more than one session, should be broken down into smaller tickets if possible
* Break up large tickets into smaller ones if possible (see "SuperHard")
* Create checklists on tickets as necessary
* Add estimated tickets to the `To Do` column in the [group trello board](https://trello.com/b/ZrjQm3jB/guessvu)

### Development
* Pairs assign themselves to a ticket in the `To Do` column and move it across to `In Progress`
* All development work takes place in a new branch which is linked to the ticket
* When the task is complete  <!-- and continuous integration is passing on GitHub --> make a pull request with appropriate tags and requesting approval from the other pair before moving the ticket to `In Review`
  * Pull request must have at least basic information on what is being added to the codebase
  * Pull request linked to ticket on [trello](https://trello.com/b/ZrjQm3jB/guessvu)
* Code must be reviewed by the other pair and approvals given before code is merged. Approval only given if reviewers understand how the code works and thinks it's suitable and of good quality.
  * Comments and discussion had on the pull request if necessary before approving
* Move the ticket into `Done` once merged
* Repeat ad infinitum

### MVP Sketch
Single page app with landing page asking for real name and fake (display) name, moving through to WebSocket-based chatroom with the ability to guess the real names of people in the chatroom and receive feedback

![Initial MVP Sketch](https://i.imgur.com/jBAjt6x.jpg)

### Initial User Stories
![User Stories](https://i.imgur.com/Pnri6aC.png)
<!-- More information? -->

## Built With

* [JavaScript](https://www.javascript.com/) - Main programming language used to write all logic
* [HTML](https://www.w3schools.com/html/) - Markup language used to create initial webpage
* [CSS](https://www.w3schools.com/css/css_intro.asp) - Styling language used to make everything look pretty
* [React](https://reactjs.org/) - Frontend JavaScript library used to generate views and routing
* [NodeJS](https://nodejs.org/en/) - Backend JavaScript runtime used to run JavaScript on the server
* [express.js](https://expressjs.com/) - Server framework for NodeJS
* [socket.io](https://socket.io/) - WebSocket framework allowing bi-directional communication between web clients and servers
* [Jest](https://jestjs.io/en/) - Testing library used to automate both frontend and unit tests
* [Puppeteer](https://pptr.dev/) - Feature testing API used to automate UI testing
* [Chromium](https://www.chromium.org/) - Run in headless mode by Puppeteer for feature tests
* [webpack](https://webpack.js.org/) - Module bundler and build tool
* [npm](https://www.npmjs.com/) - Package manager and command line interface
<!-- * [TravisCI](https://travis-ci.org/first_sync) - Continuous integration tool used to test commits and pull requests, then deploy automatically if tests pass -->
<!-- * [Heroku](https://www.heroku.com/) - Cloud platform used to deploy and host the live project -->

## Authors

* **Vu Le** - [ckvuby](https://github.com/ckvuby)
* **Seb Becker** - [sebgrebe](https://github.com/sebgrebe)
* **Ibrahim E** - [IvyMic](https://github.com/IvyMic)
* **Patrick Harris** - [TinyGobby](https://github.com/TinyGobby)

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
* Should we use the MIT license or GNU GPLv3? -->

## Acknowledgments

* [Makers Academy](https://makers.tech) [Apprenticeships](https://makers.tech/become/apprentice/)
