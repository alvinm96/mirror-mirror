# Mirror Mirror

Mirror Mirror is a "smart mirror" that integrates Voicebox Technologies' services for easy navigation and better user experience using voice. This project makes use of a Raspberry Pi running an application written in TypeScript/Javascript with an Angular 2 framework.

##Setting up the Mirror Mirror app
1. Clone the Mirror Mirror project
2. In your preferred IDE, navigate to `mirror-mirror/app/config.ts`
3. Enter API keys, location, and TTS Voice
 * Get API keys from:
    * [VoiceBox Technologies](https://developer.voicebox.com/) 
    * [Weather Underground](https://www.wunderground.com/weather/api/)
    * [Google](https://developers.google.com/maps/)
    * [Todoist](https://developer.todoist.com/)
    * [Pushbullet](https://docs.pushbullet.com/)
    * [Spotify](https://developer.spotify.com/)
    * [api.ai](https://api.ai/)
4. Set up PortAudio
 * On Linux: `sudo apt-get install python-pyaudio python3-pyaudio sox`
 * On Mac: `brew install portaudio sox`
5. Install PortAudio's Python bindings (Note: `pip` should be installed): `pip install pyaudio`
6. Run `npm install`
7. Run `npm run rebuild` to rebuild snowboy module to Electron
8. Run `npm run build` to build project
9. Run `npm run electron` to start electron


##Available Commands
After saying the wake phrase (defaults to "hello mirror"), listen for the ding then do one of the following:
* Ask for the weather
* Get directions to a destination
* Add a task to your todo list
* Play a YouTube video
* Play music from Spotify
* Ask for help to see available commands within app

##Setting up the Raspberry Pi
1. Download and write [Raspbian Jessie](https://downloads.raspberrypi.org/raspbian_latest) image to microSD card
2. Start up the Raspberry Pi
3. Install Node:
 * `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
 * `sudo apt-get install -y nodejs`
4. For keyword spotting, run `sudo apt-get install sox libatlas-base-dev`
5. Follow the steps from **Setting up the Mirror Mirror app** section