# Mirror Mirror

Mirror Mirror is a "smart mirror" that integrates Voicebox Technologies' services for easy navigation and better user experience using voice. This project makes use of a Raspberry Pi running an application written in TypeScript/Javascript with an Angular 2 framework.

##Setting up the Mirror Mirror app
1. Clone the Mirror Mirror repository
2. In your preferred IDE, navigate to `mirror-mirror/app/config.ts`
3. Enter API keys, location, and TTS Voice
 * Get API keys from:
    * [VoiceBox Technologies](https://developer.voicebox.com/) 
    * [Weather Underground](https://www.wunderground.com/weather/api/)
    * [Google](https://developers.google.com/maps/)
    * [Todoist](https://developer.todoist.com/)
    * [Pushbullet](https://docs.pushbullet.com/)
    * [Spotify](https://developer.spotify.com/)
4. Go to https://snowboy.kitt.ai/ and follow the installation guide (optional: create your own hotword with snowboy, place model in `app` directory and change model name in `config.ts`)
5. Run `npm install`
6. Run `typings install`
7. Run `npm run build` to build
8. Run `npm run electron` to start electron


##Available Commands
After saying the wake phrase (defaults to `hello mirror`), listen for the ding then do one of the following:
* Ask for the weather
* Get directions to a destination
* Add a task to your todo list
* Play a YouTube video
* Play music from Spotify
* Ask for help to see available commands within app

##Setting up the Raspberry Pi
1. Go to https://www.raspberrypi.org/downloads/raspbian/
2. Install Raspbian Jessie
3. Follow installation guide provided by Raspbian
