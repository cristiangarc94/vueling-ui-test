pipeline {
  agent any

  environment {
    CI = 'true'
  }

  tools {
    nodejs 'node' // Asegúrate de tener Node configurado en Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
       echo 'Usando proyecto local'
      }
    }


    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Cypress tests') {
      steps {
        sh 'npx cypress run'
      }
    }

    stage('Publish JUnit Results') {
      steps {
        junit 'reports/junit/results-*.xml'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'reports/junit/results-*.xml', allowEmptyArchive: true
    }
  }
}
