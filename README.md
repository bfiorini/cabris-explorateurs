# Les Cabris Explorateurs

## This my website and blog

## Installation

1. Install NodeJS and NPM from https://github.com/nodesource/distributions#deb
```shell
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```
2. Install Yarn https://yarnpkg.com/en/docs/install
```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```
3. Install dependencies
```shell
sudo npm install -g gulp-cli
yarn
```
