run:
	docker kill dbot
	docker run  --rm -v dbot:/app/data --name dbot dbot
start: 
	docker run  --rm -v dbot:/app/data --name dbot dbot
save:
	docker save --output image.tar dbot