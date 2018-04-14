# SampleIntegration
An example of a game integration into BitGuild portal


## Further read
Check 
* https://medium.com/@jgm.orinoco/ethereum-smart-service-payment-with-tokens-60894a79f75c approveAnCall section to better understand how payments with tokens work on Ethereum
* https://ethereum.stackexchange.com/questions/34160/why-do-we-use-revert-in-payable-function
* https://theethereum.wiki/w/index.php/ERC20_Token_Standard

## Installation

### Node

1. edit config file
```sh
# dev
nano ecosystem.development.json

# prod
nano ecosystem.production.json
nano build.sh
```

2. run
```sh
npm i

# dev
npm start

# prod
npm run build
NODE_ENV=production npm start
```

### Nginx

```
sudo nano /etc/nginx/sites-available/default
sudo nginx -s reload
```

