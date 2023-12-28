pipeline {
  agent any
  stages {
    stage('Setup') {
      steps {
        git(url: 'https://github.com/axense234/Grocery-Bud-REACT', branch: 'master')
      }
    }

    stage('Add Log') {
      parallel {
        stage('Add Log') {
          steps {
            sh 'ls -la'
          }
        }

        stage('NPM Test') {
          steps {
            sh 'npm --version'
          }
        }

      }
    }

    stage('Build') {
      steps {
        sh 'docker info && docker build -t grocery-bud-react:test .'
      }
    }

  }
}