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

    stage('AWS ECR Login') {
      steps {
        sh 'aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g6t2k7y6'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t grocery-bud-react .'
      }
    }

    stage('AWS ECR Push') {
      steps {
        sh 'aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g6t2k7y6'
        sh 'docker push public.ecr.aws/g6t2k7y6/grocery-bud-react:latest'
      }
    }

  }
}