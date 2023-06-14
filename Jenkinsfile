pipeline {

  agent {
    label 'web-agent'
  }

  environment {
      DOCKER_REPO = '798283861836.dkr.ecr.eu-west-1.amazonaws.com'
      IMAGE = 'ppe-web-${webapp-name}'
      DATE = buildDate()
      AC_TEST_TAGS = ""
      AC_TEST_JOB = "/ppe-tests/ppe-acceptance-tests-${webapp-name}"

  }

  stages {

    stage('Preparation') {
      steps {
        script {
          properties([
            gitLabConnection('PPE')
          ])
        }
        checkout scm
      }
    }

    stage('Verify branch name') {
      when {
        not {
          branch 'master'
        }
      }
      steps {
        validateGitBranchName(env.BRANCH_NAME)
      }
    }

    stage('Ensure repository exists') {
      steps {
        ecrLoginAndCreateRepo(IMAGE)
      }
    }

    stage('Build') {
      steps {
        sh 'yarn bootstrap'
        sh 'yarn test'
        sh 'yarn lint'
        sh 'yarn build'
        sh 'docker build -t ${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT} .'
        sh 'docker tag ${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT} ${DOCKER_REPO}/${IMAGE}:${BUILD_NUMBER}'
        sh 'docker tag ${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT} ${DOCKER_REPO}/${IMAGE}:${GIT_BRANCH}'
        sh 'docker tag ${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT} ${DOCKER_REPO}/${IMAGE}:${DATE}-${GIT_COMMIT}'
      }
    }

    stage('Docker Image Validation') {
      agent {
        docker {
          label 'web-agent'
          image '${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT}'
          args '-e PUBLIC_DIR="public"'
        }
      }
      steps {
        validateDockerImage('wget -O \'-\' localhost:4000/health', 60)
      }
    }

    stage('Publish and Verify Pacts') {
      when {
        branch 'master'
      }
      steps {
        sh "echo 'Publishing pacts'"
        sh "yarn test:pact:publish"
        sh "echo 'Verifying pacts'"
        build 'ppe-pact/ppe-bff-${webapp-name}-pact-verify'
      }
    }

    stage('Publish Docker Image') {
      when {
        branch 'master'
      }
      steps {
        sh "echo 'Publishing docker image'"
        sh "docker push ${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT}"
        sh "docker push ${DOCKER_REPO}/${IMAGE}:${BUILD_NUMBER}"
        sh "docker push ${DOCKER_REPO}/${IMAGE}:${GIT_BRANCH}"
        sh "docker push ${DOCKER_REPO}/${IMAGE}:${DATE}-${GIT_COMMIT}"
      }
    }

    stage('Deploy to DEV') {
      agent {
        label 'master'
      }
      when {
        branch 'master'
      }
      steps {
        deploy('${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT}', 'ppe-dev')
        createIngress('ppe-dev', 'dev-ingress.yml')
      }
    }

    stage('Acceptance Tests DEV Chrome - New Feature Only') {
      when {
        branch 'master'
      }
      environment {
        JIRA_NUMBER = getLastMergeJiraTicket()
        Map icToggles = getFeatureToggles('https://dev.ppe-np.elsevier.com', 'svc-scielsawsppetest', 'IC_', false)
        icTogglesToExclude = "${icToggles.on}"
      }
      steps {
        script {
          triggerAcceptanceTests(env.AC_TEST_JOB, 'dev', 'local-chrome', "--tags @${env.JIRA_NUMBER}", env.icTogglesToExclude, false, '1')
        }
      }
    }

    stage('Deploy to SIT') {
      agent {
        label 'master'
      }
      when {
        branch 'master'
      }
      steps {
        deploy('${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT}', 'ppe-sit')
        createIngress('ppe-sit', 'sit-ingress.yml')
      }
    }

    stage('Acceptance Tests SIT Chrome - Feature Toggles Off') {
      when {
            branch 'master'
      }
      environment {
        Map icToggles = getFeatureToggles('https://sit.ppe-np.elsevier.com', 'svc-scielsawsppetest', 'IC_', false)
        icTogglesToInclude = "${icToggles.off}"
        icTogglesToExclude = "${icToggles.on}"
      }
      steps {
        script {
          def tagsToInclude = "--tags " + env.AC_TEST_TAGS + "," + env.icTogglesToInclude
          def tagsToExclude = env.icTogglesToExclude
          triggerAcceptanceTests(env.AC_TEST_JOB, 'sit', 'local-chrome', tagsToInclude, tagsToExclude, false, '5')
        }
      }
    }

    stage('Acceptance Tests SIT Chrome - Feature Toggles On') {
      when {
        branch 'master'
      }
      environment {
        Map icToggles = getFeatureToggles('https://sit.ppe-np.elsevier.com', 'svc-scielsawsppetst1', 'IC_', true)
        icTogglesToInclude = "${icToggles.on}"
        icTogglesToExclude = "${icToggles.off}"
      }
      steps {
        script {
          if (env.icTogglesToInclude) {
            def tagsToInclude = "--tags " + env.AC_TEST_TAGS + "," + env.icTogglesToInclude
            def tagsToExclude = env.icTogglesToExclude
            triggerAcceptanceTests(env.AC_TEST_JOB, 'sit', 'local-chrome', tagsToInclude, tagsToExclude, true, '5')
          } else {
            echo "Skipping stage as all feature toggles for the environment are switched on"
          }
        }
      }
    }

    stage('Acceptance Tests SIT - BrowserStack IE') {
      when {
        branch 'master'
      }
      environment {
        Map icToggles = getFeatureToggles('https://sit.ppe-np.elsevier.com', 'svc-scielsawsppetest', 'IC_', false)
        icTogglesToExclude = "${icToggles.on}"
      }
      steps {
        script {
          def tagsToInclude = "--tags @smoke"
          def tagsToExclude = "--tags ~@no_ie " + env.icTogglesToExclude
          triggerAcceptanceTests(env.AC_TEST_JOB, 'sit', 'browserstack-ie', tagsToInclude, tagsToExclude, false, '2')
        }
      }
    }

    stage('Deploy to UAT') {
      agent {
        label 'master'
      }
      when {
        branch 'master'
      }
      steps {
        deploy('${DOCKER_REPO}/${IMAGE}:${GIT_COMMIT}', 'ppe-uat')
        createIngress('ppe-uat', 'uat-ingress.yml')
      }
    }

    stage('Acceptance Tests UAT Chrome - Feature Toggles Off') {
      when {
        branch 'master'
      }
      environment {
        Map icToggles = getFeatureToggles('https://uat.ppe-np.elsevier.com', 'svc-scielsawsppetest', 'IC_', false)
        icTogglesToInclude = "${icToggles.off}"
        icTogglesToExclude = "${icToggles.on}"
      }
      steps {
        script {
          def tagsToInclude = "--tags @smoke," + env.icTogglesToInclude
          def tagsToExclude = env.icTogglesToExclude
          triggerAcceptanceTests(env.AC_TEST_JOB, 'uat', 'local-chrome', tagsToInclude, tagsToExclude, false, '5')
        }
      }
    }

    stage('Acceptance Tests UAT Chrome - Feature Toggles On') {
      when {
        branch 'master'
      }
      environment {
        Map icToggles = getFeatureToggles('https://uat.ppe-np.elsevier.com', 'svc-scielsawsppetst1', 'IC_', true)
        icTogglesToInclude = "${icToggles.on}"
        icTogglesToExclude = "${icToggles.off}"
      }
      steps {
        script {
          if (env.icTogglesToInclude) {
            def tagsToInclude = "--tags @smoke," + env.icTogglesToInclude
            def tagsToExclude = env.icTogglesToExclude
            triggerAcceptanceTests(env.AC_TEST_JOB, 'uat', 'local-chrome', tagsToInclude, tagsToExclude, true, '5')
          } else {
            echo "Skipping stage as all feature toggles for the environment are switched on"
          }
        }
      }
    }
  }

  post {
    success {
      echo 'posting success to GitLab'
      updateGitlabCommitStatus(name: 'jenkins-build', state: 'success')
      slackNotifySuccess(currentBuild.getPreviousBuild(), JOB_NAME, BUILD_NUMBER, BUILD_URL)
    }
    failure {
      echo 'posting failure to GitLab'
      updateGitlabCommitStatus(name: 'jenkins-build', state: 'failed')
      slackNotifyFailure(currentBuild.getPreviousBuild(), JOB_NAME, BUILD_NUMBER, BUILD_URL)
    }
  }
}
