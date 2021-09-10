# Calculating Gross Rent Multipliers

**Note this project is still very much in development, not fully functional.**

This project takes data from Zillow on home values and rental prices and uses it to calculate gross rent multipliers. 

A gross rentiplier is simply Monthly Rent / Home Value. It is a common ratio used to evaluate the likely cash returns on rental real estate. All things equal, the higher the gross rent multiplier, the higher the cash returns. 

Note that gross rental multipliers may be inversely related to long term price appreciation, as they tend to be higher in more economically depressed areas. 

### The Data

The data is available as downloads in CSV format here: 
[https://www.zillow.com/research/data](https://www.zillow.com/research/data) 

I've converted the data JSON. The data is stored in the projects src/data folder and imported from the main App.js file. 

### Create React App

This project is built using Create React App. If you want to download it and see it in action, clone the repository to your local machine, cd into the project directory, and use the `npm start` command. 

Doing so will runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 

### How to Search

When ready, I'll likely deploy this to netlify. In the meantime, you'll need to clone and start the project as described in the last section. 

Once running, simple type a city name or zip code and search.

### Live Link

Latest version of this application is deployed to netlify: 
[https://613b8850973b7209f21b55a5--rent-multiplier.netlify.app/](https://613b8850973b7209f21b55a5--rent-multiplier.netlify.app/)

