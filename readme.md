# Mirror Mirror
Mirror Mirror is a "smart mirror" that integrates Voicebox Technologies' services for easy navigation and better user experience using voice. This project makes use of a Raspberry Pi running an application written in TypeScript/Javascript with an Angular 2 framework.

##Setting up the Mirror Mirror app
1. Clone the Mirror Mirror repository
2. In your preferred IDE, navigate to `mirror-mirror/app/config.ts`
3. Enter a wake phrase (defaults to 'mirror mirror'), enter API keys, location, and TTS Voice
 * Get API keys from:
    * [VoiceBox Technologies](https://developer.voicebox.com/) 
    * [Weather Underground](https://www.wunderground.com/weather/api/)
    * [Google](https://developers.google.com/maps/)
    * [Todoist](https://developer.todoist.com/)
4. Run `npm install`
5. Run `typings install`
4. Run `npm run build`
5. Run `npm run electron`

##Available Commands
After saying wake phrase, you can then say the one of the following:
> * "Get today's forecast"
* "Get the forecast for the week"
* "Get maps"
* "Help"

##Setting up the Raspberry Pi
1. Go to https://www.raspberrypi.org/downloads/raspbian/
2. Install Raspbian Jessie
2. Follow installation guide provided by Raspbian
