# ApexLogViewer

This is a tool for viewing apex logs from Salesforce orgs. [The tool is available here](https://markmizensagecom.github.io/apex-log-viewer/).

Originally developed by [Dan Quill](https://github.com/danbrycefairsailcom) and built upon by [Mark Mizen](https://github.com/MarkMizenSagecom).

# Contributing

_To contribute to this repository please open a pull request to be reviewed._

## Local setup

To run this project locally clone this repository

```
$ git clone https://github.com/MarkMizenSagecom/apex-log-viewer.git && cd apex-log-viewer
```

After the repository has been cloned, install the npm dependancies:
```
$ npm install
```

> If there is an issue with installing @sage/ng-carbon, ensure that it is hosted on https://jenkins-001.ukwest.cloudapp.azure.com/npm/.

Start the local server 
```
$ npm run start
```

## Building

To build the application run this command:
```
$ npm run start
```

## Deploy

A github action has been set up to publish this application to github pages. To deploy, create a new release on this github repository. This will take the current master branch and publish it.

If github pages are not available, then there is also a bash script for deploying this package. It requires using a bash terminal and installing @angular/cli locally to run.

```
$ npm install -g @angular/cli
$ bash deploy.sh
```
