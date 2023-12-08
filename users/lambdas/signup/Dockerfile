FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

# Dependencies
COPY package*.json ./
RUN npm install

COPY src/ .

CMD [ "index.handler" ]