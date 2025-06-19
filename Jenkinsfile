pipeline {
  agent any

  tools {
    nodejs 'node'
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/cristiangarc94/vueling-ui-test.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh 'npx cypress run'
      }
    }

    stage('Publish JUnit Report') {
      steps {
        junit 'reports/junit/*.xml'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'reports/junit/*.xml', allowEmptyArchive: true
    }
  }
}
