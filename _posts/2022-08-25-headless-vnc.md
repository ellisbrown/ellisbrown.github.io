---
layout: single
title:  "VNC Virtual Desktop on a Headless Server"
date:   2022-08-25
excerpt: "Setup a virtual desktop environment on a Linux server without a monitor."
categories:
    - programming
tags:
    - vnc
    - engineering
toc: true
toc_sticky: true
---


I recently worked on a project that required me to run a program that required a GUI to run. This was a bit of a challenge because I was working on a remote server that did not have a physical display (it was "headless"). After many hours of searching/trying, I found a solution that worked. The following are my notes on how to get it working; I hope it helps you if you are in a similar situation!

> Note: I have seen a few other people using programs like TeamViewer to access a remote server with a virtual desktop. I personally never got this working because it requires a physical display to be connected to the server, but it may work for you.


## Installation & Setup

### Install [TigerVNC](https://tigervnc.org/) on the server

```bash
sudo apt install tigervnc-standalone-server -y 
```

> TigerVNC is just one of many VNC servers available. I tried several and found it to be the easiest to setup and use.

### Start the VNC server
When you start the VNC server, you will be prompted to set a password. This password will be used to connect to the server from a client.

You can also optionally choose to set
* a virtual display number, e.g. `:9` (default is `:1`)
* a "geometry" for the screen (e.g. `1920x1080`)

```bash
# create a virtual display (#9) with a screen size of 1920x1080
vncserver -localhost no -geometry 1920x1080 :9
```

The final output should be something like:

```text
New 'MACHINE:9 (USER)' desktop at :9 on machine MACHINE
```

Once the display is created, you can connect to it using a VNC client.


## Headless Linux Desktop Environment
If you are connecting to a Linux server without a physical display, you will need to install a dummy XServer for the VNC server to use.

```bash
sudo apt install xterm xserver-xorg-video-dummy
```


## Viewing the VNC display
To view the VNC display, you will need a VNC client. There are many available, select the one that works best for you. I personally use the built in one on Mac. Instructions below:

### Mac VNC Viewer

You need to forward the port of the VNC server (`5909` above) to your local machine over SSH, and have a stable connection open. Then you can open the viewer with:

```bash
open vnc://localhost:5909
```

> Note: the port number is `5900+N` where `N` is the display number you chose when starting the VNC server.


## Programmatic Access to the Virtual Display
In order for programs to access the virtual display, you need to set the `DISPLAY` environment variable to the virtual display number (e.g. `:9`).

```bash
export DISPLAY=:9
```

With this set, you can run code that requires a display (e.g. `matplotlib`, `ai2thor`, etc.) without ever needing to physically interact with the server/machine. Super useful for working on the cloud!

> Note: Within your code itself, you may also need to set the `DISPLAY` environment variable to the corresponding display number to get it to run correctly (e.g., in Python: `os.environ['DISPLAY'] = ':9'`).


## Troubleshooting / Tips
Fixing issues with the virtual screen

### Status of all VNC displays
You can check the status of the VNC server and all virtual displays with:

```bash
vncserver -list
```

The following is an example of the output with a stale screen:

```text
TigerVNC server sessions:

X DISPLAY #	PROCESS ID
:9	30309 (stale)
```

### Kill the virtual display
If the virtual display is stale, you can kill it with:

```bash
vncserver -kill :9
```

### Change the password
If you need to change the password, run:

```bash
vncpasswd
```


## References
* [https://www.sproutworkshop.com/2021/04/how-to-create-a-virtual-headless-tigervnc-server-on-ubuntu-20-04/](https://www.sproutworkshop.com/2021/04/how-to-create-a-virtual-headless-tigervnc-server-on-ubuntu-20-04/)
