import sys
sys.path.insert(0, 'src/vendor')
from imdb import IMDb
from imdb import helpers 

ia = IMDb()
h = helpers()


def multipleMovies(title, allMoviesWithName, movie):
	if(len(allMoviesWithName) == 1):
		movie = ia.get_movie(allMoviesWithName[0].movieID)
	else:
		filterBy = input(f'Multiple items named "{title}" ({len(allMoviesWithName)} total).  Filter by: \nkind\nyear\n')
		if(filterBy == 'kind'):
			possibleKinds = [x.get('kind', '') for x in allMoviesWithName]
			chosenKind = input(f'Which kind?\n{possibleKinds}\n')
			allMoviesWithName = [m for m in allMoviesWithName if m.get('kind', '') == chosenKind]
		elif(filterBy == 'year'):
			possibleYears = [x.get('year', 'unknown') for x in allMoviesWithName]
			chosenYear = input(f'Multiple movies named "{title}".Which year?\n{possibleYears}\n')
			allMoviesWithName = [m for m in allMoviesWithName if m.get('year', '') == int(chosenYear)]

		if(len(allMoviesWithName) == 1):
			return (0, allMoviesWithName, ia.get_movie(allMoviesWithName[0].movieID))
		else: 
			return (1, allMoviesWithName, '')

def getMovie(movieDetails):
	title = movieDetails[1]
	# director = movieDetails[2]
	year = int(movieDetails[3])
	allMoviesWithName = ia.search_movie(title)
	if(len(allMoviesWithName) > 1):
		print(f'Multiple items found ({len(allMoviesWithName)}).  Filtering by year = {year} and kind == movie')
		allMoviesWithName = [m for m in allMoviesWithName if m.get('year','')==year and m.get('kind','')=='movie']
	if(len(allMoviesWithName) == 1):
		movie = ia.get_movie(allMoviesWithName[0].movieID)
	else:
		print(f'Something went wrong.  Total moves found after filter: {len(allMoviesWithName)}.  Stopping. ')
		return 
		
	directors = [x['name'] for x in movie['directors']]	
	genres = movie['genres']
	description = movie['plot outline']
	rating = movie['rating']
	numberVotes = movie['votes']
	writers = [x.get('name', '') for x in movie['writers']]
	stars = [x['name'] for x in movie['cast'][:3]]
	runtime = movie['runtime'][0]
	imageUrl = '.'.join(movie['cover url'].split('.')[:-2])+'.jpg'
	budget =  movie['box office'].get('Budget','') if movie.get('box office','') != '' else ''
	openingWeekendUSA =  movie['box office'].get('Opening Weekend United States','') if movie.get('box office','') != '' else ''


	movieJ = {
	"title": title,
	"year": year,
	"description": description,
	"image": imageUrl,
	"ratings": [{
		"source": "IMDB",
		"rating": rating,
		"numberVotes": numberVotes
	}],
	"watched": "notWatched",
	"liked": "",
	"id": movie.movieID,
	"director": directors,
	"writer": writers,
	"stars": stars,
	"releaseDate": movie['original air date'],
	"runtime": runtime,
	"genres": genres,
	"budget": budget,
	"openingWeekendUSA": openingWeekendUSA,
	"worldwideGross": "",
	"tags": [],
	"AFI100LaughsRank": movieDetails[0]
	}	
	return movieJ
