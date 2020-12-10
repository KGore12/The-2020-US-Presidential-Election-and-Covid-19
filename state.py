import geojson
import pandas as pd
import json

stategeo_df = pd.read_csv("Raw Data/state_geojson.csv")

state = ['Maine', 'Massachusetts', 'Michigan', 'Montana', 'Nevada', 'New Jersey', 'New York', 'North Carolina', 'Ohio', 'Pennsylvania', 'Rhode Island', 'Tennessee', 'Texas', 'Utah', 
'Washington', 'Wisconsin', 'Puerto Rico', 'Maryland', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida',
'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Lousiana', 'Minnesota', 'Mississippi', 'Missouri', 'Nebraska', 'New Hampshire', 
'New Mexico', 'North Dakota', 'Oklahoma', 'Oregon', 'South Carolina', 'South Dakota', 'Vermont', 'Virginia', 'West Virginia', 'Wyoming']

stategeo_df['NAME'] = state

state_df = pd.read_csv("Raw Data/state_data.csv", encoding="utf-8")

state_df['hispanic_pop'] = round(state_df['TotalPop']*state_df['Hispanic %'])

state_df['white_pop'] = round(state_df['TotalPop']*state_df['White %'])

state_df['black_pop'] = round(state_df['TotalPop']*state_df['Black %'])

state_df['native_pop'] = round(state_df['TotalPop']*state_df['Native %'])

state_df['asian_pop'] = round(state_df['TotalPop']*state_df['Asian %'])

state_df['pacific_pop'] = round(state_df['TotalPop']*state_df['Pacific %'])

merged_df = pd.merge(stategeo_df, state_df, on="NAME")
merged_df.head()
clean_state_df = merged_df.drop(['state'],axis=1)

clean_state_df["cases_per_100k"]= (clean_state_df["cases"]/clean_state_df["TotalPop"])*100000
clean_state_df["deaths_per_100k"]= (clean_state_df["deaths"]/clean_state_df["TotalPop"])*100000

clean_state_df['geometry'] = clean_state_df['geometry'].str.replace("'",'"') 

def df_to_geojson(clean_state_df):
    geojson = {'type':'FeatureCollection', 'features':[]}
    for _, row in clean_state_df.iterrows():

    
        geometry = json.loads(row['geometry'])
        feature = { 'type':'Feature',
                    'geometry': geometry,
                   'properties': {"state": row['NAME'], "total_votes20": row['total_votes20'], "votes20_Donald_Trump": row['votes20_Donald_Trump'], "votes20_Joe_Biden": row['votes20_Joe_Biden'], "cases": row['cases'], "deaths": row['deaths'], "TotalPop": row['TotalPop'], 'VotingAgeCitizen': row['VotingAgeCitizen'], "Men": row['Men %'],
    "Women": row['Women %'], 'Hispanic %': row['Hispanic %'], 'White %': row['White %'], 'Black %': row['Black %'], 'Native %': row['Native %'], 'Asian %': row['Asian %'], 'Pacific %': row['Pacific %'], 'Biden %': row['Biden %'], 'Trump %': row['Trump %'], 'Republican': row['Republican'], 'Democrat': row['Democrat'], 'hispanic_pop': row['hispanic_pop'], 'white_pop': row['white_pop'], 'black_pop': row['black_pop'], 'native_pop': row['native_pop'], 'asian_pop': row['asian_pop'], 'pacific_pop': row['pacific_pop'], 'cases_per_100k': row['cases_per_100k'], 'deaths_per_100k': row['deaths_per_100k']}
        }
        #print({ "geometry": {row.geometry['coordinates']}} )
        #feature['geometry']['coordinates'] = [row[lon],row[lat]]
        #for prop in properties:
            #feature['properties'][prop] = row[prop]
        geojson['features'].append(feature)
    return geojson

print(df_to_geojson(clean_state_df))