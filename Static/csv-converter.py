# Python program to convert 
# JSON file to CSV 
  
  
import json 
import csv 
  
  
# Opening JSON file and loading the data 
# into the variable data 
with open('../CleanData/gz_2010_us_040_00_20m.json') as json_file: 
    data = json.load(json_file) 
  
state_data = data["features"] 
  
# now we will open a file for writing 
data_file = open('../CleanData/state_geojson.csv', 'w') 
  
# create the csv writer object 
csv_writer = csv.writer(data_file) 
  
# Counter variable used for writing  
# headers to the CSV file 
count = 0
  
for state in state_data: 
    if count == 0: 
  
        # Writing headers of CSV file 
        header = state.keys() 
        csv_writer.writerow(header) 
        count += 1
  
    # Writing data of CSV file 
    csv_writer.writerow(state.values()) 
  
data_file.close() 