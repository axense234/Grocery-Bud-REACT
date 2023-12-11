docker build -t grocery-bud-react:0.3.0 .
docker stop grocery-bud-react-app
docker rm grocery-bud-react-app
docker run -d -p 3000:3000 --name grocery-bud-react-app grocery-bud-react:0.3.0