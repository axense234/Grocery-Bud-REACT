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
        stage('NPM Test') {
          steps {
            sh 'npm --version'
          }
        }

        stage('Docker Login') {
          steps {
            sh '''
docker login'''
          }
        }

      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker info && docker build -t grocery-bud-react:test .'
      }
    }

  }
}