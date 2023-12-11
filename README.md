# **Grocery Bud**

A simple React Project that focuses on the basics of react with the useReducer hook,localStorage,popup modal.

## **Description**

A simple React Project that focuses on the basics of react with the useReducer hook,localStorage,popup modal.The project is themed around a grocery list with grocery items fetched from localStorage.You can add items to the list and they will be saved even if you exit and reenter the website.Also please note that the localStorage part is a complex system i did for fun and should probably not be copied,since you can just update the entire list not specific items.

## **Getting Started**

### Dependencies

- Check package.json for details.
- Docker installed if you want to test using Docker

### Installing

```
git clone https://github.com/axense234/Grocery-Bud-REACT.git
```

### Executing program

- **_Test through NPM_**

```
npm install
npm start
```

- **_Test through Docker_**

```
docker build -t grocery-bud-react:0.3.0 .
docker stop grocery-bud-react-app
docker rm grocery-bud-react-app
docker run -d -p 3000:3000 --name grocery-bud-react-app grocery-bud-react:0.3.0
```

## **Authors**

- **axense234**

## **Version History**

- 0.3
  - Analyzed code to gather to-do tasks and also added Docker to the project.
- 0.2
  - Improved reducerFunction logic and improved how the website looks.
  - See [commit change](https://github.com/axense234/Grocery-Bud-REACT/commits/master) or See [release history](https://github.com/axense234/Grocery-Bud-REACT/releases)
- 0.1
  - Initial Release

## **License**

This project is licensed under the GNU License - see the LICENSE.md file for details

## **Acknowledgments**

- Inspired by [_John Smilga 15 React Projects_](https://www.youtube.com/watch?v=a_7Z7C_JCyo&t=8s)
