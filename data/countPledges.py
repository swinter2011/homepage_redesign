import numpy as np
import pandas as pd

# load csv, keep zip as string
df = pd.read_csv('pledges.csv',dtype={'zip':object})

# group by zip
byZip = df.groupby('zip')

# count the instances of the same zip
zipCount = byZip.size()
zipCount.name = 'count'

# sum up dollars per zip
dollarSum = byZip['dollars'].sum()

# given each zipcode has the same lat and lon, condense the values into one-on-one
coordinates = byZip[['latitude','longitude']].max()

# concat the above two series
output = pd.concat([zipCount, dollarSum,coordinates],axis=1)

output.to_csv('pledges_for_map.csv')
