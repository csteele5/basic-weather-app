# Basic Weather App

## Summary

This is a repository contains the output of the node.js weather app project.  This project will be deployed using the Heroku service.

## Deployment

Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to allow deployment from the command line.  For my Debian dev environment:

```
sudo snap install --classic heroku
```
**Heroku setup/commands**

```
heroku -v       #verifies install
heroku login    #opens a browser window to allow login
```
*Terminal output should now reflect a successful login*


## To run locally

The nodemon packageis installed as a project dependency and is not required at the global level.  Therefore, the normal process of running ```nodemon /src/app.js -e hbs,js,css``` may not work.  The appropriate way to launch this project locally for development is as follows:

```
npm run dev
```

## Pushing code updates

Code updates should be pushed to both the Github repo and the Heroku hosted location, once changes are tested.  Follow the normal process through commit first:

```
git status
git add .
git commit -m "message here"
```

Then the standard push for Github:

```
git push
```

Now, to push to Heroku:

```
git push heroku master
```


