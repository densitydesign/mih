import csv
from operator import itemgetter
from itertools import groupby
import json
import subprocess
import os

path = 'twitterLang.tsv'
json_data=open('NIL.json')
dataJson = json.load(json_data)

def point_in_poly(x,y,poly):

	n = len(poly)
	inside = False

	p1x,p1y = poly[0]
	for i in range(n+1):
		p2x,p2y = poly[i % n]
		if y > min(p1y,p2y):
			if y <= max(p1y,p2y):
				if x <= max(p1x,p2x):
					if p1y != p2y:
						xinters = (y-p1y)*(p2x-p1x)/(p2y-p1y)+p1x
					if p1x == p2x or x <= xinters:
						inside = not inside
		p1x,p1y = p2x,p2y

	return inside


data = csv.DictReader(open(path, 'rb'), delimiter='\t', skipinitialspace=True)
#headers = ["date","car_plate","id_nil","nil"]
headers = data.fieldnames #.extend(["id_nil","nil"])
collection = []
for line in data:
	#print line
	lon = float(line['longitude'])
	lat = float(line['latitude'])
	row = []
	print line["idsource"]
	for header in headers:
		row.append(line[header])

	for feature in dataJson['features']:
		id_nil = feature['properties']['ID_NIL']
		nil = feature['properties']['NIL']
		element = feature['geometry']['coordinates'][0]
		inside = point_in_poly(lon, lat,element)
		if inside:
			line["id_nil"] = id_nil
			line["nil"] = nil
			break
		else:
			line["id_nil"] = "outside"
			line["nil"] = "outside"
	row.extend([line["id_nil"],line["nil"]])

	collection.append(row)

writer = csv.writer(open("out_nil.tsv", 'wb'), delimiter='\t', quotechar='"')
headers.extend(["id_nil","nil"])
writer.writerow(headers)
writer.writerows(collection)

print 'ho finito!'