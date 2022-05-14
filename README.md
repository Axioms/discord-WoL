 # Discord computer starter
 0. [Requirements](#requirements) 
 1. [Warnings](#warning-warning-warning)
 2. [Install](#install)
    1. [wake on lan tool](#wake-on-lan-tools)
    2. [nodejs](#nodejs)
    3. [nodejs packages](#install-node-packages)
    4. [env](#env)
        - [Discord api key](#discord-api-key)
    5. [Systemd (optional)](#systemd-optional)
        - [Config](#config)
        - [Install](#install-service)
        - [Enable](#enable-service)
 3. [Usage](#usage)
    - [Commands](#commands)

 ## Requirements

 Below is the software stack this script was tested on. This script should work on any Linux-based distribution, but your mileage may vary.

| Software      | Version |
| ----------- | ----------- |
| NodeJS      | 17.3.0      |
| Ubuntu      | 20.04 LTS   |
| etherwake   | 1.09        |

 ## :warning: Warning :warning:
 
 This tool requires that you [setup passwordless sudo](https://serverfault.com/questions/160581/how-to-setup-passwordless-sudo-on-linux) on the device used to start the computer because a raw Wake-On-Lan (WoL) network packet needs to be made and sent to be broadcasted.  
  
 [It should be possible to only give a user permission to run the WoL tool with root](https://askubuntu.com/questions/159007/how-do-i-run-specific-sudo-commands-without-a-password) although I haven't had any success with it.



 ## Install

 :rotating_light: Make sure that passwordless sudo has been setup :rotating_light:

 ## Wake-On-Lan Tools
 This tool uses etherwake to send WoL packets
 <details open>
  <summary>on Ubuntu/Debian</summary>

  > sudo apt update  
  > sudo apt install etherwake

 </details>

 ## NodeJS
  The nodejs packages tend to be out dated on distros so one should use a tool like the node version manager ([nvm](https://github.com/nvm-sh/nvm)) to install a spesifice version of node.
  <details open>
  <summary>install nvm on Ubuntu/Debian</summary>

  > sudo apt update  
  > sudo apt install curl
  > curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash  
  > source ~/.bashrc  
  > nvm install 17   
  > nvm use 17   

 </details>

 ## Install Node packages
  once in the repository directory run the following to install the needed dependencies  
    
    npm install

 ## env
 Rename the exmaple.env file to .env and change the mac address to the mac address of the computer you want to start and change the discord token to your discord token.

 ### Discord api key
  You can obtain a discord bot token by following [this tutorial](https://www.writebots.com/discord-bot-token/)

## Systemd (optional)

### Config

 Only if you want the discord bot to start on system startup.

 In the computer-starter.service file one should change the User and group to that of their current user. the current user can be determined by running the <code>whoami</code> command  

 after the user has been set change the WorkingDirectory to the location of the cloned repo this can be done by running the <code>pwd</code> command while in the repo directory

 The last config change that needs to be made is the ExecStart start line. "node" needs to be changed to the actual path of the node executable. you can find the path to the executable by running the <code>which node</code> command.

 ### Install Service
  
  change the owner of the service file to root and copy it to the systemd directory

  > sudo cp computer-starter.service /etc/systemd/system  
  > sudo chown root:root /etc/systemd/system/computer-starter.service

 ### Enable Service
  
 > sudo systemctl enable computer-starter --now

 ## Usage

 To use the bot invite it to a discord server, preferably with just yourself, one can then either direct message the bot or in a guild with <code>.start</code> to start the computer or <code>.ping</code> to test if it works.

 ### Commands

 | Command      | Description |
| ----------- | ----------- |
| .start      | sends a WoL packet      |
| .ping      | used to test if the discord bot is running   |
