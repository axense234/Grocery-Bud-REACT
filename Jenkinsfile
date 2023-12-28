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
          environment {
            DOCKER_USERNAME = 'andreicomanescuonline@gmail.com'
            DOCKER_PASSWORD = 'J8@k-R5&m$_'
          }
          steps {
            sh '''#!/bin/bash

docker login --username "${DOCKER_USERNAME}" --password-stdin <<< "${DOCKER_PASSWORD}"
'''
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