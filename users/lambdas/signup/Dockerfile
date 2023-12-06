FROM public.ecr.aws/lambda/nodejs:18

COPY /src/ ${LAMBDA_TASK_ROOT}

CMD [ "index.handler" ]