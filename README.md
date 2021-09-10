# Calculating Gross Rent Multipliers

This project uses Zillow data on home values and rental prices to calculate gross rent multipliers. 

**Gross Rental Multiplier = Rent / Home Value**

This is a common investment ratio to evaluate cash flow on real estate. All things equal, a higher gross rent multiplier means higher cash returns. 

Currently, you can only search by city, and Zillow data is limited to major metro areas. I'll be adding zip code-based data soon.

### The Data

The data is available as downloads in CSV format here: 
[https://www.zillow.com/research/data](https://www.zillow.com/research/data) 

### AWS Lambda + MongoDB Atlas

I've downloaded, simplified, and manipulated the data, and put it in a cloud MongoDB Atlas instance. 

Data is fetched via an AWS Lambda endpoint. 

### Working with the Project

This project is built using Create React App. Just clone the repository, cd into the project directory, and use the `npm start` command. That will launch a dev server at [http://localhost:3000](http://localhost:3000). 

### Live Link

Latest version of this application is currently deployed to netlify (as of Sept 2021): 
[https://613b8850973b7209f21b55a5--rent-multiplier.netlify.app/](https://613b8850973b7209f21b55a5--rent-multiplier.netlify.app/)

