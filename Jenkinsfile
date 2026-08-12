pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        GITHUB_CREDS = credentials('github-creds')
        IMAGE = "akrembejaoui/migration"
        TAG = "frontend-${env.BUILD_NUMBER}"
        MANIFEST_REPO = "https://github.com/bejaouiakrem/task-manager-manifests.git"
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Angular App') {
            steps {
                // Production build – optimises and minifies
                sh 'npm run build -- --prod'
            }
        }
        // Optional: Add unit tests (if you have them)
        // stage('Test') {
        //     steps {
        //         sh 'npm test -- --watch=false --browsers=ChromeHeadless'
        //     }
        //     post {
        //         always {
        //             // Publish test results if you have a test reporter
        //         }
        //     }
        // }
        stage('Docker Build & Push') {
            steps {
                sh "docker build -t ${IMAGE}:${TAG} ."
                sh "echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin"
                sh "docker push ${IMAGE}:${TAG}"
            }
        }
        stage('Update Manifest Repo') {
            steps {
                sh """
                    rm -rf manifests
                    git clone ${MANIFEST_REPO} manifests
                    cd manifests
                    # Update frontend deployment image tag
                    sed -i 's|image: .*|image: ${IMAGE}:${TAG}|' frontend/frontend-deployment.yaml
                    git config user.email "jenkins@local"
                    git config user.name "Jenkins"
                    git commit -am "update frontend image to ${TAG} [skip ci]"
                    git push https://${GITHUB_CREDS_USR}:${GITHUB_CREDS_PSW}@github.com/bejaouiakrem/task-manager-manifests.git
                """
            }
        }
    }
}
