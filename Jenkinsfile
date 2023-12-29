pipeline {
  agent any
  stages {
    stage('Setup') {
      steps {
        git(url: 'https://github.com/axense234/Grocery-Bud-REACT', branch: 'master')
      }
    }

    stage('NPM Test') {
      steps {
        sh 'npm --version'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'curl https://registry-1.docker.io/v2/library/node/manifests/latest; docker info && docker build -t grocery-bud-react:test .'
      }
    }

  }
}