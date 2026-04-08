# devops-self-service-platform


vi install.sh
sudo apt update && sudo apt upgrade -y
# Install nodejs
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v

# install docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

sudo usermod -aG docker ubuntu

# terraform
sudo apt install -y gnupg software-properties-common

wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update && sudo apt install terraform -y

# need to install aws cli v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# aws configure
# inside this repo i created 
mkdir backend infra docker k8s pipelines
cd backend
npm install -g pm2
npm install aws-sdk uuid@8
npm install express
pm2 start index.js
pm2 restart all

 cd ~/devops-self-service-platform/
 npx create-next-app@latest frontend
 npm install
 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
 source ~/.bashrc

 nvm install 20
 nvm use 20
 npm install
 npm run dev [ need to create DynmoDB in amazon]
 npm run build
 pm2 start npm --name frontend -- start

cd ../backend/
vi Dockerfile
 docker build -t backend-app .
 docker run -d -p 5000:5000 backend-app

 pm2 stop all

 cd ~/devops-self-service-platform/frontend
 vi Dockerfile
 docker build -t frontend-app .
 docker run -d -p 3000:3000 frontend-app

  docker tag backend-app sajithsaaji/backend-app
  docker tag backend-app sajithsaaji/frontend-app
  docker push sajithsaaji/backend-app
   docker push sajithsaaji/frontend-app
 
 
