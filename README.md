# ring-around-the-country

Provides a parser for and UI to view a text list of the locations Ring has published that it has partnerships with police departments.

Ring, the home surveillance company owned by Amazon, proudly boasts of its over 1,900 "partnerships" with police agencies. Ring rewards departments who [promote its products](https://www.latimes.com/business/technology/story/2021-06-17/ring-influencer-marketing-los-angeles-police-department), despite having [little to no evidence](https://www.cnet.com/features/rings-work-with-police-lacks-solid-evidence-of-reducing-crime/) that it's effective in solving crime.

**And it's creepy.**

Through the Neighbors Portal program, police can request surveillance video from anyone with a Ring camera. This puts the privacy of anyone who just happened to walk or drive by a house with one of these devices at risk.

## Usage
`npm install`

Grab the latest KML file from https://www.google.com/maps/d/u/0/viewer?mid=1eYVDPh5itXq5acDT9b0BVeQwmESBa4cB and drop it into `data/Active Agency Map.kml`

`node index.js`

The processed data is in `data/out.json`

Or, just go to https://techforthepeople.org/ring-around-the-country and use it there.

## I have questions
Email me: chris [at] techforthepeople.org

## Your code sucks
Yeah, I put this together at like 2AM one night.

## OK, so what can we do about Ring and hypersurveillance?
Talk to your neighbors, friends and family about how this actually makes all of us less safe. Don't buy the devices, and tell people considering them that they shouldn't. Keep an eye on your local police department's press releases and your town/city/county's budgets to see if they're working with Ring or any kind of surveillance company. If they are, or might be, organize with others in your area to oppose it!
