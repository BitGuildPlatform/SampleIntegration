# EC2

## Connect
```bash
# obtain pem key
chmod 400 key.pem
ssh -i "key.pem" ubuntu@ec2-XXX-XXX-XXX-XXX.compute-1.amazonaws.com
```

## Configure EC2 instance
```bash
sudo groupadd www
sudo usermod -a -G www ubuntu
exit
sudo mkdir /var/www
sudo chown -R root:www /var/www
sudo chmod 2775 /var/www
```

## Add sources
```bash
# add source for node.js
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get update
```

## Install
```bash
sudo apt-get install nodejs nginx
```

## Nginx
```
sudo nano /etc/nginx/sites-available/default
sudo nginx -s reload
```
