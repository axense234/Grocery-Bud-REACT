pipeline {
  agent any
  stages {
    stage('Setup') {
      steps {
        git(url: 'https://github.com/axense234/Grocery-Bud-REACT', branch: 'master')
        sh '''sudo apt update;
sudo apt install curl gnupg2 -y; curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
;sudo apt install -y nodejs
'''
      }
    }

    stage('Add Log') {
      parallel {
        stage('Add Log') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Health Check Simple(v1.3.0)') {
          steps {
            sh 'npm install  && npm start && curl http://localhost:3000'
          }
        }

      }
    }

  }
}