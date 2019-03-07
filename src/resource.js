/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
    HelloWorld_png 	: "res/HelloWorld.png",
    alphabet_menu	: "res/alphabet.png",
    number_menu		: "res/number.png",
    background_img	: "res/background3.jpg",
    space_overlay_img:"res/space_overlay.png",
    play_button		: "res/buttons/play.png",
    exit_button		: "res/buttons/exit.png",
    settings_button	: "res/buttons/settings.png",
    credits_button	: "res/buttons/credits.png",
    launch_button_1   : "res/buttons/launch.png",
    launch_button_2	: "res/buttons/launchButton.png",
    sniper_point	: "res/mouse/sniper.png",
    bullet_obj      : "res/objects/meteor.gif",
    earth_obj_1      : "res/objects/earth1.png",
    earth_obj_2      : "res/objects/earth2.png",
    earth_obj_3      : "res/objects/earth3.png",
    // bullet_obj		: "res/objects/bullet_shine.png",
    explosion_obj	: "res/objects/explosion.gif",
    alien_obj_1		: "res/objects/alien1.png",
    alien_obj_2		: "res/objects/alien2.png",
    alien_obj_3		: "res/objects/alien3.png",
    alien_obj_4		: "res/objects/alien4.png",
    alien_obj_5		: "res/objects/alien5.png",
    alien_obj_6     : "res/objects/alien6.png",
    alien_obj_7     : "res/objects/alien7.png",
    alien_obj_8     : "res/objects/alien8.png",
    alien_obj_9		: "res/objects/alien9.png",
    // power_obj_4     : "res/objects/powerup4.png",
    // power_obj_5     : "res/objects/powerup5.png",
    missile_obj_1   : "res/objects/missile1.png",
    missile_obj_2	: "res/objects/missile2.png"

    // title_font: {
    //     type: "font",
    //     name: "CaviarDreams",
    //     srcs: ["res/fonts/CaviarDreams.ttf", "res/fonts/CaviarDreams.ttf"]
    // }
};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
