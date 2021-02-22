# fastify-sse-v2-events-on-asynciterable

Example repo for https://github.com/NodeFactoryIo/fastify-sse-v2/issues/19

## Run locally

1. clone repo
1. ensure correct node version
   - if using nvm, you can just `nvm use`
   - otherwise, change the node version to match that if .nvmrc file
1. install deps
1. run `yarn dev` to start local server
1. go to root page at http://127.0.0.1:3000/
1. make curl request to send update

   curl --request POST \
   --url http://127.0.0.1:3000/report \
   --header 'Content-Type: application/json' \
   --data '{
   "update": "some update payload data",
   }'

1. Expect that the data is dispatched to root page via SSE
