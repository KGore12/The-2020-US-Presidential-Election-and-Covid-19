# Project-2
# The 2020 US Presidential Election and Covid-19

LINK TO STATIC WEB SITE:
https://kgore12.github.io/Group_Project_2/index.html

__NOTE__ This repository has not yet been deployed. 

![](https://github.com/KGore12/Group_Project_2/blob/main/Images/View1.PNG)

## Background
The data we are using comes from Politico via [Kaggle](https://www.kaggle.com/etsc9287/2020-general-election-polls). In these current times, our team chose to focus on if there was a relationship between two major occurrences in 2020: an unprecedented presidential election and a worldwide pandemic. We were able to find a comprehensive dataset from Politico on [Kaggle](https://www.kaggle.com/etsc9287/2020-general-election-polls). Some of the major datapoints obtained were votes, demographic data, and Covid-19 numbers. We set out on a path to use data analytics to further visualize this data on these pages. Even though there is no definitive relationship, we can definitely see some trends with the data. 

Notes About the Data: Due to changes in data collection and reporting for both the 2020 presidential election and COVID-19, this is only a "snapshot" of the data sources up to November 1st, 2020 for COVID-19 data and November 10th, 2020 for the election data.

![](https://github.com/KGore12/Group_Project_2/blob/main/Images/View2.PNG)

## Data Cleanup
The goal of the back-end is to find the data necessary to tell a story. On the other hand, the story of the back-end is fidgeting with .geojson files. Once Evan found our state.json file, using our csv-converter.py file we converted the .json file into a csv to merge it with the election/COVID data file. Once we had a merged dataframe, we then created a function to iterate over the dataframe and to call each column by row. Using the json.loads function, we made the geometry column holding all the features and type information into a dictionary. 

Once the .geojson was cleaned, we were able to copy this output into a geojsonlint to check if the geojson was in the correct format. Turns out, the coordinates were not correctly placed using the right-hand rule. Finally before uploading the final .geojson file to MongoDB, we placed the .geojson into a right-hand rule fixer and then the front end could use that in making their maps. 

The biggest difficulty of this project was the .geojson file and its formatting. The file has to be formatted in a certain way so that there are no extra quotations anywhere within the geometries or features. This took some python manipulation and the previously mentioned json.loads function to make the geometry into a dictionary, not a string. We thought for a bit that splitting the geometry column into two columns so that we can convert the array of coordinates into a float would help, but Python did not like that because the column was a series not a string.

## Technique/Technology 
Python/Pandas was used to initial cleaning and visualizing the data. Data was then converted to JSON and GeoJson files. Tested data with a [GeoJSON Viewer & Validator](https://geojsonlint.com/) Flask was used to to access the MongoDB database holding the GeoJson file. For graphic analysis, D3 and Leaflet were used. Bootstrap for the HTML, CSS, and JavaScript Framework for web application. 


#### [CleanData](CleanData)
CSV and GeoJson files of data

#### [ERD](ERD)
QuickDBD-SQL files with a snapshot of the data structures.

#### [Images](Images)
Screenshots for presentation and ReadMe.

#### [Proposal](Proposal)
2020_Election_and COVID_proposal.docx

#### [Static](Static)
Flask files for accessing databases.

#### [Assets](assets)
CSS and JS for leaflet maps, demographic charts, and Covid charts.

#### [Templates](templates)
HTML, CSS, and images for for main webpage  

#### [Test](test)
Jupyter Notebook files of cleaned data used for testing.




Distribution of tasks
1.	Finding Data Source - Evan found the main source with support from the team.
2.	Cleaning up the data - Evan and Brendan with assistance from Roshini.
3.	Transforming the data - Brendan and Roshini
4.	Loading and testing the data - Brendan and Roshini
5.  ERD - Brendan
6.	Proposal - Kim with support from the team.
7.  Set up landing page – Kim
8.	Set up index.html and style.css - Kim
9.	Set up visualizations – Roshini
10.	PowerPoint - Kim with assistance from Roshini and Evan
11. ReadMe - Kim with screenshots from Roshini
12.	Set up web server - 

Regularly touched base via Slack to ensure project is on track.

## Contributors
* [Brendan Rhoads](https://github.com/BRhoads1155)
* [Evan Kamis](https://github.com/EvanK215/)
* [Roshini Jayantha](https://github.com/RoshiniGau/)
* [Kimberly Gore](https://github.com/KGore12)
