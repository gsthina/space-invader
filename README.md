# space-invader
A casual game made using cocos2d-js

cocos2d-x is a multi-platform framework for building 2d games, interactive books, demos and other graphical applications. It is based on cocos2d-iphone, but instead of using Objective-C, it uses C++. It works on iOS, Android, OS X, Windows, Linux and Web platforms.

To install Cocos2d, I would recommend you to refer to this documentation [1].

#Download stable versions

- Cocos2d-x stable versions [2]
- Cocos2d-JS Lite version [3]

#How to start a new game
Download the code from cocos2d download site [4] or clone this repo (instructions above)
Run setup.py
Run the cocos script
Example:

    $ cd cocos2d-x
    $ ./setup.py
    $ source FILE_TO_SAVE_SYSTEM_VARIABLE
    $ cocos new MyGame -p com.your_company.mygame -l cpp -d NEW_PROJECTS_DIR
    $ cd NEW_PROJECTS_DIR/MyGame

You can also create a JS project or Lua project with -l js or -l lua.

#Build and run a new project for iOS
    
    $ cocos run -p ios

#Build and run a new project for OSX

    $ cocos run -p mac
    
#Build and run a new project for Linux

If you never run cocos2d-x on Linux, you need to install all dependencies by the script in cocos2d/build/install-deps-linux.sh

    $ cd cocos2d-x/build
    $ ./install-deps-linux.sh

Then

    $ cd NEW_PROJECTS_DIR/MyGame
    $ cocos run -p linux

Run

    $ bin/MyGame

#Build and run new project for win32
    
    $ cocos run -p win32

#Build and run new project for web

Only JS project can be published to web platforms, so you will need to create a JS project first:

    $ cocos new -l js WebGame

Then you can run your game in a web browser:

    $ cocos run -p web

Or you can publish your game to publish/html5/ folder:

    $ cocos run -p web -m release [--advanced]



[1] https://docs.cocos2d-x.org/cocos2d-x/en/installation/
[2] http://www.cocos2d-x.org/download
[3] http://www.cocos2d-x.org/filecenter/jsbuilder
[4] http://www.cocos2d-x.org/download/version#Cocos2d-x
