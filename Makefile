IMAGE_NAME=nestcloud-kubernetes-example
IMAGE_VERSION=1.0.0


build:
	yarn
	npm run build
image:
	yarn
	npm run build
	yarn install --production
	docker build -t $(IMAGE_NAME):$(IMAGE_VERSION) .
