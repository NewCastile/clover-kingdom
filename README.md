<!-- @format -->

## Just having fun
Days ago i decided to do a manga reader app to evade annoying adds and having a smooth dark mode by default so i could read one of my favorite mangas easily by the night. Part of the problem was that i couldnt fine an API directly with all the chapters of the series so i resorted to web scraping and with the right tools (Selenium and BeautifulSoup) and my vague knowledge on Python, i was able to scrap basic info about the Black Clover manga, put it all in a MongoDB database and create a NextJS app to render the whole thing.

For web scraping i used one page to get the link of all images from all chapters, and a famdom wikia to get the name of the arcs and their respective chapters, after that i created a MongoDB cluster with MongoDB Atlas to upload two JSON files. One of the files containing only the arcs name and the chapters name, and another one containing all the chapters with the src links of each page.

## Web Scraping

So the web page from where i get the images takes some time to render the list of the chapters, meaning that i need to wait until this element appears to do the job. This is where Selenium comes in handy since it can sorta make use of the browser and allows you to create conditions for when to interact with the web page. Selenium can parse the HTML of the source code but this is easier with BeautifulSoup, different from Selenium since it is just an HTML parsing library. With Selenium you can click one button to move to the other page and get the HTML with the loaded image, and with BeautifulSoup you can parse it and get the src of the image, write it down into a json file and soon you will have all the chapters of the manga.

![manga-reader-web-scrapping](https://raw.githubusercontent.com/NewCastile/clover-kingdom/main/demos/manga-reader-web-scrapping.gif)

Translation was another important part of the app. I kinda made this app for my friends too and since our native language is spanish having the arcs and chapters title in english its... so of course i have to translate the whole thing. For this i just used Selenium, a Python clipboard library and Deepl. With all this i just imported both JSON files to my MongoDB database using the `mongoimport` command.

![manga-reader-translation](https://raw.githubusercontent.com/NewCastile/clover-kingdom/main/demos/manga-reader-translation.gif)

## Updates
I now use Playwright for web scraping as it is easier to work in one programming language and because it can be used directly inside the api routes.
I created a different (and private) app for manga creation/edition that can also upload the images of the manga to Cloudinary, in order to make the chapters and arcs downloadable for the main app.

## Things i might do later

- Rework on UI Design.
- Custom 404 page.
- Brief tutorial messages for new users.
- Lightmode. (which i hate).
- Add more mangas.
