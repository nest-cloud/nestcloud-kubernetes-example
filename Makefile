IMAGE_NAME=nestcloud/nestcloud-kubernetes-example
IMAGE_VERSION=1.1.2


build:
	yarn
	npm run build
image:
	yarn
	npm run build
	yarn install --production
	docker build -t $(IMAGE_NAME):$(IMAGE_VERSION) .
