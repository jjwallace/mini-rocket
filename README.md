# Mini Rocket

## Game Closure Framework Sample Game.

This is a fun test game build in the Game Closure framework.

## Instructions:
Tap screen to launch rocket.  Move finger left right to move rocket.  Avoid things, collect other things.

## Install
install npm
npm install node -g
npm install devkit --save
devkit install
devkit serve

* NOTE: some bash files paths are not functional in windows.  Compile in linux / iOS

### Modules Used:

Clone this game:
`git clone git@https://github.com/jjwallace/mini-rocket.git`

## Play the Game:
[Play in the
Browser](http://no link) - uploading soon

## Coding Roadblocks and Temporary Solutions.
*Entity system did not render sprites.  Built out collision detection however sprite anchors are not giving a good centerpoint.
*Sprite.style.visible = false; //Does not hide sprite, temporarily using (x offset)
*Animation documentation only notes temporary animations but not animation switching, some effects are mission.

## Framework Docs:
[Game Closure Framework](https://web.archive.org/web/20170910043517/http://docs.gameclosure.com:80/)

