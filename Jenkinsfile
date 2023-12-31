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
        sh 'docker build -t grocery-bud-react:test .'
      }
    }

    stage('AWS ECR Login') {
      steps {
        sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 797345446188.dkr.ecr.us-east-1.amazonaws.com'
      }
    }

  }
}